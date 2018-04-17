<?php

function disable_acf_image_upload($field)
{
    // Disable uploading images when not in a dev environment
    if (!WP_DEBUG) {
        $field['instructions'] = 'This is disabled in production. See BEISDEAS-197.';
        $field['mime_types'] = 'disabled-in-production';
    }
    return $field;
}

add_filter('acf/load_field/type=image', 'disable_acf_image_upload');

