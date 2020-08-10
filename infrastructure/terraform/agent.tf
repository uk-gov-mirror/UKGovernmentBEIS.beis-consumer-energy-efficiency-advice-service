resource "aws_iam_role" "cloudwatch_agent_server_role" {
  name               = "CloudWatchAgentServerRole"
  assume_role_policy = file("data/assume_role_policy.json")
}

data "aws_iam_policy" "cloudwatch_agent_server_policy" {
  arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

data "aws_iam_policy" "ssm_full_access" {
  arn = "arn:aws:iam::aws:policy/AmazonSSMFullAccess"
}

resource "aws_iam_role_policy_attachment" "cloudwatch_agent_server_policy_attachment" {
  role       = aws_iam_role.cloudwatch_agent_server_role.name
  policy_arn = data.aws_iam_policy.cloudwatch_agent_server_policy.arn
}

resource "aws_iam_role_policy_attachment" "ssm_full_access_attachment" {
  role       = aws_iam_role.cloudwatch_agent_server_role.name
  policy_arn = data.aws_iam_policy.ssm_full_access.arn
}

resource "aws_ssm_parameter" "cloudwatch_config" {
  name  = "AmazonCloudwatch-BEISCF"
  type  = "String"
  value = file("data/cloudwatch_agent_config.json")
}

resource "aws_instance" "cloudwatch_agent" {
  instance_type        = "t3.nano"
  ami                  = "ami-07d9160fa81ccffb5"
  iam_instance_profile = aws_iam_role.cloudwatch_agent_server_role.name
  user_data            = templatefile("data/agent_user_data.tpl", { config_parameter = aws_ssm_parameter.cloudwatch_config.name })

  tags = {
    Name = "Cloud Foundry metrics exporter"
  }
}
