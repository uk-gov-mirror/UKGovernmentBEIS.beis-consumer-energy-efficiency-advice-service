<?php

function create_user_for_local_authority($post) {

    $post_ID = $post->ID;
    $display_name = $post->post_title; // With spaces and capitalisation, e.g. "Brighton and Hove".
    $login = sanitize_title_with_dashes($display_name); // Lower case with dashes, e.g. "brigthon-and-hove".
    $user_ID = wp_insert_user(array(
        'user_login'    => $login,
        'user_pass'     => wp_generate_password(),
        'user_email'    => "$login@example.com",
        'nickname'      => $display_name,
        'display_name'  => $display_name,
        'role'          => 'local_authority',
        'admin_color'   => 'blue'
    ));
    if (!is_integer($user_ID)) {
        // The user may already exist.
        $user = get_user_by('login', $login);
        if ($user) {
            $user_ID = $user->ID;
        } else {
            wp_die('Failed to create or find local authority user for new local authority.');
        }
    }
    wp_update_post(array(
        'ID'            => $post_ID,
        'post_author'   => $user_ID
    ));
    return $user_ID;
}
