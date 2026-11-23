# Copyright Siemens 2019

#region Params

param(
		
	[Parameter(Mandatory=$False,Position = 0)]
	[string]$databaseName = (Get-ItemProperty "HKLM:\Software\Wow6432Node\Camstar\Camstar InSite Common").TxnDBName, 
	
	[Parameter(Mandatory=$False,Position = 1)]
	[string]$serverName = (Get-ItemProperty "HKLM:\Software\Wow6432Node\Camstar\Camstar InSite Common").TxnDBHostName, 
	
	[Parameter(Mandatory=$False,Position = 2)]
	[string]$dbUsername = (Get-ItemProperty "HKLM:\Software\Wow6432Node\Camstar\Camstar InSite Common").LoginName, 
	
	[Parameter(Mandatory=$False,Position = 3)]
	[string]$dbPassword = (Get-ItemProperty "HKLM:\Software\Wow6432Node\Camstar\Camstar InSite Common").LoginPassword,        

	[Parameter(Mandatory=$False,Position = 4)]
	[string]$schema,

    [Parameter(Mandatory=$False,Position = 5)]
	[string]$port,

    [Parameter(Mandatory=$False,Position = 6)]
	[string]$dbtype = (Get-ItemProperty "HKLM:\Software\Wow6432Node\Camstar\Camstar InSite Common").TxnDBType,
	
	[Parameter(Position = 7)]
	[bool]$isHosted,

    [Parameter(Mandatory=$False,Position = 8)]
	[string]$camstarPath = (Get-ItemProperty "HKLM:\Software\Wow6432Node\Camstar\Path")."(Default)",
    
    [Parameter(Mandatory=$False,Position = 9)]
    [string]$portSource = (Get-ItemProperty "HKLM:\Software\Wow6432Node\Camstar\Camstar InSite Common").TxnDBConnectionParameters,
    
    [Parameter(Mandatory=$False,Position = 10)]
    [string]$ODACHintPath = "Oracle.ManagedDataAccess.dll"
) 

#endregion


function Select-FolderDialog {
    param(
        [string]$Description = "Select Folder",
        [string]$SelectedPath = "Desktop"
    )
       
    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null     

    $objForm = New-Object System.Windows.Forms.FolderBrowserDialog
    $objForm.SelectedPath = $SelectedPath
    $objForm.Description = $Description
    $Show = $objForm.ShowDialog()
    if ($Show -ne "OK") {
        return $null
    }
    $objForm.SelectedPath
}


