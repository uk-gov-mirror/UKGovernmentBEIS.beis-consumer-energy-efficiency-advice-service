variable "total_memory_allocation" { default = 28 }
variable "org_memory_limit" { default = 60 }

variable "admin_site_memory_allocation" { 
  type = map
  default = {
    int = 1
    staging = 1
    live = 6
  }
}

variable "user_site_memory_allocation" {
  type = map
  default = {
    int = 1
    staging = 1
    live = 2
  }
}
