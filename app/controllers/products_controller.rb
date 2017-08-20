class ProductsController < ApplicationController
  SEARCH_RESULTS_LIMIT = 10

  def index
    @products = if params[:search_phrase]
                  Product.search(params[:search_phrase]).order('name ASC').limit(SEARCH_RESULTS_LIMIT)
                else
                  Product.all.order('name ASC').limit(SEARCH_RESULTS_LIMIT)
                end
    respond_to do |format|
      format.json { render json: @products }
    end
  end
end
