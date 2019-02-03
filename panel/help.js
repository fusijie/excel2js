Editor.Panel.extend({
    style: `
    :host {
      margin: 10px;
    }
  `,

    template: `
    <h2>A Simple Vue Panel</h2>

    <input v-model="message">
    <p>Input Value = <span>{{message}}</span></p>
  `,

    ready() {
        new window.Vue({
            el: this.shadowRoot,
            data: {
                message: 'Hello World',
            },
        });
    },
});