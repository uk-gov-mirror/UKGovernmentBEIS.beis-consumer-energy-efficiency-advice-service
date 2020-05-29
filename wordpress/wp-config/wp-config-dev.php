<?php
// Prevent file from being accessed directly
if (!defined('ABSPATH')) exit();

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
/** Note this is different to the production DB, which is just called `wordpress` */
define('DB_NAME', 'wordpressbeissea');

/** MySQL database username */
define('DB_USER', 'wordpress');

/** MySQL database password */
define('DB_PASSWORD', 'wordpressPassword123');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Wordpress keys for debug only */
define('AUTH_KEY',         'U@}efP+()f^7$Somxh>GOX945zIMU-!iU3%_XR};{:9hKH:|f?%nynR/BYn=M+8j');
define('SECURE_AUTH_KEY',  'My7lUZIzW&GJ+yFZPON^f?6`I1M[0v^qDFmrjJlzET<?)9+De^KBOFjl/Y.pKwS,');
define('LOGGED_IN_KEY',    '5BV$|+o]/RM wTS~!bP&uTbIFR<|-|?M-Vt!W:FXv0]-<rzry`GpP^s^H+Mzp7!a');
define('NONCE_KEY',        'kB/`:$N}gyxp2MSQGphKP`T-_b{-4_wS42`!YOZ2+.fh!b+Tj]V&ju;L,)nb+eZ_');
define('AUTH_SALT',        'S?Ro%r>voQ6/J2|8Zs$hcR;yu&6Q<]c5gtW_PwSXdpCh|,oyWs:+.N>nB6*)%TdG');
define('SECURE_AUTH_SALT', 'nJL7{0C{LfmNe+%_A+(} ?g73TK;JER^760DJTsMw7ml arc!t JX#X^Y^z;,nPA');
define('LOGGED_IN_SALT',   'I?1jogm[rSl+W?g!3r|QAH@lt@9XBo:C?t}EYuMw&P|1Mg/L,`F-MF+Bvi=u>0/t');
define('NONCE_SALT',       'PQ|-9%|j-.=,eZ)=iw|T#+RgYG56?V1*%cabJLp>x|Huk;z e;.GWT)rAyhdW4sU');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
//Enable WP_DEBUG mode
define('WP_DEBUG', true);
