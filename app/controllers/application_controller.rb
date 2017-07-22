class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate!, except: %i[new create]
  include SessionsHelper

  private

  def admin_user
    redirect_to(root_url) unless current_user_admin?
  end

  def correct_user
    redirect_to(root_url) if !current_user?(@user) && !current_user_admin?
  end

  def authenticate!
    return if logged_in?
    store_location
    flash[:danger] = 'Please log in.'
    redirect_to login_url
  end
end
