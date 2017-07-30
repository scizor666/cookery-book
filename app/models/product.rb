class Product < ApplicationRecord
  has_many :ingredients, autosave: true
  before_save :upcase_first_name

  def self.search(search)
    where('UPPER(name) LIKE ? ', "%#{search.upcase}%")
  end

  def upcase_first_name
    self.name = name.upcase_first
  end
end
