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

    if(function_exists("acf_add_local_field_group"))
    {
        acf_add_local_field_group(array (
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
                    'type' => 'text',
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
                    'key' => 'field_5a130423bd41e',
                    'label' => 'Link to measures?',
                    'name' => 'link_to_measures',
                    'type' => 'true_false',
                    'instructions' => 'Can this grant be used to fund specific recommended home improvement measures?',
                    'default_value' => ''
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
                    'conditional_logic' => array (
                        'status' => 1,
                        'rules' => array (
                            array (
                                'field' => 'field_5a130423bd41e',
                                'operator' => '==',
                                'value' => '1',
                            ),
                        ),
                        'allorany' => 'all',
                    )
                ),
                array (
                    'key' => 'field_5a13037c70fa5',
                    'label' => 'Display without matching measures?',
                    'name' => 'display_without_measures',
                    'type' => 'true_false',
                    'instructions' => 'Should this grant be included as a standalone recommendation on the results page without any matching measures?',
                    'default_value' => ''
                ),
                array (
                    'key' => 'field_5a16a911c5cea',
                    'label' => 'Advantages',
                    'name' => 'advantages',
                    'type' => 'textarea',
                    'instructions' => 'A list of benefits/advantages to be displayed with this recommendation on the results page (enter one on each line, these will be displayed as a bulleted list)',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                    'conditional_logic' => array (
                        'status' => 1,
                        'rules' => array (
                            array (
                                'field' => 'field_5a13037c70fa5',
                                'operator' => '==',
                                'value' => '1',
                            ),
                        ),
                        'allorany' => 'all',
                    )
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
