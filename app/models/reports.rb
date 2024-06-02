class Reports
  include Mongoid::Document
  include Mongoid::Timestamps
  @@data= mongo_client.use($da_path).database
  @@collection=@@data.collection('users')

  def self.checkFilter1(role, industry, company, mod)
    if role.include?("CALL CENTRE")
      role="CUSTOMER CARE - CALL CENTRE"
    end
    @resultArray=Array.new
    case mod
      when 'company'
        @resultArray= @@collection.
            aggregate([{"$match" => {"Company" => company}}, {"$project" => {Level: 1, Salary: 1}}, {"$sort" => {"Level": 1}}]).to_a

      when 'roleIndustry'
        @resultArray= @@collection.
            aggregate([{"$match" => {"$and" => [{"Industry" => industry}, {"Role" => role}]}}, {"$project" => {Level: 1, Salary: 1}}, {"$sort" => {"Level": 1}}]).to_a

      when 'role'
        @resultArray= @@collection.
            aggregate([{"$match" => {"Role" => role}}, {"$project" => {Level: 1, Salary: 1}}, {"$sort" => {"Level": 1}}]).to_a
      when 'industry'
        @resultArray= @@collection.
            aggregate([{"$match" => {"Industry" => industry}}, {"$project" => {Level: 1, Salary: 1}}, {"$sort" => {"Level": 1}}]).to_a
    end
    return @resultArray
  end

  def self.checkFilter2(role, industry, company, mod)
    if role.include?("CALL CENTRE")
      role="CUSTOMER CARE - CALL CENTRE"
    end
    @resultArray=Array.new
    case mod
      when 'company'
        @resultArray= @@collection.
            aggregate([{'$match' => {"$and" => [{"Company" => company}, {"Industry" => industry}, {"Role" => role}]}},
                       {"$group" => {"_id" => {level: '$Level'}, count: {"$sum" => 1}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level" => -1}}]).to_a

      when 'roleIndustry'
        @resultArray= @@collection
                          .aggregate([{'$match' => {"$and" => [{"Industry" => industry}, {"Role" => role}]}},
                                      {"$group" => {"_id" => {level: '$Level'}, count: {"$sum" => 1}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level" => -1}}]).to_a

      when 'role'
        @resultArray= @@collection
                          .aggregate([{'$match' => {"$and" => [{"Role" => role}]}},
                                      {"$group" => {"_id" => {level: '$Level'}, count: {"$sum" => 1}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level" => -1}}]).to_a
      when 'industry'
        @resultArray= @@collection
                          .aggregate([{'$match' => {"$and" => [{"Industry" => industry}]}},
                                      {"$group" => {"_id" => {level: '$Level'}, count: {"$sum" => 1}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level" => -1}}]).to_a
    end
  end

  def self.FindGraphValues(role, industry, company, level)

    @collection=''
    if role.include?("CALL CENTRE")
      role="CUSTOMER CARE - CALL CENTRE"
    end
    @resultArray=Array.new
    @availableChartData=Hash.new


    @collection=@@data.collection('FunGroupValues')
    @resultArray= @collection.
        aggregate([{"$match" => {"$and" => [{"Function" => role}, {"Level" => level}]}}]).to_a

    if @resultArray.length>0
      @availableChartData["FunGroup"]={data: JSON.parse(@resultArray[0]["Values"]), type: @resultArray[0]["Type"], group: @resultArray[0]["FunctionGroup"].to_s.gsub('[', '').gsub(']', '').split(',')}
    end


    @resultArray=Array.new
    @collection=@@data.collection('IndGroupValues')
    @resultArray= @collection.
        aggregate([{"$match" => {"$and" => [{"Industry" => industry}, {"Level" => level}]}}]).to_a

    if @resultArray.length>0
      @availableChartData["IndGroup"]={data: JSON.parse(@resultArray[0]["Values"]), type: @resultArray[0]["Type"], group: @resultArray[0]["IndustriesGroup"].to_s.gsub('[', '').gsub(']', '').split(',')}
    end
    @resultArray=Array.new


    @collection=@@data.collection('ComFnInValues')
    @resultArray= @collection.
        aggregate([{"$match" => {"$and" => [{"Company" => company}, {"Industry" => industry}, {"Role" => role}, {"Level" => level}]}}]).to_a

    if @resultArray.length>0
      @availableChartData["Company"]={data: JSON.parse(@resultArray[0]["Values"]), type: @resultArray[0]["Type"]}
    end

    @resultArray=Array.new

    @collection=@@data.collection('FnInValues')
    @resultArray= @collection.
        aggregate([{"$match" => {"$and" => [{"Industry" => industry}, {"Role" => role}, {"Level" => level}]}}]).to_a
    if @resultArray.length>0
      @availableChartData["FunInd"]={data: JSON.parse(@resultArray[0]["Values"]), type: @resultArray[0]["Type"]}
    end
    @resultArray=Array.new

    @collection=@@data.collection('FunValues')

    @resultArray= @collection.
        aggregate([{"$match" => {"$and" => [{"Function" => role}, {"Level" => level}]}}]).to_a
    if @resultArray.length>0
      @availableChartData["Fun"]={data: JSON.parse(@resultArray[0]["Values"]), type: @resultArray[0]["Type"]}
    end

    @resultArray=Array.new
    @collection=@@data.collection('InValues')
    @resultArray= @collection.
        aggregate([{"$match" => {"$and" => [{"Industry" => industry}, {"Level" => level}]}}]).to_a
    if @resultArray.length>0
      @availableChartData["Ind"]={data: JSON.parse(@resultArray[0]["Values"]), type: @resultArray[0]["Type"]}
    end

    return @availableChartData

  end

  def self.getCompensation(start, endindex, industry, role, company, level, mod)

    @data= mongo_client.use($da_path).database
    @collection=@data.collection('users')
    if role.include?("CALL CENTRE")
      role="CUSTOMER CARE - CALL CENTRE"
    end
    @resultArray=Array.new
    @x=role.gsub("'", '').strip
    case mod
      when 'roleGroup'
        @resultArray= @collection.
            aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {Level: {"$lt" => endindex}}, {"Role" => @x}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

      when 'industryGroup'
        @resultArray= @collection.
            aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {Level: {"$lt" => endindex}}, {"Industry" => industry}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

      when 'company'
        @resultArray= @collection.
            aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {Level: {"$lt" => endindex}}, {"Industry" => industry}, {"Role" => role}, {"Company" => company}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

      when 'roleIndustry'
        @resultArray= @collection.
            aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {Level: {"$lt" => endindex}}, {"Industry" => industry}, {"Role" => role}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

      when 'role'
        @resultArray= @collection.
            aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {Level: {"$lt" => endindex}}, {"Role" => role}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

      when 'industry'
        @resultArray= @collection.
            aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {Level: {"$lt" => endindex}}, {"Industry" => industry}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    end
    return @resultArray
  end

  def self.getText(collection, key)
    @text = ""
    puts collection
    puts key
    @data= mongo_client.use($da_path).database
    @collection=@data.collection(collection)

    @text = @collection.find({"Key" => key}).to_a
    return @text[0]
  end


end