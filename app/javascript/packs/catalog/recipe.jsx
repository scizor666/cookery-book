import React from 'react';
import {
    Card, CardImg, CardText, CardBlock,
    CardTitle, Button
} from 'reactstrap';
import {confirmRecipeDelete} from '../confirm/confirm';

export default class RecipeCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: props.recipe
        }
    }

    recipeLink() {
        return "/recipe/" + this.state.recipe.id;
    }

    handleDelete() {
        confirmRecipeDelete(this.state.recipe.id);
    }

    render() {
        return (<div>
            <Card>
                <CardImg top width="100%"
                         src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                         alt="Card image cap"/>
                <CardBlock>
                    <CardTitle>{this.state.recipe.name}</CardTitle>
                    <CardText>{this.state.recipe.short_description}</CardText>
                    <Button color="primary"
                            onClick={() => location.href = this.recipeLink()}>Details</Button>
                    {' '}
                    <Button color="primary"
                            onClick={() => location.href = this.recipeLink() + '/edit'}>Edit</Button>
                    {' '}
                    <Button color="primary" onClick={() => this.handleDelete()}>Delete</Button>
                </CardBlock>
            </Card>
        </div>)
    }
}

