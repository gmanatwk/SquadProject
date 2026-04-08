# CI/CD workflow documentation

- build.yml: Build frontend/backend
- test.yml: Run tests
- deploy-*.yml: Deploy to environments
- terraform-plan.yml: Terraform plan on PR
- terraform-apply.yml: Terraform apply on merge

## Notes
- Secrets managed in GitHub
- Artifacts passed between jobs
- Approval required for prod deploy
