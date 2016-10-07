import request from '../request';
import serialize from 'form-serialize';
import bus from '../event-bus'

export default {

    bind(el) {

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

function handleFormSubmit(event) {
    event.preventDefault();

    const container = this.arg;
    const url = this.el.getAttribute('action');
    const method = this.el.getAttribute('method') || 'POST';
    const data = serialize(this.el);

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

function handleLinkClick(event) {
    event.preventDefault();

    const container = this.arg;
    const url = this.el.getAttribute('href');

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
