class QustionerController < ApplicationController

  def getAllQuestions
    @allQues=Array.new
    @allQues=Question.getques()
    @allRoleEffects=Array.new
     # for @que in 0..@allQues.length-1
     #   if @allQues[@que]["queNo"]>16
     #     @allRoleEffects=@allRoleEffects+@allQues[@que]["roleEffects"]
     #   end
     # end
     #
     # @getInterSection=User.getMatchData(params[:Company].to_s.upcase,params[:Industry],params[:Role].to_s.upcase)

     render :json => {"status"=>200,:msg=>"Get data",:allQues=>@allQues,allRoleEffects:@allRoleEffects.uniq!,intersection:[]}

  end
  def getIndustryWiseAvgSalary
 if params[:Name]=="Industry"
    # @salary=User.getAvgSalaryIndustryFunction("Information Technology and Services","CUSTOMER CARE - CALL CENTRE")
     @salary=User.getLevelAvgSalary(params[:industry])
   # @salary=User.getRoleAvgScore("CUSTOMER CARE - CALL CENTRE")
     @xAxis=Array.new
     @yAxis=Array.new
     @step=0
     if @salary.length>9
      @step=1
     elsif @salary.length>19
       @step=2
     elsif @salary.length>29
       @step=3
     elsif @salary.length>39
       @step=4

     end
     if @step>0
       (0..@salary.length - 1).step(@step+1).each do |sal|
       @salry=0
       @count=0
       for @s in 0..@step
         if (sal+@s)<=(@salary.length - 1)
         @salry=@salry+@salary[sal+@s]["avgSalary"]
           @count=@count+@salary[sal+@s]["count"]
       end
       end
       if (sal+@s)<=(@salary.length - 1)
       @xAxis.push @salary[sal]["_id"]["level"].to_s+"-"+@salary[sal+@step]["_id"]["level"].to_s
       else
         @xAxis.push @salary[sal]["_id"]["level"].to_s
       end

       @yAxis.push @salry/@count
     end
     else
       for @sal in 0..@salary.length-1
         @xAxis.push @salary[@sal]["_id"]["level"]
         @yAxis.push @salary[@sal]["avgSalary"]/@salary[@sal]["count"]
       end
     end
     render :json=>{status:200,yaxis:@yAxis,xAxis:@xAxis}
 elsif params[:Name]=="Role"
   @salary=User.getRoleAvgScore(params[:industry].to_s.upcase)
   @score=User.getAllRoleAvgScore(params[:industry].to_s.upcase)
   @xAxis=Array.new
   @yAxis=Array.new
   @xAxis1=Array.new
   @yAxis1=Array.new
   for @sal in 0..@salary.length-1
     @xAxis.push @salary[@sal]["_id"]["level"]
     @yAxis.push @salary[@sal]["avgScore"]
   end
   for @sal in 0..@score.length-1
     @xAxis1.push @score[@sal]["_id"]["level"]
     @yAxis1.push @score[@sal]["avgScoreAll"]
   end
   render :json=>{status:200,yaxis:@yAxis,xAxis:@xAxis,yaxis1:@yAxis1,xAxis1:@xAxis1}
 elsif params[:Name]=="Both"

   @salary=User.getAvgSalaryIndustryFunction(params[:industry], params[:role].to_s.upcase)
   @xAxis=Array.new
   @yAxis=Array.new
   for @sal in 0..@salary.length-1
     @xAxis.push @salary[@sal]["_id"]["level"]
     @yAxis.push @salary[@sal]["avgSalary"]
   end
   @xAxis=Array.new
   @yAxis=Array.new
   @step=0
   if @salary.length>9
     @step=1
   elsif @salary.length>19
     @step=2
   elsif @salary.length>29
     @step=3
   elsif @salary.length>39
     @step=4

   end
   if @step>0
     (0..@salary.length - 1).step(@step+1).each do |sal|
       @salry=0
       @count=0
       for @s in 0..@step
         if (sal+@s)<=(@salary.length - 1)
           @salry=@salry+@salary[sal+@s]["avgSalary"]
           @count=@count+@salary[sal+@s]["count"]
         end
       end
       if (sal+@s)<=(@salary.length - 1)
         @xAxis.push @salary[sal]["_id"]["level"].to_s+"-"+@salary[sal+@step]["_id"]["level"].to_s
       else
         @xAxis.push @salary[sal]["_id"]["level"].to_s
       end

       @yAxis.push @salry/@count
     end
   else
     for @sal in 0..@salary.length-1
       @xAxis.push @salary[@sal]["_id"]["level"]
       @yAxis.push @salary[@sal]["avgSalary"]
     end
   end
   render :json=>{status:200,yaxis:@yAxis,xAxis:@xAxis}


  elsif params[:Name]=="FunVsInds"
   # @salary=User.functionVsIndustries(params[:industry], params[:role].to_s.upcase)
   @salary=User.functionVsIndustries(["Information Technology and Services","Computer Software"], "CUSTOMER CARE - CALL CENTRE")
   @data=[]
   @newSortArray=Array.new

   for @ind in 0..@salary.length-1
      (0..@salary[@ind].length - 1).step(1).each do |sal|
        @newSortArray.push @salary[@ind][sal]["_id"]["level"].to_s
     end

   end
   @newSortArray.uniq
   @nextStep=0
   if @newSortArray.length>9
     @nextStep=1
   elsif @newSortArray.length>19
     @nextStep=2
   elsif @newSortArray.length>29
     @nextStep=3
   elsif @newSortArray.length>39
     @nextStep=4
   end
   if @nextStep>@step
     @step=@nextStep
   end
  for @ind in 0..@salary.length-1
    @tmp=Hash.new
    if @step>0
      @xAxis=Array.new
      @yAxis=Array.new
      (0..@salary[@ind].length - 1).step(@step+1).each do |sal|

        @salry=[]
        @count=0
        for @s in 0..@step
          if (sal+@s)<=(@salary[@ind].length - 1)
            @salry=@salry+@salary[@ind][sal+@s]["salary"]
            @count=@count+@salary[@ind][sal+@s].length
          end
        end
        if (sal+@s)<=(@salary[@ind].length - 1)
          @xAxis.push @salary[@ind][sal]["_id"]["level"].to_s+"-"+@salary[@ind][sal+@step]["_id"]["level"].to_s
        else
          @xAxis.push @salary[@ind][sal]["_id"]["level"].to_s
        end
        @sortArray=@salry.sort()
        @medianIndex=(@salry.length+1)/2
        @yAxis.push @salry.sort()[(@salry.length+1)/2]
      end
      @temp={xAxis:@xAxis,yAxis:@yAxis}
      @data.push @temp
    else
      @xAxis=Array.new
      @yAxis=Array.new
      for @sal in 0..@salary[@ind].length-1
        @xAxis.push @salary[@ind][@sal]["_id"]["level"]
        @medianIndex=(@salary[@ind][@sal]["salary"].length+1)/2
        @sortArray=@salary[@ind][@sal]["salary"].to_a.sort()
        @yAxis.push @sortArray[@medianIndex]
      end
      @temp={xAxis:@xAxis,yAxis:@yAxis}
      @data.push @temp
    end
  end
   render :json=>{status:200,chartdata:@data}
 end

  end
  def getAllIndustries
    @allIndustry=User.distinct("Industry").to_a.sort()
    @tmp=User.distinct("Role").to_a.sort()
    @allRole=[]
    for @role in 0..@tmp.length-1
      @allRole.push @tmp[@role].to_s.downcase.titleize
    end
    # Compansation Graph #
    @role=""
    @industry=""
    if params.has_key?("Role")
      @role=params[:Role].to_s.upcase
    end
    if params.has_key?("Industry")
      @industry=params[:Industry]
    end
    @result=Hash.new
    @result=CalculateCL(@role,@industry,params[:Level].to_i)
    # @xAxis8=Array.new
    # @xAxis50=Array.new
    # @xAxis9=Array.new
    # @xAxis=Array.new
    # if params.has_key?("Level")
    #   @score=params[:Level].to_i
    # else
    #   @score=0
    #
    # end
    # @mylevel=params[:Level].to_i
    # @allLevels1=Level.all.to_a
    # @allLevels=Array.new
    # for @l in 0..@allLevels1.length-1
    #   @allLevels.push @allLevels1[@l]["level"]
    # end
    # @minLevel=@allLevels.min()
    # @allScore=Array.new
    # @index= @allLevels.find_index(@mylevel)
    # @startIndex=0;
    # @endIndex=@allLevels.length
    # @yaxis=Array.new
    # if @index>=2
    #   @startIndex=@index-2
    # end
    # if @index+2<=@allLevels.length
    #   @endIndex=@index+2
    # end
    # @maxofSalary=0
    # if @role=="" && @industry!=""
    #   @allArraye=User.getCompensationWithIndustry(@allLevels[@startIndex-1],@allLevels[@endIndex+1],@industry)
    # elsif @industry==""&&@role!=""
    #   @allArraye=User.getCompensationWithRole(@allLevels[@startIndex-1],@allLevels[@endIndex+1],@role)
    # elsif @industry!="" && @role!=""
    #   @allArraye=User.getCompensationWithRoleAndIndustry(@allLevels[@startIndex-1],@allLevels[@endIndex+1],@industry,@role)
    # else
    #   @allArraye=User.getPer(@allLevels[@startIndex-1],@allLevels[@endIndex+1])
    # end
    # ####Sync Arrays#####
    # if @allArraye.length<5
    #   @allArraye=User.getPer(@allLevels[@startIndex-1],@allLevels[@endIndex+1])
    # end
    # ####################
    # for @all in 0..@allArraye.length-1
    #
    #   @xAxis.push @allArraye[@all][:_id][:level]
    #   if @allArraye[@all][:salary].length>0
    #     @per8= @allArraye[@all][:salary].sort[(0.33 * @allArraye[@all][:salary].length).ceil - 1]
    #     @per9= @allArraye[@all][:salary].sort[(0.9 * @allArraye[@all][:salary].length).ceil - 1]
    #     @per50= @allArraye[@all][:salary].sort[(0.5 * @allArraye[@all][:salary].length).ceil - 1]
    #     @xAxis8.push @per8.to_i
    #     @xAxis50.push @per50.to_i
    #     @xAxis9.push @per9.to_i
    #     if @maxofSalary<@xAxis8.max
    #       @maxofSalary=@allArraye[@all][:salary].max
    #     end
    #     if @maxofSalary<@xAxis9.max
    #       @maxofSalary=@allArraye[@all][:salary].max
    #     end
    #     if @maxofSalary<@xAxis50.max
    #       @maxofSalary=@allArraye[@all][:salary].max
    #     end
    #   else
    #     @xAxis8.push 0
    #     @xAxis9.push 0
    #     @xAxis50.push 0
    #   end
    #   @per8=0
    #   @per9=0
    #   @per50=0
    #   @isFound=true
    # end
    # for @i in @startIndex..@index-1
    #   @yaxis.push 0
    # end
    # @yaxis.push @maxofSalary
    # for @i in @index..@endIndex-1
    #   @yaxis.push 0
    # end
    render :json=>{status:200,allIndustry:@allIndustry,allRole:@allRole,yaxis:@result["yaxis"],xAxis:@result["xAxis"],xAxis8:@result["xAxis8"],xAxis9:@result["xAxis9"],xAxis50:@result["xAxis50"], index:@result["index"],mylevel:@result["mylevel"],title:@result["title"]}
  end
  def report
    @role=""
    @industry=""
    if params.has_key?("Role")
      @role=params[:Role].to_s.upcase
    end
    if params.has_key?("Industry")
      @industry=params[:Industry]
    end
    @result=Hash.new
    @result=CalculateCL(@role,@industry,params[:Level].to_i)
    render :json=>{status:200,yaxis:@result["yaxis"],xAxis:@result["xAxis"],xAxis8:@result["xAxis8"],xAxis9:@result["xAxis9"],xAxis50:@result["xAxis50"], index:@result["index"],mylevel:@result["mylevel"],title:@result["title"]}
  end
  def getGrowthChart
     @role=""
     @title=""
     @industries=Array.new
    if params.has_key?("Role")
      @role=params[:Role].to_s.upcase
    end

    if params.has_key?("Industry")
      @industries=params[:Industry].to_s.split(',')
    end
  @xAxis=Array.new
  @yAxis=Array.new
  @yAxis1=Array.new
    if @role.length==0 && @industries.length>0
      @title="Growth Potential For Across function";
      @getDataFromDB=User.getGrowthChartWithIndustry(@industries,6)
      for @g in 0..@getDataFromDB.length-1
         for @ind in 0..@getDataFromDB[@g].length-1
          @xAxis.push @getDataFromDB[@g][@ind]["_id"]["role"]
          @yAxis.push @getDataFromDB[@g][@ind]["max"]
          @sortValue=@getDataFromDB[@g][@ind]["salary"].sort()
          if @sortValue.length>1
            @medianVal=0
            if @sortValue.length%2==0
              @midPoint= ((@sortValue.length-1)/2).to_i
              @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
            else
              @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
            end
            @yAxis1.push @medianVal
          else
            @yAxis1.push @sortValue[0]
          end
          # @yAxis1.push @getDataFromDB[@g][@ind]["salary"].sort()[((@getDataFromDB[@g][@ind]["salary"].length-1)/2).to_i]
         end
      end
      render json: {status:200,xAxis:@xAxis,yAxis:@yAxis,yAxis1:@yAxis1}
    elsif @industries.length ==0&& @role.length>0
      @title="Growth Potential For "+ @role +" Across industries";
      if params.has_key?("userIndustry")
        @getDataFromDB=User.getGrowthChartWithRole(@role.to_s.upcase,5)
        @xAxis=Array.new
        @yAxis=Array.new
        @yAxis1=Array.new
        for @g in 0..@getDataFromDB.length-1
          @xAxis.push @getDataFromDB[@g]["_id"]["industry"]
          @yAxis.push @getDataFromDB[@g]["max"]
          @sortValue=@getDataFromDB[@g]["salary"].sort()
          if @sortValue.length>1
            @medianVal=0
            if @sortValue.length%2==0
              @midPoint= ((@sortValue.length-1)/2).to_i
              @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
            else
              @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
            end
            @yAxis1.push @medianVal
          else
            @yAxis1.push @sortValue[0]
          end
          # @yAxis1.push @getDataFromDB[@g][@ind]["salary"].sort()[((@getDataFromDB[@g][@ind]["salary"].length-1)/2).to_i]
        end
        @getMaxLevel=User.getMaxLevelPerIndustry(params[:userIndustry],@role)
        if @getMaxLevel.length>0
          @xAxis.push params[:userIndustry]
          @yAxis.push @getMaxLevel[0]["max"]
          @sortValue=@getDataFromDB[@g]["salary"].sort()
          if @sortValue.length>1
            @medianVal=0
            if @sortValue.length%2==0
              @midPoint= ((@sortValue.length-1)/2).to_i
              @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
            else
              @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
            end
            @yAxis1.push @medianVal
          else
            @yAxis1.push @sortValue[0]
          end
        end
        render json: {status:200,xAxis:@xAxis,yAxis:@yAxis,yAxis1:@yAxis1,title:@title}
      else
        @getDataFromDB=User.getGrowthChartWithRole(@role,6)
        for @g in 0..@getDataFromDB.length-1

            @xAxis.push @getDataFromDB[@g]["_id"]["industry"]
            @yAxis.push @getDataFromDB[@g]["max"]
            if @getDataFromDB[@g]["salary"].length>1
              @sortValue=@getDataFromDB[@g]["salary"].sort()
              @medianVal=0
              if @sortValue.length%2==0
                @midPoint= ((@sortValue.length-1)/2).to_i
                @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
              else
                @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
              end
              @yAxis1.push @medianVal
              # @yAxis1.push @getDataFromDB[@g]["salary"].sort()[((@getDataFromDB[@g]["salary"].length-1)/2).to_i]
            else
              @yAxis1.push @getDataFromDB[@g]["salary"].last()
            end


        end
      render json: {status:200,xAxis:@xAxis,yAxis:@yAxis,yAxis1:@yAxis1,title:@title}
      end
    else
      @getDataFromDB=User.getGrowthChartWithRoleAndIndustry(@role,@industries)
      @title="Growth Potential For "+@role+" Across industries";
      for @g in 0..@getDataFromDB.length-1
        for @ind in 0..@getDataFromDB[@g].length-1
          @xAxis.push @getDataFromDB[@g][@ind]["_id"]["industry"]
          @yAxis.push @getDataFromDB[@g][@ind]["max"]
          @sortValue=@getDataFromDB[@g][@ind]["salary"].sort()
          if @sortValue.length>1
            @medianVal=0
            if @sortValue.length%2==0
              @midPoint= ((@sortValue.length-1)/2).to_i
              @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
            else
              @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
            end
            @yAxis1.push @medianVal
          else
            @yAxis1.push @sortValue[0]
          end
        end
      end
      render json: {status:200,xAxis:@xAxis,yAxis:@yAxis,yAxis1:@yAxis1,title:@title}
    end
   end
  def getPromationChart
    @title=""
      @role=params[:Role].to_s.upcase
      @industry=params[:Industry]
      @salary=Array.new
      @sumOFArray=0
      @salary=User.getPromationChart(@role,@industry)
      if @salary.length==0
        @salary=User.getPromationChart_Role(@role)
        if @salary.length==0
          @salary=User.getPromationChart_Industry(@industry)
          @title="Promotion Pressures of "+@industry+" for across functions "
        else
          @title="Promotion Pressures of "+@role+" for across industries "
     end
      else
        @title="Promotion Pressures for "+@industry+" and "+@role+" function"
     end
     @xAxis=Array.new
    @yAxis=Array.new
    @yAxis1=Array.new
    @yAxis2=Array.new
    @step=0
    if @salary.length>9
      @step=1
    elsif @salary.length>19
      @step=2
    elsif @salary.length>29
      @step=3
    elsif @salary.length>39
      @step=4
    end
      @salary= @salary.sort_by { |hash| -hash[:_id][:level] }
      @sumOFArray=  @salary.map{ |hash| hash["count"] }.sum
      puts @sumOFArray
      if @step>0
      (0..@salary.length - 1).step(@step+1).each do |sal|
        @salry=0
        @count=0
        @mergearray=Array.new
        for @s in 0..@step
          if (sal+@s)<=(@salary.length - 1)
            @salry=@salry+@salary[sal+@s]["count"]
            @mergearray=@mergearray+@salary[sal+@s]["salary"]
          end
        end
        if (sal+@s)<=(@salary.length - 1)
          @xAxis.push @salary[sal]["_id"]["level"].to_s+"-"+@salary[sal+@step]["_id"]["level"].to_s
        else
          @xAxis.push @salary[sal]["_id"]["level"].to_s
        end
        @sortValue=@mergearray.sort()
        if @sortValue.length>1
          @medianVal=0
          if @sortValue.length%2==0
            @midPoint= ((@sortValue.length-1)/2).to_i
            @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
          else
            @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
          end
          @yAxis2.push (@medianVal.to_f.round(2))
        else
          @yAxis2.push (@sortValue[0].to_f.round(2))
        end
        @yAxis.push ((@salry.to_f/@sumOFArray.to_f)*100).to_f.round(2)
        @yAxis1.push 0
      end
    else
      for @sal in 0..@salary.length-1
        @xAxis.push @salary[@sal]["_id"]["level"]
        @yAxis.push  ((@salary[@sal]["count"].to_f/@sumOFArray.to_f)*100).to_f.round(2)
        @yAxis1.push 0
        @sortValue=@salary[@sal][:salary].sort()
        if @sortValue.length>1
          @medianVal=0
          if @sortValue.length%2==0
            @midPoint= ((@sortValue.length-1)/2).to_i
            @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
          else
            @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
          end
          @yAxis2.push ({ marker: {
              enabled: true
          },y:@medianVal.to_f.round(2)})
        else
          @yAxis2.push ({ marker: {
              enabled: true
          },y:@sortValue[0].to_f.round(2)})
        end
      end
    end
      (@yAxis.length-1).downto(1) do |x|
        if @yAxis[x]>@yAxis[x-1]
          @diff= (@yAxis[x-1]-@yAxis[x]).abs/@yAxis[x-1]
          if @diff>=0.15
            @yAxis1[x]=@yAxis[x]
          end
        end
      end


      render :json=>{status:200,yAxis:@yAxis,xAxis:@xAxis,yAxis1:@yAxis1,yAxis2:@yAxis2,title:@title}
  end
  def getRoleChart
    @industries=params[:Industry].to_s.split(',')
    @role=params[:Role].to_s.upcase
    #@salary=User.functionVsIndustries(["Information Technology and Services","Computer Software"], "CUSTOMER CARE - CALL CENTRE")
    @salary=User.functionVsIndustries(@industries, @role.to_s.upcase)
    if @salary.length==0
      @salary=User.functionVsIndustries_role(@role)
      if @salary.length==0
        @salary=User.functionVsIndustries_industry(@industries)
        @title="Role Premium of "+@industries[0]+" across all functions "
      else
        @title="Role Premium of "+@role+" across all industries "
      end
    else
      @title="Role Premium for "+@industries[0]+" and "+@role+" function"
    end
    @chartdata=Array.new
    @newSortArray=Array.new
    @allResultArray=Array.new
    @tmpArray1=Array.new
    @tmpArray2=Array.new
    @nextStep=0
    @step=0
    if @salary.length>1
      for @ind in 0..@salary.length-1
        @tmpArray1=Array.new
        (0..@salary[@ind].length - 1).step(1).each do |sal|
          @newSortArray.push @salary[@ind][sal]["_id"]["level"]
          @tmpArray1.push ({"_id": {"level": @salary[@ind][sal]["_id"]["level"],"industry":@salary[@ind][sal]["_id"]["industry"]}, "salary": @salary[@ind][sal]["salary"]})
        end
        @allResultArray.push @tmpArray1
      end
      @salary.clear
      @newSortArray.uniq!
      @minValue=@newSortArray.min
      @maxValue=@newSortArray.max
      (@minValue..@maxValue).step(1)do |n|
        isFound=false
        for @n in 0..@newSortArray.length-1
            if n==@newSortArray[@n]
              isFound=true;
              break
            end
        end
      if !isFound
        @newSortArray.push n
      end
      end
      @newSortArray.sort_by{  |s| s.to_i }
      if (@newSortArray.length)%2==0
        if (@newSortArray.length)<=18
          @nextStep=1
        else
          @nextStep=3
        end
      elsif (@newSortArray.length)%3==0
        if (@newSortArray.length)<=27
          @nextStep=2
        else
          @nextStep=4
        end
      else
        @newSortArray.push (@newSortArray.max()+1)
        if (@newSortArray.length)%2==0
          if (@newSortArray.length)<=18
            @nextStep=1
          else
            @nextStep=3
          end
        elsif (@newSortArray.length)%3==0
          if (@newSortArray.length)<=27
            @nextStep=2
          else
            @nextStep=4
          end
        end
      end
      for @syn in 0..@newSortArray.length-1
        for @all in 0.. @allResultArray.length-1
          @actualLen=@allResultArray[@all].length-1
          @lvlFound=false
          if @syn<=@allResultArray[@all].length-1
            for @tmp1 in 0..@actualLen
              @data=@allResultArray[@all][@tmp1][:_id][:level]
              if @data==@newSortArray[@syn]
                @lvlFound=true
                break
              end
            end
          end
          if !@lvlFound
            @allResultArray[@all].push ({"_id": {"level": @newSortArray[@syn]}, "salary": [], "isNew": true})
          end
        end
      end
      for @all in 0.. @allResultArray.length-1
        @salary.push @allResultArray[@all].sort_by { |hash| hash[:_id][:level] }
      end
      if @nextStep>@step
        @step=@nextStep
      end
    else
      if @salary[0].length>9
        @nextStep=1
      elsif @salary[0].length>19
        @nextStep=2
      elsif @salary[0].length>29
        @nextStep=3
      elsif @salary[0].length>39
        @nextStep=4
      end
      if @nextStep>@step
        @step=@nextStep
      end
    end
    (0..@salary.length-1).step(1).each do |all|
      @xAxis=Array.new
      @yAxis=Array.new
      if @step>0
        @industryName=""
        (0..@salary[all].length-1).step(@step+1).each do |sal|
          @salry=[]
          @count=0
          if @industryName=="" || @industryName==nil
            @industryName=@salary[all][sal][:_id][:industry]
          end
          for @s in 0..@step
            if (sal+@s)<=(@salary[all].length - 1)
              @salry=@salry+@salary[all][sal+@s][:salary]
              @count=@count+@salary[all][sal+@s].length
            end
          end

          if ( sal+@s)<=(@salary[all].length- 1)
            @xAxis.push @salary[all][sal][:_id][:level].to_s+"-"+@salary[all][sal+@step][:_id][:level].to_s
          else
            @xAxis.push @salary[all][sal][:_id][:level].to_s
          end
          @sortValue=@salry.sort()
          if @sortValue.length>1
            @medianVal=0
            if @sortValue.length%2==0
              @midPoint= ((@sortValue.length-1)/2).to_i
              @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
            else
              @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
            end
            @yAxis.push @medianVal
          elsif @sortValue.length==1
            @yAxis.push @sortValue[0]
          else
            @yAxis.push ''
          end
          # @medianIndex=(@salry.length)/2
          # @yAxis.push @salry.sort()[(@salry.length)/2]


        end
        @chartdata.push ({xAxis: @xAxis, yAxis: @yAxis,industryName:@industryName})
      else
        @xAxis=Array.new
        @yAxis=Array.new
        for @sal in 0..@salary[all].length-1
            @industryName=@salary[all][@sal][:_id][:industry]
          @xAxis.push @salary[all][@sal][:_id][:level]
            @sortValue=@salary[all][@sal][:salary].sort()
            if @sortValue.length>1
              @medianVal=0
              if @sortValue.length%2==0
                @midPoint= ((@sortValue.length-1)/2).to_i
                @medianVal=(@sortValue[@midPoint]+@sortValue[@midPoint+1])/2
              else
                @medianVal= @sortValue[((@sortValue.length-1)/2).to_i]
              end
              @yAxis.push @medianVal.to_f
            else
              @yAxis.push @sortValue[0].to_f
            end
        end
        @chartdata.push ({xAxis: @xAxis, yAxis: @yAxis,industryName:@industryName})
      end
    end


    render :json => {status: 200, chartdata: @chartdata,title:@title}
  end

