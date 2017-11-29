<?php

add_action( 'init', 'create_measure_post_type' );
add_action( 'init', 'setup_measure_acf_group');

// Disable the quick-edit link to prevent users editing the slug for a measure
add_filter( 'post_row_actions', disable_quick_edit_for('measure'), 10, 2 );

function create_measure_post_type() {

    register_post_type('measure',
        array(
            'labels'                => array(
                'name' => __( 'Measures' ),
                'singular_name' => __( 'Measure' )
            ),
            'description'           => 'Energy saving measures',
            'exclude_from_search'   => true,
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
                    'maxlength' => '10',
                ),
                array (
                    'key' => 'field_5a16a8934e7c5',
                    'label' => 'Advantages',
                    'name' => 'advantages',
                    'type' => 'textarea',
                    'instructions' => 'A list of benefits/advantages to be displayed with this measures on the results page (enter one on each line, these will be displayed as a bulleted list)',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_59f9b923b1d33',
                    'label' => 'Featured page',
                    'name' => 'featured_page',
                    'type' => 'page_link',
                    'instructions' => 'The advice page to display when user clicks \'Read More\' for this recommendation',
                    'required' => 1,
                    'post_type' => array (
                        0 => 'page',
                    ),
                    'allow_null' => 0,
                    'multiple' => 0
                ),
                array (
                    'key' => 'field_59f9b9a2e3094',
                    'label' => 'Linked pages',
                    'name' => 'linked_pages',
                    'type' => 'relationship',
                    'instructions' => 'Other pages to suggest to users with this recommendation',
                    'required' => 0,
                    'return_format' => 'object',
                    'post_type' => array (
                        0 => 'page',
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
                        'tag_quick_win' => 'Quick win',
                        'tag_small_spend' => 'Small spend',
                        'tag_longer_term' => 'Longer term'
                    ),
                    'default_value' => '',
                    'layout' => 'vertical',
                )
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