variable "resource_group_name" {
  type    = string
  default = "terraform-resource-group"
}

variable "location" {
  type    = string
  default = "South India"
}

variable "acr_name" {
  type = string
}

variable "storage_account_name" {
  type = string
}

variable "file_share_name" {
  type    = string
  default = "opcentershare"
}

variable "aks_name" {
  type    = string
  default = "terraform-aks"
}

variable "windows_pool_name" {
  type    = string
  default = "window"
}

variable "windows_admin_username" {
  type = string
}

variable "windows_admin_password" {
  type      = string
  sensitive = true
}

variable "sql_resource_group_name" {
  type    = string
  default = "terraform-resource-group"
}

variable "sql_server_name" {
  type    = string
  default = "opcenter-sql-server"
}

variable "sql_database_name" {
  type    = string
  default = "opcenter-sql"
}
