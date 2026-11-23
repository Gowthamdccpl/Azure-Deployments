# -----------------------------------------------------------------------------------------------------------------------------
# 	Copyright Siemens 2026  
#
# 	DataStoreEmailSetUp.ps1
#
#  	Powershell script file used to run the DataStoreEmailSetUp.or.sql (Oracle) or DataStoreEmailSetUp.sql script (SQL Server).
#
# 	Assumptions:#
#     	%CamstarInstall%=C:\Program Files (x86)\Camstar
#     	Location of this .ps1 file (DataStoreEmailSetUp.ps1):
#      		%CamstarInstall%\InSite DataStore\Scripts
#     	Location of the SQL Scripts:
#          	DataStoreEmailSetUp.or.sql          (Oracle)        : %CamstarInstall%\InSite DataStore\Scripts\Oracle
#          	DataStoreEmailSetUp.sql             (SQL Server)    : %CamstarInstall%\InSite DataStore\Scripts\SQL Server
#     	Location of the log from the execution of this script:
#          	%CamstarInstall%\InSite DataStore\Scripts
#
#     	The appropriate Oracle tool (i.e. sqlplus) is in the user's %PATH% or SQL Server (i.e. sqlcmd) is in the user's %PATH%
#
# 	Execution:
#     	Run from Camstar DataStore directory (same as location of this .ps1 file): 
#       	%CamstarInstall%\InSite DataStore\Scripts
#     	When run with no parameters, the powershell script will prompt for the input values interactively. 
#     	Example:
#     		dataStoreEmailSetup.ps1  
#
#     	Run by passing in parameters from the command line:
#     	Examples:
#
#          	DataStoreEmailSetup.ps1 "<ORACLE>" "<Database Host>" "<DataStore Listening Port>" "<Database Name>" "<Admin User [defaults to SYS]>" "<Admin or SYS Password>" "<DataStore User Name>" "<Email Server>" "<Email Server port [Defaults to 25]>" "<Action [Defaults to ADD]>" "<SSL flag [Defaults to N]>" "<User registered with email server>" "<Password of the user registered with email server>" "<Wallet location with certificates to connect to email server>" "<Password of wallet with certificates to connect to email server>"
#          	DataStoreEmailSetup.ps1 "<SQLSERVER>" "<Database Host>" "<DataStore Listening Port>" "<Database Name>"  "<Admin User [defaults to SA]>" "<Admin or SA Password>" "<DataStore User Name>" "<Email Server>" "<Email Server port [Defaults to 25]>" "<Action [Defaults to ADD]>" "<SSL flag [Defaults to N]>" "<User registered with email server>" "<Password of the user registered with email server>"
#		Setting up email server without authentication
#
#          	(ORACLE):       .\DataStoreEmailSetUp.ps1 oracle APPDEVORA01.APPDEV.LOCAL 1521 appdev01 sys "Password" appdev01  mail_server.appdev.local 25 add N
#          	(ORACLE):       .\DataStoreEmailSetUp.ps1 oracle APPDEVORA01.APPDEV.LOCAL 1521 appdev01 sys "Password" appdev01  mail_server.appdev.local 25 drop
#          	(SQLSERVER):    .\DataStoreEmailSetUp.ps1 sqlserver APPDEVSQL01.APPDEV.LOCAL 1433 appdev01 sa "Password" appdev01  mail_server.appdev.local 25 add N
#          	(SQLSERVER):    .\DataStoreEmailSetUp.ps1 sqlserver APPDEVSQL01.APPDEV.LOCAL 1433 appdev01 sa "Password" appdev01  mail_server.appdev.local 25 drop
#	
#		Setting up email server with authentication
#
#          	(ORACLE):       .\DataStoreEmailSetUp.ps1 oracle APPDEVORA01.APPDEV.LOCAL 1521 appdev01 sys "Password" appdev01  mail_server.appdev.local 25 add Y accountUser "AccountPassword" wallet_location "WalletPassword"
#          	(ORACLE):       .\DataStoreEmailSetUp.ps1 oracle APPDEVORA01.APPDEV.LOCAL 1521 appdev01 sys "Password" appdev01  mail_server.appdev.local 25 drop
#          	(SQLSERVER):    .\DataStoreEmailSetUp.ps1 sqlserver APPDEVSQL01.APPDEV.LOCAL 1433 appdev01 sa "Password" appdev01  mail_server.appdev.local 25 add Y accountUser "AccountPassword" 
#          	(SQLSERVER):    .\DataStoreEmailSetUp.ps1 sqlserver APPDEVSQL01.APPDEV.LOCAL 1433 appdev01 sa "Password" appdev01  mail_server.appdev.local 25 drop
#
#		With named parameters (Number of input parameters and sequence can be changed):	
#			(ORACLE):       .\DataStoreEmailSetUp.ps1 -inputdatabasetype oracle -databaseserver APPDEVORA01.APPDEV.LOCAL -databaseport 1521 -databasename appdev01 -adminuser sys -adminpassword "password" -databaseuser appdev01 -emailserver mail_server.appdev.local -emailserverport 25 -inputaction add
#			(ORACLE):       .\DataStoreEmailSetUp.ps1 -inputdatabasetype oracle -databaseserver APPDEVORA01.APPDEV.LOCAL -databaseport 1521 -databasename appdev01 -adminuser sys -adminpassword "password" -databaseuser appdev01 -emailserver mail_server.appdev.local -emailserverport 25 -inputaction add -useSSL Y -accountUser test_user -iAccountPassword test_password -walletLocation "file:/u01/app/oracle/product....." -iWalletPassword "wallet_password"
#          	(ORACLE):       .\DataStoreEmailSetUp.ps1 -inputdatabasetype oracle -databaseserver APPDEVORA01.APPDEV.LOCAL -databaseport 1521 -databasename appdev01 -adminuser sys -adminpassword "password" -databaseuser appdev01 -emailserver mail_server.appdev.local -emailserverport 25 -inputaction drop 
#          	(SQLSERVER):    .\DataStoreEmailSetUp.ps1 -inputdatabasetype sqlserver -databaseserver APPDEVSQL01.APPDEV.LOCAL -databaseport 1433 -databasename appdev01 -adminuser sa -adminpassword "password" -databaseuser appdev01 -emailserver mail_server.appdev.local -emailserverport 25 -inputaction add
#          	(SQLSERVER):    .\DataStoreEmailSetUp.ps1 -inputdatabasetype sqlserver -databaseserver APPDEVSQL01.APPDEV.LOCAL -databaseport 1433 -databasename appdev01 -adminuser sa -adminpassword "password" -databaseuser appdev01 -emailserver mail_server.appdev.local -emailserverport 25 -inputaction add -useSSL Y -accountUser test_user -iAccountPassword test_password 
#          	(SQLSERVER):    .\DataStoreEmailSetUp.ps1 -inputdatabasetype sqlserver -databaseserver APPDEVSQL01.APPDEV.LOCAL -databaseport 1433 -databasename appdev01 -adminuser sa -adminpassword "password" -databaseuser appdev01 -emailserver mail_server.appdev.local -emailserverport 25 -inputaction drop
#							
# 	Usage (Input Parameters): 
#
#     	Where:
#         	"<InputDatabaseType [ORACLE | oracle | SQLSERVER | sqlserver]>" - Is required.  The database vendor (i.e. ORACLE or SQLSERVER) 
#          	"<DatabaseServer>"                                              - Is required.  The Database Server Name or IP Address 
#          	"<DatabasePort>"                                     			- Is optional. 	The database Listening port. 
#                                                                         	- For Oracle, the default value is 1521.  
#                                                                             In interative mode, you may hit enter or type '' or "" to accept the default value.  
#                                                                             In command line mode you may enter '' or "" to accept the default value.
#                                                                         	- For SQL Server, the default value is 1433.  
#                                                                             In interactive mode, you may hit enter  or type '' or "" to accept the defualt value.   
#                                                                             In command line mode you may enter '' or "" to accept the default value.
#                                                                             For SQL Server, you may also enter the instance name for a Named SQL Server instance
#          	"<DatabaseName>"                                              	- Is required.  
#                                                                         	- For Oracle container databases instances, this is the service name for the pluggable database name for the DataStore
#                                                                         	- For Oracle non-container databases instances, this is the service name or the instance name
#                                                                         	- For SQL Server, this is the database name for the DataStore
#			"<AdminUser>"													- Is optional. Admin user for login.
#																			- For Oracle, the default value is SYS
#																			- For SQLSERVER, the default value is SA
#          	"<AdminPassword>"                                 				- Is required.  
#                                                                         	- For Oracle this is the SYS/Admin user password
#                                                                         	- For SQL Server this is the SA/Admin user password
#          	"<DatabaseUser>"                                        		- Is required.  
#                                                                         	- For Oracle this is the DataStore schema
#                                                                         	- For SQL Server this is the DataStore database user for SQL Server 
#          	"<EmailServer>"                                               	- Is required.  Email Server Name or IP Address. 
#			"<EmailServerPort>"												- Is optional. 	Email Server port defaults to 25.
#          	"<InputAction>"              									- Is optional.  Action to be performed defaults to ADD 
#			"<useSSL>"														- Is optional. SSL flag to be set defaults to N
#			"<AccountUser>"													- Is mandatory only if UseSSL flag is Y. Account User registered with email server.
#			"<iAccountPassword>"											- Is mandatory only if UseSSL flag is Y. Password of Account User registered with email server.
#			"<WalletLocation>"												- Is mandatory only if UseSSL flag is Y and database type is "Oracle". Wallet location of database server.
#			"<iWalletPassword>"												- Is mandatory only if UseSSL flag is Y and database type is "Oracle". Wallet password of database server.
#
#     	ORACLE
#     	The input parameters "<DatabaseUser>", "<EmailServer>", "<EmailServerPort>", "<InputAction>", "<useSSL>", "<AccountUser>", "<iAccountPassword>", "<WalletLocation>"	, "<iWalletPassword>" will be passed into the DataStoreEmailSetUp.or.sql (Oracle) script
#     	These parameters will be used to set up an Access Control List and set permissions for the Oracle DataStore schema "<DataBaseUser>" to access the "<EmailServer>" with port "<EmailServerPort>". If the EmailServer requires authentication, credentials and wallet details provided in the input will be setup as parameters in DatastoreEmailSetup table.
# 		The password values will be stored in encrypted format.
#
#     	SQLSERVER
#     	The input parameters "<DatabaseUser>", "<EmailServer>", "<EmailServerPort>", "<InputAction>", "<useSSL>", "<AccountUser>", "<iAccountPassword>" will be passed into the DataStoreEmailSetUp.sql (SQL Server) script
#     	These parameters will be used to set up an the Email Profile, Email Account with port "<EmailServerPort>" and set permissions for sending emails for the SQL Server DataStore User "<DatabaseUseR>" to access the "<Email Server>".  If the EmailServer requires authentication, Email Account will be configured with credentials provided in the input and credentials will also be setup as parameters in DatastoreEmailSetup table.
# 		The password values will be stored in encrypted format.
# 
#
# 	Error Detection:  
#
#     	Exit status of sqlplus or sqlcmd is checked. A comment indicating an error occurred is written to the log file
#
# 	Modification History:
#   Name                        Date            Action
#   ----------------------------------------------------------------------------------------------------------------------------------------------------
#	MBhandari					16/10/2023		New Powershell script	
#	MBhandari					18/02/2026		Modified Powershell script to allow setting up the email server with or without authentications.
#
#	----------------------------------------------------------------------------------------------------------------------------------------------------

