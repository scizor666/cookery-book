import React from 'react';
import {
    Card, CardImg, CardText, CardBlock,
    CardTitle, CardFooter
} from 'reactstrap';
import {confirmRecipeDelete} from '../confirm/confirm';

export default class RecipeCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: props.recipe
        };
    }

    recipeLink() {
        return '/recipe/' + this.state.recipe.id;
    }

    handleDelete() {
        confirmRecipeDelete(this.state.recipe.id);
    }

    render() {
        return (<Card className="h-100">
            <CardImg top width="100%"
                src={this.state.recipe.image_url || this.props.placeholderUrl}
                alt="Card image cap"
                onClick={() => location.href = this.recipeLink()}/>
            <CardBlock>
                <CardTitle>{this.state.recipe.name}</CardTitle>
                <CardText>{this.state.recipe.short_description}</CardText>
            </CardBlock>
            <CardFooter className="text-center">
                <a className="mr-5" href={this.recipeLink()}><i className="fa fa-eye"/></a>
                <a className="mr-5" href={this.recipeLink() + '/edit'}><i className="fa fa-pencil"/></a>
                <a href="javascript:void(0);" onClick={() => this.handleDelete()}><i className="fa fa-trash-o"/></a>
            </CardFooter>
        </Card>);
    }
}

