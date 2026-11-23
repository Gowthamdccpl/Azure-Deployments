# Self-elevate the script if required
if (-Not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] 'Administrator')) {
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000) {
        $CommandLine = "-File `"" + $MyInvocation.MyCommand.Path + "`" " + $MyInvocation.UnboundArguments
        Start-Process -FilePath PowerShell.exe -Verb Runas -ArgumentList $CommandLine
        Exit
    }
}

# Find Camstar
$camstarPath = $ENV:CamstarInstall
$SSODirPath = Join-Path $camstarPath "SSO"

# Update username, password in web.config and set sso to true
Write-Host "updating web.config..."
Write-Host
$username = Read-Host -Prompt "Please enter the value for the Opcenter admin username. This is the user that has all administrative rights"
$username = $username.Trim()
Write-Host

# Check if passwords match
do {
    $password = Read-Host -Prompt "Please enter password for '$username' User" -AsSecureString
	Write-Host
	$confirmPassword = Read-Host -Prompt "Retype password for confirmation" -AsSecureString
	Write-Host

	$plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
	$plainConfirmPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($confirmPassword))

    if ($plainPassword.Equals($plainConfirmPassword)) {
        Write-Host "Passwords match."
		Write-Host
    }
    else {
        Write-Host "Passwords do not match. Please try again."
		Write-Host
        Start-Sleep -Seconds 1
    }
} until ($plainPassword.Equals($plainConfirmPassword))

# Encrypting password
$CamstarDll = "$camstarPath\InSite Administration\Camstar.Util.dll"
Add-Type -Path $CamstarDll
$encryptedPassword = [Camstar.Util.CryptUtil]::Encrypt($plainPassword)

$configFile = "$camstarPath\Camstar Portal\web.config"
$config = [xml](Get-Content -Path $configFile)
$appSettingsElement = $config.configuration.appSettings
$usernameElement = $appSettingsElement.add | Where-Object { $_.key -eq "username" }
$usernameElement.Attributes["value"].Value = $username
$passwordElement = $appSettingsElement.add | Where-Object { $_.key -eq "password" }
$passwordElement.Attributes["value"].Value = $encryptedPassword
$authFlags = $appSettingsElement.add | Where-Object { $_.key -eq "authFlags" }
$authFlags.value = '{"authType":"SSO","nameSource":"SANUpn"}'
$config.Save($configFile)

# Login Type - SAM/SAML
Write-Host
$LoginType = Read-Host -Prompt "Enter the login method (SAM/SAML)"
$LoginType = $LoginType.Trim()
Write-Host
# Check if LoginType is correct
$userInput = $null
do {
	$userInput = Read-Host "Is the login type '$LoginType' correct?(Y/N)"
	Write-Host
	if ($userInput -eq 'n') {
		$LoginType = Read-Host -Prompt "Enter the correct login type (SAM/SAML)"
		$LoginType = $LoginType.Trim()
		$LoginType = $LoginType.ToUpper()
		Write-Host
	}
} until ($userInput -eq 'y')

# Read SSOConfig or generate new
$filePath = "$camstarPath\InSite Administration\SSOConfig.json"
if (Test-Path -Path $filePath) {
        $jsonContent = Get-Content -Path $filePath -Raw | ConvertFrom-Json
}
else {
        $jsonContent = [PSCustomObject]@{
            AvailableServers = @()
            SelectedServer = ""
            AppServers = @()
        }
    $jsonContent | ConvertTo-Json -Depth 5 | Set-Content -Path $filePath
}

$server = [System.Net.Dns]::GetHostName()+"."+(Get-WmiObject win32_computersystem).Domain

# Check if server name is correct
Write-Host
$userInput = $null
do {
    $userInput = Read-Host "Is the server name (Server where the Camstar proxy and other resources are installed) '$server' correct? (Y/N)"
	Write-Host
    if ($userInput -eq 'n') {
        $server = Read-Host -Prompt "Enter the correct server name"
		$server = $server.Trim()
		Write-Host
    }
} until ($userInput -eq 'y')

# Callback URL
	$CallbackURL = "https://${server}/camstarportal/Default.aspx?mode=classic&theme=Horizon"
	Write-Host "The Callback URL is set by default to - '$CallbackURL'"
	Write-Host
	# Check if Callback URL is correct
	$userInput = $null
	do {
		$userInput = Read-Host "Is the Callback URL '$CallbackURL' correct?(Y/N)"
		Write-Host
		if ($userInput -eq 'n') {
			$CallbackURL = Read-Host -Prompt "Enter the correct URL"
			$CallbackURL = $CallbackURL.Trim()
			Write-Host
		}
	} until ($userInput -eq 'y')

if($LoginType -eq "SAM"){
	
	$IsPKCEEnabled = $false
	# Check for PKCE
	do {
		$pkceInput = Read-Host "Do you want to enable PKCE? (y/n)"
		$pkceInput = $pkceInput.ToLower()
	} while ($pkceInput -ne 'y' -and $pkceInput -ne 'n')

	$IsPKCEEnabled = $pkceInput -eq 'y'

	# Clientid
	Write-Host
	$ClientId = Read-Host -Prompt "Enter ClientId"
	$ClientId = $ClientId.Trim()
	Write-Host
	# Check if ClientSecret is correct
	$userInput = $null
	do {
		$userInput = Read-Host "Is the ClientId '$ClientId' correct?(Y/N)"
		Write-Host
		if ($userInput -eq 'n') {
			$ClientId = Read-Host -Prompt "Enter the correct ClientId"
			$ClientId = $ClientId.Trim()
			Write-Host
		}
	} until ($userInput -eq 'y')

	if ($IsPKCEEnabled) {
		# PKCE enabled - Client Secret is optional
		do {
			$secretInput = Read-Host "Do you want to enter a Client Secret?(Y/N)"
			$secretInput = $secretInput.ToLower()
		} while ($secretInput -ne 'y' -and $secretInput -ne 'n')
		
		if ($secretInput -eq 'y') {
			Write-Host
			$ClientSecret = Read-Host -Prompt "Enter ClientSecret"
			$ClientSecret = $ClientSecret.Trim()
			Write-Host
			# Check if ClientSecret is correct
			$userInput = $null
			do {
				$userInput = Read-Host "Is the ClientSecret '$ClientSecret' correct?(Y/N)"
				Write-Host
				if ($userInput -eq 'n') {
					$ClientSecret = Read-Host -Prompt "Enter the correct ClientSecret"
					$ClientSecret = $ClientSecret.Trim()
					Write-Host
				}
			} until ($userInput -eq 'y')
		} else {
			Write-Host
			$ClientSecret = ""
		}
	} else {
		# PKCE disabled - Client Secret is mandatory
		Write-Host
		$ClientSecret = Read-Host -Prompt "Enter ClientSecret"
		$ClientSecret = $ClientSecret.Trim()
		Write-Host
		# Check if ClientSecret is correct
		$userInput = $null
		do {
			$userInput = Read-Host "Is the ClientSecret '$ClientSecret' correct?(Y/N)"
			Write-Host
			if ($userInput -eq 'n') {
				$ClientSecret = Read-Host -Prompt "Enter the correct ClientSecret"
				$ClientSecret = $ClientSecret.Trim()
				Write-Host
			}
		} until ($userInput -eq 'y')
	}

	# AuthHandlder URL
	$AuthHandlerURL = Read-Host -Prompt "Enter Auth Handler URL"
	$AuthHandlerURL = $AuthHandlerURL.Trim()
	Write-Host
	# Check if AuthHandler URL is correct
	$userInput = $null
	do {
		$userInput = Read-Host "Is the AuthHandler URL '$AuthHandlerURL' correct?(Y/N)"
		Write-Host
		if ($userInput -eq 'n') {
			$AuthHandlerURL = Read-Host -Prompt "Enter the correct URL"
			$AuthHandlerURL = $AuthHandlerURL.Trim()
			Write-Host
		}
	} until ($userInput -eq 'y')
	
	# PostLogOutURL
	$PostLogOutURL = Read-Host -Prompt "Enter PostLogOut URL"
	$PostLogOutURL = $PostLogOutURL.Trim()
	Write-Host
	# Check if PostLogOutURL URL is correct
	$userInput = $null
	do {
		$userInput = Read-Host "Is the PostLogOut URL '$PostLogOutURL' correct?(Y/N)"
		Write-Host
		if ($userInput -eq 'n') {
			$PostLogOutURL = Read-Host -Prompt "Enter the correct URL"
			$PostLogOutURL = $PostLogOutURL.Trim()
			Write-Host
		}
	} until ($userInput -eq 'y')
	
	$urlProtocol = "https"

	# Update the JSON content
	$jsonContent.AvailableServers = @($server)
	$jsonContent.SelectedServer = $server

	$appServerObject = [PSCustomObject]@{
		ServerName = $server
		LoginMethod = "SAM"
		ProtocolOption = $urlProtocol
		SAMConfig = [PSCustomObject]@{
			IsPKCEEnabled = $IsPKCEEnabled
			ClientId = $ClientId
			CallBackURL = $CallbackURL
			ClientSecret = $ClientSecret
			AuthHandler = $AuthHandlerURL
			PostLogOutURL = $PostLogOutURL
			RedirectURL = "https://${server}/IDPAgent/api/v1/sso-service-provider/sam/provider/callback"
		}
		DefaultConfiguration = [PSCustomObject]@{
			ServerURL = ""
		}
		SamlServiceProvider = [PSCustomObject]@{
			SamlExtIdpPublicKey = ""
			SamlEndpoint = ""
			SamlEntityID = ""
			SamlAssertUrl = ""
			SamlStartSLOUrl = ""
			SamlLogoutRequestUrl = ""
			SamlLogoutResponseUrl = ""
			SamlCallBackUrl = ""
			SamlPrivateKey = ""
			SamlPassword = ""
		}
	}
}
elseif ($LoginType -eq "SAML"){
	# Create the folder structure
	try {
		New-Item -ItemType Directory -Path "$SSODirPath\IDPAgent\app_data" -ErrorAction Stop
		New-Item -ItemType Directory -Path "$SSODirPath\IDPAgent\app_data\Certificates" -ErrorAction Stop
		New-Item -ItemType Directory -Path "$SSODirPath\IDPAgent\app_data\jwt" -ErrorAction Stop
	}
	catch {
		if ($_.Exception.Message -like "*already exists*") {
			Write-Host "The 'app_data' directory already exists. Skipping folder creation."
			Write-Host
		}
		else {
			Write-Host "An error occurred while creating the folder structure: $($_.Exception.Message)"
			Exit
		}
	}

	# Copy SAML Certificate
	Write-Host
	Write-Host
	$validPaths = $false
	while (-not $validPaths) {
		$certificatePath = Read-Host -Prompt "Enter directory location for the certificate(downloaded from the SAML application created)"
		$certificatePath = $certificatePath.Trim()
		
		# Check if source folder exists
		if (-not (Test-Path -Path $certificatePath)) {
			Write-Host "Error: Source directory does not exist: $certificatePath" -ForegroundColor Red
			Write-Host "Please try again with a valid directory path" -ForegroundColor Yellow
			continue
		}

		Write-Host
		$certificate = Read-Host -Prompt "Enter the name of the certificate(downloaded from the SAML application created). Enter full name with extension"
		$certificate = $certificate.Trim()
		$fullCertificatePath = "$certificatePath\$certificate"
		
		# Check if source certificate file exists
		if (-not (Test-Path -Path $fullCertificatePath -PathType Leaf)) {
			Write-Host "Error: Certificate file does not exist: $fullCertificatePath" -ForegroundColor Red
			Write-Host "Please try again with a valid certificate file" -ForegroundColor Yellow
			continue
		}

		$validPaths = $true
	}

	try {
		Copy-Item -Path $fullCertificatePath -Destination $SSODirPath\IDPAgent\app_data\Certificates -Force -ErrorAction Stop
	}
	catch {
		Write-Host "`nError copying certificate: $_" -ForegroundColor Red
		Write-Host "Please ensure you have sufficient permissions to write to $destinationFolder." -ForegroundColor Red
	}
	
	# Protocol(https/http)
	Write-Host
	$protocol = Read-Host "Which protocol needs to be used? (http or https)"
	$protocol = $protocol.Trim()
	# Check if protocol is correct
	Write-Host
	$userInput = $null
	do {
		$userInput = Read-Host "Is the protocol '$protocol' correct?(Y/N)"
		Write-Host
		if ($userInput -eq 'n') {
			$protocol = Read-Host -Prompt "Enter the correct protocol"
			Write-Host
		}
	} until ($userInput -eq 'y')
	$protocol = $protocol.Trim().ToUpper()
	$urlProtocol = $protocol.ToLower()

	# Password for pfx file
	$password = "localhost"
	$passwordBytes = [System.Text.Encoding]::UTF8.GetBytes($password)
	$passwordEncoded = [System.Convert]::ToBase64String($passwordBytes)
	
	Write-Host "The following URLs will be updated to login via SAML" -ForegroundColor Yellow
	Write-Host

	# Input for URLs
	Write-Host "Please make sure you are entering the details correctly"
	Write-Host
	Write-Host "EndpointURL" -ForegroundColor Yellow
	Write-Host "This is the endpoint where the service provider sends the login request to the identity provider. For example-if Azure AD is used,the Endpoint URL will be the Login URL provided by the IDP."
	Write-Host
	Write-Host "EntityID URL" -ForegroundColor Yellow
	Write-Host "This is the Unique identifier for the SAML entity created on the Azure AD portal. For example: https://opcenter-core-ex-azad.com"
	Write-Host
	Write-Host "Logout URL" -ForegroundColor Yellow
	Write-Host "This is the URL to the IDP logout url."
	Write-Host

	# SAML Endpoint URL
	Write-Host
	$SAMLEndpoint = Read-Host -Prompt "Enter Endpoint URL(Endpoint where the service provider sends the login request to the identity provider). Enter the entire URL"
	$SAMLEndpoint = $SAMLEndpoint.Trim()
	Write-Host
	# Check if Endpoint URL is correct
	$userInput = $null
	do {
		$userInput = Read-Host "Is the SAMLEndpoint URL '$SAMLEndpoint' correct?(Y/N)"
		Write-Host
		if ($userInput -eq 'n') {
			$SAMLEndpoint = Read-Host -Prompt "Enter the correct URL"
			$SAMLEndpoint = $SAMLEndpoint.Trim()
			Write-Host
		}
	} until ($userInput -eq 'y')

	# SAML EntityID URL
	Write-Host
	$SamlEntityID = Read-Host -Prompt "Enter EntityID URL(Unique identifier for the SAML entity created on the Azure AD portal)"
	$SamlEntityID = $SamlEntityID.Trim()
	Write-Host
	# Check if SAML EntityID is correct
	$userInput = $null
	do {
		$userInput = Read-Host "Is the SamlEntityID URL '$SamlEntityID' correct?(Y/N)"
		Write-Host
		if ($userInput -eq 'n') {
			$SamlEntityID = Read-Host -Prompt "Enter the correct URL"
			$SamlEntityID = $SamlEntityID.Trim()
			Write-Host
		}
	} until ($userInput -eq 'y')

	# SAML Logout URL
	Write-Host
	$SAMLLogoutURL = Read-Host -Prompt "Enter Logout URL(URL to the IDP logout url)"
	$SAMLLogoutURL = $SAMLLogoutURL.Trim()
	Write-Host
	# Check if SAML Logout URL is correct
	$userInput = $null
	do {
		$userInput = Read-Host "Is the SAMLLogoutURL URL '$SAMLLogoutURL' correct?(Y/N)"
		Write-Host
		if ($userInput -eq 'n') {
			$SAMLLogoutURL = Read-Host -Prompt "Enter the correct URL"
			$SAMLLogoutURL = $SAMLLogoutURL.Trim()
			Write-Host
		}
	} until ($userInput -eq 'y')

	# Update the JSON content
	$jsonContent.AvailableServers = @($server)
	$jsonContent.SelectedServer = $server

	$appServerObject = [PSCustomObject]@{
		ServerName = $server
		LoginMethod = "SAML"
		ProtocolOption = $protocol
		SAMConfig = [PSCustomObject]@{
			ClientId = ""
			CallBackURL = ""
			ClientSecret = ""
			AuthHandler = ""
			PostLogOutURL = ""
			RedirectURL = ""
		}
		DefaultConfiguration = [PSCustomObject]@{
			ServerURL = ""
		}
		SamlServiceProvider = [PSCustomObject]@{
			SamlExtIdpPublicKey = "\app_data\Certificates\$certificate"
			SamlEndpoint = $SAMLEndpoint
			SamlEntityID = $SamlEntityID
			SamlAssertUrl = "${urlProtocol}://${server}/IDPAgent/api/v1/sso-service-provider/saml-assert-consumer-service"
			SamlStartSLOUrl = $SAMLLogoutURL
			SamlLogoutRequestUrl = "${urlProtocol}://${server}/IDPAgent/api/v1/sso-service-provider/saml-logout-request"
			SamlLogoutResponseUrl = $null
			SamlCallBackUrl = $CallbackURL
			SamlPrivateKey = "\app_data\jwt\cert.pfx"
			SamlPassword = $passwordEncoded
		}
	}
}
$jsonContent.AppServers = @($appServerObject)

