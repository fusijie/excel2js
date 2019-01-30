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
            let fs = require('fs');
            if (event.reply) {
                event.reply(null, 'update-excel');
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