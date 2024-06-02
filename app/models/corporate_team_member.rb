class CorporateTeamMember
  include Mongoid::Document
  include Mongoid::Timestamps
  field :member_id, type: String
  field :token, type: String
  field :first_name, type: String
  field :last_name, type: String
  field :email, type: String
  field :access_permission, type: String
end
