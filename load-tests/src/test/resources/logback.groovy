import ch.qos.logback.classic.AsyncAppender
import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.rolling.RollingFileAppender
import ch.qos.logback.core.rolling.TimeBasedRollingPolicy

import static ch.qos.logback.classic.Level.*

//*****************************************************************************
// Main log settings
//*****************************************************************************
logfileBaseName = "target/gatling/gatling.log"

appender("gatling.log", RollingFileAppender) {
    file = logfileBaseName

    rollingPolicy(TimeBasedRollingPolicy) {
        fileNamePattern = "$logfileBaseName-%d{yyyy-MM-dd-HH}.gz"
        maxHistory = 10
    }

    encoder(PatternLayoutEncoder) {
        pattern = "%date{ISO8601} %-5level %logger - %msg%n"
    }
}

appender("gatling.async", AsyncAppender) {
    appenderRef("gatling.log")
    queueSize = 1024
    includeCallerData = false
}

root(DEBUG, ["gatling.async"])
