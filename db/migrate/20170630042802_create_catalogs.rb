class CreateCatalogs < ActiveRecord::Migration[5.1]
  def change
    create_table :catalogs do |t|
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
