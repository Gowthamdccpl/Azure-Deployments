module "acr" {
  source   = "./modules/acr"
  rg_name  = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location
  acr_name = var.acr_name
}

module "storage" {
  source               = "./modules/storage"
  rg_name              = azurerm_resource_group.rg.name
  location             = azurerm_resource_group.rg.location
  storage_account_name = var.storage_account_name
  file_share_name      = var.file_share_name
}

# module "sql" {
#   source                  = "./modules/sql"
#   sql_resource_group_name = var.sql_resource_group_name
#   sql_server_name         = var.sql_server_name
#   sql_database_name       = var.sql_database_name
# }

module "aks" {
  source                 = "./modules/aks"
  rg_name                = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  aks_name               = var.aks_name
  windows_pool_name      = var.windows_pool_name
  windows_admin_username = var.windows_admin_username
  windows_admin_password = var.windows_admin_password
}

# resource "azurerm_role_assignment" "acr_pull" {
#   principal_id         = module.aks.kubelet_object_id
#   role_definition_name = "AcrPull"
#   scope                = module.acr.acr_id
# }


data "azurerm_client_config" "current" {}

resource "azurerm_role_assignment" "aks_user" {
  scope                = module.aks.aks_id
  role_definition_name = "Azure Kubernetes Service Cluster Admin Role"
  principal_id         = data.azurerm_client_config.current.object_id
}