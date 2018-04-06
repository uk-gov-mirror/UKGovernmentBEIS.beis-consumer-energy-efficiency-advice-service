<?php

function acf_wysiwyg_remove_wpautop()
{
    // If we don't do this, WordPress adds a <p> tag to our HTML ACF fields
    remove_filter('acf_the_content', 'wpautop');
}

add_action('acf/init', 'acf_wysiwyg_remove_wpautop');

function acf_wysiwyg_add_minimal_toolbar($toolbars)
{
    // Add a toolbar which heavily restricts available tags
    $toolbars['Minimal'] = array(
        1 => array('bold', 'italic', 'link', 'unlink')
    );

    return $toolbars;
}

add_action('acf/fields/wysiwyg/toolbars', 'acf_wysiwyg_add_minimal_toolbar');

