'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

Editor.Panel.extend({
    style: Fs.readFileSync(
        Editor.url('packages://excel2js/panel/index.css'),
        'utf-8'
    ),

    template: Fs.readFileSync(
        Editor.url('packages://excel2js/panel/help.html'),
        'utf-8'
    ),

    ready() {
        
    },
});