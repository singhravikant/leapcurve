class ReportController < ApplicationController
  def CalculateIntialValues_1
    @role = ""
    @industry = ""
    @company = ""
    @level = ""
    @Salary = ""
    if params.has_key?("Role")
      @role = params[:Role].to_s.squish
    end
    if params.has_key?("Industry")
      @industry = params[:Industry].to_s.squish
    end
    if params.has_key?("Company")
      @company = params[:Company].to_s.squish
    end
    if params.has_key?("Level")
      @level = params[:Level]
    end
    if params.has_key?("Salary")
      @Salary = params[:Salary]
      # if @Salary<100
      #   @Salary=@Salary*100000
      # end
    end

    @result = Hash.new
    @userinfo = Hash.new
    @strresult = Array.new
    @strresult2 = Array.new
    @isLevelExist = Array.new
    begin
      @result = getBriefReport(@level, @company, @industry, @role, @Salary)
      if @result.count() > 2
        if @userinfo.count == 0
          @userinfo = {min: @result["minlevel"], max: @result["maxlevel"], percentValue: @result["graph1Vals"][0], level: @level}
          @userinfo[:text] = "across your Company '" + @role + " and " + @industry + "'"
        end
        if @result["graph1Vals"][0] > 0
          @str = @result["graph1Vals"][0].to_s + " % of people in your " + @result["highestFilter"] + " at your career level"
          @strresult.push @str
        end
        if @result["userPerc"] > 0
          @str = "You are at the " + @result["userPerc"].to_s + "th percentile in your " + @result["highestFilter"]
          @strresult.push @str
        end
        if ((@result["userMedSal"].to_f / 100000.to_f)).to_f.round(2) > 0
          @str = "Median Salary in your " + @result["highestFilter"] + " is " + ((@result["userMedSal"].to_f / 100000.to_f)).to_f.round(2).to_s + " INR in Lakhs"
          @strresult.push @str
        end
        if @result["userScore2"][@result["userScore2"].length - 4].to_f.round(2) > 0
          @str = @result["userScore2"][@result["userScore2"].length - 4].to_f.round(2).to_s + "% of people in your level manage to reach the next Career Level in your " + @result["highestFilter"]
          @strresult2.push @str
        end
        if @result["userScore1"][@result["userScore1"].length - 4] > 0 && ((@result["userScore1"][@result["userScore1"].length - 3].to_f) / 100000.to_f) > 0
          @str = "Highest Level Reachable:" + @result["userScore1"][@result["userScore1"].length - 4].to_f.round(2).to_s + "(Median Salary INR " + ((@result["userScore1"][@result["userScore1"].length - 3].to_f) / 100000.to_f).to_f.round(2).to_s + " Lakhs)"
          @strresult2.push @str
        end
        if @result["userScore2"][@result["userScore2"].length - 3] > 0 && @result["userScore1"][@result["userScore2"].length - 4] > 0
          @str = @result["userScore2"][@result["userScore2"].length - 3].to_f.round(2).to_s + " % of people  reach the highest Career Level"
          @strresult2.push @str
        end
        if ((@result["userScore2"][@result["userScore2"].length - 2].to_f) / 100000.to_f) > 0
          @str = "Median Salary at next level is INR " + ((@result["userScore2"][@result["userScore2"].length - 2].to_f) / 100000.to_f).to_f.round(2).to_s + " Lakhs (increase of " + (((@result["userScore2"][@result["userScore2"].length - 2] - (@Salary * 100000)).to_f / (@Salary * 100000).to_f) * 100).to_f.round(2).to_s + "%) in your " + @result["highestFilter"]
          @strresult2.push @str
        end
      else
        @str = @result["graph1Vals"][0].to_s + " % of people in your " + @result["highestFilter"] + " at your career level"
        @strresult.push @str
      end

      @allFunctions = []
      @allIndustry = []
      @allInstitute = []
      @allInstitute, @allIndustry, @allFunctions = getUniqueComFnIn()
      @allLevel = Array.new
      for lvl in 1..45
        @allLevel.push lvl
      end

    rescue Exception => ex
      puts ex.message
      puts ex.backtrace
      @allFunctions = []
      @allIndustry = []
      @allInstitute = []
      @allInstitute, @allIndustry, @allFunctions = getUniqueComFnIn()
      @allLevel = Array.new
      for lvl in 1..45
        @allLevel.push lvl
      end


      # render json: {status: 200,company:@allInstitute,function:@allFunctions,industry:@allIndustry,level:@allLevel, data: @strresult, data2: @strresult2, userInfo: @userinfo}
    end
    render json: {status: 200, company: @allInstitute, function: @allFunctions, industry: @allIndustry, level: @allLevel, data: @strresult, data2: @strresult2, userInfo: @userinfo}
  end

  def CalculateIntialValues
    @role = ""
    @industry = ""
    @company = ""
    @level = ""
    @Salary = ""
    @Effectivelevel = ""
    if params.has_key?("Role")
      @role = params[:Role].to_s.squish
    end
    if params.has_key?("Industry")
      @industry = params[:Industry].to_s.squish
    end
    if params.has_key?("Company")
      @company = params[:Company].to_s.squish
    end
    if params.has_key?("Level")
      @level = params[:Level]
    end
    if params.has_key?("EffectiveLevel")
      @effectivelevel = params[:EffectiveLevel]
    end
    if params.has_key?("Salary")
      @Salary = params[:Salary]
      # if @Salary<100
      #   @Salary=@Salary*100000
      # end
    end

    @result = Hash.new
    @userinfo = Hash.new
    @strresult = Array.new
    @strresult2 = Array.new
    @isLevelExist = Array.new
    begin
      @result = getBriefReport(@level, @company, @industry, @role, @Salary, @effectivelevel)

      if @result.count() > 7
        if @userinfo.count == 0
          @userinfo = {min: @result["minlevel"], max: @result["maxlevel"], percentValue: @result["graph1Vals"][0], level: @level}
          @userinfo[:text] = "across your Company '" + @role + " and " + @industry + "'"
        end
        if @result.has_key?("graph1Vals") && @result["graph1Vals"][1] > 0
          @str = @result["graph1Vals"][1].to_s
          @strresult.push @str
        else
          @strresult.push 0
          @str = 0
          @result["userPerc"] = 0
        end
        if @result.has_key?("userPerc") && @result["userPerc"] > 0
          @str = @result["userPerc"].to_s
          @strresult.push @str
        else
          @strresult.push 0
        end
        if @result.has_key?("userMedSal") && ((@result["userMedSal"].to_f / 100000.to_f)).to_f.round(2) > 0
          @str = ((@result["userMedSal"].to_f / 100000.to_f)).to_f.round(2).to_s
          @strresult.push @str
        else
          @strresult.push 0
        end

        if @result.has_key?("userScore2") && @result["userScore2"][@result["userScore2"].length - 4].to_f.round(2) > 0
          @str = @result["userScore2"][@result["userScore2"].length - 4].to_f.round(2).to_s
          @strresult2.push @str
        else
          @strresult2.push 0
        end
        if @result.has_key?("userScore1") && @result["userScore1"][@result["userScore1"].length - 4] > 0 && ((@result["userScore1"][@result["userScore1"].length - 3].to_f) / 100000.to_f) > 0
          @str = @result["userScore1"][@result["userScore1"].length - 4].to_f.round(2).to_s
          @strresult2.push @str[0..-3]
        else
          @strresult2.push 0
        end
        if @result.has_key?("userScore2") && @result["userScore2"][@result["userScore2"].length - 3] > 0 && @result["userScore1"][@result["userScore2"].length - 4] > 0
          @str = @result["userScore2"][@result["userScore2"].length - 3].to_f.round(2).to_s
          @strresult2.push @str
        else
          @strresult2.push 0
        end
        if @result.has_key?("userScore1") && @result["userScore1"][@result["userScore1"].length - 3] > 0 && ((@result["userScore1"][@result["userScore1"].length - 3].to_f) / 100000.to_f) > 0
          @str = ((@result["userScore1"][@result["userScore1"].length - 3].to_f) / 100000.to_f).to_f.round(2).to_s
          @strresult2.push @str
        else
          @strresult2.push 0
        end
        # @result["nxtGrowthfactor"]["median"]=(@userScore2[@userScore2.length-2].to_f/100000.to_f).to_f.round(2)
        # @result["nxtGrowthfactor"]["medianPer"]=(((@userScore2[@userScore2.length-2]-salary).to_f/salary.to_f)*100).to_f.round(2)
        #
        if @result.has_key?("userScore2") && @result["userScore2"][@result["userScore2"].length - 2] > 0
          @str = (@result["userScore2"][@result["userScore2"].length - 2] / 100000.to_f).to_f.round(2).to_s
          @strresult2.push @str
        else
          @strresult2.push 0
        end
        if @result.has_key?("userScore2") && ((@result["userScore2"][@result["userScore2"].length - 2].to_f) / 100000.to_f) > 0
          @str = ((@result["userScore2"][@result["userScore2"].length - 2].to_f) / 100000.to_f).to_f.round(2).to_s
          @strresult.push @str
        else
          @strresult.push 0

        end
      else
        if @result.has_key?("graph1Vals") && @result.has_key?("graph1Vals") && @result["graph1Vals"][1] > 0
          @str = @result["graph1Vals"][1].to_s
          @strresult.push @str
        end
      end

      @allFunctions = []
      @allIndustry = []
      @allCompanies = []
      @allInstitute = []
      @alldgree = []
      @allCompanies, @allIndustry, @allFunctions, @allInstitute, @alldgree = getUniqueComFnIn()

      @json = {status: 200, ppx: @result['ppx'], newtext: @result['newtext'], newdata: @result['newdata'], allFunctions: @allFunctions.sort,
               allIndustry: @allIndustry.sort, allInstitute: @allInstitute.sort, allCompanies: @allCompanies, alldgree: @alldgree, level: @allLevel, data: @strresult, data2: @strresult2, userInfo: @userinfo, highestFilter: @result["highestFilter"], highestFilterCL: @result["highestFilterCL"], userDesigs: @result["userDesigs"], nextDesigs: @result["nextDesigs"], highestDesigs: @result["highestDesigs"]}

      if params.has_key?("Email") && params["Email"] != ""
        @user = Hash.new
        @user = User.find_by({"Email" => params['Email'].to_s.downcase})
        @user['resolvData'] = @json
        @user.save
      end
    rescue Exception => ex
      puts ex.message
      puts ex.backtrace
      @allFunctions = []
      @allIndustry = []
      @allCompanies = []
      @allInstitute = []
      @alldgree = []
      @allCompanies, @allIndustry, @allFunctions, @allInstitute, @alldgree = getUniqueComFnIn()
      # render json: {status: 200,company:@allInstitute,function:@allFunctions,industry:@allIndustry,level:@allLevel, data: @strresult, data2: @strresult2, userInfo: @userinfo}
    end
    render json: {status: 200, ppx: @result['ppx'], newtext: @result['newtext'], newdata: @result['newdata'], allFunctions: @allFunctions.sort,
                  allIndustry: @allIndustry.sort, allInstitute: @allInstitute.sort, allCompanies: @allCompanies, alldgree: @alldgree, level: @allLevel, data: @strresult, data2: @strresult2, userInfo: @userinfo, highestFilter: @result["highestFilter"], highestFilterCL: @result["highestFilterCL"], userDesigs: @result["userDesigs"], nextDesigs: @result["nextDesigs"], highestDesigs: @result["highestDesigs"]}

  end

  def graph1Text(graph1Vals, xOut)
    if xOut != {"Company" => [], "Industry and Function" => [], "Industry" => [], "Function" => [], "Industry Group" => [], "Function Group" => []}
      endText1 = "Read our Growth Potential section on the next page to find out more."
      endText2 = "However, there may be ways to further optimise your growth curve. Read our Growth Potential section on the next page to find out more."
    else
      endText1 = ""
      endText2 = ""
    end
    text = "In general, having very few people with a higher Career Level than yours indicates that there is little scope for further growth. "
    if graph1Vals.key?("Company")
      if graph1Vals["Company"][2] >= 40
        text += "Since there are more than 40% people above your career level in your company, there is still plenty of scope for you to grow there. "
        text += endText2
      elsif graph1Vals["Company"][2] >= 20
        text += "Since there are more than 20% people above your career level in your company, there is still moderate scope for you to grow there. "
        text += endText2
      else
        text += "Since there are less than 20% people above your career level in your company, there is little scope for you to grow there. "
        if graph1Vals["Industry and Function"][2] >= 20
          text += "You may consider moving to another company in your industry and function to ensure that you keep growing. "
        else
          if graph1Vals["Function"][2] >= 20 && graph1Vals["Industry"][2] < 20
            text += "You may consider moving to another industry within your function to ensure that you keep growing. "
          elsif graph1Vals["Function"][2] < 20 && graph1Vals["Industry"][2] >= 20
            text += "You may consider moving to another function within your industry to ensure that you keep growing. "
          else
            text += "You may consider moving to another industry or function to ensure that you keep growing. "
          end
        end
        text += endText1
      end
    elsif graph1Vals.key?("Industry and Function")
      if graph1Vals["Industry and Function"][2] >= 40
        text += "Since there are more than 40% people above your career level in your industry and function, there is still plenty of scope for you to grow there. "
        text += endText2
      elsif graph1Vals["Industry and Function"][2] >= 20
        text += "Since there are more than 20% people above your career level in your industry and function, there is still moderate scope for you to grow there. "
        text += endText2
      else
        text += "Since there are less than 20% people above your career level in your industry and function, there is little scope for you to grow there. "
        if graph1Vals["Function"][2] >= 20 && graph1Vals["Industry"][2] < 20
          text += "You may consider moving to another industry within your function to ensure that you keep growing. " + endText1
        elsif graph1Vals["Function"][2] < 20 && graph1Vals["Industry"][2] >= 20
          text += "You may consider moving to another function within your industry to ensure that you keep growing. " + endText1
        else
          text += "You may consider moving to another industry or function to ensure that you keep growing. " + endText1
        end
      end
    elsif graph1Vals.key?("Function")
      if graph1Vals["Function"][2] >= 40
        text += "Since there are more than 40% people above your career level in your function, there is still plenty of scope for you to grow there. "
        text += endText2
      elsif graph1Vals["Function"][2] >= 20
        text += "Since there are more than 20% people above your career level in your function, there is still moderate scope for you to grow there. "
        text += endText2
      else
        text += "Since there are less than 20% people above your career level in your function, there is little scope for you to grow there. "
        text += "You may consider moving to another industry or function to ensure that you keep growing. " + endText1
      end
    elsif graph1Vals.key?("Industry")
      if graph1Vals["Industry"][2] >= 40
        text += "Since there are more than 40% people above your career level in your industry, there is still plenty of scope for you to grow there. "
        text += endText2
      elsif graph1Vals["Industry"][2] >= 20
        text += "Since there are more than 20% people above your career level in your industry, there is still moderate scope for you to grow there. "
        text += endText2
      else
        text += "Since there are less than 20% people above your career level in your industry, there is little scope for you to grow there. "
        text += "You may consider moving to another industry or function to ensure that you keep growing. " + endText1
      end
    elsif graph1Vals.key?("Function Group")
      if graph1Vals["Function Group"][2] >= 40
        text += "Since there are more than 40% people above your career level in your function group, there is still plenty of scope for you to grow there. "
        text += endText2
      elsif graph1Vals["Function Group"][2] >= 20
        text += "Since there are more than 20% people above your career level in your function group, there is still moderate scope for you to grow there. "
        text += endText2
      else
        text += "Since there are less than 20% people above your career level in your function group, there is little scope for you to grow there. "
        text += "You may consider moving to another industry or function to ensure that you keep growing. " + endText1
      end
    elsif graph1Vals.key?("Industry Group")
      if graph1Vals["Industry Group"][2] >= 40
        text += "Since there are more than 40% people above your career level in your industry group, there is still plenty of scope for you to grow there. "
        text += endText2
      elsif graph1Vals["Industry Group"][2] >= 20
        text += "Since there are more than 20% people above your career level in your industry group, there is still moderate scope for you to grow there. "
        text += endText2
      else
        text += "Since there are less than 20% people above your career level in your industry group, there is little scope for you to grow there. "
        text += "You may consider moving to another industry or function to ensure that you keep growing. " + endText1
      end
    end
    return text
  end

  def calculateUserPosition
    @role = ""
    @industry = ""
    @company = ""
    @level = ""
    if params.has_key?("Role")
      @role = params[:Role].to_s.squish
    end
    if params.has_key?("Industry")
      @industry = params[:Industry].to_s.squish
    end
    if params.has_key?("Company")
      @company = params[:Company].to_s.squish
    end
    if params.has_key?("Level")
      # @level=params[:Level]
      level = 15
    end
    @belowRank = Array.new
    @userRank = Array.new
    @ab
    oveRank = Array.new
    @keys = Array.new
    @result = Hash.new
    @userinfo = Hash.new
    if @role.length > 0 && @industry.length > 0 && @company.length > 0
      @DataArray = Array.new
      @DataArray = Reports.checkFilter1(@role, @industry, @company, 'company')
      if @DataArray.length > 15
        @belowvalue = @DataArray.select {|h| h["Level"] < level}.length
        @myValue = @DataArray.select {|h| h["Level"] == level}.length
        @aboveValue = @DataArray.select {|h| h["Level"] > level}.length
        if @belowvalue > 0 && @myValue > 0 && @aboveValue > 0
          @belowRank.push ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @userRank.push ((@myValue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @aboveRank.push ((@aboveValue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @keys.push "Your Company"
        end

      end
    end
    if @role.length > 0 && @industry.length > 0
      @DataArray = Array.new
      @DataArray = Reports.checkFilter1(@role, @industry, @company, 'roleIndustry')
      if @DataArray.length > 15
        @belowvalue = @DataArray.select {|h| h["Level"] < level}.length
        @myValue = @DataArray.select {|h| h["Level"] == level}.length
        @aboveValue = @DataArray.select {|h| h["Level"] > level}.length
        if @belowvalue > 0 && @myValue > 0 && @aboveValue > 0
          @belowRank.push ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @userRank.push ((@myValue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @aboveRank.push ((@aboveValue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @keys.push "Your Industry and Function"
        end

      end
    end
    if @role.length > 0
      @DataArray = Array.new
      @DataArray = Reports.checkFilter1(@role, @industry, @company, 'role')
      if @DataArray.length > 15
        @belowvalue = @DataArray.select {|h| h["Level"] < level}.length
        @myValue = @DataArray.select {|h| h["Level"] == level}.length
        @aboveValue = @DataArray.select {|h| h["Level"] > level}.length
        if @belowvalue > 0 && @myValue > 0 && @aboveValue > 0
          @belowRank.push ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @userRank.push ((@myValue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @aboveRank.push ((@aboveValue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @keys.push "Your Function"
        end
      end
    end
    if @industry.length > 0
      @DataArray = Array.new
      @DataArray = Reports.checkFilter1(@role, @industry, @company, 'industry')
      if @DataArray.length > 15
        @belowvalue = @DataArray.select {|h| h["Level"] < level}.length
        @myValue = @DataArray.select {|h| h["Level"] == level}.length
        @aboveValue = @DataArray.select {|h| h["Level"] > level}.length
        if @belowvalue > 0 && @myValue > 0 && @aboveValue > 0
          @belowRank.push ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @userRank.push ((@myValue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @aboveRank.push ((@aboveValue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
          @keys.push "Your Industry"
        end

      end
    end
  end

  def calculateIntalBar
    begin
      @role = ""
      @industry = ""
      @company = ""
      @level = ""
      @Salary = ""
      if params.has_key?("Role")
        @role = params[:Role].to_s.squish
      end
      if params.has_key?("Industry")
        @industry = params[:Industry].to_s.squish
      end
      if params.has_key?("Company")
        @company = params[:Company].to_s.squish
      end
      if params.has_key?("Salary")
        @Salary = params[:Salary]
      end
      if params.has_key?("Level")
        @level = params[:Level]
        # @level=15
      end
      if params.has_key?("Salary")
        # @level=params[:Level]
        @Salary = params[:Salary]
        # if @Salary<100
        #   @Salary=@Salary*100000
        # end
      end

      @allavalableData = Hash.new
      @allresultData = Hash.new
      @allSyncData = Hash.new
      @allSyncData = {}
      @result = Hash.new
      @allavalableData = Reports.FindGraphValues(@role, @industry, @company, params[:Level])
      if @role.length > 0 && @industry.length > 0 && @company.length > 0
        begin
          @filterWiseHash = Hash.new
          @DataArray = Array.new
          @DataArray = Reports.checkFilter1(@role, @industry, @company, 'company')
          if @DataArray.length > 15
            @filterWiseHash["belowRank"] = calUserLevel(@DataArray, params[:Level], 'below')
            @filterWiseHash["aboveRank"] = calUserLevel(@DataArray, params[:Level], 'above')
            @filterWiseHash["sameRank"] = calUserLevel(@DataArray, params[:Level], 'same')
            @filterWiseHash["belowSalary"] = calPercentageBelowSalary(@DataArray, @Salary)
            if @filterWiseHash["belowSalary"] > 50
              @filterWiseHash["text"] = 1
            else
              @filterWiseHash["text"] = 2
            end
          end
          if @allavalableData.has_key?('Company') && @allSyncData.count == 0
            if @allavalableData['Company'][:type] == 5 && @allavalableData['Company'][:data].length > 1
              @allavalableData['Company'][:data] = @allavalableData['Company'][:data][0]
            end
            @allSyncData = SynData(@allavalableData['Company'][:data], "company", @allavalableData['Company'][:type], @industry, @role, @company, @level, [@role])
            @result = Hash.new
            @resultPro = Hash.new
            if @allSyncData.count > 0
              @result = CalculateCompensationGraph(@allSyncData[:dataVal], @level, @allSyncData[:indexVal])
              @ProData = User.getPromationChart_company(@role, @industry, @company)
              @resultPro = CalculatePromotionGraph(@ProData, @level)
            end

            if @resultPro.count > 0 && @result.count > 0
              @result["nxtGrowthfactor"] = nextLevelPer(@ProData, @level)
              @result["btnStatus"] = @allavalableData
              @filterWiseHash["compensation"] = @result
              @filterWiseHash["promotion"] = @resultPro
            end

          end
          @allresultData["Your Company"] = @filterWiseHash
        rescue Exception => ex
          puts ex.backtrace
          @jsonData = {status: 500, msg: ex.message}
        end
      end
      if @role.length > 0 && @industry.length > 0
        begin
          @filterWiseHash = Hash.new
          @DataArray = Array.new
          @DataArray = Reports.checkFilter1(@role, @industry, @company, 'roleIndustry')
          if @DataArray.length > 15
            @filterWiseHash["belowRank"] = calUserLevel(@DataArray, params[:Level], 'below')
            @filterWiseHash["aboveRank"] = calUserLevel(@DataArray, params[:Level], 'above')
            @filterWiseHash["sameRank"] = calUserLevel(@DataArray, params[:Level], 'same')
            @filterWiseHash["belowSalary"] = calPercentageBelowSalary(@DataArray, @Salary)
            if @filterWiseHash["belowSalary"] > 50
              @filterWiseHash["text"] = 1
            else
              @filterWiseHash["text"] = 2
            end

          end

          if @allavalableData.has_key?('FunInd') && @allSyncData.count == 0
            if @allavalableData['FunInd'][:type] == 5 && @allavalableData['FunInd'][:data].length > 1
              @allavalableData['FunInd'][:data] = @allavalableData['FunInd'][:data][0]
            end
            @allSyncData = SynData(@allavalableData['FunInd'][:data], "roleIndustry", @allavalableData['FunInd'][:type], @industry, @role, @company, @level, [@role])
            @result = Hash.new
            if @allSyncData.count > 0
              @result = CalculateCompensationGraph(@allSyncData[:dataVal], @level, @allSyncData[:indexVal])
              @ProData = User.getPromationChart(@role, @industry)
              @resultPro = CalculatePromotionGraph(@ProData, @level)
            end
            if @result.count > 0 && @resultPro.count > 0
              # @result["nxtFnIn"]= getAllGrowthFactors(@ProData,@level)
              @result["nxtGrowthfactor"] = nextLevelPer(@ProData, @level)
              @filterWiseHash["promotion"] = @resultPro
              @result["btnStatus"] = @allavalableData
              @filterWiseHash["compensation"] = @result
            end
            @allresultData["Your Industry and Function"] = @filterWiseHash
          end
        rescue Exception => ex
          puts ex.backtrace
          @jsonData = {status: 500, msg: ex.message}
        end
      end
      if @role.length > 0
        begin
          @filterWiseHash = Hash.new
          @DataArray = Array.new
          @DataArray = Reports.checkFilter1(@role, @industry, @company, 'role')
          if @DataArray.length > 15
            @filterWiseHash["belowRank"] = calUserLevel(@DataArray, params[:Level], 'below')
            @filterWiseHash["aboveRank"] = calUserLevel(@DataArray, params[:Level], 'above')
            @filterWiseHash["sameRank"] = calUserLevel(@DataArray, params[:Level], 'same')
            @filterWiseHash["belowSalary"] = calPercentageBelowSalary(@DataArray, @Salary)
            if @filterWiseHash["belowSalary"] > 50
              @filterWiseHash["text"] = 1
            else
              @filterWiseHash["text"] = 2
            end

          end
          if @allavalableData.has_key?('Fun') && @allSyncData.count == 0
            if @allavalableData['Fun'][:type] == 5 && @allavalableData['Fun'][:data].length > 1
              @allavalableData['Fun'][:data] = @allavalableData['Fun'][:data][0]
            end
            @allSyncData = SynData(@allavalableData['Fun'][:data], "role", @allavalableData['Fun'][:type], @industry, @role, @company, @level, [@role])
            @result = Hash.new
            if @allSyncData.count > 0
              @result = CalculateCompensationGraph(@allSyncData[:dataVal], @level, @allSyncData[:indexVal])
              @ProData = User.getPromationChart_Role(@role)
              @resultPro = CalculatePromotionGraph(@ProData, @level)
            end

            if @resultPro.count > 0 && @result.count > 0
              @result["nxtGrowthfactor"] = nextLevelPer(@ProData, @level)
              @result["btnStatus"] = @allavalableData
              @filterWiseHash["compensation"] = @result
              @filterWiseHash["promotion"] = @resultPro
            end

          end
          @allresultData["Your Function"] = @filterWiseHash


        rescue Exception => ex
          puts ex.backtrace
          @jsonData = {status: 500, msg: ex.message}
        end
        begin
          if @allavalableData.has_key?('FunGroup')
            @filterWiseHash = Hash.new
            @DataArray = Array.new
            @grpFields = Array.new
            @grpFields = @allavalableData["FunGroup"][:group]
            if @grpFields.length == 1
              @DataArray = Reports.checkFilter1(@role, @industry, @company, 'role')
            else
              for v in 0..@grpFields.length - 1
                @values = Array.new
                # @values=Reports.getCompensation(@points[0]-1,@points[@len-1]+3,industry,"ADMINISTRATION",company,@level,mod)
                @values = Reports.checkFilter1(@grpFields[v].gsub("'", '').strip, @industry, @company, 'role')
                @DataArray = @DataArray + @values
              end
            end
            if @DataArray.length > 15
              @filterWiseHash["belowRank"] = calUserLevel(@DataArray, params[:Level], 'below')
              @filterWiseHash["aboveRank"] = calUserLevel(@DataArray, params[:Level], 'above')
              @filterWiseHash["sameRank"] = calUserLevel(@DataArray, params[:Level], 'same')
              @filterWiseHash["belowSalary"] = calPercentageBelowSalary(@DataArray, @Salary)
              if @filterWiseHash["belowSalary"] > 50
                @filterWiseHash["text"] = 1
              else
                @filterWiseHash["text"] = 2
              end

            end
            if @allavalableData.has_key?('FunGroup') && @allSyncData.count == 0
              if @allavalableData['FunGroup'][:type] == 5 && @allavalableData['FunGroup'][:data].length > 1
                @allavalableData['FunGroup'][:data] = @allavalableData['FunGroup'][:data][0]
              end
              @allSyncData = SynData(@allavalableData['FunGroup'][:data], "role", @allavalableData['FunGroup'][:type], @industry, @role, @company, @level, @allavalableData['FunGroup'][:group])
              @result = Hash.new
              if @allSyncData.count > 0
                @result = CalculateCompensationGraph(@allSyncData[:dataVal], @level, @allSyncData[:indexVal])
                @ProData = User.getPromationChart_Role(@role)
                @resultPro = CalculatePromotionGraph(@ProData, @level)
              end
              if @resultPro.count > 0 && @result.count > 0
                @result["nxtGrowthfactor"] = nextLevelPer(@ProData, @level)
                @result["btnStatus"] = @allavalableData
                @filterWiseHash["compensation"] = @result
                @filterWiseHash["promotion"] = @resultPro
              end

            end
            @allresultData["Your Function Group"] = @filterWiseHash
          end

        rescue Exception => ex
          puts ex.backtrace
          @jsonData = {status: 500, msg: ex.message}
        end
      end
      if @industry.length > 0
        begin
          @filterWiseHash = Hash.new
          @DataArray = Array.new
          @DataArray = Reports.checkFilter1(@role, @industry, @company, 'industry')
          if @DataArray.length > 15
            @filterWiseHash["belowRank"] = calUserLevel(@DataArray, params[:Level], 'below')
            @filterWiseHash["aboveRank"] = calUserLevel(@DataArray, params[:Level], 'above')
            @filterWiseHash["sameRank"] = calUserLevel(@DataArray, params[:Level], 'same')
            @filterWiseHash["belowSalary"] = calPercentageBelowSalary(@DataArray, @Salary)
            if @filterWiseHash["belowSalary"] > 50
              @filterWiseHash["text"] = 1
            else
              @filterWiseHash["text"] = 2
            end

          end
          if @allavalableData.has_key?('Ind') && @allSyncData.count == 0
            if @allavalableData['Ind'][:type] == 5 && @allavalableData['Ind'][:data].length > 1
              @allavalableData['Ind'][:data] = @allavalableData['Ind'][:data][0]
            end
            @allSyncData = SynData(@allavalableData['Ind'][:data], "industry", @allavalableData['Ind'][:type], @industry, @role, @company, @level, [@industry])
            @result = Hash.new
            if @allSyncData.count > 0
              @result["btnStatus"] = @allavalableData
              @result = CalculateCompensationGraphx(@allSyncData[:dataVal], @level, @allSyncData[:indexVal])
              @ProData = User.getPromationChart_Industry(@industry)
              @resultPro = CalculatePromotionGraph(@ProData, @level)
            end

            if @resultPro.count > 0 && @result.count > 0
              @result["nxtGrowthfactor"] = nextLevelPer(@ProData, @level)
              @result["btnStatus"] = @allavalableData
              @filterWiseHash["compensation"] = @result
              @filterWiseHash["promotion"] = @resultPro
            end
          end
          @allresultData["Your Industry"] = @filterWiseHash
          begin
            if @allavalableData.has_key?('IndGroup')
              @filterWiseHash = Hash.new
              @DataArray = Array.new
              @grpFields = Array.new
              @grpFields = @allavalableData["IndGroup"][:group]
              if @grpFields.length == 1
                @DataArray = Reports.checkFilter1(@role, @grpFields[0].gsub("'", '').strip, @company, 'industry')
              else
                for v in 0..@grpFields.length - 1
                  @values = Array.new
                  # @values=Reports.getCompensation(@points[0]-1,@points[@len-1]+3,industry,"ADMINISTRATION",company,@level,mod)
                  @values = Reports.checkFilter1(@grpFields[v].gsub("'", '').strip, @industry, @company, 'industry')

                  @DataArray = @DataArray + @values
                end
              end
              if @DataArray.length > 15
                @filterWiseHash["belowRank"] = calUserLevel(@DataArray, params[:Level], 'below')
                @filterWiseHash["aboveRank"] = calUserLevel(@DataArray, params[:Level], 'above')
                @filterWiseHash["sameRank"] = calUserLevel(@DataArray, params[:Level], 'same')
                @filterWiseHash["belowSalary"] = calPercentageBelowSalary(@DataArray, @Salary)
                if @filterWiseHash["belowSalary"] > 50
                  @filterWiseHash["text"] = 1
                else
                  @filterWiseHash["text"] = 2
                end

              end
              if @allavalableData.has_key?('IndGroup') && @allSyncData.count == 0
                if @allavalableData['IndGroup'][:type] == 5 && @allavalableData['FunGroup'][:data].length > 1
                  @allavalableData['IndGroup'][:data] = @allavalableData['FunGroup'][:data][0]
                end
                @allSyncData = SynData(@allavalableData['IndGroup'][:data], "role", @allavalableData['IndGroup'][:type], @industry, @role, @company, @level, @allavalableData['IndGroup'][:group])
                @result = Hash.new
                if @allSyncData.count > 0
                  @result = CalculateCompensationGraph(@allSyncData[:dataVal], @level, @allSyncData[:indexVal])
                  @ProData = User.getPromationChart_Role(@role)
                  @resultPro = CalculatePromotionGraph(@ProData, @level)
                end
                if @resultPro.count > 0 && @result.count > 0
                  @result["nxtGrowthfactor"] = nextLevelPer(@ProData, @level)
                  @result["btnStatus"] = @allavalableData
                  @filterWiseHash["compensation"] = @result
                  @filterWiseHash["promotion"] = @resultPro
                end

              end
              @allresultData["Your Industry Group"] = @filterWiseHash
            end

          rescue Exception => ex
            puts ex.backtrace
            @jsonData = {status: 500, msg: ex.message}
          end

        rescue Exception => ex
          puts ex.backtrace
          @jsonData = {status: 500, msg: ex.message}
        end
      end
      @allresultData['CL_text'] = getAnalysisText(@allresultData)
      # @allresultData['PP_text']=getPPAnalysisText(@allresultData)
      # def getGrowthScore(cl,company,industry,function,resultData)
      @allresultData = getGrowthScore(params[:Level], @company, @industry, @role, @allresultData)
      if @allresultData.count > 0
        @jsonData = {status: 200, reportData: @allresultData}
      else
        @jsonData = {status: 200, msg: "Data not availablel", reportData: @allData}
      end
      render :json => @jsonData
        # render :json=>{status:200,yaxis:@result["yaxis"],xAxis:@result["xAxis"],xAxis8:@result["xAxis8"],xAxis9:@result["xAxis9"],xAxis50:@result["xAxis50"], index:@result["index"],mylevel:@result["mylevel"],title:@result["title"],belowlevel:@belowRank,belowSalary:@belowSalary,btnStatus:@allavalableData}
    rescue Exception => ex
      puts ex.backtrace
      render :json => {status: 500, msg: ex.message}
    end

  end

  def getCompensationChart
    begin
      @keys = ""
      @mod = ""
      @type = ""
      @level = ""
      @Salary = ""
      @role = ""
      @industry = ""
      @company = ""
      if params.has_key?("Role")
        @role = params[:Role].to_s.squish
      end
      if params.has_key?("Industry")
        @industry = params[:Industry].to_s.squish
      end
      if params.has_key?("Company")
        @company = params[:Company].to_s.squish
      end
      if params.has_key?("keys")
        @val = params[:keys]
        @keys = @val
      end
      if params.has_key?("mod")
        @mod = params[:mod]
      end
      if params.has_key?("graphType")
        @graphType = params[:graphType]
      end
      if params.has_key?("xPoints")
        @xVals = params[:xPoints]
      end

      if params.has_key?("level")
        @level = params[:level]
        # @level=45
      end
      if params.has_key?("Salary")
        @Salary = params[:Salary]
        # if @Salary<100
        #   @Salary=@Salary*100000
        # end
      end
      # mod="FunInd"
      @result = Hash.new
      if ![4, 5].include?(@graphType)
        if @mod == "FunInd"
          # @allSyncData=SynData(@keys, 'roleIndustry', @type, @industry, @role, @company, @level, [@role])
          @result = calCC(@level, "", @industry, @role, "Industry and Function", @Salary, @xVals, @graphType)
        elsif @mod == "Fun"
          # @allSyncData=SynData(@keys, 'role', @type, @industry, @role, @company, @level, @role)
          @result = calCC(@level, "", "", @role, "Function", @Salary, @xVals, @graphType)
        elsif @mod == "Ind"
          # @allSyncData=SynData(@keys, 'industry', @type, @industry, @role, @company, @level, @industry)
          @result = calCC(@level, "", @industry, "", "Industry", @Salary, @xVals, @graphType)
        elsif @mod == "Company"
          # @allSyncData=SynData(@keys, 'company', @type, @industry, @role, @company, @level, @company)
          @result = calCC(@level, @company, @industry, @role, "", @Salary, @xVals, @graphType)
        elsif @mod == "FunGroup"
          # @allSyncData=SynData(@keys, 'roleGroup', @type, @industry, @role, @company, @level, @group)
          @result = calCC(@level, "", "", @role, "Function Group", @Salary, @xVals, @graphType)
        elsif @mod == "IndGroup"
          # @allSyncData=SynData(@keys, 'industryGroup', @type, @industry, @role, @company, @level, @group)
          @result = calCC(@level, "", @industry, "", "Industry Group", @Salary, @xVals, @graphType)
        end
      else
        if @mod == "FunInd"
          # @allSyncData=SynData(@keys, 'roleIndustry', @type, @industry, @role, @company, @level, [@role])
          @result = calCC(@level, @company, @industry, @role, "Industry and Function", @Salary, @xVals, @graphType)
        elsif @mod == "Fun"
          # @allSyncData=SynData(@keys, 'role', @type, @industry, @role, @company, @level, @role)
          @result = calCC(@level, @company, @industry, @role, "Function", @Salary, @xVals, @graphType)
        elsif @mod == "Ind"
          # @allSyncData=SynData(@keys, 'industry', @type, @industry, @role, @company, @level, @industry)
          @result = calCC(@level, @company, @industry, @role, "Industry", @Salary, @xVals, @graphType)
        elsif @mod == "Company"
          # @allSyncData=SynData(@keys, 'company', @type, @industry, @role, @company, @level, @company)
          @result = calCC(@level, @company, @industry, @role, "Company", @Salary, @xVals, @graphType)
        elsif @mod == "FunGroup"
          # @allSyncData=SynData(@keys, 'roleGroup', @type, @industry, @role, @company, @level, @group)
          @result = calCC(@level, @company, @industry, @role, "Function Group", @Salary, @xVals, @graphType)
        elsif @mod == "IndGroup"
          # @allSyncData=SynData(@keys, 'industryGroup', @type, @industry, @role, @company, @level, @group)
          @result = calCC(@level, @company, @industry, @role, "Industry Group", @Salary, @xVals, @graphType)
        end
      end


      # if @allSyncData.count>0
      #   @result=CalculateCompensationGraph(@allSyncData[:dataVal], @level, @allSyncData[:indexVal])
      # end
      render :json => {status: 200, chartData: @result}
    rescue Exception => ex
      puts ex.backtrace
    end

  end

  def GrowthReport

    @role = ""
    @industry = ""
    @company = ""
    @level = ""
    @Salary = ""
    @fillter = ""
    if params.has_key?("Role")
      @role = params[:Role].to_s.squish
    end

    if params.has_key?("mod")
      @mod = params[:mod]
    end
    if params.has_key?("Industry")
      @industry = params[:Industry].to_s.squish
    end
    if params.has_key?("Company")
      @company = params[:Company].to_s.squish
    end
    if params.has_key?("Salary")
      @Salary = params[:Salary]
    end
    if params.has_key?("Level")
      @level = params[:Level]

    end
    if params.has_key?("level")
      @level = params[:level]

    end
    if params.has_key?("Salary")
      # @level=params[:Level]
      @Salary = params[:Salary]
      # if @Salary<100
      #   @Salary=@Salary*100000
      # end
    end
    @result = Hash.new
    @resultPro = Hash.new
    @filterWiseHash = Hash.new
    @allresultData = Hash.new
    if @mod == "FunInd"
      @allresultData = calPromotionPressure(@level, "", @industry, @role, "Industry and Function", @Salary)
    elsif @mod == "Fun"
      # @ProData=User.getPromationChart_Role(@role)
      @allresultData = calPromotionPressure(@level, "", "", @role, "Function", @Salary)
    elsif @mod == "Ind"
      # @ProData=User.getPromationChart_Industry(@industry)
      @allresultData = calPromotionPressure(@level, "", @industry, "", "Industry", @Salary)
    elsif @mod == "Company"
      # @ProData=User.getPromationChart_company(@role, @industry, @company)
      @allresultData = calPromotionPressure(@level, @company, @industry, @role, "Company", @Salary)
    elsif @mod == "FunGroup"
      @allresultData = calPromotionPressure(@level, "", "", @role, "Function Group", @Salary)
    elsif @mod == "IndGroup"

      @allresultData = calPromotionPressure(@level, "", @industry, "", "Industry Group", @Salary)
    else
      @allresultData = calPromotionPressure(@level, @company, @industry, @role, "", @Salary)
    end
    begin
      @allresultData["PP_Text"] = getPPAnalysisText(@allresultData["PP_Text"])
      @allresultData['indGrp'] = getIndustryGroup(@industry)
      @allresultData['funGrp'] = []
      @tmp = getFunctionGroup(@role)
      for @role in 0..@tmp.length - 1
        @allresultData['funGrp'].push @tmp[@role].to_s.downcase.titleize
      end
      if @allresultData.count > 0
        @jsonData = {status: 200, reportData: @allresultData}
      else
        @jsonData = {status: 200, msg: "Data not availablel", reportData: @allData}
      end
      if params.has_key?("Email") && params["Email"] != ""
        @user = Hash.new
        @user = User.find_by({"Email" => params['Email'].to_s.downcase})
        @user['growthValues'] = @allresultData
        @user.save
      end
      render :json => @jsonData
        # render :json=>{status:200,yaxis:@result["yaxis"],xAxis:@result["xAxis"],xAxis8:@result["xAxis8"],xAxis9:@result["xAxis9"],xAxis50:@result["xAxis50"], index:@result["index"],mylevel:@result["mylevel"],title:@result["title"],belowlevel:@belowRank,belowSalary:@belowSalary,btnStatus:@allavalableData}
    rescue Exception => ex
      puts ex.backtrace
      render :json => {status: 500, msg: ex.message}
    end
  end

  def CLReport
    begin
      @role = ""
      @industry = ""
      @company = ""
      @level = ""
      @Salary = ""
      if params.has_key?("Role")
        @role = params[:Role].to_s.squish
      end
      if params.has_key?("Industry")
        @industry = params[:Industry].to_s.squish
      end
      if params.has_key?("Company")
        @company = params[:Company].to_s.squish
      end
      if params.has_key?("Level")
        @level = params[:Level]
      end
      if params.has_key?("Salary")
        @Salary = params[:Salary]
        # if @Salary<100
        #   @Salary=@Salary*100000
        # end
      end
      @allresultData = Hash.new
      @result = Hash.new
      @graph1 = Hash.new
      @actualYVal = Hash.new
      @btnStatus = Hash.new
      @filterWiseHash = Hash.new @allresultData = {"Your Company" => {}, "Your Industry and Function" => {}, "Your Function Group" => {}, "Your Industry Group" => {}, "Your Function" => {}, "Your Industry" => {}}
      @result = calCC(@level, @company, @industry, @role, "", @Salary, [], 0)
      if @result.count > 3
        @result["btnStatus"] = @result["actualYVal"]
        @filterWiseHash["compensation"] = @result
        @graph1 = @result["graph1"]
        @allresultData["Your " + @result["highFilter"]] = @filterWiseHash
        @result["graph1"].each do |k, v|
          case k
          when 'Company'
            @tmp = @allresultData["Your Company"]
            @tmp["belowRank"] = @graph1[k][0]
            @tmp["sameRank"] = @graph1[k][1]
            @tmp["aboveRank"] = @graph1[k][2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Company"] = @tmp
          when 'Industry and Function'
            @tmp = @allresultData["Your Industry and Function"]
            @tmp["belowRank"] = @graph1[k][0]
            @tmp["sameRank"] = @graph1[k][1]
            @tmp["aboveRank"] = @graph1[k][2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Industry and Function"] = @tmp
          when 'Function'
            @tmp = @allresultData["Your Function"]
            @tmp["belowRank"] = @graph1[k][0]
            @tmp["sameRank"] = @graph1[k][1]
            @tmp["aboveRank"] = @graph1[k][2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Function"] = @tmp
          when 'Function Group'
            @tmp = @allresultData["Your Function Group"]
            @tmp["belowRank"] = @graph1[k][0]
            @tmp["sameRank"] = @graph1[k][1]
            @tmp["aboveRank"] = @graph1[k][2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Function Group"] = @tmp
          when 'Industry'
            @tmp = @allresultData["Your Industry"]
            @tmp["belowRank"] = @graph1[k][0]
            @tmp["sameRank"] = @graph1[k][1]
            @tmp["aboveRank"] = @graph1[k][2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Industry"] = @tmp
          when 'Industry Group'
            @tmp = @allresultData["Your Industry Group"]
            @tmp["belowRank"] = @graph1[k][0]
            @tmp["sameRank"] = @graph1[k][1]
            @tmp["aboveRank"] = @graph1[k][2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Industry Group"] = @tmp
          end
        end
        @allresultData['CL_text'] = getAnalysisText(@allresultData)
        @highestFilter = ""
      else
        @graph1 = @result["graph1"]
        @highestFilter = ""
        @graph1.each do |k, v|
          case k
          when 'Company'
            @tmp = @allresultData["Your Company"]
            @tmp["belowRank"] = v[0]
            @tmp["sameRank"] = v[1]
            @tmp["aboveRank"] = v[2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Company"] = @tmp
            if @highestFilter == ""
              @highestFilter = "Your Company"
            end
          when 'Industry and Function'
            @tmp = @allresultData["Your Industry and Function"]
            @tmp["belowRank"] = v[0]
            @tmp["sameRank"] = v[1]
            @tmp["aboveRank"] = v[2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Industry and Function"] = @tmp
            if @highestFilter == ""
              @highestFilter = "Your Industry and Function"
            end
          when 'Function'
            @tmp = @allresultData["Your Function"]
            @tmp["belowRank"] = v[0]
            @tmp["sameRank"] = v[1]
            @tmp["aboveRank"] = v[2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Function"] = @tmp
            if @highestFilter == ""
              @highestFilter = "Your Function"
            end
          when 'Function Group'
            @tmp = @allresultData["Your Function Group"]
            @tmp["belowRank"] = v[0]
            @tmp["sameRank"] = v[1]
            @tmp["aboveRank"] = v[2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Function Group"] = @tmp
            if @highestFilter == ""
              @highestFilter = "Your Function Group"
            end
          when 'Industry'
            @tmp = @allresultData["Your Industry"]
            @tmp["belowRank"] = v[0]
            @tmp["sameRank"] = v[1]
            @tmp["aboveRank"] = v[2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Industry"] = @tmp
            if @highestFilter == ""
              @highestFilter = "Your Industry"
            end
          when 'Industry Group'
            @tmp = @allresultData["Your Industry Group"]
            @tmp["belowRank"] = v[0]
            @tmp["sameRank"] = v[1]
            @tmp["aboveRank"] = v[2]
            @tmp["belowSalary"] = @result["userPercentile"][k]
            if @tmp["belowSalary"] > 50
              @tmp["text"] = 1
            else
              @tmp["text"] = 2
            end
            @allresultData["Your Industry Group"] = @tmp
            if @highestFilter == ""
              @highestFilter = "Your Industry Group"
            end
          end
        end
        # @allresultData["Your "+@result["highFilter"]]=@filterWiseHash
      end
      @allresultData['indGrp'] = getIndustryGroup(@industry)
      @allresultData['funGrp'] = []
      @tmp = getFunctionGroup(@role)
      for @role in 0..@tmp.length - 1
        @allresultData['funGrp'].push @tmp[@role].to_s.downcase.titleize
      end
      @allresultData['highestFilter'] = @highestFilter
      if @allresultData.count > 0
        if params.has_key?("Email") && params["Email"] != ""
          @user = Hash.new
          @compensation = ""
          @reportdata_hash = @allresultData
          puts @reportdata_hash
          @reportdata_hash.each do |key, val|
            if @reportdata_hash[key].is_a?(Hash) && @reportdata_hash[key].has_key?('compensation')
              @compensation = key
              @temp = Hash.new
              if @reportdata_hash[@compensation]['compensation'].has_key?('actualYVal')
                @reportdata_hash[@compensation]['compensation']['actualYVal'].each do |key, value|
                  @actualYVal[key] = {}
                  if @reportdata_hash[@compensation]['compensation']['actualYVal'][key].is_a?(Hash)
                    @reportdata_hash[@compensation]['compensation']['actualYVal'][key].each do |k, v|
                      puts @allresultData[@compensation]['compensation']['actualYVal']
                      @temp[k.to_s] = v
                      @allresultData[@compensation]['compensation']['actualYVal'][key].delete(k)
                    end
                  end
                  @actualYVal[key] = @temp
                  @temp = {}
                end
              end
              @temp1 = Hash.new
              if @reportdata_hash[@compensation]['compensation'].has_key?('btnStatus')
                @reportdata_hash[@compensation]['compensation']['btnStatus'].each do |key, value|
                  @btnStatus[key] = {}
                  if @reportdata_hash[@compensation]['compensation']['btnStatus'][key].is_a?(Hash)
                    @reportdata_hash[@compensation]['compensation']['btnStatus'][key].each do |k, v|
                      puts @allresultData[@compensation]['compensation']['btnStatus']
                      @temp1[k.to_s] = v
                      @allresultData[@compensation]['compensation']['btnStatus'][key].delete(k)
                    end
                  end
                  @btnStatus[key] = @temp1
                  @temp1 = {}
                end
              end
            end
          end
          if @compensation != ""
            @allresultData[@compensation]['compensation']['actualYVal'] = @actualYVal
            @allresultData[@compensation]['compensation']['btnStatus'] = @btnStatus
          end

          @jsonData = {status: 200, reportData: @allresultData}
          puts @jsonData
          if params['Email'].present? && params['Email'] != ""
            @user = User.find_by({"Email" => params['Email'].to_s.downcase})
            @user['reportValues'] = @jsonData
            @user.save
          end
        else
          @jsonData = {status: 200, reportData: @allresultData}
        end
      else
        @jsonData = {status: 200, msg: "Data not availablel", reportData: @allData}
      end
      render :json => @jsonData
        # render :json=>{status:200,yaxis:@result["yaxis"],xAxis:@result["xAxis"],xAxis8:@result["xAxis8"],xAxis9:@result["xAxis9"],xAxis50:@result["xAxis50"], index:@result["index"],mylevel:@result["mylevel"],title:@result["title"],belowlevel:@belowRank,belowSalary:@belowSalary,btnStatus:@allavalableData}
    rescue Exception => ex
      puts ex.backtrace
      render :json => {status: 500, msg: ex.message}
    end
  end

  def getInitialChart
    begin
      @role = ""
      @industry = ""
      @company = ""
      @Salary = ""
      if params.has_key?("Role")
        @role = params[:Role].to_s.squish
      end
      if params.has_key?("Industry")
        @industry = params[:Industry].to_s.squish
      end
      if params.has_key?("Company")
        @company = params[:Company].to_s.squish
      end
      if params.has_key?("Salary")
        @Salary = params[:Salary]
      end
      @result = Hash.new
      @value = Array.new
      @value = initialPPGraph(@company, @industry, @role, (@Salary * 100000))
      @yAxis1 = Array.new
      @yAxis = @value[2].values
      @yAxis = @yAxis.reverse
      for y1 in 0..@yAxis.length - 1
        @yAxis1.push 0
      end
      (@yAxis.length - 1).downto(1) do |x|
        if @yAxis[x] > @yAxis[x - 1]
          @diff = (@yAxis[x - 1] - @yAxis[x]).abs / @yAxis[x - 1]
          if @diff >= 0.15
            @yAxis1[x] = @yAxis[x]

          end
        end
      end
      @yAxis2 = Array.new
      @yAxis2 = @value[3].values
      @result["yAxis2"] = []
      for y in 0..@yAxis2.length - 1
        @result["yAxis2"].push ((@yAxis2[y].to_f / 100000.to_f).round(2))
      end
      @xAxis = Array.new
      for x in 0..@value[0].length - 1
        if @value[0][x].to_s.include?(',')
          @str = @value[0][x].to_s.split(',')
          @xAxis.push (@str[0] + "-" + @str[@str.length])
        else
          @xAxis.push @value[0][x]
        end
      end
      @result["xAxis"] = @xAxis.reverse
      @result["yAxis"] = @yAxis
      @result["yAxis1"] = @yAxis1
      @result["yAxis2"] = @result["yAxis2"].reverse
      @result["title"] = @value[1]
      @result["otherInfo"] = Array.new
      display = @value[4]
      if display != []
        print "\nTo Show:"
        if display[0][0] == display[0][1]
          print "\nEstimated Career Level: ", display[0][0]
          @result["otherInfo"].push display[0][0]
        else
          print "\nEstimated Career Level: ", display[0][0], "-", display[0][1]
          @result["otherInfo"].push (display[0][0].to_s[0..-3] + " - " + display[0][1].to_s[0..-3])
        end
        if display[1][0] == display[1][1]
          print "\nMedian Salary at Estimated Level: ", display[1][0]
          @result["otherInfo"].push ((display[1][0].to_f / 100000.to_f).round(2)).to_s
        else
          print "\nMedian Salary at Estimated Level: ", display[1][0], " - ", display[1][1]
          @result["otherInfo"].push (((display[1][0].to_f / 100000.to_f).round(2)).to_s + " - " + ((display[1][1].to_f / 100000.to_f).round(2)).to_s)
        end
        if display[2][0] == display[2][1]
          print "\nPercentage of People at Estimated Level: ", display[2][0], "%"
          @result["otherInfo"].push display[2][0].to_s + " %"
        else
          print "\nPercentage of People at Estimated Level: ", display[2][0], "%", "-", display[2][1], "%"
          @result["otherInfo"].push (display[2][0].to_s + " - " + display[2][1].to_s + " %")
        end
      else
        print "\nTo Show:\n"
        print "Assess your Career Level and Benchmark with Peers."
      end

      # @result.push @yAxis1
      if @result.count > 0
        @jsonData = {status: 200, reportData: @result}
      else
        @jsonData = {status: 200, msg: "Data not availablel", reportData: @allData}
      end
      render :json => @jsonData
    rescue Exception => ex
      puts ex.backtrace
      render :json => {status: 500, msg: ex.message}
    end
  end

  private


  def getBriefReport(cl, company, industry, function, salary, effectivelevel)
    userCompany = company
    userIndustry = industry
    userFunction = function
    userCL = cl
    ppx = true
    userSalary = salary * 100000
    effectivelevel = effectivelevel
    userAvailable1, relativeScores1, allValues, userScores1 = whileQuestionnaire(userCompany, userIndustry, userFunction)
    print "Relative Overall Scores:---------------------------------- \n"
    print relativeScores1
    print "\nData Availability in overall scores:-------------------------------------------- \n"
    print userAvailable1
    print "\nUser Vals:-------------------------------------------- \n"
    print userScores1
    xOut1 = ccx(userCompany, userIndustry, userFunction, userCL, userAvailable1)
    graphType1, xVals1, highestFilterCL = xOut1
    xOut = ppx(userCompany, userIndustry, userFunction, userCL, userAvailable1)
    data = highest(userCompany, userIndustry, userFunction)
    cls = Array.new

    data.each do |k, v|
      if v[0].present?
        cls.push(v[0])
      end

    end
    max_cl = cls.max

    @result = Hash.new
    if xOut != []
      highestFilter = ""
      userRange = false
      cls = {}
      userRanges = {}
      xValsAll = {}
      xVals = []
      @xCL = -1
      nextCls = {}
      highestCls = {}
      clInd = -1
      xOut.each do |caseName, caseVals|
        if caseVals.length > 0
          graphType = caseVals[0]
          xVals = caseVals[1]
          xValsAll[caseName] = xVals
          if graphType == "g1"
            userRange = false
            cl = userCL
            clInd = xVals.find_index(cl)
          else
            userRange = true
            xVals.each do |vals|
              clInd = -1
              if vals.include?(userCL)
                clInd += 1
                cl = vals
                @xCL = vals
                break
              end
            end
          end
          if clInd != xVals.length
            nextCl = xVals[clInd + 1]
          else
            nextCl = nil
          end

          highestCl = xVals[-1]
          cls[caseName] = cl
          userRanges[caseName] = userRange
          nextCls[caseName] = nextCl

            highestCls[caseName] = highestCl

        end
      end
      if userCL > max_cl
        @result['newdata'] = data
        data.each do |casename, value|
          highestCls[casename] = value[0]
        end
      end
      if effectivelevel == 3
        caseOrder = ["Industry", "Function", "Industry Group", "Function Group", "Company", "Industry and Function"]
      elsif effectivelevel == 4
        caseOrder = ["Industry Group", "Function Group", "Industry", "Function", "Company", "Industry and Function"]
      else
        caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]

      end
      # caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
      highestFilter = ""
      caseOrder.each do |caseName|
        if xOut[caseName] != []
          highestFilter = caseName
          break
        end
      end
      userDesigs = getDesigs(cls, userCompany, userIndustry, userFunction, userRanges)
      print "all user designations:------------------------------------\n"
      print userDesigs
      nextDesigs = getDesigs(nextCls, userCompany, userIndustry, userFunction, userRanges)
      print "\nall next CL designations:------------------------------------\n"
      print nextDesigs
      highestDesigs = getDesigs(highestCls, userCompany, userIndustry, userFunction, userRanges)
      print "\nall highest CL designations:------------------------------------\n"
      print highestDesigs
      if highestFilter != ""
        userRange = userRanges[highestFilter]
        xVals = xValsAll[highestFilter]
        print "\nHighest Filter---------------------------------------\n"
        print highestFilter
        userAvailable2, relativeScores2, medianSalaries, medianScores, userScores2 = growthScores(cls, userCompany, userIndustry, userFunction, userRanges, xValsAll, allValues)
        print "\nData Available in specific:-------------------------------------------- \n"
        print userAvailable2
        print "\nRelative CL specific scores:-------------------------------------------- \n"
        print relativeScores2
        print "\nMedian Salaries:-------------------------------------------- \n"
        print medianSalaries
        print "\nMedian Scores:-------------------------------------------- \n"
        print medianScores
        print "\nUser Vals:-------------------------------------------- \n"
        print userScores2
        print "user Range"
        print userRange

        graph1Vals = graph1Only(userCL, userCompany, userIndustry, userFunction)


        @newtext = graph1Text(graph1Vals, xOut)
        @result['newtext'] = @newtext
        ppx = true
        @result['ppx'] = ppx

        userPerc, allPerc = getUserPercentile(userSalary, cls[highestFilter], userIndustry, userFunction, userCompany, userAvailable1, userRange)
        print "\n User Percentile: \n"
        print userPerc
        print "\n All Percentile: \n"
        print allPerc
        @result["userScore1"] = userScores1[highestFilter]
        @result["userScore2"] = userScores2[highestFilter]
        @result["userPerc"] = userPerc[highestFilter]
        @result["graph1Vals"] = graph1Vals[highestFilter]
        @result["highestFilter"] = highestFilter
        @result["highestFilterCL"] = highestFilterCL
        @result["userDesigs"] = userDesigs
        @result["nextDesigs"] = nextDesigs
        @result["highestDesigs"] = highestDesigs
        if userRange
          @result["minlevel"] = xVals[0][0]
          @lastrange = xVals[xVals.length - 1]
          @result["maxlevel"] = @lastrange[@lastrange.length - 1]
          @result["userMedSal"] = medianSalaries[highestFilter][@xCL]
        else
          @result["minlevel"] = xVals[0]
          @result["maxlevel"] = xVals[xVals.length - 1]
          if medianSalaries[highestFilter].has_key?(cl.to_f)
            @result["userMedSal"] = medianSalaries[highestFilter][cl.to_f]
          end
        end
        return @result

      else
        ppx = false
        @result['ppx'] = ppx
        # data = highest(userCompany, userIndustry, userFunction)

        userRanges = {"Company" => false, "Industry and Function" => false, "Industry" => false, "Function" => false, "Industry Group" => false, "Function Group" => false}
        highestDesigs = getDesigs(highestCls, userCompany, userIndustry, userFunction, userRanges)
        @result["highestDesigs"] = highestDesigs
        graph1Vals = graph1Only(userCL, userCompany, userIndustry, userFunction)
        @newtext = graph1Text(graph1Vals, xOut)
        @result['newtext'] = @newtext
        graph1Vals.each do |k, v|
          @result["graph1Vals"] = v
          @result["highestFilter"] = k
          break
        end
        return @result
      end
    end
  end


  def calPromotionPressure(cl, company, industry, function, filter, salary)
    @yAxis = Array.new
    @xAxis = Array.new
    @yAxis1 = Array.new
    @yAxis2 = Array.new
    @yAxis12 = Array.new
    userCompany = company
    userIndustry = industry
    userFunction = function
    userCL = cl
    # userCL = 10
    # userCompany = "Wipro Technologies"
    # userIndustry = "Information Technology and Services"
    #userFunction = "Quality Assurance"
    salary = salary * 100000
    @allresultData = {"Your Company" => {'salaryGrowth' => -1},
                      "Your Industry and Function" => {'salaryGrowth' => -1},
                      "Your Function Group" => {'salaryGrowth' => -1},
                      "Your Industry Group" => {'salaryGrowth' => -1},
                      "Your Industry" => {'salaryGrowth' => -1},
                      "Your Function" => {'salaryGrowth' => -1}
    }
    userAvailable1, relativeScores1, allValues, userScores1 = whileQuestionnaire(userCompany, userIndustry, userFunction)
    print "Relative Overall Scores:---------------------------------- \n"
    print relativeScores1
    print "\nData Availability in overall scores:-------------------------------------------- \n"
    print userAvailable1
    print "\nUser Vals:-------------------------------------------- \n"
    print userScores1
    xOut = ppx(userCompany, userIndustry, userFunction, userCL, userAvailable1)
    if xOut != []
      print "\nall xOuts:-------------------------------------------- \n"
      print xOut
      cls = {}
      userRanges = {}
      xValsAll = {}
      nextCls = {}
      highestCls = {}
      clInd = -1
      xOut.each do |caseName, caseVals|
        if caseVals.length > 0
          graphType = caseVals[0]
          xVals = caseVals[1]
          xValsAll[caseName] = xVals
          if graphType == "g1"
            userRange = false
            cl = userCL
            clInd = xVals.find_index(cl)
          else
            userRange = true
            clInd = -1
            xVals.each do |vals|
              clInd += 1
              if vals.include?(userCL)
                cl = vals
                break
              end
            end
          end
          if clInd != xVals.length
            nextCl = xVals[clInd + 1]
          else
            nextCl = nil
          end

          highestCl = xVals[-1]
          cls[caseName] = cl
          userRanges[caseName] = userRange
          nextCls[caseName] = nextCl
          highestCls[caseName] = highestCl
        end
      end
      xVals = Array.new
      if filter != ""
        highestFilter = filter
      else
        caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
        highestFilter = ""

        caseOrder.each do |caseName|
          if xOut[caseName] != []
            highestFilter = caseName
            break
          end
        end
        print "\nHighest Filter---------------------------------------\n"
        print highestFilter

      end
      userAvailable2, relativeScores2, medianSalaries, medianScores, userScores2 = growthScores(cls, userCompany, userIndustry, userFunction, userRanges, xValsAll, allValues)
      print "\nData Available in specific:-------------------------------------------- \n"
      print userAvailable2
      print "\nRelative CL specific scores:-------------------------------------------- \n"
      print relativeScores2
      print "\nMedian Salaries:-------------------------------------------- \n"
      print medianSalaries
      print "\nMedian Scores:-------------------------------------------- \n"
      print medianScores
      print "\nUser Vals:-------------------------------------------- \n"
      print userScores2

      userRange = userRanges[highestFilter]
      if userRange
        for x in 0..xValsAll[highestFilter].length - 1
          if xValsAll[highestFilter][x].length > 1
            xVals.push (xValsAll[highestFilter][x][0].to_s[0..-3] + "-" + xValsAll[highestFilter][x][xValsAll[highestFilter][x].length - 1].to_s[0..-3])
          end
        end
      else
        xVals = xValsAll[highestFilter]
      end
      print "\nHighest Filter:-------------------------------------------- \n"
      print highestFilter
      print "\nx-values:-------------------------------------------- \n"
      print xVals

      ppYVals = ppy(userCL, userCompany, userIndustry, userFunction, userRanges, xValsAll)
      print "\nPP y Values:-------------------------------------------- \n"
      print ppYVals
      outBars, hiLo = getGrowthBars(relativeScores1, relativeScores2, medianScores, userScores1, userScores2, industry, function)
      print "\nGrowth Bars \n"
      print outBars
      print "\nHigh/Low for text\n"
      print hiLo
      outSalary, outCL = topGrowthBars(relativeScores1, relativeScores2, userScores1, userScores2)
      print "\nTop Growth Bars-----------------------------------------------\n"
      print "Salary-----------------------------------------------\n"
      print outSalary
      print "\nCareer Level-----------------------------------------------\n"
      print outCL
      print "\n"

      userDesigs = getDesigs(cls, userCompany, userIndustry, userFunction, userRanges)
      print "all user designations:------------------------------------\n"
      print userDesigs
      nextDesigs = getDesigs(nextCls, userCompany, userIndustry, userFunction, userRanges)
      print "\nall next CL designations:------------------------------------\n"
      print nextDesigs
      highestDesigs = getDesigs(highestCls, userCompany, userIndustry, userFunction, userRanges)
      print "\nall highest CL designations:------------------------------------\n"
      print highestDesigs


      @userScore1 = userScores1[highestFilter]
      if !userScores2[highestFilter].nil?
        @userScore2 = userScores2[highestFilter]
      end
      print @userScore1
      print "\n"
      print @userScore2
      print "\n"

      @ppy = ppYVals[highestFilter]
      if !@ppy.nil?
        @ppy.each do |k, v|
          @yAxis12.push v
        end
      end
      # @yAxis12=@ppy.values                                                                                                                                                                                                                                                                                                        @yAxis12=(f[highestFilter].to_h.values).reverse
      @sumofArray = @yAxis12.sum
      for y1 in 0..@yAxis12.length - 1
        @valPP = ((@yAxis12[y1].to_f / @sumofArray.to_f) * 100).round(2)
        if @valPP == 0
          @valPP = ((@yAxis12[y1].to_f / @sumofArray.to_f) * 100).round(5)
        end
        @yAxis.push @valPP
      end
      @yAxis = @yAxis.reverse
      (@yAxis.length - 1).downto(1) do |x|
        if @yAxis[x] > @yAxis[x - 1]
          @diff = (@yAxis[x - 1] - @yAxis[x]).abs / @yAxis[x - 1]
          if @diff >= 0.15
            @yAxis1[x] = @yAxis[x]
          end
        end
      end
      @yAxis2 = medianSalaries[highestFilter].to_h.values
      @resultPro = Hash.new
      @resultPro["yAxis2"] = []
      for y in 0..@yAxis2.length - 1
        @resultPro["yAxis2"].push (@yAxis2[y].to_f / 100000.to_f).round(2)
      end
      @resultPro["yAxis"] = @yAxis
      @resultPro["xAxisLine"] = xVals
      if !@resultPro["xAxisLine"].nil?
        @resultPro["xAxis"] = @resultPro["xAxisLine"].reverse
      end
      @xAxis = @resultPro["xAxis"]
      @resultPro["yAxis1"] = @yAxis1
      @resultPro["yAxisLine"] = @resultPro["yAxis2"]
      if !@resultPro["yAxis2"].nil?
        @resultPro["yAxis2"] = @resultPro["yAxis2"].reverse
      end
      @resultPro["title"] = @title
      if @resultPro.count > 0
        @result["nxtGrowthfactor"] = {}
        @result["nxtGrowthfactor"]["medianSalHiLvl"] = ((@userScore1[@userScore1.length - 3].to_f / 100000.to_f)).to_f.round(2)
        @result["nxtGrowthfactor"]["HiLevelGrowth"] = (((@userScore1[@userScore1.length - 3] - salary).to_f / salary.to_f) * 100).to_f.round(2)
        if !@xAxis.nil? && @xAxis[0] != (@userScore1[@userScore1.length - 4]) && highestFilter == 'Industry'
          @result["nxtGrowthfactor"]["HiLvlReachable"] = (@userScore1[@userScore1.length - 4]) + 1
        else
          @result["nxtGrowthfactor"]["HiLvlReachable"] = (@userScore1[@userScore1.length - 4])
        end
        @result["nxtGrowthfactor"]["avGLevelPer"] = (@userScore1[@userScore1.length - 2].to_f).to_f.round(2)
        @result["nxtGrowthfactor"]["avgSalary"] = (@userScore1[@userScore1.length - 1].to_f / 100000.to_f).to_f.round(2)
        if !@userScore2.nil?
          @result["nxtGrowthfactor"]["nxtlevlCL"] = @userScore2[@userScore2.length - 4].to_f.round(2)
          @result["nxtGrowthfactor"]["HiLevelDiff"] = (@userScore2[@userScore2.length - 3]).to_f.round(2)
          @result["nxtGrowthfactor"]["median"] = (@userScore2[@userScore2.length - 2].to_f / 100000.to_f).to_f.round(2)
          @result["nxtGrowthfactor"]["medianPer"] = (((@userScore2[@userScore2.length - 2] - salary).to_f / salary.to_f) * 100).to_f.round(2)
        end
        @result["btnStatus"] = []
        userAvailable2.each do |bk, bv|
          if bv == 1
            @result["btnStatus"].push bk
          end
        end
        @filterWiseHash["promotion"] = @resultPro
        @filterWiseHash["compensation"] = @result
        @allresultData["Your " + highestFilter] = @filterWiseHash
      end
      @allresultData.each do |k, v|
        case k
        when "Your Company"
          if v.count > 0 && ppYVals.has_key?('Company')
            @temp = outBars["Company"]
            v["salaryGrowth"] = ((@temp[0].to_f / @temp[1].to_f) * 100).round(2)
            if v.has_key?('compensation')
              v['compensation']['nxtGrowthfactor']['nxtlevl'] = ((outCL[0].to_f / outCL[1].to_f) * 100).round(2)
              v['compensation']['nxtGrowthfactor']['avGSalaryPer'] = ((outSalary[0].to_f / outSalary[1].to_f) * 100).round(2)
            end
          end
        when "Your Industry and Function"
          if v.count > 0 && ppYVals.has_key?('Industry and Function')
            @temp = outBars["Industry and Function"]
            v["salaryGrowth"] = ((@temp[0].to_f / @temp[1].to_f) * 100).round(2)
            if v.has_key?('compensation')
              v['compensation']['nxtGrowthfactor']['nxtlevl'] = ((outCL[0].to_f / outCL[1].to_f) * 100).round(2)
              v['compensation']['nxtGrowthfactor']['avGSalaryPer'] = ((outSalary[0].to_f / outSalary[1].to_f) * 100).round(2)
            end
          end
        when "Your Function"
          if v.count > 0 && ppYVals.has_key?('Function')
            @temp = outBars["Function"]
            v["salaryGrowth"] = ((@temp[0].to_f / @temp[1].to_f) * 100).round(2)
            if v.has_key?('compensation')
              v['compensation']['nxtGrowthfactor']['nxtlevl'] = ((outCL[0].to_f / outCL[1].to_f) * 100).round(2)
              v['compensation']['nxtGrowthfactor']['avGSalaryPer'] = ((outSalary[0].to_f / outSalary[1].to_f) * 100).round(2)
            end
          end
        when "Your Industry"
          if v.count > 0 && ppYVals.has_key?('Industry')
            @temp = outBars["Industry"]
            v["salaryGrowth"] = ((@temp[0].to_f / @temp[1].to_f) * 100).round(2)
            if v.has_key?('compensation')
              v['compensation']['nxtGrowthfactor']['nxtlevl'] = ((outCL[0].to_f / outCL[1].to_f) * 100).round(2)
              v['compensation']['nxtGrowthfactor']['avGSalaryPer'] = ((outSalary[0].to_f / outSalary[1].to_f) * 100).round(2)
            end
          end
        when "Your Function Group"
          if v.count > 0 && ppYVals.has_key?('Function Group')
            @temp = outBars["Function Group"]
            v["salaryGrowth"] = ((@temp[0].to_f / @temp[1].to_f) * 100).round(2)
            if v.has_key?('compensation')
              v['compensation']['nxtGrowthfactor']['nxtlevl'] = ((outCL[0].to_f / outCL[1].to_f) * 100).round(2)
              v['compensation']['nxtGrowthfactor']['avGSalaryPer'] = ((outSalary[0].to_f / outSalary[1].to_f) * 100).round(2)
            end
          end
        when "Your Industry Group"
          if v.count > 0 && ppYVals.has_key?('Industry Group')
            @temp = outBars["Industry Group"]
            v["salaryGrowth"] = ((@temp[0].to_f / @temp[1].to_f) * 100).round(2)
            if v.has_key?('compensation')
              v['compensation']['nxtGrowthfactor']['nxtlevl'] = ((outCL[0].to_f / outCL[1].to_f) * 100).round(2)
              v['compensation']['nxtGrowthfactor']['avGSalaryPer'] = ((outSalary[0].to_f / outSalary[1].to_f) * 100).round(2)
            end
          end
        end
      end
      @allresultData["PP_Text"] = hiLo
      @allresultData["highestFilter"] = highestFilter

      @allresultData["nextDesigs"] = nextDesigs
      @allresultData["userDesigs"] = userDesigs
      @allresultData["highestDesigs"] = highestDesigs
      # @allresultData["PP_Text"]=getPPAnalysisText(@allresultData["PP_Text"])
      return @allresultData

    end
  end

  def calCC(cl, company, industry, function, filter, salary, xValue, graphtype)
    # @resultdata=Hash.new
    # @resultdata=resultData
    @yAxis = Array.new
    @xAxis = Array.new
    @yAxis1 = Array.new
    @yAxis2 = Array.new
    if filter == "" || (graphtype == 4 || graphtype == 5)
      userCL = cl #20
      userCompany = company #"MINDA SILCA ENGINEERING"
      userIndustry = industry #"Automotive"
      userFunction = function # "ENGINEERING"
      userSalary = salary * 100000
      # userAvailable=filter
      userAvailable, relativeScores, maxValues, medianScores1 = whileQuestionnaire(userCompany, userIndustry, userFunction)
      xOut = ccx(userCompany, userIndustry, userFunction, userCL, userAvailable)
      if xOut != []
        graphType, xVals, highestFilter = xOut
        print "Graph Type----------------------------------------\n"
        print graphType
        print "\nCLs---------------------------------------------\n"
        print xVals
        print "\nHighest Filter-----------------------------------\n"
        print highestFilter
        @indexofCL = 0
        userRange = false
        if graphType == 1
          @xCL = xVals.index(userCL)
          userRange == false
          cl = userCL
          out = ccy(userCL, userCompany, userIndustry, userFunction, highestFilter, xVals, graphType)
          print out
        elsif graphType == 2
          @xCL = -1
          xVals.each do |vals|
            @xCL = @xCL + 1
            if vals.include?(userCL)
              cl = vals
              break
            end
          end
          userRange == false
          cl = userCL
          out = ccy(userCL, userCompany, userIndustry, userFunction, highestFilter, xVals, graphType)
          print out
        elsif graphType == 3
          userRange = true
          @xCL = -1
          xVals.each do |vals|
            @xCL = @xCL + 1
            if vals.include?(userCL)
              cl = vals
              break
            end
          end
          out = ccy(userCL, userCompany, userIndustry, userFunction, highestFilter, xVals, graphType)
          print out
        elsif graphType == 4
          userRange == false
          cl = userCL
          @xCL = 0
        elsif graphType == 5
          userRange = true
          cl = xVals[0]
          @xCL = 0
        end
        e = graph1Only(userCL, userCompany, userIndustry, userFunction)
        print e
        print cl
        userPerc, allPerc = getUserPercentile(userSalary, cl, userIndustry, userFunction, userCompany, userAvailable, userRange)
        print "\n User Percentile: \n"
        print userPerc
        print "\n All Percentile: \n"
        print allPerc
        @indexofCL = @xCL
        if filter != ""
          highestFilter = filter
        end
        if graphType == 2
          @result = Hash.new
          @tmp = out[highestFilter]
          @xAxis = Hash.new
          @userLvl = Hash.new
          @userLvl1 = Array.new
          @tmp.each do |k, v|
            if k.length == 1 && k[0] == userCL
              @userLvl[k] = v
            else
              if k[k.length - 1] < userCL
                @xAxis[k] = v
                @userLvl1.push k
              elsif k[k.length - 1] > userCL
                if @userLvl1.length > 0
                  @last = @userLvl1[@userLvl1.length - 1]
                  if @last[@last.length - 1] < userCL
                    # @xAxis[]= @userLvl
                    @userLvl.each do |l, v|
                      @xAxis[l] = v
                    end
                    @userLvl1.push @userLvl.keys
                  end
                  @xAxis[k] = v
                  @userLvl1.push k
                else
                  @userLvl.each do |l, v|
                    @xAxis[l] = v
                  end
                  @xAxis[k] = v
                  @userLvl1.push k
                end

              end
            end
          end
          if @userLvl1.is_a?(Array)
            if !@userLvl1.include?(userCL)
              @userLvl.each do |l, v|
                @xAxis[l] = v
              end
            end
          end
          @result = CalculateCompensationGraph(@xAxis, userCL, @indexofCL)
        elsif graphType == 3
          @result = CalculateCompensationGraph(out[highestFilter], userCL, @indexofCL)
        elsif graphType == 1
          @result = CalculateCompensationGraph(out[highestFilter], userCL, @indexofCL)
        else
          @result = CalculateCompensationGraph([], userCL, @indexofCL)
        end
        @result["graph1"] = e
        @result["userPercentile"] = userPerc
        @result["graphType"] = graphType
        @result["allPercentile"] = []
        @result["allPercentile"] = allPerc
        @result["actualXVal"] = xVals

        if graphType <= 3
          @result["actualYVal"] = out
        else
          @result["actualYVal"] = allPerc
        end
        @result["highFilter"] = highestFilter
        @result["UserPos"] = userPerc[highestFilter]
        return @result
      else
        e = graph1Only(userCL, userCompany, userIndustry, userFunction)
        print e
        print cl
        userPerc, allPerc = getUserPercentile(userSalary, cl, userIndustry, userFunction, userCompany, userAvailable, userRange)
        print "\n User Percentile: \n"
        print userPerc
        print "\n All Percentile: \n"
        print allPerc
        @result["graph1"] = e
        @result["userPercentile"] = userPerc
        return @result
      end
    else
      userCL = cl #20
      userCompany = company #"MINDA SILCA ENGINEERING"
      userIndustry = industry #"Automotive"
      userFunction = function # "ENGINEERING"
      userSalary = salary * 100000
      xVals = xValue
      graphType = graphtype
      if xVals != []
        highestFilter = filter
        # graphType, xVals = xOut
        print graphType
        print "\n"
        print xVals
        print "\n"
        @indexofCL = 0
        userRange = false
        if graphType == 1
          @xCL = xVals.index(userCL)
          userRange == false
          cl = userCL
          out = ccy(userCL, userCompany, userIndustry, userFunction, highestFilter, xVals, graphType)
          print out
        elsif graphType == 2
          @xCL = -1
          xVals.each do |vals|
            @xCL = @xCL + 1
            if vals.include?(userCL)
              cl = vals
              break
            end
          end
          userRange == false
          cl = userCL
          out = ccy(userCL, userCompany, userIndustry, userFunction, highestFilter, xVals, graphType)
          print out
        elsif graphType == 3
          userRange = true
          @xCL = -1
          xVals.each do |vals|
            @xCL = @xCL + 1
            if vals.include?(userCL)
              cl = vals
              break
            end
          end
          out = ccy(userCL, userCompany, userIndustry, userFunction, highestFilter, xVals, graphType)
          print out
        elsif graphType == 4
          userRange == false
          cl = userCL
          @xCL = 0
          userPerc, allPerc = getUserPercentile(userSalary, cl, userIndustry, userFunction, userCompany, userAvailable, userRange)
          print "\n User Percentile: \n"
          print userPerc
          print "\n All Percentile: \n"
          print allPerc
        elsif graphType == 5
          userRange = true
          cl = xVals[0]
          @xCL = 0
          userPerc, allPerc = getUserPercentile(userSalary, cl, userIndustry, userFunction, userCompany, userAvailable, userRange)
          print "\n User Percentile: \n"
          print userPerc
          print "\n All Percentile: \n"
          print allPerc
        end

        @indexofCL = @xCL

        if graphType == 2
          @result = Hash.new
          @tmp = out[highestFilter]
          @xAxis = Hash.new
          @userLvl = Hash.new
          @userLvl1 = Array.new
          @tmp.each do |k, v|
            if k.length == 1 && k[0] == userCL
              @userLvl[k] = v
            else
              if k[k.length - 1] < userCL
                @xAxis[k] = v
                @userLvl1.push k
              elsif k[k.length - 1] > userCL
                @last = @userLvl1[@userLvl1.length - 1]
                if @last[@last.length - 1] < userCL
                  # @xAxis[]= @userLvl
                  @userLvl.each do |l, v|
                    @xAxis[l] = v
                  end
                  @userLvl1.push @userLvl.keys
                end
                @xAxis[k] = v
                @userLvl1.push k
              end
            end
          end
          if @userLvl1.is_a?(Array)
            if !@userLvl1.include?(userCL)
              @userLvl.each do |l, v|
                @xAxis[l] = v
              end
            end
          end
          @result = CalculateCompensationGraph(@xAxis, userCL, @indexofCL)
        elsif graphType == 1 || graphType == 3
          @result = CalculateCompensationGraph(out[highestFilter], userCL, @indexofCL)
        else
          @result = CalculateCompensationGraph([], userCL, @indexofCL)
        end
        # @result["graph1"]=e
        @result["UserPos"] = userPerc[highestFilter]
        return @result
      end

    end

  end

  def CalculateCompensationGraph(array, level, indexLevel)
    @xAxis8 = Array.new
    @xAxis50 = Array.new
    @xAxis9 = Array.new
    @xAxis = Array.new
    @yaxis = Array.new
    @allArraye = Array.new
    @allArraye = array
    @mylevel = level
    @per8 = 0
    @per9 = 0
    @per50 = 0
    @maxofSalary = 0
    @index = 0
    if @allArraye.length > 0
      @allArraye.each do |k, v|
        if k.is_a?(Array)
          if k.length > 1
            @xAxis.push k[0].to_s + "-" + k[k.length - 1].to_s
          else
            @xAxis.push k[0].to_s
          end

        else
          @xAxis.push k
        end

        if true
          @xAxis8.push (v[0].to_f / 100000.to_f).to_f.round(2)
          @xAxis50.push (v[1].to_f / 100000.to_f).to_f.round(2)
          @xAxis9.push (v[2].to_f / 100000.to_f).to_f.round(2)
          if @maxofSalary < @xAxis8.max
            @maxofSalary = @xAxis8.max
          end
          if @maxofSalary < @xAxis9.max
            @maxofSalary = @xAxis8.max
          end
          if @maxofSalary < @xAxis50.max
            @maxofSalary = @xAxis50.max
          end
        else
          @xAxis.delete_at(@xAxis.length - 1)
        end
        @per8 = 0
        @per9 = 0
        @per50 = 0
        @isFound = true
      end
      # @index=@xAxis.index(@mylevel)
      @yaxis[indexLevel] = @maxofSalary
      @result["yaxis"] = @yaxis
      @result["xAxis"] = @xAxis
      @result["xAxis8"] = @xAxis8
      @result["xAxis9"] = @xAxis9
      @result["xAxis50"] = @xAxis50
      @result["index"] = indexLevel
      @result["mylevel"] = @mylevel
      @result["title"] = @title
      return @result
    else
      @xAxis8.push 5
      # @index=@xAxis.index(@mylevel)
      @yaxis[0] = 0
      @result["yaxis"] = @yaxis
      @result["xAxis"] = @xAxis
      @result["xAxis8"] = @xAxis8
      @result["xAxis9"] = @xAxis9
      @result["xAxis50"] = @xAxis50
      @result["index"] = indexLevel
      @result["mylevel"] = @mylevel
      @result["title"] = @title
      return @result
    end

  end

  ####################
  def getIndustryGroup(industry)
    indGroupPath = $filePath + "industryGroups.txt"
    file = open(indGroupPath, 'r')
    text = file.read
    file.close
    textList = text.split("\n")
    textList.each do |row|
      rowList = row.split(";")
      if rowList[0] == industry
        # print "Ind Group "
        tmpIndus = rowList[1].strip.split("+")
        industryGroup = []
        tmpIndus.each do |s|
          industryGroup.push s.to_s.squish
        end
        # print industryGroup
        return industryGroup
      end
    end
  end

  def getFunctionGroup(function)
    fnGroupPath = $filePath + "functionGroups.txt"
    file = open(fnGroupPath, 'r')
    text = file.read
    file.close
    textList = text.split("\n")
    textList.each do |row|
      rowList = row.split(";")
      if rowList[0] == function
        tmpGroup = rowList[1].split("+")
        functionGroup = []
        tmpGroup.each do |s|
          functionGroup.push s.to_s.squish
        end
        return functionGroup
      end
    end
  end

  def getMedianVals(allScores)
    sums = []
    median = 0
    allScores.each do |key, value|
      sums.push(value)
    end
    if sums != []

      sums = sums.sort!
      len = sums.length
      if len % 2 == 0
        median = ((sums[len / 2] + sums[(len / 2) - 1]) / 2)
      else
        median = sums[(len / 2).round(0) - 1]
      end
    end
    return median
  end

  def whileQuestionnaire(userCompany, userIndustry, userFunction)
    #Used for getting the overall score values - this can be done while the user is filling the questionnaire
    #Inputs - user's company, industry and function
    #outputs - userAvailable,relativeScores,maxValues,medValues:
    #userAvailable - {"Company" => 1/0, "Industry and Function" => 1/0 , etc.}
    #relativeScores - has the user score divided by max score:
    # {"Company"=>[max CL in user's company/maximum max-CL over all companies in user's industry and function,
    #              median salary at max CL in user's company/maximum median salary at max CL over all companies in user's industry and function,
    #             Avg % people jumping from one level to next/maximum over all companies in user's industry and function,
    #             Avg. salary increase per level/maximum over all companies in user's industry and function],
    # "Industry and Function"=> [s1,s2,s3,s4] - scores are divided by maximum over all industry and function combinations in user's industry and function groups,
    # "Industry" => [s1,s2,s3,s4] - scores are divided by maximum over all industries in user's industry group
    # "Function" => [s1,s2,s3,s4] - scores are divided by max over all functions in user's function group
    # "Industry Group" => [s1,s2,s3,s3] - scores are divided by max over all industry groups
    # "Funcion Group" => [s1,s2,s3,s4] - scores are divided by max over all function groups}
    #maxValues - has all the max values that have been used to divide the user's scores with to get the relativeScores above:
    # {"Company" => [maximum maxCL over all companies in user's industry and function,
    #                maximum median salary at the maxCL over all companies in user's industry and function,
    #                maximum avg % people, maximum avg salary increase], "Industry and Function" => [s1,s2,s3,s4], etc.}
    #medValues - has the median of each score in each category:
    # {"Company" => [median maxCL over all companies in user's industry and function,
    #                median median salary at the maxCL over all companies in user's industry and function,
    #                median avg % people, median avg salary increase], "Industry and Function" => [s1,s2,s3,s4], etc.}
    #filter data for user's company, industry, function, industry group, function group
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    overallPath1 = $filePath + "oScoresCompIndFn.txt"
    overallPath2 = $filePath + "oScoresIndFn.txt"
    overallPath3 = $filePath + "oScoresInd.txt"
    overallPath4 = $filePath + "oScoresFn.txt"
    overallPath5 = $filePath + "oScoresIndG.txt"
    overallPath6 = $filePath + "oScoresFnG.txt"
    caseNames = {overallPath1 => "Company", overallPath2 => "Industry and Function", overallPath3 => "Industry", overallPath4 => "Function", overallPath5 => "Industry Group",
                 overallPath6 => "Function Group"}
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
             "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]], "Function Group" => [[0], [fnGroup]]}
    cases2 = {"Company" => [[1, 2], [[userIndustry], [userFunction]]], "Industry and Function" => [[0, 1], [indGroup, fnGroup]],
              "Industry" => [[0], [indGroup]], "Function" => [[0], [fnGroup]], "Industry Group" => [[], []], "Function Group" => [[], []]}
    strings = {overallPath1 => [0, 1, 2], overallPath2 => [0, 1], overallPath3 => [0], overallPath4 => [0], overallPath5 => [0], overallPath6 => [0]}
    overallScores = {}
    userScores = {}
    userAvailable = {}
    relativeScores = {}
    allScores = {}
    scoreIndex = 0
    caseNames.each do |path, caseName|
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      overall = []
      userDone = 0
      textList.each do |row|
        caseFilter = cases[caseName]
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[path].include?(i)
            if caseName != "Industry Group" and caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            entry.push(rowList[i].to_f)
          end
        end
        #get user's data
        if userDone == 0
          checkUser = 1
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              checkUser = 0
              break
            end
          end
          if checkUser == 1
            userScores[caseName] = entry
            userAvailable[caseName] = 1
            userDone = 1
          end
        end
        #get data for all entries
        flag = 1
        caseFilter2 = cases2[caseName]
        if caseFilter2[0] != []
          (0..caseFilter2[0].length - 1).each do |i|
            if !caseFilter2[1][i].include?(entry[caseFilter2[0][i]])
              flag = 0
              break
            end
          end
        end
        if flag == 1
          if overallScores.key?(caseName)
            overallScores[caseName].push(entry)
          else
            overallScores[caseName] = [entry]
          end
        end
      end
      if userDone == 0
        userScores[caseName] = []
        userAvailable[caseName] = 0
      end
      if !overallScores.key?(caseName)
        overallScores[caseName] = []
      else
        if userDone != 0
          allData = overallScores[caseName]
          #find max
          scoreIndex = strings[path].max + 1
          maxVals = {}
          allData.each do |entry|
            (scoreIndex..entry.length - 1).each do |i|
              if maxVals.key?(i)
                if maxVals[i] < entry[i]
                  maxVals[i] = entry[i]
                end
              else
                maxVals[i] = entry[i]
              end
            end
          end
          #find user indexes which are non zero
          nonZero = []
          (scoreIndex..userScores[caseName].length - 1).each do |i|
            if userScores[caseName][i] != 0
              nonZero.push(i)
            end
          end
          #divide all data by max scores and sum
          allScores[caseName] = {}
          allData.each do |entry|
            sum = 0
            nonZero.each do |i|
              if maxVals[i] != 0
                sum += entry[i] / maxVals[i]
              end
            end
            toAdd = ""
            (0..scoreIndex - 1).each do |i|
              toAdd += entry[i].to_s + "_"
            end
            toAdd = toAdd[0..-2]
            allScores[caseName][toAdd] = sum
          end
          #divide user scores by maxVals
          userEntry = userScores[caseName]
          relativeScores[caseName] = []
          (scoreIndex..userEntry.length - 1).each do |i|
            if maxVals[i] != 0
              relativeScores[caseName].push((userEntry[i] / maxVals[i]).round(2))
            else
              relativeScores[caseName].push(0)
            end
          end
        else
        end
      end
    end
    return userAvailable, relativeScores, allScores, userScores
  end

  def ppx1(userCompany, userIndustry, userFunction, userCL, dataAvailable)
    #Used for looking up the y-axis values in promotion pressures graph
    #Inputs - user's company, industry, function, CL, and dataAvailable is "userAvailable" obtained from whileQuestionnaire function above
    #Outputs - xOut = [caseName,graphType,xVals,maxLevelFlag,nextLevelFlag]; caseName is the highest filter at which data is avaialble for making the
    #promotion pressures graph (so it will be "Company" if data is available for user's company, industry and function), graphType is "g1" is y axis has
    #cl values and "g2" is y axis has cl ranges, xVals is an array with the y-axis values so for g1 type it will be something like [12,13,14,15] and for
    #g2 type it will be [[12,13],[14,15],[16,17]],maxLevelFlag is 1 if data is there for a higher level than user CL and 0 otherwise, nextLevelFlag is 1 if
    #data is available for user CL + 1
    #promotion pressures
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #x-axis paths
    path1 = $filePath + "ppCompIndFn.txt"
    path2 = $filePath + "ppIndFn.txt"
    path3 = $filePath + "ppFn.txt"
    path4 = $filePath + "ppInd.txt"
    path5 = $filePath + "ppFnG.txt"
    path6 = $filePath + "ppIndG.txt"
    cases = {"Company" => [[0, 1, 2, 3], [userCompany, userIndustry, userFunction, userCL]], "Industry and Function" => [[0, 1, 2], [userIndustry, userFunction, userCL]],
             "Industry" => [[0, 1], [userIndustry, userCL]], "Function" => [[0, 1], [userFunction, userCL]], "Industry Group" => [[0, 1], [indGroup, userCL]],
             "Function Group" => [[0, 1], [fnGroup, userCL]]}
    caseNames = {path1 => "Company", path2 => "Industry and Function", path4 => "Industry", path3 => "Function", path6 => "Industry Group",
                 path5 => "Function Group"}
    strings = {path1 => [0, 1, 2, 4], path2 => [0, 1, 3], path3 => [0, 2], path4 => [0, 2], path5 => [0, 2], path6 => [0, 2]}
    xOut = {}
    caseNames.each do |path, caseName|
      if dataAvailable[caseName] == 0
        next
      end
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      caseFilter = cases[caseName]
      checkUser = 0
      xVals = []
      graphType = ""
      maxLevelFlag = 0
      nextLevelFlag = 0
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[path].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
              if i == strings[path].max
                graphType = entry[-1]
              end
            else
              if i == strings[path].max
                entry.push(rowList[i])
                graphType = entry[-1]
              else
                group = rowList[i].split("[")
                group = group[1].split("]")
                group = group[0].split("+")
                entry.push(group)
              end
            end
          else
            if i == strings[path].max - 1
              entry.push(rowList[i].to_f)
            elsif i == strings[path].max + 1
              if graphType == "g1"
                #[[11], [12], [13], [14], [15], [16]]
                clValues = rowList[i][1..-2]
                clValues = clValues.split(", ")
                toAdd = []
                clValues.each do |clValue|
                  toAdd.push(clValue[1..-2].to_f)
                end
                entry.push(toAdd)
              else
                #[[9, 10, 11], [12, 13, 14], [15, 16, 17]]
                clValues = rowList[i][1..-3]
                #[9, 10, 11], [12, 13, 14], [15, 16, 17
                clValues = clValues.split("], ")
                #"[9, 10, 11","[12, 13, 14","[15, 16, 17"
                toAdd = []
                clValues.each do |clRange|
                  #"[9, 10, 11"
                  toAdd.push(clRange[1..-1].split(", ").map {|s| s.to_f}) #[9,10,11]
                end
                entry.push(toAdd)
              end
            else
              entry.push(rowList[i].to_f)
            end
          end
        end
        checkUser = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            checkUser = 0
            break
          end
        end
        if checkUser == 1
          maxLevelFlag = entry[-1]
          nextLevelFlag = entry[-2]
          xVals = entry[-3]
          break
        end
      end
      if checkUser == 0
        xOut[caseName] = []
        next
      else
        xOut[caseName] = [graphType, xVals, maxLevelFlag, nextLevelFlag]
      end
    end
    return xOut
  end

  def ppy1(userCL, userCompany, userIndustry, userFunction, userRanges, xValsAll)
    #Used for getting the x-axis (count) values of the promotion pressures graph once we have the y-axis (CL) values; This also returns the values of the
    #first graph in the report that has % people above, at , below your CL
    #Inputs - user's CL, company, industry and function, highestFilter (got from caseName returned in the ppx function), xVals (these are the y axis values on the
    #PP grpah got from the ppx funtion above) and userRange(this is 1 if xVals has ranges of cl and 0 if it has actual cl values)
    #Outputs - out,ppY:
    #out - has values for graph 1 of report {"Company"=>[%people below userCL, %people at userCL, %people above userCL], etc}
    #ppY - has the count of entries for all values/ranges in xVals (so for xVals = [12,13,14,15] - {"Company"=>[count at 12,count at 13, count at 14, count at 15], etc.}
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #your CL percentile
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
             "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
             "Function Group" => [[0], [fnGroup]]}
    caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
    pathNames = {"Company" => "CompIndFn.txt", "Industry and Function" => "IndFn.txt", "Function" => "Fn.txt", "Industry" => "Ind.txt",
                 "Function Group" => "FnG.txt", "Industry Group" => "IndG.txt"}
    strings = {"Company" => [0, 1, 2], "Industry and Function" => [0, 1], "Function" => [0], "Industry" => [0], "Function Group" => [0], "Industry Group" => [0]}
    out = {}
    ppY = {}
    started = 0
    caseOrder.each do |caseName|
      path = $filePath + "graph1" + pathNames[caseName]
      if !userRanges.key?(caseName)
        next
      end
      userRange = userRanges[caseName]
      xVals = xValsAll[caseName]
      caseCount = {}
      file = open(path, 'r')
      text = file.read
      file.close
      rows = text.split("\n")
      rows.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[caseName].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            entry.push(rowList[i].to_f)
          end
        end
        caseFilter = cases[caseName]
        flag = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            flag = 0
            break
          end
        end
        if flag == 1
          if entry[strings[caseName].max + 1] == userCL
            out[caseName] = entry[strings[caseName].max + 2..-2]
          end
          if userRange == false
            if xVals.include?(entry[strings[caseName].max + 1])
              caseCount[entry[strings[caseName].max + 1]] = entry[-1]
            end
          else
            xVals.each do |clRange|
              if clRange.include?(entry[strings[caseName].max + 1])
                if caseCount.key?(clRange)
                  caseCount[clRange] += entry[-1]
                else
                  caseCount[clRange] = entry[-1]
                end
              end
            end
          end

        end

      end
      ppY[caseName] = caseCount
    end
    return out, ppY
  end

  def growthScores(userCLs, userCompany, userIndustry, userFunction, userRanges, xValsAll, allScores)
    #gets the CL specific scores
    #inputs - same as ppy function above, except here if the PP graph has CL ranges on the y-axis, userCL will have a range instead of a cl i.e. if user's CL
    #is 15 and xVals is [[12,13],[14,15],[16,17]], userCL will be [14,15] instead of 15
    #outputs - userAvailable,relativeScores,maxValues,medianValues,medianScores:
    #userAvailable - 1 id data is avaialable and 0 otherwise - {"Company"=>1,"Industry and Funcion"=>1, etc.}
    #relativeScores - are the user scores divided by max in the category - {"Company"=>[relative % people reaching next level, relative % people reaching max level,
    # relative median salary at next level, relative median salary at current level],"Industry and Function", etc.}
    #maxValues - has the max values that have been used in relative scores for division - {"Company"=>[s1,s2,s3,s4], etc.}
    #medianValues - has the median salaries of all values/ranges in xVals for plotting the last graph (salary vs Cl) - {"Company"=>[salary at 12, salary at 13, etc.]}
    #medianScores - has the median value is each score over all entries in a particular filter (similar to that in whileQuestionnaire function)
    #get industry and function groups
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)

    cases3 = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
              "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
              "Function Group" => [[0], [fnGroup]]}
    caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
    pathNames = {"Company" => "CompIndFn.txt", "Industry and Function" => "IndFn.txt", "Function" => "Fn.txt", "Industry" => "Ind.txt",
                 "Function Group" => "FnG.txt", "Industry Group" => "IndG.txt"}
    strings = {"Company" => [0, 1, 2], "Industry and Function" => [0, 1], "Function" => [0], "Industry" => [0], "Function Group" => [0], "Industry Group" => [0]}

    specificScores = {}
    userScores = {}
    userAvailable = {}
    relativeScores = {}
    maxValues = {}
    medianValues = {}
    medianScores = {}
    scoreIndex = 0
    caseOrder.each do |caseName|
      if !userCLs.key?(caseName)
        userAvailable[caseName] = 0
        relativeScores[caseName] = []
        next
      end
      userRange = userRanges[caseName]
      userCL = userCLs[caseName]
      xVals = xValsAll[caseName]
      cases = {"Company" => [[0, 1, 2, 3], [userCompany, userIndustry, userFunction, userCL]], "Industry and Function" => [[0, 1, 2], [userIndustry, userFunction, userCL]],
               "Industry" => [[0, 1], [userIndustry, userCL]], "Function" => [[0, 1], [userFunction, userCL]], "Industry Group" => [[0, 1], [indGroup, userCL]],
               "Function Group" => [[0, 1], [fnGroup, userCL]]}
      if userRange == false
        path = $filePath + "wclScores" + pathNames[caseName]
        cases2 = {"Company" => [[1, 2, 3], [[userIndustry], [userFunction], [userCL]]], "Industry and Function" => [[0, 1, 2], [indGroup, fnGroup, [userCL]]],
                  "Industry" => [[0, 1], [indGroup, [userCL]]], "Function" => [[0, 1], [fnGroup, [userCL]]], "Industry Group" => [[1], [[userCL]]], "Function Group" => [[1], [[userCL]]]}
      else
        path = $filePath + "wclrangeScores" + pathNames[caseName]
        cases2 = {"Company" => [[1, 2, 3], [[userIndustry], [userFunction], userCL]], "Industry and Function" => [[0, 1, 2], [indGroup, fnGroup, userCL]],
                  "Industry" => [[0, 1], [indGroup, userCL]], "Function" => [[0, 1], [fnGroup, userCL]], "Industry Group" => [[1], [userCL]], "Function Group" => [[1], [userCL]]}
      end
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      specific = []
      caseMeds = {}
      userDone = 0
      caseFilter = cases[caseName]
      caseFilter2 = cases2[caseName]
      caseFilter3 = cases3[caseName]
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[caseName].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            if userRange == false
              entry.push(rowList[i].to_f)
            else
              if i == strings[caseName].max + 1
                clRange = rowList[i].split("[")
                clRange = clRange[1].split("]")
                clRange = clRange[0].split(", ").map {|s| s.to_f}
                entry.push(clRange)
              else
                entry.push(rowList[i].to_f)
              end
            end
          end
        end
        #get user data
        if userDone == 0
          checkUser = 1
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              checkUser = 0
              break
            end
          end
          if checkUser == 1
            userScores[caseName] = entry
            userAvailable[caseName] = 1
            userDone = 1
          end
        end
        #get data for all entries
        flag = 1
        if userRange == false
          (0..caseFilter2[0].length - 1).each do |i|
            if !caseFilter2[1][i].include?(entry[caseFilter2[0][i]])
              flag = 0
              break
            end
          end
        else
          if caseFilter.length > 1
            (0..caseFilter2[0].length - 2).each do |i|
              if !caseFilter2[1][i].include?(entry[caseFilter2[0][i]])
                flag = 0
                break
              end
            end
          end
          if caseFilter2[1][-1] != entry[caseFilter2[0][-1]]
            flag = 0
          end
        end
        if flag == 1
          if specificScores.key?(caseName)
            specificScores[caseName].push(entry)
          else
            specificScores[caseName] = [entry]
          end
        end
        #get median salaries
        medFlag = 1
        (0..caseFilter3[0].length - 1).each do |i|
          if caseFilter3[1][i] != entry[caseFilter3[0][i]]
            medFlag = 0
            break
          end
        end
        if medFlag == 1
          if userRange == false
            if xVals.include?(entry[strings[caseName].max + 1])
              caseMeds[entry[strings[caseName].max + 1]] = entry[-1]
            end
          else
            xVals.each do |clrange|
              if clrange == entry[strings[caseName].max + 1]
                caseMeds[clrange] = entry[-1]
              end
            end
          end
        end
      end
      medianValues[caseName] = caseMeds
      if userDone == 0
        userScores[caseName] = []
        userAvailable[caseName] = 0
      end
      if !specificScores.key?(caseName)
        specificScores[caseName] = []
      else
        if userDone != 0
          allData = specificScores[caseName]
          #find max values
          scoreIndex = strings[caseName].max + 2
          maxVals = {}
          allData.each do |entry|
            (scoreIndex..entry.length - 1).each do |i|
              if maxVals.key?(i)
                if maxVals[i] < entry[i]
                  maxVals[i] = entry[i]
                end
              else
                maxVals[i] = entry[i]
              end
            end
          end
          #find user indexes which are non zero
          nonZero = []
          (scoreIndex..userScores[caseName].length - 2).each do |i|
            if userScores[caseName][i] != 0
              nonZero.push(i)
            end
          end
          #divide all data by max scores and sum
          allData.each do |entry|
            sum = 0
            nonZero.each do |i|
              if maxVals[i] != 0
                sum += entry[i] / maxVals[i]
              end
            end
            toAdd = ""
            (0..scoreIndex - 2).each do |i|
              toAdd += entry[i].to_s + "_"
            end
            toAdd = toAdd[0..-2]
            if allScores.key?(caseName)
              if allScores[caseName].key?(toAdd)
                allScores[caseName][toAdd] += sum
              else
                allScores[caseName][toAdd] = sum
              end
            else
              allScores[caseName] = {}
              allScores[caseName][toAdd] = sum
            end
          end
          if allData != []
            medianScores[caseName] = getMedianVals(allScores[caseName])
          end
          userEntry = userScores[caseName]
          relativeScores[caseName] = []
          #divide user score by max scores
          (scoreIndex..userEntry.length - 1).each do |i|
            if maxVals[i] != 0
              relativeScores[caseName].push((userEntry[i] / maxVals[i]).round(2))
            else
              relativeScores[caseName].push(0)
            end
          end
        else
          relativeScores[caseName] = []
        end
      end
    end
    return userAvailable, relativeScores, medianValues, medianScores, userScores
  end

  def getGrowthBars(overallRel, specificRel, medianScores, overallEntries, specificEntries, industry, function)
    #Gives the final values for making the bars next to the growth graphs
    #inpust - overallRel (relative scores dictionary obatined from whileQuestionnaire), specificRel (relative scores dictionary obatined from growthScores),
    #         overallMed (median scores dict. from whileQuestionnaire), specificMed (median scores dict. from growthScores)
    #outputs - outBars, hilo:
    #outBars - for each case, has the user score and highest score for plotting the bar = {"Company"=>[user company score,highest company score], etc.}
    #hilo - this is for the dynamic text that we want below the bars. {"Company" => "Low", "Industry and Function" => "High", etc.}
    outBars = {}
    hiLo = {}
    specificRel.each do |caseName, specificScores|
      if specificScores == []
        next
      end
      #sum median values
      oEntry = []
      sEntry = []
      overallScores = overallRel[caseName]
      if overallEntries.key?(caseName)
        oEntry = overallEntries[caseName][-4..-1]
      end
      if specificEntries[caseName] != []
        sEntry = specificEntries[caseName][-4..-1]
      end
      sum = 0
      count = 0
      (0..overallScores.length - 1).each do |i|
        if oEntry[i] > 0
          sum += overallScores[i]
          count += 1
        elsif oEntry[i] < 0
          count += 1
        end
      end
      (0..specificScores.length - 2).each do |i|
        if sEntry[i] > 0
          sum += specificScores[i]
          count += 1
        elsif sEntry[i] < 0
          count += 1
        end
      end
      #add to outBars
      outBars[caseName] = [sum, count]
      outBars[caseName] = [sum, count]
      #high/low
      #  if (caseName == 'Function Group' && (function == "Category Management" || function == "Education" || function == "Exploration" || function == "Fashion Design" || function == "Information Technology" || function == "Marketing" || function == "Project Management" || function == "Sales" || function == "Software Development")) || (caseName == 'Industry Group' && (industry == "Accounting" || industry == "Human Resources" || industry == "Information Services" || industry == "Management Consulting" || industry == "Outsourcing/Offshoring" || industry == "Professional Services"))
      #else
      if sum > medianScores[caseName] || sum == count
        hiLo[caseName] = "High"
      else
        hiLo[caseName] = "Low"
      end
      # end
    end
    return outBars, hiLo
  end

  def topGrowthBars(overallRel, specificRel, overallEntries, specificEntries)
    salary = 0
    salCount = 0
    careerLevel = 0
    clCount = 0
    outSalary = []
    outCL = []
    oSalIndices = [1, 3]
    oCLIndices = [0, 2]
    specSalIndices = [2]
    specCLIndices = [0, 1]
    specificRel.each do |caseName, specificScores|
      overallScores = overallRel[caseName]
      if specificScores == []
        next
      end
      if overallEntries.key?(caseName)
        oEntry = overallEntries[caseName][-4..-1]
      end
      if specificEntries.key?(caseName)
        sEntry = specificEntries[caseName][-4..-1]
      end
      #get salary score
      specSalIndices.each do |i|
        if sEntry[i] > 0
          salary += specificScores[i]
          salCount += 1
        elsif sEntry[i] < 0
          salCount += 1
        end
      end
      oSalIndices.each do |i|
        if oEntry[i] > 0
          salary += overallScores[i]
          salCount += 1
        elsif oEntry[i] < 0
          salCount += 1
        end
      end
      #get career level scores
      specCLIndices.each do |i|
        if sEntry[i] > 0
          careerLevel += specificScores[i]
          clCount += 1
        elsif sEntry[i] < 0
          clCount += 1
        end
      end
      oCLIndices.each do |i|
        if oEntry[i] > 0
          careerLevel += overallScores[i]
          clCount += 1
        elsif oEntry[i] < 0
          clCount += 1
        end
      end
    end
    outSalary = [salary, salCount]
    outCL = [careerLevel, clCount]
    return outSalary, outCL
  end

  def ppx(userCompany, userIndustry, userFunction, userCL, dataAvailable)
    #Used for looking up the y-axis values in promotion pressures graph
    #Inputs - user's company, industry, function, CL, and dataAvailable is "userAvailable" obtained from whileQuestionnaire function above
    #Outputs - xOut = [caseName,graphType,xVals,maxLevelFlag,nextLevelFlag]; caseName is the highest filter at which data is avaialble for making the
    #promotion pressures graph (so it will be "Company" if data is available for user's company, industry and function), graphType is "g1" is y axis has
    #cl values and "g2" is y axis has cl ranges, xVals is an array with the y-axis values so for g1 type it will be something like [12,13,14,15] and for
    #g2 type it will be [[12,13],[14,15],[16,17]],maxLevelFlag is 1 if data is there for a higher level than user CL and 0 otherwise, nextLevelFlag is 1 if
    #data is available for user CL + 1
    #promotion pressures
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #x-axis paths
    path1 = $filePath + "ppCompIndFn.txt"
    path2 = $filePath + "ppIndFn.txt"
    path3 = $filePath + "ppFn.txt"
    path4 = $filePath + "ppInd.txt"
    path5 = $filePath + "ppFnG.txt"
    path6 = $filePath + "ppIndG.txt"
    cases = {"Company" => [[0, 1, 2, 3], [userCompany, userIndustry, userFunction, userCL]], "Industry and Function" => [[0, 1, 2], [userIndustry, userFunction, userCL]],
             "Industry" => [[0, 1], [userIndustry, userCL]], "Function" => [[0, 1], [userFunction, userCL]], "Industry Group" => [[0, 1], [indGroup, userCL]],
             "Function Group" => [[0, 1], [fnGroup, userCL]]}
    caseNames = {path1 => "Company", path2 => "Industry and Function", path4 => "Industry", path3 => "Function", path6 => "Industry Group",
                 path5 => "Function Group"}
    strings = {path1 => [0, 1, 2, 4], path2 => [0, 1, 3], path3 => [0, 2], path4 => [0, 2], path5 => [0, 2], path6 => [0, 2]}
    xOut = {}
    caseNames.each do |path, caseName|
      if dataAvailable[caseName] == 0
        xOut[caseName] = []
        next
      end
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      caseFilter = cases[caseName]
      checkUser = 0
      xVals = []
      graphType = ""
      maxLevelFlag = 0
      nextLevelFlag = 0
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[path].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
              if i == strings[path].max
                graphType = entry[-1]
              end
            else
              if i == strings[path].max
                entry.push(rowList[i])
                graphType = entry[-1]
              else
                group = rowList[i].split("[")
                group = group[1].split("]")
                group = group[0].split("+")
                entry.push(group)
              end
            end
          else
            if i == strings[path].max - 1
              entry.push(rowList[i].to_f)
            elsif i == strings[path].max + 1
              if graphType == "g1"
                #[[11], [12], [13], [14], [15], [16]]
                clValues = rowList[i][1..-2]
                clValues = clValues.split(", ")
                toAdd = []
                clValues.each do |clValue|
                  toAdd.push(clValue[1..-2].to_f)
                end
                entry.push(toAdd)
              else
                #[[9, 10, 11], [12, 13, 14], [15, 16, 17]]
                clValues = rowList[i][1..-3]
                #[9, 10, 11], [12, 13, 14], [15, 16, 17
                clValues = clValues.split("], ")
                #"[9, 10, 11","[12, 13, 14","[15, 16, 17"
                toAdd = []
                clValues.each do |clRange|
                  #"[9, 10, 11"
                  toAdd.push(clRange[1..-1].split(", ").map {|s| s.to_f}) #[9,10,11]
                end
                entry.push(toAdd)
              end
            else
              entry.push(rowList[i].to_f)
            end
          end
        end
        checkUser = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            checkUser = 0
            break
          end
        end
        if checkUser == 1
          maxLevelFlag = entry[-1]
          nextLevelFlag = entry[-2]
          xVals = entry[-3]
          break
        end
      end
      if checkUser == 0
        xOut[caseName] = []
        next
      else
        xOut[caseName] = [graphType, xVals, maxLevelFlag, nextLevelFlag]
      end
    end
    return xOut
  end

  def ppy(userCL, userCompany, userIndustry, userFunction, userRanges, xValsAll)
    #Used for getting the x-axis (count) values of the promotion pressures graph once we have the y-axis (CL) values; This also returns the values of the
    #first graph in the report that has % people above, at , below your CL
    #Inputs - user's CL, company, industry and function, highestFilter (got from caseName returned in the ppx function), xVals (these are the y axis values on the
    #PP grpah got from the ppx funtion above) and userRange(this is 1 if xVals has ranges of cl and 0 if it has actual cl values)
    #Outputs - out,ppY:
    #out - has values for graph 1 of report {"Company"=>[%people below userCL, %people at userCL, %people above userCL], etc}
    #ppY - has the count of entries for all values/ranges in xVals (so for xVals = [12,13,14,15] - {"Company"=>[count at 12,count at 13, count at 14, count at 15], etc.}
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #your CL percentile
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
             "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
             "Function Group" => [[0], [fnGroup]]}
    caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
    pathNames = {"Company" => "graph1CompIndFn.txt", "Industry and Function" => "graph1IndFn.txt", "Function" => "graph1Fn.txt", "Industry" => "graph1Ind.txt",
                 "Function Group" => "graph1FnG.txt", "Industry Group" => "graph1IndG.txt"}
    strings = {"Company" => [0, 1, 2], "Industry and Function" => [0, 1], "Function" => [0], "Industry" => [0], "Function Group" => [0], "Industry Group" => [0]}
    #out = {}
    ppY = {}
    started = 0
    caseOrder.each do |caseName|
      path = $filePath + pathNames[caseName]
      if !userRanges.key?(caseName)
        next
      end
      userRange = userRanges[caseName]
      xVals = xValsAll[caseName]
      caseCount = {}
      file = open(path, 'r')
      text = file.read
      file.close
      rows = text.split("\n")
      rows.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[caseName].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            entry.push(rowList[i].to_f)
          end
        end
        caseFilter = cases[caseName]
        flag = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            flag = 0
            break
          end
        end
        if flag == 1
          #if entry[strings[caseName].max+1] == userCL
          #  out[caseName] = entry[strings[caseName].max + 2..-2]
          #end
          #if !userRanges.key?(caseName)
          #  next
          #end
          if userRange == false
            if xVals.include?(entry[strings[caseName].max + 1])
              caseCount[entry[strings[caseName].max + 1]] = entry[-1]
            end
          else
            xVals.each do |clRange|
              if clRange.include?(entry[strings[caseName].max + 1])
                if caseCount.key?(clRange)
                  caseCount[clRange] += entry[-1]
                else
                  caseCount[clRange] = entry[-1]
                end
              end
            end
          end
        end
      end
      #if userRanges.key?(caseName)
      #  ppY[caseName] = caseCount
      #end
      ppY[caseName] = caseCount
    end
    #return out,ppY
    return ppY
  end

  def initialPPGraph(userCompany, userIndustry, userFunction, userSalary)
    #Used for looking up the y-axis values in promotion pressures graph
    #Inputs - user's company, industry, function, CL, and dataAvailable is "userAvailable" obtained from whileQuestionnaire function above
    #Outputs - xOut = [caseName,graphType,xVals,maxLevelFlag,nextLevelFlag]; caseName is the highest filter at which data is avaialble for making the
    #promotion pressures graph (so it will be "Company" if data is available for user's company, industry and function), graphType is "g1" is y axis has
    #cl values and "g2" is y axis has cl ranges, xVals is an array with the y-axis values so for g1 type it will be something like [12,13,14,15] and for
    #g2 type it will be [[12,13],[14,15],[16,17]],maxLevelFlag is 1 if data is there for a higher level than user CL and 0 otherwise, nextLevelFlag is 1 if
    #data is available for user CL + 1
    #promotion pressures
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #y-axis paths
    path1 = $filePath + "ppCompIndFn.txt"
    path2 = $filePath + "ppIndFn.txt"
    path3 = $filePath + "ppFn.txt"
    path4 = $filePath + "ppInd.txt"
    path5 = $filePath + "ppFnG.txt"
    path6 = $filePath + "ppIndG.txt"
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
             "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
             "Function Group" => [[0], [fnGroup]]}
    caseNames = {path1 => "Company", path2 => "Industry and Function", path4 => "Industry", path3 => "Function", path6 => "Industry Group",
                 path5 => "Function Group"}
    pathOrder = [path1, path2, path3, path4, path5, path6]
    strings = {path1 => [0, 1, 2, 4], path2 => [0, 1, 3], path3 => [0, 2], path4 => [0, 2], path5 => [0, 2], path6 => [0, 2]}
    xOut = []
    outCase = ""
    pathOrder.each do |path|
      caseName = caseNames[path]
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      caseFilter = cases[caseName]
      checkUser = 0
      graphType = ""
      maxLevelFlag = 0
      nextLevelFlag = 0
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[path].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
              if i == strings[path].max
                graphType = entry[-1]
              end
            else
              if i == strings[path].max
                entry.push(rowList[i])
                graphType = entry[-1]
              else
                group = rowList[i].split("[")
                group = group[1].split("]")
                group = group[0].split("+")
                entry.push(group)
              end
            end
          else
            if i == strings[path].max - 1
              entry.push(rowList[i].to_f)
            elsif i == strings[path].max + 1
              if graphType == "g1"
                #[[11], [12], [13], [14], [15], [16]]
                clValues = rowList[i][1..-2]
                clValues = clValues.split(", ")
                toAdd = []
                clValues.each do |clValue|
                  toAdd.push(clValue[1..-2].to_f)
                end
                entry.push(toAdd)
              else
                #[[9, 10, 11], [12, 13, 14], [15, 16, 17]]
                clValues = rowList[i][1..-3]
                #[9, 10, 11], [12, 13, 14], [15, 16, 17
                clValues = clValues.split("], ")
                #"[9, 10, 11","[12, 13, 14","[15, 16, 17"
                toAdd = []
                clValues.each do |clRange|
                  #"[9, 10, 11"
                  toAdd.push(clRange[1..-1].split(", ").map {|s| s.to_f}) #[9,10,11]
                end
                entry.push(toAdd)
              end
            else
              entry.push(rowList[i].to_f)
            end
          end
        end
        flag = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            flag = 0
            break
          end
        end
        if flag == 1 && entry[-4] == "g1"
          print entry
          xOut = entry[-3]
          outCase = caseName
          break
        end
      end
      if xOut != []
        break
      end
    end
    #x-axis paths
    pathNames = {"Company" => "CompIndFn.txt", "Industry and Function" => "IndFn.txt", "Function" => "Fn.txt", "Industry" => "Ind.txt",
                 "Function Group" => "FnG.txt", "Industry Group" => "IndG.txt"}
    strings = {"Company" => [0, 1, 2], "Industry and Function" => [0, 1], "Function" => [0], "Industry" => [0], "Function Group" => [0], "Industry Group" => [0]}
    ppY = {}
    path = $filePath + "graph1" + pathNames[outCase]
    caseCount = {}
    file = open(path, 'r')
    text = file.read
    file.close
    rows = text.split("\n")
    rows.each do |row|
      rowList = row.split(";")
      entry = []
      (0..rowList.length - 1).each do |i|
        if strings[outCase].include?(i)
          if outCase != "Industry Group" && outCase != "Function Group"
            entry.push(rowList[i].strip)
          else
            group = rowList[i].split("[")
            group = group[1].split("]")
            group = group[0].split("+")
            entry.push(group)
          end
        else
          entry.push(rowList[i].to_f)
        end
      end
      caseFilter = cases[outCase]
      flag = 1
      (0..caseFilter[0].length - 1).each do |i|
        if caseFilter[1][i] != entry[caseFilter[0][i]]
          flag = 0
          break
        end
      end
      if flag == 1
        if xOut.include?(entry[strings[outCase].max + 1])
          ppY[entry[strings[outCase].max + 1]] = entry[-1]
        end
      end
    end
    if ppY != {}
      totalPPY = ppY.values.inject {|a, b| a + b}
      ppY.each do |cl, freq|
        percFreq = freq * 100 / totalPPY
        ppY[cl] = percFreq
        (2..100).each do |i|
          if percFreq.round(i) != 0.0
            ppY[cl] = percFreq.round(i)
            break
          end
        end
      end
    end
    #median salaries
    cases3 = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
              "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
              "Function Group" => [[0], [fnGroup]]}
    pathNames = {"Company" => "CompIndFn.txt", "Industry and Function" => "IndFn.txt", "Function" => "Fn.txt", "Industry" => "Ind.txt",
                 "Function Group" => "FnG.txt", "Industry Group" => "IndG.txt"}
    strings = {"Company" => [0, 1, 2], "Industry and Function" => [0, 1], "Function" => [0], "Industry" => [0], "Function Group" => [0], "Industry Group" => [0]}
    medianValues = {}
    path = $filePath + "wclScores" + pathNames[outCase]
    file = open(path)
    text = file.read
    file.close
    textList = text.split("\n")
    specific = []
    caseMeds = {}
    userDone = 0
    caseFilter3 = cases3[outCase]
    textList.each do |row|
      rowList = row.split(";")
      entry = []
      (0..rowList.length - 1).each do |i|
        if strings[outCase].include?(i)
          if outCase != "Industry Group" && outCase != "Function Group"
            entry.push(rowList[i].strip)
          else
            group = rowList[i].split("[")
            group = group[1].split("]")
            group = group[0].split("+")
            entry.push(group)
          end
        else
          entry.push(rowList[i].to_f)
        end
      end
      #get median salaries
      medFlag = 1
      (0..caseFilter3[0].length - 1).each do |i|
        if caseFilter3[1][i] != entry[caseFilter3[0][i]]
          medFlag = 0
          break
        end
      end
      if medFlag == 1
        if xOut.include?(entry[strings[outCase].max + 1])
          medianValues[entry[strings[outCase].max + 1]] = entry[-1]
        end
      end
    end
    #text
    display = []
    upperLimit = userSalary * 1.3
    lowerLimit = userSalary * 0.7
    clRange = []
    salaryRange = []
    freqRange = []
    medianValues.each do |cl, salary|
      if salary >= lowerLimit && salary <= upperLimit
        salaryRange.push(salary)
        clRange.push(cl)
        freqRange.push(ppY[cl])
      end
    end
    if salaryRange != []
      estCL = [clRange.min, clRange.max]
      estSal = [salaryRange.min, salaryRange.max]
      estFreq = [freqRange.min, freqRange.max]
      display = [estCL, estSal, estFreq]
    end

    return xOut, outCase, ppY, medianValues, display
  end

  #testing


  #testing


  def ccx(userCompany, userIndustry, userFunction, userCL, dataAvailable)
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #your compensation percentile
    #x-axis paths
    #Used for looking up the y-axis values in promotion pressures graph
    #Inputs - user's company, industry, function, CL, and dataAvailable is "userAvailable" obtained from whileQuestionnaire function above
    #Outputs - xOut = [caseName,graphType,xVals,maxLevelFlag,nextLevelFlag]; caseName is the highest filter at which data is avaialble for making the
    #promotion pressures graph (so it will be "Company" if data is available for user's company, industry and function), graphType is "g1" is y axis has
    #cl values and "g2" is y axis has cl ranges, xVals is an array with the y-axis values so for g1 type it will be something like [12,13,14,15] and for
    #g2 type it will be [[12,13],[14,15],[16,17]],maxLevelFlag is 1 if data is there for a higher level than user CL and 0 otherwise, nextLevelFlag is 1 if
    #data is available for user CL + 1
    #promotion pressures
    #x-axis paths
    path1 = $filePath + "graphTypesCompIndFn.txt"
    path2 = $filePath + "graphTypesIndFn.txt"
    path3 = $filePath + "graphTypesFn.txt"
    path4 = $filePath + "graphTypesInd.txt"
    path5 = $filePath + "graphTypesFnG.txt"
    path6 = $filePath + "graphTypesIndG.txt"
    cases = {"Company" => [[0, 1, 2, 3], [userCompany, userIndustry, userFunction, userCL]], "Industry and Function" => [[0, 1, 2], [userIndustry, userFunction, userCL]],
             "Industry" => [[0, 1], [userIndustry, userCL]], "Function" => [[0, 1], [userFunction, userCL]], "Industry Group" => [[0, 1], [indGroup, userCL]],
             "Function Group" => [[0, 1], [fnGroup, userCL]]}
    caseNames = {path1 => "Company", path2 => "Industry and Function", path4 => "Industry", path3 => "Function", path6 => "Industry Group",
                 path5 => "Function Group"}


    pathOrder = [path1, path2, path3, path4, path5, path6]
    strings = {path1 => [0, 1, 2], path2 => [0, 1], path3 => [0], path4 => [0], path5 => [0], path6 => [0]}
    xOut = []
    multipleXOuts = {}
    allSame = true
    pathOrder.each do |path|
      caseName = caseNames[path]
      if dataAvailable[caseName] == 0
        multipleXOuts[caseName] = []
        next
      end
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      caseFilter = cases[caseName]
      checkUser = 0
      xVals = []
      graphType = 0
      maxLevelFlag = 0
      nextLevelFlag = 0
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[path].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            if i == strings[path].max + 1 # CL
              entry.push(rowList[i].to_i)
            elsif i == strings[path].max + 2 #graphtype
              entry.push(rowList[i].to_i)
              graphType = entry[-1]
            else #x-ranges
              if graphType == 0
                entry.push([])
              elsif graphType == 1
                #[11, 12, 13, 14, 15]
                clValues = rowList[i][1..-2]
                clValues = clValues.split(", ").map {|s| s.to_i}
                entry.push(clValues)
              elsif graphType == 2 or graphType == 3
                #[[11, 10, 9], [14, 13, 12], [17, 16, 15], [18]]
                clValues = rowList[i][1..-3]
                #[11, 10, 9], [14, 13, 12], [17, 16, 15], [18
                clValues = clValues.split("], ")
                #"[11, 10, 9","[14, 13, 12","[17, 16, 15","[18"
                toAdd = []
                clValues.each do |clRange|
                  #"[9, 10, 11" or "[18"
                  toAdd.push(clRange[1..-1].split(", ").map {|s| s.to_i}) #[9,10,11]
                end
                entry.push(toAdd)
              elsif graphType == 4
                entry.push([rowList[i][1..-2].to_i])
              elsif graphType == 5 #[12, 13]
                clValues = rowList[i][1..-2]
                clValues = clValues.split(", ").map {|s| s.to_i}
                entry.push([clValues])
              end
            end
          end
        end
        checkUser = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            checkUser = 0
            break
          end
        end
        if checkUser == 1
          xVals = entry[-1]
          graphType = entry[-2]
          break
        end
      end
      if checkUser == 0
        xOut = []
        multipleXOuts[caseName] = []
        next
      else
        if caseName == "Company" || caseName == "Industry and Function"
          xOut = [graphType, xVals, caseName]
          allSame = true
          return xOut
        else
          multipleXOuts[caseName] = [graphType, xVals]
          allSame = false
        end
      end
    end
    if allSame == false
      if multipleXOuts["Function"] != [] #highest filter is function
        fgt = multipleXOuts["Function"][0]
        fxv = multipleXOuts["Function"][1]
        #check industry
        if multipleXOuts["Industry"] != []
          igt = multipleXOuts["Industry"][0]
          ixv = multipleXOuts["Industry"][1]
          if fxv == ixv
            xOut = [fgt, fxv, "Function"]
            return xOut
          end
          if (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 1 || igt == 2 || igt == 4)
            xOut = [4, [userCL], "Function"]
            return xOut
          elsif (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 3)
            ixv.each do |clRange|
              if clRange.include?(userCL)
                xOut = [5, [clRange], "Function"]
                return xOut
              end
            end
          elsif (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 5)
            xOut = [5, ixv, "Function"]
            return xOut
          elsif (igt == 1 || igt == 2 || igt == 4) && (fgt == 3)
            fxv.each do |clRange|
              if clRange.include?(userCL)
                xOut = [5, [clRange], "Function"]
                return xOut
              end
            end
          elsif (igt == 1 || igt == 2 || igt == 4) && (fgt == 5)
            xOut = [5, fxv, "Function"]
            return xOut
          elsif fgt == 3 && igt == 3
            fcl = []
            icl = []
            fxv.each do |clRange|
              if clRange.include?(userCL)
                fcl = [clRange]
              end
            end
            ixv.each do |clRange|
              if clRange.include?(userCL)
                icl = [clRange]
              end
            end
            if fcl[0].length >= icl[0].length
              xOut = [5, fcl, "Function"]
            else
              xOut = [5, icl, "Function"]
            end
            return xOut
          elsif fgt == 3 && igt == 5
            fcl = []
            fxv.each do |clRange|
              if clRange.include?(userCL)
                fcl = [clRange]
              end
            end
            if fcl[0].length >= ixv[0].length
              xOut = [5, fcl, "Function"]
            else
              xOut = [5, ixv, "Function"]
            end
            return xOut
          elsif fgt == 5 && igt == 3
            icl = []
            ixv.each do |clRange|
              if clRange.include?(userCL)
                icl = [clRange]
              end
            end
            if fxv[0].length >= icl[0].length
              xOut = [5, fxv, "Function"]
            else
              xOut = [5, icl, "Function"]
            end
            return xOut
          elsif fgt == 5 && igt == 5
            if fxv[0].length >= ixv[0].length
              xOut = [5, fxv, "Function"]
            else
              xOut = [5, ixv, "Function"]
            end
            return xOut
          end
        elsif multipleXOuts["Industry Group"] != [] #check industry group
          igt = multipleXOuts["Industry Group"][0]
          ixv = multipleXOuts["Industry Group"][1]
          if fxv == ixv
            xOut = [fgt, fxv, "Function"]
            return xOut
          end
          if (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 1 || igt == 2 || igt == 4)
            xOut = [4, [userCL], "Function"]
            return xOut
          elsif (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 3)
            ixv.each do |clRange|
              if clRange.include?(userCL)
                xOut = [5, [clRange], "Function"]
                return xOut
              end
            end
          elsif (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 5)
            xOut = [5, ixv, "Function"]
            return xOut
          elsif (igt == 1 || igt == 2 || igt == 4) && (fgt == 3)
            fxv.each do |clRange|
              if clRange.include?(userCL)
                xOut = [5, [clRange], "Function"]
                return xOut
              end
            end
          elsif (igt == 1 || igt == 2 || igt == 4) && (fgt == 5)
            xOut = [5, fxv, "Function"]
            return xOut
          elsif fgt == 3 && igt == 3
            fcl = []
            icl = []
            fxv.each do |clRange|
              if clRange.include?(userCL)
                fcl = [clRange]
              end
            end
            ixv.each do |clRange|
              if clRange.include?(userCL)
                icl = [clRange]
              end
            end
            if fcl[0].length >= icl[0].length
              xOut = [5, fcl, "Function"]
            else
              xOut = [5, icl, "Function"]
            end
            return xOut
          elsif fgt == 3 && igt == 5
            fcl = []
            fxv.each do |clRange|
              if clRange.include?(userCL)
                fcl = [clRange]
              end
            end
            if fcl[0].length >= ixv[0].length
              xOut = [5, fcl, "Function"]
            else
              xOut = [5, ixv, "Function"]
            end
            return xOut
          elsif fgt == 5 && igt == 3
            icl = []
            ixv.each do |clRange|
              if clRange.include?(userCL)
                icl = [clRange]
              end
            end
            if fxv[0].length >= icl[0].length
              xOut = [5, fxv, "Function"]
            else
              xOut = [5, icl, "Function"]
            end
            return xOut
          elsif fgt == 5 && igt == 5
            if fxv[0].length >= ixv[0].length
              xOut = [5, fxv, "Function"]
            else
              xOut = [5, ixv, "Function"]
            end
            return xOut
          end
        else
          xOut = [fgt, fxv, "Function"]
          return xOut
        end
      elsif multipleXOuts["Industry"] != [] #highest filter is industry
        igt = multipleXOuts["Industry"][0]
        ixv = multipleXOuts["Industry"][1]
        if multipleXOuts["Function Group"] != [] #check function group
          fgt = multipleXOuts["Function Group"][0]
          fxv = multipleXOuts["Function Group"][1]
          if fxv == ixv
            xOut = [fgt, fxv, "Industry"]
            return xOut
          end
          if (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 1 || igt == 2 || igt == 4)
            xOut = [4, [userCL], "Industry"]
            return xOut
          elsif (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 3)
            ixv.each do |clRange|
              if clRange.include?(userCL)
                xOut = [5, [clRange], "Industry"]
                return xOut
              end
            end
          elsif (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 5)
            xOut = [5, ixv, "Industry"]
            return xOut
          elsif (igt == 1 || igt == 2 || igt == 4) && (fgt == 3)
            fxv.each do |clRange|
              if clRange.include?(userCL)
                xOut = [5, [clRange], "Industry"]
                return xOut
              end
            end
          elsif (igt == 1 || igt == 2 || igt == 4) && (fgt == 5)
            xOut = [5, fxv, "Industry"]
            return xOut
          elsif fgt == 3 && igt == 3
            fcl = []
            icl = []
            fxv.each do |clRange|
              if clRange.include?(userCL)
                fcl = [clRange]
              end
            end
            ixv.each do |clRange|
              if clRange.include?(userCL)
                icl = [clRange]
              end
            end
            if fcl[0].length >= icl[0].length
              xOut = [5, fcl, "Industry"]
            else
              xOut = [5, icl, "Industry"]
            end
            return xOut
          elsif fgt == 3 && igt == 5
            fcl = []
            fxv.each do |clRange|
              if clRange.include?(userCL)
                fcl = [clRange]
              end
            end
            if fcl[0].length >= ixv[0].length
              xOut = [5, fcl, "Industry"]
            else
              xOut = [5, ixv, "Industry"]
            end
            return xOut
          elsif fgt == 5 && igt == 3
            icl = []
            ixv.each do |clRange|
              if clRange.include?(userCL)
                icl = [clRange]
              end
            end
            if fxv[0].length >= icl[0].length
              xOut = [5, fxv, "Industry"]
            else
              xOut = [5, icl, "Industry"]
            end
            return xOut
          elsif fgt == 5 && igt == 5
            if fxv[0].length >= ixv[0].length
              xOut = [5, fxv, "Industry"]
            else
              xOut = [5, ixv, "Industry"]
            end
            return xOut
          end
        else
          xOut = [igt, ixv, "Industry"]
          return xOut
        end
      elsif multipleXOuts["Function Group"] != [] #highest filter is function group
        fgt = multipleXOuts["Function Group"][0]
        fxv = multipleXOuts["Function Group"][1]
        if multipleXOuts["Industry Group"] != [] #check industry group
          igt = multipleXOuts["Industry Group"][0]
          ixv = multipleXOuts["Industry Group"][1]
          if fxv == ixv
            xOut = [fgt, fxv, "Function Group"]
            return xOut
          end
          if (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 1 || igt == 2 || igt == 4)
            xOut = [4, [userCL], "Function Group"]
            return xOut
          elsif (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 3)
            ixv.each do |clRange|
              if clRange.include?(userCL)
                xOut = [5, [clRange], "Function Group"]
                return xOut
              end
            end
          elsif (fgt == 1 || fgt == 2 || fgt == 4) && (igt == 5)
            xOut = [5, ixv, "Function Group"]
            return xOut
          elsif (igt == 1 || igt == 2 || igt == 4) && (fgt == 3)
            fxv.each do |clRange|
              if clRange.include?(userCL)
                xOut = [5, [clRange], "Function Group"]
                return xOut
              end
            end
          elsif (igt == 1 || igt == 2 || igt == 4) && (fgt == 5)
            xOut = [5, fxv, "Function Group"]
            return xOut
          elsif fgt == 3 && igt == 3
            fcl = []
            icl = []
            fxv.each do |clRange|
              if clRange.include?(userCL)
                fcl = [clRange]
              end
            end
            ixv.each do |clRange|
              if clRange.include?(userCL)
                icl = [clRange]
              end
            end
            if fcl[0].length >= icl[0].length
              xOut = [5, fcl, "Function Group"]
            else
              xOut = [5, icl, "Function Group"]
            end
            return xOut
          elsif fgt == 3 && igt == 5
            fcl = []
            fxv.each do |clRange|
              if clRange.include?(userCL)
                fcl = [clRange]
              end
            end
            if fcl[0].length >= ixv[0].length
              xOut = [5, fcl, "Function Group"]
            else
              xOut = [5, ixv, "Function Group"]
            end
            return xOut
          elsif fgt == 5 && igt == 3
            icl = []
            ixv.each do |clRange|
              if clRange.include?(userCL)
                icl = [clRange]
              end
            end
            if fxv[0].length >= icl[0].length
              xOut = [5, fxv, "Function Group"]
            else
              xOut = [5, icl, "Function Group"]
            end
            return xOut
          elsif fgt == 5 && igt == 5
            if fxv[0].length >= ixv[0].length
              xOut = [5, fxv, "Function Group"]
            else
              xOut = [5, ixv, "Function Group"]
            end
            return xOut
          end
        else
          xOut = [fgt, fxv, "Function Group"]
        end
      elsif multipleXOuts["Industry Group"] != [] #highest filter is industry group
        igt = multipleXOuts["Industry Group"][0]
        ixv = multipleXOuts["Industry Group"][1]
        xOut = [igt, ixv, "Industry Group"]
        return xOut
      else
        return []
      end
    end
    return xOut
  end

  def ccy(userCL, userCompany, userIndustry, userFunction, highestFilter, xVals, graphType)
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #your CL percentile
    path1 = $filePath + "percentilesCompIndFn.txt"
    path2 = $filePath + "percentilesIndFn.txt"
    path4 = $filePath + "percentilesInd.txt"
    path3 = $filePath + "percentilesFn.txt"
    path6 = $filePath + "percentilesIndG.txt"
    path5 = $filePath + "percentilesFnG.txt"
    #CL range percentiles
    rpath1 = $filePath + "rangePercentilesCompIndFn.txt"
    rpath2 = $filePath + "rangePercentilesIndFn.txt"
    rpath4 = $filePath + "rangePercentilesInd.txt"
    rpath3 = $filePath + "rangePercentilesFn.txt"
    rpath6 = $filePath + "rangePercentilesIndG.txt"
    rpath5 = $filePath + "rangePercentilesFnG.txt"
    caseNames2Path = {"Company" => path1, "Industry and Function" => path2, "Industry" => path4, "Function" => path3, "Industry Group" => path6,
                      "Function Group" => path5}
    rcaseNames2Path = {"Company" => rpath1, "Industry and Function" => rpath2, "Industry" => rpath4, "Function" => rpath3, "Industry Group" => rpath6,
                       "Function Group" => rpath5}
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
             "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
             "Function Group" => [[0], [fnGroup]]}
    strings = {"Company" => [0, 1, 2], "Industry and Function" => [0, 1], "Industry" => [0], "Function" => [0], "Industry Group" => [0], "Function Group" => [0]}
    out = {}
    started = 0
    caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
    caseOrder.each do |caseName|
      if started == 0
        if caseName != highestFilter
          next
        else
          started = 1
        end
      end
      toAdd = {}
      if graphType == 1 || graphType == 4
        path = caseNames2Path[caseName]
        file = open(path, 'r')
        text = file.read
        file.close
        rows = text.split("\n")
        rows.each do |row|
          rowList = row.split(";")
          entry = []
          (0..rowList.length - 1).each do |i|
            done = 1
            xVals.each do |cl|
              if !toAdd.key?(cl)
                done = 0
                break
              end
            end
            if done == 1
              break
            end
            if strings[caseName].include?(i)
              if caseName != "Industry Group" && caseName != "Function Group"
                entry.push(rowList[i].strip)
              else
                group = rowList[i].split("[")
                group = group[1].split("]")
                group = group[0].split("+")
                entry.push(group)
              end
            else
              entry.push(rowList[i].to_f)
            end
          end
          caseFilter = cases[caseName]
          flag = 1
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              flag = 0
              break
            end
          end
          if flag == 1
            xVals.each do |cl| #xVals is either [10,11,12] or [10]
              if cl == entry[strings[caseName].max + 1]
                toAdd[cl] = entry[-3..-1]
                break
              end
            end
          end
        end
      elsif graphType == 3 || graphType == 5
        path = rcaseNames2Path[caseName]
        file = open(path, 'r')
        text = file.read
        file.close
        rows = text.split("\n")
        rows.each do |row|
          rowList = row.split(";")
          entry = []
          (0..rowList.length - 1).each do |i|
            done = 1
            xVals.each do |clRange| #[[11,12],[13,14],[15,16]] or [10,11,12]
              if !toAdd.key?(clRange)
                done = 0
                break
              end
            end
            if done == 1
              break
            end
            if strings[caseName].include?(i)
              if caseName != "Industry Group" && caseName != "Function Group"
                entry.push(rowList[i].strip)
              else
                group = rowList[i].split("[")
                group = group[1].split("]")
                group = group[0].split("+")
                entry.push(group)
              end
            else
              if i != strings[caseName].max + 1
                entry.push(rowList[i].to_f)
              else #[11, 12, 13]
                entry.push(rowList[i][1..-2].split(", ").map {|s| s.to_f})
              end
            end
          end
          caseFilter = cases[caseName]
          flag = 1
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              flag = 0
              break
            end
          end
          if flag == 1
            xVals.each do |clRange| #xVals is either #[[11,12],[13,14],[15,16]] or [[10,11,12]]
              if clRange == entry[strings[caseName].max + 1]
                toAdd[clRange] = entry[-3..-1]
                break
              end
            end
          end
        end
      elsif graphType == 2
        path1 = caseNames2Path[caseName]
        path2 = rcaseNames2Path[caseName]
        file = open(path1, 'r')
        text1 = file.read
        file.close
        file = open(path2, 'r')
        text2 = file.read
        file.close
        #get data for user CL
        rows = text1.split("\n")
        rows.each do |row|
          rowList = row.split(";")
          entry = []
          (0..rowList.length - 1).each do |i|
            if strings[caseName].include?(i)
              if caseName != "Industry Group" && caseName != "Function Group"
                entry.push(rowList[i].strip)
              else
                group = rowList[i].split("[")
                group = group[1].split("]")
                group = group[0].split("+")
                entry.push(group)
              end
            else
              entry.push(rowList[i].to_f)
            end
          end
          caseFilter = cases[caseName]
          flag = 1
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              flag = 0
              break
            end
          end
          if flag == 1
            if userCL == entry[strings[caseName].max + 1]
              toAdd[[userCL]] = entry[-3..-1]
              break
            end
          end
        end
        rows = text2.split("\n")
        rows.each do |row|
          rowList = row.split(";")
          entry = []
          (0..rowList.length - 1).each do |i|
            done = 1
            xVals.each do |clRange| #[[11,12],[13,14],[15,16],[17]]
              if !toAdd.key?(clRange)
                done = 0
                break
              end
            end
            if done == 1
              break
            end
            if strings[caseName].include?(i)
              if caseName != "Industry Group" && caseName != "Function Group"
                entry.push(rowList[i].strip)
              else
                group = rowList[i].split("[")
                group = group[1].split("]")
                group = group[0].split("+")
                entry.push(group)
              end
            else
              if i != strings[caseName].max + 1
                entry.push(rowList[i].to_f)
              else #[11, 12, 13]
                entry.push(rowList[i][1..-2].split(", ").map {|s| s.to_f})
              end
            end
          end
          caseFilter = cases[caseName]
          flag = 1
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              flag = 0
              break
            end
          end
          if flag == 1
            xVals.each do |clRange| #xVals is [[11,12],[13,14],[15,16],[17]]
              if clRange == entry[strings[caseName].max + 1]
                toAdd[clRange] = entry[-3..-1]
                break
              end
            end
          end
        end
      end
      if toAdd.keys.length == xVals.length
        out[caseName] = toAdd
      end
    end
    return out
  end

  def getUserPercentile(userSalary, userCL, userIndustry, userFunction, userCompany, dataAvailable, userRange)
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #x-axis paths
    if userRange == false
      path1 = $filePath + "userPercentileCompIndFn.txt"
      path2 = $filePath + "userPercentileIndFn.txt"
      path3 = $filePath + "userPercentileFn.txt"
      path4 = $filePath + "userPercentileInd.txt"
      path5 = $filePath + "userPercentileFnG.txt"
      path6 = $filePath + "userPercentileIndG.txt"
    else
      path1 = $filePath + "userRangePercentileCompIndFn.txt"
      path2 = $filePath + "userRangePercentileIndFn.txt"
      path3 = $filePath + "userRangePercentileFn.txt"
      path4 = $filePath + "userRangePercentileInd.txt"
      path5 = $filePath + "userRangePercentileFnG.txt"
      path6 = $filePath + "userRangePercentileIndG.txt"
    end
    cases = {"Company" => [[0, 1, 2, 3], [userCompany, userIndustry, userFunction, userCL]], "Industry and Function" => [[0, 1, 2], [userIndustry, userFunction, userCL]],
             "Industry" => [[0, 1], [userIndustry, userCL]], "Function" => [[0, 1], [userFunction, userCL]], "Industry Group" => [[0, 1], [indGroup, userCL]],
             "Function Group" => [[0, 1], [fnGroup, userCL]]}
    caseNames = {path1 => "Company", path2 => "Industry and Function", path4 => "Industry", path3 => "Function", path6 => "Industry Group",
                 path5 => "Function Group"}
    strings = {path1 => [0, 1, 2], path2 => [0, 1], path3 => [0], path4 => [0], path5 => [0], path6 => [0]}
    out = {}
    allPercentiles = {}
    caseNames.each do |path, caseName|
      if dataAvailable[caseName] == 0
        next
      end
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      caseFilter = cases[caseName]
      checkUser = 0
      percentiles = []
      userPercentile = 0
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[path].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            if i == strings[path].max + 1 # CL
              if userRange == false
                entry.push(rowList[i].to_i)
              else
                #get userCl range
                cls = rowList[i][1..-2]
                cls = cls.split(", ").map {|s| s.to_i}
                entry.push(cls)
              end
            elsif i == strings[path].max + 2 #percentiles
              #get percentiles list
              sals = rowList[i][1..-2]
              sals = sals.split(", ").map {|s| s.to_f}
              entry.push(sals)
            end
          end
        end
        checkUser = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            checkUser = 0
            break
          end
        end
        if checkUser == 1
          percentiles = entry[-1]
          allPercentiles[caseName] = percentiles
          (0..99).each do |i|
            if userSalary < percentiles[i]
              userPercentile = i
              break
            elsif userSalary == percentiles[i]
              userPercentile = i + 1
              break
            elsif userSalary > percentiles[i] && i == 99
              userPercentile = i + 1
              break
            end
          end
          break
        end
      end
      out[caseName] = userPercentile
    end
    return out, allPercentiles
  end

  #testing


  #testing
  def ppy_old(userCL, userCompany, userIndustry, userFunction, userRange, highestFilter, xVals)
    #Used for getting the x-axis (count) values of the promotion pressures graph once we have the y-axis (CL) values; This also returns the values of the
    #first graph in the report that has % people above, at , below your CL
    #Inputs - user's CL, company, industry and function, highestFilter (got from caseName returned in the ppx function), xVals (these are the y axis values on the
    #PP grpah got from the ppx funtion above) and userRange(this is 1 if xVals has ranges of cl and 0 if it has actual cl values)
    #Outputs - out,ppY:
    #out - has values for graph 1 of report {"Company"=>[%people below userCL, %people at userCL, %people above userCL], etc}
    #ppY - has the count of entries for all values/ranges in xVals (so for xVals = [12,13,14,15] - {"Company"=>[count at 12,count at 13, count at 14, count at 15], etc.}
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #your CL percentile
    path1 = $filePath + "graph1CompIndFn.txt"
    path2 = $filePath + "graph1IndFn.txt"
    path4 = $filePath + "graph1Ind.txt"
    path3 = $filePath + "graph1Fn.txt"
    path6 = $filePath + "graph1IndG.txt"
    path5 = $filePath + "graph1FnG.txt"
    caseNames = {path1 => "Company", path2 => "Industry and Function", path4 => "Industry", path3 => "Function", path6 => "Industry Group",
                 path5 => "Function Group"}
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
             "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
             "Function Group" => [[0], [fnGroup]]}
    strings = {path1 => [0, 1, 2], path2 => [0, 1], path3 => [0], path4 => [0], path5 => [0], path6 => [0]}
    out = {}
    ppY = {}
    started = 0
    pathOrder = [path1, path2, path3, path4, path5, path6]
    pathOrder.each do |path|
      caseName = caseNames[path]
      if started == 0
        if caseName != highestFilter
          next
        else
          started = 1
        end
      end
      caseCount = {}
      file = open(path, 'r')
      text = file.read
      file.close
      rows = text.split("\n")
      rows.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[path].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            entry.push(rowList[i].to_f)
          end
        end
        caseFilter = cases[caseName]
        flag = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            flag = 0
            break
          end
        end
        if flag == 1
          if entry[strings[path].max + 1] == userCL
            out[caseName] = entry[strings[path].max + 2..-2]
          end
          if userRange == false
            if xVals.include?(entry[strings[path].max + 1])
              caseCount[entry[strings[path].max + 1]] = entry[-1]
            end
          else
            xVals.each do |clRange|
              if clRange.include?(entry[strings[path].max + 1])
                if caseCount.key?(clRange)
                  caseCount[clRange] += entry[-1]
                else
                  caseCount[clRange] = entry[-1]
                end
              end
            end
          end

        end

      end
      ppY[caseName] = caseCount
    end
    return out, ppY
  end

  def getDesigs(userCLs, userCompany, userIndustry, userFunction, userRanges)
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
    pathNames = {"Company" => "CompIndFn.txt", "Industry and Function" => "IndFn.txt", "Function" => "Fn.txt", "Industry" => "Ind.txt",
                 "Function Group" => "FnG.txt", "Industry Group" => "IndG.txt"}
    strings = {"Company" => [0, 1, 2], "Industry and Function" => [0, 1], "Function" => [0], "Industry" => [0], "Function Group" => [0], "Industry Group" => [0]}
    allDesigs = {}
    caseOrder.each do |caseName|
      if !userCLs.key?(caseName)
        allDesigs[caseName] = []
        next
      end
      userCL = userCLs[caseName]
      if userCL == nil
        allDesigs[caseName] = []
        next
      end
      userRange = userRanges[caseName]
      cases = {"Company" => [[0, 1, 2, 3], [userCompany, userIndustry, userFunction, userCL]], "Industry and Function" => [[0, 1, 2], [userIndustry, userFunction, userCL]],
               "Industry" => [[0, 1], [userIndustry, userCL]], "Function" => [[0, 1], [userFunction, userCL]], "Industry Group" => [[0, 1], [indGroup, userCL]],
               "Function Group" => [[0, 1], [fnGroup, userCL]]}
      if userRange == false
        path = $filePath + "desigs" + pathNames[caseName]
      else
        path = $filePath + "desigsRange" + pathNames[caseName]
      end
      begin
        file = open(path)

        text = file.read
        file.close
        textList = text.force_encoding("ISO-8859-1").encode("utf-8").split("\n")

        userDone = 0
        caseFilter = cases[caseName]
        textList.each do |row|
          rowList = row.split(";")
          entry = []
          (0..rowList.length - 2).each do |i|
            if strings[caseName].include?(i)
              if caseName != "Industry Group" && caseName != "Function Group"
                entry.push(rowList[i].strip)
              else
                group = rowList[i].split("[")
                group = group[1].split("]")
                group = group[0].split("+")
                entry.push(group)
              end
            else
              if userRange == false
                entry.push(rowList[i].to_f)
              else
                if i == strings[caseName].max + 1
                  clRange = rowList[i].split("[")
                  clRange = clRange[1].split("]")
                  clRange = clRange[0].split(", ").map {|s| s.to_f}
                  entry.push(clRange)
                else
                  entry.push(rowList[i].to_f)
                end
              end
            end
          end
          desigs = rowList[-1].split("%")
          #print desigs
          checkUser = 1
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              checkUser = 0
              break
            end
          end
          if checkUser == 1
            userDone = 1
            allDesigs[caseName] = desigs
            break
          end
        end
        if userDone == 0
          allDesigs[caseName] = []
        end
      rescue Exception => ex
        print "error " + path
      end
    end
    return allDesigs
  end

  #testing


  def getAnalysisText(evaluation)
    @mapCollection = Hash.new
    @availableData = evaluation
    @counter = 0
    @id_text = ""
    @str_key = ""
    @availableData.each do |k, v|
      if v.count > 0
        @counter += 1
        @id_text += v['text'].to_s
      end
    end

    if @counter == 6
      @mapCollection = Reports.getText('CL_txrCmpFngrpIngrpFnIn', @id_text.to_i)
    elsif @counter == 5
      @mapCollection = Reports.getText('CL_txtFnIn', @id_text.to_i)
    elsif @counter == 4
      @mapCollection = Reports.getText('CL_txtFngrpIngrpFnIn', @id_text.to_i)
    elsif @counter == 3
      @str_key = ""
      @availableData.each do |k, v|
        if k == "Your Function" && v.count > 0
          @str_key += "Fn"
        elsif k == "Your Industry" && v.count > 0
          @str_key += "In"
        end
      end
      case @str_key
      when 'Fn'
        @mapCollection = Reports.getText('CL_txtFngrpIngrpFn', @id_text.to_i)
      when 'In'
        @mapCollection = Reports.getText('CL_txtFngrpIngrpIn', @id_text.to_i)
      else
        @mapCollection['Text'] = ""
      end
    elsif @counter == 2
      @str_key = ""
      @availableData.each do |k, v|
        if k == "Your Function Group" && v.count > 0
          @str_key += "Fngrp"
        elsif k == "Your Function" && v.count > 0
          @str_key += "Fn"
        elsif k == "Your Industry Group" && v.count > 0
          @str_key += "Ingrp"
        elsif k == "Your Industry" && v.count > 0
          @str_key += "In"
        end
      end
      case @str_key
      when 'FnFngrp'
        @mapCollection = Reports.getText('CL_txtFngrpFn', @id_text.to_i)
      when 'InIngrp'
        @mapCollection = Reports.getText('CL_txtIngrpIn', @id_text.to_i)
      when 'FngrpIngrp'
        @mapCollection = Reports.getText('CL_txtFngrpIngrp', @id_text.to_i)
      else
        @mapCollection['Text'] = ""
      end
    elsif @counter == 1
      @availableData.each do |k, v|
        if k == "Your Function Group" && v.count > 0
          @mapCollection = Reports.getText('CL_txtFngrp', @id_text.to_i)
        elsif k == "Your Industry Group" && v.count > 0
          @mapCollection = Reports.getText('CL_txtIngrp', @id_text.to_i)
        end
      end
    else
      @mapCollection['Text'] = ""
    end
    return @mapCollection['Text']
  end

  def getPPAnalysisText(evaluation)
    @mapCollection2 = Hash.new
    @availableData2 = evaluation
    @counter2 = 0
    @id_text2 = ""
    @availableData2.each do |k, v|
      if k != 'CL_text' && v != nil
        @counter2 += 1
        if v == 'High'
          @id_text2 += 1.to_s
        else
          @id_text2 += 2.to_s
        end
      end
    end

    if @counter2 == 6
      str1 = @id_text2[0..1]
      str2 = @id_text2[2..3]
      str3 = @id_text2[4..5]
      @id_text2 = str1 + str3 + str2
      @mapCollection2 = Reports.getText('PP_txtCmpFngrpIngrpFnIn', @id_text2.to_i)
      # elsif @counter2 == 5
      #   str1 = @id_text2[0]
      #   str2 = @id_text2[1..2]
      #   str3 = @id_text2[3..4]
      #   @id_text2 = str1 + str3 + str2
      #   @mapCollection2 = Reports.getText('PP_txtFnIn', @id_text2.to_i)


    elsif @counter2 == 5
      @str_key2 = ""
      @availableData2.each do |k, v|
        if k == "Company" && v != nil
          @str_key2 += "Cmp"
        elsif k == "Industry and Function" && v != nil
          @str_key2 += "Ifn"
        elsif k == "Function Group" && v != nil
          @str_key2 += "Fngrp"
        elsif k == "Industry Group" && v != nil
          @str_key2 += "Ingrp"
        elsif k == "Function" && v != nil
          @str_key2 += "Fn"
        elsif k == "Industry" && v != nil
          @str_key2 += "In"
        end
      end
      case @str_key2
      when 'CmpIfnFnInIngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        str3 = @id_text2[2]
        str4 = @id_text2[3]
        str5 = @id_text2[4]
        @id_text2 = str1 + str2 + str5 + str3 + str4
        @mapCollection2 = Reports.getText('PP_txtCmpIfnIngrpFnIn', @id_text2.to_i)
      when 'CmpIfnFnInFngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        str3 = @id_text2[2]
        str4 = @id_text2[3]
        str5 = @id_text2[4]
        @id_text2 = str1 + str2 + str5 + str3 + str4
        @mapCollection2 = Reports.getText('PP_txtCmpIfnFngrpFnIn', @id_text2.to_i)
      else
        str1 = @id_text2[0]
        str2 = @id_text2[1..2]
        str3 = @id_text2[3..4]
        @id_text2 = str1 + str3 + str2
        @mapCollection2 = Reports.getText('PP_txtFnIn', @id_text2.to_i)
      end


    elsif @counter2 == 4
      @str_key2 = ""
      @availableData2.each do |k, v|
        if k == "Company" && v != nil
          @str_key2 += "Cmp"
        elsif k == "Industry and Function" && v != nil
          @str_key2 += "Ifn"
        elsif k == "Function Group" && v != nil
          @str_key2 += "Fngrp"
        elsif k == "Industry Group" && v != nil
          @str_key2 += "Ingrp"
        elsif k == "Function" && v != nil
          @str_key2 += "Fn"
        elsif k == "Industry" && v != nil
          @str_key2 += "In"
        end
      end
      case @str_key2
      when 'CmpIfnFnIn'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        str3 = @id_text2[2]
        str4 = @id_text2[3]
        @id_text2 = str1 + str4 + str2 + str3
        @mapCollection2 = Reports.getText('PP_txtCmpIfnFnIn', @id_text2.to_i)
      when 'IfnFnInIngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        str3 = @id_text2[2]
        str4 = @id_text2[3]
        @id_text2 = str1 + str4 + str2 + str3
        @mapCollection2 = Reports.getText('PP_txtIfnIngrpFnIn', @id_text2.to_i)
      when 'IfnFnInFngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        str3 = @id_text2[2]
        str4 = @id_text2[3]
        @id_text2 = str1 + str4 + str2 + str3
        @mapCollection2 = Reports.getText('PP_txtIfnFngrpFnIn', @id_text2.to_i)
      else
        str1 = @id_text2[0..1]
        str2 = @id_text2[2..3]
        @id_text2 = str2 + str1
        @mapCollection2 = Reports.getText('PP_txtFngrpIngrpFnIn', @id_text2.to_i)
      end
    elsif @counter2 == 3
      @str_key2 = ""
      @availableData2.each do |k, v|
        if k == "Industry and Function" && v != nil
          @str_key2 += "Ifn"
        elsif k == "Function Group" && v != nil
          @str_key2 += "Fngrp"
        elsif k == "Industry Group" && v != nil
          @str_key2 += "Ingrp"
        elsif k == "Function" && v != nil
          @str_key2 += "Fn"
        elsif k == "Industry" && v != nil
          @str_key2 += "In"
        end
      end
      case @str_key2
      when 'FnInIfn'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        str3 = @id_text2[2]
        @id_text2 = str3 + str1 + str2
        @mapCollection2 = Reports.getText('PP_txtIfnFnIn', @id_text2.to_i)
      when 'FnInFngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        str3 = @id_text2[2]
        @id_text2 = str3 + str1 + str2
        @mapCollection2 = Reports.getText('PP_txtFngrpFnIn', @id_text2.to_i)
      when 'FnInIngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        str3 = @id_text2[2]
        @id_text2 = str3 + str1 + str2
        @mapCollection2 = Reports.getText('PP_txtIngrpFnIn', @id_text2.to_i)
      when 'FnFngrpIngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1..2]
        @id_text2 = str2 + str1
        @mapCollection2 = Reports.getText('PP_txtFngrpIngrpFn', @id_text2.to_i)
      when 'InFngrpIngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1..2]
        @id_text2 = str2 + str1
        @mapCollection2 = Reports.getText('PP_txtFngrpIngrpIn', @id_text2.to_i)
      else
        @mapCollection2['Text'] = ""
      end
    elsif @counter2 == 2
      @str_key2 = ""
      @availableData2.each do |k, v|
        if k == "Function Group" && v != nil
          @str_key2 += "Fngrp"
        elsif k == "Function" && v != nil
          @str_key2 += "Fn"
        elsif k == "Industry Group" && v != nil
          @str_key2 += "Ingrp"
        elsif k == "Industry" && v != nil
          @str_key2 += "In"
        end
      end
      case @str_key2
      when 'FngrpFn'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        @id_text2 = str2 + str1
        @mapCollection2 = Reports.getText('PP_txtFngrpFn', @id_text2.to_i)
      when 'InIngrp'
        str1 = @id_text2[0]
        str2 = @id_text2[1]
        @id_text2 = str2 + str1
        @mapCollection2 = Reports.getText('PP_txtIngrpIn', @id_text2.to_i)
      when 'FngrpIngrp'
        @mapCollection2 = Reports.getText('PP_txtFngrpIngrp', @id_text2.to_i)
      when 'InFngrp'
        @mapCollection2 = Reports.getText('PP_txtFngrpIn', @id_text2.to_i)
      when 'FnIngrp'
        @mapCollection2 = Reports.getText('PP_txtIngrpFn', @id_text2.to_i)
      when 'FnIn'
        @mapCollection2 = Reports.getText('PP_txt1FnIn', @id_text2.to_i)
      else
        @mapCollection2['Text'] = ""
      end
    elsif @counter2 == 1
      @availableData2.each do |k, v|
        if k == "Function Group" && v != nil
          @mapCollection2 = Reports.getText('PP_txtFngrp', @id_text2.to_i)
        elsif k == "Industry Group" && v != nil
          @mapCollection2 = Reports.getText('PP_txtIngrp', @id_text2.to_i)
        elsif k == "Function" && v != nil
          @mapCollection2 = Reports.getText('PP_txtFn', @id_text2.to_i)
        elsif k == "Industry" && v != nil
          @mapCollection2 = Reports.getText('PP_txtIn', @id_text2.to_i)
        end
      end
    else
      @mapCollection2['Text'] = ""
    end
    return @mapCollection2['Text']
  end

  def SynData(array, mod, type, industry, role, company, level, grpFields)
    @rawData = array
    @lenData = @rawData.length - 1
    @allData = Hash.new
    @level = level
    @indexLevel = -1
    (0..@lenData).step(1) do |n|
      if @rawData[n].is_a?(Array)
        @points = Array.new
        @points = @rawData[n]
        @len = @points.length
        @graphData = Array.new
        @points.sort!
        if grpFields.length == 1
          @graphData = Reports.getCompensation(@points[0] - 1, @points[@len - 1] + 1, industry, role, company, @level, mod)
        else
          for v in 0..grpFields.length - 1
            @values = Array.new
            # @values=Reports.getCompensation(@points[0]-1,@points[@len-1]+3,industry,"ADMINISTRATION",company,@level,mod)
            @values = Reports.getCompensation(@points[0] - 1, @points[@len - 1] + 1, industry, grpFields[v].gsub(/( '|' )/, ' '), company, @level, mod)
            if @graphData.length == 0 && @values.length > 0
              @graphData = @values
            elsif @values.length > 0
              for g in 0..@values.length - 1
                for gp in 0..@graphData.length - 1
                  if @graphData[gp]["_id"]["level"] == @values[g]["_id"]["level"]
                    @graphData[gp]["salary"] = @graphData[gp]["salary"] + @values[g]["salary"]
                  end
                end
              end
              # @graphData[0]["salary"]=@graphData[0]["salary"]+@values[0]["salary"]
            end
          end


        end

        @yVal = Array.new
        @xVal = ""
        if @graphData.length > 0
          for g in 0..@graphData.length - 1
            @yVal = @yVal + @graphData[g]['salary']
          end
          if @points.length > 1
            for p in 0..@len - 1
              if @points[p] <= @level && @points[p] >= @level
                @indexLevel = p
              end
              if p == 0
                @xVal = @xVal + @points[p].to_s
              elsif p == @len - 1
                @xVal = @xVal + "-" + @points[p].to_s
              end

            end
          elsif @points.length == 1

            for p in 0..@len - 1
              if @points[p] <= @level && @points[p] >= @level
                @indexLevel = n
              end
              if p == 0
                @xVal = @xVal + @points[p].to_s
              elsif p == @len - 1
                @xVal = @xVal + "-" + @points[p].to_s
              end

            end
          end
          if @yVal.length > 0
            @allData[@xVal] = @yVal
          end
        end

      else
        @graphData = Reports.getCompensation(@rawData[n] - 1, @rawData[n] + 1, @industry, @role, @company, @level, mod)
        @yVal = Array.new
        if @graphData.length > 0

          for g in 0..@graphData.length - 1
            @yVal = @yVal + @graphData[g][:salary]
          end
          if @rawData[n] == @level
            @indexLevel = @allData.count()
          end
          @xVal = @rawData[n].to_s
        end
        if @yVal.length > 0
          @allData[@xVal] = @yVal
        end
      end

    end
    if type == 5
      return {dataVal: @allData, indexVal: 0}
    else
      return {dataVal: @allData, indexVal: @indexLevel}
    end

  end


  def CalculatePromotionGraph(array, level)
    @xAxis = Array.new
    @yAxis = Array.new
    @yAxis1 = Array.new
    @yAxis2 = Array.new
    @salary = Array.new
    @salary = array
    @step = 0
    @indexofLevel = 0
    @indexofnextLevel = 0
    @valueofLevel = 0
    @valueofnextLevel
    if @salary.length > 9
      @step = 1
    elsif @salary.length > 19
      @step = 2
    elsif @salary.length > 29
      @step = 3
    elsif @salary.length > 39
      @step = 4
    end
    @salary = @salary.sort_by {|hash| -hash[:_id][:level]}
    @sumOFArray = @salary.map {|hash| hash["count"]}.sum
    puts @sumOFArray
    if @step > 0
      (0..@salary.length - 1).step(@step + 1).each do |sal|
        @salry = 0
        @count = 0
        @mergearray = Array.new
        for @s in 0..@step
          if (sal + @s) <= (@salary.length - 1)
            @salry = @salry + @salary[sal + @s]["count"]
            @mergearray = @mergearray + @salary[sal + @s]["salary"]
          end
        end
        if (sal + @s) <= (@salary.length - 1)
          @xAxis.push @salary[sal]["_id"]["level"].to_s + "-" + @salary[sal + @step]["_id"]["level"].to_s
        else
          @xAxis.push @salary[sal]["_id"]["level"].to_s
        end
        @sortValue = @mergearray.sort()
        if @sortValue.length > 1
          @medianVal = 0
          if @sortValue.length % 2 == 0
            @midPoint = ((@sortValue.length - 1) / 2).to_i
            @medianVal = (@sortValue[@midPoint] + @sortValue[@midPoint + 1]) / 2
          else
            @medianVal = @sortValue[((@sortValue.length - 1) / 2).to_i]
          end
          @yAxis2.push (@medianVal.to_f.round(2))
        else
          @yAxis2.push (@sortValue[0].to_f.round(2))
        end
        @yAxis.push ((@salry.to_f / @sumOFArray.to_f) * 100).to_f.round(2)
        @yAxis1.push 0
      end

    else
      for @sal in 0..@salary.length - 1
        @xAxis.push @salary[@sal]["_id"]["level"]
        @yAxis.push ((@salary[@sal]["count"].to_f / @sumOFArray.to_f) * 100).to_f.round(2)
        @yAxis1.push 0
        @sortValue = @salary[@sal][:salary].sort()
        if @sortValue.length > 1
          @medianVal = 0
          if @sortValue.length % 2 == 0
            @midPoint = ((@sortValue.length - 1) / 2).to_i
            @medianVal = (@sortValue[@midPoint] + @sortValue[@midPoint + 1]) / 2
          else
            @medianVal = @sortValue[((@sortValue.length - 1) / 2).to_i]
          end
          @yAxis2.push ({marker: {
              enabled: true
          }, y: @medianVal.to_f.round(2)})
        else
          @yAxis2.push ({marker: {
              enabled: true
          }, y: @sortValue[0].to_f.round(2)})
        end
      end
      # @indexofLevel=@xAxis.index(level)
      # @indexofnextLevel=@xAxis.index(level+1)
      # @valueofLevel=@yAxis1[@indexofLevel]
      # @valueofnextLevel=@yAxis1[@indexofnextLevel]
      # @nextmedan=((@yAxis2[@indexofLevel][:y].to_f/@yAxis2[@indexofLevel+1][:y].to_f)*100).to_f
      # @nextRange=((@valueofnextLevel.to_f/@valueofLevel.to_f)*100).to_f

      # return {nxtlevl:@nextRange.round(2),median:@yAxis2[@indexofLevel+1][:y],medianPer:@nextmedan}

    end

    (@yAxis.length - 1).downto(1) do |x|
      if @yAxis[x] > @yAxis[x - 1]
        @diff = (@yAxis[x - 1] - @yAxis[x]).abs / @yAxis[x - 1]
        if @diff >= 0.15
          @yAxis1[x] = @yAxis[x]
        end
      end
    end
    @resultPro = Hash.new
    @resultPro["yAxis"] = @yAxis
    @resultPro["xAxis"] = @xAxis
    @xAxisLine = Array.new
    if @xAxis[0].to_s.length > 3
      for xa in 0..@xAxis.length - 1
        @str = Array.new
        @str = @xAxis[xa].to_s.split('-')
        if @str.length > 1
          @xAxisLine.push (@str[1] + "-" + @str[0])

        end
      end
      @resultPro["xAxisLine"] = @xAxisLine.reverse
    else
      @resultPro["xAxisLine"] = @xAxis.reverse
    end

    @resultPro["yAxis1"] = @yAxis1

    @resultPro["yAxis2"] = @yAxis2
    @resultPro["yAxisLine"] = @yAxis2.reverse
    @resultPro["title"] = @title

    return @resultPro;
  end

  def calPercentileGraph(array, percentile)
    @testArray = array.sort()
    @indexArray = (percentile * @testArray.length).to_f
    if @indexArray % 1 == 0
      @firstIndex = @testArray[(@indexArray - 1).to_i]
      @SecIndex = @testArray[(@indexArray).to_i]
      @x = ((@firstIndex + @SecIndex).to_f / 2.to_f)
    else
      @x = @testArray[@indexArray.round(0) - 1]
    end
    return @x
  end

  def calPercentile(array, level)
    @testArray = Array.new
    @testArray = array
    @percentile = 0
    @belowRank = @testArray.select {|h| h["Level"] < level}.length
    @sameRank = @testArray.select {|h| h["Level"] == level}.length
    if @belowRank > 0 && @sameRank > 0
      @percentile = ((@belowRank + (0.5 * @sameRank)) / @testArray.length) * 100
    end

    return @percentile.to_f.round(2)
  end

  def calHighestSalary(array, level)
    @testArray = Array.new
    @testArray = array
    # @sameRank=@testArray.select{|h| h["Level"]==level}
    @higestSal = @testArray.sort_by {|k| k["Salary"]}.reverse
    return (@higestSal[0]["Salary"] / 100000).to_f.round(2)
  end

  def calMedianSalary(array, level)
    @medianVal = 0
    @testArray = Array.new
    @sameRank = Array.new
    @sortValue = Array.new
    @testArray = array
    # @sameRank=@testArray.select{|h| h["Level"]==level}
    @sortValue = @testArray.sort_by {|k| k["Salary"]}
    if @sortValue.length > 1
      @medianVal = 0
      if @sortValue.length % 2 == 0
        @midPoint = ((@sortValue.length - 1) / 2).to_i
        @medianVal = (@sortValue[@midPoint]["Salary"] + @sortValue[@midPoint + 1]["Salary"]) / 2
      else
        @medianVal = @sortValue[((@sortValue.length - 1) / 2).to_i]["Salary"]
      end
      return (@medianVal / 100000).to_f.round(2)
    end
  end

  def nextLevelPer(array, level)
    @xAxis = Array.new
    @yAxis = Array.new
    @yAxis1 = Array.new
    @yAxis2 = Array.new
    @xAxisLine = Array.new
    @salary = Array.new
    @salary = array
    @step = 0
    @indexofLevel = 0
    @indexofnextLevel = 0
    @valueofLevel = 0
    @valueofnextLevel
    if @salary.length > 9
      @step = 1
    elsif @salary.length > 19
      @step = 2
    elsif @salary.length > 29
      @step = 3
    elsif @salary.length > 39
      @step = 4
    end
    @salary = @salary.sort_by {|hash| -hash[:_id][:level]}
    @sumOFArray = @salary.map {|hash| hash["count"]}.sum
    puts "sum of all frequence" + @sumOFArray.to_s
    if @step > 0
      (0..@salary.length - 1).step(@step + 1).each do |sal|
        @salry = 0
        @count = 0
        @mergearray = Array.new
        for @s in 0..@step
          if (sal + @s) <= (@salary.length - 1)
            @salry = @salry + @salary[sal + @s]["count"]
            @mergearray = @mergearray + @salary[sal + @s]["salary"]
          end
        end
        if (sal + @s) <= (@salary.length - 1)
          @xAxis.push @salary[sal]["_id"]["level"].to_s + "-" + @salary[sal + @step]["_id"]["level"].to_s
        else
          @xAxis.push @salary[sal]["_id"]["level"].to_s
        end
        @sortValue = @mergearray.sort()
        if @sortValue.length > 1
          @medianVal = 0
          if @sortValue.length % 2 == 0
            @midPoint = ((@sortValue.length - 1) / 2).to_i
            @medianVal = (@sortValue[@midPoint] + @sortValue[@midPoint + 1]) / 2
          else
            @medianVal = @sortValue[((@sortValue.length - 1) / 2).to_i]
          end
          @yAxis2.push (@medianVal.to_f.round(2))
        else
          @yAxis2.push (@sortValue[0].to_f.round(2))
        end
        @yAxis.push ((@salry.to_f / @sumOFArray.to_f) * 100).to_f.round(2)
        @yAxis1.push @sortValue.length
      end
      for @ind in 0..@xAxis.length - 1
        @level = @xAxis[@ind]
        @lastVal = Array.new
        @lastVal = @level.to_s.split('-')
        @grtPoint = @lastVal[0].to_i
        @ltPoint = @lastVal[1].to_i
        if @grtPoint >= level && @ltPoint <= level
          @indexofLevel = @ind
          @valueofLevel = @yAxis1[@indexofLevel]
          @valueofnextLevel = @yAxis1[@indexofLevel - 1]
          break
        end
      end
      puts @indexofLevel.to_s + "|" + @xAxis.length.to_s + "|" + @yAxis.length.to_s
      if @indexofLevel > 0
        @nextmedan = ((@yAxis2[@indexofLevel].to_f / @yAxis2[@indexofLevel - 1].to_f) * 100).to_f
        @nextRange = ((@valueofnextLevel.to_f / @valueofLevel.to_f) * 100).to_f
        @medianSalary = @yAxis2[@indexofLevel - 1]
        @HiLevelSalaryGrowth = ((@yAxis2[@indexofLevel].to_f / @yAxis2[0].to_f) * 100).to_f
        @HiLevelGrowth = ((@xAxis[@indexofLevel].to_f / @xAxis[0].to_f) * 100).to_f
        @avGLevel = Array.new
        @avGSalary = Array.new
        for av in 0..@xAxis.length - 2
          @avGLevel.push (((@xAxis[av + 1].to_f / @xAxis[av].to_f) * 100).to_f)
          @avGSalary.push (((@yAxis2[av + 1].to_f / @yAxis2[av].to_f) * 100).to_f)
        end
        @avGLevelPer = @avGLevel.sum / @avGLevel.size.to_f
        @avGSalaryPer = @avGSalary.sum / @avGSalary.size.to_f
      else
        @nextmedan = 0
        @nextRange = 0
        @medianSalary = 0
        @HiLevelSalaryGrowth = 0;
        @HiLevelGrowth = 0;
      end

      # return {nxtlevl:@nextRange.round(2),median:@medianSalary,medianPer:((@nextmedan).to_f).round(2),HiLevelSalaryGrowth:@HiLevelSalaryGrowth.round(2),HiLevelGrowth:@HiLevelGrowth.round(2)}
      return {nxtlevl: @nextRange.round(2), median: @medianSalary, medianPer: ((@nextmedan).to_f).round(2), HiLevelSalaryGrowth: @HiLevelSalaryGrowth.round(2), HiLevelGrowth: @HiLevelGrowth.round(2), avGLevelPer: @avGLevelPer.round(2), avGSalaryPer: @avGSalaryPer.round(2)}

    else
      for @sal in 0..@salary.length - 1
        @xAxis.push @salary[@sal]["_id"]["level"]
        @yAxis.push ((@salary[@sal]["count"].to_f / @sumOFArray.to_f) * 100).to_f.round(2)
        @yAxis1.push @salary[@sal]["count"]
        @sortValue = @salary[@sal][:salary].sort()
        if @sortValue.length > 1
          @medianVal = 0
          if @sortValue.length % 2 == 0
            @midPoint = ((@sortValue.length - 1) / 2).to_i
            @medianVal = (@sortValue[@midPoint] + @sortValue[@midPoint + 1]) / 2
          else
            @medianVal = @sortValue[((@sortValue.length - 1) / 2).to_i]
          end
          @yAxis2.push ({marker: {
              enabled: true
          }, y: @medianVal.to_f.round(2)})
        else
          @yAxis2.push ({marker: {
              enabled: true
          }, y: @sortValue[0].to_f.round(2)})
        end
      end
      @indexofLevel = @xAxis.index(level)
      @indexofnextLevel = @xAxis.index(level + 1)
      @valueofLevel = @yAxis1[@indexofLevel]
      puts @indexofLevel.to_s + "|" + @indexofnextLevel.to_s + "|" + @xAxis.length.to_s + "|" + @yAxis1.length.to_s
      @valueofnextLevel = @yAxis1[@indexofLevel - 1]

      if @indexofLevel > 0
        @nextmedan = ((@yAxis2[@indexofLevel][:y].to_f / @yAxis2[@indexofLevel - 1][:y].to_f) * 100).to_f
        @nextRange = ((@valueofnextLevel.to_f / @valueofLevel.to_f) * 100).to_f
        @medianSalary = @yAxis2[@indexofLevel - 1][:y]
        @HiLevelSalaryGrowth = ((@yAxis2[@indexofLevel][:y].to_f / @yAxis2[0][:y].to_f) * 100).to_f
        @HiLevelGrowth = ((@xAxis[@indexofLevel].to_f / @xAxis[0].to_f) * 100).to_f
      else
        @nextmedan = 0
        @nextRange = 0
        @medianSalary = 0
        @HiLevelSalaryGrowth = 0
        @HiLevelGrowth = 0
      end
      @avGLevel = Array.new
      @avGSalary = Array.new
      for av in 0..@xAxis.length - 2
        @avGLevel.push (((@xAxis[av + 1].to_f / @xAxis[av].to_f) * 100).to_f)
        @avGSalary.push (((@yAxis2[av + 1][:y].to_f / @yAxis2[av][:y].to_f) * 100).to_f)
      end
      @avGLevelPer = @avGLevel.sum / @avGLevel.size.to_f
      @avGSalaryPer = @avGSalary.sum / @avGSalary.size.to_f
      # return {nxtlevl:@nextRange.round(2),median:@medianSalary,medianPer:@nextmedan.to_f.round(2),HiLevelSalaryGrowth:@HiLevelSalaryGrowth.round(2),HiLevelGrowth:@HiLevelGrowth.round(2)}
      return {nxtlevl: @nextRange.round(2), median: @medianSalary, medianPer: @nextmedan.to_f.round(2), HiLevelSalaryGrowth: @HiLevelSalaryGrowth.round(2), HiLevelGrowth: @HiLevelGrowth.round(2)}

    end


  end

  def getUserInfo(array, level)
    @testArray = Array.new
    @testArray = array
    @percentile = 0
    @belowRank = @testArray.select {|h| h["Level"] < level}.length
    if @belowRank > 0
      percent = ((@belowRank.to_f / @testArray.length.to_f)) * 100
    end
    @sortValue = @testArray.sort_by {|k| k["Level"]}
    @minlevel = @sortValue[0]['Level']
    @maxlevel = @sortValue[@sortValue.length - 1]['Level']
    return {min: @minlevel, max: @maxlevel, percentValue: percent, level: level}
  end

  def calPercentageBelowSalary(array, salary)
    @DataArray = Array.new
    @DataArray = array
    @belowvalue = Array.new
    @belowRank = 0
    @belowvalue = @DataArray.select {|h| h["Salary"] < salary}.length
    if @belowvalue > 0
      @belowRank = ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
    end

    return @belowRank
  end

  def calPercentagePeopleAtYourCL(array, level)
    @DataArray = Array.new
    @DataArray = array
    @belowvalue = Array.new
    @sameRank = 0
    @level = level
    @belowvalue = @DataArray.select {|h| h["Level"] == @level}.length
    if @belowvalue > 0
      @belowRank = ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
    end
    return @belowRank
  end

  def calUserLevel(array, level, mod)
    @DataArray = Array.new
    @DataArray = array
    @belowvalue = Array.new
    @belowRank = 0
    @level = level
    case mod
    when 'below'
      @belowvalue = @DataArray.select {|h| h["Level"] < @level}.length
      if @belowvalue > 0
        @belowRank = ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
      end
    when 'same'
      @belowvalue = @DataArray.select {|h| h["Level"] == @level}.length
      if @belowvalue > 0
        @belowRank = ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
      end
    when 'above'
      @belowvalue = @DataArray.select {|h| h["Level"] > @level}.length
      if @belowvalue > 0
        @belowRank = ((@belowvalue.to_f / @DataArray.length.to_f) * 100).to_f.round(2)
      end
    end
    return @belowRank
  end

  def getAllGrowthFactors(array, level)
    @nextgrowthValues = Hash.new
    @basicValue = Hash.new
    @basicValue = array
    @indexofLevel = @basicValue["xAxis"].index(level)
    @indexofnextLevel = @basicValue["xAxis"].index(level + 1)
    @valueofLevel = @basicValue["yAxis1"][@indexofLevel]
    @valueofnextLevel = @basicValue["yAxis1"][@indexofnextLevel]
    @nextmedan = ((@basicValue["yAxis2"][@indexofLevel][:y].to_f / @basicValue["yAxis2"][@indexofLevel + 1][:y].to_f) * 100).to_f
    @nextRange = ((@valueofnextLevel.to_f / @valueofLevel.to_f) * 100).to_f
    @nextHiRange = ((@basicValue["yAxis1"][0].to_f / @valueofLevel.to_f) * 100).to_f


    @nextgrowthValues["diffNextLevel"] = getDifficultyLevel(@nextRange)
    @nextgrowthValues["PerNextLevel"] = @nextRange
    @nextgrowthValues["HiLevel"] = @basicValue["xAxis"]
    @nextgrowthValues["diffHiLevel"] = getDifficultyLevel(@nextHiRange)
    @nextgrowthValues["PerHiLevel"] = @nextHiRange
    @nextgrowthValues["PerAvgPerLevel"] = 0
    @nextgrowthValues["diffAvgPerLevel"] = ""
    @nextgrowthValues["diffSalaryGrowthNextLevel"] = getDifficultyLevel(@nextmedan)
    @nextgrowthValues["MedianSalaryNextLevel"] = @basicValue["yAxis2"][@indexofnextLevel][:y].to_f
    @nextgrowthValues["PerMedianSalaryNextLevel"] = @nextmedan
    @nextgrowthValues["SalaryPercentileLevel"] = 0
    @nextgrowthValues["diffMedianSalaryGrowthHiLevel"] = 0
    @nextgrowthValues["PerMedianSalaryHiLevel"] = 0
    @nextgrowthValues["SalaryPercentileHiLevel"] = 0
    @nextgrowthValues["SalaryPercentileHiLevel"] = 0
    @nextgrowthValues["diffAvgSalaryGrowth"] = 0
    @nextgrowthValues["PerAvgSalaryGrowth"] = 0


  end

  def getDifficultyLevel(value)
    @difflevel = ""
    if (value >= 50)
      @difflevel = "Easy"
    elsif value >= 10 && value <= 50
      @difflevel = "Moderate"
    else
      @difflevel = "Hard"
    end
    return @difflevel
  end

  # def getGrowthScore(cl,company,industry,function,resultData)
  #   @resultdata=Hash.new
  #   @resultdata=resultData
  #   userCL = cl #20
  #   userCompany =company #"MINDA SILCA ENGINEERING"
  #   userIndustry = industry #"Automotive"
  #   userFunction =function # "ENGINEERING"
  #   userAvailable,relativeScores, maxValues, medianScores1=whileQuestionnaire(userCompany,userIndustry,userFunction)
  #   print "Relative Overall Scores:---------------------------------- \n"
  #   print relativeScores
  #   print "\nMax Scores:-------------------------------------- \n"
  #   print maxValues
  #   print "\nData Availability:-------------------------------------------- \n"
  #   print userAvailable
  #   print "\nMedian Scores:-------------------------------------------- \n"
  #   print medianScores1
  #   xOut = ppx(userCompany,userIndustry,userFunction,userCL,userAvailable)
  #   if xOut != []
  #     highestFilter,graphType,xVals,maxLevelFlag,nextLevelFlag = xOut
  #     print "\nHighest Filter:-------------------------------------------- \n"
  #     print highestFilter
  #     print "\nGraph Type:-------------------------------------------- \n"
  #     print graphType
  #     print "\nx-values:-------------------------------------------- \n"
  #     print xVals
  #     print "\nmax level and next level:-------------------------------------------- \n"
  #     print maxLevelFlag,nextLevelFlag
  #     if graphType == "g1"
  #       userRange = false
  #       cl = userCL
  #     else
  #       userRange = true
  #       xVals.each do |vals|
  #         if vals.include?(userCL)
  #           cl = vals
  #           break
  #         end
  #       end
  #     end
  #     a,b,c,d,medianScores2 = growthScores(cl,userCompany,userIndustry,userFunction,userRange,highestFilter,xVals)
  #     print "\nData Available:-------------------------------------------- \n"
  #     print a
  #     print "\nRelative CL specific scores:-------------------------------------------- \n"
  #     print b
  #     print "\nMax CL specific scores:-------------------------------------------- \n"
  #     print c
  #     print "\nMedian Salaries:-------------------------------------------- \n"
  #     print d
  #     print "\nMedian Scores:-------------------------------------------- \n"
  #     print medianScores2
  #     e,f = ppy(userCL,userCompany,userIndustry,userFunction,userRange,highestFilter,xVals)
  #     print "\nGraph 1 values:-------------------------------------------- \n"
  #     print e
  #     print "\nPP y Values:-------------------------------------------- \n"
  #     print f
  #     outBars, hiLo =getGrowthBars(relativeScores,b,medianScores1,medianScores1)
  #     print "\nGrowth Bars \n"
  #     print outBars
  #     print "\nHigh/Low for text\n"
  #     print hiLo
  #     outSalary, outCL = topGrowthBars(relativeScores,b)
  #     print "\nTop Growth Bars-----------------------------------------------\n"
  #     print outSalary
  #     print "\n"
  #     print outCL
  #   end
  #  @resultdata.each do |k,v|
  #    case k
  #      when "Your Company"
  #        if v.count>0 && outBars.has_key?('Company')
  #          @temp=outBars["Company"]
  #          v["salaryGrowth"]=((@temp[0].to_f/@temp[1].to_f)*100).round(2)
  #          if v.has_key?('compensation')
  #            v['compensation']['nxtGrowthfactor']['nxtlevl']=((outCL[0].to_f/outCL[1].to_f)*100).round(2)
  #            v['compensation']['nxtGrowthfactor']['avGSalaryPer']=((outSalary[0].to_f/outSalary[1].to_f)*100).round(2)
  #          end
  #        end
  #        # if v.count>0 && hiLo.has_key?('Company')
  #        #   @temTxt=hiLo['Company']
  #        #   if @temTxt=='High'
  #        #     hiLo['Company']=1
  #        #   else
  #        #     hiLo['Company']=2
  #        #   end
  #        # end
  #       when "Your Industry and Function"
  #        if v.count>0 && outBars.has_key?('Industry and Function')
  #        @temp=outBars["Industry and Function"]
  #        v["salaryGrowth"]=((@temp[0].to_f/@temp[1].to_f)*100).round(2)
  #        if v.has_key?('compensation')
  #          v['compensation']['nxtGrowthfactor']['nxtlevl']=((outCL[0].to_f/outCL[1].to_f)*100).round(2)
  #          v['compensation']['nxtGrowthfactor']['avGSalaryPer']=((outSalary[0].to_f/outSalary[1].to_f)*100).round(2)
  #        end
  #        end
  #        # if v.count>0 && hiLo.has_key?('Industry and Function')
  #        #   @temTxt=hiLo['Industry and Function']
  #        #   if @temTxt=='High'
  #        #     hiLo['Company']=1
  #        #   else
  #        #     hiLo['Company']=2
  #        #   end
  #        # end
  #      when "Your Function"
  #        if v.count>0 && outBars.has_key?('Function')
  #        @temp=outBars["Function"]
  #        v["salaryGrowth"]=((@temp[0].to_f/@temp[1].to_f)*100).round(2)
  #        if v.has_key?('compensation')
  #          v['compensation']['nxtGrowthfactor']['nxtlevl']=((outCL[0].to_f/outCL[1].to_f)*100).round(2)
  #          v['compensation']['nxtGrowthfactor']['avGSalaryPer']=((outSalary[0].to_f/outSalary[1].to_f)*100).round(2)
  #        end
  #        end
  #        # if v.count>0 && hiLo.has_key?('Function')
  #        #   @temTxt=hiLo['Function']
  #        #   if @temTxt=='High'
  #        #     hiLo['Company']=1
  #        #   else
  #        #     hiLo['Company']=2
  #        #   end
  #        # end
  #      when "Your Industry"
  #        if v.count>0 && outBars.has_key?('Industry')
  #        @temp=outBars["Industry"]
  #        v["salaryGrowth"]=((@temp[0].to_f/@temp[1].to_f)*100).round(2)
  #        if v.has_key?('compensation')
  #          v['compensation']['nxtGrowthfactor']['nxtlevl']=((outCL[0].to_f/outCL[1].to_f)*100).round(2)
  #          v['compensation']['nxtGrowthfactor']['avGSalaryPer']=((outSalary[0].to_f/outSalary[1].to_f)*100).round(2)
  #        end
  #        end
  #        # if v.count>0 && hiLo.has_key?('Industry')
  #        #   @temTxt=hiLo['Industry']
  #        #   if @temTxt=='High'
  #        #     hiLo['Company']=1
  #        #   else
  #        #     hiLo['Company']=2
  #        #   end
  #        # end
  #      when "Your Function Group"
  #        if v.count>0 && outBars.has_key?('Function Group')
  #        @temp=outBars["Function Group"]
  #        v["salaryGrowth"]=((@temp[0].to_f/@temp[1].to_f)*100).round(2)
  #        if v.has_key?('compensation')
  #          v['compensation']['nxtGrowthfactor']['nxtlevl']=((outCL[0].to_f/outCL[1].to_f)*100).round(2)
  #          v['compensation']['nxtGrowthfactor']['avGSalaryPer']=((outSalary[0].to_f/outSalary[1].to_f)*100).round(2)
  #        end
  #        end
  #        # if v.count>0 && hiLo.has_key?('Function Group')
  #        #   @temTxt=hiLo['Function Group']
  #        #   if @temTxt=='High'
  #        #     hiLo['Company']=1
  #        #   else
  #        #     hiLo['Company']=2
  #        #   end
  #        # end
  #      when "Your Industry Group"
  #        if v.count>0 && outBars.has_key?('Industry Group')
  #        @temp=outBars["Industry Group"]
  #        v["salaryGrowth"]=((@temp[0].to_f/@temp[1].to_f)*100).round(2)
  #        if v.has_key?('compensation')
  #          v['compensation']['nxtGrowthfactor']['nxtlevl']=((outCL[0].to_f/outCL[1].to_f)*100).round(2)
  #          v['compensation']['nxtGrowthfactor']['avGSalaryPer']=((outSalary[0].to_f/outSalary[1].to_f)*100).round(2)
  #        end
  #        end
  #        # if v.count>0 && hiLo.has_key?('Industry Group')
  #        #   @temTxt=hiLo['Industry Group']
  #        #   if @temTxt=='High'
  #        #     hiLo['Company']=1
  #        #   else
  #        #     hiLo['Company']=2
  #        #   end
  #        # end
  #    end
  #
  #  end
  #   @resultdata["PP_Text"]=hiLo
  #   return @resultdata
  # end
  def getUniqueComFnIn
    companyPath = $filePath + "companies.txt"
    indPath = $filePath + "industries.txt"
    funPath = $filePath + "functions.txt"
    clgPath = $filePath + "colleges.txt"
    degPath = $filePath + "degrees.txt"
    file = open(companyPath, 'r')
    text = file.read
    file.close
    allcompanny = [];
    allcompanny = text.split("\n")
    file = open(indPath, 'r')
    text = file.read
    file.close
    allInd = [];
    allInd = text.split("\n")
    file = open(funPath, 'r')
    text = file.read
    file.close
    allFun = [];
    allFun = text.split("\n")
    file = open(clgPath, 'r')
    text = file.read
    file.close
    allClg = [];
    allClg = text.split("\n")
    file = open(degPath, 'r')
    text = file.read
    file.close
    alldgr = [];
    alldgr = text.split("\n")
    return allcompanny, allInd, allFun, allClg, alldgr
  end

  def highest(userCompany, userIndustry, userFunction)
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    cases = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
    caseFilters = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
                   "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
                   "Function Group" => [[0], [fnGroup]]}
    fileName = ["oScoresCompIndFn.txt", "oScoresIndFn.txt", "oScoresFn.txt", "oScoresInd.txt", "oScoresFnG.txt", "oScoresIndG.txt"]
    strings = [[0, 1, 2], [0, 1], [0], [0], [0], [0]]
    highestVals = {}
    (0..cases.length - 1).each do |x|
      caseName = cases[x]
      caseFilter = caseFilters[caseName]
      highestVals[caseName] = []
      filePath = $filePath + fileName[x]
      file = open(filePath, 'r')
      text = file.read
      file.close
      textList = text.split("\n")
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[x].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            entry.push(rowList[i].to_f)
          end
        end
        checkUser = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            checkUser = 0
            break
          end
        end
        if checkUser == 1
          highestVals[caseName] = [entry[-4], entry[-3]]
          break
        end
      end


    end
    return highestVals
  end

  def graph1Only(userCL, userCompany, userIndustry, userFunction)
    #Used for getting the x-axis (count) values of the promotion pressures graph once we have the y-axis (CL) values; This also returns the values of the
    #first graph in the report that has % people above, at , below your CL
    #Inputs - user's CL, company, industry and function, highestFilter (got from caseName returned in the ppx function), xVals (these are the y axis values on the
    #PP grpah got from the ppx funtion above) and userRange(this is 1 if xVals has ranges of cl and 0 if it has actual cl values)
    #Outputs - out,ppY:
    #out - has values for graph 1 of report {"Company"=>[%people below userCL, %people at userCL, %people above userCL], etc}
    #ppY - has the count of entries for all values/ranges in xVals (so for xVals = [12,13,14,15] - {"Company"=>[count at 12,count at 13, count at 14, count at 15], etc.}
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    #your CL percentile
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry and Function" => [[0, 1], [userIndustry, userFunction]],
             "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]], "Industry Group" => [[0], [indGroup]],
             "Function Group" => [[0], [fnGroup]]}
    caseOrder = ["Company", "Industry and Function", "Function", "Industry", "Function Group", "Industry Group"]
    pathNames = {"Company" => "graph1CompIndFn.txt", "Industry and Function" => "graph1IndFn.txt", "Function" => "graph1Fn.txt", "Industry" => "graph1Ind.txt",
                 "Function Group" => "graph1FnG.txt", "Industry Group" => "graph1IndG.txt"}
    strings = {"Company" => [0, 1, 2], "Industry and Function" => [0, 1], "Function" => [0], "Industry" => [0], "Function Group" => [0], "Industry Group" => [0]}
    out = {}
    allFlags = {"Company" => 0, "Industry and Function" => 0, "Function" => 0, "Industry" => 0, "Function Group" => 0, "Industry Group" => 0}
    caseOrder.each do |caseName|
      path = $filePath + pathNames[caseName]
      caseCount = {}
      file = open(path, 'r')
      text = file.read
      file.close
      rows = text.split("\n")
      rows.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[caseName].include?(i)
            if caseName != "Industry Group" && caseName != "Function Group"
              entry.push(rowList[i].strip)
            else
              group = rowList[i].split("[")
              group = group[1].split("]")
              group = group[0].split("+")
              entry.push(group)
            end
          else
            entry.push(rowList[i].to_f)
          end
        end
        cl = entry[strings[caseName].max + 1]
        caseFilter = cases[caseName]
        flag = 1
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            flag = 0
            break
          end
        end

        if flag == 1
          allFlags[caseName] = 1
          if cl == userCL
            out[caseName] = entry[strings[caseName].max + 2..-2]
          end
        end
      end
      if allFlags[caseName] == 1 && out.key?(caseName) == false #data for the CL not available in graph1 file but data for this case is there
        if userCL > 45
          out[caseName] = [100.0, 0.0, 0.0]
        elsif userCL < 5
          out[caseName] = [0.0, 0.0, 100.0]
        end
      end
    end
    return out
  end
end
