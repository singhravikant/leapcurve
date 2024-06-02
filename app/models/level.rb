class Level
  include Mongoid::Document
  field :level, type: Integer
  field :Min, type: Integer
  field :Max, type: Integer
  def self.getMyLevel(score)
    @data= mongo_client.use($da_path).database
    @collection=@data.collection('level1')
   @mylvl=@collection.find({"Max" => {"$lt" => score}}).to_a
   
   if @mylvl.length>0
      @i=@mylvl.last()["level"]+1
    else
      @i=0
    end
  end
  def self.getAlllevels
    @data= mongo_client.use($da_path).database
    @collection=@data.collection('level1')
    @mylvl=@collection.find({},{"level"=>1,"_id"=>0}).to_a
    if @mylvl.length>0
      @i=@mylvl
    else
      @i=[]
    end  end
end