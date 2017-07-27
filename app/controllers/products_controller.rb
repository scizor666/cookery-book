class ProductsController < ApplicationController
  def index
    @products = if params[:search_phrase]
                  Product.search(params[:search_phrase]).order('created_at DESC').limit(100)
                else
                  Product.all.order('created_at DESC').limit(100)
                end
    respond_to do |format|
      format.json { render json: @products }
    end
  end
end
