// Variables for the app-service module
variable "backend_default_connection" {
  description = "Optional connection string to pass to the backend app (overrides local appsettings when set)."
  type        = string
  default     = ""
}

variable "backend_example_secret" {
  description = "Optional example secret to pass to the backend as an environment variable."
  type        = string
  default     = ""
}

// Optional module inputs used by the module's real resources
variable "app_service_name" {
  type    = string
  default = ""
}

variable "resource_group_name" {
  type    = string
  default = ""
}

variable "location" {
  type    = string
  default = ""
}

variable "app_service_plan_id" {
  type    = string
  default = ""
}
