import React from 'react';
import {
    Card, CardImg, CardText, CardBlock,
    CardTitle, CardFooter
} from 'reactstrap';
import {confirmRecipeDelete} from '../confirm/confirm';

export default class RecipeCard extends React.Component {

    recipeLink() {
        return `${location.href}/recipe/${this.props.recipe.id}`;
    }

    handleDelete() {
        confirmRecipeDelete(this.props.recipe);
    }

    render() {
        return (<Card className="h-100">
            <CardImg top width="100%"
                src={this.props.recipe.image_url || this.props.placeholderUrl}
                alt="Card image cap"
                onClick={() => location.href = this.recipeLink()}/>
            <CardBlock>
                <CardTitle>{this.props.recipe.name}</CardTitle>
                <CardText>{this.props.recipe.short_description}</CardText>
            </CardBlock>
            <CardFooter className="text-center">
                <a title="Recipe" className="mr-5" href={this.recipeLink()}><i className="fa fa-eye"/></a>
                <a title="Edit" className="mr-5" href={this.recipeLink() + '/edit'}><i className="fa fa-pencil"/></a>
                <a title="Delete" href="javascript:void(0);" onClick={() => this.handleDelete()}
                    id={`delete_recipe_${this.props.recipe.id}`}>
                    <i className="fa fa-trash-o"/></a>
            </CardFooter>
        </Card>);
    }
}

