import React from 'react'

export default class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weight: '',
            productId: this.props.products[0].id
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit({productId: parseInt(this.state.productId), weight: this.state.weight});
    }

    handleCancel() {
        this.props.onFormCancel();
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return <form onSubmit={(e) => this.handleSubmit(e)}>
            {this.props.products.map((product, i) => {
                return <div className="row mb-2" key={i}>
                    <div className="col">
                        {product.name}: {product.caloricity} kcal/100g
                        <input value={product.id} checked={parseInt(this.state.productId) === product.id}
                               onChange={(e) => this.handleInputChange(e)}
                               className="ml-2"
                               type="radio"
                               name="productId"/>
                    </div>
                </div>
            })}
            <div className="row">
                <div className="col-md-4">
                    <input value={this.state.weight}
                           onChange={(e) => this.handleInputChange(e)}
                           name="weight"
                           required
                           type="number"
                           step="any"
                           min="0"
                           placeholder="Weight, g"
                           autoComplete="off"
                           className="form-control"/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2 mr-2">Select</button>
            <button
                className="btn btn-primary mt-2"
                onClick={() => this.handleCancel()}>
                Cancel
            </button>
        </form>
    }
}