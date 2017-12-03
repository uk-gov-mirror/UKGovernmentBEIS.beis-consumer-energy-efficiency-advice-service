<?php require_once('post_type_functions.php');

add_action('init', 'create_income_threshold_post_type');
add_action('init', 'setup_income_thresholds_acf_group');

// Disable the quick-edit link to prevent users editing the slug
add_filter('post_row_actions', disable_quick_edit_for('income_threshold'), 10, 2);

// Add slug to returned ACF fields
add_filter('acf/rest_api/income_threshold/get_items', 'add_slug');

function create_income_threshold_post_type()
{
    register_post_type('income_threshold',
        array(
            'labels' => array(
                'name' => __('Income Thresholds'),
                'singular_name' => __('Income Thresholds')
            ),
            'description' => 'Income thresholds to be used when determining eligibility for energy grants',
            'exclude_from_search' => true,
            'publicly_queryable' => false,
            'show_in_nav_menus' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-chart-line',
            'menu_position' => 5,
            'supports' => array('title', 'revisions')
        ));
}

function setup_income_thresholds_acf_group()
{
    if(function_exists("acf_add_local_field_group"))
    {
        acf_add_local_field_group(array (
            'id' => 'acf_income-thresholds',
            'title' => 'Income Thresholds',
            'fields' => array (
                array (
                    'key' => 'field_5a0af6cb156b8',
                    'label' => 'Single claim',
                    'name' => '',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_5a0af7d5156b9',
                    'label' => 'No children',
                    'name' => 'single_claim_zero_children',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0af84e156be',
                    'label' => '1 child',
                    'name' => 'single_claim_one_child',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0af81c156bd',
                    'label' => '2 children',
                    'name' => 'single_claim_two_children',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0af81c156bc',
                    'label' => '3 children',
                    'name' => 'single_claim_three_children',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0af81b156bb',
                    'label' => '4 or more children',
                    'name' => 'single_claim_four_plus_children',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0afa53033b2',
                    'label' => 'Joint claim',
                    'name' => '',
                    'type' => 'tab',
                ),
                array (
                    'key' => 'field_5a0afa91033b4',
                    'label' => 'No children',
                    'name' => 'joint_claim_zero_children',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0afa68033b3',
                    'label' => '1 child',
                    'name' => 'joint_claim_one_child',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0afab3effb1',
                    'label' => '2 children ',
                    'name' => 'joint_claim_two_children',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0afacceffb2',
                    'label' => '3 children',
                    'name' => 'joint_claim_three_children',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
                array (
                    'key' => 'field_5a0afad9effb3',
                    'label' => '4 or more children',
                    'name' => 'joint_claim_four_plus_children',
                    'type' => 'number',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '£',
                    'append' => '',
                    'min' => '',
                    'max' => '',
                    'step' => 50,
                ),
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'income_threshold',
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