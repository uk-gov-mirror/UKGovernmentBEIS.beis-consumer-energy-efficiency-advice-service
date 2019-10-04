<?php

add_action( 'init', 'set_up_roles_capabilities_and_users_for_local_authorities' );
add_action( 'transition_post_status', 'create_user_for_new_local_authority_posts', 10, 3 );

function set_up_roles_capabilities_and_users_for_local_authorities() {

    if (get_option('migration/201910041427_set_up_roles_capabilities_and_users_for_local_authorities') == 'done') {
        return;
    }

    // Remove unused roles.
    remove_role('editor');
    remove_role('author');
    remove_role('contributor');
    remove_role('subscriber');

    // Update administrator role capabilities.
    $administrator = get_role('administrator');
    $administrator->add_cap('create_local_authorities');
    $administrator->add_cap('edit_local_authorities');
    $administrator->add_cap('edit_private_local_authorities');
    $administrator->add_cap('edit_published_local_authorities');
    $administrator->add_cap('edit_others_local_authorities');
    $administrator->add_cap('delete_local_authorities');
    $administrator->add_cap('delete_private_local_authorities');
    $administrator->add_cap('delete_published_local_authorities');
    $administrator->add_cap('delete_others_local_authorities');
    $administrator->add_cap('publish_local_authorities');
    $administrator->add_cap('read_private_local_authorities');
    $administrator->add_cap('edit_local_grants');
    $administrator->add_cap('edit_private_local_grants');
    $administrator->add_cap('edit_published_local_grants');
    $administrator->add_cap('edit_others_local_grants');
    $administrator->add_cap('delete_local_grants');
    $administrator->add_cap('delete_private_local_grants');
    $administrator->add_cap('delete_published_local_grants');
    $administrator->add_cap('delete_others_local_grants');
    $administrator->add_cap('publish_local_grants');
    $administrator->add_cap('read_private_local_grants');

    // Add local authority role.
    add_role('local_authority', 'Local Authority', array(
        'read'                              => true,
        'edit_local_authorities'            => true,
        'edit_published_local_authorities'  => true,
        'edit_local_grants'                 => true,
        'edit_published_local_grants'       => true,
        'delete_local_grants'               => true,
        'delete_published_local_grants'     => true,
        'publish_local_grants'              => true
    ));

    // Create local authority accounts and assign local authority and grant posts.
    $local_authority_posts = get_posts(array(
        'post_type'     => 'local_authority',
        'numberposts'   => -1 // -1 means all posts.
    ));
    $users_grouped_by_grant = array();
    foreach ($local_authority_posts as $post) {
        $user_ID = create_user_for_local_authority($post);
        if (!$user_ID) {
            continue;
        }
        $grants = get_field('grants', $post->ID);
        if (!is_array($grants)) {
            continue;
        }
        foreach ($grants as $grant) {
            if (!isset($users_grouped_by_grant[$grant])) {
                $users_grouped_by_grant[$grant] = array();
            }
            array(array_push($users_grouped_by_grant[$grant], $user_ID));
        }
    }
    foreach ($users_grouped_by_grant as $grant_ID => $user_IDs) {
        // If only one local authority uses this grant, make them the author.
        if (count($user_IDs) === 1) {
            $user_ID = $user_IDs[0];
            wp_update_post(array(
                'ID'            => $grant_ID,
                'post_author'   => $user_ID
            ));
        }
    }

    // Mark done.
    update_option('migration/201910041427_set_up_roles_capabilities_and_users_for_local_authorities', 'done');
}

function create_user_for_new_local_authority_posts($new_status, $old_status, $post) {

    if ($new_status == 'publish' && $old_status != 'publish' && $post->post_type == 'local_authority') {
        create_user_for_local_authority($post);
    }
}

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
