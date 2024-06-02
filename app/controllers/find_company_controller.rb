class FindCompanyController < ApplicationController
  def index
    begin
      @role = ""
      @industry = ""
      @company = ""
      @level = ""
      @preferences = []
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
      if params.has_key?("Preferences")
        @preferences = params[:Preferences]
        # if @Salary<100
        #   @Salary=@Salary*100000
        # end
      end
      userCompany = @company
      userIndustry = @industry
      userFunction = @role
      preferences = @preferences #[1,1,1,1,1,1,1]
      out, available = filterOverall(userCompany, userIndustry, userFunction)
      print "\nOverall Availability ----------------------------------\n"
      print available
      userCL = @level
      out2, available2, out2All = filterSpecific(userCompany, userIndustry, userFunction, userCL, available)
      print "\nSpecific CL Availability ---------------------------------- \n"
      # print available2
      n = 10
      casesToDo = []
      available2.each do |x, y|
        if available[x] != 0
          casesToDo.push(x)
        end
      end
      print "\nCases where CL range is required ---------------------------------- \n"
      print casesToDo
      available3 = {}
      displayButtons = {}
      if casesToDo != []
        out3, available3, rangeUsed, out3All = filterSpecificRange(userCompany, userIndustry, userFunction, userCL, available, casesToDo, n)
        print "\nSpecific CL Range Availability ---------------------------------- \n"
        print available3
        print "\nRange used ------------------------------------------------\n"
        print rangeUsed
      end
      #1 compare companies within user's industry and function, 2 compare companies within user's function, 3 compare companies within user's industry
      #4 compare companies within user's function group, 5 compare companies within user's industry group, 6 compare functions within user's function group,
      #7 compare functions in user's industry, 8 compare all functions, 9 compare industries within user's industry group, 10 compare industries in user's function
      #11 compare all industries
      caseId2mode = {1 => "Company", 2 => "Company", 3 => "Company", 4 => "Company", 5 => "Company", 6 => "Function",
                     7 => "Function(Ind)", 8 => "Function", 9 => "Industry", 10 => "Industry(Fn)", 11 => "Industry"}
      # caseId2mode = {1 => "Company",2 => "Company"}

      resultToShow = {}
      allTopN = {}
      allCasesSpecific = {}
      allCasesOverall = {}
      allCasesGP = {}
      caseId2mode.each do |id, mode|
        result = {}
        resultFilter = []

        if available2[id] == 1
          dataSpecific = out2[id]
        elsif available3[id] == 1
          dataSpecific = out3[id]
        else
          dataSpecific = []
        end
        dataOverall = out[id]
        topN, allSpecific, allOverall, growthPotential = compare(dataSpecific, dataOverall, preferences, n, mode, id)
        allTopN[id] = topN
        allCasesSpecific[id] = allSpecific
        allCasesOverall[id] = allOverall
        allCasesGP[id] = growthPotential
        print "\n allSpecific................\n"
        print allSpecific
        if topN != []
          displayButtons[id] = 1
          result["growthGraph"] = []
          if growthPotential["names"].length > 0 && growthPotential["maxCL"].length > 0 && growthPotential["salaries"].length > 0
            if mode == "Company"
              for tn in 0..growthPotential["names"].length - 1
                resultFilter.push growthPotential["names"][tn][0]
              end
              result["growthGraph"].push resultFilter
              resultFilter = []
              result["growthGraph"].push growthPotential["maxCL"]
              result["growthGraph"].push growthPotential["salaries"]

            else
              resultFilter = []
              result["growthGraph"].push growthPotential["names"]
              result["growthGraph"].push growthPotential["maxCL"]
              result["growthGraph"].push growthPotential["salaries"]

            end
          end
          if mode == "Company"
            resultFilter = []
            for tn in 0..topN.length - 1
              resultFilter.push [topN[tn][0][0] + "," + topN[tn][0][1] + "," + topN[tn][0][2], topN[tn][1].to_f.round(2)]
            end
            result["topN"] = resultFilter
          else
            result["topN"] = topN
          end
          result["Specific"] = allSpecific
          result["Overall"] = allOverall
          print "allSpecific...................\n"
          print allSpecific

          if resultToShow.has_key?(id)
            resultToShow[id] = result
          else
            resultToShow[id] = result
          end

        else
          displayButtons[id] = 0
        end
      end
      # print "\n All Top N---------------------------------------------------------------\n"
      # print allTopN
      # print "\nCases to show:----------------------------------------------------------\n"
      # print displayButtons
      # print "\nAll growth potential graphs:----------------------------------------------------------\n"
      # print allCasesGP
      print "\nFinal Result:--------------------------------------------------\n "
      print resultToShow
      result = {}
      result['indGrp'] = getIndustryGroup(@industry)
      result['funGrp'] = []
      @tmp = getFunctionGroup(@role)
      for @role in 0..@tmp.length - 1
        result['funGrp'].push @tmp[@role].to_s.downcase.titleize
      end
      render json: {status: 200, resultToShow: resultToShow, IndGrp: result['indGrp'], FunGrp: result['funGrp']}
    rescue Exception => ex
      puts ex.message
    end
  end

  def getAllCharts_1
    @role = ""
    @industry = ""
    @company = ""
    @level = ""
    @preferences = []
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
    if params.has_key?("Preferences")
      @preferences = params[:Preferences]
      # if @Salary<100
      #   @Salary=@Salary*100000
      # end
    end
    if params.has_key?("Mode")
      @mode = params[:Mode]
    end
    if params.has_key?("Id")
      @ID = params[:Id]
    end
    if params.has_key?("AllSpecific")
      @allSpecific = params[:AllSpecific]

    end
    if params.has_key?("AllOverall")
      @allOverall = params[:AllOverall]

    end
    if params.has_key?("TopN")
      allTopN = params[:TopN]

    end
    userCompany = @company
    userIndustry = @industry
    userFunction = @role
    userCL = @level
    id = @ID
    mode = @mode
    topN = allTopN
    allSpecific = @allSpecific
    allOverall = @allOverall
    preferences = @preferences #[1,1,1,1,1,1,1]
    # growthPotential = allCasesGP[id]
    if topN != []
      #enter entity name as per user selection
      entityName = topN[0]
      print "\n Selection: ", entityName
      if mode == "Company"
        userEntity = [userCompany, userIndustry, userFunction]
        caseName = mode
        entityCompany = entityName[0]
        entityIndustry = entityName[1]
        entityFunction = entityName[2]
      elsif mode == "Function" || mode == "Function(Ind)"
        userEntity = userFunction
        caseName = "Function"
        entityCompany = ""
        entityIndustry = ""
        entityFunction = entityName
      else
        userEntity = userIndustry
        caseName = "Industry"
        entityCompany = ""
        entityIndustry = entityName
        entityFunction = ""
      end
      outScores, userScores = clickEntity(entityName, allSpecific, allOverall, userEntity, preferences, id)
      print "\nScores of top entity---------------------------------------------------------------\n"
      print outScores
      print "\nUser scores---------------------------------------------------------------\n"
      print userScores
      xOut1 = ppx(entityCompany, entityIndustry, entityFunction, userCL, available, caseName, id, 0)
      if userScores != nil
        xOut2 = ppx(userCompany, userIndustry, userFunction, userCL, available, caseName, id, 1)
        xOut = merge(xOut1, xOut2)
      else
        xOut = xOut1
      end
      print "\n Graph xVals-----------------------------------------------------------------------\n"
      print xOut
      if xOut != []
        if xOut[0].kind_of?(Array) == true
          userRange = true
          allVals = out3All[id]
        else
          userRange = false
          allVals = out2All[id]
        end
        entityPPY = ppy(entityCompany, entityIndustry, entityFunction, userRange, xOut, caseName, id, 0)
        userPPY = ppy(userCompany, userIndustry, userFunction, userRange, xOut, caseName, id, 1)
        #note that if userPPy value is 0 for any range it means data is unavailable for that range. don't display user graph if value is 0 for all ranges
        print "\n PP xVals (topEntity)-----------------------------------------------------------------------\n"
        print entityPPY
        print "\n PP xVals (user)-----------------------------------------------------------------------\n"
        print userPPY
        entitySals = rpGraph(entityCompany, entityIndustry, entityFunction, userRange, xOut, caseName, allVals, id, 0)
        userSals = rpGraph(userCompany, userIndustry, userFunction, userRange, xOut, caseName, allVals, id, 1)
        print "\n median salaries (topEntity)-----------------------------------------------------------------------\n"
        print entitySals
        print "\n median salaries (user)-----------------------------------------------------------------------\n"
        print userSals
      else
        print "\n Don't show PP and role premium graphs as we don't have the data"
      end
    end

  end

  def getAllCharts
    begin
      @role = ""
      @industry = ""
      @company = ""
      @level = ""
      @preferences = []
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
      if params.has_key?("Preferences")
        @preferences = params[:Preferences]
        # if @Salary<100
        #   @Salary=@Salary*100000
        # end
      end
      if params.has_key?("Mode")
        @mode = params[:Mode]
      end
      if params.has_key?("selectedCompany")
        @selectedCompany = params[:selectedCompany]
      end
      if params.has_key?("Id")
        @ID = params[:Id].to_i
      end
      # userCompany = "Minda Silca Engineering"
      # userIndustry = "Automotive1"
      # userFunction = "Engineering"
      userCompany = @company
      userIndustry = @industry
      userFunction = @role
      isUserCalculate = true

      preferences = @preferences #[1,1,1,1,1,1,1]
      out, available = filterOverall(userCompany, userIndustry, userFunction)
      print "\nOverall Availability ----------------------------------\n"
      print available
      userCL = @level
      out2, available2, out2All = filterSpecific(userCompany, userIndustry, userFunction, userCL, available)
      print "\nSpecific CL Availability ---------------------------------- \n"
      print available2
      n = 10
      casesToDo = []
      available2.each do |x, y|
        if available[x] != 0
          casesToDo.push(x)
        end
      end
      print "\nCases where CL range is required ---------------------------------- \n"
      print casesToDo
      available3 = {}
      displayButtons = {}
      if casesToDo != []
        out3, available3, rangeUsed, out3All = filterSpecificRange(userCompany, userIndustry, userFunction, userCL, available, casesToDo, n)
        print "\nSpecific CL Range Availability ---------------------------------- \n"
        print available3
        print "\nRange used ------------------------------------------------\n"
        print rangeUsed
      end
      #1 compare companies within user's industry and function, 2 compare companies within user's function, 3 compare companies within user's industry
      #4 compare companies within user's function group, 5 compare companies within user's industry group, 6 compare functions within user's function group,
      #7 compare functions in user's industry, 8 compare all functions, 9 compare industries within user's industry group, 10 compare industries in user's function
      #11 compare all industries
      # caseId2mode = {1 => "Company",2 => "Company",3 => "Company",4 => "Company",5 => "Company",6 => "Function",
      #                7 => "Function(Ind)",8 => "Function",9 => "Industry",10 => "Industry(Fn)",11 => "Industry"}
      # caseId2mode = {@ID => @mode}
      if (@ID == 7)
        @mode = "Function(Ind)"
      elsif @ID == 10
        @mode = "Industry(Fn)"
      end
      caseId2mode = {@ID => @mode}
      # caseId2mode = {1 => "Company",2 => "Company",3 => "Company",4 => "Company",5 => "Company",6 => "Function",
      #                7 => "Function(Ind)",8 => "Function",9 => "Industry",10 => "Industry(Fn)",11 => "Industry"}
      resultToShow = {}
      result = {}
      caseId2mode.each do |id, mode|

        resultFilter = []

        print "\n---------------------------------------------------------------\n"
        print id, mode
        print "\n---------------------------------------------------------------\n"
        if available2[id] == 1
          dataSpecific = out2[id]
        elsif available3[id] == 1
          dataSpecific = out3[id]
        else
          dataSpecific = []
        end
        dataOverall = out[id]
        #order of weights-
        # [0Immediate Salary improvement,
        # 1Short term CL growth,
        # 2Short term salary growth,
        # 3average salary growth,
        # 4 average CL growth,
        # 5 Long term CL growth,
        # 6Long term salary growth]
        # preferences = [1,1,1,1,1,1,1]
        preferences = @preferences #[1,1,1,1,1,1,1]
        topN, allSpecific, allOverall, growthPotential = compare(dataSpecific, dataOverall, preferences, n, mode, id)
        if topN != []
          displayButtons[id] = 1
        else
          displayButtons[id] = 0
        end
        print "\nTop N---------------------------------------------------------------\n"
        print topN
        print "\nGrowth Potential Graph---------------------------------------------------------------\n"
        if preferences[5] >= 0 || preferences[6] >= 0
          print "Show. Values: "
          print growthPotential
          result["growthGraph"] = []
          if mode == "Company" && growthPotential["names"].length > 0
            for tn in 0..growthPotential["names"].length - 1
              resultFilter.push growthPotential["names"][tn][0]
            end
            result["growthGraph"].push resultFilter
            resultFilter = []
            result["growthGraph"].push growthPotential["maxCL"]
            @tmpSal = []
            for s in 0..growthPotential["salaries"].length - 1
              @tmpSal.push (growthPotential["salaries"][s].to_f / 100000.to_f).round(2)
            end
            result["growthGraph"].push @tmpSal
          elsif growthPotential["names"].length > 0
            resultFilter = []
            result["growthGraph"].push growthPotential["names"]
            result["growthGraph"].push growthPotential["maxCL"]
            @tmpSal = []
            for s in 0..growthPotential["salaries"].length - 1
              @tmpSal.push (growthPotential["salaries"][s].to_f / 100000.to_f).round(2)
            end
            result["growthGraph"].push @tmpSal
          end
        else
          print "Do not show."
        end
        if topN != []
          for tn in 0..topN.length - 1
            resultFilter.push [topN[tn][0][0], topN[tn][1].to_f.round(2)]
          end
          result["topN"] = resultFilter
          resultFilter = []
          entityName = topN[@selectedCompany][0]
          if mode == "Company"
            userEntity = [userCompany, userIndustry, userFunction]
            caseName = mode
            entityCompany = entityName[0]
            entityIndustry = entityName[1]
            entityFunction = entityName[2]
            if ((id == 1 || id == 3 || id == 5) && (userCompany == entityCompany) && (userIndustry == entityIndustry) && (userFunction == entityFunction))
              isUserCalculate = false
            elsif (id == 2 || id == 4)
              if ((userCompany == entityCompany) && (userFunction == entityFunction))
                isUserCalculate = false
              end
            end
          elsif mode == "Function" || mode == "Function(Ind)"
            userEntity = userFunction
            caseName = "Function"
            entityCompany = ""
            entityIndustry = ""
            entityFunction = entityName
            if ((userFunction == entityFunction))
              isUserCalculate = false
            end
          else
            userEntity = userIndustry
            caseName = "Industry"
            entityCompany = ""
            entityIndustry = entityName
            entityFunction = ""
            if ((userEntity == entityIndustry))
              isUserCalculate = false
            end
          end
          outScores, userScores = clickEntity(entityName, allSpecific, allOverall, userEntity, preferences, id)
          print "\nScores of top entity---------------------------------------------------------------\n"
          print outScores
          print "\nUser scores---------------------------------------------------------------\n"
          print userScores
          xOut1 = ppx(entityCompany, entityIndustry, entityFunction, userCL, available, caseName, id, 0)
          if userScores != nil
            xOut2 = ppx(userCompany, userIndustry, userFunction, userCL, available, caseName, id, 1)
            xOut = merge(xOut1, xOut2)
          else
            xOut = xOut1
          end
          print "\n Graph xVals-----------------------------------------------------------------------\n"
          print xOut
          result["Scores"] = Hash.new
          result["UserScore"] = Hash.new
          outScores.each do |k, v|
            if v != nil
              result["Scores"][k] = v.to_f.round(2)
            end
            if userScores[k] != nil
              result["UserScore"][k] = userScores[k].to_f.round(2)
            end
          end

          if xOut != []

            if xOut[0].kind_of?(Array) == true
              userRange = true
              allVals = out3All[id]
              result["xAxis"] = []
              for x in 0..xOut.length - 1
                result["xAxis"].push (xOut[x][0].to_s[0..-3] + " - " + (xOut[x][xOut[x].length - 1]).to_s[0..-3])
              end
            else
              userRange = false
              allVals = out2All[id]
              result["xAxis"] = xOut
            end
            entityPPY = ppy(entityCompany, entityIndustry, entityFunction, userRange, xOut, caseName, id, 0)
            userPPY = Hash.new
            if (isUserCalculate)
              userPPY = ppy(userCompany, userIndustry, userFunction, userRange, xOut, caseName, id, 1)
            end
            #note that if userPPy value is 0 for any range it means data is unavailable for that range. don't display user graph if value is 0 for all ranges
            print "\n PP xVals (topEntity)-----------------------------------------------------------------------\n"
            print entityPPY
            print "\n PP xVals (user)-----------------------------------------------------------------------\n"
            print userPPY
            entitySals = rpGraph(entityCompany, entityIndustry, entityFunction, userRange, xOut, caseName, allVals, id, 0)
            userSals = Hash.new
            if (isUserCalculate)
              userSals = rpGraph(userCompany, userIndustry, userFunction, userRange, xOut, caseName, allVals, id, 1)
            end
            print "\n median salaries (topEntity)-----------------------------------------------------------------------\n"
            print entitySals
            print "\n median salaries (user)-----------------------------------------------------------------------\n"
            print userSals
            if result["xAxis"].length > 0 && entitySals.length > 0
              result["medianScore"] = []
              for x in 0..xOut.length - 1
                if entitySals.has_key?(xOut[x])
                  result["medianScore"].push (entitySals[xOut[x]].to_f / 100000.to_f).round(2)
                else
                  result["medianScore"].push ""
                end

              end
              # result["medianScore"]=entitySals.values.map{|val| (val.to_f/100000.to_f).round(2)}
              if entityPPY.length > 0
                # result["ppyScores"]=entityPPY.values
                @yAxis = []
                @yAxis1 = []
                @ppyScore = entityPPY.values
                @sumofArray = @ppyScore.sum
                for y1 in 0..@ppyScore.length - 1
                  @valPP = ((@ppyScore[y1].to_f / @sumofArray.to_f) * 100).round(2)
                  if @valPP == 0
                    @valPP = ((@ppyScore[y1].to_f / @sumofArray.to_f) * 100).round(5)
                  end
                  @yAxis.push @valPP
                  @yAxis1.push 0
                end
                result["ppyScores"] = @yAxis
                @yAxis = @yAxis.reverse
                (@yAxis.length - 1).downto(1) do |x|
                  if @yAxis[x] > @yAxis[x - 1]
                    @diff = (@yAxis[x - 1] - @yAxis[x]).abs / @yAxis[x - 1]
                    if @diff >= 0.15
                      @yAxis1[x] = @yAxis[x]
                    end
                  end
                end
                result["ppyScoresB"] = @yAxis1.reverse
              end
            end
            if result["xAxis"].length > 0 && !userSals.empty?
              result["medianUser"] = []

              for x in 0..xOut.length - 1
                if userSals.has_key?(xOut[x])
                  result["medianUser"].push (userSals[xOut[x]].to_f / 100000.to_f).round(2)
                else
                  result["medianUser"].push ""
                end

              end
              # result["medianUser"]=userSals.values.map{|val| (val.to_f/100000.to_f).round(2)}
              if userPPY.length > 0
                @yAxis = []
                @yAxis1 = []
                @ppyUser = userPPY.values
                # result["ppyUser"]=userPPY.values
                @sumofArray = @ppyUser.sum
                result["ppyUser"] = []
                for y1 in 0..@ppyUser.length - 1
                  @valPP = ((@ppyUser[y1].to_f / @sumofArray.to_f) * 100).round(2)
                  if @valPP == 0
                    @valPP = ((@ppyUser[y1].to_f / @sumofArray.to_f) * 100).round(5)
                  end
                  @yAxis.push @valPP
                  @yAxis1.push 0
                  result["ppyUser"].push -@valPP
                end
                result["ppyUser"] = result["ppyUser"]
                @yAxis = @yAxis.reverse
                (@yAxis.length - 1).downto(1) do |x|
                  if @yAxis[x] > @yAxis[x - 1]
                    @diff = (@yAxis[x - 1] - @yAxis[x]).abs / @yAxis[x - 1]
                    if @diff >= 0.15
                      @yAxis1[x] = -@yAxis[x]
                    end
                  end
                end
                result["ppyUserB"] = @yAxis1.reverse
              end
            end
            if ((userSals.empty? || entitySals.empty?))
              if (!entitySals.empty?)
                result["ppyScores"] = result["ppyScores"].reverse
                result["ppyScoresB"] = result["ppyScoresB"].reverse
                result["xAxisPP"] = result["xAxis"].reverse
              end
              if (!userSals.empty?)
                result["ppyUser"] = result["ppyUser"].reverse
                result["ppyUserB"] = result["ppyUserB"].reverse
                result["xAxisPP"] = result["xAxis"].reverse
              end
            end
            result["hiderp"] = false
          else
            result["hiderp"] = true
          end

          if resultToShow.has_key?(id)
            resultToShow[id] = result
          else
            resultToShow[id] = result
          end


        end
      end
      print "\nCases to show:----------------------------------------------------------\n"
      print displayButtons
      print "\nFinal Result:--------------------------------------------------\n "
      print resultToShow
      print "\nisUserCalculate:--------------------------------------------------\n "
      print isUserCalculate
      result["showUser"] = isUserCalculate
      render json: {status: 200, resultToShow: result, showUser: isUserCalculate}
    rescue Exception => ex
      puts ex.message
    end
  end

  def index_test
    userCompany = "Rohm And Haas"
    userIndustry = "Apparel & Fashion"
    userFunction = "Construction"
    userCL = 17
    preferences = [2, 1, 2, 3, 2, 1, 2]
    n = 10
    displayButtons = {}
