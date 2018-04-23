<?php

add_action('init', 'setup_page_acf_group');

function setup_page_acf_group()
{
    if (function_exists("acf_add_local_field_group")) {
        acf_add_local_field_group(array(
            'key' => 'group_5a1d8632971ff',
            'title' => 'Custom Options',
            'fields' => array(
                array (
                    'key' => 'field_000001',
                    'label' => 'Basic Details',
                    'name' => 'basic_details_tab',
                    'type' => 'tab',
                ),
                array(
                    'key' => 'field_5a1ecb4e53fc3',
                    'label' => 'Cover Image',
                    'name' => 'cover_image',
                    'type' => 'image',
                    'instructions' => '',
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
                    'mime_types' => '',
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
                array (
                    'key' => 'field_000002',
                    'label' => 'Tags',
                    'name' => 'tags_tab',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_000003',
                    'label' => 'Tags',
                    'name' => 'tags',
                    'instructions' => 'Tags to determine where this article should be displayed',
                    'type' => 'checkbox',
                    'choices' => array (
                        // When adding new tags here, avoid using special characters as it may break
                        // the filtering. See filter_article_pages.php.
                        'tag_general' => 'General',
                        'tag_reduce_bills' => 'Reduce your bills',
                        'tag_make_home_warmer' => 'Make your home warmer',
                        'tag_make_home_greener' => 'Make your home greener',
                        'tag_home_improvements' => 'Home improvements',
                    ),
                    'default_value' => '',
                    'layout' => 'vertical',
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