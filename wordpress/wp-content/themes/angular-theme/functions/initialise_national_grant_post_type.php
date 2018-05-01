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
                    'key' => 'field_5a1d95eace899',
                    'label' => 'Basic Details',
                    'name' => 'basic_details_tab',
                    'type' => 'tab',
                ),
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
                    'instructions' => 'Can this grant be used to fund specific recommended home improvement measures? (Does not include whether the grant could involve a recurring payment for a measure - this is calculated separately in the app)',
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
                    'instructions' =>
                        'Should this grant be included as a standalone recommendation on the results page without any matching measures?<br/>' .
                        '(You should tick either this option or "Link to measures?" above, otherwise the grant will never be shown<br/>' .
                        '(Except for FIT or RHI which are returned by BRE in the energy-calculation API.))',
                        // (See grant-elegibility.service.ts, where a couple of grants are hardcoded that BRE
                        // might return).
                    'default_value' => ''
                ),
                array(
                    'key' => 'field_5ae88bd1f488f',
                    'label' => 'Find out more link',
                    'name' => 'find_out_more_link',
                    'type' => 'text',
                    'instructions' =>
                        '(Optional) <strong>Relative</strong> link that the user can follow to learn more about the grant e.g. /pages/energy-company-obligation <br/>' .
                        'This link will be attached to "Find out more >" when this grant is attached to a measure',
                    'required' => 0,
                    'default_value' => '',
                ),
                array(
                    'key' => 'field_5a16a911c5cea',
                    'label' => 'Advantages',
                    'name' => 'advantages',
                    'instructions' => 'A list of benefits/advantages to be displayed with this grant on the results page (enter one on each line, these will be displayed as a bulleted list)',
                    'type' => 'repeater',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'collapsed' => '',
                    'min' => 0,
                    'max' => 0,
                    'layout' => 'table',
                    'button_label' => '',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_5a211dd5ac12c',
                            'label' => 'Advantage',
                            'name' => 'advantage',
                            'type' => 'text',
                            'instructions' => '',
                            'required' => 0,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'placeholder' => '',
                            'prepend' => '',
                            'append' => '',
                            'maxlength' => '',
                        ),
                    ),
                ),
                array (
                    'key' => 'field_5a1d95f734426',
                    'label' => 'Steps',
                    'name' => 'steps_tab',
                    'type' => 'tab',
                ),
                array(
                    'key' => 'field_5a1d95ff516b4',
                    'label' => 'Steps',
                    'name' => 'steps',
                    'type' => 'repeater',
                    'instructions' => 'Steps to display for this grant in \'Your Plan\' section',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'collapsed' => '',
                    'min' => 0,
                    'max' => 0,
                    'layout' => 'table',
                    'button_label' => '',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_5a1d960b0ca19',
                            'label' => 'Headline',
                            'name' => 'headline',
                            'type' => 'text',
                            'instructions' => '',
                            'required' => 0,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'placeholder' => '',
                            'prepend' => '',
                            'append' => '',
                            'maxlength' => '',
                        ),
                        array(
                            'key' => 'field_5a1d961060dd4',
                            'label' => 'Description',
                            'name' => 'description',
                            'type' => 'text',
                            'instructions' => '',
                            'required' => 0,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'placeholder' => '',
                            'prepend' => '',
                            'append' => '',
                            'maxlength' => '',
                        ),
                        array(
                            'key' => 'field_5a9d5803dc7d1',
                            'label' => 'Read more',
                            'name' => 'read_more',
                            'type' => 'textarea',
                            'instructions' => 'Shows in a collapsed "read more" section',
                            'required' => 0,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'default_value' => '',
                            'placeholder' => '',
                            'maxlength' => '',
                            'new_lines' => 'br',
                        ),
                        array(
                            'key' => 'field_5a1d961873764',
                            'label' => 'More info links',
                            'name' => 'more_info_links',
                            'type' => 'repeater',
                            'instructions' => 'If you want to link to a page within the site, use a relative URL like
                             "/installer-search/measure-code", otherwise you can give the absolute URL of the site 
                             like http://google.co.uk',
                            'required' => 0,
                            'conditional_logic' => 0,
                            'wrapper' => array(
                                'width' => '',
                                'class' => '',
                                'id' => '',
                            ),
                            'collapsed' => '',
                            'min' => 0,
                            'max' => 0,
                            'layout' => 'table',
                            'button_label' => '',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_5a1d961e90e5f',
                                    'label' => 'Button text',
                                    'name' => 'button_text',
                                    'type' => 'text',
                                    'instructions' => '',
                                    'required' => 0,
                                    'conditional_logic' => 0,
                                    'wrapper' => array(
                                        'width' => '',
                                        'class' => '',
                                        'id' => '',
                                    ),
                                    'default_value' => '',
                                    'placeholder' => '',
                                    'prepend' => '',
                                    'append' => '',
                                    'maxlength' => '',
                                ),
                                array(
                                    'key' => 'field_1234d9bfa97e7',
                                    'label' => 'Link url',
                                    'name' => 'link_url',
                                    'type' => 'text',
                                    'instructions' => '',
                                    'required' => 0,
                                    'wrapper' => array(
                                        'width' => '',
                                        'class' => '',
                                        'id' => '',
                                    ),
                                    'default_value' => '',
                                    'placeholder' => '',
                                ),
                            ),
                        ),
                    ),
                ),
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
