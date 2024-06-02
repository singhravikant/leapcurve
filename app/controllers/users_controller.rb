class UsersController < ApplicationController
  require 'csv'
  def index
  end
  def getquestioninformation
    params
    if params['data']['lavel'] == 1
      user_selected_lavel = 'junior'
    elsif params['data']['lavel'] == 2
      user_selected_lavel = 'middle'
    elsif params['data']['lavel'] == 4
      user_selected_lavel = 'top'
    end
    if !user_selected_lavel.blank?
    uniq_user_info = []
    uniq_question_details = []
    # user_info = CompetencyData.where(:industry => params['data']['industry'].downcase, :function => params['data']['role'].gsub(' ','').downcase).to_a
    user_info = CompetencyData.where(:industry => params['data']['industry'].strip.downcase, :function => params['data']['role'].strip.gsub(' ','').downcase,:managment_level => /.*#{user_selected_lavel}.*/i,).to_a
    user_info.each do |details|
      if uniq_user_info.blank? || !uniq_user_info.include?(details.competency_name)
        uniq_user_info.insert(-1,details.competency_name)
        uniq_question_details.insert(-1,details)
      end
    end
    if uniq_question_details.length > 4
      render :json => {status:200,ques_details:uniq_question_details}
    else
      render :json => {status:500,ques_details:uniq_question_details}
    end
    else
      render :json => {status:500,ques_details:uniq_question_details}
    end
    # user_list
  end

  def conpentency_cl_cal
    total_cal_cl = 0
    params['compentency_cl'].each do |competency|
      cl_cal =  CompetencyData.where(brief_level_description:competency)[0]
      # total_cal_cl = total_cal_cl + cl_cal.level
      total_cal_cl = total_cal_cl + cl_cal.career_level_mapper
    end
    total_cal_per = (total_cal_cl.to_f/params['compentency_cl'].length.to_f).round
    render :json => {status:200,total_cal_per:total_cal_per}
  end
  def get_compentency_result
    begin
      result = []
      params['data'].each do |val|
        result.insert(-1,CompetencyData.where(brief_level_description:val)[0])
      end
      render :json => {status:200,result:result}
    rescue Exception => ex
      puts ex.to_s
    end
  end

  def show_selected_opt_details
    selected_details = []
    params['campetrncy_info'].each do |name|
      user_info = CompetencyData.where(:competency_name => name)
      # selected_details.insert(-1, user_info)
      selected_details.push({name => user_info})
    end
    if !selected_details.blank?
      render :json => {status:200,selected_details:selected_details}
    else
      render :json => {status:500,selected_details:selected_details}
    end
  end

  def user_list
    begin

          @meterial_file = File.readlines "\E:/Leapcurve_Work/updated_sheet.csv"
          @meterial_file.each_with_index do |data,ind|
            if ind > 0
            info = data.split(',')
            industry = info[0].downcase
            function = info[1].gsub(' ','').downcase
            managment_level = info[2].downcase.split(';')
            competency_name = info[3].gsub('_',',')
            competency_description = info[4].gsub('_',',')
            level = info[5].gsub('_',',')
            brief_level_description = info[6].gsub('_',',')
            competency_level_description = info[7].gsub('_',',')
            career_level_mapper = info[8]
            knowledge_elements_required = info[9].gsub('_',',').strip
            # CompetencyData.create(:industry => industry,:function => function, :managment_level => managment_level,
            # :competency_name => competency_name, :competency_description => competency_description, :level => level,
            #    :brief_level_description => brief_level_description, :competency_level_description => competency_level_description,
            #               :career_level_mapper => career_level_mapper,  :knowledge_elements_required => knowledge_elements_required
            # )

          end
          end

    rescue Exception => ex
      puts ex.to_s
    end
  end

  def readFile
    @record=Dir.glob("#{Rails.root}/New_folder/**/*")
    for i in 0..@record.count-1
      @file=File.open(@record[i])
      csv_text = File.read(@file)
      csv = CSV.parse(csv_text, :headers => true, encoding: 'iso-8859-1:utf-8')
      begin
        csv.each do |row|
         insertRecord(row)
        end
        render json: {status:200 , msg:"File successfully uploaded"}
      rescue Exception => ex
        puts ex.message
        render json: {status:500 , msg:ex.message}
      end
    end
  end
  def insertRecord (row)
    @row=row.to_s.gsub('\n','').to_s.split(',')
    @user=Hash.new
    for r in 2..@row.length-1
    # @getMatchData=User.getMatchData(@row[0].to_s.upcase,@row[1],@row[r].to_s.upcase)
      if r==3
        @data=Hash.new
        @data["Company"]=@row[0]
        @data["Industry"]=@row[1]
        @data["Role"]=@row[r]
        @data["Effects"]=["Moderate","Significant","Prime"]
        CareerEffect.create(@data)

      else
        @data=Hash.new
        @data["Company"]=@row[0]
        @data["Industry"]=@row[1]
        @data["Role"]=@row[r]
        @data["Effects"]=["Low","Moderate","Significant","Prime"]
        CareerEffect.create(@data)

      end






    @i=@getMatchData
    end


  end
  def sign_up_user
    @data=params["data"]
    @email=""
    if params["data"].has_key?('email')
      @email=@data['email'].to_s.downcase
    else
      @email=@data['Email'].to_s.downcase
    end
    begin
      @user=Hash.new
      @user1=User.where("Email"=>@email).to_a
      if @user1.length==0
        @user["Name"]=@data["Name"]
        @user["Contact"]=@data["Contact"]
        @user["Email"]=@data["Email"].to_s.downcase
        # @user["DOB"]=Date.parse(@data["DOB"]).to_date
        @user["Experience"]=@data["Experience"].to_i
        @user["Education"]=@data["Education"]
        @user["Role"]=@data["Role"]
        @user["Industry"]=@data["Industry"]
        @user["Institute"]=@data["Institute"]
        # @user["AnnualSalary"]=@data["AnnualSalary"]
        @user["Company"]=@data["Company"]
        @user["Designation"]=@data["Designation"]
        @user["Score"]=@data["Score"]
        @user["Level"]=@data["Level"]
        @user["Salary"]=@data["Salary"].to_f
        @user["Password"]=@data["Password"]
        @user["CompanyDetails"]=@data["CompanyDetails"]
        @user["UserChoices"]=@data["UserChoices"]
        @user["reportValues"]={}
        @user["growthValues"]={}
        @user["resolvData"]={}
        if(@data.has_key?('EffectiveLevel'))
         @user["EffectiveLevel"]=@data["EffectiveLevel"]
        else
          @user["EffectiveLevel"]=0
          end
        if(@data.has_key?('ClickMode'))
         @user["ClickMode"]=@data["ClickMode"]
        else
          @user["ClickMode"]=""
          end
        if(@data.has_key?('Preference'))
         @user["Preference"]=@data["Preference"]
        else
          @user["Preference"]=[]
        end
        if(@data.has_key?('selectedopt'))
          @user["selectedopt"]=@data["selectedopt"]
        else
          @user["selectedopt"]=[]
        end

        User.create(@user)
        render :json => {status:200,msg:"Successfully Signed Up!",username:@user}
       else
          render :json => {status: 200, msg: "The email address you have entered is already registered."}
        end

    rescue Exception => ex
      render :json => {status:501,msg:"Internal Server Error"}
      puts ex.message
    end
  end
  def delete_account
    data=params
    @currentuser=User.find_by(:Email=>data['Email'])
    @currentuser.delete
    render :json => {status: 200, msg: "Successfully deleted account."}
  end
  def Login_user
    @data=params["data"]
    @email=""
    if params["data"].has_key?('email')
      @email=@data['email'].to_s.downcase
    else
      @email=@data['Email'].to_s.downcase
    end
    begin
      @user=Hash.new

      @user1=User.where("Email"=>@email).to_a
      if @user1.length==0
          render :json => {status: 200, msg: "The email address entered is not registered with us. Please check again or sign up if you don't have an account."}
      else
        if @data["password"]==@user1[0]["Password"]
          @user=User.find_by({"Email"=>@email.to_s.downcase})
          if @user.attributes.has_key?('resolvData')

          else
            @user["resolvData"]={}
            @user.save
          end
          if @user.attributes.has_key?('reportValues')
          else
            @user["reportValues"]={}
            @user.save
            end
          if @user.attributes.has_key?('growthValues')
          else
            @user["growthValues"]={}
            @user.save
          end
            render :json => {status: 200, msg: "Successfully Logged In!",username:@user1[0]}
          else
            render :json => {status: 200, msg:"The password that you've entered is incorrect"}
          end
      end
    rescue Exception => ex
      render :json => {status:501,msg:"Internal Server Error"}
      puts ex.message
    end
  end
  def getUserInfo
    @user1=User.find_by({"Email"=>params["Email"]}).to_a
    if @user1.length>0
      puts '@user1[0]["Experience"]'
      puts @user1[0]["Experience"]
      render :json => {status: 200, msg: "Successfully Signed Up!",user:@user1[0]}
    end
  end
  def user_forgot_password
    @data=params["data"]
    begin
      @user=Hash.new
      @user=User.find_by({"Email"=>@data["Email"].to_s.downcase})
      # @user=User.find_by({"Email"=>@data["Email"]})
      if @user==nil
        render :json => {status:200,msg:"The email address you have entered is not registered.",username:@user}
      else
        @token = SecureRandom.hex(16)
        @user["Token"]=@token.to_s
        @host_raw = request.original_url.to_s.split('/')
        @host = @host_raw[0].to_s + '//' + @host_raw[2]
        @link= @host + "/#!/app/reset-password/?token="+ @token.to_s
        # User.update(@user[0])
        @user.save

        ApplicationMailer.forgot_password_mail(@user["Email"],@link).deliver
        render :json => {status:200,msg:"Mail successfully sent to your registered email id.",username:@user}
      end
    end
  end
  def user_reset_password
    begin
      @params = params
      if @params.has_key?('token') && @params.has_key?('email') && @params.has_key?('password')
        @token = params["token"]
        @user=User.find_by({"Token"=>@token})
        if @user["Email"] == @params["email"]
          if @user["Password"] == @params["password"]
            render :json => {status:200,msg:"old password matched"}
          else
            @user["Password"] = @params["password"]
            @user.save
            puts @params["password"]
            render :json => {status:200,msg:"reset successfully"}
          end
        else
          render :json => {status:200,msg:"invalid email"}
        end
      else
        render :json => {status:200,msg:"invalid inputs"}
      end
    rescue Exception => exc
      puts exc.to_s
      render :json => {status:501,msg:"server errors"}
    end
  end
  def reset_password
    begin
      @params = params
      if @params.has_key?('token')
        @token = params["token"]
        @user=User.find_by({"Token"=>@token})
        if @user == nil
          render :json => {status:200,msg:"invalid token"}
        else
          render :json => {status:200,msg:"valid token",email:@user["Email"]}
        end
      else
        render :json => {status:200,msg:"invalid token"}
      end
    rescue Exception => exc
      put exc.to_s
      render :json => {status:501,msg:"server errors"}
    end
  end

  def impact_qustion
    begin
      impact_data ={}
      @params = params
      role_industry = params['impact_industry'].to_s.gsub('_', '&').chomp("\n")
      role_function = params['impact_function'].to_s.gsub('_', '&').chomp("\n")
      get_impact = Impact.where(:$and => [{:industry => role_industry},{:function => role_function }])[0]
      if !get_impact.blank?
        impact_data['industry'] = get_impact['industry']
        impact_data['function'] = get_impact['function']
        impact_data['environment_perspective'] = get_impact['environment_perspective']
        impact_data['employee_perspective'] = get_impact['employee_perspective']
        impact_data['internal_business_processes_perspective'] = get_impact['internal_business_processes_perspective']
        impact_data['customer_perspective'] = get_impact['customer_perspective']
        impact_data['suppliers__partners_perspective'] = get_impact['suppliers__partners_perspective']
        impact_data['impact_id'] = get_impact['impact_id']
        render :json => {:UserData => impact_data}
      else
        render :json => {:UserData => "Function & Industry are not found"}
      end

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end




  def sign_up_initial
    @data=params["data"]
    begin
      @user=Hash.new
      @user1=User.findUser(@data["Email"].to_s.downcase)
      if @user1.length==0
        @user["Name"]=@data["Name"]
        @user["Contact"]=@data["Contact"]
        @user["Email"]=@data["Email"].to_s.downcase
        @user["Password"]=@data["Password"]
        @user["Experience"]=0
        @user["Education"]=""
        @user["Role"]=""
        @user["Industry"]=""
        @user["Institute"]=""
        # @user["AnnualSalary"]=@data["AnnualSalary"]
        @user["Company"]=""
        @user["Score"]=0
        @user["Level"]=0
        @user["Salary"]=0
        @user["CompanyDetails"]=[]
        @user["UserChoices"]=[]
        @user["Preference"]=[]
        @user["ClickMode"]=""

        User.create(@user)
        render :json => {status:200,msg:"Successfully Signed Up!",username:@user}
      else
        render :json => {status:200,msg:"The email address you have entered is already registered.",username:@user}
      end
    rescue Exception => ex
      render :json => {status:501,msg:"Internal Server Error"}
      puts ex.message
    end
  end

  def updateUserInfo
    @data = params["data"]
    userchoices = []
    @data['UserChoices'].each_with_index do |level, ind|
      if ind != 7
        userchoices.insert(-1, level)
      end
    end
    @data['UserChoices'] = userchoices
    # @data['UserChoices'].delete_at(@data['UserChoices'].index 7)
    @user=User.find_by({"Email"=>@data["Email"].to_s.downcase})
    if(@user!=nil)
      @user["Name"]=@data["Name"]==""?@user["Name"]:@data["Name"]
      @user["Contact"]=@data["Contact"]==""?@user["Contact"]:@data["Contact"]
      @user["Email"]=@data["Email"]==""?@user["Email"]:@data["Email"].to_s.downcase
      @user["Experience"]=@data["Experience"]==""?@user["Experience"]:@data["Experience"]
      @user["Education"]=@data["Education"]==""?@user["Education"]:@data["Education"]
      @user["Industry"]=@data["Industry"]==""?@user["Industry"]:@data["Industry"]
      @user["Role"]=@data["Role"]==""?@user["Role"]:@data["Role"]
      @user["Company"]=@data["Company"]==""?@user["Company"]:@data["Company"]
      @user["Institute"]=@data["Institute"]==""?@user["Institute"]:@data["Institute"]
      @user["Designation"]=@data["Designation"]==""?@user["Designation"]:@data["Designation"]
      @user["Score"]=@data["Score"]==0?@user["Score"]:@data["Score"]
      if(@data.has_key?('ClickMode'))
        @user["ClickMode"]=@data["ClickMode"]
      else
       @user["ClickMode"]=@user["ClickMode"]
      end
      if(@data.has_key?('Preference'))
        if @data.has_key?('Preference')
          @user["Preference"]=@data["Preference"]
        end       
      else
        @user["Preference"]=[]
      end
      # if(@data.has_key?('userlevelvalue'))
      #   if @data.has_key?('userlevelvalue')
      #     @user["userlevelvalue"]=@data["userlevelvalue"]
      #   end
      # else
      #   @user["userlevelvalue"]=[]
      # end

        if(@data.has_key?('selectedopt'))
              if @data.has_key?('selectedopt')
                @user["selectedopt"]=@data["selectedopt"]
              end
            else
              @user["selectedopt"]=[]
            end
      

      # @user["Level"]=@data["Score"]==0?@user["Level"]:Level.getMyLevel(@data["Score"])
      @user["EffectiveLevel"]=@data["EffectiveLevel"]==0?@user["EffectiveLevel"]:@data["EffectiveLevel"]
      @userSelection=Hash.new
      if @data["CompanyDetails"].is_a?(Array)
        if @data["CompanyDetails"].length>0
        @user["CompanyDetails"]=@data["CompanyDetails"]
        @userSelection[1]=@data["CompanyDetails"][0]
        @userSelection[2]=[@data["CompanyDetails"][1],@data["CompanyDetails"][2]]
      end
        else
        @user["CompanyDetails"]=@data["CompanyDetails"]==[]?@user["CompanyDetails"]:(@data["CompanyDetails"].to_s.split(',').map {|i| i.to_i})
        @choices=@data["CompanyDetails"].to_s.split(',')
        @userSelection[1]=@choices[0]
        @userSelection[2]=[@choices[1],@choices[2]]
      end

      if @data["UserChoices"].is_a?(Array)
        if @data["UserChoices"].length>0
        @user["UserChoices"]=@data["UserChoices"]
        @userSelection[4]=@data["UserChoices"][0]
        @userSelection[5]=@data["UserChoices"][1]
        for uc in 2..@data["UserChoices"].length-1
          @userSelection[uc+4]=@data["UserChoices"][uc]
        end
        if @userSelection.count==21
          @user["Level"]=CLCalculation(@userSelection,@data["Industry"].to_s.squish)
        else
          @user["Level"]=0
        end
        end

      else
        @user["UserChoices"]=@data["UserChoices"]==[]?@user["UserChoices"]:(@data["UserChoices"].to_s.split(',').map {|i| i.to_i})
        @choices=@data["UserChoices"].to_s.split(',')
        @userSelection[4]=@choices[0].to_i
        @userSelection[5]=@choices[1].to_i
        for uc in 2..@choices.length-1
          @userSelection[uc+4]=@choices[uc].to_i
        end
        if @userSelection.count==21
          @user["Level"]=CLCalculation(@userSelection,@data["Industry"].to_s.squish)
        else
          @user["Level"]=0
        end

      end
      @user["Salary"]=@data["Salary"]==0?@user["Salary"]:@data["Salary"].to_f
      #  User.update(@user)

      @user.save
      render :json => {status:200,msg:"Successfully Updated",:user=>@user.to_a[0]}
    else
      render :json => {status:200,msg:"Successfully Updated",:user=>@user.to_a[0]}
    end
  end
  def updateUserPassword
    @data=params
    @user=User.find_by({"Email"=>@data["Email"]}).to_a
    if @user.length>0
      if @user[0]["Password"]==@data["OldPassword"]
        @user[0]["Password"]=@data["NewPassword"]
        @user[0].save
        render :json => {status:200,msg:"Successfully Updated"}
      else
        render :json => {status:200,msg:"wrong password"}
      end
    else
      render :json => {status:200,msg:"user not found"}
    end

  end
  def getUserLevel
    @data=params["data"]
    # @data['UserChoices'].delete_at(@data['UserChoices'].index 7)
    if @data['total_cl_compentency_per'].present? && @data['total_cl_compentency_per'] > 0 && @data['total_cl_compentency_per'] < 5
      @data['UserChoices'][6] = @data['total_cl_compentency_per']
    end
    begin
      @user=Hash.new
      if true
        @user["Experience"]=@data["Experience"].to_i
        @user["Education"]=@data["Education"]
        @user["Role"]=@data["Role"]
        @user["Industry"]=@data["Industry"]
        @user["Institute"]=@data["Institute"]
        @user["Company"]=@data["Company"]
        @user["Score"]=@data["Score"]
        @user["Level"]=0
        @user["Salary"]=@data["Salary"].to_f
        @user["CompanyDetails"]=@data["CompanyDetails"]
        @user["UserChoices"]=@data["UserChoices"]
        if(@data.has_key?('EffectiveLevel'))
          @user["EffectiveLevel"]=@data["EffectiveLevel"]
        else
          @user["EffectiveLevel"]=0
        end

        @userSelection=Hash.new
        if @user["CompanyDetails"].is_a?(Array)
          # params["CompanyDetails"]=params["CompanyDetails"]
          @userSelection[1]=@user["CompanyDetails"][0]
          @userSelection[2]=[@user["CompanyDetails"][1],@user["CompanyDetails"][2]]
        else
          # @user["CompanyDetails"]=params["CompanyDetails"]==[]?@user["CompanyDetails"]:(@data["CompanyDetails"].to_s.split(',').map {|i| i.to_i})
          @choices=@user["CompanyDetails"].to_s.split(',')
          @userSelection[1]=@choices[0]
          @userSelection[2]=[@choices[1],@choices[2]]
        end

        if @user["UserChoices"].is_a?(Array)
          # @user["UserChoices"]=@data["UserChoices"]
          @userSelection[4]=@user["UserChoices"][0]
          @userSelection[5]=@user["UserChoices"][1]
          for uc in 2..@user["UserChoices"].length-1
            @userSelection[uc+4]=@user["UserChoices"][uc]
          end
          if @userSelection.count>=20
            @user["Level"]=CLCalculation(@userSelection,@user["Industry"].to_s.squish)
          else
            @user["Level"]=0
          end
        else
          # @user["UserChoices"]=@data["UserChoices"]==[]?@user["UserChoices"]:(@data["UserChoices"].to_s.split(',').map {|i| i.to_i})
          @choices=@user["UserChoices"].to_s.split(',')
          @userSelection[4]=@choices[0].to_i
          @userSelection[5]=@choices[1].to_i
          for uc in 2..@choices.length-1
            @userSelection[uc+4]=@choices[uc].to_i
          end
          if @userSelection.count>=20
            @user["Level"]=CLCalculation(@userSelection,@user["Industry"].to_s.squish)
          else
            @user["Level"]=0
          end
        end
        if @user["Level"]!=nil && @user["Level"]>0
          UserGuest.create(@user)
        end
        render :json => {status:200,level:@user["Level"]}
      end
    rescue Exception => ex
      render :json => {status:501,msg:"Internal Server Error"}
      puts ex.message
    end



  end
def checkUser
  @data=params["data"]
  @email=""
  if params["data"].has_key?('email')
    @email=@data['email']
  else
    @email=@data['Email']
  end
  begin
    @user=Hash.new
    @user1=User.where("Email"=>@email).to_a
    if @user1.length==0
      render :json => {status: 200, isNew:true,msg:"User not found."}
    else
      render :json => {status: 200, isNew:false,msg:"The email address you have entered is already registered."}
    end
  rescue Exception => ex
    render :json => {status:501,msg:"Internal Server Error"}
    puts ex.message
  end
end

def SignUpForm
  render 'users/SignUpForm', layout: 'blank'
end
  private
  def CLCalculation(inputs, userIndustry)
    #inputs should be of the form {1=>1(regional)/2(national)/3(1-5 countries)/4 (global),2=>[numEmployess,Revenues],4=>1/2/3/4/5...11,5=>[1/2/3/4/5,value if 5]...,21=>1/2/3/4/5/6}
    #Calculate score for Question 2-----------------------------------------------
    #---revenue score
    q2Revenue = 0
    userRevenue = inputs[2][1]
    sncTable1 = [[0.002625,	0.00525,	0],
                 [0.00525,	0.0105,	1],
                 [0.0105,	0.021,	2],
                 [0.021,	0.042,	3],
                 [0.042,	0.0875,	4],
                 [0.0875,	0.175,	5],
                 [0.175,	0.35,	6],
                 [0.35,	0.7,	7],
                 [0.7,	1.4,	8],
                 [1.4,	2.8,	9],
                 [2.8,	5.6,	10],
                 [5.6,	11.2,	11],
                 [11.2,	22.4,	12],
                 [22.4,	44.8,	13],
                 [44.8,	89.6,	14],
                 [89.6,	179.2,	15],
                 [179.2,	358.4,	16],
                 [358.4,	716.8,	17],
                 [716.8,	1433.6,	18],
                 [1433.6,	2867.2,	19],
                 [2867.2,	5734.4,	20],
                 [5734.4,	11468.8,	21],
                 [11468.8,	22937.6,	22],
                 [22937.6,	45875.2,	23],
                 [45875.2,	91750.4,	24],
                 [91750.4,	183500.8,	25],
                 [183500.8,	367001.6,	26],
                 [367001.6,	734003.2,	27],
                 [734003.2,	1468006.4,	28]]
    sncTable1.each do |row|
      if userRevenue >= row[0] && userRevenue < row[1]
        q2Revenue = row[2]
        break
      end
    end
    if userRevenue >= 1468006.4
      q2Revenue = 28
    end
    #---employee score
    q2Employee = 0
    userEmployees = inputs[2][0]
    sncTable2 = [[0,	150,	0],
                 [150,	300,	1],
                 [300,	60,	2],
                 [60,	1250,	3],
                 [1250,	2500,	4],
                 [2500,	5000,	5],
                 [5000,	10000,	6],
                 [10000,	20000,	7],
                 [20000,	40000,	8],
                 [40000,	80000,	9],
                 [80000,	160000,	10],
                 [160000,	320000,	11],
                 [320000,	640000,	12],
                 [640000,	1280000,	13],
                 [1280000,	2560000,	14],
                 [2560000,	5120000,	15],
                 [5120000,	10240000,	16],
                 [10240000,	20480000,	17],
                 [20480000,	40960000,	18],
                 [40960000,	81920000, 19]]
    sncTable2.each do |row|
      if userEmployees >= row[0] && userEmployees < row[1]
        q2Employee = row[2]
        break
      end
    end
    if userEmployees >= 81920000
      q2Employee = 19
    end
    #Calculate score for Question 1------------------------------------------------
    #---identify industry complexity
    sncTable3 = {"Accounting" => "High",
                 "Airlines/Aviation" => "High",
                 "Agri Industry" => "Basic",
                 "Alternative Dispute Resolution" => "High",
                 "Alternative Medicine" => "Moderate",
                 "Animation" => "High",
                 "Apparel & Fashion" => "High",
                 "Architecture & Planning" => "High",
                 "Arts and Crafts" => "High",
                 "Automotive" => "Moderate",
                 "Aviation & Aerospace" => "High",
                 "Banking" => "Moderate",
                 "BFSI" => "Moderate",
                 "Biotechnology" => "High",
                 "Broadcast Media" => "High",
                 "Building Materials" => "Basic",
                 "Business Supplies and Equipment" => "Moderate",
                 "Capital Markets" => "High",
                 "Chemicals" => "Basic",
                 "Civic & Social Organization" => "Moderate",
                 "Civil Engineering" => "Moderate",
                 "Commercial Real Estate" => "Moderate",
                 "Computer & Network Security" => "High",
                 "Computer Games" => "High",
                 "Computer Hardware" => "High",
                 "Computer Networking" => "High",
                 "Computer Software" => "High",
                 "Construction" => "Moderate",
                 "Consumer Durables" => "Moderate",
                 "Consumer Electronics" => "High",
                 "Consumer Goods" => "Moderate",
                 "Consumer Services" => "High",
                 "Cosmetics" => "High",
                 "Dairy" => "Basic",
                 "Defense & Space" => "High",
                 "Design" => "High",
                 "Education Management" => "Moderate",
                 "e-Learning" => "High",
                 "e-Commerce" => "High",
                 "Electrical/Electronic Manufacturing" => "High",
                 "Entertainment" => "High",
                 "Environmental Services" => "Moderate",
                 "Events Services" => "High",
                 "EPC" => "Moderate",
                 "Executive Office" => "High",
                 "Facilities Services" => "Moderate",
                 "Farming" => "Basic",
                 "Financial Services" => "High",
                 "Fine Art" => "High",
                 "Fishery" => "Basic",
                 "FMCG" => "Moderate",
                 "Food & Beverages" => "Moderate",
                 "Food Production" => "Moderate",
                 "Fund-Raising" => "High",
                 "Furniture" => "Moderate",
                 "Gambling & Casinos" => "Moderate",
                 "Glass, Ceramics & Concrete" => "Moderate",
                 "Government Administration" => "Basic",
                 "Government Relations" => "Basic",
                 "Graphic Design" => "High",
                 "Health, Wellness and Fitness" => "Moderate",
                 "Health Care" => "High",
                 "Heavy Industry" => "Moderate",
                 "Higher Education" => "Moderate",
                 "Hospital & Health Care" => "High",
                 "Hospitality" => "High",
                 "Human Resources" => "Moderate",
                 "Import and Export" => "High",
                 "Individual & Family Services" => "High",
                 "Industrial Automation" => "High",
                 "Information Services" => "High",
                 "Information Technology and Services" => "High",
                 "Infrastructure" => "Moderate",
                 "ITES" => "High",
                 "Insurance" => "Moderate",
                 "International Affairs" => "High",
                 "International Trade and Development" => "High",
                 "Internet" => "High",
                 "Investment Banking" => "High",
                 "Investment Management" => "High",
                 "Judiciary" => "Basic",
                 "Law Enforcement" => "High",
                 "Law Practice" => "High",
                 "Legal Services" => "High",
                 "Legislative Office" => "High",
                 "Leisure, Travel & Tourism" => "High",
                 "Libraries" => "Moderate",
                 "Logistics and Supply Chain" => "Moderate",
                 "Luxury Goods & Jewelry" => "High",
                 "Machinery" => "Moderate",
                 "Management Consulting" => "High",
                 "Manufacturing" => "Moderate",
                 "Maritime" => "Moderate",
                 "Market Research" => "High",
                 "Marketing and Advertising" => "High",
                 "Mechanical or Industrial Engineering" => "Moderate",
                 "Media Production" => "High",
                 "Medical Devices" => "High",
                 "Medical Practice" => "High",
                 "Mental Health Care" => "High",
                 "Military" => "High",
                 "Mining & Metals" => "Basic",
                 "Motion Pictures and Film" => "Moderate",
                 "Museums and Institutions" => "Basic",
                 "Music" => "High",
                 "Nanotechnology" => "High",
                 "Newspapers" => "Moderate",
                 "Non-Profit Organization Management" => "Moderate",
                 "Oil & Energy" => "Basic",
                 "Oil & Gas" => "Basic",
                 "Online Media" => "High",
                 "Outsourcing/Offshoring" => "High",
                 "Package/Freight Delivery" => "Moderate",
                 "Packaging and Containers" => "Moderate",
                 "Paper & Forest Products" => "Basic",
                 "Performing Arts" => "High",
                 "Pharmaceuticals" => "High",
                 "Philanthropy" => "Basic",
                 "Photography" => "High",
                 "Plastics" => "Basic",
                 "Political Organization" => "High",
                 "Power & Energy" => "Basic",
                 "Primary/Secondary Education" => "Moderate",
                 "Printing" => "Moderate",
                 "Professional Training & Coaching" => "High",
                 "Professional Services" => "High",
                 "Program Development" => "High",
                 "Public Policy" => "High",
                 "Public Relations and Communications" => "High",
                 "Public Safety" => "High",
                 "Publishing" => "High",
                 "Railroad Manufacture" => "Basic",
                 "Ranching" => "Basic",
                 "Real Estate" => "Moderate",
                 "Recreational Facilities and Services" => "High",
                 "Religious Institutions" => "Basic",
                 "Renewables & Environment" => "High",
                 "Research" => "High",
                 "Restaurants" => "High",
                 "Retail" => "High",
                 "Security and Investigations" => "High",
                 "Semiconductors" => "High",
                 "Shipbuilding" => "High",
                 "Shipping" => "Moderate",
                 "Sporting Goods" => "Moderate",
                 "Sports" => "High",
                 "Staffing and Recruiting" => "High",
                 "Supermarkets" => "High",
                 "Telecommunications" => "High",
                 "Textiles" => "Basic",
                 "Think Tanks" => "High",
                 "Tobacco" => "Basic",
                 "Translation and Localization" => "Basic",
                 "Transportation/Trucking/Railroad" => "Moderate",
                 "Transportation" => "Moderate",
                 "Trading" => "Moderate",
                 "Utilities" => "Basic",
                 "Venture Capital & Private Equity" => "High",
                 "Veterinary" => "Basic",
                 "Warehousing" => "Basic",
                 "Wholesale" => "Basic",
                 "Wine and Spirits" => "Basic",
                 "Wireless" => "High",
                 "Writing and Editing" => "Moderate"}
    complexity = sncTable3[userIndustry]
    #---calculate score
    region = inputs[1] - 1
    sncTable4 = {"Basic" =>	[0,	1,	2,	3],
                 "Moderate" =>	[2,	3,	4,	5],
                 "High" =>	[4,	5,	6,	7]}
    q1 = sncTable4[complexity][region]
    #get size multiplier----------------------------------------------------------
    sncTable5 ={1 => 0.23,
                2 => 0.33,
                3 => 0.38,
                4 => 0.43,
                5 => 0.53,
                6 => 0.63,
                7 => 0.68,
                8 => 0.73,
                9 => 0.83,
                10 => 0.88,
                11 => 0.93,
                12 => 1.03,
                13 => 1.13,
                14 => 1.18,
                15 => 1.23,
                16 => 1.32,
                17 => 1.37,
                18 => 1.42,
                19 => 1.52,
                20 => 1.62,
                21 => 1.67,
                22 => 1.72,
                23 => 1.82,
                24 => 1.92,
                25 => 1.97,
                26 => 2.02,
                27 => 2.12,
                28 =>	2.22,
                29 =>	2.32,
                30 =>	2.42,
                31 =>	2.52,
                32 =>	2.62,
                33 =>	2.72,
                34 =>	2.82,
                35 =>	2.92,
                36 =>	3.02}
    sncSum = (q1 + q2Employee + q2Revenue).round(0)
    if sncSum > 36
      sncSum = 36
    end
    multiplier = sncTable5[sncSum]
    #Calculate score for Question 4-----------------------------------------------
    respTable1 = {1 => 5,
                  2 => 10,
                  3 => 20,
                  4 => 25,
                  5 => 30,
                  6 => 40,
                  7 => 60,
                  8 => 70,
                  9 => 80,
                  10 => 90,
                  11 => 100}
    q4 = respTable1[inputs[4]]
    #Calculate score for Question 5-----------------------------------------------
    respTable2a = {1 => 0, 2 => 1, 3 => 3, 4 => 6}#1 = 0, 2 = 1-10, 3 = 11-100, 4 = 101-1000, 5 = >=1001
    respTable2b = [[1001, 10000, 12], [10001, 100000, 25], [100001, 10000000000, 50]]
    numReports = inputs[5][0]
    q5 = 0
    if numReports != 5
      q5 = respTable2a[numReports]
    else
      numReportsValue = inputs[5][1]
      respTable2b.each do |row|
        if numReportsValue >= row[0] && numReportsValue <= row[1]
          q5 = row[2]
          break
        end
      end
    end
    #Calculate score for Question 6-----------------------------------------------
    respTable3 = {1 => 0, 2 => 3, 3 => 6, 4 => 12, 5 => 25, 6 => 50}
    q6 = respTable3[inputs[6]]
    #Calculate score for Question 7-----------------------------------------------
    respTable4 = {1 => 0, 2 => 16, 3 => 50, 4 => 75, 5=> 100}
    q7 = respTable4[inputs[7]]
    #Calculate score for Question 8-----------------------------------------------
    respTable5 = {1	=>	5,
                  2	=>	10,
                  3	=>	20,
                  4	=>	30,
                  5	=>	40,
                  6	=>	50,
                  7	=>	75,
                  8	=>	100}
    q8 = respTable5[inputs[8]]
    #Total responsibility score---------------------------------------------------
    respScore = q4 + q5 + q6 + q7 + q8
    #Calculate score for Question 9 and 10----------------------------------------
    effTable1 = {1 => [1, 5, 10,	25],
                 2 => [5, 10, 25, 50],
                 3 => [10,	25,	50,	100],
                 4 => [50,	100, 150,	200]}
    a10 = inputs[10]
    a9 = inputs[9]
    q9_10 = effTable1[a10][a9-1]#technical competance
    #Calculate score for Question 11 and 12----------------------------------------------
    effTable2 = {1 =>	2,
                 2	=> 4,
                 3	=> 6,
                 4	=> 8,
                 5	=> 10,
                 6	=> 12,
                 7	=> 14,
                 8	=> 16,
                 9	=> 18,
                 10 =>	20}
    q11 = effTable2[inputs[11]]
    q12 = effTable2[inputs[12]]
    #Calculate score for Questions 13 to 16---------------------------------------
    q13 = inputs[13]
    q14 = inputs[14]
    q15 = inputs[15]
    q16 = inputs[16]
    #Calculate Business Competance score------------------------------------------
    competanceScore = q11 + q12 + q13 + q14 + q15 + q16
    #Calculate scores for quesions 17 to 22---------------------------------------
    impTable = {1 => 0,	2 => 5,	3 => 10, 4 =>	20,	5 => 35, 6 =>	50}
    q17 = impTable[inputs[17]]
    q18 = impTable[inputs[18]]
    q19 = impTable[inputs[19]]
    q20 = impTable[inputs[20]]
    q21 = impTable[inputs[21]]
    q22 = impTable[inputs[22]]
    #Calculate Impact score-------------------------------------------------------
    impactScore = (q17 + q18 + q19 + q20 + q21 + q22) * multiplier
    #Calculate CL points----------------------------------------------------------
    clPoints = respScore + q9_10 + competanceScore + impactScore
    #print respScore,"\n",q9_10 + competanceScore,"\n",impactScore,"\n"
    #Calculate CL-----------------------------------------------------------------
    cl = 0
    clTable = [[0,4,8],
               [5,29,9],
               [30,54,10],
               [55,79,11],
               [80,104,12],
               [105,129,13],
               [130,154,14],
               [155,179,15],
               [180,204,16],
               [205,229,17],
               [230,254,18],
               [255,279,19],
               [280,304,20],
               [305,329,21],
               [330,354,22],
               [355,379,23],
               [380,404,24],
               [405,429,25],
               [430,454,26],
               [455,479,27],
               [480,504,28],
               [505,529,29],
               [530,554,30],
               [555,579,31],
               [580,604,32],
               [605,629,33],
               [630,654,34],
               [655,679,35],
               [680,704,36],
               [705,729,37],
               [730,754,38],
               [755,779,39],
               [780,804,40],
               [805,829,41],
               [830,854,42],
               [855,879,43],
               [880,904,44],
               [905,929,45],
               [930,954,46],
               [955,979,47],
               [980,1004,48],
               [1005,1029,49],
               [1030,1054,50],
               [1055,1079,51],
               [1080,1104,52],
               [1105,1129,53],
               [1130,1154,54],
               [1155,1179,55],
               [1180,1204,56],
               [1205,1229,57],
               [1230,1254,58],
               [1255,1279,59],
               [1280,1304,60],
               [1305,1329,61],
               [1330,1354,62],
               [1355,1379,63],
               [1380,1404,64],
               [1405,1429,65],
               [1430,1454,66],
               [1455,1479,67],
               [1480,1504,68],
               [1505,1529,69],
               [1530,1554,70],
               [1555,1579,71],
               [1580,1604,72],
               [1605,1629,73],
               [1630,1654,74],
               [1655,1679,75],
               [1680,1704,76],
               [1705,1729,77],
               [1730,1754,78],
               [1755,1779,79],
               [1780,1804,80],
               [1805,1829,81],
               [1830,1854,82],
               [1855,1879,83],
               [1880,1904,84],
               [1905,1929,85],
               [1930,1954,86],
               [1955,1979,87],
               [1980,2004,88],
               [2005,2029,89],
               [2030,2054,90],
               [2055,2079,91],
               [2080,2104,92],
               [2105,2129,93],
               [2130,2154,94],
               [2155,2179,95],
               [2180,2204,96],
               [2205,2229,97],
               [2230,2254,98],
               [2255,2279,99],
               [2280,2304,100],
               [2305,2329,101],
               [2330,2354,102],
               [2355,2379,103]]
    clPoints = clPoints.round(0)
    clTable.each do |row|
      if clPoints >= row[0] && clPoints <= row[1]
        cl = row[2]
        break
      end
    end
    return cl
  end


#testing------------------------------------------------------------------------
end
