<?php

add_action( 'init', 'create_measure_tag_post_type' );

function create_measure_tag_post_type() {

    register_post_type('measure_tag',
        array(
            'labels'                => array(
                'name' => __( 'Measure Tags' ),
                'singular_name' => __( 'Measure Tag' )
            ),
            'description'           => 'Tags for energy saving measures (e.g. "Quick win"',
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