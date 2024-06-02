class CorporateRole
  include Mongoid::Document
  include Mongoid::Timestamps
  field :min_experience, type: Float
  field :max_experience, type: Float
  field :role_degree, type: Array
  field :role_degree1, type: String
  field :role_degree2, type: String
  field :role_colleges, type: Array
  field :role_colleges1, type: String
  field :role_colleges2, type: String
  field :role_technical, type: Array
  field :role_keyword, type: Array
  field :role_deadline, type: Date
  field :email,type:String
  field :questions,type:Hash
  field :role_designation, type: String
  field :role_id, type: String
  field :role_industry, type: String
  field :role_function, type: String
  field :dep_sub_fun, type: String
  field :min_salary, type: Float
  field :max_salary, type: Float
  field :seniority, type: String
  field :responses, type: Array
  field :created_by, type: String
  field :partial, type: String
  field :que_optional, type: Hash
  field :company_id, type: String
  field :company_name, type: String
  field :cl_data, type: Array

  def self.getroles()
    @data= mongo_client.use($da_path).database
    @collection=@data.collection('corporate_roles')
    @collection.find().to_a
  end
end
