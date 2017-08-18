require 'test_helper'

class RecipeControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe = recipes(:recipe_1)
    login(@recipe.catalog.user.email, 'qwerty') # TODO: remove hardcode
  end

  test 'should get show' do
    get catalog_recipe_url(@recipe.catalog, @recipe)
    assert_response :success
  end

  test 'should get new' do
    get new_catalog_recipe_url(@recipe.catalog)
    assert_response :success
  end
end
