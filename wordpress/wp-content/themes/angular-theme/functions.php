<?php

require_once("functions/initialise_page_post_type.php");
require_once("functions/initialise_question_post_type.php");
require_once("functions/initialise_local_authority_post_type.php");
require_once("functions/initialise_boiler_post_type.php");
require_once("functions/initialise_income_thresholds.php");
require_once("functions/initialise_local_grant_post_type.php");
require_once("functions/initialise_national_grant_post_type.php");
require_once("functions/initialise_measure_post_type.php");
require_once("functions/initialise_supplier_post_type.php");
require_once("functions/configure_api_caching.php");
require_once("functions/hide_admin_bar.php");
require_once("functions/hide_post_type_posts.php");
require_once("functions/acf_image.php");
require_once("functions/acf_wysiwyg.php");
require_once("functions/filter_article_pages.php");
require_once("functions/add_beis_editor_button.php");
require_once("functions/add_youtube_video.php");

require_once("functions/migrations/201910041427_set_up_roles_capabilities_and_users_for_local_authorities.php");
require_once("functions/migrations/201910161319_add_example_postcodes_to_local_authorities.php");
