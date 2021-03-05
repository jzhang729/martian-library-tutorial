module ApplicationCable
  class Channel < ActionCable::Channel::Base
    identified_by :current_user

    def connect
      self.current_user = current_user
    end

    private

    def current_user
      token = request.params[:token].to_s
      email = Base64.decode(token)
      User.find_by(email: email)
    end
    
  end
end