function Get-OraclePath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$OraclePath,
        [Parameter(Mandatory = $false)]
        [bool]$NoPromptForPath = $false
    )       

    # Get Oracle path 
    if ($OraclePath -eq '' -or ($OraclePath -notmatch "Oracle.ManagedDataAccess.dll`$") -or !(Test-Path -Path $OraclePath) ) 
    {
        [bool] $finished = $false
        [string]$basePath = $null;

        if ( (![string]::IsNullOrWhiteSpace($OraclePath)) -and ((Test-Path -Path $OraclePath))) {

            $searchResults = get-childitem -path $OraclePath -Filter 'Oracle.ManagedDataAccess.dll' -Recurse -ErrorAction SilentlyContinue | 
            where-object { $_.FullName -match "\\Oracle.ManagedDataAccess.dll`$" } | 
            sort-object FullName -Descending | Select-Object FullName

            # if found
            if ($null -ne $searchResults) { 
                $OraclePath = $searchResults[0].FullName
                $finished = $true;
            }
            else {
                Write-Host -ForegroundColor Red "`nError: Oracle.ManagedDataAccess.dll not found in folder tree."
                $finished = $false;
            }
        }     

        if (!$finished)
        {
            # First try a reg search.
            try{
                $odac_home = Get-ItemProperty -Path "HKLM:\SOFTWARE\Oracle\*" -Name "ORACLE_HOME";
                $basePath = $odac_home.ORACLE_HOME;
                Write-Host "ORACLE_HOME basePath from reg search 1: " $basePath;
            }
            catch{
                $basePath = $null;
            }
            
            if ([string]::IsNullOrWhiteSpace($basePath)) {
                # Try known key/value.
                try{
                    $basePath = (Get-ItemProperty "HKLM:\SOFTWARE\Oracle\KEY_odac")."ORACLE_HOME";
                    Write-Host "ORACLE_HOME basePath from reg search 2: " $basePath;
                }
                catch{
                    $basePath = $null;
                }
            }
            
            if ([string]::IsNullOrWhiteSpace($basePath)) {
                # Try another known key/value.
                try{
                    $basePath = (Get-ItemProperty "HKLM:\SOFTWARE\Oracle\KEY_both")."ORACLE_HOME";
                    Write-Host "ORACLE_HOME basePath from reg search 3: " $basePath;
                }
                catch{
                    $basePath = $null;
                }
            }

            if (![string]::IsNullOrWhiteSpace($basePath)) {

                $searchResults = get-childitem -path $basePath -Filter 'Oracle.ManagedDataAccess.dll' -Recurse -ErrorAction SilentlyContinue | 
                where-object { $_.FullName -match "\\Oracle.ManagedDataAccess.dll`$" } | 
                sort-object FullName -Descending | Select-Object FullName

                # if found
                if ($null -ne $searchResults) { 
                    $OraclePath = $searchResults[0].FullName
                    $finished = $true;
                }
                else {
                    Write-Host -ForegroundColor Red "`nError: Oracle.ManagedDataAccess.dll not found in folder tree."
                    $finished = $false;
                    $basePath = $null;
                }
            }
        }

        #while (!$finished)
        #{
        #    $basePath = $null;
        #    if (!$NoPromptForPath) {
        #        # Prompt the user for a location to search.
        #        $basePath = Select-FolderDialog -Description "** Choose Oracle Managed Data Access folder **"  
        #        if (![string]::IsNullOrWhiteSpace($basePath)) {

        #            $searchResults = get-childitem -path $basePath -Filter 'Oracle.ManagedDataAccess.dll' -Recurse -ErrorAction SilentlyContinue | 
        #            where-object { $_.FullName -match "\\Oracle.ManagedDataAccess.dll`$" } | 
        #            sort-object FullName -Descending | Select-Object FullName

        #            # if found
        #            if ($null -ne $searchResults) { 
        #                $OraclePath = $searchResults[0].FullName
        #                $finished = $true;
        #            }
        #            else {
        #                Write-Host -ForegroundColor Red "`nError: Oracle.ManagedDataAccess.dll not found in folder tree."
        #                $finished = $false;
        #            }
        #        }
        #        else {
        #            $finished = $true;
        #        } 
        #    }
        #    else {
        #        Write-Host -ForegroundColor Red "`nError: Oracle.ManagedDataAccess.dll not found in folder tree."
        #        $finished = $true;
        #    }            
        #}
    }

    return $OraclePath
}

