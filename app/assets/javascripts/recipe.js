removeIngredient = function (element) {
    element.parent().parent().parent().remove();
    adjustFirstIngredientRemoveAbility();
};

adjustFirstIngredientRemoveAbility = function () {
    var ingredients = document.getElementById('ingredients');
    if (ingredients.childElementCount === 1) {
        ingredients.firstElementChild.querySelector('.remove-ingredient').style.display = 'none';
    } else if (ingredients.childElementCount === 2) {
        ingredients.firstElementChild.querySelector('.remove-ingredient').style.display = 'block';
    }
};

function addNewIngredient(ingredient = null) {
    var clone = document.getElementById('new_ingredient').firstElementChild.cloneNode(true);
    if (ingredient) {
        clone.querySelector('.product-id').value = ingredient.product.id;
        clone.querySelector('.product-name').value = ingredient.product.name;
        clone.querySelector('.product-caloricity').value = ingredient.product.caloricity;
        clone.querySelector('.ingredient-weight').value = ingredient.weight;
    }
    document.getElementById('ingredients').appendChild(clone);
    adjustFirstIngredientRemoveAbility();
}

document.addEventListener('turbolinks:load', function () {
    const controller = document.body.getAttribute('data-controller');
    const action = document.body.getAttribute('data-action');
    if (controller === 'recipe' && (action === 'new' || action === 'edit')) {
        document.getElementById('add_new_ingredient').addEventListener('click', () => addNewIngredient());
    }
});