#RUN AFTER GETTING PREFERENCES--------------------------------------------------------------------------------------------------------------------------
    out, available = filterOverall(userCompany, userIndustry, userFunction)
    print "\nOverall Availability ----------------------------------\n"
    print available
    out2, available2, out2All = filterSpecific(userCompany, userIndustry, userFunction, userCL, available)
    print "\nSpecific CL Availability ---------------------------------- \n"
    print available2
    casesToDo = []
    available2.each do |x, y|
      if y == 0 && available[x] != 0
        casesToDo.push(x)
      end
    end
    print "\nCases where CL range is required ---------------------------------- \n"
    print casesToDo
    available3 = {}
    if casesToDo != []
      out3, available3, rangeUsed, out3All = filterSpecificRange(userCompany, userIndustry, userFunction, userCL, available, casesToDo, n)
      print "\nSpecific CL Range Availability ---------------------------------- \n"
      print available3
      print "\nRange used ------------------------------------------------\n"
      print rangeUsed
    end
#1 compare companies within user's industry and function, 2 compare companies within user's function, 3 compare companies within user's industry
#4 compare companies within user's function group, 5 compare companies within user's industry group, 6 compare functions within user's function group,
#7 compare functions in user's industry, 8 compare all functions, 9 compare industries within user's industry group, 10 compare industries in user's function
#11 compare all industries
    caseId2mode = {1 => "Company", 2 => "Company", 3 => "Company", 4 => "Company", 5 => "Company", 6 => "Function",
                   7 => "Function(Ind)", 8 => "Function", 9 => "Industry", 10 => "Industry(Fn)", 11 => "Industry"}

    allTopN = {}
    allCasesSpecific = {}
    allCasesOverall = {}
    allCasesGP = {}
    caseId2mode.each do |id, mode|
      if available2[id] == 1
        dataSpecific = out2[id]
      elsif available3[id] == 1
        dataSpecific = out3[id]
      else
        dataSpecific = []
      end
      dataOverall = out[id]
      topN, allSpecific, allOverall, growthPotential = compare(dataSpecific, dataOverall, preferences, n, mode, id)
      allTopN[id] = topN
      allCasesSpecific[id] = allSpecific
      allCasesOverall[id] = allOverall
      allCasesGP[id] = growthPotential
      if topN != []
        displayButtons[id] = 1
      else
        displayButtons[id] = 0
      end
    end
    print "\n All Top N---------------------------------------------------------------\n"
    print allTopN
    print "\nCases to show:----------------------------------------------------------\n"
    print displayButtons
    print "\nAll growth potential graphs:----------------------------------------------------------\n"
    print allCasesGP
