------------------------------------------------------------------------------------------------------------------------------------------------------
-- SCRIPT:      sp_update_mail_account.sql
-- DESCR:       Creates the wrapper for sysmail_update_account_sp to allow its execution to update the email account with email server, sender and user credentials
-- HISTORY:
--              23/02/2026		Madhuri Bhamdari  
--
-- Copyright Siemens 2026
------------------------------------------------------------------------------------------------------------------------------------------------------

-- Wrapper for sysmail_update_account_sp
-- To be executed as SA

SET NOCOUNT ON	

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER OFF
GO

USE MSDB
GO

CREATE OR ALTER PROCEDURE dbo.SP_UPDATE_MAIL_ACCOUNT
    @account_name NVARCHAR(1024),
	@sender nvarchar(max),
    @username NVARCHAR(300),
    @password NVARCHAR(1024)
WITH EXECUTE AS OWNER -- Requires owner to be sysadmin
AS
BEGIN
    EXEC msdb.dbo.sysmail_update_account_sp
        @account_name = @account_name,
		@email_address = @sender,
		@replyto_address = @sender,
        @username = @username,
        @password = @password
end;
GO

GRANT EXECUTE ON MSDB.DBO.SP_UPDATE_MAIL_ACCOUNT TO PUBLIC;