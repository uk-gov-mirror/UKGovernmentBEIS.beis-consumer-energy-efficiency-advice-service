<?php

add_filter("mce_external_plugins", "add_beis_button_plugin");
add_filter('mce_buttons', 'register_beis_button');

function add_beis_button_plugin($plugin_array) {
    add_editor_style();
    $plugin_array['beis_button'] = plugins_url( 'beis-button/beis-button.js');
    return $plugin_array;
}

function register_beis_button($buttons) {
    array_push($buttons, "beis_button");
    return $buttons;
}