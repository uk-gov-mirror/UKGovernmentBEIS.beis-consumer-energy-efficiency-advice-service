terraform {
  backend "s3" {
    bucket = "beis-sea-terraform-stack"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }
}

provider "aws" {
  version = "~> 3.0"
  region  = "eu-west-1"
}
