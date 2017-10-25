<?php

// Add Wordpress API function for getting Local Authority data by ONS code
function get_local_authority(WP_REST_Request $request)
{
    $wpQueryArgs = array(
        'post_type' => 'local_authority',
        'posts_per_page' => -1
    );
    $query = new WP_Query($wpQueryArgs);
    $localAuthorityPosts = $query->get_posts();
    $getLocalAuthorityDetails = function($post) {
        $postId = $post->ID;
        return get_fields($postId);
    };
    $localAuthorityDetails = array_map($getLocalAuthorityDetails, $localAuthorityPosts);
    foreach($localAuthorityDetails as $localAuthorityDetail) {
        if ($localAuthorityDetail['local_authority_code'] == $request['ons_code'])
            return $localAuthorityDetail;
    }
    return new WP_Error(
        'local_authority_not_found',
        'Local authority not found',
        array(
            'status' => 404
        )
    );
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/local-authority/(?P<ons_code>[a-zA-Z0-9]+)', array(
        'methods' => 'GET',
        'callback' => 'get_local_authority'
    ));
});