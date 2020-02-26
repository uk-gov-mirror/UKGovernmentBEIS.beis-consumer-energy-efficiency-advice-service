<?php

require_once("helpers/create_user_for_local_authority.php");

add_action( 'transition_post_status', 'create_new_local_authority_users_when_creating_new_local_authority_posts', 10, 3 );

function create_new_local_authority_users_when_creating_new_local_authority_posts($new_status, $old_status, $post) {

    if ($new_status == 'publish' && $old_status != 'publish' && $post->post_type == 'local_authority') {
        create_user_for_local_authority($post);
    }
}
