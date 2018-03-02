<?php require_once('api_error_handling.php');

// TODO:BEISDEAS-161 migrate to java for scalability, maintainability and caching

// Add Wordpress API function for getting Energy Calculations
function post_energy_calculation_request(WP_REST_Request $request)
{
    $authHeader = get_energy_calculation_auth_header();
    $boundary = wp_generate_password( 24 , false);
    $body = get_multipart_form_body(
        array(
            'requestData' => $request->get_body()
        ),
        $boundary
    );
    $args = array(
        'headers' => array(
            'Authorization' => $authHeader,
            'Accept' => 'application/json',
            'Content-Type' => 'multipart/form-data; boundary=' .$boundary
        ),
        'body' => $body
    );
    $url ='https://uat.brewebserv.com/bemapi/energy_use';
    return response_body_or_else_error(wp_remote_post($url, $args), 'ENERGY_CALCULATION_API_ERROR');
}

function get_energy_calculation_auth_header()
{
    $username = $_SERVER['BRE_API_USERNAME'];
    $password = $_SERVER['BRE_API_PASSWORD'];
    $created = date('c');
    $nonce = wp_generate_password(64, false);
    $stringToHash = $password . $nonce . $username . $created;
    $token = hash('sha256', $stringToHash);
    $authHeader = "WSSE UsernameToken Token=\"$token\", Nonce=\"$nonce\", Username=\"$username\", Created=\"$created\"";
    return $authHeader;
}

function get_multipart_form_body($fields, $boundary)
{
    $body ='';
    foreach($fields as $key => $value) {
        $body .= '--' .$boundary;
        $body .= "\r\n";
        $body .= 'Content-Disposition: form-data; name="' . $key . '"';
        $body .= "\r\n\r\n";
        $body .= $value;
        $body .= "\r\n";
    }
    return $body;
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/energy-calculation', array(
        'methods' => 'POST',
        'callback' => 'post_energy_calculation_request',
    ));
});