class Recipe < ApplicationRecord
  belongs_to :catalog
  has_many :ingredients
end
