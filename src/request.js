import merge from 'lodash.merge';
import Vue from 'vue'

export const request = (container, options) => {
    if (window.Vue) Vue = window.Vue //Accounting for vue already being set in the global namespace

    return Vue.http(merge(
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html',
                'X-Requested-With': 'PJAX',
                'X-PJAX': true,
                'X-PJAX-Container': `pjax-container[name="${container}"]`,
            },
        },
        options
    ));

};

export default request;