Param ([string]$inputDatabaseType,[string]$databaseServer, [int32]$databasePort, [string]$databaseName, [string]$adminUser, [string]$adminPassword, [string]$databaseUser, [string]$emailServer, [int32]$emailServerPort, [string]$inputAction, [string]$useSSL, [string]$accountUser, [string]$iAccountPassword, [string]$walletLocation, [string]$iWalletPassword)

Function ValidateDBType {
Param(
[Parameter(Mandatory=$true)]
[ValidateNotNullOrEmpty()]
[ValidateSet("ORACLE", "SQLSERVER")]
[String[]]$databaseType
)  
	$databaseType	
}
do {	
	try {		
			# If input is given, verify for valid values and revert.
			# Different variable is used to ensure that this validation works only once and validation for the prompted value is not done here.
			if ($inputDatabaseType)
			{
				$databaseType = $inputDatabaseType
				if (-not($inputDatabaseType.toUpper() -eq "ORACLE" -or $inputDatabaseType.toUpper() -eq "SQLSERVER"))
				{
					Write-Warning 'Invalid database type entered, allowed values are Oracle or SQLServer.'
					$inputDatabaseType = ""
				}
			}
			# Prompt the user for database type if input value is not given or the given value is not valid.
			if (-not($inputDatabaseType) -or (-not($databaseType.toUpper() -eq "ORACLE" -or $databaseType.toUpper() -eq "SQLSERVER")))
			{
				$databaseType = Read-Host 'Please enter Datastore Database Type	'
			}			
		$databaseType = validateDBType($databaseType)
		}
		Catch {				
				Write-Warning 'Invalid database type entered, allowed values are Oracle or SQLServer.'
		}
	} while (-not($databaseType.toUpper() -eq "ORACLE" -or $databaseType.toUpper() -eq "SQLSERVER"))

if (-not($databaseServer))
{
	$databaseServer= Read-Host -Prompt  "Enter DataStore Database Server Name or IP Address" 
}
if (-not($databasePort))
{
	if ( $databaseType.toUpper() -eq "ORACLE")
	{
		$databasePort= Read-Host -Prompt  "Enter DataStore Listening Port (default 1521) "
		if (-not($databasePort))
		{
			$databasePort = 1521
		}
	}
	elseif ( $databaseType.toUpper() -eq "SQLSERVER")
	{
		$databasePort= Read-Host -Prompt  "Enter DataStore Listening Port or Named Instance (default 1433) "
		if (-not($databasePort))
		{
			$databasePort = 1433
		}
	}
}
if (-not($databaseName))
{
	$databaseName= Read-Host -Prompt  "Enter DataStore Database Name " 
}
if (-not($adminUser))
{
	if ( $databaseType.toUpper() -eq "ORACLE")
	{
		$adminUser= Read-Host -Prompt  "Enter Oracle Admin User (default SYS) "
		if (-not($adminUser))
		{
			$adminUser = "SYS"
		}
	}
	elseif ( $databaseType.toUpper() -eq "SQLSERVER")
	{
		$adminUser= Read-Host -Prompt  "Enter SQL Server Admin User (default SA) "
		if (-not($adminUser))
		{
			$adminUser = "SA"
		}
	}
}
if (-not($adminPassword))
{
	if ( $databaseType.toUpper() -eq "ORACLE")
	{
		$SysPassword= Read-Host -Prompt  "Enter Oracle Admin password " -AsSecureString
	}
	elseif ( $databaseType.toUpper() -eq "SQLSERVER")
	{
		$SysPassword= Read-Host -Prompt  "Enter SQL Server Admin password " -AsSecureString
	}
}
if (-not($databaseUser))
{
	if ( $databaseType.toUpper() -eq "ORACLE")
	{
		$databaseUser= Read-Host -Prompt  "Enter Datastore Schema "
	}
	elseif ( $databaseType.toUpper() -eq "SQLSERVER")
	{
		$databaseUser= Read-Host -Prompt  "Enter Datastore User "
	}
}
if (-not($emailServer))
{
	$emailServer= Read-Host -Prompt  "Enter email server "
}
if (-not($emailServerPort))
{
	$emailServerPort= Read-Host -Prompt  "Enter email server port (default 25)"
	if (-not($emailServerPort))
	{
		$emailServerPort = 25
	}
}
Function ValidateAction {
Param(
#[Parameter(Mandatory=$true)]
[ValidateSet("ADD", "DROP", "")]
[String[]]$action
)    
    $action
}

