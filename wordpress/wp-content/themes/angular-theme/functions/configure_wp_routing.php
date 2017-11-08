<?php

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
