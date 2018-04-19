<?php

// This filters articles by tag so that different articles are shown on the different landing pages.
// It converts the query string to a meta query that is used for the DB.
// It is important to avoid special characters when adding new tags, as it may break this filter.

add_filter( 'rest_query_vars', function ( $valid_vars ) {
    return array_merge( $valid_vars, array( 'tag', 'meta_query' ) );
} );

add_filter( 'rest_page_query', function( $args, $request ) {
    $tag  = $request->get_param( 'tag' );

    if ( ! empty( $tag ) ) {
        $args['meta_query'] = array(
            array(
                'key'     => 'tag',
                'value'   => "\"$tag\"",
                'compare' => 'LIKE',
            )
        );
    }

    return $args;
}, 10, 2 );
