(function() {
    tinymce.PluginManager.add('youtube_video', function( editor, url ) {
        editor.addButton( 'youtube_video', {
            text: 'Youtube Video',
            icon: false,
            onclick: function () {
                editor.windowManager.open({
                    title: 'Insert YouTube Video',
                    body: [{
                            type: 'textbox',
                            name: 'video_id',
                            label: 'Video ID (The part of the URL after the "v=" on YouTube)'
                        }],
                    onsubmit: function (e) {
                        editor.insertContent(
                            `<iframe
                            src="https://www.youtube.com/embed/${e.data.video_id}?rel=0">
                            </iframe>`
                        );
                    }
                });
            }
        });
    });
})();