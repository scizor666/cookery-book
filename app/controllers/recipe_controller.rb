class RecipeController < ApplicationController
  before_action :set_catalog, except: %i[new create]
  before_action :set_recipe, only: %i[show edit update destroy]
  before_action :set_user, except: %i[new create]
  before_action :correct_user, except: %i[new create]

  def index
    page = params[:page].to_i
    @recipes = Recipe.where(catalog_id: params[:catalog_id])
                     .order(created_at: :desc).offset(9 * page).limit(9)
  end

  def new
    @recipe = Recipe.new
    @recipe.ingredients << Ingredient.new.tap { |i| i.product = Product.new }
    @recipe
  end

  def show; end

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
        format.html { redirect_to [@recipe.catalog, @recipe], notice: 'Recipe was successfully updated.' }
        format.json { render :show, status: :ok, location: [@recipe.catalog, @recipe] }
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
    recipe_params = params.require(:recipe).permit(:name, :id, :description, :short_description, :image_url,
                                                   { ingredient: %i[id weight] },
                                                   product: %i[id name caloricity])
    ingredients = combine_ingredients recipe_params.to_h
    { short_description: recipe_params[:short_description], description: recipe_params[:description],
      name: recipe_params[:name], ingredients: ingredients, caloricity: caloricity(ingredients),
      image_url: recipe_params[:image_url] }
  end

  private

  def combine_ingredients(params)
    format_params! params
    params[:ingredient].each_with_index.with_object([]) do |(ingredient_params, i), ingredients|
      next unless ingredient_params[:weight].present? && params[:product][i].present? &&
                  params[:product][i][:caloricity].present?
      ingredients << combine_ingredient(ingredient_params, params, i)
    end
  end

  def combine_ingredient(ingredient_params, params, index)
    if ingredient_params[:id].present? # update ingredient
      update_ingredient(ingredient_params, params, index)
      # new ingredient
    elsif params[:product][index][:id].present? && (product = Product.find_by(id: params[:product][index][:id])) &&
          (params[:product][index].to_a - product.attributes.to_a).empty? # full prod match
      new_ingredient_with_product(ingredient_params, product)
    else
      new_ingredient(ingredient_params, params, index)
    end
  end

  def new_ingredient_with_product(ingredient_params, product)
    ingredient = Ingredient.new
    ingredient.weight = ingredient_params[:weight]
    ingredient.product = product
    ingredient
  end

  def new_ingredient(ingredient_params, params, index)
    product = Product.new(params[:product][index].reject { |k| k == 'id' })
    ingredient = Ingredient.new(ingredient_params.reject { |k| k == 'id' })
    ingredient.product = product
    ingredient
  end

  # TODO: else raise some exception
  def update_ingredient(ingredient_params, params, index)
    ingredient = @recipe.ingredients.find_by(id: ingredient_params[:id])
    return unless ingredient # edit existent ingredient
    ingredient.weight = ingredient_params[:weight]
    if (params[:product][index].to_a - ingredient.product.attributes.to_a).any?
      # new product instead of change of the old one
      ingredient.product = Product.new(params[:product][index].reject { |k| k == 'id' })
    end
    ingredient
  end

  def format_params!(params)
    params[:ingredient].each_with_index do |ingredient, i|
      ingredient_to_update = params[:ingredient][i]
      ingredient_to_update[:weight] = ingredient[:weight].to_f
      ingredient_to_update[:id] = ingredient[:id].to_i if ingredient_to_update[:id].present?
    end
    params[:product].each_with_index do |product, i|
      product_to_update = params[:product][i]
      product_to_update[:caloricity] = product[:caloricity].to_f
      product_to_update[:id] = product[:id].to_i if product_to_update[:id].present?
    end
  end

  def set_catalog
    @catalog = Catalog.find_by(id: params[:catalog_id])
  end

  def set_recipe
    @recipe = Recipe.find_by(id: params[:id])
  end

  def set_user
    @user = if params[:catalog_id] && params[:id]
              @recipe && @recipe.catalog == @catalog && @recipe.catalog.user
            else
              @catalog && @catalog.user
            end
  end

  def caloricity(ingredients)
    result = ingredients.each.with_object(weight: 0, caloricity: 0) do |i, total|
      total[:weight] += i.weight
      total[:caloricity] += i.weight * i.product.caloricity
    end
    (result[:caloricity] / result[:weight]).round(2)
  end
end