Function ValidateSSLFlag {
Param(
#[Parameter(Mandatory=$true)]
[ValidateSet("Y", "N", "")]
[String[]]$UseSSLFlag
)    
    $UseSSLFlag
}

do {	
	try {		
			# If input is given, verify for valid values and revert.
			# Different variable is used to ensure that this validation works only once and validation for the prompted value is not done here.
			if ($inputAction)
			{
				$action = $inputAction
				if (-not($inputAction.toUpper() -eq "ADD" -or $inputAction.toUpper() -eq "DROP"))
				{
					Write-Warning 'Invalid action entered, allowed values are "Add" or "Drop". Re-enter a value'
					$inputAction = ""
				}
			}
			# Prompt the user for database type if input value is not given or the given value is not valid.
			if (-not($inputAction) -OR (-not($action.toUpper() -eq "ADD" -or $action.toUpper() -eq "DROP")))
			{
				$action = Read-Host 'Please enter action  (default Add)'
				if (-not($action))
				{
					$action = "ADD"
				}
			}			
		$action = validateAction($action)
		}
		Catch {				
				Write-Warning 'Invalid action entered, allowed values are "Add" or "Drop". Re-enter a value'
		}
	} while (-not($action.toUpper() -eq "ADD" -or $action.toUpper() -eq "DROP"))
if ($action.toUpper() -eq "ADD")
{
	do {	
		try {		
				# If input is given, verify for valid values and revert.
				# Different variable is used to ensure that this validation works only once and validation for the prompted value is not done here.
				if ($useSSL)
				{
					$useSSLFlag = $useSSL.toUpper()
					if (-not($useSSL.toUpper() -eq "Y" -or $useSSL.toUpper() -eq "N"))
					{
						Write-Warning 'Invalid Use SSL flag entered, allowed values are "Y" or "N". Re-enter a value'
						$useSSLFlag = ""
					}
				}
				# Prompt the user for database type if input value is not given or the given value is not valid.
				if (-not($useSSL) -OR (-not($useSSLFlag.toUpper() -eq "Y" -or $useSSLFlag.toUpper() -eq "N")))
				{
					$useSSLFlag = Read-Host 'Please enter SSL Flag for SMTP Email Server configuration (Y/N) (default N)'
					if (-not($useSSLFlag))
					{
						$useSSLFlag = "N"
					}
				}			
			$useSSLFlag = validateSSLFlag($useSSLFlag)
			}
			Catch {				
					Write-Warning 'Invalid SSL Flag entered, allowed values are "Y" or "N". Re-enter a value'
			}
		} while (-not($useSSLFlag.toUpper() -eq "N" -or $useSSLFlag.toUpper() -eq "Y"))
		
	if ($useSSLFlag -eq "Y")
	{
		if (-not($accountUser))
		{
			$accountUser= Read-Host -Prompt  "Enter registered user on email server "
		}	
		
		if (-not($iAccountPassword))
		{
			$accountPassword= Read-Host -Prompt  "Enter password for the registered user on email server "  -AsSecureString
		}
		if ( $databaseType.toUpper() -eq "ORACLE")
		{
			if (-not($walletLocation))
			{
				$walletLocation= Read-Host -Prompt  "Enter Client Wallet location of Datastore database(Expected format - file:/u01/oracle/product.....) "
			}
			
			if (-not($iWalletPassword))
			{
				$walletPassword= Read-Host -Prompt  "Enter password for Client Wallet of Datastore database  "  -AsSecureString
			}
		}
	}
}
Function Write-Log {
    [CmdletBinding()]
    Param(
    [Parameter(Mandatory=$False)]
    [ValidateSet("INFO","WARN","ERROR")]
    [String]
    $Level = "INFO",
    [Parameter(Mandatory=$True)]
    [string]
    $Message,
    [Parameter(Mandatory=$False)]
    [string]
    $logfile)

	# $Stamp = (Get-Date).toString("yyyy/MM/dd HH:mm:ss")
	# $Line = "$Stamp $Level $Message"
	$Line = "$Message"
    If($logfile) {
        Add-Content $logfile -Value $Line
    }
    Else {
        Write-Output $Line
    }
}
$datastorePath = $pwd.path
echo $datastorePath

$logFile = $datastorePath + "\DataStoreEmailSetUp_" + $databaseType + "_" + $databaseName+"_"+$databaseUser+".log"
echo $logFile

$orclDBScript = $datastorePath+"\Oracle\DataStoreEmailSetUp.or.sql"
$sqlDBScript = $datastorePath+"\SQL Server\DataStoreEmailSetUp.sql"
$orclInitDBScript = $datastorePath+"\Oracle\initiate_DataStoreEmailSetUp.or.sql"
$sqlInitDBScript = $datastorePath+"\Oracle\initiate_DataStoreEmailSetUp.or.sql"
$sqlplusLogFile = $datastorePath+"\DataStoreEmailSetUp.log"
$sqlcmdLogFile = $datastorePath+"\DataStoreEmailSetUp.log"
$codeSQLPath = $datastorePath+"\SQL Server"

if (Test-Path $logFile) {
        Remove-Item $logFile -Force -Recurse
    }
	
If (!(Test-Path $logFile)) {
        New-Item -Path $logFile | Out-Null
    }
	
Write-Log -level "INFO" -message "© Siemens 2023" -logfile $logFile

$Stamp = (Get-Date).toString("yyyy/MM/dd HH:mm:ss")
Write-Log -level "INFO" -message "Start Time : $Stamp" -logfile $logFile

Write-Log -level "INFO" -message "Datastore home : $datastorePath" -logfile $logFile

Write-Log -level "INFO" -message "[DB Script information ]" -logfile $logFile

if ( $databaseType.toUpper() -eq "ORACLE")
{
	Write-Log -level "INFO" -message " $orclDBScript " -logfile $logFile
}
elseif ( $databaseType.toUpper() -eq "SQLSERVER")
{
	Write-Log -level "INFO" -message " $sqlDBScript " -logfile $logFile
}
Write-Log -level "INFO" -message " [Log file information] " -logfile $logFile
Write-Log -level "INFO" -message " $logFile " -logfile $logFile
Write-Log -level "INFO" -message "Generated in directory: ""$datastorePath""" -logfile $logFile

if ($databaseType.toUpper() -eq "ORACLE")
{
	Write-Log -level "INFO" -message "Sqlplus Log file : ""$sqlplusLogFile""" -logfile $logFile
}
elseif ($databaseType.toUpper() -eq "SQLSERVER")
{
	Write-Log -level "INFO" -message "Sqlcmd Log file: ""$sqlcmdLogFile""" -logfile $logFile
}
Write-Log -level "INFO" -message "Generated in directory: ""$datastorePath""" -logfile $logFile

if (-not($SysPassword) -and -not($adminPassword))
{
	$SysPassword="unspecified"
}
if (-not($databaseServer))
{
	$databaseServer="unspecified"
}
if (-not($databaseUser))
{
	$databaseUser="unspecified"
}	
if (-not($emailServer))
{
	$emailServer = "unspecified"
}
if (-not($useSSLFlag) -and -not($useSSL))
{
	$useSSLFlag = "N"
}
if (-not($accountUser))
{
	$accountUser = "unspecified"
}
if (-not($accountPassword) -and -not($iAccountPassword))
{
	$accountPassword="unspecified"
	$iAccountPassword="unspecified"
}

