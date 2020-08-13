{
  "widgets": [
    {
      "type": "metric",
      "x": 0,
      "y": 6,
      "width": 6,
      "height": 6,
      "properties": {
        "metrics": [
          [
            {
              "expression": "SEARCH('{CWAgent,host,metric_type} cpu dceas-admin-site ${space} NOT old', 'Average', 300)",
              "id": "e1",
              "period": 300,
              "visible": false
            }
          ],
          [
            {
              "expression": "${admin_site_cpu_scale_factor}*e1",
              "label": "",
              "id": "e2"
            }
          ]
        ],
        "view": "timeSeries",
        "stacked": false,
        "region": "eu-west-1",
        "yAxis": {
          "left": {
            "showUnits": false,
            "label": "%"
          }
        },
        "title": "dceas-admin-site CPU usage",
        "stat": "Average",
        "period": 300
      }
    },
    {
      "type": "metric",
      "x": 6,
      "y": 6,
      "width": 6,
      "height": 6,
      "properties": {
        "metrics": [
          [
            {
              "expression": "SEARCH('{CWAgent,host,metric_type} memoryUtilization dceas-admin-site ${space} NOT old', 'Average', 300)",
              "id": "e1",
              "period": 300
            }
          ]
        ],
        "view": "timeSeries",
        "stacked": false,
        "title": "dceas-admin-site memory usage",
        "region": "eu-west-1",
        "stat": "Average",
        "period": 300,
        "yAxis": {
          "left": {
            "label": "%",
            "showUnits": false
          }
        },
        "legend": {
          "position": "bottom"
        }
      }
    },
    {
      "type": "metric",
      "x": 12,
      "y": 6,
      "width": 6,
      "height": 6,
      "properties": {
        "metrics": [
          [
            {
              "expression": "SEARCH('{CWAgent,host,metric_type} responseTime_2xx dceas-admin-site ${space} NOT old', 'Average', 300)",
              "id": "e1",
              "period": 300,
              "region": "eu-west-1"
            }
          ]
        ],
        "view": "timeSeries",
        "stacked": false,
        "title": "dceas-admin-site 2xx response time",
        "region": "eu-west-1",
        "stat": "Average",
        "period": 300,
        "yAxis": {
          "left": {
            "label": "ms",
            "showUnits": false
          }
        }
      }
    },
    {
      "type": "metric",
      "x": 0,
      "y": 0,
      "width": 6,
      "height": 6,
      "properties": {
        "metrics": [
          [
            {
              "expression": "SEARCH('{CWAgent,host,metric_type} cpu dceas-user-site ${space} NOT old', 'Average', 300)",
              "id": "e1",
              "period": 300,
              "visible": false
            }
          ],
          [
            {
              "expression": "${user_site_cpu_scale_factor}*e1",
              "label": "",
              "id": "e2"
            }
          ]
        ],
        "view": "timeSeries",
        "stacked": false,
        "region": "eu-west-1",
        "yAxis": {
          "left": {
            "showUnits": false,
            "label": "%"
          }
        },
        "title": "dceas-user-site CPU usage",
        "stat": "Average",
        "period": 300
      }
    },
    {
      "type": "metric",
      "x": 18,
      "y": 3,
      "width": 6,
      "height": 3,
      "properties": {
        "metrics": [
          [
            {
              "expression": "SEARCH('{CWAgent,host,metric_type} requests_5xx dceas-admin-site ${space} NOT old', 'Sum', 300)",
              "id": "e1",
              "period": 300,
              "region": "eu-west-1"
            }
          ]
        ],
        "view": "singleValue",
        "region": "eu-west-1",
        "stat": "Average",
        "period": 300,
        "title": "dceas-admin-site 5xx responses"
      }
    },
    {
      "type": "metric",
      "x": 6,
      "y": 0,
      "width": 6,
      "height": 6,
      "properties": {
        "metrics": [
          [
            {
              "expression": "SEARCH('{CWAgent,host,metric_type} memoryUtilization dceas-user-site ${space} NOT old', 'Average', 300)",
              "id": "e1",
              "period": 300,
              "region": "eu-west-1"
            }
          ]
        ],
        "view": "timeSeries",
        "stacked": false,
        "title": "dceas-user-site memory usage",
        "region": "eu-west-1",
        "stat": "Average",
        "period": 300,
        "yAxis": {
          "left": {
            "label": "%",
            "showUnits": false
          }
        },
        "legend": {
          "position": "bottom"
        }
      }
    },
    {
      "type": "metric",
      "x": 12,
      "y": 0,
      "width": 6,
      "height": 6,
      "properties": {
        "metrics": [
          [
            {
              "expression": "SEARCH('{CWAgent,host,metric_type} responseTime_2xx dceas-user-site ${space} NOT old', 'Average', 300)",
              "id": "e1",
              "period": 300
            }
          ]
        ],
        "view": "timeSeries",
        "stacked": false,
        "title": "dceas-user-site 2xx response time",
        "region": "eu-west-1",
        "stat": "Average",
        "period": 300,
        "yAxis": {
          "left": {
            "label": "ms",
            "showUnits": false
          }
        }
      }
    },
    {
      "type": "metric",
      "x": 18,
      "y": 0,
      "width": 6,
      "height": 3,
      "properties": {
        "metrics": [
          [
            {
              "expression": "SEARCH('{CWAgent,host,metric_type} requests_5xx dceas-user-site ${space} NOT old', 'Sum', 300)",
              "id": "e1",
              "period": 300
            }
          ]
        ],
        "view": "singleValue",
        "region": "eu-west-1",
        "stat": "Average",
        "period": 300,
        "title": "dceas-user-site 5xx responses"
      }
    %{ if alarm_arns != "[]" }
    },
    {
      "type": "alarm",
      "x": 18,
      "y": 6,
      "width": 6,
      "height": 6,
      "properties": {
        "title": null,
        "alarms": ${alarm_arns}
      }
    %{ endif }
    }
  ]
}