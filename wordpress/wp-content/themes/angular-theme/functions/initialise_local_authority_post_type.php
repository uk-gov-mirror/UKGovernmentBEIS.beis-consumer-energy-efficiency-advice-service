<?php

add_action( 'init', 'create_local_authority_post_type' );
add_action( 'init', 'setup_local_authority_acf_group');

function create_local_authority_post_type() {

    register_post_type('local_authority',
        array(
            'labels'                => array(
                'name' => __( 'Local Authorities' ),
                'singular_name' => __( 'Local Authority' )
            ),
            'description'           => 'Local Authority codes and grants',
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-location',
            'menu_position'         => 5,
            'supports'              => array('title', 'revisions')
        ));
}

function setup_local_authority_acf_group() {

    if(function_exists("register_field_group"))
    {
        register_field_group(array (
            'id' => 'acf_local-authority',
            'title' => 'Local Authority',
            'fields' => array (
                array (
                    'key' => 'field_59f05fb38853b',
                    'label' => 'Basic Details',
                    'name' => 'basic_details_tab',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_59ef61ef48e99',
                    'label' => 'Local Authority Code',
                    'name' => 'local_authority_code',
                    'type' => 'text',
                    'instructions' => 'ONS (GSS) code for the Local Authority, e.g. E09000033',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_59f05f32da262',
                    'label' => 'Display Name',
                    'name' => 'display_name',
                    'type' => 'text',
                    'instructions' => 'Name to be displayed in the web app, e.g. Westminster',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a0b225fd70a1',
                    'label' => 'Grants',
                    'name' => 'grants_tab',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_5a0b228576432',
                    'label' => 'Do you operate Flexible Eligibility for the Energy Company Obligation scheme (ECO Flex)?',
                    'name' => 'is_eco_flex_active',
                    'type' => 'true_false',
                    'instructions' => '',
                    'required' => 1
                ),
                array (
                    'key' => 'field_5a0b2353b4282',
                    'label' => 'Link to further information on ECO Flex',
                    'name' => 'eco_flex_further_info_link',
                    'type' => 'text',
                    'instructions' => '',
                    'conditional_logic' => array (
                        'status' => 1,
                        'rules' => array (
                            array (
                                'field' => 'field_5a0b228576432',
                                'operator' => '==',
                                'value' => '1',
                            ),
                        ),
                        'allorany' => 'all',
                    ),
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => ''
                ),
                array (
                    'key' => 'field_59f0c4fe301b6',
                    'label' => 'Grants',
                    'name' => 'grants',
                    'type' => 'relationship',
                    'instructions' => 'The grants which are available in the local authority',
                    'required' => 1,
                    'return_format' => 'id',
                    'post_type' => array (
                        0 => 'grant',
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
                        'value' => 'local_authority',
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