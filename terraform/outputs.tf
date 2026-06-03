output "aks_name" {
  value = module.aks.aks_name
}

output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "acr_login_server" {
  value = module.acr.login_server
}

# output "sql_server_name" {
#   value = module.sql.sql_server_name
# }

# output "sql_server_fqdn" {
#   value = module.sql.sql_server_fqdn
# }

# output "sql_database_name" {
#   value = module.sql.sql_database_name
# }

output "storage_account_name" {
  value = module.storage.storage_account_name
}

output "file_share_name" {
  value = module.storage.file_share_name
}

output "windows_pool_name" {
  value = module.aks.windows_pool_name
}
