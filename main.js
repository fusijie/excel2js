'use strict';

module.exports = {
    load() {
        console.log('package loaded');
    },

    unload() {
        console.log('package unload');
    },

    messages: {
        'open' () {
            Editor.Panel.open('excel2json');
        },
        'say-hello'(event, ...args) {
            Editor.log(args);
            Editor.Ipc.sendToPanel('excel2json', 'greeting', 'How are you?', (error, answer) => {
                Editor.log(answer);
            });
        },
        'scene:saved'(event) {
            Editor.log('scene saved!');
        },
        'asset-db:asset-changed'() {
            Editor.log('asset-changed!');
        }
    },
};