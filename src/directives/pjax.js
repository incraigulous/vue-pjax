import request from '../request';
import serialize from 'form-serialize';
import bus from '../event-bus'

export default {

    bind(el, {arg}) {
        var handleFormSubmit = function (event) {
            event.preventDefault();

            const container = arg;
            const url = el.getAttribute('action');
            const method = el.getAttribute('method') || 'POST';
            const data = serialize(el);

            request(container, { url, method, data })
                .then(response => {
                    bus.$emit('pjax-loaded', {
                        url,
                        container,
                        content: response.data,
                    });
                }, () => {
                    window.location = url;
                });
        }

        var handleLinkClick = function (event) {
            event.preventDefault();

            const container = arg;
            const url = el.getAttribute('href');

            request(container, { url, method: 'GET' })
                .then(response => {
                    bus.$emit('pjax-loaded', {
                        url,
                        container,
                        content: response.data,
                    });
                }, () => {
                    window.location = url;
                });
        }

        switch (el.tagName.toLowerCase()) {

            case 'a':
                el.addEventListener("click", handleLinkClick.bind(this));
                break;

            case 'form':
                el.addEventListener("submit", handleFormSubmit.bind(this));
                break;

        }
    }

};
