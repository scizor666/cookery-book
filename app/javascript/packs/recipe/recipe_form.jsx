import React from 'react';
import ReactDOM from 'react-dom';
import Uploader from '../images/uploader';
import IngredientList from './ingredient_list';

export default class RecipeForm extends React.Component {

    formId() {
        return this.isEditMode() ? `edit_recipe_${this.props.recipe.id}` : 'new_recipe';
    }

    action() {
        if (this.isEditMode()) {
            return `/catalogs/${this.props.recipe.catalog_id}/recipe/${this.props.recipe.id}`;
        } else {
            return `${window.location.pathname}/..`;
        }

    }

    isEditMode() {
        return this.props.recipe.id !== null && this.props.recipe.id !== '';
    }

    renderActionMethod() {
        if(this.isEditMode()){
            return <input type="hidden" name="_method" defaultValue="patch"/>;
        }
    }

    render() {
        return <form className="form-recipe"
            id={this.formId()}
            action={this.action()}
            acceptCharset="UTF-8"
            method="post">
            <input name="utf8" type="hidden" defaultValue="&#x2713;"/>
            <input type="hidden"
                name="authenticity_token"
                defaultValue={$('meta[name="csrf-token"]').attr('content')}/>
            {this.renderActionMethod()}
            <div className='row'>
                <h2 className='form-recipe-heading text-center col-md-12'>{this.props.header}</h2>
            </div>
            <div className='row'>
                <div className='form-group col-md-4 mx-auto'>
                    <label className="sr-only" htmlFor="recipe_name">Name</label>
                    <input className="form-control" placeholder="Recipe name" required="required" autoFocus
                        id="first" type="text" name="recipe[name]" defaultValue={this.props.recipe.name}/>
                </div>
            </div>
            <div className='row'>
                <div className='form-group col-md-6 mx-auto'>
                    <label htmlFor="recipe_short_description">Short description</label>
                    <textarea className="form-control" rows="3" maxLength="150" placeholder="short description"
                        name="recipe[short_description]" id="recipe_short_description"
                        defaultValue={this.props.recipe.short_description}/>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Uploader name="recipe[image_url]" value={this.props.recipe.image_url}/>
                </div>
            </div>
            <IngredientList ingredients={this.props.recipe.ingredients}/>
            <div className='row mb-2'>
                <div className='col'>
                    <label htmlFor="recipe_description">Description</label>
                    <textarea className="form-control" rows="5" placeholder="description" name="recipe[description]"
                        id="recipe_description" defaultValue={this.props.recipe.description}/>
                </div>
            </div>
            <div className='form-group col-md-12 text-center'>
                <input type="submit" name="commit" value={this.props.action} className="btn btn-lg btn-primary"
                    data-disable-with={this.props.action}/>
            </div>
        </form>;
    }
}

document.addEventListener('turbolinks:load', function () {
    const recipeFormContainer = document.getElementById('recipe_form');
    if (recipeFormContainer) {
        ReactDOM.render(<RecipeForm
            header={recipeFormContainer.getAttribute('data-header')}
            action={recipeFormContainer.getAttribute('data-action')}
            recipe={JSON.parse(recipeFormContainer.getAttribute('data-recipe'))}/>, recipeFormContainer);
    }
});