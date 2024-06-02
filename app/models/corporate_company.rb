class CorporateCompany
  include Mongoid::Document
  include Mongoid::Timestamps
  field :email, type: String
  # validates :email, uniqueness: { scope: :email }
  field :company_id, type: String
  field :company_name, type: String
  field :no_of_employees, type: Integer
  field :revenue, type: Float
  field :industry, type: String
  field :geographical_Spread, type: String
  field :master, type: Hash
  field :users, type: Hash
  field :departments, type: Array
  field :functions, type: Array
  field :roles, type: Hash
  field :technical_skills, type: String
  field :candidates, type: Hash
  field :responses, type: Array
  field :members, type: Hash

  def self.getCompanies()
    @data= mongo_client.use($da_path).database
    @collection=@data.collection('corporate_companies',)
    @collection.find({},{ :projection => {:_id => 0, :company_name => 1,:users=>1} }).to_a
  end
end
