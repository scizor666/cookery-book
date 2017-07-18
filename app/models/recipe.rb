class Recipe < ApplicationRecord
  belongs_to :catalog
  has_many :ingredients, autosave: true, dependent: :destroy
end
