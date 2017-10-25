<?php

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
    $response = wp_remote_get($url, $args);
    $responseCode = wp_remote_retrieve_response_code($response);
    if (!empty($responseCode) && $responseCode != 200) {
        $responseBody = json_decode(wp_remote_retrieve_body($response));
        return new WP_Error(
            'POSTCODE_API_ERROR',
            $responseBody->error,
            array(
                'status' => $responseCode
            )
        );
    }
    return json_decode(wp_remote_retrieve_body($response));
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/postcode/(?P<postcode>[a-zA-Z0-9]+)', array(
        'methods' => 'GET',
        'callback' => 'get_postcode_details',
    ));
});