class GuestUser
  include Mongoid::Document
  include Mongoid::Timestamps
  field :Score, type: Integer
  field :Role, type: String
  field :Salary, type: Float ,default: 0
  field :Company, type: String
  field :Experience, type: Intege
  field :Education, type: String
  field :Level, type: Integer,default: 0
  field :EffectiveLevel, type: Integer , default: 0
  field :UserChoices, type: Array
  field :CompanyDetails, type: Array
  field :Industry, type: String
  field :Institute, type: String

end
