class Product < ApplicationRecord
  has_many :ingredients, autosave: true

  def self.search(search)
    where('name LIKE ? ', "%#{search}%")
  end
end
