class Question
  include Mongoid::Document
  include Mongoid::Timestamps
  field :queId, type: String
  field :queTxt, type: String
  field :view, type: String
  field :factor, type: String
  field :queHint, type: String
  field :queNo, type: Integer
  field :queOption, type: Array
  field :queWeight, type: Array
  field :hasMultipart, type: Array

  def self.getques()
    @data= mongo_client.use($da_path).database
    @collection=@data.collection('questions')
    @collection.find().sort({"queNo" => 1}).to_a
  end
end
