variable "rg_name" {
  type = string
}

variable "location" {
  type = string
}

variable "aks_name" {
  type = string
}

variable "windows_pool_name" {
  type = string
}

variable "windows_admin_username" {
  type = string
}

variable "windows_admin_password" {
  type      = string
  sensitive = true
}
