resource "aws_cloudwatch_log_group" "live" {
  name              = "live"
  retention_in_days = 30
}
