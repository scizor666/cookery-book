import React from 'react';
import ReactDOM from 'react-dom';
import RecipeForm from "./recipe_form";
import CSRFToken from "../shared/csrf_token";

export default class RecipeFormContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: {}
        }
    }

    componentDidMount() {
        if (this.isEditMode()) {
            $.ajax({
                dataType: 'json',
                url: `${window.location.pathname}/..`,
                beforeSend: xhr => xhr.setRequestHeader('X-CSRF-Token', CSRFToken.extractToken()),
                success: recipe => this.setState({recipe})
            });
        }
    }

    handleUserInput(e) {
        let recipe = this.state.recipe;
        recipe[e.target.dataset.name] = e.target.value;
        this.setState({recipe});
    }

    isEditMode() {
        return window.location.pathname.endsWith('/edit');
    }

    render() {
        return <RecipeForm
            recipe={this.state.recipe}
            editMode={this.isEditMode()}
            handleUserInput={e => this.handleUserInput(e)}
        />;
    }
}

document.addEventListener('turbolinks:load', function () {
    const recipeFormContainer = document.getElementById('recipe_form');
    if (recipeFormContainer) {
        ReactDOM.render(<RecipeFormContainer/>, recipeFormContainer);
    }
});