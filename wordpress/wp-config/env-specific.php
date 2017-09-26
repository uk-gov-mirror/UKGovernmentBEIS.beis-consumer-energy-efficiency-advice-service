<?php
$key_name = 'ENVIRONMENT_NAME';

if (array_key_exists($key_name, $_SERVER)) {
    $environment_name = $_SERVER[$key_name];

// Location of environment-specific configuration
    $env_config_file = 'wp-config-' . $environment_name . '.php';

// Check to see if the configuration file for the environment exists
    if (file_exists(__DIR__ . '/' . $env_config_file)) {
        require_once($env_config_file);
    } else {
        // Exit if configuration file does not exist
        exit('No specific configuration found for this environment');
    }
} else {
    require_once('wp-config-debug.php');
}