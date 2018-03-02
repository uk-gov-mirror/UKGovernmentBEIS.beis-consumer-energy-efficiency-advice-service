<?php

// TODO:BEISDEAS-161 migrate to java for scalability, maintainability and caching

// Add Wordpress API function for getting Local Authority data by ONS code
function get_local_authority(WP_REST_Request $request)
{
    $matching_posts = get_posts(array(
        'post_type'      => 'local_authority',
        'posts_per_page' => 1,
        'meta_key'       => 'local_authority_code',
        'meta_value'     => $request['ons_code']
    ));
    if (count($matching_posts) > 0) {
        $local_authority = get_fields($matching_posts[0]->ID);
        $local_authority['grants'] = array_map('get_local_grant_details', $local_authority['grants']);
        return $local_authority;
    }
    return new WP_Error(
        'local_authority_not_found',
        'Local authority with code ' . $request['ons_code'] . ' not found',
        array(
            'status' => 404
        )
    );
}

function get_local_grant_details($grant_post_id)
{
    $grant_details = get_fields($grant_post_id);
    $grant_details['slug'] = get_post_field('post_name', $grant_post_id);
    return $grant_details;
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/local-authority/(?P<ons_code>[a-zA-Z0-9]+)', array(
        'methods' => 'GET',
        'callback' => 'get_local_authority'
    ));
});