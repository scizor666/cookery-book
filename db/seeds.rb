# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# users

params = { name: 'Ivan Ivanov', email: 'test@test.test', password: 'qwerty',
           password_confirmation: 'qwerty', admin: true }
user = User.create(params)
user.catalog = Catalog.create!(user: user)
user.save!

# catalogs

catalog = user.catalog

# products for ingredients

carrot = Product.find_or_initialize_by(name: 'carrot')
carrot.caloricity = 44
carrot.save!

chicken = Product.find_or_initialize_by(name: 'chicken')
chicken.caloricity = 107.7
chicken.save!

# pilov recipe
pilov = Recipe.find_or_initialize_by(name: 'pilov')
pilov.caloricity = 127.7
pilov.catalog = catalog
pilov.save!

chicken_for_pilov = Ingredient.find_or_initialize_by(weight: 300)
chicken_for_pilov.product = chicken
chicken_for_pilov.recipe = pilov
chicken_for_pilov.save!

carrot_for_pilov = Ingredient.find_or_initialize_by(weight: 155)
carrot_for_pilov.product = carrot
carrot_for_pilov.recipe = pilov
carrot_for_pilov.save!

# pizza recipe
pizza = Recipe.find_or_initialize_by(name: 'pizza')
pizza.caloricity = 127.7
pizza.catalog = catalog
pizza.save!

carrot_for_pizza = Ingredient.find_or_initialize_by(weight: 55)
carrot_for_pizza.product = carrot
carrot_for_pizza.recipe = pizza
carrot_for_pizza.save!

chicken_for_pizza = Ingredient.find_or_initialize_by(weight: 256)
chicken_for_pizza.product = chicken
chicken_for_pizza.recipe = pizza
chicken_for_pizza.save!