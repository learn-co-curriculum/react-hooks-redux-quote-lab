class ApplicationController < ActionController::Base
  before_action :authenticate_user

  def authenticate_user
    render json: {response: 'unauthenticated user'} unless logged_in?
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @auth ||= request.env["HTTP_AUTHORIZATION"]
    # {user_id: 1}
    @current_user ||= User.find(Auth.decode(@auth)[:user_id])
  end
end


# fetch('http://localhost:3000/users', {method: 'POST', body: JSON.stringify({name: 'foobar'}), headers: {
    #     'Accept': 'application/json, text/plain, */*',
    #     'Content-Type': 'application/json'
    # }}).then()

    # "eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJ1c2VyX2lkIjpudWxsfQ."

  #   fetch('http://localhost:3000/users', {
  #    method: 'get',
  #    headers: {
  #      'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJ1c2VyX2lkIjpudWxsfQ."
  #    }
  #  });
