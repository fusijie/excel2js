'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

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
        'update-excel' (event, localExcelDir) {
            let excelDir = Path.join(Editor.projectPath, localExcelDir);
            if (!Fs.existsSync(excelDir)) {
                Fs.mkdirSync(excelDir);
            }
            let excelArr = Fs.readdirSync(excelDir);
            if (event.reply) {
                event.reply(null, excelArr);
            }
        },
        'convert-json'(event, excelData) {
            if (Array.isArray(excelData)) {
                
            } else {
                
            }
            if (event.reply) {
                event.reply(null);
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