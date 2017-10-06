json.merge! recipe.attributes
json.catalog recipe.catalog
json.ingredients recipe.ingredients.each do |ingredient|
  json.merge! ingredient.attributes
  json.product ingredient.product
end
json.url catalog_recipe_url(recipe.catalog, recipe, format: :json)