# Save the updated JSON content back to the file
$jsonContent | ConvertTo-Json -Depth 5 | Out-String | ForEach-Object { $_.Replace('\u0026', '&') } | Set-Content -Path $filePath 

# Perform iisreset
Write-Host
Write-Host "Performing 'iisreset'..."
iisreset

#Restart CIMS
$cimsProcesses = Get-Process -Name "CIMS*" -ErrorAction SilentlyContinue
if ($cimsProcesses) {
    foreach ($process in $cimsProcesses) {
        Write-Host "Closing CIMS process: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Cyan
        $process.CloseMainWindow()
        Start-Sleep -Seconds 2
        
        # If process still running, force close it
        if (!$process.HasExited) {
            Write-Host "Force closing process..." -ForegroundColor Red
            $process.Kill()
        }
    }
}

$cimsPath = "$camstarPath\InSite Administration\CIMS.exe"

if (Test-Path $cimsPath) {
    Start-Process -FilePath $cimsPath
}

Write-Host
Write-Host
Write-Host
Write-Host "Information:" -ForegroundColor Yellow

# Check hosting bundle version
Write-Host
$hostingBundleVersion = $env:WEBSITE_NODE_DEFAULT_VERSION
if ($hostingBundleVersion) {
	Write-Host "Hosting bundle version: $hostingBundleVersion"
} else {
	Write-Host "Hosting bundle version not found. Please check your hosting environment and install hosting bundle if not already installed."
}

