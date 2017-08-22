import React from 'react';
import ReactDOM from 'react-dom';
import Ingredient from './ingredient';

class IngredientList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: props.ingredients,
        };
        this.state['elementRemovable'] = this.isElementRemovable();
    }

    handleUserInput(key, propName, value) {
        this.state.ingredients[key][propName] = value;
        this.forceUpdate();
        if (propName === 'name') {
            this.autoComplete(key, value);
        }
    }

    autoComplete(key, searchPhrase) {
        $.ajax({
            url: '/products/index?search_phrase=' + searchPhrase,
            beforeSend: (xhr) => xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')),
            success: (found) => {
                this.state.ingredients[key]['searchResults'] = found;
                this.forceUpdate();
            }
            // @TODO: handle error
        });
    }

    handleSelect(key, option) {
        this.state.ingredients[key]['name'] = option['name'];
        this.state.ingredients[key]['caloricity'] = option['caloricity'];
        if (this.state.ingredients[key]['productId'] !== option['id']) {
            this.state.ingredients[key]['productId'] = option['id'];
            this.state.ingredients[key]['ingredientId'] = '';
        }
        delete this.state.ingredients[key].searchResults;
        this.forceUpdate();
    }

    removeIngredient(key) {
        delete this.state.ingredients[key];
        this.setState({elementRemovable: this.isElementRemovable()});
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
        this.state.ingredients.push({className: this.newIngredientHighlight()});
        this.setState({elementRemovable: this.isElementRemovable()});
    }

    isElementRemovable() {
        return this.state.ingredients.filter(e => e).length > 1;
    }

    renderIngredients() {
        return this.state.ingredients.map((ingredient, key) => {
            // @TODO simplify this mapping, maybe no reason to use a key
            let props = {
                name: ingredient.name,
                caloricity: ingredient.caloricity,
                weight: ingredient.weight,
                ingredientId: ingredient.ingredientId,
                productId: ingredient.productId,
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

document.addEventListener('turbolinks:load', function () {
    const ingredientsContainer = document.getElementById('ingredients');
    if (ingredientsContainer) {
        let ingredients = [];
        JSON.parse(ingredientsContainer.getAttribute('data-ingredients'))
            .forEach(e => ingredients.push({weight: e['weight'], ingredientId: e['id']}));
        JSON.parse(ingredientsContainer.getAttribute('data-products'))
            .forEach((e, i) => {
                ingredients[i]['name'] = e['name'];
                ingredients[i]['productId'] = e['id'];
                ingredients[i]['caloricity'] = e['caloricity'];
            });
        ReactDOM.render(<IngredientList ingredients={ingredients}/>, ingredientsContainer);
    }
});