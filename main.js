'use strict';

module.exports = {
    load() {
        console.log('excel2json package loaded');
    },

    unload() {
        console.log('excel2json package unload');
    },

    messages: {
        'open' () {
            Editor.Panel.open('excel2json');
        },
        'update-excel'(event, ...args) {
            if (event.reply) {
                event.reply(null, 'Fine, thank you!');
            }
        },
        'scene:saved'(event) {
            Editor.log('scene saved!');
        },
        'asset-db:asset-changed'() {
            Editor.log('asset-changed!');
        }
    },
};