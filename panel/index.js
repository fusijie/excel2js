'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

Editor.Panel.extend({
    style: Fs.readFileSync(
        Editor.url("packages://excel2json/panel/index.css"),
        "utf-8"
    ),

    template: Fs.readFileSync(
        Editor.url("packages://excel2json/panel/index.html"),
        "utf-8"
    ),

    $: {
        btn_update_excel: '#btn-update-excel',
    },

    ready() {
        this.$btn_update_excel.addEventListener('confirm', () => {
            Editor.Ipc.sendToMain('excel2json:update-excel', (err, data) => {
                if (err) {
                    Editor.log(err);
                    return;
                }
                Editor.log(data);
            });
        });
    },

    messages: {
        'greeting' (event, question) {
            Editor.log(question);
            if (event.reply) {
                //if no error, the first argument should be null
                event.reply(null, 'Fine, thank you!');
            }
        }
    }
});