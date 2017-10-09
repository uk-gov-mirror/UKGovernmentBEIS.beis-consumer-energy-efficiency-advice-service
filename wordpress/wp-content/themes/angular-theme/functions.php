<?php

// Load custom analytics scripts in the head
function enqueue_custom_scripts()
{
    $ga_id = get_google_analytics_key();
    if (!is_null($ga_id)) {
        wp_register_script('gtag', 'https://www.googletagmanager.com/gtag/js?id=' . $ga_id);
        wp_register_script('google-analytics', get_template_directory_uri() . '/js/google-analytics.js', array('gtag'));
        wp_enqueue_script('google-analytics');
        wp_localize_script('google-analytics', 'gaId', $ga_id);
    }

    $hotjar_id = get_hotjar_id();
    if (!is_null($hotjar_id)) {
        wp_register_script('hotjar', get_template_directory_uri() . '/js/hotjar.js');
        wp_enqueue_script('hotjar');
        wp_localize_script('hotjar', 'hotjarId', $hotjar_id);
    }
}

add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

function get_google_analytics_key()
{
    if (array_key_exists('GOOGLE_ANALYTICS_ID', $_SERVER)) {
        return $_SERVER['GOOGLE_ANALYTICS_ID'];
    }
    return null;
}

function get_hotjar_id()
{
    if (array_key_exists('HOTJAR_ID', $_SERVER)) {
        return $_SERVER['HOTJAR_ID'];
    }
    return null;
}

// Add Wordpress API function for getting EPC
function get_epc(WP_REST_Request $request)
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

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/postcode-epc', array(
        'methods' => 'GET',
        'callback' => 'get_epc',
    ));
});

// Add Wordpress API function for getting OCR
function post_ocr(WP_REST_Request $request)
{
    $file = file_get_contents($request->get_file_params()['uploadFile']['tmp_name']);
    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ),
        'body' => json_encode(array(
            'requests' => array(
                array(
                    'image' => array(
                        'content' => base64_encode($file)
                    ),
                    'features' => array(
                        array(
                            'type' => 'TEXT_DETECTION'
                        )
                    )
                )
            )
        ))
    );
    $url = 'https://vision.googleapis.com/v1/images:annotate?key=' . $_SERVER['OCR_API_TOKEN'];
    $result = wp_remote_post($url, $args);

    return json_decode(wp_remote_retrieve_body($result), true)
    ['responses'][0]
    ['textAnnotations'][0]
    ['description'];
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/ocr', array(
        'methods' => 'POST',
        'callback' => 'post_ocr',
    ));
});