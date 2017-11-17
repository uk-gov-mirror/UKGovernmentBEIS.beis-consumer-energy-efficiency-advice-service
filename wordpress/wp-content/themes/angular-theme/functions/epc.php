<?php require_once('api_error_handling.php');

function getRequestArgs()
{
    return array(
        'headers' => array(
            'Authorization' => 'Basic ' . $_SERVER['EPC_API_TOKEN'],
            'Accept' => 'application/json'
        )
    );
}

// Add Wordpress API function for getting EPC
function get_epc(WP_REST_Request $request)
{
    $args = getRequestArgs();
    $url = add_query_arg( array(
        'postcode' => $request['postcode'],
        'address' => $request['address'],
        'size' => $request['size']
    ), 'https://epc.opendatacommunities.org/api/v1/domestic/search?');
    return response_body_or_else_error(wp_remote_get($url, $args), 'EPC_SEARCH_API_ERROR');
}

// Add Wordpress API function for getting EPC recommendations
function get_epc_recommendations(WP_REST_Request $request)
{
    $args = getRequestArgs();
    $lmkKey = $request['lmkKey'];
    $url = "https://epc.opendatacommunities.org/api/v1/domestic/recommendations/$lmkKey";
    return response_body_or_else_error(wp_remote_get($url, $args), 'EPC_RECOMMENDATIONS_API_ERROR');
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/epc', array(
        'methods' => 'GET',
        'callback' => 'get_epc',
    ));
    register_rest_route('angular-theme/v1', '/epc-recommendations', array(
        'methods' => 'GET',
        'callback' => 'get_epc_recommendations',
    ));
});