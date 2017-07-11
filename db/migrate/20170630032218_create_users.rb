class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false, index: true, unique: true
      t.string :password_digest, null: false

      t.timestamps null: false
    end
  end
end
