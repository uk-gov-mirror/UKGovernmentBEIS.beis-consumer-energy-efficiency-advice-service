locals {
  allocated_memory_ratio = var.total_memory_allocation / var.org_memory_limit
  user_cpu_scale_factor = { for k, v in var.user_site_memory_allocation: k => local.allocated_memory_ratio * var.total_memory_allocation / v}
  admin_cpu_scale_factor = { for k, v in var.admin_site_memory_allocation: k => local.allocated_memory_ratio * var.total_memory_allocation / v}
}

# Note that there is also an email subscription to this topic, but 
# email subscriptions are unsupported by Terraform
resource "aws_sns_topic" "dceas_live_alarms" {
  name = "dceas-live-alarms"
}

# This topic will call the person on out-of-hours support through PagerDuty
# See: https://support.pagerduty.com/docs/aws-cloudwatch-integration-guide
resource "aws_sns_topic" "dceas_pagerduty_notifications" {
  name = "dceas-pagerduty-notifications"
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
    expression  = "${local.admin_cpu_scale_factor["live"]} * MAX(METRICS())"
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
      period      = 900
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
      period      = 900
      stat        = "Average"
    }
  }

  metric_query {
    id          = "m3"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "gauge"
      }
      metric_name = "mycf_live_dceas-admin-site_2_cpu"
      namespace   = "CWAgent"
      period      = 900
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
    expression  = "${local.user_cpu_scale_factor["live"]} * MAX(METRICS())"
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
      period      = 900
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
      period      = 900
      stat        = "Average"
    }
  }

  metric_query {
    id          = "m3"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "gauge"
      }
      metric_name = "mycf_live_dceas-user-site_2_cpu"
      namespace   = "CWAgent"
      period      = 900
      stat        = "Average"
    }
  }
}

resource "aws_cloudwatch_metric_alarm" "live_user_5xx" {
  alarm_name          = "LIVE dceas-user-site 5xx"
  comparison_operator = "GreaterThanThreshold"
  threshold           = 10
  evaluation_periods  = "1"
  treat_missing_data  = "notBreaching"
  datapoints_to_alarm = 1
  alarm_actions       = [
    aws_sns_topic.dceas_live_alarms.arn,
  ]

  metric_query {
    expression  = "SUM(METRICS())"
    id          = "e1"
    label       = "dceas-user-site 5xx responses"
    return_data = true
  }

  metric_query {
    id          = "m1"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "counter"
      }
      metric_name = "mycf_live_dceas-user-site_0_requests_5xx"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Sum"
    }
  }

  metric_query {
    id          = "m2"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "counter"
      }
      metric_name = "mycf_live_dceas-user-site_1_requests_5xx"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Sum"
    }
  }

  metric_query {
    id          = "m3"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "counter"
      }
      metric_name = "mycf_live_dceas-user-site_2_requests_5xx"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Sum"
    }
  }
}

resource "aws_cloudwatch_metric_alarm" "live_user_5xx_ooh_callout" {
  alarm_name          = "LIVE dceas-user-site 5xx OOH callout"
  comparison_operator = "GreaterThanThreshold"
  threshold           = 200
  evaluation_periods  = "1"
  treat_missing_data  = "notBreaching"
  datapoints_to_alarm = 1
  alarm_actions       = [
    aws_sns_topic.dceas_pagerduty_notifications.arn
  ]
  ok_actions = [
    aws_sns_topic.dceas_pagerduty_notifications.arn
  ]

  metric_query {
    expression  = "SUM(METRICS())"
    id          = "e1"
    label       = "dceas-user-site 5xx responses"
    return_data = true
  }

  metric_query {
    id          = "m1"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "counter"
      }
      metric_name = "mycf_live_dceas-user-site_0_requests_5xx"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Sum"
    }
  }

  metric_query {
    id          = "m2"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "counter"
      }
      metric_name = "mycf_live_dceas-user-site_1_requests_5xx"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Sum"
    }
  }

  metric_query {
    id          = "m3"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "counter"
      }
      metric_name = "mycf_live_dceas-user-site_2_requests_5xx"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Sum"
    }
  }
}

resource "aws_cloudwatch_metric_alarm" "live_user_2xx_response_time" {
  alarm_name          = "LIVE dceas-user-site 2xx response time"
  comparison_operator = "GreaterThanThreshold"
  threshold           = 1000
  evaluation_periods  = "1"
  treat_missing_data  = "missing"
  datapoints_to_alarm = 1
  alarm_actions       = [
    aws_sns_topic.dceas_live_alarms.arn,
    aws_sns_topic.dceas_pagerduty_notifications.arn
  ]
  ok_actions = [
    aws_sns_topic.dceas_pagerduty_notifications.arn
  ]

  metric_query {
    expression  = "AVG(METRICS())"
    id          = "e1"
    label       = "dceas-user-site 2xx response time (ms)"
    return_data = true
  }

  metric_query {
    id          = "m1"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "timing"
      }
      metric_name = "mycf_live_dceas-user-site_0_responseTime_2xx"
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
        "metric_type" = "timing"
      }
      metric_name = "mycf_live_dceas-user-site_1_responseTime_2xx"
      namespace   = "CWAgent"
      period      = 300
      stat        = "Average"
    }
  }

  metric_query {
    id          = "m3"
    return_data = false
    metric {
      dimensions = {
        "host"        = aws_instance.cloudwatch_agent.private_dns
        "metric_type" = "timing"
      }
      metric_name = "mycf_live_dceas-user-site_2_responseTime_2xx"
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
      aws_cloudwatch_metric_alarm.live_user_5xx.arn,
      aws_cloudwatch_metric_alarm.live_user_2xx_response_time.arn,
    ]),
    user_site_cpu_scale_factor  = local.user_cpu_scale_factor["live"]
    admin_site_cpu_scale_factor  = local.admin_cpu_scale_factor["live"]
  })
}

resource "aws_cloudwatch_dashboard" "staging" {
  dashboard_name = "staging"
  dashboard_body = templatefile("data/dashboard.tpl", {
    space                       = "staging"
    alarm_arns                  = "[]"
    user_site_cpu_scale_factor  = local.user_cpu_scale_factor["staging"]
    admin_site_cpu_scale_factor  = local.admin_cpu_scale_factor["staging"]
  })
}

resource "aws_cloudwatch_dashboard" "int" {
  dashboard_name = "int"
  dashboard_body = templatefile("data/dashboard.tpl", {
    space                       = "int"
    alarm_arns                  = "[]"
    user_site_cpu_scale_factor  = local.user_cpu_scale_factor["int"]
    admin_site_cpu_scale_factor  = local.admin_cpu_scale_factor["int"]
  })
}

