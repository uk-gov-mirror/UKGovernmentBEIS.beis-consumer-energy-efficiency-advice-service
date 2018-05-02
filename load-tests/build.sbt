

organization  := "uk.gov.beis.dceas"

scalaVersion  := "2.11.8"

scalacOptions ++= Seq("-target:jvm-1.8", "-unchecked", "-deprecation", "-encoding", "utf8")

javacOptions ++= Seq("-source", "1.8", "-target", "1.8", "-Xlint")

enablePlugins(GatlingPlugin)

libraryDependencies ++= Seq(
    "io.gatling.highcharts" % "gatling-charts-highcharts" % "2.2.3" % "test",
    "io.gatling"            % "gatling-test-framework"    % "2.2.3" % "test",
    "org.codehaus.groovy"   % "groovy-all"                % "2.4.7" % "test",
    "com.google.truth" % "truth" % "0.27" % "test",
    "org.yaml" % "snakeyaml" % "1.17" % "test")
