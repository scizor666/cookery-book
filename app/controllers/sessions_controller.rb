class SessionsController < ApplicationController
  skip_before_action :authenticate!

  def new
    if logged_in?
      redirect_to current_user.catalog
    else
      fallback_index
    end
  end

  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session][:password])
      log_in @user
      params[:session][:remember_me] == '1' ? remember(@user) : forget(@user)
      redirect_back_or @user.catalog
    else
      flash.now[:danger] = 'Invalid email/password combination'
      fallback_index
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_path
  end
end