#RUN AFTER USER HAS CLICKED ON ONE OF THE TOP N
#change id as per user selection
    id = 6
    mode = caseId2mode[id]
    topN = allTopN[id]
    print "\ntopN: ", topN
    allSpecific = allCasesSpecific[id]
    allOverall = allCasesOverall[id]
    growthPotential = allCasesGP[id]
    if topN != []
      #enter entity name as per user selection
      entityName = topN[4][0]
      print "\n Selection: ", entityName
      if mode == "Company"
        userEntity = [userCompany, userIndustry, userFunction]
        caseName = mode
        entityCompany = entityName[0]
        entityIndustry = entityName[1]
        entityFunction = entityName[2]
      elsif mode == "Function" || mode == "Function(Ind)"
        userEntity = userFunction
        caseName = "Function"
        entityCompany = ""
        entityIndustry = ""
        entityFunction = entityName
      else
        userEntity = userIndustry
        caseName = "Industry"
        entityCompany = ""
        entityIndustry = entityName
        entityFunction = ""
      end
      outScores, userScores = clickEntity(entityName, allSpecific, allOverall, userEntity, preferences, id)
      print "\nScores of top entity---------------------------------------------------------------\n"
      print outScores
      print "\nUser scores---------------------------------------------------------------\n"
      print userScores
      xOut1 = ppx(entityCompany, entityIndustry, entityFunction, userCL, available, caseName, id, 0)
      if userScores != nil
        xOut2 = ppx(userCompany, userIndustry, userFunction, userCL, available, caseName, id, 1)
        xOut = merge(xOut1, xOut2)
      else
        xOut = xOut1
      end
      print "\n Graph xVals-----------------------------------------------------------------------\n"
      print xOut
      if xOut != []
        if xOut[0].kind_of?(Array) == true
          userRange = true
          allVals = out3All[id]
        else
          userRange = false
          allVals = out2All[id]
        end
        entityPPY = ppy(entityCompany, entityIndustry, entityFunction, userRange, xOut, caseName, id, 0)
        userPPY = ppy(userCompany, userIndustry, userFunction, userRange, xOut, caseName, id, 1)
        #note that if userPPy value is 0 for any range it means data is unavailable for that range. don't display user graph if value is 0 for all ranges
        print "\n PP xVals (topEntity)-----------------------------------------------------------------------\n"
        print entityPPY
        print "\n PP xVals (user)-----------------------------------------------------------------------\n"
        print userPPY
        entitySals = rpGraph(entityCompany, entityIndustry, entityFunction, userRange, xOut, caseName, allVals, id, 0)
        userSals = rpGraph(userCompany, userIndustry, userFunction, userRange, xOut, caseName, allVals, id, 1)
        print "\n median salaries (topEntity)-----------------------------------------------------------------------\n"
        print entitySals
        print "\n median salaries (user)-----------------------------------------------------------------------\n"
        print userSals
      else
        print "\n Don't show PP and role premium graphs as we don't have the data"
      end

    end
  end


  private

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

  #testing
  def filterOverall(userCompany, userIndustry, userFunction)
    begin
      #run this while questionnaire is being filled
      #get industry group
      indGroup = getIndustryGroup(userIndustry)
      fnGroup = getFunctionGroup(userFunction)
      minCompanies = 3 #minimum number of companies that should be there so that filtered data is saved
      minIndustries = [(indGroup.length / 2).round, 1].max #minimum number of industries that should be there so that filtered data is saved
      minFunctions = [(fnGroup.length / 2).round, 1].max #minimum number of functions that should be there so that filtered data is saved
      #Cases - 1 compare companies within user's industry and function, 2 compare companies within user's function, 3 compare companies within user's industry
      #        4 compare companies within user's function group, 5 compare companies within user's industry group, 6 compare functions within user's function group,
      #        7 compare functions in user's industry, 8 compare all functions, 9 compare industries within user's industry group, 10 compare industries in user's function
      #        11 compare all industries
      overallPath1 = $filePath + "oScoresCompIndFn.txt" #cases 1 to 5
      overallPath2 = $filePath + "oScoresIndFn.txt" #cases 7 and 10
      overallPath3 = $filePath + "oScoresInd.txt" #cases 9 and 11
      overallPath4 = $filePath + "oScoresFn.txt" #cases 6 and 8
      casePaths = {overallPath1 => [1, 2, 3, 4, 5], overallPath2 => [7, 10], overallPath3 => [9, 11], overallPath4 => [6, 8]}
      cases = {1 => [[1, 2], [[userIndustry], [userFunction]]], 2 => [[2], [[userFunction]]], 3 => [[1], [[userIndustry]]], 4 => [[2], [fnGroup]], 5 => [[1], [indGroup]], 6 => [[0], [fnGroup]],
               7 => [[0], [[userIndustry]]], 8 => [[], []], 9 => [[0], [indGroup]], 10 => [[1], [[userFunction]]], 11 => [[], []]}
      strings = {overallPath1 => [0, 1, 2], overallPath2 => [0, 1], overallPath3 => [0], overallPath4 => [0]}
      minLengths = {1 => minCompanies, 2 => minCompanies, 3 => minCompanies, 4 => minCompanies, 5 => minCompanies, 6 => minFunctions, 7 => minFunctions, 8 => minFunctions,
                    9 => minIndustries, 10 => minIndustries, 11 => minIndustries}
      out = {}
      available = {}
      casePaths.each do |path, caseIds|
        file = open(path, 'r')
        text = file.read
        file.close
        textList = text.split("\n")
        caseIds.each do |caseId|
          overall = []
          funcList = []
          indList = []
          textList.each do |row|
            rowList = row.split(";")
            entry = []
            (0..rowList.length - 1).each do |i|
              if strings[path].include?(i)
                entry.push(rowList[i].strip)
              else
                entry.push(rowList[i].to_f)
              end
            end
            caseFilter = cases[caseId]
            if caseFilter[0] != []
              flag = 1
              (0..caseFilter[0].length - 1).each do |i|
                if !caseFilter[1][i].include?(entry[caseFilter[0][i]])
                  flag = 0
                end
              end
              if flag == 1 && caseId != 7 && caseId != 10
                overall.push(entry)
              elsif flag == 1 && caseId == 7 && !funcList.include?(entry[1])
                funcList.push(entry[1])
              elsif flag == 1 && caseId == 10 && !indList.include?(entry[0])
                indList.push(entry[0])
              end
            else
              if caseId != 7 && caseId != 10
                overall.push(entry)
              elsif caseId == 7 && !funcList.include?(entry[1])
                funcList.push(entry[1])
              elsif caseId == 10 && !indList.include?(entry[0])
                indList.push(entry[0])
              end
            end
          end
          if caseId == 7
            file = open(overallPath4, 'r')
            text2 = file.read
            file.close
            textList2 = text2.split("\n")
            textList2.each do |row|
              rowList = row.split(";")
              entry = []
              (0..rowList.length - 1).each do |i|
                if strings[overallPath4].include?(i)
                  entry.push(rowList[i].strip)
                else
                  entry.push(rowList[i].to_f)
                end
              end
              if funcList.include?(entry[0])
                overall.push([userIndustry] + entry)
              end
            end
          elsif caseId == 10
            file = open(overallPath3, 'r')
            text2 = file.read
            file.close
            textList2 = text2.split("\n")
            textList2.each do |row|
              rowList = row.split(";")
              entry = []
              (0..rowList.length - 1).each do |i|
                if strings[overallPath3].include?(i)
                  entry.push(rowList[i].strip)
                else
                  entry.push(rowList[i].to_f)
                end
              end
              if indList.include?(entry[0])
                overall.push([entry[0], userFunction, entry[1], entry[2], entry[3], entry[4]])
              end
            end
          end
          if overall.length >= minLengths[caseId]
            out[caseId] = overall
            available[caseId] = 1
          else
            out[caseId] = []
            available[caseId] = 0
          end
        end
      end
      return out, available
    rescue Exception => ex
      puts ex.message
    end
  end

  def filterSpecific(userCompany, userIndustry, userFunction, userCL, overallAvail)
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    userCL = userCL.to_f
    minCompanies = 3 #minimum number of companies that should be there so that filtered data is saved
    minIndustries = [(indGroup.length / 2).round, 1].max #minimum number of industries that should be there so that filtered data is saved
    minFunctions = [(fnGroup.length / 2).round, 1].max #minimum number of functions that should be there so that filtered data is saved
    #Cases - 1 compare companies within user's industry and function, 2 compare companies within user's function, 3 compare companies within user's industry
    #        4 compare companies within user's function group, 5 compare companies within user's industry group, 6 compare functions within user's function group,
    #        7 compare functions in user's industry, 8 compare all functions, 9 compare industries within user's industry group, 10 compare industries in user's function
    #        11 compare all industries
    specificPath1 = $filePath + "wclScoresCompIndFn.txt" #cases 1 to 5
    specificPath2 = $filePath + "wclScoresIndFn.txt" #cases 7 and 10
    specificPath3 = $filePath + "wclScoresInd.txt" #cases 9 and 11
    specificPath4 = $filePath + "wclScoresFn.txt" #cases 6 and 8
    casePaths = {specificPath1 => [1, 2, 3, 4, 5], specificPath2 => [7, 10], specificPath3 => [9, 11], specificPath4 => [6, 8]}
    cases = {1 => [[1, 2, 3], [[userIndustry], [userFunction], [userCL]]], 2 => [[2, 3], [[userFunction], [userCL]]], 3 => [[1, 3], [[userIndustry], [userCL]]], 4 => [[2, 3], [fnGroup, [userCL]]],
             5 => [[1, 3], [indGroup, [userCL]]], 6 => [[0, 1], [fnGroup, [userCL]]], 7 => [[0, 2], [[userIndustry], [userCL]]], 8 => [[1], [[userCL]]], 9 => [[0, 1], [indGroup, [userCL]]],
             10 => [[1, 2], [[userFunction], [userCL]]], 11 => [[1], [[userCL]]]}
    strings = {specificPath1 => [0, 1, 2], specificPath2 => [0, 1], specificPath3 => [0], specificPath4 => [0]}
    minLengths = {1 => minCompanies, 2 => minCompanies, 3 => minCompanies, 4 => minCompanies, 5 => minCompanies, 6 => minFunctions, 7 => minFunctions, 8 => minFunctions,
                  9 => minIndustries, 10 => minIndustries, 11 => minIndustries}
    out = {}
    outAllCls = {}
    available = {}
    casePaths.each do |path, caseIds|
      file = open(path, 'r')
      text = file.read
      file.close
      textList = text.split("\n")
      caseIds.each do |caseId|
        if overallAvail[caseId] == 1
          specific = []
          specificAllCls = []
          funcList = []
          indList = []
          textList.each do |row|
            rowList = row.split(";")
            entry = []
            (0..rowList.length - 1).each do |i|
              if strings[path].include?(i)
                entry.push(rowList[i].strip)
              else
                entry.push(rowList[i].to_f)
              end
            end
            caseFilter = cases[caseId]
            flag = 1
            flag2 = 1 #for all CLs
            (0..caseFilter[0].length - 1).each do |i|
              if !caseFilter[1][i].include?(entry[caseFilter[0][i]])
                flag = 0
                if i != caseFilter[0].length - 1
                  flag2 = 0
                end
              end
            end
            if flag == 1 && caseId != 7 && caseId != 10
              specific.push(entry)
            elsif flag2 == 1 && caseId == 7 && !funcList.include?(entry[1])
              funcList.push(entry[1])
            elsif flag2 == 1 && caseId == 10 && !indList.include?(entry[0])
              indList.push(entry[0])
            end
            if flag2 == 1
              if caseId != 7 && caseId != 10
                specificAllCls.push(entry)
              end
            end
          end
          if caseId == 7
            file = open(specificPath4, 'r')
            text2 = file.read
            file.close
            textList2 = text2.split("\n")
            textList2.each do |row|
              rowList = row.split(";")
              entry = []
              (0..rowList.length - 1).each do |i|
                if strings[specificPath4].include?(i)
                  entry.push(rowList[i].strip)
                else
                  entry.push(rowList[i].to_f)
                end
              end
              if funcList.include?(entry[0])
                specificAllCls.push(entry)
              end
              if funcList.include?(entry[0]) && entry[1] == userCL
                specific.push([userIndustry] + entry)
              end
            end
          elsif caseId == 10
            file = open(specificPath3, 'r')
            text2 = file.read
            file.close
            textList2 = text2.split("\n")
            textList2.each do |row|
              rowList = row.split(";")
              entry = []
              (0..rowList.length - 1).each do |i|
                if strings[specificPath3].include?(i)
                  entry.push(rowList[i].strip)
                else
                  entry.push(rowList[i].to_f)
                end
              end
              if indList.include?(entry[0])
                specificAllCls.push(entry)
              end
              if indList.include?(entry[0]) && entry[1] == userCL
                specific.push([entry[0], userFunction, entry[1], entry[2], entry[3], entry[4], entry[5]])
              end
            end
          end
        else
          specific = []
        end
        if specific.length > 0
          out[caseId] = specific
          available[caseId] = 1
        else
          out[caseId] = []
          available[caseId] = 0
        end
        outAllCls[caseId] = specificAllCls
      end
    end
    return out, available, outAllCls
  end

  def filterSpecificRange(userCompany, userIndustry, userFunction, userCL, overallAvail, casesToDo, n)
    begin
    indGroup = getIndustryGroup(userIndustry)
    fnGroup = getFunctionGroup(userFunction)
    userCL = userCL.to_f
    minCompanies = 3 #minimum number of companies that should be there so that filtered data is saved
    minIndustries = [(indGroup.length / 2).round, 1].max #minimum number of industries that should be there so that filtered data is saved
    minFunctions = [(fnGroup.length / 2).round, 1].max #minimum number of functions that should be there so that filtered data is saved
    #Cases - 1 compare companies within user's industry and function, 2 compare companies within user's function, 3 compare companies within user's industry
    #        4 compare companies within user's function group, 5 compare companies within user's industry group, 6 compare functions within user's function group,
    #        7 compare functions in user's industry, 8 compare all functions, 9 compare industries within user's industry group, 10 compare industries in user's function
    #        11 compare all industries
    specificPath1 = $filePath + "wclrangeScoresCompIndFn.txt" #cases 1 to 5
    specificPath2 = $filePath + "wclrangeScoresIndFn.txt" #cases 7 and 10
    specificPath3 = $filePath + "wclrangeScoresInd.txt" #cases 9 and 11
    specificPath4 = $filePath + "wclrangeScoresFn.txt" #cases 6 and 8
    casePaths = {specificPath1 => [1, 2, 3, 4, 5], specificPath2 => [7, 10], specificPath3 => [9, 11], specificPath4 => [6, 8]}
    cases = {1 => [[1, 2], [[userIndustry], [userFunction]]], 2 => [[2], [[userFunction]]], 3 => [[1], [[userIndustry]]], 4 => [[2], [fnGroup]], 5 => [[1], [indGroup]], 6 => [[0], [fnGroup]],
             7 => [[0], [[userIndustry]]], 8 => [[], []], 9 => [[0], [indGroup]], 10 => [[1], [[userFunction]]], 11 => [[], []]}
    strings = {specificPath1 => [0, 1, 2], specificPath2 => [0, 1], specificPath3 => [0], specificPath4 => [0]}
    minLengths = {1 => minCompanies, 2 => minCompanies, 3 => minCompanies, 4 => minCompanies, 5 => minCompanies, 6 => minFunctions, 7 => minFunctions, 8 => minFunctions,
                  9 => minIndustries, 10 => minIndustries, 11 => minIndustries}
    out = {}
    outAllCls = {}
    available = {}
    rangeUsed = {}
    casePaths.each do |path, caseIds|
      file = open(path, 'r')
      text = file.read
      file.close
      clIndex = strings[path].max + 1
      textList = text.split("\n")
      caseIds.each do |caseId|
        if !casesToDo.include?(caseId)
          next
        end
        if overallAvail[caseId] == 1
          tempSpecific = []
          specific = []
          specificAllCls = []
          clRanges = {}
          userRanges = []
          maxCount = 0
          funcList = []
          indList = []
          textList.each do |row|
            rowList = row.split(";")
            entry = []
            (0..rowList.length - 1).each do |i|
              if strings[path].include?(i)
                entry.push(rowList[i].strip)
              elsif i == clIndex
                cls = rowList[i].split("[")
                cls = cls[1].split("]")
                cls = cls[0].split(",").map {|s| s.to_f}
                entry.push(cls)
              else
                entry.push(rowList[i].to_f)
              end
            end
            caseFilter = cases[caseId]
            flag = 1
            if caseFilter[0].length > 0
              (0..caseFilter[0].length - 1).each do |i|
                if !caseFilter[1][i].include?(entry[caseFilter[0][i]])
                  flag = 0
                  break
                end
              end
            end
            if flag == 1
              if caseId != 7 && caseId != 10
                specificAllCls.push(entry)
              elsif caseId == 7 && !funcList.include?(entry[1])
                funcList.push(entry[1])
              elsif caseId == 10 && !indList.include?(entry[0])
                indList.push(entry[0])
              end
              if entry[clIndex].include?(userCL) && caseId != 7 && caseId != 10
                tempSpecific.push(entry)
                if !userRanges.include?(entry[clIndex])
                  userRanges.push(entry[clIndex])
                end
                if clRanges.key?(entry[clIndex])
                  clRanges[entry[clIndex]][0] += 1
                  if maxCount < clRanges[entry[clIndex]][0]
                    maxCount = clRanges[entry[clIndex]][0]
                  end
                else
                  clRanges[entry[clIndex]] = [1, entry[clIndex].length]
                  if maxCount < 1
                    maxCount = 1
                  end
                end
              end
            end
          end
          if caseId == 7
            file = open(specificPath4, 'r')
            text2 = file.read
            file.close
            textList2 = text2.split("\n")
            textList2.each do |row|
              rowList = row.split(";")
              entry = []
              (0..rowList.length - 1).each do |i|
                if strings[specificPath4].include?(i)
                  entry.push(rowList[i].strip)
                elsif i == 1
                  cls = rowList[i].split("[")
                  cls = cls[1].split("]")
                  cls = cls[0].split(",").map {|s| s.to_f}
                  entry.push(cls)
                else
                  entry.push(rowList[i].to_f)
                end
              end
              if funcList.include?(entry[0])
                specificAllCls.push(entry)
              end
              if entry[1].include?(userCL)
                tempSpecific.push([userIndustry] + entry)
                if !userRanges.include?(entry[1])
                  userRanges.push(entry[1])
                end
                if clRanges.key?(entry[1])
                  clRanges[entry[1]][0] += 1
                  if maxCount < clRanges[entry[1]][0]
                    maxCount = clRanges[entry[1]][0]
                  end
                else
                  clRanges[entry[1]] = [1, entry[1].length]
                  if maxCount < 1
                    maxCount = 1
                  end
                end
              end
            end
          elsif caseId == 10
            file = open(specificPath3, 'r')
            text2 = file.read
            file.close
            textList2 = text2.split("\n")
            textList2.each do |row|
              rowList = row.split(";")
              entry = []
              (0..rowList.length - 1).each do |i|
                if strings[specificPath3].include?(i)
                  entry.push(rowList[i].strip)
                elsif i == 1
                  cls = rowList[i].split("[")
                  cls = cls[1].split("]")
                  cls = cls[0].split(",").map {|s| s.to_f}
                  entry.push(cls)
                else
                  entry.push(rowList[i].to_f)
                end
              end
              if indList.include?(entry[0])
                specificAllCls.push(entry)
              end
              if entry[1].include?(userCL)
                tempSpecific.push([entry[0], userFunction, entry[1], entry[2], entry[3], entry[4], entry[5]])
                if !userRanges.include?(entry[1])
                  userRanges.push(entry[1])
                end
                if clRanges.key?(entry[1])
                  clRanges[entry[1]][0] += 1
                  if maxCount < clRanges[entry[1]][0]
                    maxCount = clRanges[entry[1]][0]
                  end
                else
                  clRanges[entry[1]] = [1, entry[1].length]
                  if maxCount < 1
                    maxCount = 1
                  end
                end
              end
            end
          end
          sorted = clRanges.sort_by {|range, vals| vals[1]}
          if maxCount >= n
            flag = 1
          else
            flag = 0
          end
          selected = []
          sorted.each do |row|
            range = row[0]
            if flag == 1
              if userRanges != []
                if userRanges.include?(range) && row[1][0] >= n
                  selected = range
                end
              else
                if row[1][0] >= n
                  selected = range
                end
              end
            else
              if userRanges != []
                if userRanges.include?(range) && row[1][0] == maxCount
                  selected = range
                end
              else
                if row[1][0] == maxCount
                  selected = range
                end
              end
            end
          end
          if selected == []
            sorted.each do |row|
              if flag == 1
                if row[1][0] >= n
                  selected = range
                end
              else
                if row[1][0] == maxCount
                  selected = range
                end
              end
            end
          end
          tempSpecific.each do |row|
            if row[clIndex] == selected
              specific.push(row)
            end
          end
        else
          specific = []
          selected = []
        end
        if specific.length > 0
          out[caseId] = specific
          available[caseId] = 1
          rangeUsed[caseId] = selected
        else
          out[caseId] = []
          available[caseId] = 0
          rangeUsed[caseId] = []
        end
        outAllCls[caseId] = specificAllCls
      end
    end
    return out, available, rangeUsed, outAllCls
    rescue Exception=>ex
      puts ex.message
      end
  end


  def compare_old(dataSpecific, dataOverall, preferences, n, mode, id)
    #Inputs - dataSpecific and dataOverall (Data from CompIndFn sheets of clSpecific and overallScores files filtered by user CL(/CL range if CL not avaialble) and industry(s)
    #(cont.) and/or function(s) based on selction) if companies are to be compared. Use Industry sheet to filter if industries are to be compared. Use Function sheet of functions are to be compared.
    #dataSpecific (company) - [0Company,1Industry,2Function,3CL,4next level reachability,5max level reachability,6Next level median salary,7Current level median salary]
    #dataOverall (company)- [0Comp,1Ind,2Fn,3Max Level,4Median Sal at max level,5Average % people jumping from one level to next,6Average salary increase from one level to the next]
    #dataSpecific (industry) - [0Industry,1CL,2next level reachability,3max level reachability,4Next level median salary,5Current level median salary]
    #dataOverall (industry)- [0Ind,1Max Level,2Median Sal at max level,3Average % people jumping from one level to next,4Average salary increase from one level to the next]
    #dataSpecific (function) - [0Function,1CL,2next level reachability,3max level reachability,4Next level median salary,5Current level median salary]
    #dataOverall (function)- [0Fn,1Max Level,2Median Sal at max level,3Average % people jumping from one level to next,4Average salary increase from one level to the next]
    #preferences - weights of user's preferences [w1,w2,w3,w4,w5,w6,w7] -
    #order of weights-[0Immediate Salary improvement,1Short term CL growth,2Short term salary growth,3average salary growth,4 average CL growth,5 Long term CL growth,6Long term salary growth]
    #n - number of companies/industries/functions to be shown
    #mode - company/industry/function
    #Output - top n companies as well as their scores (total and individual)
    #(cont.) topCompanies ({company name: total score}), allOverall ({company name: [s1,s2,s3,s4]}) - "overall" scores, allSpecific ({company name: [s1,s2,s3,s4]}) - "specific" scores
    overallWeights = [preferences[3], preferences[4], preferences[5] / 2.0, preferences[6]]
    specificWeights = [preferences[0], preferences[1], preferences[2], preferences[5] / 2.0]
    doOverall = 0
    doSpecific = 0
    overallScores = []
    overallMax = [0, 0, 0, 0]
    specificScores = []
    specificMax = [0, 0, 0, 0]
    allScores = {}
    allOverall = {}
    allSpecific = {}
    if preferences[5] > 0 || preferences[6] > 0
      showGrowthGraph = true
    else
      showGrowthGraph = false
    end
    growthPotential = {"names" => [], "maxCL" => [], "salaries" => []}
    topN = []
    #check if preferences include overall scores and specific scores
    (0..3).each do |i|
      if overallWeights[i] > 0
        doOverall = 1
      end
      if specificWeights[i] > 0
        doSpecific = 1
      end
    end
    if mode == "Company"
      overallMap = [6, 5, 3, 4]
      specificMap = [7, 4, 6, 5]
    elsif mode == "Function" || mode == "Industry"
      overallMap = [4, 3, 1, 2]
      specificMap = [5, 2, 4, 3]
    else
      overallMap = [5, 4, 2, 3]
      specificMap = [6, 3, 5, 4]
    end
    #get overall scores
    if doOverall == 1
      dataOverall.each do |row|
        entry = []
        if mode != "Function(Ind)" && mode != "Company"
          entry.push(row[0])
        elsif mode == "Company"
          combined = []
          (0..2).each do |i|
            combined.push(row[i])
          end
          entry.push(combined)
        else
          entry.push(row[1])
        end
        (0..3).each do |i|
          if overallWeights[i] > 0 || i == 3
            score = row[overallMap[i]]
            entry.push(score)
            if overallMax[i] < score
              overallMax[i] = score
            end
          else
            entry.push(0)
          end
        end
        overallScores.push(entry)
      end
    end
    #divide by max and sum and add to allScores
    overallScores.each do |row|
      sumScore = 0
      individualScores = []
      (1..4).each do |i|
        if row[i] > 0
          sumScore += row[i] * overallWeights[i - 1] / overallMax[i - 1]
          individualScores.push(row[i] / overallMax[i - 1])
        else
          individualScores.push(0.0)
        end
      end
      allScores[row[0]] = sumScore
      allOverall[row[0]] = individualScores
    end
    #get specific scores
    if doSpecific == 1
      dataSpecific.each do |row|
        entry = []
        if mode != "Function(Ind)" && mode != "Company"
          entry.push(row[0])
        elsif mode == "Company"
          combined = []
          (0..2).each do |i|
            combined.push(row[i])
          end
          entry.push(combined)
        else
          entry.push(row[1])
        end
        (0..3).each do |i|
          if specificWeights[i] > 0
            score = row[specificMap[i]]
            entry.push(score)
            if specificMax[i] < score
              specificMax[i] = score
            end
          else
            entry.push(0)
          end
        end
        specificScores.push(entry)
      end
    end
    #divide by max, sum and add to allScores
    specificScores.each do |row|
      sumScore = 0
      individualScores = []
      (1..4).each do |i|
        if row[i] > 0
          sumScore += row[i] * specificWeights[i - 1] / specificMax[i - 1]
          individualScores.push(row[i] / specificMax[i - 1])
        else
          individualScores.push(0.0)
        end
      end
      if allScores.key?(row[0])
        allScores[row[0]] += sumScore
      else
        allScores[row[0]] = sumScore
      end
      allSpecific[row[0]] = individualScores
    end
    #sort by total score and return top n
    if allScores != {}
      sorted = allScores.sort_by {|company, scores| scores}.reverse
      if id != 2 && id != 4 && id != 5
        if sorted.length >= n
          topN = sorted[0..n - 1]
        else
          topN = sorted
        end
      else
        compFns = []
        sorted.each do |row|
          compFn = [row[0][0], row[0][2]]
          if !compFns.include?(compFn)
            compFns.push(compFn)
            topN.push(row)
            if topN.length == n
              break
            end
          end
        end
      end
    end
    if showGrowthGraph == true
      topN.each do |entity|
        growthPotential["names"].push(entity[0])
        overallEntry = allOverall[entity[0]]
        growthPotential["maxCL"].push((overallEntry[-2] * overallMax[-2]).round(0))
        growthPotential["salaries"].push((overallEntry[-1] * overallMax[-1]).round(0))
      end
    end
    return topN, allSpecific, allOverall, growthPotential
  end

  def compare(dataSpecific, dataOverall, preferences, n, mode, id)
    #Inputs - dataSpecific and dataOverall (Data from CompIndFn sheets of clSpecific and overallScores files filtered by user CL(/CL range if CL not avaialble) and industry(s)
    #(cont.) and/or function(s) based on selction) if companies are to be compared. Use Industry sheet to filter if industries are to be compared. Use Function sheet of functions are to be compared.
    #dataSpecific (company) - [0Company,1Industry,2Function,3CL,4next level reachability,5max level reachability,6Next level median salary,7Current level median salary]
    #dataOverall (company)- [0Comp,1Ind,2Fn,3Max Level,4Median Sal at max level,5Average % people jumping from one level to next,6Average salary increase from one level to the next]
    #dataSpecific (industry) - [0Industry,1CL,2next level reachability,3max level reachability,4Next level median salary,5Current level median salary]
    #dataOverall (industry)- [0Ind,1Max Level,2Median Sal at max level,3Average % people jumping from one level to next,4Average salary increase from one level to the next]
    #dataSpecific (function) - [0Function,1CL,2next level reachability,3max level reachability,4Next level median salary,5Current level median salary]
    #dataOverall (function)- [0Fn,1Max Level,2Median Sal at max level,3Average % people jumping from one level to next,4Average salary increase from one level to the next]
    #preferences - weights of user's preferences [w1,w2,w3,w4,w5,w6,w7] -
    #order of weights-[0Immediate Salary improvement,1Short term CL growth,2Short term salary growth,3average salary growth,4 average CL growth,5 Long term CL growth,6Long term salary growth]
    #n - number of companies/industries/functions to be shown
    #mode - company/industry/function
    #Output - top n companies as well as their scores (total and individual)
    #(cont.) topCompanies ({company name: total score}), allOverall ({company name: [s1,s2,s3,s4]}) - "overall" scores, allSpecific ({company name: [s1,s2,s3,s4]}) - "specific" scores
    overallWeights = [preferences[3], preferences[4], preferences[5] / 2.0, preferences[6]]
    specificWeights = [preferences[0], preferences[1], preferences[2], preferences[5] / 2.0]
    doOverall = 0
    doSpecific = 0
    overallScores = []
    overallMax = [0, 0, 0, 0]
    specificScores = []
    specificMax = [0, 0, 0, 0]
    allScores = {}
    allOverall = {}
    allSpecific = {}
    if preferences[5] > 0 || preferences[6] > 0
      showGrowthGraph = true
    else
      showGrowthGraph = false
    end
    growthPotential = {"names" => [], "maxCL" => [], "salaries" => []}
    topN = []
    #check if preferences include overall scores and specific scores
    (0..3).each do |i|
      if overallWeights[i] > 0
        doOverall = 1
      end
      if specificWeights[i] > 0
        doSpecific = 1
      end
    end
    if mode == "Company"
      overallMap = [6, 5, 3, 4]
      specificMap = [7, 4, 6, 5]
    elsif mode == "Function" || mode == "Industry"
      overallMap = [4, 3, 1, 2]
      specificMap = [5, 2, 4, 3]
    else
      overallMap = [5, 4, 2, 3]
      specificMap = [6, 3, 5, 4]
    end
    #get overall scores
    if doOverall == 1
      dataOverall.each do |row|
        entry = []
        if mode != "Function(Ind)" && mode != "Company"
          entry.push(row[0])
        elsif mode == "Company"
          combined = []
          (0..2).each do |i|
            combined.push(row[i])
          end
          entry.push(combined)
        else
          entry.push(row[1])
        end
        (0..3).each do |i|
          if overallWeights[i] > 0 || i == 3 || i == 2
            score = row[overallMap[i]]
            entry.push(score)
            if overallMax[i] < score
              overallMax[i] = score
            end
          else
            entry.push(0)
          end
        end
        overallScores.push(entry)
      end
    end
    #divide by max and sum and add to allScores
    overallScores.each do |row|
      sumScore = 0
      individualScores = []
      (1..4).each do |i|
        if row[i] > 0
          sumScore += row[i] * overallWeights[i - 1] / overallMax[i - 1]
          individualScores.push(row[i] / overallMax[i - 1])
        else
          individualScores.push(0.0)
        end
      end
      allScores[row[0]] = sumScore
      allOverall[row[0]] = individualScores
    end
    #get specific scores
    if doSpecific == 1
      dataSpecific.each do |row|
        entry = []
        if mode != "Function(Ind)" && mode != "Company"
          entry.push(row[0])
        elsif mode == "Company"
          combined = []
          (0..2).each do |i|
            combined.push(row[i])
          end
          entry.push(combined)
        else
          entry.push(row[1])
        end
        (0..3).each do |i|
          if specificWeights[i] > 0
            score = row[specificMap[i]]
            entry.push(score)
            if specificMax[i] < score
              specificMax[i] = score
            end
          else
            entry.push(0)
          end
        end
        specificScores.push(entry)
      end
    end
    #divide by max, sum and add to allScores
    specificScores.each do |row|
      sumScore = 0
      individualScores = []
      (1..4).each do |i|
        if row[i] > 0
          sumScore += row[i] * specificWeights[i - 1] / specificMax[i - 1]
          individualScores.push(row[i] / specificMax[i - 1])
        else
          individualScores.push(0.0)
        end
      end
      if allScores.key?(row[0])
        allScores[row[0]] += sumScore
      else
        allScores[row[0]] = sumScore
      end
      allSpecific[row[0]] = individualScores
    end
    #sort by total score and return top n
    if allScores != {}
      newScores = {}
      allScores.each do |entity, score|
        if score > 0
          newScores[entity] = score
        end
      end
      sorted = newScores.sort_by {|company, scores| scores}.reverse
      if sorted.length >= 3
        if id != 2 && id != 4 && id != 5
          if sorted.length >= n
            topN = sorted[0..n - 1]
          else
            topN = sorted
          end
        else
          compFns = []
          sorted.each do |row|
            compFn = [row[0][0], row[0][2]]
            if !compFns.include?(compFn)
              compFns.push(compFn)
              topN.push(row)
              if topN.length == n
                break
              end
            end
          end
        end
      end
    end
    if topN.length < 3
      topN = []
    end
    if showGrowthGraph == true
      topN.each do |entity|
        growthPotential["names"].push(entity[0])
        overallEntry = allOverall[entity[0]]
        growthPotential["maxCL"].push((overallEntry[-2] * overallMax[-2]).round(0))
        growthPotential["salaries"].push((overallEntry[-1] * overallMax[-1]).round(0))
      end
    end
    return topN, allSpecific, allOverall, growthPotential
  end


  def ppx(userCompany, userIndustry, userFunction, userCL, dataAvailable, mode, id, user)
    #Used for looking up the y-axis values in promotion pressures graph
    #Inputs - user's company, industry, function, CL, and dataAvailable is "userAvailable" obtained from whileQuestionnaire function above
    #Outputs - xOut = [caseName,graphType,xVals,maxLevelFlag,nextLevelFlag]; caseName is the highest filter at which data is avaialble for making the
    #promotion pressures graph (so it will be "Company" if data is available for user's company, industry and function), graphType is "g1" is y axis has
    #cl values and "g2" is y axis has cl ranges, xVals is an array with the y-axis values so for g1 type it will be something like [12,13,14,15] and for
    #g2 type it will be [[12,13],[14,15],[16,17]],maxLevelFlag is 1 if data is there for a higher level than user CL and 0 otherwise, nextLevelFlag is 1 if
    #data is available for user CL + 1
    #promotion pressures
    #x-axis paths
    path1 = $filePath + "ppCompIndFn.txt"
    path2 = $filePath + "ppFn.txt"
    path3 = $filePath + "ppInd.txt"
    cases = {"Company" => [[0, 1, 2, 3], [userCompany, userIndustry, userFunction, userCL]], "Industry" => [[0, 1], [userIndustry, userCL]], "Function" => [[0, 1], [userFunction, userCL]]}
    casePaths = {"Company" => path1, "Industry" => path3, "Function" => path2}
    strings = {path1 => [0, 1, 2, 4], path2 => [0, 2], path3 => [0, 2]}
    path = casePaths[mode]
    xVals = []
    if true
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      caseFilter = cases[mode]
      checkUser = 0
      graphType = ""
      maxLevelFlag = 0
      nextLevelFlag = 0
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[path].include?(i)
            entry.push(rowList[i].strip)
            if i == strings[path].max
              graphType = entry[-1]
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
        if (id == 2 || id == 4) && user == 1
          if entry[0] != userCompany || entry[2] != userFunction || entry[3] != userCL
            checkUser = 0
          end
        else
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              checkUser = 0
              break
            end
          end
        end
        if checkUser == 1
          maxLevelFlag = entry[-1]
          nextLevelFlag = entry[-2]
          xVals = entry[-3]
          break
        end
      end
    end
    return xVals
  end

  def clickEntity(entityName, allSpecific, allOverall, userEntity, preferences, id)
    # overallWeights = [preferences[3],preferences[4],preferences[5],preferences[6]]
    # specificWeights = [preferences[0],preferences[1],preferences[2],preferences[5]]
    #order of weights-[0Immediate Salary improvement,1Short term CL growth,2Short term salary growth,3average salary growth,4 average CL growth,5 Long term CL growth,6Long term salary growth]
    specificScores = allSpecific[entityName]
    overallScores = allOverall[entityName]
    userSpecific = nil
    userOverall = nil
    if id == 2 || id == 4
      allSpecific.each do |entity, values|
        if entity[0] == userEntity[0] && entity[2] == userEntity[2]
          userSpecific = values
        end
      end
      allOverall.each do |entity, values|
        if entity[0] == userEntity[0] && entity[2] == userEntity[2]
          userOverall = values
        end
      end
    elsif id == 3 || id == 5
      allSpecific.each do |entity, values|
        if entity[0] == userEntity[0] && entity[1] == userEntity[1]
          userSpecific = values
        end
      end
      allOverall.each do |entity, values|
        if entity[0] == userEntity[0] && entity[1] == userEntity[1]
          userOverall = values
        end
      end
    else
      userSpecific = allSpecific[userEntity]
      userOverall = allOverall[userEntity]
    end

    wtMap = [[1, 0], [1, 1], [1, 2], [0, 0], [0, 1], [2, 2, 3], [0, 3]]
    outScores = {}
    userScores = {}
    preferenceNames = {0 => "Immediate Salary Improvement",
                       1 => "Short Term Career Level Growth",
                       2 => "Short Term Salary Growth",
                       3 => "Average Salary Growth",
                       4 => "Average Career Level Growth",
                       5 => "Long Term Career Level Growth",
                       6 => "Long Term Salary Growth"}
    (0..6).each do |i|
      if preferences[i] == 0
        next
      end
      map = wtMap[i]
      pName = preferenceNames[i]
      if map[0] == 0
        if overallScores != nil
          outScores[pName] = overallScores[map[1]]
        else
          outScores[pName] = nil
        end
        if userOverall != nil
          userScores[pName] = userOverall[map[1]]
        else
          userScores[pName] = nil
        end
      elsif map[0] == 1
        if specificScores != nil
          outScores[pName] = specificScores[map[1]]
        else
          outScores[pName] = nil
        end
        if userSpecific != nil
          userScores[pName] = userSpecific[map[1]]
        else
          userScores[pName] = nil
        end
      else
        if overallScores != nil && specificScores != nil
          outScores[pName] = (overallScores[map[1]] + specificScores[map[2]]) / 2
        elsif overallScores != nil && specificScores == nil
          outScores[pName] = overallScores[map[1]] / 2
        elsif overallScores == nil && specificScores != nil
          outScores[pName] = specificScores[map[2]] / 2
        else
          outScores[pName] = nil
        end
        if userOverall != nil && userSpecific != nil
          userScores[pName] = (userOverall[map[1]] + userSpecific[map[2]]) / 2
        elsif userOverall != nil && userSpecific == nil
          userScores[pName] = userOverall[map[1]] / 2
        elsif userOverall == nil && userSpecific != nil
          userScores[pName] = userSpecific[map[1]] / 2
        else
          userScores[pName] = nil
        end
      end
    end
    return outScores, userScores
  end

  def ppy(userCompany, userIndustry, userFunction, userRange, xVals, mode, id, user)
    #Used for getting the x-axis (count) values of the promotion pressures graph once we have the y-axis (CL) values; This also returns the values of the
    #first graph in the report that has % people above, at , below your CL
    #Inputs - user's CL, company, industry and function, highestFilter (got from caseName returned in the ppx function), xVals (these are the y axis values on the
    #PP grpah got from the ppx funtion above) and userRange(this is 1 if xVals has ranges of cl and 0 if it has actual cl values)
    #Outputs - out,ppY:
    #out - has values for graph 1 of report {"Company"=>[%people below userCL, %people at userCL, %people above userCL], etc}
    #ppY - has the count of entries for all values/ranges in xVals (so for xVals = [12,13,14,15] - {"Company"=>[count at 12,count at 13, count at 14, count at 15], etc.}
    #your CL percentile
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]]}
    pathNames = {"Company" => "CompIndFn.txt", "Function" => "Fn.txt", "Industry" => "Ind.txt"}
    strings = {"Company" => [0, 1, 2], "Function" => [0], "Industry" => [0]}
    caseCount = {}
    started = 0
    if true
      path = $filePath + "graph1" + pathNames[mode]
      file = open(path, 'r')
      text = file.read
      file.close
      rows = text.split("\n")
      rows.each do |row|
        rowList = row.split(";")
        entry = []
        (0..rowList.length - 1).each do |i|
          if strings[mode].include?(i)
            entry.push(rowList[i].strip)
          else
            entry.push(rowList[i].to_f)
          end
        end
        caseFilter = cases[mode]
        flag = 1
        if (id == 2 || id == 4) && user == 1
          if entry[0] != userCompany || entry[2] != userFunction
            flag = 0
          end
        else
          (0..caseFilter[0].length - 1).each do |i|
            if caseFilter[1][i] != entry[caseFilter[0][i]]
              flag = 0
              break
            end
          end
        end
        if flag == 1
          if userRange == false
            if xVals.include?(entry[strings[mode].max + 1])
              caseCount[entry[strings[mode].max + 1]] = entry[-1]
            end
          else
            xVals.each do |clRange|
              if clRange.include?(entry[strings[mode].max + 1])
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
    end
    return caseCount
  end

  def rpGraph(userCompany, userIndustry, userFunction, userRange, xVals, mode, specificAllCls, id, user)
    cases = {"Company" => [[0, 1, 2], [userCompany, userIndustry, userFunction]], "Industry" => [[0], [userIndustry]], "Function" => [[0], [userFunction]]}
    strings = {"Company" => [0, 1, 2], "Function" => [0], "Industry" => [0]}
    caseFilter = cases[mode]
    caseMeds = {}
    specificAllCls.each do |entry|
      medFlag = 1
      if (id == 2 || id == 4) && user == 1
        if entry[0] != userCompany || entry[2] != userFunction
          medFlag = 0
        end
      else
        (0..caseFilter[0].length - 1).each do |i|
          if caseFilter[1][i] != entry[caseFilter[0][i]]
            medFlag = 0
            break
          end
        end
      end
      if medFlag == 1
        if userRange == false
          if xVals.include?(entry[strings[mode].max + 1])
            caseMeds[entry[strings[mode].max + 1]] = entry[-1]
          end
        else
          xVals.each do |clrange|
            if clrange == entry[strings[mode].max + 1]
              caseMeds[clrange] = entry[-1]
            end
          end
        end
      end
    end
    return caseMeds
  end


  def merge(xOut1, xOut2)
    xOut1 = xOut1.sort
    xOut2 = xOut2.sort
    if xOut1[0].kind_of?(Array) == true
      if xOut2[0].kind_of?(Array) == true
        xOut = xOut1
        toAdd = []
        min = xOut[0][0]
        max = xOut[-1][-1]
        len = xOut[0].length
        mods = []
        checkVal = min
        (0..len - 1).each do |i|
          mods.push(checkVal % len)
          checkVal += 1
        end
        xOut2.each do |vals|
          vals.each do |val1|
            ind = mods.find_index(val1 % len)
            toAdd = []
            (0..len - 1).each do |i|
              if i == ind
                toAdd.push(val1)
              elsif i > ind
                toAdd.push(val1 + i - ind)
              else
                toAdd.push(val1 - ind + i)
              end
            end
            if !xOut.include?(toAdd)
              xOut.push(toAdd)
            end
          end
        end
      else
        xOut = xOut1
        toAdd = []
        min = xOut[0][0]
        max = xOut[-1][-1]
        len = xOut[0].length
        mods = []
        checkVal = min
        (0..len - 1).each do |i|
          mods.push(checkVal % len)
          checkVal += 1
        end
        xOut2.each do |val1|
          ind = mods.find_index(val1 % len)
          toAdd = []
          (0..len - 1).each do |i|
            if i == ind
              toAdd.push(val1)
            elsif i > ind
              toAdd.push(val1 + i - ind)
            else
              toAdd.push(val1 - ind + i)
            end
          end
          if !xOut.include?(toAdd)
            xOut.push(toAdd)
          end
        end
      end
    else
      if xOut2[0].kind_of?(Array) == true
        xOut = xOut2
        toAdd = []
        min = xOut[0][0]
        max = xOut[-1][-1]
        len = xOut[0].length
        mods = []
        checkVal = min
        (0..len - 1).each do |i|
          mods.push(checkVal % len)
          checkVal += 1
        end
        xOut1.each do |val1|
          ind = mods.find_index(val1 % len)
          toAdd = []
          (0..len - 1).each do |i|
            if i == ind
              toAdd.push(val1)
            elsif i > ind
              toAdd.push(val1 + i - ind)
            else
              toAdd.push(val1 - ind + i)
            end
          end
          if !xOut.include?(toAdd)
            xOut.push(toAdd)
          end
        end
      else
        xOut = xOut1
        xOut2.each do |val|
          if !xOut.include?(val)
            xOut.push(val)
          end
        end
      end
    end
    xOut = xOut.sort
    return xOut
  end
#testing----------------------------------------------------------------------------
#testing----------------------------------------------------------------------------

end
