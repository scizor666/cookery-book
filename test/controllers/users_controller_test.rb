require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:user_1)
    login(@user.email, 'qwerty') # TODO: remove hardcode
  end

  test 'should get index' do
    get users_url
    assert_response :success
  end

  test 'should get new' do
    get new_user_url
    assert_response :success
  end

  test 'should create user' do
    assert_difference('User.count') do
      post users_url, params: { user: { name: @user.name,
                                        email: "#{@user.email}a",
                                        password: 'Password1',
                                        password_confirmation: 'Password1' } }
    end

    assert_redirected_to catalog_url(Catalog.last)
  end

  test 'should show user' do
    get user_url(@user)
    assert_response :success
  end

  test 'should get edit' do
    get edit_user_url(@user)
    assert_response :success
  end

  test 'should update user' do
    patch user_url(@user), params: { user: { name: "#{@user.name}qwerty",
                                             email: "#{@user.email}b",
                                             password: 'Password1',
                                             password_confirmation: 'Password1' } }
    assert_redirected_to user_url(@user)
  end

  test 'should destroy user' do
    assert_difference('User.count', -1) do
      delete user_url(@user)
    end

    assert_redirected_to users_url
  end

  %w[Short1 noDigit no1uppercase NO1LOWERCASE].each do |password|
    test "should not create with password #{password}" do
      assert_no_difference('User.count') do
        post users_url, params: { user: { name: @user.name,
                                          email: "#{@user.email}c",
                                          password: password,
                                          password_confirmation: password } }
      end
    end
  end
end
