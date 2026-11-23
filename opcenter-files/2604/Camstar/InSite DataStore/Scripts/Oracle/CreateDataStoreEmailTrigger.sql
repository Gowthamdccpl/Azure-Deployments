--------------------------------------------------------------------------------
-- SCRIPT: CreateDataStoreEmailTrigger.sql
-- DESCR: Creates the Datastore OOTB Email Trigger
-- HISTORY:

--	05/05/2017	Dan Maloney	New Email Triiger Script 
--
-- Copyright Siemens 2026  

-- Email trigger

BEGIN
	EXECUTE IMMEDIATE 'DROP TRIGGER DATASTORESETUPEMAILTRG';
EXCEPTION
WHEN OTHERS THEN
	NULL;
END;
/


CREATE OR REPLACE TRIGGER DATASTOREEMAILTRG 
AFTER
INSERT OR UPDATE 
ON DATASTORESETUP
FOR EACH ROW
DECLARE

	PRAGMA AUTONOMOUS_TRANSACTION;

 	cCRLF			CONSTANT	CHAR(2) := CHR(13) || CHR(10); 

	v_DBName		VARCHAR2(1024);
  	v_EmailRecipients	VARCHAR2(1024);
	v_EmailSender      	VARCHAR2(1024);
	v_Err			VARCHAR2(4000);
	v_Loc			VARCHAR2(256);
	v_Message		VARCHAR2(4000);
	v_HTMLCSS		VARCHAR2(4000);
	v_Msg			VARCHAR2(256);
	v_ServerHost		VARCHAR2(1024) := UPPER(SYS_CONTEXT('USERENV','SERVER_HOST'));
	v_SessionUser		VARCHAR2(1024) := UPPER(SYS_CONTEXT('USERENV','SESSION_USER'));
	v_SQL			VARCHAR2(4000);
  	v_Subject   		VARCHAR2(1024);
    v_useSSL        CHAR(1);
    v_accountUser   VARCHAR2(300);
    v_accountPassword VARCHAR2(1024);
    v_encryptedPassword VARCHAR2(1024);
    v_walletPath        VARCHAR(400);
    v_walletPassword    VARCHAR(1024);
    v_key raw(32) ;
    v_decryptedUserPasswd varchar2(1024);
    v_decryptedWalletPasswd varchar2(1024);
    v_mesg VARCHAR2(4000);
    v_EmailServer VARCHAR2(1024);
    v_SmtpOutServers  VARCHAR2(2000);
    
    v_emailServerPort NUMBER;
    v_encryptionType pls_integer :=  DBMS_CRYPTO.ENCRYPT_AES256
                               + DBMS_CRYPTO.CHAIN_CBC
                               + DBMS_CRYPTO.PAD_PKCS5;
    crlf VARCHAR2(2) := CHR(13) || CHR(10);
    
    tx_timeout PLS_INTEGER := 30;
    v_mail_conn UTL_SMTP.CONNECTION;
