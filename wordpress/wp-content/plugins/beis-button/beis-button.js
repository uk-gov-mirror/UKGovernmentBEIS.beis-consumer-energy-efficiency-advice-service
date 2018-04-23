(function() {
    tinymce.PluginManager.add('beis_button', function( editor, url ) {
        editor.addButton( 'beis_button', {
            text: 'BEIS Button',
            icon: false,
            onclick: function () {
                editor.windowManager.open({
                    title: 'Insert BEIS button',
                    body: [{
                        type: 'textbox',
                        name: 'text',
                        label: 'Button text'
                    },
                        {
                            type: 'textbox',
                            name: 'url',
                            label: 'Button url'
                        },
                        {
                            type: 'checkbox',
                            name: 'new_tab',
                            label: 'Open in new tab?'
                        }],
                    onsubmit: function (e) {
                        editor.insertContent(
                            `<div class="beis-button">
                                <a href="${e.data.url}" ${e.data.new_tab ? 'target="_blank"' : ''}>
                                    ${e.data.text}
                                </a>
                            </div>`
                        );
                    }
                });
            }
        });
    });
})();