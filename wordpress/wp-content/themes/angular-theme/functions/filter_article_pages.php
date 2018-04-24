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
                'key'     => 'tags',
                'value'   => "\"$tag\"",
                'compare' => 'LIKE',
            )
        );
    }

    return $args;
}, 10, 2 );

//The tags are stored in the wp_postmeta table by ACF as a string containing a PHP serialized
//array of tag strings, e.g. "a:2:{i:0;s:16:"tag_reduce_bills";i:1;s:20:"tag_make_home_warmer";}"
//We construct a "meta_query" which Wordpress will use later when joining the wp_posts table
//to the wp_postmeta table, see https://codex.wordpress.org/Class_Reference/WP_Meta_Query
//
//It appears that WP auto-escapes the "like" value, adding % to the start and end,
//so this acts as a substring search, not a true "like" search.
//
//If the desired tag exists in the array, then it will appear in the serialized string as quoted
//text. We can just search for meta values which contain the quoted tag name.
//
//We can be reasonably confident that we won't hit any false-positives from this method
//because the tag names are long strings which should not appear in the PHP serialized data
//if the tag does not appear in an array.
//That would not be the case if we had short tag names like "i:1", which might appear in
//the serialization metadata, so that must be avoided!
//Adding quote marks to the tag name helps with this.