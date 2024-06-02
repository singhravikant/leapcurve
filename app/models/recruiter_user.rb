require 'bcrypt'
class RecruiterUser
  include Mongoid::Document
    include Mongoid::Timestamps
    include BCrypt
    field :user_id, type: String
    field :user_first_name, type: String
    field :user_last_name, type: String
    field :master, type: Mongoid::Boolean
    field :add_permissions_all, type: Mongoid::Boolean
    field :update_permissions_all, type: Mongoid::Boolean
    field :delete_permission_all, type: Mongoid::Boolean
    field :add_permissions_selective, type: Hash
    field :update_permissions_selective, type: Hash
    field :delete_permission_selective, type: Hash
    field :department, type: String
    field :function, type: String
    field :designation, type: String
    field :company_id, type: String
    field :password, type: String
    field :email, type: String
    field :members, type: Hash
    field :usertype, type: String
    field :forgot_token, type: String
    validates_uniqueness_of :email, :message => "Email Address Already In Use. Have You Forgot Your Password?"

    before_save :encrypt_password


    def self.find_by_email(email)
      begin
        find_by({email: email})
      rescue Exception => ex
        puts ex.message
      end
    end

    def self.authenticate(email, password)
      if password_correct?(email, password)
        # Success!
        true
      else
        # Failed! :(
        false
      end
    end


    def self.password_correct?(user_email, password)
      user = find_by_email user_email
      return if user.nil?
      user_pass = Password.new(user.password)
      user_pass == password
    end

    protected

    def encrypt_password
      begin
        email = self['email']
        data = RecruiterUser.find_by(:email=> email)
        if (data.nil? )||!self['password'].nil?&&(data['password']!= self['password'] )
          self.password = Password.create(self['password'])
        else
          self.password = data['password']
        end
      rescue Exception => ex
        ex.message
      end
    end

end
