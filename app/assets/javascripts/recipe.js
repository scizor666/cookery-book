removeIngredient = function (element) {
    return element.parent().parent().parent().remove();
};

document.addEventListener('turbolinks:load', function() {
    const controller = document.body.getAttribute('data-controller');
    const action = document.body.getAttribute('data-action');
    if (controller === 'recipe' && (action === 'new' || action === 'edit')) {
        document.getElementById('add_new_ingredient').addEventListener('click', function() {
            var clone = document.getElementById('new_ingredient').firstElementChild.cloneNode(true);
            if(action === 'edit') {
                var tmp = document.createElement("div");
                tmp.appendChild(clone);
                const regexp = new RegExp('new_ingredient_id', 'g');
                const newId = new Date().getTime();
                tmp.innerHTML = tmp.innerHTML.replace(regexp, newId);
                clone = tmp.firstElementChild;
            }
            document.getElementById('ingredients').appendChild(clone);
        });
    }
});