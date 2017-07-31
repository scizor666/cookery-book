import React from 'react';
import ReactDOM from 'react-dom';
import RecipeCard from './recipe';

class RecipeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: props.recipes
        };
    }

    render() {
        return (<div className="row">
            {this.state.recipes.map(function (recipe) {
                return <div key={recipe.id} className="col-md-4 mt-2">
                    <RecipeCard recipe={recipe}/>
                </div>
            })}
        </div>);


    }
}

document.addEventListener('turbolinks:load', function () {
    const cardsContainer = document.getElementById('cards_container');
    if (cardsContainer) {
        ReactDOM.render(<RecipeList recipes={JSON.parse(cardsContainer.getAttribute('data'))}/>, cardsContainer);
    }
});