<?php
// Gets an EPC
function getEpc(WP_REST_Request $request)
{
    $args = array(
        'headers' => array(
            'Authorization' => 'Basic ' . $_SERVER['EPC_API_TOKEN'],
            'Accept' => 'application/json'
        )
    );
    $url = 'https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=' . $request['postcode'] . '&address=' . $request['number'];
    return json_decode(wp_remote_retrieve_body(wp_remote_get($url, $args)));
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'angular-theme/v1', '/postcode-epc', array(
        'methods' => 'GET',
        'callback' => 'getEpc',
    ));
});