data "azurerm_mssql_server" "sql" {
  name                = var.sql_server_name
  resource_group_name = var.sql_resource_group_name
}

data "azurerm_mssql_database" "db" {
  name      = var.sql_database_name
  server_id = data.azurerm_mssql_server.sql.id
}
