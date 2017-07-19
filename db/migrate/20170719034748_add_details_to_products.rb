class AddDetailsToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :description, :string
    add_column :recipes, :short_description, :string
  end
end
