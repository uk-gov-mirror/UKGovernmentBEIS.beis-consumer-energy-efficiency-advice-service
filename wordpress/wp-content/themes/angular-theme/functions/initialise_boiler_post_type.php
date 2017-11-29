<?php require_once('post_type_functions.php');

add_action( 'init', 'create_boiler_post_type' );
add_action( 'init', 'setup_boiler_acf_group');

// Disable the quick-edit link to prevent users editing the slug for a recommendation
add_filter( 'post_row_actions', disable_quick_edit_for('boiler'), 10, 2 );

// Add slug to returned ACF fields
add_filter('acf/rest_api/boiler/get_items', 'add_slug');

function create_boiler_post_type() {

    register_post_type('boiler',
        array(
            'labels'                => array(
                'name' => __( 'Boilers' ),
                'singular_name' => __( 'Boiler' )
            ),
            'description'           => 'Types of boiler',
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-palmtree',
            'menu_position'         => 5,
            'supports'              => array('title', 'revisions')
        ));
}

function setup_boiler_acf_group() {

    if(function_exists("register_field_group"))
    {
        register_field_group(array (
            'id' => 'acf_boiler-type',
            'title' => 'Boiler type',
            'fields' => array (
                array (
                    'key' => 'field_5a0c7d8f0f488',
                    'label' => 'Name',
                    'name' => 'name',
                    'type' => 'text',
                    'instructions' => 'A name for this type of boiler',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a0c7da80f489',
                    'label' => 'Description',
                    'name' => 'description',
                    'type' => 'text',
                    'instructions' => 'A short (1-2 sentences) description of this boiler type',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a13f38041082',
                    'label' => 'Space requirement',
                    'name' => 'space_requirement',
                    'type' => 'text',
                    'instructions' => 'A short (1 or 2 sentences) description of the space requirements for this boiler.',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a0c7db90f48a',
                    'label' => 'Installation cost lower bound',
                    'name' => 'installation_cost_lower_bound',
                    'type' => 'number',
                    'instructions' => 'A lower bound (in pounds) for the average installation cost of this boiler type',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => '',
                ),
                array (
                    'key' => 'field_5a0c7dd30f48b',
                    'label' => 'Installation cost upper bound',
                    'name' => 'installation_cost_upper_bound',
                    'type' => 'number',
                    'instructions' => 'An upper bound (in pounds) for the average installation cost of this boiler type',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => '',
                ),
                array (
                    'key' => 'field_5a0c7deb0f48c',
                    'label' => 'Lifetime',
                    'name' => 'lifetime',
                    'type' => 'number',
                    'instructions' => 'The average lifetime (in years) of this boiler type',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => '',
                ),
                array (
                    'key' => 'field_5a0c7e020f48d',
                    'label' => 'Running cost',
                    'name' => 'running_cost',
                    'type' => 'number',
                    'instructions' => 'The average running cost per year (in pounds) of this boiler type',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => '',
                ),
                array (
                    'key' => 'field_5a1bea6b57693',
                    'label' => 'Pros',
                    'name' => 'pros',
                    'type' => 'textarea',
                    'instructions' => 'Until we get the full version of ACF with repeater fields... Write your pros here as JSON in the following format:
	
	[
			{
					"heading": "Heading 1",
					"body": "Body 1"
			},
			{
					"heading": "Heading 2",
					"body": "Body 2"
			}
	]',
                    'required' => 1,
                    'default_value' => '[]',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'none',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a1beb6757694',
                    'label' => 'Cons',
                    'name' => 'cons',
                    'type' => 'textarea',
                    'instructions' => 'Until we get the full version of ACF with repeater fields... Write your cons here as JSON in the following format:
	
	[
			{
					"heading": "Heading 1",
					"body": "Body 1"
			},
			{
					"heading": "Heading 2",
					"body": "Body 2"
			}
	]',
                    'default_value' => '[]',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'boiler',
                        'order_no' => 0,
                        'group_no' => 0,
                    ),
                ),
            ),
            'options' => array (
                'position' => 'normal',
                'layout' => 'no_box',
                'hide_on_screen' => array (
                ),
            ),
            'menu_order' => 0,
        ));
    }
}