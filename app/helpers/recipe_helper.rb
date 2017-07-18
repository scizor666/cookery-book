module RecipeHelper
  def dummy_ingredient
    Ingredient.new(product: Product.new)
  end
end
