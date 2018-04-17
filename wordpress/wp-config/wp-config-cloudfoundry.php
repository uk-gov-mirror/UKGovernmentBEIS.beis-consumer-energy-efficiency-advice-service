<?php
// Prevent file from being accessed directly
if (!defined('ABSPATH')) exit();

//** Config for MySQL in App, for Cloudfoundry PaaS */

/*
 * Read MySQL service properties from _ENV['VCAP_SERVICES']
 */
$service_blob = json_decode($_ENV['VCAP_SERVICES'], true);
$mysql_service = null;
$wordpress_secrets = null;
foreach($service_blob as $service_provider => $service_list) {
    foreach ($service_list as $some_service) {
        // looks for tags of 'mysql'
        if (in_array('mysql', $some_service['tags'], true)) {
            if (isset($mysql_service)) {
                exit("Found more than one entry in VCAP_SERVICES tagged 'mysql'");
            }
            $mysql_service = $some_service;
        }

        if ($some_service['name'] === 'dceas-wordpress-secrets') {
            $wordpress_secrets = $some_service;
        }
    }
}
if (!isset($mysql_service)) {
    exit("Did not find an entry in VCAP_SERVICES tagged 'mysql'");
}
if (!isset($wordpress_secrets)) {
    exit("Did not find an entry in VCAP_SERVICES with name 'dceas-wordpress-secrets'");
}

/** The name of the database for WordPress */
define('DB_NAME', $mysql_service['credentials']['name']);

/** MySQL database username */
define('DB_USER', $mysql_service['credentials']['username']);

/** MySQL database password */
define('DB_PASSWORD', $mysql_service['credentials']['password']);

/** MySQL hostname : this contains the port number in this format host:port */
define('DB_HOST', $mysql_service['credentials']['host'] . ":" . $mysql_service['credentials']['port']);

// MySQL on CF RDS requires SSL connections
define( 'MYSQL_CLIENT_FLAGS', MYSQLI_CLIENT_SSL );

/** Secret keys retrieved from CF app settings */
define('AUTH_KEY',         $wordpress_secrets['credentials']['AUTH_KEY']);
define('SECURE_AUTH_KEY',  $wordpress_secrets['credentials']['SECURE_AUTH_KEY']);
define('LOGGED_IN_KEY',    $wordpress_secrets['credentials']['LOGGED_IN_KEY']);
define('NONCE_KEY',        $wordpress_secrets['credentials']['NONCE_KEY']);
define('AUTH_SALT',        $wordpress_secrets['credentials']['AUTH_SALT']);
define('SECURE_AUTH_SALT', $wordpress_secrets['credentials']['SECURE_AUTH_SALT']);
define('LOGGED_IN_SALT',   $wordpress_secrets['credentials']['LOGGED_IN_SALT']);
define('NONCE_SALT',       $wordpress_secrets['credentials']['NONCE_SALT']);

define('WP_DEBUG', false);
