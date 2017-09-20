import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

export default class Confirm extends React.Component {


    constructor(props) {
        super(props);
        this.displayName = 'Confirm';
    }

    abort() {
        return this.promise.reject();
    }

    confirm() {
        return this.promise.resolve();
    }

    componentDidMount() {
        this.promise = new $.Deferred();
        return ReactDOM.findDOMNode(this.refs.confirm).focus();
    }

    render() {
        let modalBody;
        if (this.props.description) {
            modalBody = (
                <div className='modal-body'>
                    {this.props.description}
                </div>
            );
        }

        return (
            <Modal>
                <div className='modal-header'>
                    <h4 className='modal-title'>
                        {this.props.message}
                    </h4>
                </div>
                {modalBody}
                <div className='modal-footer'>
                    <div className='text-right'>
                        <button
                            role='abort'
                            type='button'
                            className='btn btn-default'
                            onClick={(e) => this.abort(e)}
                        >
                            {this.props.abortLabel}
                        </button>
                        {' '}
                        <button
                            role='confirm'
                            type='button'
                            className='btn btn-primary'
                            ref='confirm'
                            onClick={(e) => this.confirm(e)}
                        >
                            {this.props.confirmLabel}
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

Modal.getDefaultProps = {
    confirmLabel: 'OK',
    abortLabel: 'Cancel'
};

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

export const confirmRecipeDelete = function (recipe) {
    return confirm('Are you sure?', {
        description: 'Would you like to remove this recipe?',
        confirmLabel: 'Yes',
        abortLabel: 'No'
    }).then(() => {
        $.ajax({
            url: '/catalogs/' + recipe.catalog_id + '/recipe/' + recipe.id,
            beforeSend: (xhr) => xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')),
            type: 'DELETE'
            // TODO handle error
        });
        return this;
    });
};