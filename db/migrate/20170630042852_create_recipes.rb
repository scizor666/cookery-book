class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :name
      t.float :caloricity
      t.references :catalog, foreign_key: true

      t.timestamps
    end
  end
end