Write-Host
Write-Host "Server URL to access application via Single Sign-On is: " ${urlProtocol}://${server}/CamstarPortal/Default.aspx

Write-Host
Write-Host "Important Note:" -ForegroundColor Yellow
Write-Host "Email Id of the user needs to be added in the portal in the Modelling > Employee page to login via SSO."
Write-Host

# Exit
Write-Host "Script completed. Press Enter to exit."
Read-Host
# SIG # Begin signature block
# MIIpVQYJKoZIhvcNAQcCoIIpRjCCKUICAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCDxK2GsjB9vbtfL
# JIrNZ5XWpnCjz2mhd/Y/fLuksVmFyaCCDgswggawMIIEmKADAgECAhAIrUCyYNKc
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
# CisGAQQBgjcCARUwLwYJKoZIhvcNAQkEMSIEIG86Vl5ApatQE2HHfei3BKV3M5AH
# t+mtvsU5gpVYsbBfMA0GCSqGSIb3DQEBAQUABIICAJOzLN2NJP0Zw2jfOOg6i7VE
# CaxC/UVEAjqG88exACC4elg6x6d81TQy9nAVmlWYBmflpvXVwepVglIn6+YR+q+s
# a6aoNMiYaF/579J20IDhPqw5aIoMJooh0MV3MYWrrQSzvC+xJAgmF+YdRNEyHRRh
# L7cR1ytryl2gQX79ILDblMfYMLPaDVevrx9kh+upHiI+n+qRBsSOiVdsO/2n2bZH
# DtvqOokgQNpKBCMytCydtSea0Skac6YsQgTU9/4XfvOZP8lWbiCftDUNFDOzJDt/
# LsIB3hlKK5x6oDOpmqltWVLZIIiLH5ruhonAOGMNozRPGUwAGMhJM5b1s88q1qdp
# zTr5CNsyZnrZYvHbOGEu7CRcJyx955o3AULOM3SEk9n+EmUWDw6ivf0QXHsI5BpY
# UMJPhtt6nR/NghpaiWVywe+hGxlhI0Rxn/LY5J7bxAm0BZW+2hGluTQzWB79lyEe
# qFq+kC0xG6uKdqfSTjMoc3GNoP+Ugkg9OROPY1tGFtZ/Ob4jQOPvtmOuX79ZIADv
# Bn6+kslyQ/iK0m5NAk77l0dsLp/O80KEPAt8Blu5hqxNenyrsHKLrqlMpWdElZ9T
# sSluQxk10Vj5FNzULY/gtXmAOnJt3aBb6lEWsRYjaAfARtm/VGUWbDOjDtiSQ3VG
# yAXQTne3uPXgXjqgVz7loYIXdjCCF3IGCisGAQQBgjcDAwExghdiMIIXXgYJKoZI
# hvcNAQcCoIIXTzCCF0sCAQMxDzANBglghkgBZQMEAgEFADB3BgsqhkiG9w0BCRAB
# BKBoBGYwZAIBAQYJYIZIAYb9bAcBMDEwDQYJYIZIAWUDBAIBBQAEIGCvVvHRFVyV
# 0pQZhHgVmjtm1wBHs5eml8EgBX2DP7XMAhBY2ujcYs5Xn6DzF3HvJCfZGA8yMDI2
# MDQxMDE2MjY1NVqgghM6MIIG7TCCBNWgAwIBAgIQCoDvGEuN8QWC0cR2p5V0aDAN
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
# Fw0yNjA0MTAxNjI2NTVaMCsGCyqGSIb3DQEJEAIMMRwwGjAYMBYEFN1iMKyGCi0w
# a9o4sWh5UjAH+0F+MC8GCSqGSIb3DQEJBDEiBCAAq4chh08NK7L+pahwLeY8+xQf
# iE1Zi7ucwYfuYOJF0TA3BgsqhkiG9w0BCRACLzEoMCYwJDAiBCBKoD+iLNdchMVc
# k4+CjmdrnK7Ksz/jbSaaozTxRhEKMzANBgkqhkiG9w0BAQEFAASCAgDETAIVT2WM
# +72FkP6VSlbjln3FTxALdCziQBBwQAut8brwaFnGwPBQMnQS3lCw+nomfsyx4qqK
# z+bHdnljZ0gc5OYmtgjoI0t6bapEruXUZ4VMDOuoHXfPdZMqQsdTfO4H39hrHB52
# 6AZ6CDp/P8vjQSmyYxL51b86MRNBbdn5k4VnrzIAYc/Xgti2vZc45P2FvXoMOFUX
# P76KX0wvirN4m7Z8w5qdsjGcJVqvQllBW+CsH0gvk7gHX4HMLk61TuRrRWKWs0/K
# UQPsJwQhzYideh4vdTlMTi9yBJXtfBeC09SmtWsB27E1pz1FC1e0oO9Ai68ETZ77
# AwO0OeTqoMhdd6j6XAVXWXn00h83UOmsQ3PGWjcMXrJipirXgChYNgzmIsYeIquR
# WBlXd0iw1hNZZ42WZ9TqVdhjPRwObeYY732tgk8za2uLmHWXKd0vMaBW9uxtufui
# ZibGx79RJR0AazdeZ3ThOspxPbwvwCQGaROrPUXIj48n82h/rdLqDOhlbJ1ETPxk
# GZHgvcUe1pk5JJAliXc/I6FgpaCzNswpjJpuuPpI1dAzz0toQaCh1urE+ooH8pUK
# KmOAHTPmFeCyLaVnD0dzvGf9ExXwY0iFwIBDWA0WNt7pqLYVaX5EIpLcToFZzCF9
# liKACNOMw/XDx5TcjqXVk3d95PoUtG4SJA==
# SIG # End signature block
