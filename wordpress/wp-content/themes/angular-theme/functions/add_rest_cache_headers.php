<?php

add_filter('rest_cache_headers', function ($headers) {
    $headers['Cache-Control'] = 'public, max-age=3600';
    return $headers;
});