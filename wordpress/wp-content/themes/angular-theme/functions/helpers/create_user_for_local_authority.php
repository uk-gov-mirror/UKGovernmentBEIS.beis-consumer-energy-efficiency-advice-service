<?php

function create_user_for_local_authority($post) {

    $post_ID = $post->ID;
    $login = $post->post_name; // Lower snake case, e.g. "brigthon_and_hove".
    $display_name = get_field('display_name', $post_ID); // With spaces and capitalisation, e.g. "Brighton and Hove".
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
        $user = get_user_by('login', $login);
        if ($user) {
            $user_ID = $user->ID;
        } else {
            return false;
        }
    }
    wp_update_post(array(
        'ID'            => $post_ID,
        'post_author'   => $user_ID
    ));
    return $user_ID;
}
