removeIngredient = function (element) {
    element.parent().parent().parent().remove();
    adjustFirstIngredientRemoveAbility();
};

adjustFirstIngredientRemoveAbility = function () {
    let ingredients = document.getElementById('ingredients');
    if (ingredients.childElementCount === 1) {
        ingredients.firstElementChild.querySelector('.remove-ingredient').style.display = 'none';
    } else if (ingredients.childElementCount === 2) {
        ingredients.firstElementChild.querySelector('.remove-ingredient').style.display = 'block';
    }
};

newIngredientHighlight = function (ingredient) {
    const timestampClass = 'ingredient-added-at-' + new Date().getTime();
    const highlightClass = 'add-ingredient-highlight';
    const ingredientClasses = timestampClass + ' ' + highlightClass;
    ingredient.className += ingredient.className ? ' ' + ingredientClasses : ingredientClasses;
    setTimeout(function () {
        let elements = document.getElementsByClassName(timestampClass);
        [].forEach.call(elements, function(el) {
            el.classList.remove(highlightClass);
            el.classList.remove(timestampClass);
        });
    }, 3000);
};

addNewIngredient = function (ingredient = null) {
    let clone = document.getElementById('new_ingredient').firstElementChild.cloneNode(true);
    if (ingredient) {
        clone.querySelector('.product-id').value = ingredient.product.id;
        clone.querySelector('.product-name').value = ingredient.product.name;
        clone.querySelector('.product-caloricity').value = ingredient.product.caloricity;
        clone.querySelector('.ingredient-weight').value = ingredient.weight;
    }
    document.getElementById('ingredients').appendChild(clone);
    newIngredientHighlight(clone);
    adjustFirstIngredientRemoveAbility();
};

document.addEventListener('turbolinks:load', function () {
    const controller = document.body.getAttribute('data-controller');
    const action = document.body.getAttribute('data-action');
    if (controller === 'recipe' && (action === 'new' || action === 'edit')) {
        document.getElementById('add_new_ingredient').addEventListener('click', () => addNewIngredient());
    }
});