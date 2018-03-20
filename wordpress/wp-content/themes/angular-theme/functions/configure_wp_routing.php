<?php

// TODO:BEISDEAS-161 we should be able to delete this once the frontend is not accessed through WP
// At the same time, we should probably hide the frontend entirely in WP and direct people
// to the Java host, to avoid confusion.

add_filter('do_parse_request', function($do_parse, $wp) {

    // This filter disables Wordpress's routing for matching URL paths, to avoid conflicting with routing within the Angular app
    $route_with_wordpress_routing_disabled = "/^\/js/";

    $request_path = $_SERVER['REQUEST_URI'];;
    preg_match($route_with_wordpress_routing_disabled, $request_path, $matches);

    $should_disable_wordpress_routing = !empty($matches);

    if ($should_disable_wordpress_routing) {
        $wp->query_vars = [];
        return false;
    } else {
        return $do_parse;
    }
}, 10, 2);
