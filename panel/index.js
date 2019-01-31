'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

Editor.Panel.extend({
    style: Fs.readFileSync(
        Editor.url('packages://excel2json/panel/index.css'),
        'utf-8'
    ),

    template: Fs.readFileSync(
        Editor.url('packages://excel2json/panel/index.html'),
        'utf-8'
    ),

    $: {},

    ready() {
        let v = new window.Vue({
            el: this.shadowRoot,
            data: {
                txtUpdate: '点击更新Excel',
                txtConvert: '全部生成Json',
                txtConvertOne: '生成',
                txtNoExcel: '没有找到Excel',
                items: [
                ]
            },
            methods: {
                onClickUpdate() {
                    let localExcelDir = 'excel';
                    Editor.Ipc.sendToMain('excel2json:update-excel', localExcelDir, (err, data) => {
                        if (err) {
                            Editor.log(err);
                            return;
                        }
                        this.items = [];

                        for (let i = 0; i < data.length; i++) {
                            if (Path.extname(data[i]) !== '.xlsx') {
                                continue;
                            }
                            if (data[i].indexOf('~') === 0) {
                                continue;
                            }
                            this.items.push({
                                message: data[i]//Path.join(Editor.projectInfo.path, localExcelDir, data[i])
                            });
                        }
                    });
                },

                onClickConvert() {
                    Editor.Ipc.sendToMain('excel2json:convert-json', this.items, (err, data) => {
                        if (err) {
                            Editor.log(err);
                            return;
                        }
                        Editor.log('Convert');
                    });
                },

                onClickConvertOne(index) {
                    Editor.Ipc.sendToMain('excel2json:convert-json', this.items[index], (err, data) => {
                        if (err) {
                            Editor.log(err);
                            return;
                        }
                        Editor.log('Convert ', index);
                    });
                }
            },
        });

        v.onClickUpdate();
    },

    messages: {
        'greeting'(event, question) {
            Editor.log(question);
            if (event.reply) {
                //if no error, the first argument should be null
                event.reply(null, 'Fine, thank you!');
            }
        }
    },
});