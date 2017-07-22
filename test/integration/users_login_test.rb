require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:user_1)
  end

  test 'login with invalid information' do
    get login_path
    assert_template 'sessions/new'
    post login_path, params: { session: { email: '', password: '' } }
    assert_template 'sessions/new'
    assert_not flash.empty?
    get root_path
    assert flash.empty?
  end

  test 'login with valid information' do
    get login_path
    post login_path, params: { session: { email:    @user.email,
                                          password: 'qwerty' } }
    assert_redirected_to @user.catalog
    follow_redirect!
    assert_template 'catalogs/show'
    assert_select 'a[href=?]', logout_path
  end
end
