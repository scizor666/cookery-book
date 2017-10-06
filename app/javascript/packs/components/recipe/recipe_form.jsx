import React from 'react';
import Uploader from '../images/uploader';
import IngredientList from './ingredient_list';
import CSRFToken from "../shared/csrf_token";

export default class RecipeForm extends React.Component {

    formId() {
        return this.props.editMode ? `edit_recipe_${this.props.recipe.id}` : 'new_recipe';
    }

    action() {
        if (this.props.editMode) {
            return `/catalogs/${this.props.recipe.catalog_id}/recipe/${this.props.recipe.id}`;
        } else {
            return `${window.location.pathname}/..`;
        }
    }

    actionDescription() {
        return this.props.editMode ? 'Update Recipe' : 'Create Recipe';
    }

    header() {
        return this.props.editMode ? 'Edit Recipe' : 'Add a new Recipe';
    }

    renderActionMethod() {
        if (this.props.editMode) {
            return <input type="hidden" name="_method" defaultValue="patch"/>;
        }
    }

    renderIngredientList() {
        if (!this.props.editMode) {
            return <IngredientList ingredients={[{product: {}}]}/>
        }
        if (this.props.recipe.ingredients) {
            return <IngredientList ingredients={this.props.recipe.ingredients}/>
        }
    }

    render() {
        return <form className="form-recipe"
                     id={this.formId()}
                     action={this.action()}
                     acceptCharset="UTF-8"
                     method="post">
            <input name="utf8" type="hidden" defaultValue="&#x2713;"/>
            <CSRFToken/>
            {this.renderActionMethod()}
            <div className='row'>
                <h2 className='form-recipe-heading text-center col-md-12'>{this.header()}</h2>
            </div>
            <div className='row'>
                <div className='form-group col-md-4 mx-auto'>
                    <label className="sr-only" htmlFor="recipe_name">Name</label>
                    <input className="form-control" placeholder="Recipe name" required="required" autoFocus
                           id="first" type="text" name="recipe[name]" data-name="name"
                           onChange={this.props.handleUserInput}
                           value={this.props.recipe.name}/>
                </div>
            </div>
            <div className='row'>
                <div className='form-group col-md-6 mx-auto'>
                    <label htmlFor="recipe_short_description">Short description</label>
                    <textarea className="form-control" rows="3" maxLength="150" placeholder="short description"
                              name="recipe[short_description]" id="recipe_short_description"
                              onChange={this.props.handleUserInput} data-name="short_description"
                              value={this.props.recipe.short_description}/>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Uploader name="recipe[image_url]" value={this.props.recipe.image_url}/>
                </div>
            </div>
            {this.renderIngredientList()}
            <div className='row mb-2'>
                <div className='col'>
                    <label htmlFor="recipe_description">Description</label>
                    <textarea className="form-control" rows="5" placeholder="description" name="recipe[description]"
                              id="recipe_description" onChange={this.props.handleUserInput} data-name="description"
                              value={this.props.recipe.description}/>
                </div>
            </div>
            <div className='form-group col-md-12 text-center'>
                <input type="submit" name="commit" value={this.actionDescription()} className="btn btn-lg btn-primary"
                       data-disable-with={this.actionDescription()}/>
            </div>
        </form>;
    }
}