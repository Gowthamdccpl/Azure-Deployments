output "aks_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

output "windows_pool_name" {
  value = azurerm_kubernetes_cluster_node_pool.windows.name
}

output "kubelet_object_id" {
  value = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
}
output "aks_id" {
  value = azurerm_kubernetes_cluster.aks.id
}