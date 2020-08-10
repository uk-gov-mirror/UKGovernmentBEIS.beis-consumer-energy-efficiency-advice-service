#!/bin/bash

# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U ./amazon-cloudwatch-agent.rpm
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c ssm:/${cloudwatch_config_parameter} -s

# Install logstash
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
cat > /etc/yum.repos.d/logstash.repo << EOF
[logstash-7.x]
name=Elastic repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
EOF

yum install -y java-1.8.0-openjdk logstash
aws ssm get-parameter --name ${logstash_config_parameter} --output text --query Parameter.Value --region eu-west-1 > /etc/logstash/conf.d/cloudfoundry.conf

cat > /etc/logrotate.d/cloudfoundry << EOF
/var/log/logstash/cloudfoundry/*log {
    daily
    missingok
    rotate 3
    compress
}
EOF

cat >> /etc/logstash/jvm.options << EOF
-Xms500m
-Xmx500m
-XX:ParallelGCThreads=1
EOF
/usr/share/logstash/bin/system-install
systemctl start logstash.service