function Get-ODAC {
    param(
        [Parameter(Mandatory = $false)]
        [string]$OracleHintPath = "Oracle.ManagedDataAccess.dll",
        [Parameter(Mandatory = $false)]
        [bool]$NoPromptForPath = $false
    ) 

    [bool]$fLoaded = $false;

    # if it is in the path or GAC then it should load. try that first.
    try {
        [System.Reflection.Assembly]$asm = $null;
        try {
            #GAC first
            #$asm = [System.Reflection.Assembly]::Load("Oracle.ManagedDataAccess, Version=4.122.18.3, Culture=neutral, PublicKeyToken=89b483f429c47342, processorArchitecture=MSIL");
            $asm = [System.Reflection.Assembly]::LoadWithPartialName("Oracle.ManagedDataAccess")
            if (![string]::IsNullOrEmpty($asm.FullName)) {
                # make sure it actually worked by attempting to use it.
                $oracleConnection = [Oracle.ManagedDataAccess.Client.OracleConnection]::new();
                Write-Host "Loaded ODAC from: " $asm.CodeBase;
                $fLoaded = $true;
            }
        }
        catch {
            $fLoaded = $false;
        }

        if (!$fLoaded) {
            #Path second
            $asm = [System.Reflection.Assembly]::LoadFrom($OracleHintPath);
            if (![string]::IsNullOrEmpty($asm.FullName)) {
                # make sure it actually worked by attempting to use it.
                $oracleConnection = [Oracle.ManagedDataAccess.Client.OracleConnection]::new();
                Write-Host "Loaded ODAC from: " $asm.CodeBase;
                $fLoaded = $true;
            }
        }
    }
    catch {
        $fLoaded = $false;
    }

    if (!$fLoaded) {
        # Go looking for it.
        try {
            [string]$oraclePath = Get-OraclePath -OraclePath $OracleHintPath;
            Write-Host "Get-OraclePath returned: " $oraclePath
            Add-Type -Path $oraclePath
            # make sure it actually worked by attempting to use it.
            $oracleConnection = [Oracle.ManagedDataAccess.Client.OracleConnection]::new();
            $fLoaded = $true;
        }
        catch {
            $fLoaded = $false;
        }
    }

    if (!$fLoaded) {
        $message = "ERROR: Could not load Oracle.ManagedDataAccess assembly. Oracle ODAC must be installed."
        write-output $message
	if($isHosted) {
            Read-Host "$message"
         }
    }

    return $fLoaded;
}


<#
.SYNOPSIS
Execute of SQL scripts for MSS
#>
function Invoke-SQLScript([String]$HostName,[String]$ServiceName,[String]$SQLPort,[String]$UserName,[String]$CurrentPassword, [String] $ScriptText)
{  
       if($SQLPort -ne "")
       {
         $HostName = $HostName + "," + $SQLPort
       }

       $SQLText = Get-Content $ScriptText
              
       # built the connection string
        $connectionString = "Data Source=$HostName;Initial Catalog=$ServiceName;User Id=$UserName;Password=$CurrentPassword;"
            try {
                    # Try and connect to server
                    $sqlConn = new-object Data.SqlClient.SqlConnection($connectionString)
                    $delimiter = "GO"
                   
                   # Break up statements by delimiter
                      $SQLScript = Get-Content $ScriptText -Delimiter "GO"
                
                 foreach($text in $SQLScript)
                   {
                  
                        if($text -ne "")
                        {
                            if($sqlConn.State -ne 'Open')
                            {
                            $sqlConn.Open()
                            }
                                # If connection was made to the server
                            if ($sqlConn.State -eq 'Open')
                            {   

                                #Replace Delimiter with white space for execution of SQL statement
                                $_ = $text.Replace("GO","")

                               #Create the SQL Command object                  
                               $sqlcommand = new-object system.data.sqlclient.sqlcommand($_, $sqlConn) 

                               #Execute script
                               $test =  $sqlcommand.ExecuteNonQuery()
                            } 
                        }
                   }
                }

            catch  {     
                      # If connection failed write to verbose                                  
                       $excetion = $_.Exception.Message
                       WriteLog "Exception: On server - $HostName for script - $ScriptText error - $excetion"
                        if ($sqlConn.State -ne 'Open')
                        {
                         WriteLog "Exception: Not available Server: $HostName";
                        }
                       Exit    
                    } 
            finally 
                    {
                      $sqlConn.Close();
                      $sqlConn.Dispose()
                    } 
}

<#
.SYNOPSIS
Parses out the full script in to commands and reads the header text
#>
function OracleScriptParser([string] $file)
{
    $port = ($portSource -split "\=",2)[1]

    $dllsource = $camstarPath + "InSite Administration\Camstar.Util.dll"
    Add-Type -Path $dllsource
    $decryptedPassword = [Camstar.Util.CryptUtil]::Decrypt($dbPassword)

    $fullText = Get-Content $file -Delimiter "--#delimiter"

     foreach($text in $fullText)
    {

		#WriteLog -message $file
        $sqlStatements = $text.Replace("--#delimiter","")
        
        #looks for header text and if not runs script command. Looks also the end of the script
        if($sqlStatements.Contains("-------") -OR !$sqlStatements -OR $sqlStatements.trim().Length -eq 0)
            {
                #WriteLog -message $sqlStatements
                continue
            }
        else
            {    
                Invoke-OracleScript  -HostName $serverName -ServiceName $databaseName -SQLPort $port -UserName $dbUsername -CurrentPassword $decryptedPassword -ScriptText $sqlStatements
            }
    }

}

