<?php

// TODO: add custom capability

function create_question_posttype() {

    register_post_type( 'question',
        array(
            'labels'                => array(
                                        'name' => __( 'Questions' ),
                                        'singular_name' => __( 'Question' )
                                    ),
            'description'           => 'Metadata for a question appearing in the questionnaire',
            'exclude_from_search'   => true,
            'publicly_queryable'    => false,
            'show_in_nav_menus'     => false,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-editor-help',
            'menu_position'         => 5,
            'supports'              => array('title', 'author', 'revisions')
        ));
}

function setup_question_acf_group() {

    if(function_exists("register_field_group"))
    {
        register_field_group(array (
            'id' => 'acf_question-metadata',
            'title' => 'Question metadata',
            'fields' => array (
                array (
                    'key' => 'field_59e876b298f38',
                    'label' => 'Question Heading',
                    'name' => 'questionHeading',
                    'type' => 'text',
                    'instructions' => 'This heading will be displayed above the question',
                    'required' => 1,
                    'default_value' => '',
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
                        'value' => 'question',
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

add_action( 'init', 'create_question_posttype' );
add_action( 'acf/init', 'setup_question_acf_group');