if ($databaseType.toUpper() -eq "ORACLE")
{
	if (-not($walletLocation))
	{
		$walletLocation = "unspecified"
	}
	if (-not($walletPassword) -and -not($iWalletPassword))
	{
		$walletPassword="unspecified"
	}
}
function validateInput
{
	Param(
    [Parameter(Mandatory=$False)]
    [decimal]
	$ErrCase)

	if ($SysPassword -eq "unspecified")
	{
		$ErrCase = 1
		Write-Log -level "ERROR" -message "Password not provided." -logfile $logFile
	}
	if ($databaseServer -eq "unspecified")
	{
		$ErrCase = 1
		Write-Log -level "ERROR" -message "Database Server not provided." -logfile $logFile
	}
	if ($databaseUser -eq "unspecified")
	{
		$ErrCase = 1
		Write-Log -level "ERROR" -message "Database User not provided." -logfile $logFile
	}	
	if ($emailServer -eq "unspecified")
	{		
		$ErrCase = 1
		Write-Log -level "ERROR" -message "Email Server not provided." -logfile $logFile
	}
	if($action.toUpper() -eq "ADD")
	{
		if ($UseSSLFlag.toUpper() -eq "Y")
		{
			if ($accountUser -eq "unspecified")
			{		
				$ErrCase = 1
				Write-Log -level "ERROR" -message "Email Server Account user not provided." -logfile $logFile
			}
			if ($accountPassword -eq "unspecified")
			{		
				$ErrCase = 1
				Write-Log -level "ERROR" -message "Email Server Account Password not provided." -logfile $logFile
			}
			if ($databaseType.toUpper() -eq "ORACLE")
			{
				if ($walletLocation -eq "unspecified")
				{		
					$ErrCase = 1
					Write-Log -level "ERROR" -message "Datastore wallet location for Oracle not provided." -logfile $logFile
				}
				if ($walletPassword -eq "unspecified")
				{		
					$ErrCase = 1
					Write-Log -level "ERROR" -message "Datastore wallet password for Oracle not provided." -logfile $logFile
				}
			}
		}
	}
	return $ErrCase
}
$ErrCase = 0
$ErrCase = validateInput ($ErrCase)

