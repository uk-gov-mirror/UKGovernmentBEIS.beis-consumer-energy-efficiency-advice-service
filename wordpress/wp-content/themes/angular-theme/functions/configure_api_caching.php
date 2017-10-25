<?php

add_filter('rest_cache_headers', function ($headers) {
    $headers['Cache-Control'] = 'public, max-age=3600';
    return $headers;
});

add_action('save_post', function () {
    if (class_exists('WP_REST_Cache')) {
        WP_REST_Cache::empty_cache();
    }
});