<?php

add_action( 'init', 'create_measure_post_type' );
add_action( 'init', 'setup_measure_acf_group');

// Disable the quick-edit link to prevent users editing the slug for a measure
add_filter( 'post_row_actions', disable_quick_edit_for('measure'), 10, 2 );

// Add slug to returned ACF fields
add_filter('acf/rest_api/measure/get_items', 'add_slug');

function create_measure_post_type() {

    register_post_type('measure',
        array(
            'labels'                => array(
                'name' => __( 'Measures' ),
                'singular_name' => __( 'Measure' )
            ),
            'description'           => 'Energy saving measures',
            'exclude_from_search'   => false,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-carrot',
            'menu_position'         => 5,
            'supports'              => array('title', 'revisions')
        ));
}

function setup_measure_acf_group() {

    if(function_exists("acf_add_local_field_group"))
    {
        acf_add_local_field_group(array (
            'id' => 'acf_measure',
            'title' => 'Measures',
            'fields' => array (
                array (
                    'key' => 'field_5a1c53bca14f4',
                    'label' => 'Basic Details',
                    'name' => 'basic_details_tab',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_59f9e731d5484',
                    'label' => 'Headline',
                    'name' => 'headline',
                    'type' => 'text',
                    'instructions' => 'Headline to appear on results page',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '60',
                ),
                array (
                    'key' => 'field_5a017965a124f',
                    'label' => 'Summary',
                    'name' => 'summary',
                    'type' => 'text',
                    'instructions' => 'A short summary of this measure',
                    'required' => 1,
                    'default_value' => 'No description available',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_59faebb37036d',
                    'label' => 'Measure Code',
                    'name' => 'measure_code',
                    'type' => 'text',
                    'instructions' => 'Identifying code as per BRE API response (RdSAP code e.g. "A2" for Loft Insulation, or custom code e.g. one_degree_reduction)',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '127',
                ),
                array(
                    'key' => 'field_5a211dcaac12b',
                    'label' => 'Advantages',
                    'name' => 'advantages',
                    'instructions' => 'A list of benefits/advantages to be displayed with this measure on the results page (enter one on each line, these will be displayed as a bulleted list)',
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
                    'key' => 'field_5a1c53f320255',
                    'label' => 'Tags',
                    'name' => 'tags_tab',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_5a1c544fb4da4',
                    'label' => 'Tags',
                    'name' => 'tags',
                    'instructions' => 'Tags to be displayed with this measure on the results page',
                    'type' => 'checkbox',
                    'choices' => array (
                        // When adding new tags here, avoid using special characters as it may break
                        // the filtering. See filter_article_pages.php.
                        'tag_quick_win' => 'Quick win',
                        'tag_small_spend' => 'Small spend',
                        'tag_longer_term' => 'Longer term',
                        'tag_simple_saving' => 'Simple Saving',
                        'tag_heating&hot-water' => 'Heating & Hotwater',
                        'tag_windows&doors' => 'Windows & Doors',
                        'tag_floors-walls&roofs' => 'Floors, Walls & Roofs',
                        'tag_solar-energy' => 'Solar Energy',
                        'tag_reduce_bills' => 'Reduce your bills',
                        'tag_make_home_warmer' => 'Make your home warmer',
                        'tag_make_home_greener' => 'Make your home greener',
                        'tag_home_improvements' => 'Home improvements',
                    ),
                    'default_value' => '',
                    'layout' => 'vertical',
                ),
                array (
                    'key' => 'field_5a1d898311be4',
                    'label' => 'Steps',
                    'name' => 'steps_tab',
                    'type' => 'tab',
                ),
                array(
                    'key' => 'field_5a1d876487aa8',
                    'label' => 'Steps',
                    'name' => 'steps',
                    'type' => 'repeater',
                    'instructions' => 'Steps to display for this measure in \'Your Plan\' section',
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
                            'key' => 'field_5a1d878487aa9',
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
                            'key' => 'field_5a1d88ae8eb37',
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
                            'key' => 'field_5a9d54bf2ea0a',
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
                            'key' => 'field_5a1d890a050cb',
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
                                    'key' => 'field_5a1d8a0b2d97e',
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
                        'value' => 'measure',
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