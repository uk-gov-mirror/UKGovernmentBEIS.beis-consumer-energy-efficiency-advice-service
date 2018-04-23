<?php

add_filter( 'rest_query_vars', function ( $valid_vars ) {
    return array_merge( $valid_vars, array( 'tag', 'meta_query' ) );
} );

// This converts the query string to a meta query that is used for the DB.
// It is important to avoid special characters when adding new tags, as it may break this filter.

function add_tag_filter($query_string) {
    add_filter( $query_string, function( $args, $request ) {
        $tag  = $request->get_param( 'tag' );

        if ( ! empty( $tag ) ) {
            $args['meta_query'] = array(
                array(
                    'key'     => 'tags',
                    'value'   => "\"$tag\"",
                    'compare' => 'LIKE',
                )
            );
        }

        return $args;
    }, 10, 2 );
}

add_tag_filter('rest_page_query');
add_tag_filter('rest_measure_query');