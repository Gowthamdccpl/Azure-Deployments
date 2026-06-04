resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_name
  location            = var.location
  resource_group_name = var.rg_name
  dns_prefix          = var.aks_name
  oidc_issuer_enabled = true

  default_node_pool {
    name       = "system"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  windows_profile {
    admin_username = var.windows_admin_username
    admin_password = var.windows_admin_password
  }

  network_profile {
    network_plugin = "azure"
  }
}

resource "azurerm_kubernetes_cluster_node_pool" "windows" {
  name                  = var.windows_pool_name
  kubernetes_cluster_id = azurerm_kubernetes_cluster.aks.id
  vm_size               = "Standard_D2s_v3"
  node_count            = 1
  os_type               = "Windows"

  windows_profile {
    outbound_nat_enabled = true
  }
}
