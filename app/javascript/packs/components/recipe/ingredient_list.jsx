import React from 'react';
import Ingredient from './ingredient';
import {debounce} from 'throttle-debounce';
import CSRFToken from '../shared/csrf_token';
import PropTypes from 'prop-types';

export default class IngredientList extends React.Component {

    static propTypes = {
        ingredients: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            ingredients: props.ingredients,
            elementRemovable: this.isElementRemovable(props.ingredients)
        };
        this.autoComplete = debounce(250, this.autoComplete);
    }

    handleUserInput(key, propName, value) {
        let ingredients = this.state.ingredients.slice();
        if (propName === 'name' || propName === 'caloricity') {
            ingredients[key]['product'][propName] = value;
        } else {
            ingredients[key][propName] = value;
        }
        this.setState({ingredients});
        if (propName === 'name') {
            this.autoComplete(key, value);
        }
    }

    autoComplete(key, searchPhrase) {
        $.ajax({
            url: '/products/index?search_phrase=' + searchPhrase,
            beforeSend: xhr => xhr.setRequestHeader('X-CSRF-Token', CSRFToken.extractToken()),
            success: (found) => {
                let ingredients = this.state.ingredients.slice();
                ingredients[key]['searchResults'] = found;
                this.setState({ingredients});
            }
            // @TODO: handle error
        });
    }

    handleSelect(key, option) {
        let ingredients = this.state.ingredients.slice();
        ingredients[key]['product']['name'] = option['name'];
        ingredients[key]['product']['caloricity'] = option['caloricity'];
        if (ingredients[key]['product']['id'] !== option['id']) {
            ingredients[key]['product']['id'] = option['id'];
            ingredients[key]['id'] = '';
        }
        delete ingredients[key].searchResults;
        this.setState({ingredients});
    }

    removeIngredient(key) {
        let ingredients = this.state.ingredients.slice();
        delete ingredients[key];
        this.setState({ingredients: ingredients, elementRemovable: this.isElementRemovable(ingredients)});
    }

    newIngredientHighlight() {
        const timestampClass = 'ingredient-added-at-' + new Date().getTime();
        const highlightClass = 'add-ingredient-highlight';
        const ingredientClasses = timestampClass + ' ' + highlightClass;
        // @TODO use state instead
        setTimeout(function () {
            let elements = document.getElementsByClassName(timestampClass);
            [].forEach.call(elements, function (el) {
                el.classList.remove(highlightClass);
                el.classList.remove(timestampClass);
            });
        }, 3000);
        return ingredientClasses;
    }

    addNewIngredient() {
        let ingredients = this.state.ingredients.slice();
        ingredients.push({product: {id: '', name: '', caloricity: ''}, className: this.newIngredientHighlight()});
        this.setState({ingredients: ingredients, elementRemovable: this.isElementRemovable(ingredients)});
    }

    isElementRemovable(ingredients) {
        return ingredients.filter(e => e).length > 1;
    }

    renderIngredients() {
        return this.state.ingredients.map((ingredient, key) => {
            // @TODO simplify this mapping, maybe no reason to use a key
            let props = {
                name: ingredient.product.name,
                caloricity: ingredient.product.caloricity,
                weight: ingredient.weight,
                ingredientId: ingredient.id,
                productId: ingredient.product.id,
                onUserInput: (key, propName, value) => this.handleUserInput(key, propName, value),
                removeIngredient: key => this.removeIngredient(key),
                keyId: key,
                elementRemovable: this.state.elementRemovable,
                className: ingredient.className,
                searchResults: ingredient.searchResults,
                handleSelect: (key, option) => this.handleSelect(key, option),
                handleDropdownVisibility: (key, state) => {
                    this.handleUserInput(key, 'showDropdown',
                        state || !!this.state.ingredients[key]['preventHideDropdown']);
                },
                setPreventHideDropdown: (key, state) => this.handleUserInput(key, 'preventHideDropdown', state),
                showDropdown: ingredient.showDropdown
            };
            return <Ingredient key={key} {...props}/>;
        });
    }

    render() {
        return <div>
            {this.renderIngredients()}
            <div className="row mt-4">
                <div className="col">
                    <a id="add_new_ingredient" onClick={() => this.addNewIngredient()} href="javascript:void(0)">
                        <i className="fa fa-plus fa-2x text-success pull-right top-aligned-row"/>
                    </a>
                </div>
            </div>
        </div>;
    }
}