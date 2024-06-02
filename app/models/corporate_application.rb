class CorporateApplication
  include Mongoid::Document
  include Mongoid::Timestamps
  field 'roleid', type: String
  field 'app_id', type: String
  field 'Name', type: String
  field 'Email', type: String
  field 'Phone', type: Integer
  field 'Degree', type: Array
  field 'Degree1', type: String
  field 'Degree2', type: String
  field 'Institutions', type: Array
  field 'Institutions1', type: String
  field 'Institutions2', type: String
  field 'Year_of_experience', type: Float
  field 'Technical_skills', type: Array
  field 'Designation', type: String
  field 'Company', type: String
  field 'Industry', type: String
  field 'Function', type: String
  field 'Department', type: String
  field 'Salary', type: Float
  field 'customers', type: String
  field 'Revenue', type: Float
  field 'Employees', type: Float
  field 'level', type: String
  field 'Questions', type: Hash
  field 'Resume', type: Array
  field 'que_optional', type: Hash
  field 'role_name', type: String
  field 'resume_id', type: String
  field 'isread', type: Boolean
  field 'token', type: String


  before_save :send_app_id


  def get_app(email)
    @data= mongo_client.use($da_path).database
    @collection=@data.collection('corporate_applications')
    @collection.find({:Email=>email}, { :projection => {:_id => 0, :roleid => 1}}).sort({"queNo" => 1}).to_a
  end

  protected

  def send_app_id
    @roleid=self.roleid
    role = CorporateRole.find_by(:role_id => self.roleid)
    role['responses']=role['responses'].uniq
    if !role['responses'].include?(self.app_id)
    role.push(responses: self.app_id)
    end
    role.save
    c_id=role['company_id']
    company = CorporateCompany.find_by(:company_id =>c_id )
    company['responses']=company['responses'].uniq
    if !company['responses'].include?(self.app_id)
    company.push(responses: self.app_id)
    end
    company.save
  end



end
