import React from 'react';

export default class IngredientRow extends React.Component {
    render() {
        return <tr>
            <td className='ingredient-word-breaks'>{this.props.ingredient.product.name}</td>
            <td>{this.props.ingredient.weight}</td>
            <td>{this.props.ingredient.product.caloricity}</td>
        </tr>;
    }
}