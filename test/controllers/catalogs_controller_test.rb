require 'test_helper'

class CatalogsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @catalog = catalogs(:one)
  end

  test "should get index" do
    get catalogs_url
    assert_response :success
  end

  test "should get new" do
    get new_catalog_url
    assert_response :success
  end

  test "should create catalog" do
    assert_difference('Catalog.count') do
      post catalogs_url, params: { catalog: {  } }
    end

    assert_redirected_to catalog_url(Catalog.last)
  end

  test "should show catalog" do
    get catalog_url(@catalog)
    assert_response :success
  end

  test "should get edit" do
    get edit_catalog_url(@catalog)
    assert_response :success
  end

  test "should update catalog" do
    patch catalog_url(@catalog), params: { catalog: {  } }
    assert_redirected_to catalog_url(@catalog)
  end

  test "should destroy catalog" do
    assert_difference('Catalog.count', -1) do
      delete catalog_url(@catalog)
    end

    assert_redirected_to catalogs_url
  end
end
