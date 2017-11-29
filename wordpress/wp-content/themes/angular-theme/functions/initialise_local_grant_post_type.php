<?php

add_action( 'init', 'create_local_authority_grant_post_type' );
add_action( 'init', 'setup_local_authority_grant_acf_group' );

function create_local_authority_grant_post_type() {

    register_post_type('local_grant',
        array(
            'labels'                => array(
                'name' => __( 'Local Authority Grants' ),
                'singular_name' => __( 'Local Authority Grant' )
            ),
            'description'           => 'Energy grants run by a Local Authority',
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

function setup_local_authority_grant_acf_group() {

    if(function_exists("acf_add_local_field_group"))
    {
        acf_add_local_field_group(array (
            'id' => 'acf_local_grant',
            'title' => 'Local Authority Grant',
            'fields' => array (
                array (
                    'key' => 'field_59f1e04695d2c',
                    'label' => 'Display name',
                    'name' => 'display_name',
                    'type' => 'text',
                    'instructions' => 'Name to be displayed in the web app, e.g. \'Gold grant\'',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_59f0c2758694e',
                    'label' => 'Description',
                    'name' => 'description',
                    'type' => 'text',
                    'instructions' => 'A short description of the grant',
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                )
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'grant',
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
