class CorporateInviteMember
  include Mongoid::Document
  include Mongoid::Timestamps
  field :member_id, type: String
  field :first_name, type: String
  field :last_name, type: String
  field :email, type: String
  field :designation, type: String
  field :password, type: String
end