<#
.SYNOPSIS
Executes Qracle scripts using the Oracle Data Access Components.
#>
function Invoke-OracleScript([String]$HostName,[String]$ServiceName,[String]$SQLPort,[String]$UserName,[String]$CurrentPassword, [String] $ScriptText)
{
	try
	{

		$SQLConnectionString = "Data Source= (DESCRIPTION =(ADDRESS =(PROTOCOL = TCP)(HOST = " + $HostName + ")(PORT = " + $SQLPORT + "))(CONNECT_DATA =(SERVICE_NAME = " + $ServiceName + ")));User Id=" + $UserName + ";Password=" + $CurrentPassword + ";"
		$SQLConnection = New-Object Oracle.ManagedDataAccess.Client.OracleConnection($SQLConnectionString)
		$SQLConnection.Open()

        $SQLcommand = $SQLConnection.CreateCommand() #SET DEFINE OFF

        $SQLcommand.CommandText = $ScriptText
                                                                                                                                                                                                                                      
        $test = $SQLcommand.ExecuteNonQuery()

	}
	catch
	    {
          $ErrorMessage = $_.Exception.Message
          $message = "Exception: Failed for the Oracle account '$UserName' on Host '$HostName' and this script.`n*************** $ScriptText***************`nError = '$ErrorMessage'"
          WriteLog $message
          Exit
	    }
    finally
            {
                $SQLConnection.Close()
           
                $SQLConnection.Dispose()
            }
}

