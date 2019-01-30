'use strict';

module.exports = {
    'get-canvas-children': (event) => {
        var canvas = cc.find('Canvas');
        Editor.log('children length : ' + canvas.children.length);

        if (event.reply) {
            event.reply(null, canvas.children.length);
        }
    },

    'not_comp_module': (event) => {
        var utils = cc.require("utils");
        if (event.reply) {
            event.reply(null, utils.get_random_int(0, 10));
        }
    }
};