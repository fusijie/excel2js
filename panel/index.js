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
        this.v = new window.Vue({
            el: this.shadowRoot,
            data: {
                txtUpdate: '点击更新Excel',
                txtConvert: '全部生成Json',
                txtConvertOne: '生成',
                txtNoExcel: '没有找到Excel',
                txtStatus: '',
                iconStatus: [
                    'icon-record',
                    'icon-ok',
                    'icon-cancel'
                ],
                items: [
                ]
            },
            methods: {
                onClickUpdate() {
                    Editor.Ipc.sendToMain('excel2json:update-excel', (err, data) => {
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
                            if (data[i].indexOf('!') === 0) {
                                continue;
                            }
                            this.items.push({
                                name: data[i],
                                status: 0,
                            });
                        }
                        this.txtStatus = '已更新所有excel';
                    });
                },

                onClickConvert() {
                    Editor.Ipc.sendToMain('excel2json:convert-json', this.items);
                },

                onClickConvertOne(index) {
                    Editor.Ipc.sendToMain('excel2json:convert-json', this.items[index]);
                }
            },
        });

        this.v.onClickUpdate();
    },

    messages: {
        'convert-success'(event, excelFileName) {
            for (let i = 0; i < this.v.items.length; i++) {
                if (this.v.items[i].name === excelFileName) {
                    this.v.items[i].status = 1;
                    break;
                }
            }
        },

        'convert-failed'(event, excelFileName) {
            for (let i = 0; i < this.v.items.length; i++) {
                if (this.v.items[i].name === excelFileName) {
                    this.v.items[i].status = 2;
                    break;
                }
            }
        }
    },
});