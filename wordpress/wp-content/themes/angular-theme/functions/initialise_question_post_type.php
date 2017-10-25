<?php include 'disable_quick_edit.php';

add_action( 'init', 'create_question_posttype' );
add_action( 'init', 'setup_question_acf_group');
// Disable the quick-edit link to prevent users editing the slug for a question
add_filter( 'post_row_actions', disable_quick_edit_for('question'), 10, 2 );

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
            'supports'              => array('title', 'revisions')
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
                    'key' => 'field_59e8be23eda3e',
                    'label' => 'Question Heading',
                    'name' => 'questionHeading',
                    'instructions' => 'Appears at the top of the question page in the questionnaire (e.g. "What\'s your postcode?")',
                    'type' => 'text',
                    'required' => 1,
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                ),
                array (
                    'key' => 'field_59e8cfc09ab2a',
                    'label' => 'Help Text',
                    'name' => 'helpText',
                    'type' => 'text',
                    'instructions' => 'Optional hint to user',
                    'default_value' => '',
                    'placeholder' => '',
                    'prepend' => '',
                    'append' => '',
                    'formatting' => 'html',
                    'maxlength' => '',
                )
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
                    0 => 'slug'
                ),
            ),
            'menu_order' => 0,
        ));
    }
}

