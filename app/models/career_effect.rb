class CareerEffect
  include Mongoid::Document
  include Mongoid::Timestamps
  field :Company, type: String
  field :Industry, type: String
  field :Role, type: String
  field :Effects, type: Array

end
