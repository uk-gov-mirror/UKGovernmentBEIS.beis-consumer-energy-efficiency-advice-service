<?php

add_action('init', 'setup_page_acf_group');

function setup_page_acf_group()
{
    if (function_exists("acf_add_local_field_group")) {
        acf_add_local_field_group(array(
            'key' => 'group_5a1d8632971ff',
            'title' => 'sdfsdf',
            'fields' => array(
                array(
                    'key' => 'field_5a1ecb4e53fc3',
                    'label' => 'Cover Image',
                    'name' => 'cover_image',
                    'type' => 'image',
                    'instructions' => WP_DEBUG ? '' : 'This is disabled in production. See BEISDEAS-197.',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'return_format' => 'array',
                    'preview_size' => 'thumbnail',
                    'library' => 'all',
                    'min_width' => '',
                    'min_height' => '',
                    'min_size' => '',
                    'max_width' => '',
                    'max_height' => '',
                    'max_size' => '',
                    'mime_types' => WP_DEBUG ? '' : 'disabled-in-production',
                ),
                array(
                    'key' => 'field_5a1ecc8553fc4',
                    'label' => 'Video',
                    'name' => 'video_embed',
                    'type' => 'oembed',
                    'instructions' => 'URL of a video, hosted by a website that supports oEmbed. This is a temporary set-up for demo purposes; in the future, we will need to support uploaded videos.',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'width' => '',
                    'height' => '',
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'page',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'acf_after_title',
            'style' => 'seamless',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
            'hide_on_screen' => '',
            'active' => 1,
            'description' => '',
        ));
    }
}