class User
  include Mongoid::Document
  include Mongoid::Timestamps
  field :Name, type: String
  field :Email, type: String
  field :Contact, type: String
  field :Score, type: Integer
  field :Role, type: String
  field :Salary, type: Float, default: 0
  field :Company, type: String
  field :Experience, type: Integer
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

  def self.findUser(email)
    begin
      @data = mongo_client.use($da_path).database
      @collection = @data.collection('users')
      @usr = @collection.find({"Email" => email}).to_a
      return @usr
    rescue Exception => ex
      return false
    end

  end

  def self.getMatchData(company, industry, role)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('career_effects')
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    @match = @collection.find({"Company" => company, Industry: industry, Role: role}).to_a


  end

  def self.getLevelAvgSalary(industry)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @test = @collection.aggregate([{'$match' => {"Industry" => industry}},
                                   {"$group" => {"_id" => {level: '$Level'}, avgSalary: {"$sum" => "$Salary"}, count: {"$sum" => 1}}}, {"$sort" => {"_id.level": 1}}]).to_a

  end

  def self.getAvgSalaryIndustryFunction(industry, function)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    if function.include?("CALL CENTRE")
      function = "CUSTOMER CARE - CALL CENTRE"
    end
    @test = @collection.aggregate([{'$match' => {"$and" => [{"Industry" => industry}, {"Role" => function}]}},
                                   {"$group" => {"_id" => {level: '$Level'}, avgSalary: {"$avg" => "$Salary"}, count: {"$sum" => 1}}}, {"$sort" => {"_id.level": 1}}]).to_a

  end

  def self.getRoleAvgScore(industry)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    if industry.include?("CALL CENTRE")
      industry = "CUSTOMER CARE - CALL CENTRE"
    end
    @test = @collection.aggregate([{'$match' => {"Role" => industry}},
                                   {"$group" => {"_id" => {level: '$Industry'}, avgScore: {"$avg" => "$Level"}}}, {"$sort" => {"_id.level": 1}}]).to_a


  end

  def self.getAllRoleAvgScore(industry)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @strtomatch = industry.to_s.split(' ')[0]
    @test = @collection.aggregate([{'$match' => {"Role" => {"$regex" => "" + @strtomatch + ""}}},
                                   {"$group" => {"_id" => {level: '$Role'}, avgScoreAll: {"$avg" => "$Score"}}}]).to_a

  end

  #Compensation Graphs Methods

  def self.getPer(start, endindex)

    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @test = @collection.
        aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {Level: {"$lt" => endindex}}]}},
                   {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                   {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a
    return @test
  end

  def self.getCompensationWithRole(start, endindex, role)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @test = @collection.
        aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {"Role" => role}]}},
                   {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}}, {"$limit" => 5}]).to_a


  end

  def self.getCompensationWithIndustry(start, endindex, industry)

    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @test = @collection.
        aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {"Industry" => industry}]}}, {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}}, {"$limit" => 5}]).to_a


  end

  def self.getCompensationWithRoleAndIndustry(start, endindex, industry, role)

    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    @test = @collection.
        aggregate([{"$match" => {"$and" => [{Level: {"$gt" => start}}, {"Industry" => industry}, {"Role" => role}]}},
                   {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}}, {"$limit" => 5}]).to_a
    i = @test
  end

  ###########################

  #Role Premium Graphs Methods
  def self.functionVsIndustries(industries, role)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @calulatedData = []
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    for @ind in 0..industries.length - 1
      @test = @collection.aggregate([{'$match' => {"$and" => [{"Industry" => industries[@ind]}, {"Role" => role}]}},
                                     {"$group" => {"_id" => {level: '$Level', industry: '$Industry'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}}]).to_a
      if @test.length > 0
        @calulatedData.push @test
      end

    end
    return @calulatedData
  end

  def self.functionVsIndustries_role(role)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @calulatedData = []
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    @test = @collection.aggregate([{'$match' => {"Role" => role}},
                                   {"$group" => {"_id" => {level: '$Level', industry: "$Role"}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}}]).to_a
    if @test.length > 0
      @calulatedData.push @test
    end

    return @calulatedData
  end

  def self.functionVsIndustries_industry(industries)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @calulatedData = []

    for @ind in 0..industries.length - 1
      @test = @collection.aggregate([{'$match' => {"Industry" => industries[@ind]}},
                                     {"$group" => {"_id" => {level: '$Level', industry: "$Industry"}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}}]).to_a
      if @test.length > 0
        @calulatedData.push @test
      end
    end
    return @calulatedData
  end

  ############################

  #Promotion Presurre Graphs Methods
  def self.getPromationChart_company(role, industry, company)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')

    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    # for @ind in 0..industries.length-1
    @test = @collection.aggregate([{'$match' => {"$and" => [{"Industry" => industry}, {"Role" => role}, {"Company": company}]}},
                                   {"$group" => {"_id" => {level: '$Level'}, count: {"$sum" => 1}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level" => -1}}]).to_a
    # @calulatedData.push @test
    # end
    @i = @test
  end

  def self.getPromationChart(role, industry)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')

    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    # for @ind in 0..industries.length-1
    @test = @collection.aggregate([{'$match' => {"$and" => [{"Industry" => industry}, {"Role" => role}]}},
                                   {"$group" => {"_id" => {level: '$Level'}, count: {"$sum" => 1}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level" => -1}}]).to_a
    # @calulatedData.push @test
    # end
    @i = @test
  end

  def self.getPromationChart_Industry(industry)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @test = @collection.aggregate([{'$match' => {"Industry" => industry}},
                                   {"$group" => {"_id" => {level: '$Level'}, count: {"$sum" => 1}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}}]).to_a
    # @calulatedData.push @test
    # end
    @i = @test
  end

  def self.getPromationChart_Role(role)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')

    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    # for @ind in 0..industries.length-1
    @test = @collection.aggregate([{'$match' => {"Role" => role}},
                                   {"$group" => {"_id" => {level: '$Level'}, count: {"$sum" => 1}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}}]).to_a
    # @calulatedData.push @test
    # end
    @i = @test
  end

  ############################

  #Growth Potential Graphs Methods
  def self.getGrowthChartWithRole(role, limit)
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @calulatedData = []
    @testData = @collection.aggregate([{'$match' => {"Role" => role}},
                                       {"$group" => {"_id" => {industry: "$Industry"}, max: {"$max" => "$Level"}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"max": 1}}, {"$limit": limit}]).to_a
    @i = @testData
  end

  def self.getGrowthChartWithIndustry(industry, limit)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @calulatedData = []
    for @ind in 0..industry.length - 1
      @testData = @collection.aggregate([{'$match' => {"Industry" => industry[@ind]}},

                                         {"$group" => {"_id" => {role: "$Role"}, max: {"$max" => "$Level"}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"max": 1}}, {"$limit": limit}]).to_a

      @calulatedData.push @testData
    end
    @i = @calulatedData
  end

  def self.getGrowthChartWithRoleAndIndustry(role, industries)
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @calulatedData = []
    for @ind in 0..industries.length - 1
      @testData = @collection.aggregate([{'$match' => {"$and" => [{"Industry" => industries[@ind]}, {"Role" => role}]}},
                                         {"$group" => {"_id" => {industry: "$Industry"}, max: {"$max" => "$Level"}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"max": 1}}, {"$limit": 10}]).to_a
      @calulatedData.push @testData
    end
    @i = @calulatedData
  end

  def self.getMaxLevelPerIndustry(industry, role)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    # @collection.delete_many( { "Industry" => "Not Available" } );
    @testData = @collection.aggregate([{'$match' => {"$and" => [{"Industry" => industry}, {"Role" => role}]}}, {"$group" => {"_id" => {industry: "$Industry"}, max: {"$max" => "$Level"}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}]).to_a

  end

  ############################
  def self.checkUserLevelInData(role, industry, level, mod)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @test = Array.new
    @test = []
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    if role.length > 0 && industry.length > 0
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{"Level" => level}, {"Industry" => industry}, {"Role" => role}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

      return {data: @test, from: "level"}
    elsif role.length > 0 && industry.length == 0
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{"Level" => level}, {"Role" => role}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a
      return {data: @test, from: "Role"}
    elsif role.length == 0 && industry.length > 0
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{"Level" => level}, {"Industry" => industry}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a
      return {data: @test, from: "Industry"}
    elsif role.length == 0 && industry.length == 0
      @test = @collection.
          aggregate([{"$match" => {"Level" => level}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": 1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a
      return {data: @test, from: "Clear"}
    end

  end

  def self.checkUserMinLevelInData(role, industry, startlevel, endlevel, mod)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @test = Array.new
    @test = []
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    if mod == "level"
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{Level: {"$gt" => startlevel}}, {Level: {"$lt" => endlevel}}, {"Industry" => industry}, {"Role" => role}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    elsif mod == "role"
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{Level: {"$gt" => startlevel}}, {Level: {"$lt" => endlevel}}, {"Role" => role}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    else
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{Level: {"$gt" => startlevel}}, {Level: {"$lt" => endlevel}}, {"Industry" => industry}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    end

    return @test

  end

  def self.checkUserMaxLevelInData(role, industry, startlevel, endlevel, mod)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    @test = Array.new
    @test = []
    if mod == "level"
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{Level: {"$gt" => startlevel}}, {Level: {"$lt" => endlevel}}, {"Industry" => industry}, {"Role" => role}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    elsif mod == "role"
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{Level: {"$gt" => startlevel}}, {Level: {"$lt" => endlevel}}, {"Role" => role}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}}, {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    else
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{Level: {"$gt" => startlevel}}, {Level: {"$lt" => endlevel}}, {"Industry" => industry}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}}, {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    end
    return @test

  end

  def self.getAllLevelsFromData(role, industry)
    @data = mongo_client.use($da_path).database
    @collection = @data.collection('users')
    @test = Array.new
    @test = []
    if role.length > 0 && industry.length > 0
      if role.include?("CALL CENTRE")
        role = "CUSTOMER CARE - CALL CENTRE"

      end
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{"Industry" => industry}, {"Role" => role}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}}, {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    elsif role.length > 0
      if role.include?("CALL CENTRE")
        role = "CUSTOMER CARE - CALL CENTRE"

      end
      @test = @collection.
          aggregate([{"$match" => {"Role" => role}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}}, {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    elsif industry.length > 0
      @test = @collection.
          aggregate([{"$match" => {"Industry" => industry}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}}, {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

    elsif role.length == 0 && industry.length == 0
      @test = @collection.
          aggregate([{"$match" => {"Level" => {"$gt" => 0}}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}}, {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a


    end
    return @test
  end

  def self.getUserPoints(points, role, industry)
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end
    @isAllData = true
    @allData = []
    if role.length > 0 && industry.length > 0
      for @i in 0..points.length - 1
        @test = Array.new
        @test = []
        @test = @collection.
            aggregate([{"$match" => {"$and" => [{Level: points[@i]}, {"Industry" => industry}, {"Role" => role}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

        if @test.length > 0
          @allData.push @test.last
        else
          @isAllData = false
          # break
        end
      end
    elsif role.length > 0 && industry.length == 0
      for @i in 0..points.length - 1
        @test = Array.new
        @test = []
        @test = @collection.
            aggregate([{"$match" => {"$and" => [{Level: points[@i]}, {"Role" => role}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

        if @test.length > 0
          @allData.push @test.last
        else
          @isAllData = false
          # break
        end
      end
    elsif role.length == 0 && industry.length > 0
      for @i in 0..points.length - 1
        @test = Array.new
        @test = []
        @test = @collection.
            aggregate([{"$match" => {"$and" => [{Level: points[@i]}, {"Industry" => industry}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

        if @test.length > 0
          @allData.push @test.last
        else
          @isAllData = false
          # break
        end
      end
    elsif role.length == 0 && industry.length == 0
      for @i in 0..points.length
        @test = Array.new
        @test = []
        @test = @collection.
            aggregate([{"$match" => {"$and" => [{Level: points[@i]}]}},
                       {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                       {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"sizeofdata" => {"$gt" => 1}}}]).to_a

        if @test.length > 0
          @allData.push @test.last
        else
          @isAllData = false
          # break
        end
      end
    end
    if @allData.length == points.length
      @isAllData = true
    else
      @isAllData = false
    end
    return {available: @isAllData, points: @allData}
  end

  def self.getUserRange(role, industry)
    if role.include?("CALL CENTRE")
      role = "CUSTOMER CARE - CALL CENTRE"
    end

    if role.length > 0 && industry.length > 0
      @test = Array.new
      @test = []
      @test = @collection.
          aggregate([{"$match" => {"$and" => [{"Industry" => industry}, {"Role" => role}]}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"$and" => [{"sizeofdata" => {"$gt" => 1}}, {"_id.level" => {"$gt" => 0}}]}}]).to_a


    elsif role.length > 0 && industry.length == 0
      @test = Array.new
      @test = []
      @test = @collection.
          aggregate([{"$match" => {"Role" => role}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"$and" => [{"sizeofdata" => {"$gt" => 1}}, {"_id.level" => {"$gt" => 0}}]}}]).to_a

    elsif role.length == 0 && industry.length > 0
      @test = Array.new
      @test = []
      @test = @collection.
          aggregate([{"$match" => {"Industry" => industry}},
                     {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                     {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"$and" => [{"sizeofdata" => {"$gt" => 1}}, {"_id.level" => {"$gt" => 0}}]}}]).to_a


    elsif role.length == 0 && industry.length == 0
      @test = Array.new
      @test = []
      @test = @collection.
          aggregate([
                        {"$group" => {"_id" => {level: '$Level'}, salary: {"$push" => {"$divide" => ["$Salary", 100000]}}}}, {"$sort" => {"_id.level": -1}},
                        {"$project" => {_id: 1, salary: 1, sizeofdata: {"$size" => '$salary'}}}, {"$match" => {"$and" => [{"sizeofdata" => {"$gt" => 1}}, {"_id.level" => {"$gt" => 0}}]}}]).to_a


    end
    return @test
  end

end
