import React from 'react';
import IngredientRow from './ingredient_row';

export default class IngredientsTable extends React.Component {
    render() {
        return <div className='col-sm-12 col-md-6'>
            <h2>Ingredients</h2>
            <table className='table table-striped lead ingredients-table'>
                <thead>
                    <tr>
                        <th className='col'>Name</th>
                        <th className='col'>Weight,g</th>
                        <th className='col'>kcal/100g</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.ingredients.map(function (ingredient) {
                        return <IngredientRow key={ingredient.id} ingredient={ingredient}/>;
                    })}
                    <tr>
                        <td>
                            <h4>Total</h4>
                        </td>
                        <td>{this.props.ingredients.reduce((total, o) => total + o.weight, 0)}</td>
                        <td>
                            <h4>{this.props.caloricity}</h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}
