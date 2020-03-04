<?php

add_action( 'init', 'add_eco_self_referral_questions' );

function add_eco_self_referral_questions() {

    if (get_option('migration/201910231103_add_eco_self_referral_questions') == 'done') {
        return;
    }

    $loft_question_reason = 'Some companies may be able to provide loft insulation under the ECO scheme, depending on the state of the loft and any existing insulation.';

    $questions = array(
        'Contact Details'   => array(
            'question_heading'  => 'What are your contact details?',
            'question_reason'   => 'We may pass your contact details along to companies that can provide measures under the ECO scheme.'
        ),
        'Has Loft'          => array(
            'question_heading'  => 'Do you have a loft?',
            'question_reason'   => $loft_question_reason
        ),
        'Loft Insulation'   => array(
            'question_heading'  => 'Does your loft already have insulation?',
            'question_reason'   => $loft_question_reason
        ),
        'Loft Clutter'      => array(
            'question_heading'  => 'Is your loft easily accessible and clear of clutter?',
            'question_reason'   => $loft_question_reason
        ),
        'Loft Infestation'  => array(
            'question_heading'  => 'Does your loft have a history of infestation?',
            'question_reason'   => $loft_question_reason
        ),
        'Loft Water Damage' => array(
            'question_heading'  => 'Does your loft have a history of water damage?',
            'question_reason'   => $loft_question_reason
        ),
        'Wall Type'         => array(
            'question_heading'  => 'What type of walls does your property have?',
            'question_reason'   => 'Some companies may be able to provide wall insulation under the ECO scheme.')
        );

    foreach ($questions as $post_title => $metadata) {
        $post_name = sanitize_title_with_dashes($post_title);
        $existing_questions = get_posts(array(
            'name'          => $post_name,
            'post_type'     => 'question',
            'post_status'   => 'publish'
        ));
        if (!empty($existing_questions)) {
            // Do not overwrite existing questions.
            continue;
        }
        wp_insert_post(array(
            'post_title'    => $post_title,
            'post_name'     => $post_name,
            'post_type'     => 'question',
            'post_status'   => 'publish',
            'meta_input'    => array(
                'questionHeading'           => $metadata['question_heading'],
                'helpHtml'                  => '',
                'questionReason'            => $metadata['question_reason'],
                'autoOpenQuestionReason'    => '0'
            )
        ));
    }

    // Mark done.
    update_option('migration/201910231103_add_eco_self_referral_questions', 'done');
}