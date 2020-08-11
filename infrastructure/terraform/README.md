# BEIS SEA Infrastructure

This repository contains Terraform definitions for the AWS resources which power the log ingestion and metric gathering/visualising/alerting for the SEA applications.

## Set up

1. Install Terraform
2. Obtain CLI credentials for the AWS account from https://aws.softwire.com.  
    i. Click 'BEIS Simple Energy Advice' and then 'Command line or programmatic access'  
    ii. Set the environment variables from 'Option 1' in your terminal (note that these credentials will expire regularly: you will have to reset them)
3. Run `terraform init`

## Deployment

Run `terraform plan` to preview your changes and `terraform apply` to commit them.

## Updating the Logstash/CloudWatch Agent config

After updating the SSM parameters, the instance will not automatically pick up the new configuration unless it is redeployed.
To refresh the deployed configuration without redeploying, log in to the instance and run the following commands:

    sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c ssm:/AmazonCloudwatch-BEISCF -s
    sudo sh -c 'aws ssm get-parameter --name cf-logstash-config --output text --query Parameter.Value --region eu-west-1 > /etc/logstash/conf.d/cloudfoundry.conf'
    sudo systemctl restart logstash.service