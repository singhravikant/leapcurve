class UserGuest
  include Mongoid::Document
  include Mongoid::Timestamps
  # field :Score, type: Integer
  # field :Role, type: String
  # field :Salary, type: Float ,default: 0
  # field :Company, type: String
  # field :Experience, type: Integer
  # field :Education, type: String
  # field :Level, type: Integer,default: 0
  # field :EffectiveLevel, type: Integer , default: 0
  # field :UserChoices, type: Array
  # field :CompanyDetails, type: Array
  # field :Industry, type: String
  # field :Institute, type: String



  field :Name, type: String
  field :Email, type: String
  field :Contact, type: String
  field :Score, type: Integer
  field :Role, type: String
  field :Salary, type: Float, default: 0
  field :Company, type: String
  field :Experience, type: Float
  field :ClickMode, type: String
  field :Password, type: String
  field :Education, type: String
  field :Level, type: Integer, default: 0
  field :EffectiveLevel, type: Integer, default: 0
  field :UserChoices, type: Array
  field :Preference, type: Array
  field :CompanyDetails, type: Array
  field :Industry, type: String
  field :Designation, type: String
  field :Institute, type: String
  # field :userlevelvalue, type: Array
  field :selectedopt, type: Array
  # field :Role, type: String
  field :Token, type: String
  field :resolvData, type: Hash
  field :reportValues, type: Hash
  field :growthValues, type: Hash
  field :token, type: String

end
