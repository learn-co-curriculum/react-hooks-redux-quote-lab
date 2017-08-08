class UsersController < ApplicationController
  skip_before_action :authenticate_user, :only => [:create]

  def create
    # {name: 'bob', email: 'asklhsakj', password: 'sakljsalkj'}
    @user = User.create(user_params)
    token = Auth.issue(user_id: @user.id)
    # 'aslkjaslkjsalkj'
    render json: {user_id: @user.id, auth: token}
  end

  def index
    byebug
  end

  private

  def user_params
    # {user: {name: }}
    params.permit(:name, :email, :password)
  end
end
