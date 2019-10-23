<?php

add_action( 'init', 'add_eco_self_referral_questions' );

function add_eco_self_referral_questions() {

    if (get_option('migration/201910231103_add_eco_self_referral_questions') == 'done') {
        return;
    };

    $questions = array(
        'Contact Details'   => 'What are your contact details?',
        'Has Loft'          => 'Do you have a loft?',
        'Loft Insulation'   => 'Does your loft already have insulation?',
        'Loft Clutter'      => 'Is your loft easily accessible and clear of clutter?',
        'Loft Infestation'  => 'Does your loft have a history of infestation?',
        'Loft Water Damage' => 'Does your loft have a history of water damage?'
    );

    foreach ($questions as $post_title => $question_heading) {
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
                'questionHeading'           => $question_heading,
                'helpHtml'                  => '',
                'questionReason'            => '',
                'autoOpenQuestionReason'    => 0
            )
        ));
    }

    // Mark done.
    update_option('migration/201910231103_add_eco_self_referral_questions', 'done');
}