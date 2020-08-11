resource "aws_cloudwatch_log_group" "live" {
  name              = "live"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "staging" {
  name              = "staging"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_group" "int" {
  name              = "int"
  retention_in_days = 7
}
