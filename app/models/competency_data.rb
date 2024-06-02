class CompetencyData
  include Mongoid::Document
  field :industry, type: String
  field :function, type: String
  field :managment_level, type: Array
  field :competency_name, type: String
  field :competency_description, type: String
  field :level, type: Integer
  field :brief_level_description, type: String
  field :competency_level_description, type: String
  field :career_level_mapper, type: Integer
  field :knowledge_elements_required, type: String
end