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
                    'type' => 'textarea',
                    'instructions' => 'A short description of the grant',
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                    'rows' => '',
                    'new_lines' => 'br',
                ),
                array(
                    'key' => 'field_5ae99e3a10866',
                    'label' => 'Eligibility Criteria',
                    'name' => 'eligibility_criteria',
                    'type' => 'textarea',
                    'instructions' => 'The criteria which needs to be met for the user to be eligible for this grant',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '',
                    'maxlength' => '',
                    'rows' => '',
                    'new_lines' => 'br',
                ),
                array(
                    'key' => 'field_5ae99e7c10867',
                    'label' => 'Phone Number',
                    'name' => 'phone_number',
                    'type' => 'text',
                    'instructions' => 'A phone number to display to the users to find out more/apply for the grant',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'maxlength' => '',
                ),
                array(
                    'key' => 'field_5ae99eb010868',
                    'label' => 'Website URL',
                    'name' => 'website_url',
                    'type' => 'url',
                    'instructions' => 'URL to send the user to find out more about the grant',
                    'required' => 0,
                    'default_value' => '',
                    'placeholder' => '',
                ),
                array(
                    'key' => 'field_5ae99ed510869',
                    'label' => 'End Date',
                    'name' => 'end_date',
                    'type' => 'date_picker',
                    'instructions' =>
                        'The date at which this grant expires. This is to stop stale information being displayed to the user.<br />' .
                        'Note that if this is not set, the grant will not be shown',
                    'required' => 1,
                    'display_format' => 'd/m/Y',
                    'return_format' => 'd/m/Y',
                    'first_day' => 1,
                ),
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'local_grant',
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
