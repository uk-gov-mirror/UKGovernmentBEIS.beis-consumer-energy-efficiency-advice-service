<?php

// Add Wordpress API function for getting National Grants with linked measures
function get_national_grants()
{
    $matching_posts = get_posts(array(
        'post_type' => 'national_grant',
        'posts_per_page' => 1000,
    ));
    return array_map('get_grant_details', $matching_posts);
}

function get_grant_details($grant_post_object)
{
    $grant_details = get_fields($grant_post_object->ID);
    $linked_measure_ids = is_null($grant_details['measures']) ? [] : $grant_details['measures'];
    $grant_details['linked_measure_codes'] = array_map('get_measure_code', $linked_measure_ids);
    unset($grant_details['measures']);
    $grant_details['slug'] = $grant_post_object->post_name;
    return $grant_details;
}

function get_measure_code($measure_id)
{
    return get_field('rdsap_measure_code', $measure_id);
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/national-grants', array(
        'methods' => 'GET',
        'callback' => 'get_national_grants'
    ));
});