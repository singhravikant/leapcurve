class CorporateNewRolePart1
  include Mongoid::Document
  include Mongoid::Timestamps
  field :role_designation, type: String
  field :role_industry, type: String
  field :role_function, type: String
  field :dep_sub_fun, type: String
  field :min_salary, type: Float
  field :max_salary, type: Float
  field :seniority, type: String
end
