require 'test_helper'

class RecipeControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe = recipes(:recipe_1)
    login(@recipe.catalog.user.email, 'qwerty') # TODO: remove hardcode
  end

  test 'should get show' do
    get recipe_url(id: @recipe.id)
    assert_response :success
  end

  test 'should get new' do
    get new_recipe_url
    assert_response :success
  end
end
