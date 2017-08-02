import React from 'react';
import {
    Card, CardImg, CardText, CardBlock,
    CardTitle, Button, CardFooter
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
                src={this.state.recipe.image_url}
                alt="Card image cap"
                onClick={() => location.href = this.recipeLink()}/>
            <CardBlock>
                <CardTitle>{this.state.recipe.name}</CardTitle>
                <CardText>{this.state.recipe.short_description}</CardText>
            </CardBlock>
            <CardFooter className="text-center">
                <Button color="primary"
                    onClick={() => location.href = this.recipeLink()}>Recipe</Button>
                {' '}
                <Button color="primary"
                    onClick={() => location.href = this.recipeLink() + '/edit'}>Edit</Button>
                {' '}
                <Button color="primary" onClick={() => this.handleDelete()}>Delete</Button>
            </CardFooter>
        </Card>);
    }
}