def gotoQuiz

end
  def getRoleChart_
    @salary=User.functionVsIndustries(["Information Technology and Services","Computer Software"], "CUSTOMER CARE - CALL CENTRE")
    @data=[]
    @newSortArray=Array.new
    @tmpArray1=Array.new
    @tmpArray2=Array.new
    for @ind in 0..@salary.length-1
      if @ind==0
        @tmpArray1=@salary[@ind]
      else
        @tmpArray2=@salary[@ind]
      end
      (0..@salary[@ind].length - 1).step(1).each do |sal|
        @newSortArray.push @salary[@ind][sal]["_id"]["level"]
      end
    end
    @newSortArray.uniq!
    for @syn in 0..@newSortArray.length-1
      @lvlFound=false
      if @syn<=@tmpArray1.length-1
        for @tmp1 in 0..@tmpArray1.length-1
          @data=@tmpArray1[@tmp1]["_id"]["level"]
          if @data==@newSortArray[@syn]
            @lvlFound=true
            break
          end
        end
      end
      if !@lvlFound
        @tmpArray1.push ({_id:{level:@newSortArray[@syn]},salary:[]})
      end
    end
    for @syn in 0..@newSortArray.length-1
      @lvlFound=false
      if @syn<=@tmpArray1.length-1
        for @tmp1 in 0..@tmpArray2.length-1
          @data=@tmpArray2[@tmp1]["_id"]["level"]
          if @data==@newSortArray[@syn]
            @lvlFound=true
            break
          end
        end
      end
      if !@lvlFound
        @tmpArray2.push ({_id:{level:@newSortArray[@syn]},salary:[]})
      end
    end

    @nextStep=0
    @step=0
    if @newSortArray.length>9
      @nextStep=1
    elsif @newSortArray.length>19
      @nextStep=2
    elsif @newSortArray.length>29
      @nextStep=3
    elsif @newSortArray.length>39
      @nextStep=4
    end
    if @nextStep>@step
      @step=@nextStep
    end

    for @ind in 0..@salary.length-1
      @tmp=Hash.new
      if @step>0
        @xAxis=Array.new
        @yAxis=Array.new
        (0..@salary[@ind].length - 1).step(@step+1).each do |sal|

          @salry=[]
          @count=0
          for @s in 0..@step
            if (sal+@s)<=(@salary[@ind].length - 1)
              @salry=@salry+@salary[@ind][sal+@s]["salary"]
              @count=@count+@salary[@ind][sal+@s].length
            end
          end
          if (sal+@s)<=(@salary[@ind].length - 1)
            @xAxis.push @salary[@ind][sal]["_id"]["level"].to_s+"-"+@salary[@ind][sal+@step]["_id"]["level"].to_s
          else
            @xAxis.push @salary[@ind][sal]["_id"]["level"].to_s
          end
          @sortArray=@salry.sort()
          @medianIndex=(@salry.length+1)/2
          @yAxis.push @salry.sort()[(@salry.length+1)/2]
        end
        @temp={xAxis:@xAxis,yAxis:@yAxis}
        @data.push @temp
      else
        @xAxis=Array.new
        @yAxis=Array.new
        for @sal in 0..@salary[@ind].length-1
          @xAxis.push @salary[@ind][@sal]["_id"]["level"]
          @medianIndex=(@salary[@ind][@sal]["salary"].length+1)/2
          @sortArray=@salary[@ind][@sal]["salary"].to_a.sort()
          @yAxis.push @sortArray[@medianIndex]
        end
        @temp={xAxis:@xAxis,yAxis:@yAxis}
        @data.push @temp
      end
    end
    render :json=>{status:200,chartdata:@data}
  end
  def getQuestionFactorWise
  # @params=params["factor"]
  # @allQues=Array.new
  # @allQues0=Question.getques(@params)
  # @allQues1=Question.getques("impact")
  # @allQues2=Question.getques("responsibility")
  # @allQues3=Question.getques("effectiveness")
  # @allQues=@allQues0+@allQues1+@allQues2+@allQues3
  #+@allQues1+@allQues2+@allQues3
  render :json => {"status"=>200,:msg=>"Get data",:allQues=>@allQues}
  end
 private

  def CalculateCL(role,industry,level)
    # @val=@testArray.sort[(0.50 * @testArray.length).ceil - 1]
     @result=Hash.new
    @title=""
    @role=role
    @industry=industry
    @xAxis8=Array.new
    @xAxis50=Array.new
    @xAxis9=Array.new
    @xAxis=Array.new
    @yaxis=Array.new
    @allArraye=Array.new
    @mylevel=level
    ### if Level exist in data #########
    @isLevelExistFnIndus=true
    @isLevelExistFn=true
    @isLevelExistIndus=true
    @isLevelExistAllData=true
    @goToBin=false
    @per8=0
    @per9=0
    @per50=0
    @isUserLevelExist=false
    if(!@isUserLevelExist)
    @UserLevelData=Hash.new
    @title="Compensation Comparison  "+@industry +" and "+@role+" function"
    @UserLevelData=getChartData(@UserLevelData,role,industry,level)
      if @UserLevelData[:data].length==0
        @title="Compensation Comparison of "+@role +" across all industries."
        @UserLevelData=getChartData(@UserLevelData,role,"",level)
        if @UserLevelData[:data].length==0
            @title="Compensation Comparison of "+@industry +" across all functions."
            @UserLevelData=getChartData(@UserLevelData,"",industry,level)
            if @UserLevelData[:data].length==0
              @title="Compensation Comparison across our data. "
              @UserLevelData=getChartData(@UserLevelData,"","",level)
              @allArraye=@UserLevelData[:data]
              @goToBin=@UserLevelData[:bin]
              @graph2=@UserLevelData[:graph2]
            else
              @allArraye=@UserLevelData[:data]
              @goToBin=@UserLevelData[:bin]
              @graph2=@UserLevelData[:graph2]
            end
        else
          @allArraye=@UserLevelData[:data]
          @goToBin=@UserLevelData[:bin]
          @graph2=@UserLevelData[:graph2]
        end
      else
       @allArraye=@UserLevelData[:data]
       @goToBin=@UserLevelData[:bin]
       @graph2=@UserLevelData[:graph2]
      end
    end

    @maxofSalary=0
    @index=0
    if @allArraye.length>1
      @allArraye=@allArraye.sort_by { |hash| hash[:_id][:level] }
    if(@goToBin)
      @step=@UserLevelData[:step]
      if @step>0
        (0..@allArraye.length - 1).step(@step+1).each do |sal|
          @salry=0
          @mergearray=Array.new
          for @s in 0..@step
            if (sal+@s)<=(@allArraye.length - 1)
              @mergearray=@mergearray+@allArraye[sal+@s][:salary]
            end
          end
          if (sal+@s)<=(@allArraye.length - 1)
            @xAxis.push @allArraye[sal][:_id][:level].to_s+"-"+@allArraye[sal+@step][:_id][:level].to_s
            if @mylevel>=@allArraye[sal][:_id][:level] && @mylevel<=@allArraye[sal+@step][:_id][:level]
              @index=@xAxis.length-1
            end

          else
            @xAxis.push @allArraye[sal][:_id][:level].to_s+"-"+(@allArraye[sal][:_id][:level]+@s).to_s
            if @mylevel>=@allArraye[sal][:_id][:level] && @mylevel<=(@allArraye[sal][:_id][:level]+@s)
              @index=@xAxis.length-1
            end
          end
          if @mergearray.length>0
            @per8=calPercentile(@mergearray,0.33)
            @per9=calPercentile(@mergearray,0.90)
            @per50=calPercentile(@mergearray,0.50)
            @xAxis8.push @per8.to_f.round(2)
            @xAxis50.push @per50.to_f.round(2)
            @xAxis9.push @per9.to_f.round(2)
            if @maxofSalary<@xAxis8.max
              @maxofSalary=@mergearray.max
            end
            if @maxofSalary<@xAxis9.max
              @maxofSalary=@mergearray.max
            end
            if @maxofSalary<@xAxis50.max
              @maxofSalary=@mergearray.max
            end
          else
            @xAxis.delete_at(@xAxis.length-1)
          end
          @per8=0
          @per9=0
          @per50=0
        end
      else
        for @all in 0..@allArraye.length-1
          @xAxis.push @allArraye[@all][:_id][:level]
          if @allArraye[@all][:salary].length>0
            @per8=calPercentile(@allArraye[@all][:salary],0.33)
            @per9=calPercentile(@allArraye[@all][:salary],0.90)
            @per50=calPercentile(@allArraye[@all][:salary],0.50)
            @xAxis8.push @per8.to_f.round(2)
            @xAxis50.push @per50.to_f.round(2)
            @xAxis9.push @per9.to_f.round(2)
            if @maxofSalary<@xAxis8.max
              @maxofSalary=@allArraye[@all][:salary].max
            end
            if @maxofSalary<@xAxis9.max
              @maxofSalary=@allArraye[@all][:salary].max
            end
            if @maxofSalary<@xAxis50.max
              @maxofSalary=@allArraye[@all][:salary].max
            end
          else
            @xAxis.delete_at(@xAxis.length-1)
          end
          @per8=0
          @per9=0
          @per50=0
          @isFound=true
        end
        @index=@xAxis.index(@mylevel)
      end
    else
      for @all in 0..@allArraye.length-1
        @xAxis.push @allArraye[@all][:_id][:level]
        if @allArraye[@all][:salary].length>0
          @per8=calPercentile(@allArraye[@all][:salary],0.33)
          @per9=calPercentile(@allArraye[@all][:salary],0.90)
          @per50=calPercentile(@allArraye[@all][:salary],0.50)
          @xAxis8.push @per8.to_f.round(2)
          @xAxis50.push @per50.to_f.round(2)
          @xAxis9.push @per9.to_f.round(2)
          if @maxofSalary<@xAxis8.max
            @maxofSalary=@allArraye[@all][:salary].max
          end
          if @maxofSalary<@xAxis9.max
            @maxofSalary=@allArraye[@all][:salary].max
          end
          if @maxofSalary<@xAxis50.max
            @maxofSalary=@allArraye[@all][:salary].max
          end
        else
          @xAxis.delete_at(@xAxis.length-1)
        end
        @per8=0
        @per9=0
        @per50=0
        @isFound=true
      end
      @index=@xAxis.index(@mylevel)
    end
    if(@graph2)
      for @ind in 0..@xAxis.length
        @level=@xAxis[@ind]
        @lastVal=@level.to_s.split('-')[1].to_i
        if @lastVal ==level-1
        @index=@ind+1
          break
        end
      end
      @xAxis.insert(@index,level)
      @xAxis8.insert(@index,calPercentile(@CheckUserPointsAvailable[level][:salary],0.33))
      @xAxis9.insert(@index,calPercentile(@CheckUserPointsAvailable[level][:salary],0.90))
      @xAxis50.insert(@index,calPercentile(@CheckUserPointsAvailable[level][:salary],0.50))
      @yaxis[@index]=@maxofSalary
    end
    else
      for @all in 0..@allArraye.length-1
        @xAxis.push @allArraye[@all][:_id][:level]
        if @allArraye[@all][:salary].length>0
          @per8=calPercentile(@allArraye[@all][:salary],0.33)
          @per9=calPercentile(@allArraye[@all][:salary],0.90)
          @per50=calPercentile(@allArraye[@all][:salary],0.50)
          @xAxis8.push @per8.to_f.round(2)
          @xAxis50.push @per50.to_f.round(2)
          @xAxis9.push @per9.to_f.round(2)
          if @maxofSalary<@xAxis8.max
            @maxofSalary=@allArraye[@all][:salary].max
          end
          if @maxofSalary<@xAxis9.max
            @maxofSalary=@allArraye[@all][:salary].max
          end
          if @maxofSalary<@xAxis50.max
            @maxofSalary=@allArraye[@all][:salary].max
          end
        else
          @xAxis.delete_at(@xAxis.length-1)
        end
        @per8=0
        @per9=0
        @per50=0
        @isFound=true
      end
      @index=@xAxis.index(@mylevel)
    end
    @yaxis[@index]=@maxofSalary
    @result["yaxis"]=@yaxis
    @result["xAxis"]=@xAxis
    @result["xAxis8"]=@xAxis8
    @result["xAxis9"]=@xAxis9
    @result["xAxis50"]=@xAxis50
    @result["index"]=@index
    @result["mylevel"]=@mylevel
    @result["title"]=@title
    return @result
    end
  def getChartData(data,role,industry,level)
      @allArraye=Array.new
      @goToBin=false
      @graph2=false
      @step=0
      @UserLevelData=User.checkUserLevelInData(role,industry,level,"level")
      if !@UserLevelData[:data].nil? && @UserLevelData[:data].length>0
          if @UserLevelData[:data][0][:sizeofdata]==1
            @allArraye=@UserLevelData[:data]
          else
            @CheckUserPointsAvailable=Hash.new
            @CheckUserPointsAvailable=User.getUserRange(role,industry)
            @CheckUserPointsAvailable=changeArrayToHash(@CheckUserPointsAvailable)
            @allArraye=calculateGraph(@CheckUserPointsAvailable,level)
            if @allArraye.length==0
              @rightSideArray=Array.new
              @availableLevels=@CheckUserPointsAvailable.keys.sort
              indexofLevel=@availableLevels.to_a.index(level)
              @availableLevels.delete_at(indexofLevel)

              @rightSideArray=@availableLevels
              @UserLevelData=Array.new
              @UserLevelData=@CheckUserPointsAvailable[level]
              @UserRangeData=Array.new
             if @rightSideArray.length<=1 || indexofLevel<2
               @allArraye.push @UserLevelData
             else
               for @d in 0..@rightSideArray.length-1
                 @UserRangeData.push (@CheckUserPointsAvailable[@rightSideArray[@d]] )
               end
               if @UserRangeData.length>2
                 @UserRangeData=createBinForData(@UserRangeData,@mylevel,2)
                 @allArraye=@UserRangeData[:data]
                 if @allArraye.length<=(@UserRangeData[:step]*2)
                   @allArraye=@UserRangeData[:data]
                   @goToBin=true
                   @step=@UserRangeData[:step]
                 else
                   @goToBin=true
                   @graph2=true
                   @step=@UserRangeData[:step]
                 end
               end
             end

            else
              @isLevelExistFnIndus=true
            end
          end

      else
        @CheckUserPointsAvailable=Hash.new
        @CheckUserPointsAvailable=User.getUserRange(role,industry)
        if @CheckUserPointsAvailable.length>0 && @CheckUserPointsAvailable[0]["salary"].length>1

          @UserLevelData=createBinForData(@CheckUserPointsAvailable,@mylevel,0)
          @allArraye=@UserLevelData[:data]
          if @allArraye.length>5
          if(@UserLevelData[:graph3])
            if @allArraye.length>=(@UserLevelData[:step]*3)
              @goToBin=true
              @step=@UserLevelData[:step]
            else
              @allArraye=[]
              (0..@UserLevelData[:data].length).step(@UserLevelData[:step]) do|n|
                @subArray=Array.new
                @subArray=@UserLevelData[:data][n..n+@UserLevelData[:step]]
                if (@subArray.select{|h| h[:_id][:level]==level}).length>0
                  @allArraye=@subArray
                  @goToBin=true
                  @step=@UserLevelData[:step]
                  break;
                end
              end
            end
          else
            @allArraye=[]
            (0..@UserLevelData[:data].length).step(@UserLevelData[:step]) do|n|
              @subArray=Array.new
              @subArray=@UserLevelData[:data][n..n+@UserLevelData[:step]]
              if (@subArray.select{|h| h[:_id][:level]==level  }).length>0
                if (@subArray.select{|h| h[:salary].length>1 }).length>0
                  @allArraye=@subArray
                  @goToBin=true
                  @step=@UserLevelData[:step]
                  break;
                end
              end
            end
          end
          else
            @allArraye=[]
            end
        end

      end
      return {data:@allArraye,bin:@goToBin,graph2:@graph2,step:@step}
    end
  def calculateGraph(arrayData,level)
    resultArray=Array.new
    xaxis=Array.new
    resultArray=[]
    xaxis=[]
    # arrayData=changeArrayToHash(arrayData)
    @availableLevels=arrayData.keys
    if @availableLevels.include?(level-1)&& @availableLevels.include?(level+1)
      if !@availableLevels.include?(level-2)&& @availableLevels.include?(level+2)
        if  @availableLevels.include?(level+3)
          resultArray=[level-1,level,level+1,level+2,level+3]
        else
          resultArray=[level-1,level,level+1,level+2]
        end
      elsif @availableLevels.include?(level-2)&& !@availableLevels.include?(level+2)
        if  @availableLevels.include?(level-3)
          resultArray=[level-3,level-2,level-1,level,level+1]
        else
          resultArray=[level-2,level-1,level,level+1]
        end
      elsif @availableLevels.include?(level-2)&& @availableLevels.include?(level+2)
            resultArray=[level-2,level-1,level,level+1,level+2]
      end
    elsif !@availableLevels.include?(level-1)&& @availableLevels.include?(level+1)
      if @availableLevels.include?(level+2)
        if @availableLevels.include?(level+3)
          if @availableLevels.include?(level+4)
            resultArray=[level,level+1,level+2,level+3,level+4]
          else
            resultArray=[level,level+1,level+2,level+3]
          end
        else
          resultArray=[level,level+1,level+2]
        end
      else

        ###go to g2
      end
    elsif @availableLevels.include?(level-1)&& !@availableLevels.include?(level+1)
      if @availableLevels.include?(level-2)
        if @availableLevels.include?(level-3)
          if @availableLevels.include?(level-4)
            resultArray=[level,level-1,level-2,level-3,level-4]
          else
            resultArray=[level,level-1,level-2,level-3]
          end
        else
          resultArray=[level,level-1,level-2]
        end
      else
        ###go to g2
      end
    else

    end
    if resultArray.length>0
      for @d in 0..resultArray.length-1
        xaxis.push (arrayData[resultArray[@d]] )
      end
    end
    return xaxis
  end
  def Graph2(arrayData,level,side)
    resultArray=Array.new
    xaxis=Array.new
    resultArray=[]
    xaxis=[]
    if side=='R'
      @checkRightrange=false
     @isExistrange=true
      (level+2...level+5).step(1)  do |n|
        if !arrayData.include?(n)
          @isExistrange=false
        end
      end
