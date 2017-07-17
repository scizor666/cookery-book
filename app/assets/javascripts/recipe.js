removeChoice = function (element) {
    return element.parent().parent().parent().remove();
};

document.addEventListener('turbolinks:load', () => {
    const controller = document.body.getAttribute('data-controller');
    const action = document.body.getAttribute('data-action');
    if (controller === 'recipe' && (action === 'new' || action === 'edit')) {
        document.getElementById('add_new_ingredient').addEventListener('click', () => {
            const clone = document.getElementById('new_ingredient').firstElementChild.cloneNode(true);
            document.getElementById('ingredients').appendChild(clone);
        });
    }
});