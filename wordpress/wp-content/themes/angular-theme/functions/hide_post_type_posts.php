<?php

// The "post" type posts are for blog entries; we don't use them.
function hide_post_type_posts()
{
    remove_menu_page('edit.php');
}

add_action('admin_menu', 'hide_post_type_posts');
