<?php

// Add Wordpress API function for getting Measures content
function get_measures()
{
    $matching_posts = get_posts(array(
        'post_type' => 'measure',
        'posts_per_page' => 1000,
    ));
    return array_map('get_measure_details', $matching_posts);
}

function get_measure_details($measure_post_object)
{
    $measure_details = get_fields($measure_post_object->ID);
    $linked_tag_ids = is_null($measure_details['tags']) ? [] : (array) $measure_details['tags'];
    $measure_details['tags'] = array_map('get_tag_name', $linked_tag_ids);
    return $measure_details;
}

function get_tag_name($tag_id)
{
    return get_post_field('post_name', $tag_id);
}

add_action('rest_api_init', function () {
    register_rest_route('angular-theme/v1', '/measures', array(
        'methods' => 'GET',
        'callback' => 'get_measures'
    ));
});