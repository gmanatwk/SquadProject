# Azure remote state backend (example, fill in values)
terraform {
  backend "azurerm" {
    resource_group_name  = "<TFSTATE_RESOURCE_GROUP>"
    storage_account_name = "<TFSTATE_STORAGE_ACCOUNT>"
    container_name       = "<TFSTATE_CONTAINER>"
    key                  = "squadproject.terraform.tfstate"
  }
}
