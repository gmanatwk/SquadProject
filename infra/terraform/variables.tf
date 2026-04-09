// Input variables for all environments
// Backend configuration values provided to the backend app (e.g. from CI/CD or environment-specific tfvars)
variable "backend_default_connection" {
	description = "Optional: connection string to use for the backend database. If empty, appsettings.json local value will be used."
	type        = string
	default     = ""
}

variable "backend_example_secret" {
	description = "Optional: an example secret that will be passed to the backend as an environment variable."
	type        = string
	default     = ""
}

# Example other variables (vnet_name, sql_server_name etc.) can be added here as needed
