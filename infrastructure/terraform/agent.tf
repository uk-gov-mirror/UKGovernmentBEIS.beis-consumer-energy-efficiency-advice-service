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
  tier  = "Advanced"
  value = file("data/cloudwatch_agent_config.json")
}

resource "aws_ssm_parameter" "logstash_config" {
  name  = "cf-logstash-config"
  type  = "String"
  tier  = "Advanced"
  value = file("data/logstash_config.conf")
}

resource "aws_security_group" "cloudwatch_agent" {
  ingress {
    description = "ssh"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "statsd"
    from_port   = 8125
    to_port     = 8125
    protocol    = "udp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "syslog"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "cloudwatch_agent" {
  key_name   = "softwire"
  public_key = file("data/instance_public_key")
}

resource "aws_instance" "cloudwatch_agent" {
  instance_type          = "t3.micro"
  ami                    = "ami-07d9160fa81ccffb5"
  iam_instance_profile   = aws_iam_role.cloudwatch_agent_server_role.name
  vpc_security_group_ids = [aws_security_group.cloudwatch_agent.id]
  key_name               = aws_key_pair.cloudwatch_agent.key_name

  user_data = templatefile("data/agent_user_data.tpl", {
    cloudwatch_config_parameter = aws_ssm_parameter.cloudwatch_config.name
    logstash_config_parameter   = aws_ssm_parameter.logstash_config.name
  })

  tags = {
    Name = "Cloud Foundry metrics exporter"
  }
}

resource "aws_eip" "cloudwatch_agent" {
  instance = aws_instance.cloudwatch_agent.id
}
