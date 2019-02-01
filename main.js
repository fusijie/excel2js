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
        'update-excel' (event) {
            let excelDir = Path.join(Editor.projectPath, "excel");
            if (!Fs.existsSync(excelDir)) {
                Fs.mkdirSync(excelDir);
            }
            let excelArr = Fs.readdirSync(excelDir);
            if (event.reply) {
                event.reply(null, excelArr);
            }
        },
        'convert-json'(event, excelFileName) {
            if (Array.isArray(excelFileName)) {
                for (let i = 0; i < excelFileName.length; i++) {
                    this.convertJson(excelFileName[i]);
                }
            } else {
                this.convertJson(excelFileName);
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

    convertJson(excelFileName) {
        let xlsx = Editor.require("packages://excel2json/node_modules/xlsx");
        let excelName = Path.join(Editor.projectPath, "excel", excelFileName);
        Editor.log(excelName);
    }
};