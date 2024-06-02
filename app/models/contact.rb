class Contact
  include Mongoid::Document
  include Mongoid::Timestamps
  field :date, type: String
  field :Username, type: String
  field :Email, type: String
  field :comment, type: String
end
