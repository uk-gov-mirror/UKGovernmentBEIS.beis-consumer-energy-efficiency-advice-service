<?php

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
    return json_decode(wp_remote_retrieve_body(wp_remote_get($url, $args)));
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/epc', array(
        'methods' => 'GET',
        'callback' => 'get_epc',
    ));
});