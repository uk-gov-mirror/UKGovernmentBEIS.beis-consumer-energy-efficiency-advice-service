<?php

add_filter('do_parse_request', function($do_parse, $wp) {

    // This filter disables Wordpress's routing for all URL paths except those matching the following regexes,
    // to avoid conflicting with Angular's routing
    $routesWithWordpressRoutingEnabled = array("/^\/wp-json/");

    $isRequestPathMatchingARouteForWordpressRouting = array_reduce($routesWithWordpressRoutingEnabled, function ($carry, $routeRegexp) {
        $requestPath = $_SERVER['REQUEST_URI'];
        preg_match($routeRegexp, $requestPath, $matches);
        return $carry || !empty($matches);
    });

    echo $isRequestPathMatchingARouteForWordpressRouting;

    if ($isRequestPathMatchingARouteForWordpressRouting) {
        // Enable Wordpress routing
        return $do_parse;
    } else {
        // Disable Wordpress routing
        $wp->query_vars = [];
        return false;
    }
}, 10, 2);