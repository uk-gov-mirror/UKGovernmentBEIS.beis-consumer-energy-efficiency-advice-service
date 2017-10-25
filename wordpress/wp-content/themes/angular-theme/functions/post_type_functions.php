<?php

function disable_quick_edit_for($post_type = null) {
    return function($actions = array(), $post = null ) use ($post_type) {

        // Abort if the post type does not match
        global $current_screen;
        if ( $current_screen->post_type != $post_type ) {
            return $actions;
        }

        if ( isset( $actions['inline hide-if-no-js'] ) ) {
            unset( $actions['inline hide-if-no-js'] );
            unset( $actions['trash'] );
        }

        return $actions;
    };
}

function add_slug($response) {
    $data_with_slug = array_map(function ($datum) {
        $datum['slug'] = get_post_field('post_name', $datum['id']);
        return $datum;
    }, $response->data);

    $response->data = $data_with_slug;
    return $response;
}