<#This is the main function for processing.#>
function Main
{
    $port = ($portSource -split "\=",2)[1]

    $sqlScript = $camstarPath + "Industry Solutions\Industry\Scripts\Mssql\isPopulatePortalMenuUpdateData.sql"
    $sqlScript2 = $camstarPath + "Industry Solutions\Industry\Scripts\Mssql\isResourcesResolvedCalendar.sql"
    $sqlScript3 = $camstarPath + "Industry Solutions\Industry\Scripts\Mssql\is_OEECalculation.sql"
    $sqlScript4 = $camstarPath + "Industry Solutions\Industry\Scripts\Mssql\isPopulateDefaultUserQuery.sql"
    $sqlScript5 = $camstarPath + "Industry Solutions\Industry\Scripts\Mssql\isFunctionsAndProcedures.sql"
	
    $oracleScript = $camstarPath + "Industry Solutions\Industry\Scripts\Oracle\isPopulatePortalMenuUpdateData.or.sql"
    $oracleScript2 = $camstarPath + "Industry Solutions\Industry\Scripts\Oracle\isResourcesResolvedCalendar.or.sql"
    $oracleScript3 = $camstarPath + "Industry Solutions\Industry\Scripts\Oracle\is_OEECalculation.or.sql"
    $oracleScript4 = $camstarPath + "Industry Solutions\Industry\Scripts\Oracle\isPopulateDefaultUserQuery.or.sql"
    $oracleScript5 = $camstarPath + "Industry Solutions\Industry\Scripts\Oracle\isFunctionsAndProcedures.or.sql"

    $RelativeDirectory = get-location;

    $dllsource = $camstarPath + "InSite Administration\Camstar.Util.dll"
    Add-Type -Path $dllsource
    $decryptedPassword = [Camstar.Util.CryptUtil]::Decrypt($dbPassword)  

    if ($dbtype -eq "SQLServer")
    {
        try{
            #This is where we are excuting the Script  
                  
            Invoke-SQLScript -HostName $serverName -ServiceName $databaseName -SQLPort $port -UserName $dbUsername -CurrentPassword $decryptedPassword -ScriptText "$sqlScript"
            Invoke-SQLScript -HostName $serverName -ServiceName $databaseName -SQLPort $port -UserName $dbUsername -CurrentPassword $decryptedPassword -ScriptText "$sqlScript2"
            Invoke-SQLScript -HostName $serverName -ServiceName $databaseName -SQLPort $port -UserName $dbUsername -CurrentPassword $decryptedPassword -ScriptText "$sqlScript3"
            Invoke-SQLScript -HostName $serverName -ServiceName $databaseName -SQLPort $port -UserName $dbUsername -CurrentPassword $decryptedPassword -ScriptText "$sqlScript4"
            Invoke-SQLScript -HostName $serverName -ServiceName $databaseName -SQLPort $port -UserName $dbUsername -CurrentPassword $decryptedPassword -ScriptText "$sqlScript5"
           }
        Catch{   
                #WriteLog( $ErrorMessage = $_.Exception.Message)

	            if($isHosted)
                {
                    Read-Host "There was an error  : $ErrorMessage . Please rerun the script!"
                }

             }
    }
    else
    {
        try{ 
            #This is where we are excuting the Script  

            try
            { 
                #[System.Reflection.Assembly]::LoadWithPartialName("Oracle.ManagedDataAccess")
                $fLoadedODAC = Get-ODAC -OracleHintPath:$ODACHintPath
                if ($fLoadedODAC -ne $true){
                    $message = "ERROR: Could not load Oracle assembly."
                    write-output $message
                    if($isHosted)
                    {
                        Read-Host "There was an error  : $message . Please rerun the script!"
                    }
                    Exit
                }
            }
            Catch
            {   
                $message = "ERROR: Could not load Oracle assembly."
                write-output $message
                if($isHosted)
                {
                    Read-Host "There was an error  : $message . Please rerun the script!"
                }
                Exit
            }  
                
            OracleScriptParser -file $oracleScript
            OracleScriptParser -file $oracleScript2
            OracleScriptParser -file $oracleScript3
            OracleScriptParser -file $oracleScript4
            OracleScriptParser -file $oracleScript5
           }
        Catch{   
                #WriteLog( $ErrorMessage = $_.Exception.Message)

	            if($isHosted)
                {
                    Read-Host "There was an error  : $ErrorMessage . Please rerun the script!"
                }

             }
    }
}

######################################
#####        Execution           #####
#####          Order             #####
######################################

$isHosted = $false

