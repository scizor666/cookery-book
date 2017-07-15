import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal'

export default class Confirm extends React.Component {


    constructor(props) {
        super(props);
        this.displayName = 'Confirm'
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
};

Modal.getDefaultProps = {
    confirmLabel: 'OK',
    abortLabel: 'Cancel'
};