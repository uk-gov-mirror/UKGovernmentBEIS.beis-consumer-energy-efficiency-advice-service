<?php

// TODO:BEISDEAS-161 remove this when it is no longer needed

function response_body_or_else_error($response, $error_code = 'ERROR') {
    $responseCode = wp_remote_retrieve_response_code($response);
    if (!empty($responseCode) && $responseCode != 200) {
        $responseBody = json_decode(wp_remote_retrieve_body($response));
        return new WP_Error(
            $error_code,
            $responseBody->error,
            array(
                'status' => $responseCode
            )
        );
    } else {
        return json_decode(wp_remote_retrieve_body($response));
    }
}
