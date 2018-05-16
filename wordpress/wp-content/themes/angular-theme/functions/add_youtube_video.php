<?php

add_filter("mce_external_plugins", "add_youtube_video_plugin");
add_filter('mce_buttons', 'register_youtube_video_button');

function add_youtube_video_plugin($plugin_array) {
    add_editor_style();
    $plugin_array['youtube_video'] = plugins_url( 'youtube-video/youtube-video.js');
    return $plugin_array;
}

function register_youtube_video_button($buttons) {
    array_push($buttons, "youtube_video");
    return $buttons;
}