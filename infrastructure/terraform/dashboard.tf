locals {
  # Scale factor = space memory allocation/application memory allocation
  admin_site_cpu_scale_factor = 10
  user_site_cpu_scale_factor  = 30
}

# Note that there is also an email subscription to this topic, but 
# email subscriptions are unsupported by Terraform
resource "aws_sns_topic" "dceas_live_alarms" {
  name = "dceas-live-alarms"
}

resource "aws_cloudwatch_metric_alarm" "live_admin_cpu" {
  alarm_name          = "LIVE dceas-admin-site CPU"
  comparison_operator = "GreaterThanThreshold"
  threshold           = 100
  evaluation_periods  = "1"
  treat_missing_data  = "breaching"
  datapoints_to_alarm = 1
  alarm_actions       = [aws_sns_topic.dceas_live_alarms.arn]

  metric_query {
    expression  = "${local.admin_site_cpu_scale_factor} * MAX(METRICS())"
    id          = "e1"
    label       = "Max dceas-admin-site instance CPU"
    return_data = true
  }

  metric_query {
    id          = "m1"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "gauge"
      }
      metric_name = "mycf_live_dceas-admin-site_0_cpu"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Average"
    }
  }

  metric_query {
    id          = "m2"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "gauge"
      }
      metric_name = "mycf_live_dceas-admin-site_1_cpu"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Average"
    }
  }
}

resource "aws_cloudwatch_metric_alarm" "live_user_cpu" {
  alarm_name          = "LIVE dceas-user-site CPU"
  comparison_operator = "GreaterThanThreshold"
  threshold           = 100
  evaluation_periods  = "1"
  treat_missing_data  = "breaching"
  datapoints_to_alarm = 1
  alarm_actions       = [aws_sns_topic.dceas_live_alarms.arn]

  metric_query {
    expression  = "${local.user_site_cpu_scale_factor} * MAX(METRICS())"
    id          = "e1"
    label       = "Max dceas-user-site instance CPU"
    return_data = true
  }

  metric_query {
    id          = "m1"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "gauge"
      }
      metric_name = "mycf_live_dceas-user-site_0_cpu"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Average"
    }
  }

  metric_query {
    id          = "m2"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "gauge"
      }
      metric_name = "mycf_live_dceas-user-site_1_cpu"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Average"
    }
  }
}

resource "aws_cloudwatch_dashboard" "live" {
  dashboard_name = "CloudWatch-Default"
  dashboard_body = templatefile("data/dashboard.tpl", {
    space = "live"
    alarm_arns = jsonencode([
      aws_cloudwatch_metric_alarm.live_user_cpu.arn,
      aws_cloudwatch_metric_alarm.live_admin_cpu.arn,
    ]),
    user_site_cpu_scale_factor  = local.user_site_cpu_scale_factor
    admin_site_cpu_scale_factor = local.admin_site_cpu_scale_factor
  })
}

resource "aws_cloudwatch_dashboard" "staging" {
  dashboard_name = "staging"
  dashboard_body = templatefile("data/dashboard.tpl", {
    space                       = "staging"
    alarm_arns                  = "[]"
    user_site_cpu_scale_factor  = local.user_site_cpu_scale_factor
    admin_site_cpu_scale_factor = local.admin_site_cpu_scale_factor
  })
}

resource "aws_cloudwatch_dashboard" "int" {
  dashboard_name = "int"
  dashboard_body = templatefile("data/dashboard.tpl", {
    space                       = "int"
    alarm_arns                  = "[]"
    user_site_cpu_scale_factor  = local.user_site_cpu_scale_factor
    admin_site_cpu_scale_factor = local.admin_site_cpu_scale_factor
  })
}

