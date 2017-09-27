import React from 'react';
import ReactDOM from 'react-dom';
import IngredientsTable from './ingredients_table';
import RecipeActions from './recipe_actions';

export default class Recipe extends React.Component {

    render() {
        return <div className='main'>
            <div className='row'>
                <div className='col col-auto'>
                    <h1>{this.props.recipe.name}</h1>
                </div>
                <RecipeActions recipe={this.props.recipe}/>
            </div>
            <div className='collapse show' id='recipe_details_47'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <div className='lead'>{this.props.recipe.short_description}</div>
                        <img alt='No picture found' className='w-100'
                            src={this.props.recipe.image_url || this.props.placeholderUrl}/>
                    </div>
                    <IngredientsTable
                        ingredients={this.props.recipe.ingredients}
                        caloricity={this.props.recipe.caloricity}
                    />
                </div>
                <div className='row'>
                    <div className='col'>
                        <p className='recipe-description lead'>{this.props.recipe.description}</p>
                    </div>
                </div>
            </div>
        </div>;
    }
}

document.addEventListener('turbolinks:load', function () {
    const recipeContainer = document.getElementById('recipe_container');
    if (recipeContainer) {
        ReactDOM.render(<Recipe
            recipe={JSON.parse(recipeContainer.getAttribute('data-recipe'))}
            placeholderUrl={'/placeholder-400x300.png'}
        />, recipeContainer);
    }
});
