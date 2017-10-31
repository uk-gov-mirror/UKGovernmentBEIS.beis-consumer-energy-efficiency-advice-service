<?php require_once('api_error_handling.php');

// Add Wordpress API function for getting EPC
function get_epc(WP_REST_Request $request)
{
    $args = array(
        'headers' => array(
            'Authorization' => 'Basic ' . $_SERVER['EPC_API_TOKEN'],
            'Accept' => 'application/json'
        )
    );
    $url = add_query_arg( array(
        'postcode' => $request['postcode'],
        'address' => $request['address'],
        'size' => $request['size']
    ), 'https://epc.opendatacommunities.org/api/v1/domestic/search?');
    return response_body_or_else_error(wp_remote_get($url, $args), 'EPC_API_ERROR');
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/epc', array(
        'methods' => 'GET',
        'callback' => 'get_epc',
    ));
});