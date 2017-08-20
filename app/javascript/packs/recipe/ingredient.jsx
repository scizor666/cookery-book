import React from 'react';
import SearchResultsList from './search_results_list';

export default class Ingredient extends React.Component {

    constructor(props) {
        super(props);
    }

    handleInputChange(e) {
        this.props.onUserInput(this.props.keyId, e.target.dataset['name'], e.target.value);
    }

    renderSearchResults() {
        if(this.props.searchResults && this.props.showDropdown) {
            return <SearchResultsList results={this.props.searchResults}
                setPreventHideDropdown={(state) => this.props.setPreventHideDropdown(this.props.keyId, state)}
                handleSelect={(option) => this.props.handleSelect(this.props.keyId, option)}/>;
        }
    }

    render() {
        return <div className={`ingredient${this.props.className ? ` ${this.props.className}` : ''}`}>
            <label>
                <b>Ingredient</b>
            </label>
            <div className="row">
                <div className="form-group col-md-4 col-sm-12">
                    <label htmlFor="recipe_product__name">Name</label>
                    <input className="form-control product-name" required="required" autoComplete="off"
                        placeholder="name" type="text" value={this.props.name} name="recipe[product][][name]"
                        onChange={(e) => this.handleInputChange(e)} data-name="name"
                        onFocus={() => this.props.handleDropdownVisibility(this.props.keyId, true)}
                        onBlur={() => this.props.handleDropdownVisibility(this.props.keyId, false)}
                        id="recipe_product__name"/>
                    {this.renderSearchResults()}
                </div>
                <div className="form-group col-md-4 col-sm-12">
                    <label htmlFor="recipe_product__caloricity">Caloricity, kcal/100g</label>
                    <input className="form-control product-caloricity" required="required" autoComplete="off"
                        placeholder="caloricity" type="number" step="any" min="0" value={this.props.caloricity}
                        name="recipe[product][][caloricity]"
                        onChange={(e) => this.handleInputChange(e)} data-name="caloricity"
                        id="recipe_product__caloricity"/>
                    <input className="product-id" defaultValue={this.props.productId} type="hidden"
                        name="recipe[product][][id]"
                        id="recipe_product__id"/>
                </div>
                <div className="form-group col-md-4 col-sm-12">
                    <label htmlFor="recipe_ingredient__weight">Weight, g</label>
                    <input className="form-control ingredient-weight" required="required" autoComplete="off"
                        placeholder="weight" type="number" step="any" min="0" value={this.props.weight}
                        name="recipe[ingredient][][weight]"
                        onChange={(e) => this.handleInputChange(e)} data-name="weight"
                        id="recipe_ingredient__weight"/>
                    <input defaultValue={this.props.ingredientId} type="hidden" name="recipe[ingredient][][id]"
                        id="recipe_ingredient__id"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <a onClick={() => this.props.removeIngredient(this.props.keyId)} className="remove-ingredient"
                        style={{display: this.props.elementRemovable ? 'block' : 'none'}}
                        href="javascript:void(0);"><i className="fa fa-minus fa-2x pull-right" style={{color: 'red'}}/>
                    </a>
                </div>
            </div>
        </div>;
    }
}