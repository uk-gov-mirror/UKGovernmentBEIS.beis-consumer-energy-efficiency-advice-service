<?php

// Wordpress pages have URL paths like '/grandparent/parent/slug'. We want to preserve these paths
// in our Angular app (rather than just using '/slug'),  to ensure consistency between URLs for
// Angular and non-Angular pages (and for SEO).
// But Angular can't easily match routes like the above with an arbitrary depth of hierarchy nesting.
// So we need to limit the depth of hierarchy which can be created in the Wordpress admin UI.
// We currently have routing for ':slug' and ':section/:slug' i.e. up to one level of nesting.
// If we want to allow higher levels of nesting then we will need to add new routes to match them.
function limit_page_hierarchy_depth($args) {
    global $post_type_object;

    if ( $post_type_object->name == 'page') {
        $args['depth'] = 1;
    }
    return $args;
}
add_filter('page_attributes_dropdown_pages_args','limit_page_hierarchy_depth');
add_filter('quick_edit_dropdown_pages_args', 'limit_page_hierarchy_depth');