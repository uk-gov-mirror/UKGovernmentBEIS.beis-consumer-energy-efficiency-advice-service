<?php require_once('post_type_functions.php');

add_action( 'init', 'create_eco_supplier_post_type' );
add_action( 'init', 'setup_eco_supplier_acf_group');

// Disable the quick-edit link to prevent users editing the slug for an eco_supplier
add_filter( 'post_row_actions', disable_quick_edit_for('eco-supplier'), 10, 2 );

// Add slug to returned ACF fields
add_filter('acf/rest_api/eco-supplier/get_items', 'add_slug');

function create_eco_supplier_post_type() {

    register_post_type('eco-supplier',
        array(
            'labels'                => array(
                'name' => __( 'ECO Suppliers' ),
                'singular_name' => __( 'ECO Supplier' )
            ),
            'description'           => 'Energy suppliers participating in the Energy Company Obligation (ECO) scheme',
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-lightbulb',
            'menu_position'         => 5,
            'supports'              => array('title', 'revisions')
        ));
}

function setup_eco_supplier_acf_group() {

    if(function_exists("acf_add_local_field_group"))
    {
        acf_add_local_field_group(array (
            'id' => 'acf_eco_supplier',
            'title' => 'ECO Supplier',
            'fields' => array (
                array (
                    'key' => 'field_5a9577ec6836a',
                    'label' => 'Name',
                    'name' => 'name',
                    'type' => 'text',
                    'instructions' => 'A name for this energy supplier',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_5a9578756836c',
                    'label' => 'Supplier\'s website' ,
                    'name' => 'supplier_info_link',
                    'type' => 'text',
                    'instructions' => 'Link to ECO supplier\'s general website for information',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => ''
                ),
                // TODO:BEIS-197 apply no-upload-on-live-site fix here too...
                array(
                    'key' => 'field_5a1ecb4e53f99',
                    'label' => 'Logo Image',
                    'name' => 'logo_image',
                    'type' => 'image',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => 0,
                    'wrapper' => array(
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ),
                    'return_format' => 'array',
                    'preview_size' => 'thumbnail',
                    'library' => 'all',
                    'min_width' => '',
                    'min_height' => '',
                    'min_size' => '',
                    'max_width' => '',
                    'max_height' => '',
                    'max_size' => '',
                    'mime_types' => '',
                ),
            ),
            'options' => array (
                'position' => 'normal',
                'layout' => 'no_box'
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'eco-supplier',
                        'order_no' => 0,
                        'group_no' => 0,
                    ),
                ),
            ),
            'menu_order' => 0
        ));
    }
}