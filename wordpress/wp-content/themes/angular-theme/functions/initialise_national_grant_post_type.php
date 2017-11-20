<?php

add_action( 'init', 'create_national_grant_post_type' );
add_action( 'init', 'setup_national_grant_acf_group' );

// Disable the quick-edit link to prevent users editing the slug for a grant
add_filter( 'post_row_actions', disable_quick_edit_for('national_grant'), 10, 2 );

// Add slug to returned ACF fields
add_filter('acf/rest_api/national_grant/get_items', 'add_slug');

function create_national_grant_post_type() {

    register_post_type('national_grant',
        array(
            'labels'                => array(
                'name' => __( 'National Grants' ),
                'singular_name' => __( 'National Grant' )
            ),
            'description'           => 'National energy grants',
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-money',
            'menu_position'         => 5,
            'supports'              => array('title', 'revisions')
        ));
}

function setup_national_grant_acf_group() {

    if(function_exists("register_field_group"))
    {
        register_field_group(array (
            'id' => 'acf_national_grant',
            'title' => 'National Grant',
            'fields' => array (
                array (
                    'key' => 'field_5a0d969b5dbb1',
                    'label' => 'Heading',
                    'name' => 'heading',
                    'type' => 'text',
                    'instructions' => 'e.g. \'ECO Affordable Warmth\'',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a0d96a17c14c',
                    'label' => 'Description',
                    'name' => 'description',
                    'type' => 'textarea',
                    'instructions' => 'A short description of the grant',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a0d96a77de6d',
                    'label' => 'Measures',
                    'name' => 'measures',
                    'type' => 'relationship',
                    'instructions' => 'The home improvement measures which this grant can be used to fund',
                    'return_format' => 'id',
                    'post_type' => array (
                        0 => 'measure',
                    ),
                    'taxonomy' => array (
                        0 => 'all',
                    ),
                    'filters' => array (
                        0 => 'search',
                    ),
                    'result_elements' => array (
                        0 => 'post_type',
                        1 => 'post_title',
                    ),
                    'max' => '',
                )
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'national_grant',
                        'order_no' => 0,
                        'group_no' => 0,
                    ),
                ),
            ),
            'options' => array (
                'position' => 'normal',
                'layout' => 'no_box',
                'hide_on_screen' => array (
                    0 => 'slug',
                ),
            ),
            'menu_order' => 0,
        ));
    }
}
