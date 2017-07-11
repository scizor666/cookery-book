class RecipeController < ApplicationController
  def new
    @recipe = Recipe.new
    5.times do
      ingredient = Ingredient.new
      ingredient.product = Product.new
      @recipe.ingredients << ingredient
    end
    @recipe
  end

  def show
    @recipe = Recipe.find_by(id: params[:id])
  end

  def create
    params = recipe_params
    ingredients = params[:product].each_with_index.with_object([]) do |(product_params, i), ingredients|
      next unless product_params[:name].present? &&
                  product_params[:caloricity].present? && params[:ingredient][i][:weight].present?
      product = Product.new(product_params)
      ingredient = Ingredient.new(params[:ingredient][i])
      ingredient.product = product
      ingredients << ingredient
    end
    @recipe = Recipe.new(name: params[:name], ingredients: ingredients, caloricity: caloricity(ingredients))
    @recipe.catalog = current_user.catalog
    respond_to do |format|
      if @recipe.save # TODO logic above should be reviewed
        format.html { redirect_to @recipe.catalog, notice: 'Recipe was successfully created.' }
        format.json { render :show, status: :created, location: @recipe.catalog }
      else
        format.html { render :new }
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  def recipe_params
    params.require(:recipe).permit(:name,
                                   { ingredient: :weight },
                                   { product: %i(name caloricity) })
  end

  def default_catalog
    Catalog.find_by(id: 1)
  end

  private

  def caloricity(ingredients)
    result = ingredients.each.with_object(weight: 0, caloricity: 0) do |i, total|
      total[:weight] += i.weight
      total[:caloricity] += i.weight * i.product.caloricity
    end
    (result[:caloricity] / result[:weight]).round(2)
  end
end
