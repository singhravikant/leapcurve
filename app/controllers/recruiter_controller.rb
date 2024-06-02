class RecruiterController < ApplicationController
  layout 'recruiter'
  def registration
    begin
      if session.has_key?('User') && session[:User]['islogin']
        redirect_to corporate_dashboard_path
      else
        indPath = $filePath + "industries.txt"
        funPath = $filePath + "functions.txt"
        file = open(indPath, 'r')
        text = file.read
        file.close
        @allInd = [];
        @allInd = text.split("\n")
        @allInd = @allInd.sort
        file = open(funPath, 'r')
        text = file.read
        file.close
        @allFun = [];
        @allFun = text.split("\n")
        @allFun = @allFun.sort
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end
  def sign_up

    begin
      @result = RecruiterUser.where("email" => params[:email]).to_a
      @result1 = CorporateUser.where("email" => params[:email]).to_a
      @cmpData = CorporateCompany.find_by('company_name' => @company_name)
      if @result.length == 0&&@result1.length == 0
        @user1 = Hash.new
        uId = 'uId_' + (((Time.now.to_f) * 1000).to_i).to_s
        cId = 'cId_' + (((Time.now.to_f) * 1000).to_i).to_s
        @company_name = params[:company_name]
        @cmpData = CorporateCompany.find_by('company_name' => @company_name)
        if @cmpData.nil?
          @company = Hash.new

          # @company["email"] = params[:email]
          @company["company_id"] = cId
          @company["company_name"] = params[:company_name].to_s.downcase
          @company["no_of_employees"] = params[:no_of_emp]
          @company["revenue"] = params[:annual_revenue]
          @company["geographical_Spread"] = params[:geographical_Spread]
          @company["industry"] = params[:industry_name]
          @company["users"] = {uId => params[:email]}
          @company["roles"] = {}
          @company["responses"] = Array.new
          @company["members"] = {uId => 'Master'}
          @savedb = CorporateCompany.create(@company)

          @user1["user_id"] = uId
          @user1["company_id"] = cId
          @user1["user_first_name"] = params[:first_name]
          @user1["user_last_name"] = params[:last_name]
          @user1["designation"] = params[:designation]
          @user1["password"] = params[:password]
          @user1["email"] = params[:email]
          @user1["members"] = Hash.new
          @user1["usertype"] = "Master"
          @user1['add_permissions_selective'] = {}
          @user1['update_permissions_selective'] = {}
          @user1['delete_permission_selective'] = {}

          @issignup = RecruiterUser.create(@user1)
          # @bool = @issignup.save()
          if !@issignup.nil?
            flash[:success] = "Signed up successfully"
            # redirect_to '/corporate/login'
            redirect_to '/#!/page/index#home3'
          else
            flash[:success] = "Email is already registered"
            redirect_to '/corporate/registration'
          end
        else
          flash[:success] = "Company is already registered"
          redirect_to '/corporate/registration'
          # cId=@cmpData['company_id']
          # @cmpData['users'][uId] = params[:email]
          # @users=@cmpData['users']
          # CorporateCompany.where(:company_name=> params[:company_name].to_s.downcase).update(:users=>@users)
        end

      else
        flash[:success] = "Email is already registered"
        redirect_to '/corporate/registration'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end
  def reset_password
    if session['user_type']=='recruiter'
      user = RecruiterUser
    else
      user = CorporateUser
    end
    @isvalid = RecruiterUser.find_by(:forgot_token => params['token'])
    if @isvalid.nil?
      flash[:success] = "This Link Has Been Expired!"
      redirect_to '/#!/page/index#home3'
    end
  end

  def set_password
    begin
      if session['user_type']=='recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      password = params['password']
      @user = RecruiterUser.find_by(:forgot_token => params['token'])
      if !@user.nil?
        @user['password'] = password
        @user['forgot_token'] = ""
        issave = @user.save
        if issave
          flash[:success] = "Password Successfully Reset!!"
          redirect_to '/#!/page/index#home3'
        end
      else
        flash[:success] = "This Link Has Been Expired!"
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end
end
