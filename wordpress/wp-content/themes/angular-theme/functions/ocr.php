<?php

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