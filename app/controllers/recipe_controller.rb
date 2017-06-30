class RecipeController < ApplicationController

  # GET /recipe/1
  # GET /recipe/1.json
  def show
    @recipe = Recipe.find_by(id: params[:id])
  end

  def create
  end
end
