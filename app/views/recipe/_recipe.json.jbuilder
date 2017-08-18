json.extract! recipe, :id, :catalog_id, :name, :short_description, :image_url, :created_at, :updated_at
json.url catalog_recipe_url(recipe.catalog, recipe, format: :json)
