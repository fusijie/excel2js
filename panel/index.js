'use strict';

Editor.Panel.extend({
    style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

    template: `
    <h2>标准面板</h2>
    <ui-button id="btn-hello">Hello</ui-button>
    <ui-button id="btn-ipc">IPC</ui-button>
    <ui-button id="btn-walk-scene">Walk Scene</ui-button>
    <ui-button id="btn-not-comp-module">Not comp module</ui-button>
    <hr />
    <div>状态: <span id="label">--</span></div>
  `,

    $: {
        btn_hello: '#btn-hello',
        btn_ipc: '#btn-ipc',
        btn_walk_scene: '#btn-walk-scene',
        btn_not_comp_module: '#btn-not-comp-module',
        label: '#label',
    },

    ready() {
        this.$btn_hello.addEventListener('confirm', () => {
            this.$label.innerText = '你好';
            setTimeout(() => {
                this.$label.innerText = '--';
            }, 500);
        });
        this.$btn_ipc.addEventListener('confirm', () => {
            Editor.Ipc.sendToMain('excel2json:say-hello', 'Hello, this is simple panel');
        });
        this.$btn_walk_scene.addEventListener('confirm', () => {
            Editor.Scene.callSceneScript('excel2json', 'get-canvas-children', (err, length) => {
                Editor.log(`get-canvas-children callback :  length - ${length}`);
            });
        });
        this.$btn_not_comp_module.addEventListener('confirm', () => {
            Editor.Scene.callSceneScript('excel2json', 'not_comp_module', (err, random_num) => {
                Editor.log(`not_comp_module callback :  random_num - ${random_num}`);
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