BEGIN
	IF UPPER(:NEW.PARAMETER) = 'DATASTORE_TERMINATE' THEN
		IF UPPER(:NEW.VALUE) != UPPER(:OLD.VALUE) THEN
			v_Msg := 'Get Database Name';
			BEGIN
				-- Oracle 12c and later, CON_NAME can be used
				v_DBName := UPPER(SYS_CONTEXT('USERENV','CON_NAME'));
			EXCEPTION
			WHEN OTHERS THEN
				-- Before Oracle 12c, CON_NAME did not exist so use DB_NAME
				v_DBName := UPPER(SYS_CONTEXT('USERENV','DB_NAME'));
			END;
			
			v_Msg := 'Get Email Config info from DataStoreEmailSetUp table';
			v_SQL := 'SELECT VALUE FROM DATASTOREEMAILSETUP WHERE PARAMETER = :b1';
			EXECUTE IMMEDIATE v_SQL INTO v_EmailSender USING 'EMAIL_SENDER';
			EXECUTE IMMEDIATE v_SQL INTO v_EmailRecipients USING 'EMAIL_RECIPIENTS';
	
			EXECUTE IMMEDIATE v_SQL INTO v_useSSL USING 'USE_SSL';
           
            BEGIN
                -- If multiple SMTP out servers are configured, fetch the last SMTP server configured by user.
                SELECT VALUE INTO v_SmtpOutServers FROM V$PARAMETER WHERE NAME = 'smtp_out_server';
                SELECT SUBSTR(v_SmtpOutServers, INSTR(v_SmtpOutServers, ',', -1)+1) 
                INTO v_EmailServer
                FROM DUAL;
                
                -- Fetch the latest email server port if the same server is configured with multiple ports
                SELECT LOWER_PORT INTO v_EmailServerPort 
                FROM (SELECT * FROM DBA_NETWORK_ACLS
                        WHERE HOST = v_EmailServer
                        ORDER BY ACLID DESC)
                        WHERE ROWNUM < 2;     
            END;           
           
			-- Validate Email Server, Sender and Recipients are populated.  If not, exit without attempting to send an email
			v_Msg := 'Validate email server, email sender and email recipients';
			IF (v_emailServer IS NULL OR v_EmailSender IS NULL OR v_EmailRecipients IS NULL) THEN
				RETURN;
			END IF;
			V_HTMLCSS := '<style type="text/css">
			h3 {
			font-family: "Lucida Grande", Tahoma;
			font-size: 26px;
 			font-weight: 500;
		 	font-variant: normal;
 			color: #ffa500;
			margin-top: 1px;
	 		text-align: center!important;
	 		letter-spacing: 1px;
			text-align: left;
			}
			h1 {
			font-family: "Lucida Grande", Tahoma;
			font-size: 16px;
			font-weight: 200;
			font-variant: normal;
			color: #8B8B83;
		       	margin-top: 1px;
			ext-align: center!important;
			letter-spacing: 1px;
			text-align: justify;
			}
			#box-table
			{
			font-family: "Lucida Grande", Tahoma;
			font-size: 14px;
			text-align: justify;
			border-collapse: collapse;
			border-top: 7px solid #c0c0c0;
			border-bottom: 7px solid #c0c0c0c;
			vertical-align: text-top;
			max-width:1200px; min-width:1200px;
			}
			#box-table th
			{
			font-size: 16px;
			font-weight: normal;
			background: #caff70;
			color: #000000;
			border-right: 2px solid #c0c0c0;
			border-left: 2px solid #c0c0c0;
			border-bottom: 2px solid #c0c0c0;
			text-align: center;
			vertical-align: middle;
			}
			#box-table td
			{
			font-size: 12px;
			border-right: 1px solid #c0c0c0;
			border-left: 1px solid #c0c0c0;
			border-bottom: 1px solid #c0c0c0;
			color: #000000;
			text-align: left;
			vertical-align: text-top;
			}
			</style>';
	
			IF UPPER(:NEW.VALUE) = 'Y' THEN
				v_Msg := 'DataStore has stopped.  Preparing to send email.';
				v_Subject := 'DataStore Database has stopped';

				v_Message := '<h3 style="font-family: Lucida Grande, Tahoma; font-size: 26px; font-weight: normal; color: #FF0000;">The DataStore Database has stopped.</h3>' 
				||'<table style="border-collapse: collapse;">'
				||'<tr><td style="font-family: Lucida Grande, Tahoma; font-size: 16px; color: #000000; font-weight: bold; width: 100px; text-align: left">Host:</td>'
				||'<td style="font-family: Lucida Grande, Tahoma; font-size: 16px; color: #8B8B83; width: 400px;">' 
				|| cCRLF || cCRLF || v_ServerHost || '</td></tr>'
				||'<tr><td style="font-family: Lucida Grande, Tahoma; font-size: 16px; color: #000000; font-weight: bold; width: 100px; text-align: left">Database:</td>' 
				||'<td style="font-family: Lucida Grande, Tahoma; font-size: 16px; color: #8B8B83; width: 400px;">' 
				|| cCRLF || cCRLF || v_DBName || '</td></tr><tr style="height: 40px;"></tr></Table>'
				|| '<p></p>'
				|| '<h3 style="color: #000000; font-size: 20px; font-weight: 200;">'
				|| cCRLF || 'Please check ' || v_SessionUser || '.DATASTORELOG and ' || v_SessionUser || '.DATASTOREERRORS tables in the DataStore database for details.</h3>';
			
			ELSIF UPPER(:NEW.VALUE) = 'N' THEN
				v_Msg := 'DataStore has started.  Preparing to send email.';
				v_Subject := 'DataStore Database has started';

       	 		v_Message := '<h3 style="font-family: Lucida Grande, Tahoma; font-size: 26px; font-weight: normal; color: #32cd32;">'
					||'The DataStore Database  has started.</h3>'
					||'<table style="border-collapse: collapse;">' 
					||'<tr><td style="font-family: Lucida Grande, Tahoma; font-size: 16px; color: #000000; font-weight: bold; width: 100px; text-align: left">Host:</td>' 
					||'<td style="font-family: Lucida Grande, Tahoma; font-size: 16px; color: #8B8B83; width: 400px;">' 
					|| cCRLF || cCRLF || v_ServerHost || '</td></tr>'
					||'<tr><td style="font-family: Lucida Grande, Tahoma; font-size: 16px; color: #000000; font-weight: bold; width: 100px; text-align: left">Database:</td>' 
					||'<td style="font-family: Lucida Grande, Tahoma; font-size: 16px; color: #8B8B83; width: 400px;">' 
					|| cCRLF || cCRLF || v_DBName || '</td></tr> </Table>';

			END IF;
            
            IF UPPER(v_useSSL) = 'N'
            THEN
            
         		v_SQL := 'BEGIN UTL_MAIL.SEND(';		
				v_SQL := v_SQL || 'SENDER 	=> ' || CHR(39) || v_EmailSender || CHR(39);
       			v_SQL := v_SQL || ',RECIPIENTS 	=> ' || CHR(39) || v_EmailRecipients || CHR(39);
				v_SQL := v_SQL || ',SUBJECT 	=> ' || CHR(39)  || v_Subject || CHR(39);
       	 		v_SQL := v_SQL || ',MESSAGE 	=> ' || CHR(39) || v_Message || CHR(39);
       			v_SQL := v_SQL || ',MIME_TYPE 	=> ''text/html''); END;';
				EXECUTE IMMEDIATE v_SQL;
            ELSIF UPPER(v_useSSL) = 'Y'
            THEN
                EXECUTE IMMEDIATE v_SQL INTO v_walletPath USING 'WALLET_LOCATION';
                EXECUTE IMMEDIATE v_SQL INTO v_walletPassword USING 'WALLET_PASSWORD';
                
                EXECUTE IMMEDIATE v_SQL INTO v_accountUser USING 'ACCOUNT_USER';
                EXECUTE IMMEDIATE v_SQL INTO v_encryptedPassword USING 'ACCOUNT_PASSWORD';
                V_KEY := UTL_I18N.STRING_TO_RAW ('sslkey12sslkey12sslkey12sslkey12');
    
                v_decryptedWalletPasswd :=  UTL_I18N.RAW_TO_CHAR(dbms_crypto.decrypt(v_walletPassword, 
                                                                  v_encryptionType, V_KEY),  'AL32UTF8') ;

                v_mail_conn := utl_smtp.open_connection(host => v_EmailServer, 
                                                        port => v_EmailServerPort,
                                                        tx_timeout => tx_timeout,
                                                        wallet_path => v_walletPath,
                                                        wallet_password => v_decryptedWalletPasswd 
                                                        --,secure_connection_before_smtp = true
                                                        ); 
                                                        /*1. To open/establish a connection to an SMTP server*/
    
                utl_smtp.starttls(v_mail_conn);
                
                v_decryptedUserPasswd :=  UTL_I18N.RAW_TO_CHAR(dbms_crypto.decrypt(v_encryptedPassword, --UTL_I18N.STRING_TO_RAW (v_value,  'AL32UTF8'), 
                                                                  v_encryptionType, V_KEY),  'AL32UTF8') ;
                UTL_SMTP.AUTH(v_mail_conn, v_accountUser, v_decryptedUserPasswd, schemes => 'LOGIN');
                
                utl_smtp.helo(v_mail_conn, v_EmailServer); /*2. Initial handshaking*/
                utl_smtp.mail(v_mail_conn, v_EmailSender); /* 3. Initiates a mail transaction with the server*/
                utl_smtp.rcpt(v_mail_conn, v_EmailRecipients); /*4. specifies the recipient of an e-mail*/
                /*5. specifies the Subject, Recipients & body of an e-mail */
                UTL_SMTP.open_data(v_mail_conn);

                UTL_SMTP.write_data(v_mail_conn,
                                    'From:' || v_EmailSender || UTL_TCP.crlf);
                UTL_SMTP.write_data(v_mail_conn,
                                    'TO:' || v_EmailRecipients  || UTL_TCP.crlf);
                UTL_SMTP.write_data(v_mail_conn,
                                    'Subject:' || v_Subject || UTL_TCP.crlf);
                UTL_SMTP.write_data(v_mail_conn,
                                    'Content-Type: text/html' || UTL_TCP.crlf);
                UTL_SMTP.write_data(v_mail_conn, UTL_TCP.crlf);
                UTL_SMTP.write_data(v_mail_conn,  v_Message || crlf);
                UTL_SMTP.close_data(v_mail_conn);
                
                UTL_SMTP.QUIT(v_mail_conn);
            END IF;
		END IF;
	END IF;
