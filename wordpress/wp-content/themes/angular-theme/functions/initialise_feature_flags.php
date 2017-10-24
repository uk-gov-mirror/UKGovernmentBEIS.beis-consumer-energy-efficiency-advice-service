<?php

add_action('init', 'create_feature_flag_posttype');
add_action('init', 'setup_feature_flag_acf_group');
// Disable the quick-edit link to prevent users editing the slug for a question
add_filter( 'post_row_actions', 'disable_quick_edit_for_feature_flags', 10, 2 );

function create_feature_flag_posttype() {

    register_post_type( 'feature_flag',
        array(
            'labels'                => array(
                'name' => __( 'Feature Flags' ),
                'singular_name' => __( 'Feature Flag' )
            ),
            'description'           => 'Switch features on or off in the app',
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-flag',
            'menu_position'         => 5,
            'supports'              => array('title', 'revisions')
        ));

}

function setup_feature_flag_acf_group() {

    if(function_exists("register_field_group"))
    {
        register_field_group(array (
            'id' => 'acf_feature-flag',
            'title' => 'Feature flag',
            'fields' => array (
                array (
                    'key' => 'field_59eda3ae5b0b2',
                    'label' => 'Enabled',
                    'name' => 'enabled',
                    'type' => 'true_false',
                    'message' => '',
                    'default_value' => 0,
                ),
            ),
            'location' => array (
                array (
                    array (
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'feature_flag',
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

function disable_quick_edit_for_feature_flags($actions = array(), $post = null ) {

    // Abort if the post type is not "question"
    global $current_screen;
    if ( $current_screen->post_type != 'feature_flag' ) {
        return $actions;
    }

    if ( isset( $actions['inline hide-if-no-js'] ) ) {
        unset( $actions['inline hide-if-no-js'] );
        unset( $actions['trash'] );
    }

    return $actions;
}