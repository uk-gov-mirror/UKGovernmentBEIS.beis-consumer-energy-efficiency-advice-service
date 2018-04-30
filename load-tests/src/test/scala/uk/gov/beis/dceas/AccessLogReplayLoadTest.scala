package uk.gov.beis.dceas

import java.io.File
import java.time.Instant
import java.time.format.DateTimeFormatter._
import java.time.format.DateTimeFormatterBuilder
import java.util.Date

import io.gatling.core.Predef._
import io.gatling.core.feeder.RecordSeqFeederBuilder
import io.gatling.core.scenario.Simulation
import io.gatling.http.Predef.http

import scala.concurrent.duration._
import scala.io.Source

/**
  * A load test that replays access log traffic at variable rates.
  *
  * Before you run this, check your access logs for all session keys and
  * run SQL like:
  *
  *     insert into user_state values ('close nurse aside', '', now());
  *     insert into user_state values ('usual koala latte', '', now());
  *
  * (Otherwise all your `PUT /api/userState/...` requests will fail)
  */
class AccessLogReplayLoadTest extends Simulation {

  val baseUrl = "https://dceas-user-site.cloudapps.digital"

  println("DEBUG: started constructor at " + new Date())

  val UrlFromAccessLogRegex = " *([\\d\\.+T:-]+) \\[[^\\]]+\\] OUT [\\w-.]+ - \\[[^\\]]+\\] \"(\\w+) ([^ ]+) HTTP.*".r

  val SAMPLE_USER_STATE_DATA_CREATE =
    """
       {"responseData":{"localAuthorityCode":"E09000007","postcode":"nw51tl","userJourneyType":3},"url":"/energy-efficiency/questionnaire/home-basics"}
    """

  val SAMPLE_USER_STATE_DATA_UPDATE =
    """
      {"responseData":{"localAuthorityCode":"E09000007","postcode":"nw52lb","epc":{"lmkKey":"621028120110421010416","address1":"First Floor Flat","address2":"12 Patshull Road","address3":"","postcode":"NW5 2LB","currentEnergyRating":3,"numberHabitableRooms":2,"propertyType":"flat","floorLevel":1,"localAuthorityLabel":"Camden","mainHeatDescription":"boiler and radiators, mains gas","flatTopStorey":false,"builtForm":"no data!","isConnectedToMainsGas":true,"mainFuel":"mains gas (not community)","hotWaterDescription":"from main system","localAuthorityCode":"E09000007","epcDate":"2011-04-21T00:00:00.000Z","certificateHash":"732b1c254cca09875a10d825004f56be070a4c7be67c54bf80a708442052e796","buildingReferenceNumber":"0658116868","potentialEnergyRating":"C","currentEnergyEfficiency":"63","potentialEnergyEfficiency":"72","inspectionDate":"2011-04-12","constituency":"E14000750","county":"Greater London Authority","transactionType":"marketed sale","environmentImpactCurrent":"64","environmentImpactPotential":"75","energyConsumptionCurrent":"298","energyConsumptionPotential":"207","co2EmissionsCurrent":"2.3","co2EmissCurrPerFloorArea":"57","co2EmissionsPotential":"1.6","lightingCostCurrent":"38","lightingCostPotential":"23","heatingCostCurrent":"395","heatingCostPotential":"305","hotWaterCostCurrent":"76","hotWaterCostPotential":"60","totalFloorArea":"39.69","energyTariff":"Unknown","flatStoreyCount":"","mainHeatingControls":"Programmer, no room thermostat","multiGlazeProportion":"0","glazedType":"not defined","glazedArea":"Normal","extensionCount":"0","numberHeatedRooms":"2","lowEnergyLighting":"33","numberOpenFireplaces":"0","hotWaterEnergyEff":"Good","hotWaterEnvEff":"Good","floorDescription":"(other premises below)","floorEnergyEff":"N/A","floorEnvEff":"N/A","windowsDescription":"Single glazed","windowsEnergyEff":"Very Poor","windowsEnvEff":"Very Poor","wallsDescription":"Solid brick, as built, no insulation (assumed)","wallsEnergyEff":"Very Poor","wallsEnvEff":"Very Poor","secondHeatDescription":"None","sheatingEnergyEff":"N/A","sheatingEnvEff":"N/A","roofDescription":"(another dwelling above)","roofEnergyEff":"N/A","roofEnvEff":"N/A","mainheatEnergyEff":"Good","mainheatEnvEff":"Good","mainheatcontDescription":"Programmer, no room thermostat","mainheatcEnergyEff":"Very Poor","mainheatcEnvEff":"Very Poor","lightingDescription":"Low energy lighting in 33% of fixed outlets","lightingEnergyEff":"Average","lightingEnvEff":"Average","windTurbineCount":"0","heatLossCorridor":"unheated corridor","unheatedCorridorLength":"6.36","floorHeight":"2.5","photoSupply":"0","solarWaterHeatingFlag":"","mechanicalVentilation":"natural","address":"First Floor Flat, 12 Patshull Road","constituencyLabel":"Holborn and St Pancras"},"userJourneyType":3,"confirmEpc":true,"homeType":4,"fuelType":26,"electricityTariff":null,"tenureType":1,"numberOfStoreys":1,"floorLevels":[2],"numberOfExposedWallsInFlat":1,"homeAge":0,"numberOfBedrooms":1,"shouldIncludeOptionalPropertyQuestions":true,"floorArea":25,"floorAreaUnit":0,"roofType":1,"wallType":1,"glazingType":2,"gardenSizeSquareMetres":100,"gardenAccessibility":0,"condensingBoiler":true,"heatingCost":60,"detailedLengthOfHeatingOnEarlyHours":2,"detailedLengthOfHeatingOnMorning":2,"detailedLengthOfHeatingOnAfternoon":2,"detailedLengthOfHeatingOnEvening":2,"shouldIncludeGrantsQuestionnaire":true,"benefits":0,"numberOfAdultsAgedUnder64":2,"numberOfAdultsAged64To80":0,"numberOfAdultsAgedOver80":0,"numberOfChildren":0},"url":"/energy-efficiency/results"}
    """