if ($ErrCase -eq 1)
{
	Write-Log -level "ERROR" -message "Email setup script aborted." -logfile $logFile
}
else
{
	Write-Log -level "INFO" -message "[Validated input ] " -logfile $logFile
	Write-Log -level "INFO" -message "Database Vendor 										: $databaseType" -logfile $logFile
	Write-Log -level "INFO" -message "DataStore Database Server (Host Name or IP Address) 	: $databaseServer" -logfile $logFile
	Write-Log -level "INFO" -message "DataStore Listening Port 								: $databasePort" -logfile $logFile
	Write-Log -level "INFO" -message "DataStore Database Name 								: $databaseName" -logfile $logFile

	if ( $databaseType.toUpper() -eq "ORACLE")
	{
		Write-Log -level "INFO" -message "DataStore Schema 										: $databaseUser" -logfile $logFile
	}
	elseif ( $databaseType.toUpper() -eq "SQLSERVER")
	{
		Write-Log -level "INFO" -message "DataStore Database User 								: $databaseUser" -logfile $logFile
	}
	
	Write-Log -level "INFO" -message "Email Server 											: $emailServer" -logfile $logFile	
	Write-Log -level "INFO" -message "Email Server Port										: $emailServerPort" -logfile $logFile
	Write-Log -level "INFO" -message "Action 													: $action" -logfile $logFile
	Write-Log -level "INFO" -message "SSL flag for email Server 								: $UseSSLFlag" -logfile $logFile	
	if (-not($adminPassword))
	{
		$adminPassword =[Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($SysPassword))
	}
	if ($useSSLFlag -eq 'Y')
	{
			Write-Log -level "INFO" -message "Email Server Account User								: $accountUser" -logfile $logFile
			
	
		if (-not($iAccountPassword))
		{
			$iAccountPassword =[Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($AccountPassword))
		}
		if ( $databaseType.toUpper() -eq "ORACLE")
		{
			# Append 'file:' to the wallet location passed by user if not provided. It is essential to have the wallet location in this format 
			# Else, the certificates needed to be verified with email server will not be read, email server cannot authenticate the incoming request to send email and email will not be sent.
			if (-not($walletLocation -eq "unspecified") -and -not $walletLocation.startswith("file:"))
			{
				$walletLocation = "file:"+$walletLocation	
	
			}
			Write-Log -level "INFO" -message "Client Wallet location of Datastore database 			: $walletLocation" -logfile $logFile
			if (-not($iWalletPassword))
			{
				$iWalletPassword =[Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($WalletPassword))
			}
		}
	}
	Write-Log -level "INFO" -message "continued." -logfile $logFile	
	Write-Log -level "INFO" -message "[ Database script execution ] " -logfile $logFile
	
	if ( $databaseType.toUpper() -eq "ORACLE")
	{	
		try 
		{
			Write-Log -level "INFO" -message "Executing Script: ""$orclDBScript"" " -logfile $logFile
			$sqlConn = $adminUser +"/"+ $adminPassword+ "@" +$databaseServer + ":" + $databasePort + "/" + $databaseName
			if ($adminUser.toUpper() -eq "SYS")
			{
				$sqlConn = $sqlConn + " as sysdba"
			}
			
			$sqlfile = "@`"" + $orclDBScript + "`"" + " '$databaseUser' '$emailServer' '$action' '$emailServerPort' '$useSSLFlag' '$accountUser' '$iAccountPassword' '$walletLocation' '$iWalletPassword'"
			$sqlfile | sqlplus $sqlConn | add-content $logFile;
			Write-Log -level "INFO" -message "Sqlplus Log file : ""$sqlplusLogFile""" -logfile $logFile
		}
		catch
		{
			$ErrorMessage = $_.Exception.Message
			echo $ErrorMessage
			Write-Log -level "ERROR" -message $ErrorMessage -logfile $logFile
		}
	}
	elseif ( $databaseType.toUpper() -eq "SQLSERVER")
	{
		try 
		{
			Write-Log -level "INFO" -message "Executing Script: ""$sqlDBScript"" " -logfile $logFile
				
			
			sqlcmd -S $databaseServer,$databasePort -U $adminUser -P $adminPassword -i $sqlDBScript -v DATASTORE_DATABASE=$DatabaseName DATASTORE_USERNAME=$databaseUser EMAIL_SERVER="$emailServer" ACTION=$action EMAIL_SERVER_PORT=$emailServerPort USE_SSL="$useSSLFlag" ACCOUNT_USER="$accountUser" ACCOUNT_PASSWORD="$iAccountPassword" -o $sqlcmdLogFile				
			
			if ($action.toUpper() -eq "ADD")
			{
				sqlcmd -S $databaseServer,$databasePort -U $adminUser -P $adminPassword -i $codeSQLPath"\sp_update_mail_account.sql"
			}
			$From = Get-Content -Path $sqlcmdLogFile
			Add-Content -Path $logFile -Value $From
			
			Write-Log -level "INFO" -message "SqlCmd Log file : ""$sqlcmdLogFile""" -logfile $logFile
		}
		catch
		{
			$ErrorMessage = $_.Exception.Message
			Write-Log -level "ERROR" -message $ErrorMessage -logfile $logFile			
		}
	}
}
# SIG # Begin signature block
# MIIpVQYJKoZIhvcNAQcCoIIpRjCCKUICAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCAl+765/7zPapL5
# AU1j4nykLuJMQgYC1PvJiuKcspO/kqCCDgswggawMIIEmKADAgECAhAIrUCyYNKc
# TJ9ezam9k67ZMA0GCSqGSIb3DQEBDAUAMGIxCzAJBgNVBAYTAlVTMRUwEwYDVQQK
# EwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5jb20xITAfBgNV
# BAMTGERpZ2lDZXJ0IFRydXN0ZWQgUm9vdCBHNDAeFw0yMTA0MjkwMDAwMDBaFw0z
# NjA0MjgyMzU5NTlaMGkxCzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwg
# SW5jLjFBMD8GA1UEAxM4RGlnaUNlcnQgVHJ1c3RlZCBHNCBDb2RlIFNpZ25pbmcg
# UlNBNDA5NiBTSEEzODQgMjAyMSBDQTEwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAw
# ggIKAoICAQDVtC9C0CiteLdd1TlZG7GIQvUzjOs9gZdwxbvEhSYwn6SOaNhc9es0
# JAfhS0/TeEP0F9ce2vnS1WcaUk8OoVf8iJnBkcyBAz5NcCRks43iCH00fUyAVxJr
# Q5qZ8sU7H/Lvy0daE6ZMswEgJfMQ04uy+wjwiuCdCcBlp/qYgEk1hz1RGeiQIXhF
# LqGfLOEYwhrMxe6TSXBCMo/7xuoc82VokaJNTIIRSFJo3hC9FFdd6BgTZcV/sk+F
# LEikVoQ11vkunKoAFdE3/hoGlMJ8yOobMubKwvSnowMOdKWvObarYBLj6Na59zHh
# 3K3kGKDYwSNHR7OhD26jq22YBoMbt2pnLdK9RBqSEIGPsDsJ18ebMlrC/2pgVItJ
# wZPt4bRc4G/rJvmM1bL5OBDm6s6R9b7T+2+TYTRcvJNFKIM2KmYoX7BzzosmJQay
# g9Rc9hUZTO1i4F4z8ujo7AqnsAMrkbI2eb73rQgedaZlzLvjSFDzd5Ea/ttQokbI
# YViY9XwCFjyDKK05huzUtw1T0PhH5nUwjewwk3YUpltLXXRhTT8SkXbev1jLchAp
# QfDVxW0mdmgRQRNYmtwmKwH0iU1Z23jPgUo+QEdfyYFQc4UQIyFZYIpkVMHMIRro
# OBl8ZhzNeDhFMJlP/2NPTLuqDQhTQXxYPUez+rbsjDIJAsxsPAxWEQIDAQABo4IB
# WTCCAVUwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUaDfg67Y7+F8Rhvv+
# YXsIiGX0TkIwHwYDVR0jBBgwFoAU7NfjgtJxXWRM3y5nP+e6mK4cD08wDgYDVR0P
# AQH/BAQDAgGGMBMGA1UdJQQMMAoGCCsGAQUFBwMDMHcGCCsGAQUFBwEBBGswaTAk
# BggrBgEFBQcwAYYYaHR0cDovL29jc3AuZGlnaWNlcnQuY29tMEEGCCsGAQUFBzAC
# hjVodHRwOi8vY2FjZXJ0cy5kaWdpY2VydC5jb20vRGlnaUNlcnRUcnVzdGVkUm9v
# dEc0LmNydDBDBgNVHR8EPDA6MDigNqA0hjJodHRwOi8vY3JsMy5kaWdpY2VydC5j
# b20vRGlnaUNlcnRUcnVzdGVkUm9vdEc0LmNybDAcBgNVHSAEFTATMAcGBWeBDAED
# MAgGBmeBDAEEATANBgkqhkiG9w0BAQwFAAOCAgEAOiNEPY0Idu6PvDqZ01bgAhql
# +Eg08yy25nRm95RysQDKr2wwJxMSnpBEn0v9nqN8JtU3vDpdSG2V1T9J9Ce7FoFF
# UP2cvbaF4HZ+N3HLIvdaqpDP9ZNq4+sg0dVQeYiaiorBtr2hSBh+3NiAGhEZGM1h
# mYFW9snjdufE5BtfQ/g+lP92OT2e1JnPSt0o618moZVYSNUa/tcnP/2Q0XaG3Ryw
# YFzzDaju4ImhvTnhOE7abrs2nfvlIVNaw8rpavGiPttDuDPITzgUkpn13c5Ubdld
# AhQfQDN8A+KVssIhdXNSy0bYxDQcoqVLjc1vdjcshT8azibpGL6QB7BDf5WIIIJw
# 8MzK7/0pNVwfiThV9zeKiwmhywvpMRr/LhlcOXHhvpynCgbWJme3kuZOX956rEnP
# LqR0kq3bPKSchh/jwVYbKyP/j7XqiHtwa+aguv06P0WmxOgWkVKLQcBIhEuWTatE
# QOON8BUozu3xGFYHKi8QxAwIZDwzj64ojDzLj4gLDb879M4ee47vtevLt/B3E+bn
# KD+sEq6lLyJsQfmCXBVmzGwOysWGw/YmMwwHS6DTBwJqakAwSEs0qFEgu60bhQji
# WQ1tygVQK+pKHJ6l/aCnHwZ05/LWUpD9r4VIIflXO7ScA+2GRfS0YW6/aOImYIbq
# yK+p/pQd52MbOoZWeE4wggdTMIIFO6ADAgECAhANBZQ00FZUZlTa2SaHOYEhMA0G
# CSqGSIb3DQEBCwUAMGkxCzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwg
# SW5jLjFBMD8GA1UEAxM4RGlnaUNlcnQgVHJ1c3RlZCBHNCBDb2RlIFNpZ25pbmcg
# UlNBNDA5NiBTSEEzODQgMjAyMSBDQTEwHhcNMjQwNTEwMDAwMDAwWhcNMjcwNTEy
# MjM1OTU5WjBbMQswCQYDVQQGEwJERTEPMA0GA1UECBMGQmF5ZXJuMREwDwYDVQQH
# EwhNdWVuY2hlbjETMBEGA1UEChMKU2llbWVucyBBRzETMBEGA1UEAxMKU2llbWVu
# cyBBRzCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAKpA8Bw1NUoAeR+S
# td1IXMD6awenCmP3FcfcPVVbldXVb/bW/VwxJToXFvaHlMNpkFJ/UaaNTQTLCPMg
# W7QFVLV5wEceNVJ4f+MseiIiFm5jEvbalMCAwIMmzEi7zDFUQCJ5H71LXmVvf0HW
# Fc7FNxqxdMYYrgcBVrx3XkkRimvnMRlI7QCxiw9Iz5+uyhJMy9+x5l2w3oKTr8G8
# vqNIejaflVjadk3MlvjTCYo1R+ajntOqDF6drYUvTxHo3vvqEgrjmPqBEsrZqi/o
# i8RlyW5gTK2o3m1VFk6WLJOJvF6xhzVEvEgjEt1c/uMXd9Zn9EGMT1DJ7njHmkv+
# hH+jz8ufsgny05ZOsdJDJbzdy5RV8Dhlmi8M1Be233pXVsoXXHWCUzV0rD7j3L5i
# tMoRjorgZJCbWj8nsBlaAOH11BnlKnhzTkCNSLTtASnyfPmOCuyuQueL4L0ae1Pm
# 1iicM8KaPpBqWWLFVORXoXWfZzmqHC6K1f6ZTHRMDXiSKorOkUCBYnmAh9X58o/z
# LD3EuQAy++0yUubC5NmywnlK9IZScjKb6mkKUolkRqqVHi7Dk8b4h9XFz8coDmeZ
# yN7QtdMWQuR8aMG2VfVN5h0sX33MZcCZQ3QhMIrqssHyGxCIeci1irmuUFWWxDQj
# aJjb8uLgctTFeuzi7vSCFns/y0DJAgMBAAGjggIDMIIB/zAfBgNVHSMEGDAWgBRo
# N+Drtjv4XxGG+/5hewiIZfROQjAdBgNVHQ4EFgQUDygpIVV+ELZ3LLl4jdBz0XIr
# ZeQwPgYDVR0gBDcwNTAzBgZngQwBBAEwKTAnBggrBgEFBQcCARYbaHR0cDovL3d3
# dy5kaWdpY2VydC5jb20vQ1BTMA4GA1UdDwEB/wQEAwIHgDATBgNVHSUEDDAKBggr
# BgEFBQcDAzCBtQYDVR0fBIGtMIGqMFOgUaBPhk1odHRwOi8vY3JsMy5kaWdpY2Vy
# dC5jb20vRGlnaUNlcnRUcnVzdGVkRzRDb2RlU2lnbmluZ1JTQTQwOTZTSEEzODQy
# MDIxQ0ExLmNybDBToFGgT4ZNaHR0cDovL2NybDQuZGlnaWNlcnQuY29tL0RpZ2lD
# ZXJ0VHJ1c3RlZEc0Q29kZVNpZ25pbmdSU0E0MDk2U0hBMzg0MjAyMUNBMS5jcmww
# gZQGCCsGAQUFBwEBBIGHMIGEMCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5kaWdp
# Y2VydC5jb20wXAYIKwYBBQUHMAKGUGh0dHA6Ly9jYWNlcnRzLmRpZ2ljZXJ0LmNv
# bS9EaWdpQ2VydFRydXN0ZWRHNENvZGVTaWduaW5nUlNBNDA5NlNIQTM4NDIwMjFD
# QTEuY3J0MAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggIBAIBjbC5Ij0h8WZaU
# 4brNiNPtMybRjaf8E6AdedwbnCkwxl4rzs/FkJKtFanoLNWmqwinievuHWq5mkkF
# AXs8fTdyRZ4+h6ohDJ6R5vEBjmomPYQI9UkpjE86X0CRBeTRZJiBJ8TGxdqqqHPC
# Vt+P+glvxtYLyOTMI/mBJvbkGlPGP17J9cw8gBsj5KvIBC7nEZELhnjdhmG2EoSi
# N/NJcofcj35pKvIBHsZa32kVqU/pGJFn5aWDItda37M819UG1PoBD9g+t/LDNc1k
# w4/0Vcue8NUF7CX+c6uS9vka1OPoMiH8FBDbFV3/BAm6HASI8Oc8muZn7DayLpsZ
# +tP1gcG3ZvbFeRV6g/C8ZTh2KZpCgRByJ09hBQzb577Jo4jMLLlH5eef0rFsHBdw
# kR9g3/DCwmD2GhQftFS0Eo6VfJUm2MYeBIsPoXf10mcY41zJMrnSJyiFVQisWIDB
# eEM2KjY9/2zLby05qXjWK6jDeYehMoLcwDVYS0SsXlU7jL8uEpMgA92+/5KQaQEe
# HRLmrVJ/ij8iwgLm6bd89ErqinhDSlefoMHjo/oeT/WpfX0KCuxbd5zfMB1WNPkL
# t8chH+4BAd5O5Fr2aYL+dLU2mtVAVLbwi13Pcu8aHESVgFb3KdUu0pfniCfI4nQo
# BmLfIDps9jiDEOt7iWWaLw2hJk4sMYIaoDCCGpwCAQEwfTBpMQswCQYDVQQGEwJV
# UzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4xQTA/BgNVBAMTOERpZ2lDZXJ0IFRy
# dXN0ZWQgRzQgQ29kZSBTaWduaW5nIFJTQTQwOTYgU0hBMzg0IDIwMjEgQ0ExAhAN
# BZQ00FZUZlTa2SaHOYEhMA0GCWCGSAFlAwQCAQUAoHwwEAYKKwYBBAGCNwIBDDEC
# MAAwGQYJKoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwG
# CisGAQQBgjcCARUwLwYJKoZIhvcNAQkEMSIEIPNDs0n957YfX6O/DzdMGF3lGpf1
# FqO8TkDn/WI1x+mfMA0GCSqGSIb3DQEBAQUABIICAIFdniHThYi/jPw5zVyd2aBV
# 1EbdHrBC2gtjN0w9hV/bp4GcIgSVgj80BY4hR/kgisy0w48i2fMW7iusA5a/yoRx
# 0BD5VY1DkTp+0763bAbjzV5f8K7oTnWEB5DKtFLu0dgik2rJYelUcDFM2EPptH4X
# clsNI1DN/8EE7YWnYc6P5hfe2GPdSAT73qXgheuSSCXENeg9R0pymshUTcmi/Zqb
# kosip2IKpCCZ1SQbzI9+r4cHx1qty0VJzryJK5vK4l5AnKblYgAfPNJgdVYnLotL
# CzG9Np5v+QIk3DBF4OUi3QRw1UK54VjZaUg46hJdr7yHMhciLkWu0mdQVuv7QHwP
# IVvn10un65TObuj5Q+g+5w3ul1ScQr6uzytUuPtPMfi9GXyp8O+oEqSuUbPy3dz2
# RyxOD1AT5YY4JUVcxBwcK27wy+Z56l74X+gX8X8PqF+oG0DmRaOHCk80Ob9SodPl
# bhtChXURGcpKvHcBHBSvVnDcsPcUZwHjyATIz/9OvvYWJe6aEiK5Mb0qeSCIuJlW
# 1l0i2v5o9B+tu3AT157BvZR3JhHt4khg8l6tojB6jhKbHCO2HlzAEpK1eLAd2YxD
# AbUGPn1GCFzW4YlDDyit97yGSNWoExB6Xp5UI3TyPBrh74lgFoHJs+Zojj+JSaYK
# YceLUqrqoztzFjU+GlUBoYIXdjCCF3IGCisGAQQBgjcDAwExghdiMIIXXgYJKoZI
# hvcNAQcCoIIXTzCCF0sCAQMxDzANBglghkgBZQMEAgEFADB3BgsqhkiG9w0BCRAB
# BKBoBGYwZAIBAQYJYIZIAYb9bAcBMDEwDQYJYIZIAWUDBAIBBQAEIFKqdcZX7yfr
# Hhgm6nrErVDLu1r0HlES13sYgCTSn2CXAhA3ycdC9w11QdT+7gRXwqX8GA8yMDI2
# MDQxMDE2MjQ0NlqgghM6MIIG7TCCBNWgAwIBAgIQCoDvGEuN8QWC0cR2p5V0aDAN
# BgkqhkiG9w0BAQsFADBpMQswCQYDVQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQs
# IEluYy4xQTA/BgNVBAMTOERpZ2lDZXJ0IFRydXN0ZWQgRzQgVGltZVN0YW1waW5n
# IFJTQTQwOTYgU0hBMjU2IDIwMjUgQ0ExMB4XDTI1MDYwNDAwMDAwMFoXDTM2MDkw
# MzIzNTk1OVowYzELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDkRpZ2lDZXJ0LCBJbmMu
# MTswOQYDVQQDEzJEaWdpQ2VydCBTSEEyNTYgUlNBNDA5NiBUaW1lc3RhbXAgUmVz
# cG9uZGVyIDIwMjUgMTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANBG
# rC0Sxp7Q6q5gVrMrV7pvUf+GcAoB38o3zBlCMGMyqJnfFNZx+wvA69HFTBdwbHwB
# SOeLpvPnZ8ZN+vo8dE2/pPvOx/Vj8TchTySA2R4QKpVD7dvNZh6wW2R6kSu9RJt/
# 4QhguSssp3qome7MrxVyfQO9sMx6ZAWjFDYOzDi8SOhPUWlLnh00Cll8pjrUcCV3
# K3E0zz09ldQ//nBZZREr4h/GI6Dxb2UoyrN0ijtUDVHRXdmncOOMA3CoB/iUSROU
# INDT98oksouTMYFOnHoRh6+86Ltc5zjPKHW5KqCvpSduSwhwUmotuQhcg9tw2YD3
# w6ySSSu+3qU8DD+nigNJFmt6LAHvH3KSuNLoZLc1Hf2JNMVL4Q1OpbybpMe46Yce
# NA0LfNsnqcnpJeItK/DhKbPxTTuGoX7wJNdoRORVbPR1VVnDuSeHVZlc4seAO+6d
# 2sC26/PQPdP51ho1zBp+xUIZkpSFA8vWdoUoHLWnqWU3dCCyFG1roSrgHjSHlq8x
# ymLnjCbSLZ49kPmk8iyyizNDIXj//cOgrY7rlRyTlaCCfw7aSUROwnu7zER6EaJ+
# AliL7ojTdS5PWPsWeupWs7NpChUk555K096V1hE0yZIXe+giAwW00aHzrDchIc2b
# Qhpp0IoKRR7YufAkprxMiXAJQ1XCmnCfgPf8+3mnAgMBAAGjggGVMIIBkTAMBgNV
# HRMBAf8EAjAAMB0GA1UdDgQWBBTkO/zyMe39/dfzkXFjGVBDz2GM6DAfBgNVHSME
# GDAWgBTvb1NK6eQGfHrK4pBW9i/USezLTjAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0l
# AQH/BAwwCgYIKwYBBQUHAwgwgZUGCCsGAQUFBwEBBIGIMIGFMCQGCCsGAQUFBzAB
# hhhodHRwOi8vb2NzcC5kaWdpY2VydC5jb20wXQYIKwYBBQUHMAKGUWh0dHA6Ly9j
# YWNlcnRzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRHNFRpbWVTdGFtcGlu
# Z1JTQTQwOTZTSEEyNTYyMDI1Q0ExLmNydDBfBgNVHR8EWDBWMFSgUqBQhk5odHRw
# Oi8vY3JsMy5kaWdpY2VydC5jb20vRGlnaUNlcnRUcnVzdGVkRzRUaW1lU3RhbXBp
# bmdSU0E0MDk2U0hBMjU2MjAyNUNBMS5jcmwwIAYDVR0gBBkwFzAIBgZngQwBBAIw
# CwYJYIZIAYb9bAcBMA0GCSqGSIb3DQEBCwUAA4ICAQBlKq3xHCcEua5gQezRCESe
# Y0ByIfjk9iJP2zWLpQq1b4URGnwWBdEZD9gBq9fNaNmFj6Eh8/YmRDfxT7C0k8FU
# FqNh+tshgb4O6Lgjg8K8elC4+oWCqnU/ML9lFfim8/9yJmZSe2F8AQ/UdKFOtj7Y
# MTmqPO9mzskgiC3QYIUP2S3HQvHG1FDu+WUqW4daIqToXFE/JQ/EABgfZXLWU0zi
# TN6R3ygQBHMUBaB5bdrPbF6MRYs03h4obEMnxYOX8VBRKe1uNnzQVTeLni2nHkX/
# QqvXnNb+YkDFkxUGtMTaiLR9wjxUxu2hECZpqyU1d0IbX6Wq8/gVutDojBIFeRlq
# AcuEVT0cKsb+zJNEsuEB7O7/cuvTQasnM9AWcIQfVjnzrvwiCZ85EE8LUkqRhoS3
# Y50OHgaY7T/lwd6UArb+BOVAkg2oOvol/DJgddJ35XTxfUlQ+8Hggt8l2Yv7roan
# cJIFcbojBcxlRcGG0LIhp6GvReQGgMgYxQbV1S3CrWqZzBt1R9xJgKf47CdxVRd/
# ndUlQ05oxYy2zRWVFjF7mcr4C34Mj3ocCVccAvlKV9jEnstrniLvUxxVZE/rptb7
# IRE2lskKPIJgbaP5t2nGj/ULLi49xTcBZU8atufk+EMF/cWuiC7POGT75qaL6vdC
# vHlshtjdNXOCIUjsarfNZzCCBrQwggScoAMCAQICEA3HrFcF/yGZLkBDIgw6SYYw
# DQYJKoZIhvcNAQELBQAwYjELMAkGA1UEBhMCVVMxFTATBgNVBAoTDERpZ2lDZXJ0
# IEluYzEZMBcGA1UECxMQd3d3LmRpZ2ljZXJ0LmNvbTEhMB8GA1UEAxMYRGlnaUNl
# cnQgVHJ1c3RlZCBSb290IEc0MB4XDTI1MDUwNzAwMDAwMFoXDTM4MDExNDIzNTk1
# OVowaTELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDkRpZ2lDZXJ0LCBJbmMuMUEwPwYD
# VQQDEzhEaWdpQ2VydCBUcnVzdGVkIEc0IFRpbWVTdGFtcGluZyBSU0E0MDk2IFNI
# QTI1NiAyMDI1IENBMTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBALR4
# MdMKmEFyvjxGwBysddujRmh0tFEXnU2tjQ2UtZmWgyxU7UNqEY81FzJsQqr5G7A6
# c+Gh/qm8Xi4aPCOo2N8S9SLrC6Kbltqn7SWCWgzbNfiR+2fkHUiljNOqnIVD/gG3
# SYDEAd4dg2dDGpeZGKe+42DFUF0mR/vtLa4+gKPsYfwEu7EEbkC9+0F2w4QJLVST
# EG8yAR2CQWIM1iI5PHg62IVwxKSpO0XaF9DPfNBKS7Zazch8NF5vp7eaZ2CVNxpq
# umzTCNSOxm+SAWSuIr21Qomb+zzQWKhxKTVVgtmUPAW35xUUFREmDrMxSNlr/NsJ
# yUXzdtFUUt4aS4CEeIY8y9IaaGBpPNXKFifinT7zL2gdFpBP9qh8SdLnEut/Gcal
# NeJQ55IuwnKCgs+nrpuQNfVmUB5KlCX3ZA4x5HHKS+rqBvKWxdCyQEEGcbLe1b8A
# w4wJkhU1JrPsFfxW1gaou30yZ46t4Y9F20HHfIY4/6vHespYMQmUiote8ladjS/n
# J0+k6MvqzfpzPDOy5y6gqztiT96Fv/9bH7mQyogxG9QEPHrPV6/7umw052AkyiLA
# 6tQbZl1KhBtTasySkuJDpsZGKdlsjg4u70EwgWbVRSX1Wd4+zoFpp4Ra+MlKM2ba
# oD6x0VR4RjSpWM8o5a6D8bpfm4CLKczsG7ZrIGNTAgMBAAGjggFdMIIBWTASBgNV
# HRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBTvb1NK6eQGfHrK4pBW9i/USezLTjAf
# BgNVHSMEGDAWgBTs1+OC0nFdZEzfLmc/57qYrhwPTzAOBgNVHQ8BAf8EBAMCAYYw
# EwYDVR0lBAwwCgYIKwYBBQUHAwgwdwYIKwYBBQUHAQEEazBpMCQGCCsGAQUFBzAB
# hhhodHRwOi8vb2NzcC5kaWdpY2VydC5jb20wQQYIKwYBBQUHMAKGNWh0dHA6Ly9j
# YWNlcnRzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydFRydXN0ZWRSb290RzQuY3J0MEMG
# A1UdHwQ8MDowOKA2oDSGMmh0dHA6Ly9jcmwzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2Vy
# dFRydXN0ZWRSb290RzQuY3JsMCAGA1UdIAQZMBcwCAYGZ4EMAQQCMAsGCWCGSAGG
# /WwHATANBgkqhkiG9w0BAQsFAAOCAgEAF877FoAc/gc9EXZxML2+C8i1NKZ/zdCH
# xYgaMH9Pw5tcBnPw6O6FTGNpoV2V4wzSUGvI9NAzaoQk97frPBtIj+ZLzdp+yXdh
# OP4hCFATuNT+ReOPK0mCefSG+tXqGpYZ3essBS3q8nL2UwM+NMvEuBd/2vmdYxDC
# vwzJv2sRUoKEfJ+nN57mQfQXwcAEGCvRR2qKtntujB71WPYAgwPyWLKu6RnaID/B
# 0ba2H3LUiwDRAXx1Neq9ydOal95CHfmTnM4I+ZI2rVQfjXQA1WSjjf4J2a7jLzWG
# NqNX+DF0SQzHU0pTi4dBwp9nEC8EAqoxW6q17r0z0noDjs6+BFo+z7bKSBwZXTRN
# ivYuve3L2oiKNqetRHdqfMTCW/NmKLJ9M+MtucVGyOxiDf06VXxyKkOirv6o02Oo
# XN4bFzK0vlNMsvhlqgF2puE6FndlENSmE+9JGYxOGLS/D284NHNboDGcmWXfwXRy
# 4kbu4QFhOm0xJuF2EZAOk5eCkhSxZON3rGlHqhpB/8MluDezooIs8CVnrpHMiD2w
# L40mm53+/j7tFaxYKIqL0Q4ssd8xHZnIn/7GELH3IdvG2XlM9q7WP/UwgOkw/HQt
# yRN62JK4S1C8uw3PdBunvAZapsiI5YKdvlarEvf8EA+8hcpSM9LHJmyrxaFtoza2
# zNaQ9k+5t1wwggWNMIIEdaADAgECAhAOmxiO+dAt5+/bUOIIQBhaMA0GCSqGSIb3
# DQEBDAUAMGUxCzAJBgNVBAYTAlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAX
# BgNVBAsTEHd3dy5kaWdpY2VydC5jb20xJDAiBgNVBAMTG0RpZ2lDZXJ0IEFzc3Vy
# ZWQgSUQgUm9vdCBDQTAeFw0yMjA4MDEwMDAwMDBaFw0zMTExMDkyMzU5NTlaMGIx
# CzAJBgNVBAYTAlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3
# dy5kaWdpY2VydC5jb20xITAfBgNVBAMTGERpZ2lDZXJ0IFRydXN0ZWQgUm9vdCBH
# NDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAL/mkHNo3rvkXUo8MCIw
# aTPswqclLskhPfKK2FnC4SmnPVirdprNrnsbhA3EMB/zG6Q4FutWxpdtHauyefLK
# EdLkX9YFPFIPUh/GnhWlfr6fqVcWWVVyr2iTcMKyunWZanMylNEQRBAu34LzB4Tm
# dDttceItDBvuINXJIB1jKS3O7F5OyJP4IWGbNOsFxl7sWxq868nPzaw0QF+xembu
# d8hIqGZXV59UWI4MK7dPpzDZVu7Ke13jrclPXuU15zHL2pNe3I6PgNq2kZhAkHnD
# eMe2scS1ahg4AxCN2NQ3pC4FfYj1gj4QkXCrVYJBMtfbBHMqbpEBfCFM1LyuGwN1
# XXhm2ToxRJozQL8I11pJpMLmqaBn3aQnvKFPObURWBf3JFxGj2T3wWmIdph2PVld
# QnaHiZdpekjw4KISG2aadMreSx7nDmOu5tTvkpI6nj3cAORFJYm2mkQZK37AlLTS
# YW3rM9nF30sEAMx9HJXDj/chsrIRt7t/8tWMcCxBYKqxYxhElRp2Yn72gLD76GSm
# M9GJB+G9t+ZDpBi4pncB4Q+UDCEdslQpJYls5Q5SUUd0viastkF13nqsX40/ybzT
# QRESW+UQUOsxxcpyFiIJ33xMdT9j7CFfxCBRa2+xq4aLT8LWRV+dIPyhHsXAj6Kx
# fgommfXkaS+YHS312amyHeUbAgMBAAGjggE6MIIBNjAPBgNVHRMBAf8EBTADAQH/
# MB0GA1UdDgQWBBTs1+OC0nFdZEzfLmc/57qYrhwPTzAfBgNVHSMEGDAWgBRF66Kv
# 9JLLgjEtUYunpyGd823IDzAOBgNVHQ8BAf8EBAMCAYYweQYIKwYBBQUHAQEEbTBr
# MCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5kaWdpY2VydC5jb20wQwYIKwYBBQUH
# MAKGN2h0dHA6Ly9jYWNlcnRzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEFzc3VyZWRJ
# RFJvb3RDQS5jcnQwRQYDVR0fBD4wPDA6oDigNoY0aHR0cDovL2NybDMuZGlnaWNl
# cnQuY29tL0RpZ2lDZXJ0QXNzdXJlZElEUm9vdENBLmNybDARBgNVHSAECjAIMAYG
# BFUdIAAwDQYJKoZIhvcNAQEMBQADggEBAHCgv0NcVec4X6CjdBs9thbX979XB72a
# rKGHLOyFXqkauyL4hxppVCLtpIh3bb0aFPQTSnovLbc47/T/gLn4offyct4kvFID
# yE7QKt76LVbP+fT3rDB6mouyXtTP0UNEm0Mh65ZyoUi0mcudT6cGAxN3J0TU53/o
# Wajwvy8LpunyNDzs9wPHh6jSTEAZNUZqaVSwuKFWjuyk1T3osdz9HNj0d1pcVIxv
# 76FQPfx2CWiEn2/K2yCNNWAcAgPLILCsWKAOQGPFmCLBsln1VWvPJ6tsds5vIy30
# fnFqI2si/xK4VC0nftg62fC2h5b9W9FcrBjDTZ9ztwGpn1eqXijiuZQxggN8MIID
# eAIBATB9MGkxCzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwgSW5jLjFB
# MD8GA1UEAxM4RGlnaUNlcnQgVHJ1c3RlZCBHNCBUaW1lU3RhbXBpbmcgUlNBNDA5
# NiBTSEEyNTYgMjAyNSBDQTECEAqA7xhLjfEFgtHEdqeVdGgwDQYJYIZIAWUDBAIB
# BQCggdEwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMBwGCSqGSIb3DQEJBTEP
# Fw0yNjA0MTAxNjI0NDZaMCsGCyqGSIb3DQEJEAIMMRwwGjAYMBYEFN1iMKyGCi0w
# a9o4sWh5UjAH+0F+MC8GCSqGSIb3DQEJBDEiBCDBNUZoDoyzGa/e5WkM891kDeYx
# QdVzIqPgG4x8FmfUyjA3BgsqhkiG9w0BCRACLzEoMCYwJDAiBCBKoD+iLNdchMVc
# k4+CjmdrnK7Ksz/jbSaaozTxRhEKMzANBgkqhkiG9w0BAQEFAASCAgDEdFjAw5yN
# Re8Nr88ccJlv2X9PCh2UF9paBuvzak2/P6+HU+TB6Qh9HaEn9LmnevMOn/nnRctk
# DbEIF4S09r2WAZP6otle2ss6BVJVpNy1xj0neOPDvgVd9CQGDIgxmb2De9OVTDEZ
# qrafjVt1+u1yC/t7GME1bktfGZIHqeR8HGGBwGCYnpG/k4jmZ2+JjdhVsCy8Pmel
# 759zrX+8D5KUea5OcK/sKhTe5W3mJhHJ40aw8Z+9Sw0bY18g9qk19G4eZPDu+DT/
# 6uKbUi2Iie35Ni9PSLSo4bUDk88mB+VccKIFEb+HqK4FlIW2DouRO4mr/iYwotPn
# Q/MQMEQx00/nYHxyJa58Euaky2SSQmyGw8V5hCVvmOlNqXVNhq/7tp9DUuAnF0S8
# ffdW1vIHI34oQe/oA1nho+Mbg0Gr7XWdT/MEJvIC1F07c8abPsJtaN2ot/TViXbk
# xzHV4cv8wFAUG0+mip0zadbQGlmJAqb9F1eZjp1xsmSaWTSkx2gEQEuecfAALpz9
# XSBrCuzI6BbinSKTQTZZfKVtHY1h7KfMCP1L8WqV4w1Ld1g1+YSrfSaTRaEl5qvy
# KkQbvDqYRfqcTOA1adHEkCynJds7zLTrWrbgmRrQKZVT3ay99LZol57CAjdtTC+c
# 4zT4Ck5eeVos5zSuJDHujh50jlfBVflZFw==
# SIG # End signature block
