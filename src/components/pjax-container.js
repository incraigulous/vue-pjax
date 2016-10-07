import bus from '../event-bus'

export default {

    props: {
        'name': { required: true },
    },

    template: `
        <div>
            <slot></slot>
        </div>
    `,

    mounted() {
        bus.$on('pjax-loaded', ({ url, container, content}) => {
            if (this.name !== container) {
                return;
            }

            bus.$emit('pjax-replace', {
                url,
                content,
                element: this.$el,
            });
        })
    }
};
