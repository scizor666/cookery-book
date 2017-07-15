/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react'
import ReactDOM from 'react-dom'
import Confirm from './confirm/confirm'

const confirm = function (message, options) {
    let cleanup, component, props, wrapper;
    if (options === null) {
        options = {};
    }
    props = $.extend({
        message: message
    }, options);
    wrapper = document.body.appendChild(document.createElement('div'));
    component = ReactDOM.render(<Confirm {...props}/>, wrapper);
    cleanup = function () {
        ReactDOM.unmountComponentAtNode(wrapper);
        return setTimeout(function () {
            return wrapper.remove();
        });
    };
    return component.promise.always(cleanup).promise();
};

document.addEventListener('turbolinks:load', () => {
    const data = $('body').data();
    if (data.controller === 'recipe' && data.action === 'show') {
        document.getElementById('delete_recipe').addEventListener('click', function () {
            return confirm('Are you sure?', {
                description: 'Would you like to remove this recipe?',
                confirmLabel: 'Yes',
                abortLabel: 'No'
            }).then(() => {
                $.ajax({
                    url: '/recipe/' + $('#recipe_data').data('recipe').id,
                    beforeSend: (xhr) => xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')),
                    type: 'DELETE'
                    // TODO handle error
                });
                return this;
            });
        }, false);
    }
});





