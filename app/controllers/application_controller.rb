class ApplicationController < ActionController::Base
  private
  def current_user
    token = request.headers["Authorization"].to_s
    email = Base64.decode64(token)
    # TODO: Stop defaulting to the first user
    User.find_by(email: email) || User.first
  end
end
