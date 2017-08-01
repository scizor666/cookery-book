class AddImageUrlToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :image_url, :string
  end
end
