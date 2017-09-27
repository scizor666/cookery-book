import React from 'react';
import {confirmRecipeDelete} from '../confirm/confirm';

export default class RecipeActions extends React.Component {

    handleDelete() {
        confirmRecipeDelete(this.props.recipe);
    }

    render() {
        return <div className='col'>
            <div className='recipe-actions'>
                <a className="mr-3" title="Back" href={`/catalogs/${this.props.recipe.catalog_id}`}>
                    <i className='fa fa-long-arrow-left'/>
                </a>
                <a className="mr-3" title="Edit"
                    href={`/catalogs/${this.props.recipe.catalog_id}/recipe/${this.props.recipe.id}/edit`}>
                    <i className='fa fa-pencil'/>
                </a>
                <a id="delete_recipe" title="Delete" href="javascript:void(0);" onClick={() => this.handleDelete()}>
                    <i className='fa fa-trash-o'/>
                </a>
            </div>
        </div>;
    }
}