# Terraform root module
# Calls submodules for networking, database, app service, monitoring

module "networking" {
  source = "./modules/networking"
  # vnet_name = var.vnet_name
  # ...
}

module "database" {
  source = "./modules/database"
  # sql_server_name = var.sql_server_name
  # ...
}

module "app_service" {
  source = "./modules/app-service"
  # app_service_plan_name = var.app_service_plan_name
  # Pass backend configuration variables to the app service module so they can be set as app settings/environment variables
  backend_default_connection = var.backend_default_connection
  backend_example_secret    = var.backend_example_secret
}

module "monitoring" {
  source = "./modules/monitoring"
  # log_analytics_name = var.log_analytics_name
  # ...
}
