<?php

// TODO:BEIS-163 add required auth to visit this server, HTTP BASIC over HTTPS
// should probably suffice. Enforce HTTPS access.
// Share that secret with the user-site.

get_header();

// Previously, the user site was hosted directly by Wordpress, and we emitted
// the dist/index.html file here.
//
// Now the user site is hosted by the `user-site-server` Java app, and this
// Wordpress install exists just to host the admin interface.
// To avoid confusion, we redirect visitors to the admin UI.
//
// Other pages might still work if you deeplink to them, but that doesn't matter.

header('Location: /wp-admin/', true);

?>

<h1>BEIS DCEAS Admin Site</h1>

<p>This server is the admin interface for the BEIS DCEAS website.</p>

<p>You will now be redirected to <a href="/wp-admin/">/wp-admin/</a></p>
