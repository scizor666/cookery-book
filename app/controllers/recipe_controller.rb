class RecipeController < ApplicationController
  before_action :set_recipe, only: %i[show edit update destroy]
  before_action :set_user, only: %i[show edit update destroy]
  before_action :correct_user, except: %i[new create]

  def new
    @recipe = Recipe.new
    2.times do
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
    @recipe = Recipe.new(recipe_params)
    @recipe.catalog = current_user.catalog
    respond_to do |format|
      if @recipe.save # TODO: logic above should be reviewed
        format.html { redirect_to @recipe.catalog, notice: 'Recipe was successfully created.' }
        format.json { render :show, status: :created, location: @recipe.catalog }
      else
        format.html { render :new }
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  # GET /recipe/1/edit
  def edit; end

  # PATCH/PUT /recipe/1
  # PATCH/PUT /recipe/1.json
  def update
    respond_to do |format|
      if @recipe.update(recipe_params)
        format.html { redirect_to @recipe, notice: 'Recipe was successfully updated.' }
        format.json { render :show, status: :ok, location: @recipe }
      else
        format.html { render :edit }
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /recipe/1
  # DELETE /recipe/1.json
  def destroy
    @recipe.destroy
    respond_to do |format|
      format.html { redirect_to @recipe.catalog, notice: 'Recipe was successfully removed.' }
      format.json { head :no_content }
    end
  end

  def recipe_params
    recipe_params = params.require(:recipe).permit(:name, :id, :description, :short_description,
                                                   { ingredient: %i[id weight] },
                                                   product: %i[id name caloricity])
    ingredients = combine_ingredients recipe_params.to_h
    { short_description: recipe_params[:short_description], description: recipe_params[:description],
      name: recipe_params[:name], ingredients: ingredients, caloricity: caloricity(ingredients) }
  end

  private

  # TODO: update logic, probably something wrong with data format or even with model
  def combine_ingredients(params)
    params[:ingredient].each_with_index.with_object([]) do |(ingredient_params, i), ingredients|
      if ingredient_params.size == 2 # edit path
        ingredient = updated_ingredient(ingredient_params, params)
      else # new path
        next unless ingredient_params[:weight].present? && params[:product][i].present? &&
                    params[:product][i][:caloricity].present?
        product = Product.new(params[:product][i])
        ingredient = Ingredient.new(ingredient_params)
        ingredient.product = product
      end
      ingredients << ingredient
    end
  end

  def updated_ingredient(ingredient_params, params)
    ingredient_id = ingredient_params.shift
    ingredient_weight = ingredient_params.shift[:weight]
    ingredient = @recipe.ingredients.find_by(id: ingredient_id)
    if ingredient # edit existent ingredient
      ingredient.weight = ingredient_weight
      ingredient.product.attributes = params[:product][ingredient.product_id.to_s]
    else # add new ingredient when edit
      product = Product.new(params[:product][ingredient_id])
      ingredient = Ingredient.new
      ingredient.weight = ingredient_weight
      ingredient.product = product
    end
    ingredient
  end

  def set_recipe
    @recipe = Recipe.find_by(id: params[:id])
  end

  def set_user
    @user = @recipe && @recipe.catalog.user
  end

  def caloricity(ingredients)
    result = ingredients.each.with_object(weight: 0, caloricity: 0) do |i, total|
      total[:weight] += i.weight
      total[:caloricity] += i.weight * i.product.caloricity
    end
    (result[:caloricity] / result[:weight]).round(2)
  end
end
