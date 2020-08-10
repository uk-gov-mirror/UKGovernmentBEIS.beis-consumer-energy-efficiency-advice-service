# BEIS SEA Infrastructure

This repository contains Terraform definitions for the AWS resources which power the metric gathering/visualising/alerting for the SEA application.

## Set up

1. Install Terraform
2. Obtain CLI credentials for the AWS account from https://aws.softwire.com.  
    i. Click 'BEIS Simple Energy Advice' and then 'Command line or programmatic access'  
    ii. Set the environment variables from 'Option 1' in your terminal (note that these credentials will expire regularly: you will have to reset them)
3. Run `terraform init`

## Deployment

Run `terraform plan` to preview your changes and `terraform apply` to commit them.