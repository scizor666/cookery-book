export const ingredients = [
    {
        weight: 300,
        id: 1,
        product: {
            id: 2,
            name: 'chicken',
            caloricity: 107.7
        }
    },
    {
        weight: 155,
        id: 2,
        product: {
            id: 1,
            name: 'carrot',
            caloricity: 44
        },
    }];

export const recipe = {
    id: 100,
    catalog_id: 500,
    name: 'product name here',
    description: 'product description here',
    short_description: 'short product description here',
    caloricity: 666,
    image_url: 'http://some.test.url/with_image.png',
    ingredients: ingredients
};