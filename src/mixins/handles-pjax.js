import PjaxContainer from '../components/pjax-container';
import Pjax from '../directives/pjax';
import bus from '../event-bus';

export default {

    components: {
        PjaxContainer,
    },

    directives: {
        Pjax,
    },

    mounted() {
        bus.$on('pjax-replace', ({ element, content }) => {
            element.innerHTML = content;
            this.$compile(element);
        })
    },

};
