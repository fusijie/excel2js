'use strict';

Editor.Panel.extend({
    style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

    template: `
    <h2>更新Excel</h2>
    <ui-button id="btn-update-excel">更新</ui-button>
    <hr />
    <div>状态: <span id="label">--</span></div>
  `,

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