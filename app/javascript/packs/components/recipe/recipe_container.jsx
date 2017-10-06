import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from "./recipe";
import CSRFToken from "../shared/csrf_token";

export default class RecipeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: {}
        }
    }

    componentDidMount() {
        $.ajax({
            dataType: 'json',
            url: `${window.location.pathname}`,
            beforeSend: xhr => xhr.setRequestHeader('X-CSRF-Token', CSRFToken.extractToken()),
            success: recipe => this.setState({recipe}),
            error: e => console.error(e)
        });
    }

    render() {
        return <Recipe recipe={this.state.recipe} placeholderUrl={'/placeholder-400x300.png'}/>;
    }
}

document.addEventListener('turbolinks:load', function () {
    const recipeContainer = document.getElementById('recipe_container');
    if (recipeContainer) {
        ReactDOM.render(<RecipeContainer/>, recipeContainer);
    }
});