EXCEPTION
WHEN OTHERS THEN
		IF UPPER(:NEW.VALUE) = 'Y' THEN
			v_Loc := 'DATASTOREEMAILTRG <stop>';
		END IF;

		IF UPPER(:NEW.VALUE) = 'N' THEN
			v_Loc := 'DATASTOREEMAILTRG <start>';
		END IF;

		v_Err := 'Exception Handler (trigger catch block) : Last message set : ' || v_Msg;
		INSERT INTO DATASTORELOG(JOB, PACKAGE_EXECUTING, LOG_SEQ, LOG_LEVEL, LOC, MESSAGE)
		VALUES (0, 'N/A', 0, 0, v_Loc, v_Err);
		COMMIT;

		v_Err := 'Exception Handler (trigger catch block) : ' || SUBSTR(SQLERRM,1,1024);
		INSERT INTO DATASTORELOG(JOB, PACKAGE_EXECUTING, LOG_SEQ, LOG_LEVEL, LOC, MESSAGE)
		VALUES (0, 'N/A', 1, 0, v_Loc, v_Err);
		COMMIT;

		v_Err := 'Exception Handler (trigger catch block) : The email server information may not be correct or the Oracle ACL may not be set up correctly.  '
		|| 'See the DataStore Reference Guide for information on configuring email alerts.';
		INSERT INTO DATASTORELOG(JOB, PACKAGE_EXECUTING, LOG_SEQ, LOG_LEVEL, LOC, MESSAGE)
		VALUES (0, 'N/A', 2, 0, v_Loc, v_Err);
		COMMIT;
END;
/




