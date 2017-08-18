import React from 'react';
import RecipeCard from './recipe';

export default class RecipeList extends React.Component {

    render() {
        return (<div className="row">
            {this.props.recipes.map(function (recipe) {
                return <div key={recipe.id} className="col-md-4 mt-2">
                    <RecipeCard placeholderUrl="/placeholder-320x240.png" recipe={recipe}/>
                </div>;
            })}
        </div>);
    }
}