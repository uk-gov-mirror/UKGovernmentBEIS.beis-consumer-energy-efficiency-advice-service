<?php

# Load config to be used by functions if it exists
// TODO:BEIS-163 configure from cloudfoundry env, see wp-config-cloudfoundry.php
$configFilePath = dirname(__FILE__) . "/config/config.php";
if (file_exists($configFilePath)) {
    include($configFilePath);
}
if (!isset($_SERVER["EPC_API_TOKEN"])) {
    throw new Exception("The configuration appears to not be set.\n" .
        "On a dev machine, please copy `config.php.template` to `config.php` and fill in the values.\n" .
        "On a server, please ensure the relevant ENV vars are set.");
}

require_once("functions/analytics.php");
require_once("functions/initialise_page_post_type.php");
require_once("functions/initialise_question_post_type.php");
require_once("functions/initialise_feature_flag_post_type.php");
require_once("functions/initialise_local_authority_post_type.php");
require_once("functions/initialise_boiler_post_type.php");
require_once("functions/initialise_income_thresholds.php");
require_once("functions/initialise_local_grant_post_type.php");
require_once("functions/initialise_national_grant_post_type.php");
require_once("functions/initialise_measure_post_type.php");
require_once("functions/initialise_supplier_post_type.php");
require_once("functions/configure_api_caching.php");
require_once("functions/local_authority.php");
require_once("functions/energy_calculation.php");
require_once("functions/hide_admin_bar.php");
require_once("functions/limit-page-hierarchy-depth.php");
require_once("functions/configure_wp_routing.php");
require_once("functions/national_grant.php");
require_once("functions/measure.php");