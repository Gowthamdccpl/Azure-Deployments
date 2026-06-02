output "sql_server_name" {
  value = data.azurerm_mssql_server.sql.name
}

output "sql_server_fqdn" {
  value = data.azurerm_mssql_server.sql.fully_qualified_domain_name
}

output "sql_database_name" {
  value = data.azurerm_mssql_database.db.name
}
