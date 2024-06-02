class Impact
  include Mongoid::Document
  field :impact_id,  type: String
  field :industry, type: String
  field :function, type: String
  field :environment_perspective, type: Integer
  field :employee_perspective, type: Integer
  field :internal_business_processes_perspective, type: Integer
  field :customer_perspective, type: Integer
  field :suppliers__partners_perspective, type: Integer
  validates_uniqueness_of :impact_id, :message => "Same Id"

end
