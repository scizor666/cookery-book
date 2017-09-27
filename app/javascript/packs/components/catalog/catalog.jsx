import React from 'react';
import ReactDOM from 'react-dom';
import RecipeList from './recipe_list';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import CSRFToken from "../shared/csrf_token";

export default class Catalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            recipes: [],
            hasMore: true
        };
    }

    fetchRecipes() {
        $.ajax({
            dataType: 'json',
            url: `${location.href}/recipe?page=${this.state.page}`,
            beforeSend: xhr => xhr.setRequestHeader('X-CSRF-Token', CSRFToken.extractToken()),
            success: (results) => {
                this.setState({
                    recipes: this.state.recipes.concat(results),
                    page: this.state.page + 1,
                    hasMore: results.length > 0
                });
            }
        });
    }

    render() {
        return <div>
            <div className="row">
                <div className="col-md-3 col-md-offset-3 container">
                    <div className="text-center">
                        <h1>My Recipes</h1>
                        <a href={`${location.href}/recipe/new`}>Add a new Recipe</a>

                    </div>
                </div>
            </div>
            <InfiniteScroll pageStart={0}
                loadMore={() => this.fetchRecipes()}
                hasMore={this.state.hasMore}
                loader={<div className="loader">Loading ...</div>}>
                <RecipeList recipes={this.state.recipes}/>
            </InfiniteScroll>
        </div>;
    }
}

Catalog.propTypes = {
    recipes: PropTypes.array
};


document.addEventListener('turbolinks:load', function () {
    const catalogContainer = document.getElementById('catalog');
    if (catalogContainer) {
        ReactDOM.render(<Catalog/>, catalogContainer);
    }
});