if @isExistrange
  if(arrayData.include?(level+6)&&arrayData.include?(level+7))
    if(arrayData.include?(level+8)&&arrayData.include?(level+9))
      resultArray=arrayData[0..9]
      return resultArray
    else
      resultArray=arrayData[0..6]
      return resultArray
    end
  else
    resultArray=arrayData[0..4]
    return resultArray
  end
else
  return resultArray
end

    else
      @checkLeftrange=false
      @isExistrange=true
      (level-2...level-5).step(1)  do |n|
        if !arrayData.include?(n)
          @isExistrange=false
        end
      end
      if @isExistrange
        if(arrayData.include?(level-6)&&arrayData.include?(level-7))
          if(arrayData.include?(level-8)&&arrayData.include?(level-9))
            resultArray=arrayData[0..9]
            return resultArray
          else
            resultArray=arrayData[0..6]
            return resultArray
          end
        else
          resultArray=arrayData[0..4]
          return resultArray
        end
      else
        return resultArray
      end

    end


    @step=1
    if @availableLevels.include?(level-1)
      @checkLeftrange=true
    end
    if @availableLevels.include?(level+1)
      if @availableLevels.include?(level+2)
        @checkRightrange=true
      end
    end

    if @checkLeftrange
      (level..level-10)
      (1..5).step(@step) do |n|
        @subArray=Array.new
        @subArray=arrData[n..(n+step)]
        for s in 0..@step+1
          @subArray.push
        end
      end
    end

    if @availableLevels.include?(level+1)&& @availableLevels.include?(level+2)
      @checkRightrange=true
    end

    if @availableLevels.include?(level-1)&& @availableLevels.include?(level+1)
      if !@availableLevels.include?(level-2)&& @availableLevels.include?(level+2)
        if  @availableLevels.include?(level+3)
          resultArray=[level-1,level,level+1,level+2,level+3]
        else
          resultArray=[level-1,level,level+1,level+2]
        end
      elsif @availableLevels.include?(level-2)&& !@availableLevels.include?(level+2)
        if  @availableLevels.include?(level-3)
          resultArray=[level-3,level-2,level-1,level,level+1]
        else
          resultArray=[level-2,level-1,level,level+1]
        end
      end
    elsif !@availableLevels.include?(level-1)&& @availableLevels.include?(level+1)
      if @availableLevels.include?(level+2)
        if @availableLevels.include?(level+3)
          if @availableLevels.include?(level+4)
            resultArray=[level,level+1,level+2,level+3,level+4]
          else
            resultArray=[level,level+1,level+2,level+3]
          end
        else
          resultArray=[level,level+1,level+2]
        end
      end
    elsif @availableLevels.include?(level-1)&& !@availableLevels.include?(level+1)
      if @availableLevels.include?(level-2)
        if @availableLevels.include?(level-3)
          if @availableLevels.include?(level-4)
            resultArray=[level,level-1,level-2,level-3,level-4]
          else
            resultArray=[level,level-1,level-2,level-3]
          end
        else
          resultArray=[level,level-1,level-2]
        end
      end
    else

    end
    if resultArray.length>0
      for @d in 0..resultArray.length-1
        xaxis.push (arrayData[resultArray[@d]] )
      end
    end
    return xaxis
  end
  def createBinForData(data,level,graphType)
      @salary=Array.new
      @salary=data
      @newSortArray=Array.new
      @nextStep=0
      @tmpArray1=Array.new
      (0..@salary.length - 1).step(1).each do |sal|
        @newSortArray.push @salary[sal]["_id"]["level"]
        @tmpArray1.push ({"_id": {"level": @salary[sal]["_id"]["level"]}, "salary": @salary[sal]["salary"]})
      end
      @salary.clear
      @newSortArray.uniq!

      @minValue=@newSortArray.min
      if @minValue>level
        @minValue=level
      end

      @maxValue=@newSortArray.max
      if @maxValue<level
        @maxValue=level
      end
      (@minValue..@maxValue).step(1)do |n|
        isFound=false
        for @n in 0..@newSortArray.length-1
          if n==@newSortArray[@n]
            isFound=true;
            break
          end
        end
        if !isFound
          @newSortArray.push n
        end
      end
      @newSortArray.sort_by{  |s| s.to_i }
      if @newSortArray.length>5
      if (@newSortArray.length)%2==0
        if (@newSortArray.length)<=12
          @nextStep=1
        else (@newSortArray.length)<=20
          @nextStep=3
        end
      elsif (@newSortArray.length)%3==0
        if (@newSortArray.length)<=15
          @nextStep=2
        else (@newSortArray.length)<=25
          @nextStep=4

        end
      else
        @newSortArray.push (@newSortArray.max()+1)
        if (@newSortArray.length)%2==0
          if (@newSortArray.length)<=12
            @nextStep=1
          else (@newSortArray.length)<=20
            @nextStep=3

          end
        elsif (@newSortArray.length)%3==0
          if (@newSortArray.length)<=15
            @nextStep=2
          else (@newSortArray.length)<=25
            @nextStep=4

          end
        end
      end
      end
      if graphType==2
        indexofLevel=@newSortArray.index(level)
        @newSortArray.delete_at(indexofLevel)
      end

      for @syn in 0..@newSortArray.length-1
        @actualLen=@tmpArray1.length-1
        @lvlFound=false
        if @syn<=@actualLen
          for @tmp1 in 0..@actualLen
            @data=@tmpArray1[@tmp1][:_id][:level]
            if @data==@newSortArray[@syn]
              @lvlFound=true
              break
            end
          end
        end
        if !@lvlFound
          @tmpArray1.push ({"_id": {"level": @newSortArray[@syn]}, "salary": []})
        end
      end
      @allArraye=@tmpArray1.sort_by { |hash| hash[:_id][:level] }
      @UserRange=Hash.new
     if(@nextStep>0)
       @isExist=false

       for @size in @nextStep..5
         @UserRange= checkStepSize(@allArraye,@size,level)
         if @UserRange[:isExist]
           @nextStep=@size
           break
         end
       end
     end
     if @UserRange.has_key?(:isExist)&& @UserRange[:isExist]
       return  {data:@UserRange[:data],step:@nextStep,graph3:@UserRange[:isExist]}
     else
       return  {data:@allArraye,step:@nextStep+1,graph3:@UserRange[:isExist]}
     end

  end
  def checkStepSize(arrData,step,level)
    @isExist=false
    @len=step
    @masterArray=Array.new
    (0..arrData.length).step(step+1) do |n|
     @subArray=Array.new
     @subArray=arrData[n..(n+step)]
        @hasValue=@subArray.select {|e| e[:salary].length >1}
        if @hasValue.length>0
          @masterArray=@masterArray+@subArray
          @isExist=true
        else
          @hasLevel=@subArray.select {|h| h[:_id][:level]==level}
          if @hasLevel.length>0
            if n>=step*3 && n<=step*5
              @subArray=Array.new
              @subArray=arrData[n..(n+(step))]
              @hasValue=@subArray.select {|x| x[:salary].length >1}
              if @hasValue.length>0
                @masterArray=@masterArray+@subArray
                @isExist=true
              else
                @isExist=true
              end
              break
            else
              @isExist=false
              break
            end
          else
            @isExist=false
            break
          end

        end
     end
     return {isExist:@isExist,data:@masterArray}

  end
  def calPercentile(array,percentile)
    @testArray=array.sort()
    @indexArray=(percentile * @testArray.length).to_f
    if  @indexArray%1==0
      @firstIndex=@testArray[(@indexArray-1).to_i]
      @SecIndex=@testArray[(@indexArray).to_i]
      @x=((@firstIndex+@SecIndex).to_f/2.to_f)
    else
      @x=@testArray[@indexArray.round(0)-1]
    end
    return @x
  end
  def changeArrayToHash(array)
    resultHash=Hash.new
    for i in 0..array.length-1
      resultHash[array[i]["_id"]["level"]] =array[i]
    end
    return resultHash
  end

  def CalculateCL_1(role,industry,level)
    @result=Hash.new
    @title=""
    @role=role
    @industry=industry
    @xAxis8=Array.new
    @xAxis50=Array.new
    @xAxis9=Array.new
    @xAxis=Array.new
    @yaxis=Array.new
    @allArraye=Array.new
    @mylevel=level
    @isLevelExistFnIndus=true
    @isLevelExistFn=true
    @isLevelExistIndus=true
    @isLevelExistAllData=true
    @goToBin=false
    @per8=0
    @per9=0
    @per50=0
    @isUserLevelExist=false
    @UserLevelData=Hash.new
    @title="Compensation Comparison  "+@industry +" and "+@role+" function"

  end
  def check(cl,data,range)
  end
  def g1(cl,data)

  end
  def g2(cl,data)

  end
  def g3(cl,data)

  end

   end

