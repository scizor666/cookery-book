class SessionsController < ApplicationController
  def new
    if logged_in?
      redirect_to current_user.catalog
    else
      render :new
    end
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      redirect_to user.catalog
    else
      flash[:danger] = 'Invalid email/password combination' # TODO replace
      render :new
    end
  end

  def destroy
    reset_session
    @current_user = nil
    redirect_to root_path
  end
end