Main
# SIG # Begin signature block
# MIIpVQYJKoZIhvcNAQcCoIIpRjCCKUICAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCDdD5BKN/nWOikk
# pl50xt0SGGjkWxEfgiz5bOtqmxVFYKCCDgswggawMIIEmKADAgECAhAIrUCyYNKc
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
# CisGAQQBgjcCARUwLwYJKoZIhvcNAQkEMSIEIFbQ0yqihmdomg7yDAZ2dpamoMAf
# QFCGxFrC0EfsNDEWMA0GCSqGSIb3DQEBAQUABIICAAIV/hiNS3uuvJNQc4zOUN7S
# ArlZHzTXJpG3mrbBPywNJ+gIbNzWl5xQcclBuhhXHv/wL91RxxWXfZ1ZJQ4viSXv
# II1TvhYvx6cflqrKviaMrVdfVV1oQdti2cR8qTaHM9djvz6ZC9jTiGDW0eR2TBfM
# SeX8RBHMhK2IO9PB5j/ScjXiI8Ru5AEW75W+AfiwPzFg9Q26UfL0VGIaaDdt5EeY
# l+OZjYtXdW1AGzGxX+kzCx2qMl9NNui7766vkz0yeFKxKBviiw3y1xazRVCG1pFV
# 5ZubUiAir09qhRXbV3Y8Ca51xgEH+0mMOwJzOGDwFeMSb2S1RqNmQTdSnkFl+aGO
# s5eGS/yYsNJq8TA9lCyb9XqjqNO7yoR5pmj0dlmNFuVvDQ1lXhGvI4HB1vaHjUeW
# pm1KS5nPmj+BJcUFOGuRJyoErhy/1SFTe256uywSkoRrjsF42oIk5GZXZZbUW2wb
# Zt3Prpc457r89ggU+3s8FpQQNYxayS+8t0IPBW//KPHPW8VyiUGXLA7vlMChFINH
# lzDrIWbVgJZy3IMkJVTV+XUK9kBOXasKvbrTtukV6SJY9nez2U62eN0nq65jRnge
# pZgVCMmQXTmeE5QNydmFuMWKMYIFgst6ognqrN2Ry52BC4nmkNhcPTx7BeOV0v+k
# eHj87HGql0fU1isHyeNxoYIXdjCCF3IGCisGAQQBgjcDAwExghdiMIIXXgYJKoZI
# hvcNAQcCoIIXTzCCF0sCAQMxDzANBglghkgBZQMEAgEFADB3BgsqhkiG9w0BCRAB
# BKBoBGYwZAIBAQYJYIZIAYb9bAcBMDEwDQYJYIZIAWUDBAIBBQAEIM7E+bly/zGr
# 0Ytx+nlHGkhPXs84vSPUSUtdr6jdnSwGAhAX1yVIerVcrtZxR8OYrQt2GA8yMDI2
# MDQxMDE2MjMwNVqgghM6MIIG7TCCBNWgAwIBAgIQCoDvGEuN8QWC0cR2p5V0aDAN
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
# Fw0yNjA0MTAxNjIzMDVaMCsGCyqGSIb3DQEJEAIMMRwwGjAYMBYEFN1iMKyGCi0w
# a9o4sWh5UjAH+0F+MC8GCSqGSIb3DQEJBDEiBCDz2nBhm9EmfIsUtqC7ga55pKAD
# CMM/fyeqIsh/1eKKrzA3BgsqhkiG9w0BCRACLzEoMCYwJDAiBCBKoD+iLNdchMVc
# k4+CjmdrnK7Ksz/jbSaaozTxRhEKMzANBgkqhkiG9w0BAQEFAASCAgAMWk4YAHqo
# IdEr+VC6AI0uEXd7P46B8krEA0sTDzzToVMmpvM4u5Z2PcY1QEkbfIolqjpIDmOC
# t+V5CfphpD7ZnoVVMa2G8r3+VxJGgw7BdWr3A4OqrvfftWS8G9c8Hxg0BNnlFz+i
# 8fUmOU5McD/V3BnmIq1R+LgUsugcKBQA+E+E1G+zRq47n3G1SWWMqMDAnt7ACPte
# NsxUL9oCHqxEw5VRN8/Pes/pTjMWbVZsQphPzccOhPQ+20TOun8KObosNx/4KUs/
# AAJAV3xEmI2Tav3bH8bTiXHmPxcbDv1aIG6JXVP3zcsec6APk+0PwvM2oRWVVTg3
# +48sclxCoGspgLA54HRejMqoj48oFT4k2pNEJT9pzgKmv6nfhFpaoPVIxNVn/1qF
# BqZYYeNDxOdkIYH3kYjJlSS6zu6GE9phlvWINwK8wHTO3uBKYh8Nr4W5YoMUqLMn
# SNckVFqd1jPfzTyLn0NM04ZacsVcp+2LDShYvwIUPcTGYYBic4DV0bcoY3KLdvKS
# 4KodnFnrYaP5cAz7eZ2Nsc2Fau/o3rXCiwmBZzuYhihIbU+LqMfoZDgHpGCFcWBw
# jllafvDVQjCmU3NGP+M+1QnAiTBx5/Q8bDg7iC46+puI+xZKD1zVfxOAtt98QNHJ
# V8oR/s5PZ/Bcu6F0u52DNIPI/l5xxiy0Tg==
# SIG # End signature block
