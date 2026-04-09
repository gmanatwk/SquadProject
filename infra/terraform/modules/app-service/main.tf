// App Service module (Plan, Web App)

// Build a map of app settings (environment variables) to inject into App Service
locals {
	// start with an empty map; add entries only when non-empty values are provided
	_base = {}

	app_settings = merge(
		local._base,
		// connection string: Azure App Service environment variables should use double-underscore for hierarchical keys
		(var.backend_default_connection != "" ? { "ConnectionStrings__DefaultConnection" = var.backend_default_connection } : {}),
		(var.backend_example_secret != "" ? { "BackendSettings__ExampleSecret" = var.backend_example_secret } : {})
	)
}

// Example usage (uncomment and adapt to your environment):
/*
resource "azurerm_app_service" "main" {
	name                = var.app_service_name
	location            = var.location
	resource_group_name = var.resource_group_name
	app_service_plan_id = var.app_service_plan_id

	site_config {
		// other site config
	}

	// Inject app settings built above
	app_settings = local.app_settings
}
*/

// Export the computed app settings so the root module or other modules can inspect or forward them
output "app_settings" {
	description = "App Service application settings (environment variables) computed from module inputs."
	value       = local.app_settings
}

