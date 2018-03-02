<?php

// TODO:BEISDEAS-157 migrate to java frontend

// Load custom analytics scripts in the head
function enqueue_custom_scripts()
{
    $ga_id = get_google_analytics_key();
    if (!is_null($ga_id)) {
        wp_register_script('gtag', 'https://www.googletagmanager.com/gtag/js?id=' . $ga_id);
        wp_register_script('google-analytics', get_template_directory_uri() . '/js/google-analytics.js', array('gtag'));
        wp_enqueue_script('google-analytics');
        wp_localize_script('google-analytics', 'gaId', $ga_id);
    }

    $hotjar_id = get_hotjar_id();
    if (!is_null($hotjar_id)) {
        wp_register_script('hotjar', get_template_directory_uri() . '/js/hotjar.js');
        wp_enqueue_script('hotjar');
        wp_localize_script('hotjar', 'hotjarId', $hotjar_id);
    }
}

add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

function get_google_analytics_key()
{
    if (array_key_exists('GOOGLE_ANALYTICS_ID', $_SERVER)) {
        return $_SERVER['GOOGLE_ANALYTICS_ID'];
    }
    return null;
}

function get_hotjar_id()
{
    if (array_key_exists('HOTJAR_ID', $_SERVER)) {
        return $_SERVER['HOTJAR_ID'];
    }
    return null;
}