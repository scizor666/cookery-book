import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import ProductForm from './product_form';

export default class ProductsSearch extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            searchPhrase: '',
            found: []
        };
    }

    handleOpenModal() {
        $.ajax({
            url: '/products/index?search_phrase=' + this.state.searchPhrase,
            beforeSend: (xhr) => xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')),
            success: (found) => {
                this.setState({found: found});
            }
            // TODO: handle error
        });
        this.setState({showModal: true});
        this.style  = {
            content: {
                maxWidth: '40rem',
            }
        };
    }

    handleCancelModal() {
        this.setState({showModal: false});
    }

    handleSelectIngredient(ingredient) {
        // @TODO: handle errors
        ingredient['product'] = this.state.found.find((p) => p.id === ingredient.productId);
        /*global addNewIngredient*/
        addNewIngredient(ingredient);
        this.handleCancelModal();
    }

    setSearchPhrase(e) {
        this.setState({searchPhrase: e.target.value});
    }


    render() {
        return (
            <div>
                <div className="form-inline">
                    <div className="inner-addon left-addon">
                        <i className="fa fa-search form-control-feedback"/>
                        <input value={this.state.searchPhrase} className="form-control"
                            onChange={(e) => this.setSearchPhrase(e)}/>
                    </div>
                    <button id="search_ingredients" type="button" className="btn btn-primary" onClick={() => this.handleOpenModal()}>Search ingredients
                    </button>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Search Ingredients"
                    style={this.style}
                >
                    {(() => {
                        if (this.state.found.length > 0) {
                            return <div className="fluid-container">
                                <h1>Select Ingredient</h1>
                                <ProductForm onFormSubmit={(ingredient) => this.handleSelectIngredient(ingredient)}
                                    onFormCancel={() => this.handleCancelModal()}
                                    products={this.state.found}/>
                            </div>;
                        } else {
                            return <div>
                                <p>No products found</p>
                                <button className="btn btn-primary mt-2" onClick={() => this.handleCancelModal()}>
                                    Cancel
                                </button>
                            </div>;
                        }
                    })()}

                </Modal>
            </div>
        );
    }
}

document.addEventListener('turbolinks:load', () => {
    const searchContainer = document.getElementById('search_container');
    if (searchContainer) {
        const props = {};
        ReactDOM.render(<ProductsSearch {...props}/>, searchContainer);
        searchContainer.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
                document.getElementById('search_ingredients').click();
            }
        });
    }
});