  val SAMPLE_ENERGY_CALC_DATA =
    """
      {"epc":{"lmkKey":"621028120110421010416","address1":"First Floor Flat","address2":"12 Patshull Road","address3":"","postcode":"NW5 2LB","currentEnergyRating":3,"numberHabitableRooms":2,"propertyType":"flat","floorLevel":1,"localAuthorityLabel":"Camden","mainHeatDescription":"boiler and radiators, mains gas","flatTopStorey":false,"builtForm":"no data!","isConnectedToMainsGas":true,"mainFuel":"mains gas (not community)","hotWaterDescription":"from main system","localAuthorityCode":"E09000007","epcDate":"2011-04-21T00:00:00.000Z","certificateHash":"732b1c254cca09875a10d825004f56be070a4c7be67c54bf80a708442052e796","buildingReferenceNumber":"0658116868","potentialEnergyRating":"C","currentEnergyEfficiency":"63","potentialEnergyEfficiency":"72","inspectionDate":"2011-04-12","constituency":"E14000750","county":"Greater London Authority","transactionType":"marketed sale","environmentImpactCurrent":"64","environmentImpactPotential":"75","energyConsumptionCurrent":"298","energyConsumptionPotential":"207","co2EmissionsCurrent":"2.3","co2EmissCurrPerFloorArea":"57","co2EmissionsPotential":"1.6","lightingCostCurrent":"38","lightingCostPotential":"23","heatingCostCurrent":"395","heatingCostPotential":"305","hotWaterCostCurrent":"76","hotWaterCostPotential":"60","totalFloorArea":"39.69","energyTariff":"Unknown","flatStoreyCount":"","mainHeatingControls":"Programmer, no room thermostat","multiGlazeProportion":"0","glazedType":"not defined","glazedArea":"Normal","extensionCount":"0","numberHeatedRooms":"2","lowEnergyLighting":"33","numberOpenFireplaces":"0","hotWaterEnergyEff":"Good","hotWaterEnvEff":"Good","floorDescription":"(other premises below)","floorEnergyEff":"N/A","floorEnvEff":"N/A","windowsDescription":"Single glazed","windowsEnergyEff":"Very Poor","windowsEnvEff":"Very Poor","wallsDescription":"Solid brick, as built, no insulation (assumed)","wallsEnergyEff":"Very Poor","wallsEnvEff":"Very Poor","secondHeatDescription":"None","sheatingEnergyEff":"N/A","sheatingEnvEff":"N/A","roofDescription":"(another dwelling above)","roofEnergyEff":"N/A","roofEnvEff":"N/A","mainheatEnergyEff":"Good","mainheatEnvEff":"Good","mainheatcontDescription":"Programmer, no room thermostat","mainheatcEnergyEff":"Very Poor","mainheatcEnvEff":"Very Poor","lightingDescription":"Low energy lighting in 33% of fixed outlets","lightingEnergyEff":"Average","lightingEnvEff":"Average","windTurbineCount":"0","heatLossCorridor":"unheated corridor","unheatedCorridorLength":"6.36","floorHeight":"2.5","photoSupply":"0","solarWaterHeatingFlag":"","mechanicalVentilation":"natural","address":"First Floor Flat, 12 Patshull Road","constituencyLabel":"Holborn and St Pancras"},"property_type":"2","built_form":"4","flat_level":"2","flat_top_storey":"N","number_of_exposed_walls":2,"construction_date":"A","floor_area":25,"num_storeys":1,"num_bedrooms":1,"heating_fuel":"26","heating_cost":60,"number_of_heating_off_hours_normal":[4,4,4,4],"measures":true,"rented":true,"occupants":2}
    """

