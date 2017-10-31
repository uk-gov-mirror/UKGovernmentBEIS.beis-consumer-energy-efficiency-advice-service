<?php require_once('api_error_handling.php');

// Add Wordpress API function for getting EPC
function get_postcode_details(WP_REST_Request $request)
{
    $args = array(
        'headers' => array(
            'Accept' => 'application/json'
        )
    );
    $postcode = $request['postcode'];
    $url = "https://api.postcodes.io/postcodes/$postcode";
    return response_body_or_else_error(wp_remote_get($url, $args), 'POSTCODE_API_ERROR');
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/postcode/(?P<postcode>[a-zA-Z0-9]+)', array(
        'methods' => 'GET',
        'callback' => 'get_postcode_details',
    ));
});