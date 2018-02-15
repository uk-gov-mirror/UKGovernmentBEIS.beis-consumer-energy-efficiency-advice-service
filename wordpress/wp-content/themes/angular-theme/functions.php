<?php

# Load config to be used by functions if it exists
$configFilePath = dirname(__FILE__) . "/config/config.php";
if (file_exists($configFilePath)) {
    include($configFilePath);
}

require_once("functions/analytics.php");
require_once("functions/epc.php");
require_once("functions/ocr.php");
require_once("functions/postcode.php");
require_once("functions/initialise_page_post_type.php");
require_once("functions/initialise_question_post_type.php");
require_once("functions/initialise_feature_flag_post_type.php");
require_once("functions/initialise_local_authority_post_type.php");
require_once("functions/initialise_boiler_post_type.php");
require_once("functions/initialise_income_thresholds.php");
require_once("functions/initialise_local_grant_post_type.php");
require_once("functions/initialise_national_grant_post_type.php");
require_once("functions/initialise_measure_post_type.php");
require_once("functions/configure_api_caching.php");
require_once("functions/local_authority.php");
require_once("functions/energy_calculation.php");
require_once("functions/hide_admin_bar.php");
require_once("functions/limit-page-hierarchy-depth.php");
require_once("functions/configure_wp_routing.php");
require_once("functions/national_grant.php");
require_once("functions/measure.php");