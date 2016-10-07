import bus from '../event-bus'

export default {

    props: {
        'name': { required: true },
    },

    template: `
        <div ref="container">
            <slot></slot>
        </div>
    `,

    events: {
        ['pjax-loaded']({ url, container, content }) {

            if (this.name !== container) {
                return;
            }

            bus.$emit('pjax-replace', {
                url,
                content,
                element: this.$refs.container,
            });
        },
    },

};
