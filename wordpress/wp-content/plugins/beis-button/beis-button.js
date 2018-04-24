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
                            `<a class="beis-button" href="${e.data.url}" ${e.data.new_tab ? 'target="_blank"' : ''}>
                                <span class="beis-button-text">${e.data.text}</span>
                                <span class="beis-button-icon-container">
                                    <span class="beis-button-icon">&gt;</span>
                                </span>
                            </a>`
                        );
                    }
                });
            }
        });
    });
})();