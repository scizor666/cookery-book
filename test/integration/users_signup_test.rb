require 'test_helper'

class UsersSignUpTest < ActionDispatch::IntegrationTest
  test 'valid sign up information' do
    get new_user_url
    assert_difference 'User.count', 1 do
      post users_path, params: { user: { name: 'Example User',
                                         email: 'user@example.com',
                                         password: 'Password1',
                                         password_confirmation: 'Password1' } }
    end
    follow_redirect!
    assert_template 'catalogs/show'
    assert_select 'a[href=?]', logout_path
  end
end