  val urls = RecordSeqFeederBuilder(
    new File(getClass.getResource("/access_logs").toURI)
      .listFiles()
      .flatMap(Source.fromFile(_).getLines())
      .flatMap({
        case UrlFromAccessLogRegex(time, method, url) =>
          Some(Map("method" -> method, "url" -> url, "body" -> getBody(method, url), "time" -> time))
        case _ => None
      })
  )

  def getBody(method: String, url: String): String = {
    (method, url) match {
      case ("PUT", u) if u.startsWith("/api/userState/") =>
        SAMPLE_USER_STATE_DATA_UPDATE
      case ("POST", "/api/userState/") =>
        SAMPLE_USER_STATE_DATA_CREATE
      case ("POST", "/api/energy-calculation") =>
        SAMPLE_ENERGY_CALC_DATA
      case ("GET", _) =>
        ""
    }
  }

  println(s"DEBUG: loaded data at ${new Date()}, ${urls.records.length} URLs")

  {
    val MODIFIED_ISO_OFFSET_DATE_TIME = new DateTimeFormatterBuilder()
      .parseCaseInsensitive()
      .append(ISO_LOCAL_DATE_TIME)
      .appendOffset("+HHMM", "Z")
      .toFormatter()

    def parse(x: String) = Instant.from(MODIFIED_ISO_OFFSET_DATE_TIME.parse(x))

    val firstReqTime = parse(urls.records.head("time"))
    val lastReqTime = parse(urls.records.get(urls.records.length - 1)("time"))
    val observedDuration = java.time.Duration.between(firstReqTime, lastReqTime)
    val observedReqPerSec = urls.records.length / observedDuration.getSeconds.toDouble
    println(s"DEBUG: observed requests / sec = $observedReqPerSec over $observedDuration")
  }

  val httpProtocol = http
    .baseURL(baseUrl)
    .warmUp(baseUrl)

  val testServerCount = 1.0

  val scn = scenario("Access logs replay")
    .feed(urls.shuffle.circular)
    // (Need to switch on `method`, as `http.httpRequest` treats the method as
    // a constant, not an EL expr)
    .doSwitch("${method}")(
    "GET" -> exec(http("${method} ${url}")
      .get("${url}")),
    "PUT" -> exec(http("${method} ${url}")
      .put("${url}")
      .body(StringBody("${body}"))),
    "POST" -> exec(http("${method} ${url}")
      .post("${url}")
      .body(StringBody("${body}"))))
    .inject(
      // TODO:BEIS-200 scale up to larger user counts, if necessary
      // Ramp up in steps
      rampUsersPerSec(0) to (10 / testServerCount) during 5.minutes,
      rampUsersPerSec(10 / testServerCount) to (20 / testServerCount) during 5.minutes,
      constantUsersPerSec(20 / testServerCount)
        .during(5.minutes)
        .randomized
//      rampUsersPerSec(20 / testServerCount) to (30 / testServerCount) during 5.minutes
//      constantUsersPerSec(30 / testServerCount)
//        .during(5.minutes)
//        .randomized,
//      rampUsersPerSec(30 / testServerCount) to (40 / testServerCount) during 5.minutes
//      constantUsersPerSec(40 / testServerCount)
//        .during(5.minutes)
//        .randomized,
//      rampUsersPerSec(40 / testServerCount) to (50 / testServerCount) during 5.minutes,
//      constantUsersPerSec(50 / testServerCount)
//        .during(5.minutes)
//        .randomized)
    )
    .protocols(httpProtocol)

  setUp(scn)

  println("DEBUG: finished constructor at " + new Date())
}
