# Infrastructure & CI/CD Guide

## 1. Project Overview
This infrastructure uses **Terraform** to provision Azure resources (compute, networking, database) and automates CI/CD with **GitHub Actions**. It supports multi-environment deployments (dev, staging, prod) and follows Infrastructure as Code best practices.

**Tech stack:**
- Terraform
- GitHub Actions
- Azure (VNet, SQL, App Service, Monitoring)

## 2. Prerequisites
- [Terraform CLI](https://www.terraform.io/downloads.html) (v1.0+)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Git](https://git-scm.com/downloads)
- GitHub account with repo access
- Azure subscription

## 3. Authentication Setup
- **Azure login:**
  ```bash
  az login
  az account set --subscription <subscription-id>
  ```
- **Service Principal for CI/CD:**
  - Create with:
    ```bash
    az ad sp create-for-rbac --name "github-actions-sp" --role contributor --scopes /subscriptions/<subscription-id>
    ```
  - Add output JSON as `AZURE_CREDENTIALS` GitHub Secret
- **GitHub Secrets:**
  - `AZURE_CREDENTIALS` (Service Principal JSON)
  - `AZURE_SUBSCRIPTION_ID`

## 4. Directory Structure
```
infra/
  terraform/
    modules/
      networking/      # VNet, subnets, NSGs
      database/        # SQL Server, databases
      app-service/     # App Service Plan, Web Apps
      monitoring/      # Log Analytics, App Insights
    environments/      # dev.tfvars, staging.tfvars, prod.tfvars
    main.tf            # Root module
    variables.tf       # Input variables
    outputs.tf         # Outputs
    backend.tf         # State backend config
  README.md            # This file
```

## 5. Terraform Modules Overview
- **networking:** VNet, subnets, NSGs for secure networking
- **database:** SQL Server, databases, firewall rules
- **app-service:** App Service Plan, Web Apps, SSL
- **monitoring:** Log Analytics, Application Insights

## 6. Environment Variables & Secrets
- **GitHub Secrets:**
  - `AZURE_CREDENTIALS`, `AZURE_SUBSCRIPTION_ID`
- **Terraform variables (per env):**
  - Resource group location
  - Environment name (dev/staging/prod)
  - SKUs for compute/database
  - Database admin password (in Azure Key Vault, referenced in CI/CD)

## 7. Initialization & Setup
```bash
cd infra/terraform
terraform init
```
- State backend: Azure Storage (see `backend.tf`)
- Remote state enables team collaboration and locking

## 8. Planning & Applying Terraform
```bash
terraform plan -var-file=environments/dev.tfvars
terraform apply -var-file=environments/dev.tfvars
```
- Always review the plan before applying
- Use the correct `.tfvars` for each environment
- CI/CD uses approval gates for prod

## 9. GitHub Actions Workflows
| Workflow              | Trigger         | Purpose                                 |
|---------------------- |----------------|-----------------------------------------|
| `build.yml`           | push, PR       | Compile frontend (npm) & backend (.NET) |
| `test.yml`            | push, PR       | Run unit & integration tests            |
| `terraform-plan.yml`  | push, PR       | Run `terraform plan`, comment on PR     |
| `terraform-apply.yml` | merge to main  | Run `terraform apply` for infra         |
| `deploy-dev.yml`      | merge to main  | Deploy to dev environment               |
| `deploy-staging.yml`  | manual dispatch| Deploy to staging (approval required)   |
| `deploy-prod.yml`     | manual dispatch| Deploy to prod (approval required)      |

## 10. Deployment Pipeline
- Push → `build.yml` & `test.yml`
- PR → `terraform-plan.yml` comments on PR
- Merge to `main` → `terraform-apply.yml` applies infra
- Manual trigger → `deploy-prod.yml` (approval required)

## 11. Managing Environments
- **Dev:** Auto-deploy on main merge
- **Staging:** Manual, approval required
- **Prod:** Manual, approval + verification

```bash
terraform apply -var-file=environments/staging.tfvars
```

## 12. Environment Configuration
- `dev.tfvars`: small SKUs, no autoscale
- `staging.tfvars`: medium SKUs, mirrors prod
- `prod.tfvars`: large SKUs, HA, autoscale

## 13. Infrastructure Outputs
- Frontend Web App URL
- Backend API URL
- Database connection string
- App Insights instrumentation key
- Log Analytics workspace ID

View outputs:
```bash
terraform output
```

## 14. State Management
- State stored in Azure Storage (remote)
- **Never** commit state to git
- State locking prevents concurrent changes
- Backup state regularly

## 15. Monitoring & Observability
- Log Analytics for logs
- Application Insights for performance
- Alerts for errors
- Health dashboards

## 16. Scaling & Performance
- Edit SKUs in `.tfvars` files
- Enable autoscale in App Service
- Adjust DB tier as needed
- Apply changes with `terraform apply`

## 17. Disaster Recovery & Rollback
- Terraform keeps state history
- Rollback:
  ```bash
  terraform apply -var-file=... # revert and re-apply
  ```
- Azure SQL backups
- Keep configs in git

## 18. Troubleshooting
- **Authentication failed:** re-run `az login`, check GitHub Secrets
- **State lock timeout:** check for stuck GitHub Actions runs
- **Quota exceeded:** adjust SKUs, request Azure quota increase
- **Unexpected plan changes:** review variable overrides, check `.tfvars`

## 19. Security Best Practices
- Never commit secrets to git
- Use Azure Key Vault for sensitive data
- Restrict NSG rules
- Enforce HTTPS
- Rotate DB passwords
- Review GitHub Secrets

## 20. Contributing & Modifying Infrastructure
- Add modules in `modules/`
- Update `main.tf` to use new modules
- Test in `dev` first
- Use `terraform plan` before `apply`
- Document changes in PRs

## 21. Links & Resources
- [Main project README](../README.md)
- [Terraform docs](https://www.terraform.io/docs)
- [Azure provider docs](https://registry.terraform.io/providers/hashicorp/azurerm)
- [GitHub Actions docs](https://docs.github.com/en/actions)
- [Frontend README](../frontend/README.md)
- [Backend README](../backend/README.md)
