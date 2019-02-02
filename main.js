'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

module.exports = {
    load() {
    },

    unload() {
    },

    messages: {
        'open'() {
            Editor.Panel.open('excel2js');
        },

        'update-excel'(event) {
            let excelDir = Path.join(Editor.projectPath, 'excel');
            let excelArr = [];
            if (Fs.existsSync(excelDir)) {
                excelArr = Fs.readdirSync(excelDir);
            }
            if (event.reply) {
                event.reply(null, excelArr);
            }
        },

        'convert-js'(event, excelFileInfo) {
            let jsDir = 'db://assets/data';
            if (!Editor.assetdb.exists(jsDir)) {
                Editor.assetdb.create(jsDir);
            }
            if (Array.isArray(excelFileInfo)) {
                for (let i = 0; i < excelFileInfo.length; i++) {
                    this.convertJs(excelFileInfo[i].name);
                }
            } else {
                this.convertJs(excelFileInfo.name);
            }
        },
    },

    convertJs(excelFileName) {
        //解析excel
        let xlsx = Editor.require('packages://excel2js/node_modules/xlsx');
        let excelName = Path.join(Editor.projectPath, 'excel', excelFileName);
        const workbook = xlsx.readFile(excelName);
        const sheetNames = workbook.SheetNames;
        const worksheet = workbook.Sheets[sheetNames[0]];
        const headers = {};
        const data = [];
        const keys = Object.keys(worksheet);
        keys.filter(k => k[0] !== '!')// 过滤以 ! 开头的 key
            .forEach(k => {// 遍历所有单元格
                let col = k.substring(0, 1);
                let row = parseInt(k.substring(1));
                let value = worksheet[k].v;
                if (row === 1) {
                    headers[col] = value;
                    return;
                }
                if (!data[row]) {
                    data[row] = {};
                }
                data[row][headers[col]] = value;
            });
        data.splice(0, 2);

        //转Array为text
        let jsText = 'module.exports = [\n';
        for (let i = 0; i < data.length; i++) {
            jsText += '\t{';
            for (let key in data[i]) {
                jsText += `${key}:${data[i][key]}, `;
            }
            jsText = jsText.substr(0, jsText.length - 2);
            jsText += '},\n';
        }
        jsText += '];';

        //校验js文件
        try {
            eval(jsText);
        } catch (error) {
            Editor.Ipc.sendToPanel('excel2js', 'convert-failed', excelFileName);
            return;
        }

        //写入js文件
        let excelFile = excelFileName.substr(0, excelFileName.lastIndexOf('.xlsx'));
        let url = `db://assets/data/${excelFile}.js`;
        if (Editor.assetdb.exists(url)) {
            Editor.assetdb.saveExists(url, jsText, (err) => {
                if (err) {
                    Editor.Ipc.sendToPanel('excel2js', 'convert-failed', excelFileName);
                } else {
                    Editor.Ipc.sendToPanel('excel2js', 'convert-success', excelFileName);
                }
            });
        } else {
            Editor.assetdb.create(url, jsText, (err) => {
                if (err) {
                    Editor.Ipc.sendToPanel('excel2js', 'convert-failed', excelFileName);
                } else {
                    Editor.Ipc.sendToPanel('excel2js', 'convert-success', excelFileName);
                }
            });
        }
    }
};