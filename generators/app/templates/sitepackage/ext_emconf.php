<?php

/**
 * Extension Manager/Repository config file for ext "<%= nameLabel %>".
 */
$EM_CONF[$_EXTKEY] = [
    'title' => '<%= sitepackageFolder %>',
    'description' => '<%= description %>',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '<%= emconfTypo3Version %>',
            'fluid_styled_content' => '<%= emconfTypo3Version %>'
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            '<%= sitepackageVendor %>\\<%= sitepackageName %>\\' => 'Classes'
        ],
    ],
    'state' => 'stable',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => '<%= authorName %>',
    'author_email' => '<%= authorEmail %>',
    'author_company' => '<%= company %>',
    'version' => '1.0.0',
];
