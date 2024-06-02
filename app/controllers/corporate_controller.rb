class CorporateController < ApplicationController
  layout 'corporate'

  def get_seo
    action = params['path']
    if $da_path == "leapCurveTest"
      client = Mongo::Client.new(['103.90.241.54:20189'], :database => 'leapCurveTest', :user => 'leapcurvedb', :password => 'leapcurve@54db', :auth_source => 'admin')
    else
      client = Mongo::Client.new(['103.90.241.122:57017'], :database => 'mylestone', :user => 'mylestone', :password => 'mylestone123', :auth_source => 'admin')
    end
    db = client.use($da_path)
    @db_data = Hash.new
    @db_data = client[:seo_collection].find.each {|doc|
      if doc.include?('page') && action.include?(doc['page'])
        @results = {'title' => doc['title'],
                    'description' => doc['description'],
                    'keyword' => doc['keyword']}
        break
      else
        @results = {}
      end

    }

    client.close
    respond_to do |format|
      format.js {render :js => "#{@results}"}
    end
  end

  def error_page
    render layout: false
  end

  def send_log_mail
    begin
      @date = Date.today
      @path = Rails.root.to_s + '/log/logs_' + @date.to_s + '.log'
      # @path ='E:/prankur/prankur projects/project backup/october/17-10-2018/LeapCurve_Test/log/logs_' + @date.to_s + '.log'
      ApplicationMailer.send_file_log('aanchal@algowire.com', @path).deliver
      render json: {status: 200, msg: "'Logs successfully send!'"}
    rescue Exception => ex
      puts ex.message
      render json: {status: 200, msg: "'Logs successfully send!'"}
    end
  end

  def send_applicant_mail(msg)
    begin
      @date = Date.today
      # @path = '/var/www/html/LeapCurve_Test/log/logs_' + @date.to_s + '.log'
      # @path ='E:/prankur/prankur projects/project backup/october/17-10-2018/LeapCurve_Test/log/logs_' + @date.to_s + '.log'
      ApplicationMailer.send_applicant_mail('aanchal@algowire.com', @path, msg).deliver
      return false
    rescue Exception => ex
      puts ex.message
      return false
    end
  end

  def login
    begin
      # session[:User]={'islogin'=>false}
      if session.has_key?('User') && session[:User]['islogin']
        redirect_to corporate_dashboard_path
      else
        session[:User] = {'islogin' => false};
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def assessor_questionnaire
    begin
    rescue Exception => ex
      puts ex.to_s
    end
  end

  def add_role_info
    begin
      if session.has_key?('User') && session[:User]['islogin']
        @name = session[:User]['Name']
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
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def edit_question
    begin
      data = params
      @edit_que = Hash.new
      @session = session['User']
      @currentRole = CorporateRole.find_by(:role_id => data['role_id'])
      if !@session['que_optional'].nil? && @session['que_optional'][data['toEdit']].present?
        @edit_que[data['toEdit']] = @session['que_optional'][data['toEdit']]
      elsif !@currentRole.nil? && @currentRole['que_optional'][data['toEdit']].present?
        @edit_que[data['toEdit']] = @currentRole['que_optional'][data['toEdit']]

      end
      json = @edit_que.to_s.gsub('=>', ':').gsub("nil", 'null')
      d = Array.new
      d[0] = json
      data = JSON.parse(d.to_s)
      respond_to do |format|
        format.js {render :js => "#{data}"}
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def delete_question
    data = params
    @session = session['User']
    if data['role_id'].present?
      @currentRole = CorporateRole.find_by(:role_id => data['role_id'])
      if !@session['que_optional'].nil? && @session['que_optional'][data['toDelete']].present?
        @session['que_optional'].delete(data['toDelete'])
        session['User'] = @session
      elsif !@currentRole.nil? && @currentRole['que_optional'][data['toDelete']] && data['permanent'] == "true"
        @currentRole['que_optional'].delete(data['toDelete'])
        CorporateRole.where(:role_id => data['role_id']).update(:que_optional => @currentRole['que_optional'])
      end
    elsif @session['que_optional'][data['toDelete']].present?
      @session['que_optional'].delete(data['toDelete'])
      session['User'] = @session
    end
  end

  def add_question
    begin
      @session = session['User']
      que = details = params
      @que_optional = Hash.new
      @question = Hash.new
      @id = ((Time.now.to_f * 1000).to_i).to_s
      @question['question'] = que['question']
      @question['type'] = que['que_type']
      @question['keywords'] = que['keywords']
      @question['options'] = que['options']
      @question['required'] = que['required']
      @que_optional[@id] = @question
      @session['que_optional'][@id] = @question
      @session['que_id'] = @id
      # session['User']=@session
      # puts @session
      # respond_to do |format|
      #   format.json
      render :json => {:html => render_to_string(partial: 'que_optional'),
                       :id => @id}
        # end

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end


  def salary_report
    begin
      if session.has_key?('User') && session[:User]['islogin']
        @session = session[:User]
        @name = session[:User]['Name']
        @roleid = params[:roleid]
        @role = CorporateRole.find_by('role_id' => @roleid)
        userIndustry = @role['role_industry'].strip
        # puts userIndustry
        inputs = Array.new
        if @session['geographical_Spread'] == 'Regional (1-5 States)'
          inputs[1] = 1
        elsif @session['geographical_Spread'] == 'National (5+ States)'
          inputs[1] = 2
        elsif @session['geographical_Spread'] == 'International (1-5 Countries)'
          inputs[1] = 3
        elsif @session['geographical_Spread'] == 'Global (5+ Countries)'
          inputs[1] = 4
        end
        inputs[2] = [@session['no_of_employees'], @session['revenue']]
        if @role['seniority'] == 'Junior Management (Typically entry level professionals)'
          inputs[3] = 0
        elsif @role['seniority'] == 'Senior Management (Typically third level)'
          inputs[3] = 1
        elsif @role['seniority'] == 'Middle Management (If you have someone reporting to you who is NOT a workman)'
          inputs[3] = 2
        elsif @role['seniority'] == 'Top Management (Typically top 2 levels)'
          inputs[3] = 3
        end
        a = 4
        @role['questions'].each do |k, v|
          if (a == 5)
            inputs[a] = [v.to_i, 0]
          else
            inputs[a] = v.to_i
          end

          a += 1
        end
        @cl = CLCalculation(inputs, userIndustry)
        userFunction = @role['role_function'].strip
        userCompany = @session['company_name']
        @out1, @out2, @out3 = getSalComp(@cl, userIndustry, userFunction, userCompany);

        if @out1["Industry and Function"].length != 0
          @indfun = true
        end
        if @out1["Function"].length != 0
          @fun = true
        end
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def summary_report
    begin
      if session.has_key?('User') && session[:User]['islogin']
        if session.has_key?('User') && session[:User]['islogin']
          @session = session[:User]
          @roleid = params[:roleid]
          @role_keys = Hash.new
          @role = CorporateRole.find_by('role_id' => @roleid)
          if !(@role['partial'].present?)
            userIndustry = @role['role_industry'].strip
            if !@role['cl_data'].present?
              cl_data = rolecl(@role)
              CorporateRole.where(:role_id => @roleid).update(:cl_data => cl_data)
            else
              cl_data = @role['cl_data']
            end
            @cl = cl_data[0]
            @role['cl'] = @cl
            @role['res_score'] = cl_data[1][0]
            @role['eff_score'] = cl_data[1][1]
            @role['imp_score'] = cl_data[1][2]
            if @cl == 'partial' || @role['res_score'].is_a?(String)
              flash['success'] = 'This Role is Partially Filled!'
              if params['page'].present? && params['page'] == '1'
                redirect_to '/corporate/dashboard'
              elsif params['page'].present? && params['page'] == '2'
                redirect_to '/corporate/summary_report/' + @applicant['roleid'] + '#hide-3'
              end

            end
            userFunction = @role['role_function'].strip
            userCompany = @session['company_name']
            if !(@cl == 'partial')
              @out1, @out2, @out3 = getSalComp(@cl, userIndustry, userFunction, userCompany);
              @fun = false
              @indfun = false
              if @out1["Industry and Function"].length != 0
                @indfun = true
              end
              if @out1["Function"].length != 0
                @fun = true
              end
              @case1 = false
              @case2 = false
              @case3 = false
              @case4 = false
              if (!@out1['Industry and Function'].empty? || !@out1['Function'].empty?) && (!@out2['Industry and Function'].empty? || !@out2['Function'].empty?) && (!@out3['Industry and Function'].empty? || !@out3['Function'].empty?)
                @case1 = true
              elsif (!@out1['Industry and Function'].empty? || !@out1['Function'].empty?) && (@out2['Industry and Function'].empty? || @out2['Function'].empty?) && (@out3['Industry and Function'].empty? || @out3['Function'].empty?)
                @case2 = true
              elsif (@out1['Industry and Function'].empty? || @out1['Function'].empty?)
                tries = [1, -1, 2, -2]
                n = 0
                while @out1["Industry and Function"] == [] && @out1["Function"] == [] && n < 4
                  @out1, @out2, @out3 = getSalComp(@cl + tries[n], userIndustry, userFunction, userCompany)
                  if (!@out1['Industry and Function'].empty? || !@out1['Function'].empty?) || (!@out2['Industry and Function'].empty? || !@out2['Function'].empty?) || (!@out3['Industry and Function'].empty? || !@out3['Function'].empty?)
                    @case3 = true
                    @case4 = false
                    @fun = false
                    @indfun = false
                    @avcl = @cl + tries[n]
                    if @out1["Industry and Function"].length != 0
                      @indfun = true
                    end
                    if @out1["Function"].length != 0
                      @fun = true
                    end
                    break
                  elsif (@out1['Industry and Function'].empty? && @out1['Function'].empty?) && (@out2['Industry and Function'].empty? && @out2['Function'].empty?) && (@out3['Industry and Function'].empty? && @out3['Function'].empty?)
                    @case4 = true
                  end
                  n += 1
                end
              end
            end
            @allQues = CorporateQuestion.getques()
            @applicant = Hash.new
            @degree = Array.new
            @college = Array.new
            @skill = Array.new
            @app_keys = Hash.new
            @all_app_keys = Hash.new
            @role['responses'].each_with_index do |k, i|

              applicant = CorporateApplication.find_by('app_id' => k)
              if !applicant.nil?
                @candidatecl = clcandidate(applicant)
                applicant['cl'] = @candidatecl[0]
                applicant['res_score'] = @candidatecl[1][0]
                applicant['eff_score'] = @candidatecl[1][1]
                applicant['imp_score'] = @candidatecl[1][2]
                # if applicant['Resume'].present? && applicant['Resume'].length >= 1
                #   r_data = resume_data(applicant['app_id'])
                #   if !r_data.nil?
                #     applicant['Resume'] = r_data
                #   else
                #     applicant['Resume'] = []
                #   end
                # else
                #   applicant['Resume'] = []
                # end
                if applicant['Degree'].instance_of?(Array)

                  applicant['Degree'].each do |key|
                    if !@degree.include?(key) && key != ""
                      @degree.push(key)
                    end
                  end
                elsif !@degree.include?(applicant['Degree'])
                  @degree.push(applicant['Degree'])
                  if applicant['Degree1'].present? && !(@degree.include?(applicant['Degree1']))
                    @degree.push(applicant['Degree1'])
                  end
                  if applicant['Degree2'].present? && !(@degree.include?(applicant['Degree2']))
                    @degree.push(applicant['Degree2'])
                  end
                end
                if applicant['Institutions'].instance_of?(Array)

                  applicant['Institutions'].each do |key|
                    if !@college.include?(key) && key != ""
                      @college.push(key)
                    end
                  end
                elsif !@college.include?(applicant['Institutions'])
                  @college.push(applicant['Institutions'])
                  if applicant['Degree1'].present? && !(@college.include?(applicant['Institutions1']))
                    @college.push(applicant['Institutions1'])
                  end
                  if applicant['Degree2'].present? && !(@college.include?(applicant['Institutions2']))
                    @college.push(applicant['Institutions1'])
                  end
                end
                if applicant['Technical_skills'].instance_of?(Array)
                  applicant['Technical_skills'].each do |key|
                    if !@skill.include?(key) && key != ""
                      @skill.push(key)
                    end
                  end
                end
                data = applicant.to_json
                @applicant[k] = JSON.parse(data).with_indifferent_access
                @app_keys[k] = ''
                @all_app_keys[k] = ''
              end
            end
            # export_data(@applicant)
            role = @role.to_json
            @myrole = JSON.parse(role).with_indifferent_access
            @role_keys[@myrole['role_id']] = ''
          else
            flash['success'] = 'This Role is Partially filled!'
            redirect_to corporate_dashboard_path
          end
        else
          flash[:success] = 'Please Do Log in First'
          redirect_to '/#!/page/index#home3'
        end
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def changefilter
    begin
      @filter = params['button']
      redirect_to '/corporate/summary_report/' + params['role_id'].to_s, :notice => @filter
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def invite_new_member
    begin
      if session.has_key?('User') && session[:User]['islogin']
        @name = session[:User]['Name']
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end


  def invite_member
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @user = user.find_by(:email => params[:email])
      if @user.nil?
        @token = SecureRandom.hex(16)
        @member = Hash.new
        @member['token'] = @token.to_s
        @member["member_id"] = 'member_id_' + ((Time.now.to_f * 1000).to_i).to_s
        @member["first_name"] = params[:first_name]
        @member["last_name"] = params[:last_name]
        @member["email"] = params[:email]
        @member["access_permission"] = params[:access_permission]
        @host_raw = request.original_url.to_s.split('/')
        @host = @host_raw[0].to_s + '//' + @host_raw[2]
        @sender = session['User']['Email']
        @name = session['User']['Name']
        @link = @host + '/corporate/new_team_member/?token=' + @token.to_s + '&sender=' + @sender
        CorporateTeamMember.create(@member)

        ApplicationMailer.new_team_member_invitation(@member["email"], @sender, @link, @name).deliver
        flash[:success] = 'Mail sent successfully'
        redirect_to '/corporate/dashboard/?page=3'
      else
        flash[:success] = "This Email is Already registered!"
        redirect_to '/corporate/invite_new_member'
      end

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end


  def my_account
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      if session.has_key?('User') && session[:User]['islogin']
        if session.has_key?('User') && session[:User]['islogin'].present? && session[:User]['islogin']
          @session = session['User']
          @account = user.find_by(:email => @session['Email'])
          @company = CorporateCompany.find_by(:company_id => @account['company_id'])
          # puts @account
        else
          flash['success'] = 'Please Do login First!'
          redirect_to '/#!/page/index#home3'
        end
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end


  def edit_account
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      if session.has_key?('User') && session[:User]['islogin']
        @session = session['User']
        indPath = $filePath + "industries.txt"
        funPath = $filePath + "functions.txt"
        file = open(indPath, 'r')
        text = file.read
        file.close
        @allInd = [];
        @allInd = text.split("\n")
        @allInd = @allInd.sort
        @allInd.each_with_index do |value, ind|
          @allInd[ind] = value.strip
        end


        file = open(funPath, 'r')
        text = file.read
        file.close
        @allFun = [];
        @allFun = text.split("\n")
        @allFun = @allFun.sort
        @account = user.find_by(:email => @session['Email'])
        @company = CorporateCompany.find_by(:company_id => @account['company_id'])
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def update_account
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @session = session['User']
      @account = user.find_by(:email => @session['Email'])
      @company = CorporateCompany.find_by(:company_id => @account['company_id'])
      # @company["company_id"] = cId
      @company["company_name"] = params[:company_name].to_s.downcase
      @company["no_of_employees"] = params[:no_of_emp]
      @company["revenue"] = params[:annual_revenue]
      @company["geographical_Spread"] = params[:geographical_Spread]
      @company["industry"] = params[:industry_name]
      # @company["users"] = {uId => params[:email]}
      # @company["roles"] = {}
      # @account["user_id"] = uId
      # @account["company_id"] = cId
      @account["user_first_name"] = params[:first_name]
      @account["user_last_name"] = params[:last_name]
      @account["designation"] = params[:designation]
      if !params[:password].nil?
        @account["password"] = params[:password]
      end
      @account["email"] = params[:email]
      issave1 = @company.save
      issave2 = @account.save

      if issave1 && issave2
        session[:User]['Name'] = @account['user_first_name']
        session[:User]['Email'] = @account['email']
        session[:User]['user_id'] = @account['user_id']
        session[:User]['company_id'] = @account['company_id']
        session[:User]['revenue'] = @company['revenue']
        session[:User]['no_of_employees'] = @company['no_of_employees']
        session[:User]['geographical_Spread'] = @company['geographical_Spread']
        session[:User]['company_name'] = @company['company_name']
        if params['update_cl'].present? && params['update_cl'] == "true"
          @company['roles'].each do |role_id, bool|
            role = CorporateRole.find_by(:role_id => role_id)
            cl_data = rolecl(role)
            role.update(cl_data: cl_data)
            role.save
          end
        end
        flash['success'] = 'Successfully Saved!'
        # redirect_to '/corporate/my_account'
        render json: {status: 200, msg: 'Successfully Saved!'}
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def login_status
    istrue = false
    if session['User']['islogin'] == true
      istrue = true
    end
    if istrue
      respond_to do |format|
        format.js {render :js => "true"}
      end
    else
      respond_to do |format|
        format.js {render :js => "false"}
      end
    end
  end

  def match_password
    if session['user_type'] == 'recruiter'
      user = RecruiterUser
    else
      user = CorporateUser
    end
    istrue = user.authenticate(session['User']['Email'], params['old_Password'])
    if istrue
      respond_to do |format|
        format.js {render :js => "true"}
      end
    else
      respond_to do |format|
        format.js {render :js => "false"}
      end
    end
  end

  def download_data
    begin
      data = params
      applicant = get_applicants(params['app_keys'])
      file_token = export_data(applicant)
      render json: {status: 200, data: file_token, msg: 'download pdf and csv!'}
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def export_data(applicant)
    begin
      applicant = applicant.to_s.gsub('=>', ':').to_s.gsub(':nil', ':""')
      applicant = JSON.parse(applicant)
      require 'csv'
      # applicant = params['applicant']

      require 'rubygems'
      require 'zip'
      download = SecureRandom.hex.to_s
      resume_zip = 'resume_' + download
      zip = Rails.root.to_s + '/public/resume_' + session['User']['download'].to_s + '.zip'
      if isexist = File.exist?(zip)
        File.delete(zip)
      end
      csv = Rails.root.to_s + '/public/candidate_' + session['User']['download'].to_s + '.csv'
      if isexist = File.exist?(csv)
        File.delete(csv)
      end
      session['User']['download'] = download


      #
      zipfile_name = Rails.root.to_s + "/public/#{resume_zip}.zip"

      Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
        applicant.each do |key, filename|
          generate_pdf = CorporateResume.get_pdf(filename['resume_id'])
          final_pdf = generate_pdf.data
          File.open(Rails.root.join('public', 'uploads', key + '.pdf'), 'wb') do |file|

            final_pdf = final_pdf.to_s + "%EOF"
            final_pdf.each_char do |char|
              file.write(char)
            end
          end
          zipfile.add(key + '.pdf', File.join(Rails.root.join('public', 'uploads', key + '.pdf')))
        end
        zipfile.get_output_stream("Readme") {|f| f.write "This file contains resume"}
      end
      # send_file(zipfile_name, :type => 'application/zip', :filename => "#{resume_zip}.zip")

      applicant = applicant.to_s.gsub('=>', ':').to_s.gsub(':nil', ':""')
      applications = JSON.parse(applicant)
      data = Array.new
      applications.each do |k, v|
        fil = Rails.root.to_s + '/public/uploads/' + k + '.pdf'
        File.delete(fil)
        content = v.delete('Resume')
        data.push(v)
      end
      if data.length != 0
        csv_filename = 'public/candidate_' + download + '.csv'
        CSV.open(csv_filename, "w") do |csv|
          csv << data.first.keys # adds the attributes name on the first line
          data.each do |hash|
            csv << hash.values
          end
        end
      else
        csv_filename = 'public/candidate_' + download + '.csv'
        CSV.open(csv_filename, "w") do |csv|
          csv << [] # adds the attributes name on the first line
          data.each do |hash|
            csv << {}
          end
        end
      end
      return download
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def change_password
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @password = ""
      @session = session['User']
      @password = params[:old_Password]
      @session = session['User']
      @email = @session['Email']
      if !@email.blank?
        if !@password.blank? && user.authenticate(@email, @password)
          @account = user.find_by(:email => @session['Email'])
          @account["password"] = params[:password]
          issave2 = @account.save
          if issave2
            flash['success'] = 'Successfully Saved!'
            redirect_to '/corporate/my_account'
          end
        else
          flash[:warning] = 'Please Enter Right Old Password !'
          redirect_to '/corporate/my_account'
        end
      else
        # flash[:warning] ='Email is wrong!'
        redirect_to '/corporate/login', :notice => 'Email is wrong!'
      end


    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end

  end

  def add_role_cl
    begin
      if session.has_key?('User') && session[:User]['islogin'].present? && session[:User]['islogin']
        @roleid = params[:roleid]
        @allQues = CorporateQuestion.getques()
      else
        flash['success'] = 'Please Do login First!'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message

    end
  end

  def getAllQuestion

    begin

      @roleid = params[:roleid]
      @data = Hash.new
      for i in 1..19 do
        ind = 'que' + i.to_s
        @data[ind] = params[ind]
      end
      @role = CorporateRole.find_by('role_id' => @roleid)
      @role['questions'] = @data
      @role.save
      #puts@data

      redirect_to '/corporate/add_role_candidate_info/' + @roleid.to_s

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts "caught exception #{ex}!"
    end

  end


  def get_jobs
    begin
      cl = params['cl']
      email = params['email']
      session[:applicant_email] = email
      @jobs = CorporateRole.getroles();
      @jobs = @jobs.select {|v|
        if v['cl_data'].present?
          v['cl_data'][0] == cl
        end
      }
      @jobs.each_with_index do |role, ind|
        company = CorporateCompany.find_by(:company_id => role['company_id'])
        @jobs[ind]['Company'] = company['company_name']
      end
      roles = []
      applicant = CorporateApplication.new.get_app(email)
      applicant.each do |app|
        roles.push(app['roleid'])
      end
      render json: {status: 200, jobs: @jobs, roles: roles}
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts "caught exception #{ex}!"
    end
  end

  def dashboard
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @session = session['User']
      if session.has_key?('User') && session[:User]['islogin']
        @allroles = Hash.new
        if params['page'].present?
          @page = params['page'].to_i
        end
        @name = session[:User]['Name']
        @company_id = session[:User]['company_id']
        # user.find_by(:email=>@email)
        # @allRoles=CorporateRole.getroles()
        @role_keys = Hash.new
        @data = CorporateCompany.find_by('company_id' => @company_id)
        if !@data['roles'].empty?
          @roles = @data['roles']
          @roles.each do |k, v|
            roles = CorporateRole.find_by('role_id' => k)
            if !roles.nil?
              @allroles[k] = roles
              @role_keys[k] = ''
            end
          end
        end

        @applicant = Hash.new
        @user = user.find_by('email' => @session['Email'])
        @members = Hash.new
        if @data['members'].present?
          @data['members'].each do |key, value|
            if @user['user_id'] != key
              @member = user.find_by(:user_id => key)
              @members[key] = @member
            end
          end
        end
        if !@data['responses'].empty?
          # @roles = @data['roles']
          # @roles.each do |key, value|
          #   @role = CorporateRole.find_by('role_id' => key)
          @unread = Hash.new
          @count = 0
          @app_keys = Hash.new
          @all_app_keys = Hash.new
          @data['responses'].each_with_index do |k, i|
            applicants = CorporateApplication.find_by('app_id' => k)
            if !applicants.nil?
              @applicant[k] = applicants
              if @unread[@applicant[k]['roleid']].nil?
                @unread[@applicant[k]['roleid']] = 0
              end
              if !applicants['isread'].nil? && applicants['isread'] == false
                @unread[@applicant[k]['roleid']] = @unread[@applicant[k]['roleid']] + 1
                @count = @count + 1
              end
              @candidatecl = clcandidate(@applicant[k])
              @applicant[k]['cl'] = @candidatecl[0]
              @applicant[k]['res_score'] = @candidatecl[1][0]
              @applicant[k]['eff_score'] = @candidatecl[1][1]
              @applicant[k]['imp_score'] = @candidatecl[1][2]
              # if @applicant[k]['Resume'].present? && @applicant[k]['Resume'].length >= 1
              #   r_data = resume_data(@applicant[k]['app_id'])
              #   if !r_data.nil?
              #     @applicant[k]['Resume'] = r_data
              #   else
              #     @applicant[k]['Resume'] = []
              #   end
              # else
              #   @applicant[k]['Resume'] = []
              # end
              data = @applicant[k].to_json
              @applicant[k] = JSON.parse(data).with_indifferent_access
              @app_keys[k] = ''
              @all_app_keys[k] = ''
            end
          end
          # end
        end
        # export_data(@applicant)
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def get_roles(role_keys)
    begin
      @roles = Hash.new
      role_keys = role_keys.to_s.gsub('=>', ':').to_s.gsub(':nil', ':""')
      role_keys = JSON.parse(role_keys)
      role_keys.each do |k, v|
        role = CorporateRole.find_by(:role_id => k)
        if !role.nil?
          role = role.to_json
          @role = JSON.parse(role).with_indifferent_access
          if !@role['cl_data'].present?
            cl_data = rolecl(@role)
            CorporateRole.where(:role_id => @roleid).update(:cl_data => cl_data)
          else
            cl_data = @role['cl_data']
          end
          cl = cl_data[0]
          @role['cl'] = cl
          @role['res_score'] = cl_data[1][0]
          @role['eff_score'] = cl_data[1][1]
          @role['imp_score'] = cl_data[1][2]
          # @role[k]=role
        end
      end
      return @role
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def get_applicants(app_keys)
    begin
      @application = Hash.new
      app_keys = app_keys.to_s.gsub('=>', ':').to_s.gsub(':nil', ':""')
      app_keys = JSON.parse(app_keys)
      app_keys.each do |k, v|
        applicants = CorporateApplication.find_by('app_id' => k)
        if !applicants.nil?
          @application[k] = applicants
          @candidatecl = clcandidate(@application[k])
          @application[k]['cl'] = @candidatecl[0]
          @application[k]['res_score'] = @candidatecl[1][0]
          @application[k]['eff_score'] = @candidatecl[1][1]
          @application[k]['imp_score'] = @candidatecl[1][2]
          data = @application[k].to_json
          @application[k] = JSON.parse(data).with_indifferent_access
        end
      end
      return @application
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def logout
    begin
      if session.has_key?('User') && session[:User]['islogin'].present? && session[:User]['islogin']
        session[:User] = {'islogin' => false};
        flash[:success] = 'Logged out successfully!'
        redirect_to '/#!/page/index#home3'
      else
        flash[:success] = 'Logged out successfully!'
        redirect_to '/#!/page/index#home3'
      end
      session['user_type'] = ''
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def corporate_login
    begin
      @email = ""
      @password = ""
      @email = params[:Email].downcase
      @password = params[:Password]
      user_type = 'corporate'
      user = CorporateUser.find_by(:email => @email)
      # if params['user_type'].present?&&params['user_type']=='recruiter'
      if !user.nil? && CorporateUser.authenticate(user['email'], @password)
        user = CorporateUser
      else
        user_type = 'recruiter'
        user = RecruiterUser
      end
      @result = user.find_by(:email => @email)
      @usertype = ""
      if !@result.nil?
        if @result['usertype'].present?
          @usertype = @result['usertype']
        end
        @companydata = CorporateCompany.find_by("company_id" => @result['company_id']).to_a
        if !@email.blank? && @email == @result['email']
          if !@password.blank? && user.authenticate(@result['email'], @password)
            # session[:user_name] = 'bhushan'
            session[:User] = {'Name' => @result['user_first_name'], 'islogin' => true, 'Email' => @email, 'user_id' => @result['user_id'], 'company_id' => @result['company_id'], 'revenue' => @companydata[0]['revenue'], 'no_of_employees' => @companydata[0]['no_of_employees'], 'geographical_Spread' => @companydata[0]['geographical_Spread'], 'company_name' => @companydata[0]['company_name'], 'user_type' => @usertype, 'que_optional' => Hash.new}
            session['user_type'] = user_type

            if !@companydata.nil? && !@companydata[0]['members'].present?
              @members = Hash.new
              @members[@result["user_id"]] = @result["usertype"]
              CorporateCompany.where(:company_id => @result['company_id']).update('members' => @members)
            end
            if params['authenticity_token'].present?
              flash[:success] = "Successfully Logged In"
              redirect_to '/corporate/dashboard'
            else
              flash[:success] = "Successfully Logged In"
              render json: {status: 200, msg: 'Successfully Logged In'}
            end

          else
            # flash[:warning] ='Password is wrong!'

            if params['authenticity_token'].present?
              redirect_to '/corporate/login', :notice => 'Password is wrong!'
            else
              render json: {status: 200, msg: 'Password is wrong!'}
            end

          end
        else
          # flash[:warning] ='Email is wrong!'
          if params['authenticity_token'].present?
            redirect_to '/corporate/login', :notice => 'Email is wrong!'
          else
            render json: {status: 200, msg: "'Email is wrong!'"}
          end


        end
      else

        if params['authenticity_token'].present?
          flash[:success] = "Email is not registered!"
          redirect_to '/#!/page/index#home3'
        else
          render json: {status: 200, msg: "Email is not registered!"}
        end

      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts "caught exception #{ex}!"
    end
  end


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

  def registration_recruitment
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

  def create_company(param)
    cId = 'cId_' + (((Time.now.to_f) * 1000).to_i).to_s
    uId = 'uId_' + (((Time.now.to_f) * 1000).to_i).to_s
    email = param[:email]
    if session['User'].present? && session['User']['user_id'].present?
      uId = session['User']['user_id']
      email =session['User']['Email']
    end
    company = Hash.new
    company["company_id"] = cId
    company["company_name"] = param[:company_name].to_s.downcase
    company["no_of_employees"] = param[:no_of_emp]
    company["revenue"] = param[:annual_revenue]
    company["geographical_Spread"] = param[:geographical_Spread]
    company["industry"] = param[:industry_name].present? ? param[:industry_name]: param[:role_Industry]
    company["users"] = {uId => email }
    company["roles"] = {}
    company["responses"] = Array.new
    company["members"] = {uId => 'Master'}
    @savedb = CorporateCompany.create(company)
    return cId, uId
  end

  def sign_up

    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @result = RecruiterUser.where("email" => params[:email]).to_a
      @result1 = CorporateUser.where("email" => params[:email]).to_a
      @cmpData = CorporateCompany.find_by('company_name' => @company_name)
      if @result.length == 0 && @result1.length == 0
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

          @issignup = user.create(@user1)
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

  def member_registration
    begin
      if session.has_key?('User') && session[:User]['islogin']
        @name = session[:User]['Name']
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def new_member_registration
    redirect_to corporate_member_registration_path
  end

  def add_role_candidate_info
    begin
      @roleid = params[:roleid]
      #puts@pars
      @name = session[:User]['Name']
      degPath = $filePath + "degrees.txt"
      collPath = $filePath + "colleges.txt"
      file = open(degPath, 'r')
      text = file.read
      file.close
      @allDeg = [];
      @allDeg = text.split("\n")
      file = open(collPath, 'r')
      text = file.read
      file.close
      @allColl = [];
      @allColl = text.split("\n")
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end


  def Contact
    begin
      @contact = Hash.new
      @contact["date"] = Time.now.to_s
      @contact["Username"] = params[:Username]
      @contact["Email"] = params[:Email]
      @contact["comment"] = params[:comment]
      Contact.create(@contact)
      ApplicationMailer.contact_us_mail(params[:Username], params[:Email], params[:comment]).deliver
      render json: {status: 200, msg: 'Request Successfully Send'}

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end


  def add_new_role_1
    begin
      @role = Hash.new
      @role["role_id"] = 'role_' + ((Time.now.to_f * 1000).to_i).to_s
      @role["role_designation"] = params[:role_designation]
      @role["role_industry"] = params[:role_Industry]
      @role["role_function"] = params[:role_function]
      @role["dep_sub_fun"] = params[:dep_sub_fun]
      @role["min_salary"] = params[:min_salary]
      @role["max_salary"] = params[:max_salary]
      @role["seniority"] = params[:seniority]
      CorporateRole.create(@role)
      @roleid = @role["role_id"]
      redirect_to '/corporate/add_role_cl/' + @roleid.to_s
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end

  def add_newrole_3
    begin
      @roleid = params[:roleid]
      @role = CorporateRole.find_by('role_id' => @roleid)
      if session.has_key?('User') && session[:User]['islogin']
        # @role["email"]=session[:User]['Email']
        @role["min_experience"] = params[:min_experience]
        @role["max_experience"] = params[:max_experience]
        @role["role_degree"] = params[:role_degree]
        @role["role_colleges"] = params[:role_colleges]
        @role["role_technical"] = params[:role_technical]
        @role.save
        # puts @data
        redirect_to '/corporate/add_role_summary/' + @roleid.to_s
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end

  def add_role_summary
    begin
      @roleid = params[:roleid]
      @role = CorporateRole.find_by('role_id' => @roleid)
      @designation = @role['role_designation']
      @industry = @role["role_industry"]
      @function = @role["role_function"]
      @departsubfun = @role["dep_sub_fun"]
      @minsalary = @role["min_salary"]
      @maxsalary = @role["max_salary"]
      @seniority = @role["seniority"]
      @minexperience = @role["min_experience"]
      @maxexperience = @role["max_experience"]
      @degree = @role["role_degree"]
      @colleges = @role["role_colleges"]
      @technical = @role["role_technical"]
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def edit_application
    begin
      @app_id = params[:app_id]
      if params['page'].present?
        @page = params['page'].to_i
      end
      @applicant = CorporateApplication.find_by(:app_id => @app_id)
      @allQues = CorporateQuestion.getques()
      indPath = $filePath + "industries.txt"
      funPath = $filePath + "functions.txt"
      companyPath = $filePath + "companies.txt"
      file = open(companyPath, 'r')
      text = file.read
      file.close
      @allcompanny = [];
      @allcompanny = text.split("\n")
      @allcompanny = @allcompanny.sort
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


      degPath = $filePath + "degrees.txt"
      collPath = $filePath + "colleges.txt"
      file = open(degPath, 'r')
      text = file.read
      file.close
      @allDeg = [];
      @allDeg = text.split("\n")
      file = open(collPath, 'r')
      text = file.read
      file.close
      @allColl = [];
      @allColl = text.split("\n")
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def update_application
    begin
      @data = params
      @application = CorporateApplication.find_by(:app_id => params['app_id'])
      @Questions = Hash.new
      for i in 1..19 do
        ind = 'que' + i.to_s
        @Questions[ind] = @data[ind]
      end
      # @app_id = 'app_id_' + (((Time.now.to_f) * 1000).to_i).to_s
      # @application['roleid'] = @data['roleid']
      @roleid = @application['roleid']
      @application['app_id'] = @data['app_id']
      @application['Name'] = @data['Name']
      @application['Email'] = @data['Email']
      @application['Phone'] = @data['Phone']
      @application['Degree'] = @data['Degree']
      if @data.has_key?('Degree1')
        @application['Degree1'] = @data['Degree1']

      end
      if @data.has_key?('Degree2')
        @application['Degree2'] = @data['Degree2']

      end
      @application['Institutions'] = @data['Institutions']
      if @data.has_key?('Institutions1')
        @application['Institutions1'] = @data['Institutions1']

      end
      if @data.has_key?('Institutions2')
        @application['Institutions2'] = @data['Institutions2']

      end
      @application['Year_of_experience'] = @data['Year_of_experience']
      @application['Technical_skills'] = @data['Technical_skills']
      @application['Designation'] = @data['Designation']
      @application['Company'] = @data['Company']
      @application['Industry'] = @data['Industry'].strip
      @application['Function'] = @data['Function'].strip
      @application['Department'] = @data['Department']
      @application['Salary'] = @data['Salary']
      @application['customers'] = @data['customers']
      @application['Revenue'] = @data['Revenue']
      @application['Employees'] = @data['Employees']
      @application['level'] = @data['level']
      @application['Questions'] = @Questions
      # @application['Resume'] = @data['file']
      # @approle = CorporateRole.find_by(:role_id => @data['roleid'])
      # @response = @approle['responses']
      # @response.push(@application['app_id'])
      # @approle['responses'] = @response
      # CorporateRole.where(:role_id => @data['roleid']).update(:responses => @response)
      uploaded_io = params[:file]
      if !uploaded_io.nil?
        File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
          if uploaded_io.content_type == 'application/pdf'
            file.write(uploaded_io.read)
            # respond_to do |format|
            #   format.html { redirect_to(root_url, :notice => 'File was uploaded.') }
            # end
          else
            flash[:warning] = 'please select pdf file'
            # redirect_to corporate_application_path
          end
        end
      end
      issave = @application.save
      if issave
        flash[:success] = 'Successfully saved!'
        if params['page'].present? && params['page'] == '1'
          redirect_to '/corporate/dashboard/?page=1'
        elsif params['page'].present? && params['page'] == '2'
          redirect_to '/corporate/summary_report/' + @roleid + '#hide-3'
        end

      end

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end

  def edit_role
    begin
      if session.has_key?('User') && session[:User]['islogin']
        @session = session['User']
        @page = params['page']
        @role_id = params['roleid']
        @role = CorporateRole.find_by('role_id' => @role_id)
        @company = CorporateCompany.find_by(:company_name => @role['company_name'])
        if @role['que_optional'].present?
          @que_optional = @role['que_optional']
          session[:User][:que_optional] = @role['que_optional']
        end
        @allQues = CorporateQuestion.getques()
        @deadline = ""
        if !@role['role_deadline'].nil?
          deadline = @role['role_deadline'].to_s.split('-')
          @deadline = deadline[1] + '/' + deadline[2] + '/' + deadline[0]
        end
        indPath = $filePath + "industries.txt"
        funPath = $filePath + "functions.txt"
        file = open(indPath, 'r')
        text = file.read
        file.close
        @allInd = [];
        @allInd = text.split("\n")
        @allInd = @allInd.sort
        @allInd.each_with_index do |v, i|
          @allInd[i] = v.strip
        end
        file = open(funPath, 'r')
        text = file.read
        file.close
        @allFun = [];
        @allFun = text.split("\n")
        @allFun = @allFun.sort
        @allFun.each_with_index do |v, i|
          @allFun[i] = v.strip
        end

        degPath = $filePath + "degrees.txt"
        collPath = $filePath + "colleges.txt"
        file = open(degPath, 'r')
        text = file.read
        file.close
        @allDeg = [];
        @allDeg = text.split("\n")
        file = open(collPath, 'r')
        text = file.read
        file.close
        @allColl = [];
        @allColl = text.split("\n")
        @allColl.each_with_index do |v, i|
          @allColl[i] = v.strip
        end
        @companies = CorporateCompany.getCompanies()
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def impact_qustion
    begin
    impact_data ={}
    role_industry = params['impact_industry'].gsub('_', '&')
    role_industry.delete!("\n")
    role_function = params['impact_function'].gsub('_', '&')
    role_function.delete!("\n")
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

  def update_role
    begin
      aa = session['User']
      if session.has_key?('User') && session[:User]['islogin']
        @email = session[:User]['Email'].to_s
        @role = CorporateRole.find_by(:role_id => params[:role_id])
        if session['user_type'] == 'recruiter'
          @company = CorporateCompany.find_by(:company_name => params[:company_name])
          if !@company.nil?
            @company["company_name"] = params[:company_name]
            @company["geographical_Spread"] = params[:geographical_Spread]
            @company["no_of_employees"] = params[:no_of_emp]
            @company["revenue"] = params[:annual_revenue]
            cId = @company["company_id"]
            @company.save
          else
            cId, uId = create_company(params)
          end
          @role["company_name"] = params[:company_name]
          @role["company_id"] = session['User']['company_id']
        end
        @role["role_designation"] = params[:role_designation]
        @role["role_industry"] = params[:role_Industry]
        @role["role_function"] = params[:role_function]
        @role["dep_sub_fun"] = params[:dep_sub_fun]
        @role["min_salary"] = params[:min_salary]
        @role["max_salary"] = params[:max_salary]
        @role["seniority"] = params[:seniority]
        # @role["responses"] = []
        if params['partial'].present? && @role['partial'].present?
          if (@role['partial'].to_i) < (params['partial'].to_i)
            @role['partial'] = params['partial']
          end
        elsif @role['partial'].present?
          @role.unset(:partial)
          # puts @role.to_s
        end
        #part 2
        @data = Hash.new
        for i in 1..19 do
          ind = 'que' + i.to_s
          @data[ind] = params[ind].to_i
        end
        @role['questions'] = @data

        #part 3
        @role["min_experience"] = params[:min_experience]
        @role["max_experience"] = params[:max_experience]

        @role["role_degree"] = unique_value(params[:role_degree], 1)
        if params.has_key?('role_degree1')
          @role["role_degree1"] = params[:role_degree1]
        end
        if params.has_key?('role_degree2')
          @role["role_degree2"] = params[:role_degree2]
        end
        @role["role_colleges"] = unique_value(params[:role_colleges], 1)
        if params.has_key?('role_colleges1')
          @role["role_colleges1"] = params[:role_colleges1]
        end
        if params.has_key?('role_colleges2')
          @role["role_colleges2"] = params[:role_colleges2]
        end
        @role["role_technical"] = unique_value(params[:role_technical], 1)
        @role["role_keyword"] = unique_value(params[:role_keyword], 1)
        date_string = ""
        if params[:role_deadline] != ""
          string_date = params[:role_deadline].split('/')
          date_string = Date.parse(string_date[2].to_s + '-' + string_date[0].to_s + '-' + string_date[1].to_s)
        end
        @role["role_deadline"] = date_string
        # session[:User]['que_optional'].each do |key, value|
        #   @role['que_optional'][key] = value
        # end
        @role['que_optional'] = session[:User]['que_optional']
        CorporateRole.where(:role_id => params[:role_id]).update(:que_optional => @role['que_optional'])
        session[:User]['que_optional'] = Hash.new
        cl_data = rolecl(@role)
        @role["cl_data"] = cl_data
        issave = @role.save
        # CorporateRole.create(@role)
        # @userdb = user.find_by('email' => @email)
        # if @userdb['add_permissions_selective'].nil?
        #   @userdb['add_permissions_selective'] = Hash.new
        # end
        # if @userdb['update_permissions_selective'].nil?
        #   @userdb['update_permissions_selective'] = Hash.new
        # end
        # if @userdb['delete_permission_selective'].nil?
        #   @userdb['delete_permission_selective'] = Hash.new
        # end

        # @userdb['add_permissions_selective'][@role["role_id"]] = true
        # @userdb['update_permissions_selective'][@role["role_id"]] = true
        # @userdb['delete_permission_selective'][@role["role_id"]] = true
        # @add_hash = @userdb['add_permissions_selective']
        # @update_hash = @userdb['update_permissions_selective']
        # @delete_hash = @userdb['delete_permission_selective']
        # user.where(:email => @email).update(:add_permissions_selective => @add_hash, :update_permissions_selective => @update_hash, :delete_permission_selective => @delete_hash)
        # @companydb = CorporateCompany.find_by(:company_id => @userdb['company_id'])
        # @companydb['roles'][@role["role_id"]] = true
        # @roles = @companydb['roles']
        # CorporateCompany.where(:company_id => @userdb['company_id']).update(:roles => @roles)
        flash[:success] = "Role successfully updated"
        # redirect_to corporate_dashboard_path
        if params['logout'].present? && params['logout'] == "true"
          render json: {status: 200, msg: 'New Role successfully Added!'}
        elsif !(params['partial'].present?)
          redirect_to '/corporate/summary_report/' + params[:role_id]
        else
          redirect_to corporate_dashboard_path
        end
      else
        session[:User] = {'islogin' => false}
        flash[:success] = "New Role Is Not Added"
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end

  def unique_value(arr, ind)
    new_arr = Array.new
    arr.each do |itm|
      if ind == 1
        if !new_arr.include?(itm.upcase)
          new_arr.push(itm.upcase)
        end
      else
        new_arr.push(itm)
      end
    end
    final = new_arr.uniq
    return final
  end

  def thank_you_page
    begin

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def add_new_role
    begin
      if session.has_key?('User') && session[:User]['islogin']
        @roleid = params[:roleid]
        @allQues = CorporateQuestion.getques()


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


        degPath = $filePath + "degrees.txt"
        collPath = $filePath + "colleges.txt"
        file = open(degPath, 'r')
        text = file.read
        file.close
        @allDeg = [];
        @allDeg = text.split("\n")
        file = open(collPath, 'r')
        text = file.read
        file.close
        @allColl = [];
        @allColl = text.split("\n")
        @companies = CorporateCompany.getCompanies()
        u_id = session['User']['user_id']
        @companies = @companies.select {|k| k['users'][u_id].present?}
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def other_Question
    begin
      @othet_question = Hash.new
      session[:User]['que_optional'].each do |key, value|
        @othet_question[key] = value
      end
      respond_to do |format|
        format.html {render :partial => 'otherQuestion'}
      end
    end
  rescue Exception => ex
    log = ex.message.to_s + "...........in...." + params['action']
    loger(log)
    puts ex
  end

  def add_newrole
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      if session.has_key?('User') && session[:User]['islogin']
        @email = session[:User]['Email'].to_s
        @userdb = user.find_by('email' => @email)
        @role = Hash.new
        if session['user_type'] == 'recruiter'
          @company = CorporateCompany.find_by(:company_name => params[:company_name])
          if !@company.nil?
            @company["company_name"] = params[:company_name]
            @company["geographical_Spread"] = params[:geographical_Spread]
            @company["no_of_employees"] = params[:no_of_emp]
            @company["revenue"] = params[:annual_revenue]
            cId = @company["company_id"]
            @company.save
          else
            cId, uId = create_company(params)
          end
          @role["company_name"] = params[:company_name]
        else
          cId, uId = create_company(params)
        end

        @role["role_id"] = 'role_' + ((Time.now.to_f * 1000).to_i).to_s
        @role["company_id"] = session['User']['company_id']
        @role["created_by"] = session[:User]['Name']
        @role["role_designation"] = params[:role_designation]
        @role["role_industry"] = params[:role_Industry]
        @role["role_function"] = params[:role_function]
        @role["dep_sub_fun"] = params[:dep_sub_fun]
        @role["min_salary"] = params[:min_salary]
        @role["max_salary"] = params[:max_salary]
        @role["seniority"] = params[:seniority]
        @role["responses"] = []
        if params.has_key?('partial')
          @role['partial'] = params['partial']
        elsif @role['partial'].present?
          @partial = @role['partial']
          @partial.delete('partial')
          @role['partial'] = @partial
        end
        #part 2
        @data = Hash.new
        for i in 1..19 do
          ind = 'que' + i.to_s
          @data[ind] = params[ind].to_i
        end
        @role['questions'] = @data

        #part 3
        @role["min_experience"] = params[:min_experience]
        @role["max_experience"] = params[:max_experience]

        @role["role_degree"] = unique_value(params[:role_degree], 1)
        if params.has_key?('role_degree1')
          @role["role_degree1"] = params[:role_degree1]
        end
        if params.has_key?('role_degree2')
          @role["role_degree2"] = params[:role_degree2]
        end
        @role["role_colleges"] = unique_value(params[:role_colleges], 1)
        if params.has_key?('role_colleges1')
          @role["role_colleges1"] = params[:role_colleges1]
        end
        if params.has_key?('role_colleges2')
          @role["role_colleges2"] = params[:role_colleges2]
        end
        @role["role_technical"] = unique_value(params[:role_technical], 1)
        @role["role_keyword"] = unique_value(params[:role_keyword], 1)
        date_string = ""
        if params[:role_deadline] != ""
          string_date = params[:role_deadline].split('/')
          date_string = Date.parse(string_date[2].to_s + '-' + string_date[0].to_s + '-' + string_date[1].to_s)
        end
        @role["role_deadline"] = date_string
        @role["que_optional"] = Hash.new
        session[:User]['que_optional'].each do |key, value|
          @role['que_optional'][key] = value
        end
        session[:User]['que_optional'] = Hash.new
        cl_data = rolecl(@role)
        @role["cl_data"] = cl_data
        CorporateRole.create(@role)

        # if @userdb['add_permissions_selective'].nil?
        #   @userdb['add_permissions_selective'] = Hash.new
        # end
        # if @userdb['update_permissions_selective'].nil?
        #   @userdb['update_permissions_selective'] = Hash.new
        # end
        # if @userdb['delete_permission_selective'].nil?
        #   @userdb['delete_permission_selective'] = Hash.new
        # end

        @userdb['add_permissions_selective'][@role["role_id"]] = true
        @userdb['update_permissions_selective'][@role["role_id"]] = true
        @userdb['delete_permission_selective'][@role["role_id"]] = true
        @add_hash = @userdb['add_permissions_selective']
        @update_hash = @userdb['update_permissions_selective']
        @delete_hash = @userdb['delete_permission_selective']
        user.where(:email => @email).update(:add_permissions_selective => @add_hash, :update_permissions_selective => @update_hash, :delete_permission_selective => @delete_hash)
        @companydb = CorporateCompany.find_by(:company_id => @userdb['company_id'])
        @companydb['roles'][@role["role_id"]] = true
        @roles = @companydb['roles']
        CorporateCompany.where(:company_id => @userdb['company_id']).update(:roles => @roles)
        flash[:success] = "New Role successfully Added"
        if params['logout'].present? && params['logout'] == "true"
          render json: {status: 200, msg: 'New Role successfully Added!'}
        else
          redirect_to corporate_dashboard_path
        end
      else
        session[:User] = {'islogin' => false}
        flash[:success] = "New Role Is Not Added"
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex
    end
  end

  def delete_member
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @session = session['User']
      if @session['islogin']
        @mem_id = params[:mem_id]
        @member = user.find_by(:user_id => @mem_id)
        isdelete = @member.delete
        if isdelete
          @company = CorporateCompany.find_by(:company_id => @member['company_id'])
          @members = @company['members']
          @members.delete(@mem_id)
          @company['members'] = @members
          CorporateCompany.where(:company_id => @member['company_id']).update(:members => @company['members'])
          redirect_to '/corporate/dashboard/?page=3'
        else

        end

      else

      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def delete_applicant
    begin
      @session = session['User']
      if @session['islogin']
        app_id = params[:app_id]
        delete_application(app_id)
        # @applicant = CorporateApplication.find_by(:app_id => @app_id)
        # @role = CorporateRole.find_by('role_id' => @applicant['roleid'])
        # @response = @role['responses']
        # @response.delete(@app_id)
        # @role['responses'] = @response
        # @issave = CorporateRole.where(:role_id => @applicant['roleid']).update('responses' => @role['responses'])
        # @applicant.delete
        redirect_to params['button']

      else

      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def delete_application(app_id)
    begin
      @app_id = app_id
      company_id = session['User']['company_id']
      @applicant = CorporateApplication.find_by(:app_id => @app_id)
      @role = CorporateRole.find_by('role_id' => @applicant['roleid'])
      @company = CorporateCompany.find_by(:company_id => company_id)
      @respo = @company['responses']
      @respo.delete(@app_id)
      @company['responses'] = @respo
      CorporateCompany.where(:company_id => company_id).update(:responses => @company['responses'])
      if !@role.nil?
        @response = @role['responses']
        @response.delete(@app_id)
        @role['responses'] = @response
        @issave = CorporateRole.where(:role_id => @applicant['roleid']).update('responses' => @role['responses'])
      end
      @applicant.delete
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def deleterole
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @session = session['User']
      @role_id = params[:idrole]
      @user = user.find_by('email' => @session['Email'])
      @applicants = CorporateRole.find_by('role_id' => @role_id)
      if params[:delete_applicant].present? && params[:delete_applicant] == "true"
        @applicants[:responses].each do |key|
          delete_application(key)
        end
      end
      if @user['delete_permission_selective'].has_key?(@role_id)
        @delete_permission_selective = @user['delete_permission_selective']
        @delete_permission_selective.delete(@role_id)
        @user['delete_permission_selective'] = @delete_permission_selective
        user.where(:email => @session['Email']).update('delete_permission_selective' => @user['delete_permission_selective'])
        # @user = @company = user.find_by('email' => @session['Email'])
        if @user['update_permissions_selective'].has_key?(@role_id)
          @update_permissions_selective = @user['update_permissions_selective']
          @update_permissions_selective.delete(@role_id)
          @user['update_permissions_selective'] = @update_permissions_selective
          user.where(:email => @session['Email']).update('update_permissions_selective' => @user['update_permissions_selective'])

        end
        # @user = @company = user.find_by('email' => @session['Email'])
        if @user['add_permissions_selective'].has_key?(@role_id)
          @add_permissions_selective = @user['add_permissions_selective']
          @add_permissions_selective.delete(@role_id)
          @user['add_permissions_selective'] = @add_permissions_selective
          user.where(:email => @session['Email']).update('add_permissions_selective' => @user['add_permissions_selective'])
        end
        @applicants.delete
        @company = CorporateCompany.find_by('company_id' => @session['company_id'])
        @roles = @company['roles']
        @roles.delete(@role_id)
        @company['roles'] = @roles
        CorporateCompany.where(:company_id => @session['company_id']).update('roles' => @company['roles'])
        flash[:success] = 'Role has been deleted!'
        respond_to do |format|
          format.js {render :js => 'true'}
        end
        # redirect_to corporate_dashboard_path

      else

      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def getSalComp(userCL, userIndustry, userFunction, userCompany)
    def checkUserComp(inp, userCompany)
      out = []
      if inp != ''
        inp = inp.split("%")[0..-2]
        inp.each do |i|
          i = i.split("+")
          if i[0] != userCompany
            out.push(i)
          end
        end
      end
      return out
    end

    def getComps(inp, userCompany, medSal)
      maxOut = []
      minOut = []
      if inp != ''
        inp = inp.split("%")[0..-2]
        inp.each do |i|
          i = i.split("+")
          if i[0] != userCompany && i[2].to_f > medSal
            maxOut.push(i)
          elsif i[0] != userCompany && i[2].to_f < medSal
            minOut.push(i)
          end
        end
        if minOut.length > 5
          minOut = minOut[0..4]
        end
        if maxOut.length > 5
          maxOut = maxOut[-5..-1]
        end
      end
      return maxOut, minOut
    end

    caseOrder = ["Industry and Function", "Function"]
    pathNames = {"Industry and Function" => "corpSalIndFn.txt", "Function" => "corpSalFn.txt"}
    strings = {"Industry and Function" => [0, 1], "Function" => [0]}
    entryLen = {"Industry and Function" => 5, "Function" => 4}
    cases = {"Industry and Function" => [[0, 1, 2], [userIndustry, userFunction, userCL]], "Function" => [[0, 1], [userFunction, userCL]]}
    allSals = {}
    minComps = {}
    maxComps = {}
    caseOrder.each do |caseName|
      path = $filePath + pathNames[caseName]
      file = open(path)
      text = file.read
      file.close
      textList = text.split("\n")
      userDone = 0
      caseFilter = cases[caseName]
      textList.each do |row|
        rowList = row.split(";")
        entry = []
        (0..entryLen[caseName]).each do |i|
          if strings[caseName].include?(i)
            entry.push(rowList[i].strip)
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
          userDone = 1
          desigs25 = checkUserComp(rowList[-4], userCompany)
          desigs50 = checkUserComp(rowList[-3], userCompany)
          desigs90 = checkUserComp(rowList[-2], userCompany)
          allSals[caseName] = [[entry[-3], entry[-2], entry[-1]], [desigs25, desigs50, desigs90]]
          maxComp, minComp = getComps(rowList[-1], userCompany, entry[-2])
          minComps[caseName] = minComp
          maxComps[caseName] = maxComp
          break
        end
      end
      if userDone == 0
        allSals[caseName] = []
        minComps[caseName] = []
        maxComps[caseName] = []
      end
    end
    return allSals, minComps, maxComps
  end

  def CLCalculation(inputs, userIndustry)
    #inputs should be of the form {1=>1(regional)/2(national)/3(1-5 countries)/4 (global),2=>[numEmployess,Revenues],4=>1/2/3/4/5...11,5=>[1/2/3/4/5,value if 5]...,21=>1/2/3/4/5/6}
    #Calculate score for Question 2-----------------------------------------------
    #---revenue score
    if !(userIndustry.nil? || userIndustry == "" || userIndustry == "N/A")
      for i in 4...inputs.length
        if inputs[i].nil? || inputs[i] == 0 && i != 3
          return 'partial', ['respScore', 'q9_10' + 'competanceScore', 'impactScore']
        end
      end
    else
      return 'partial', ['respScore', 'q9_10' + 'competanceScore', 'impactScore']
    end
    q2Revenue = 0
    userRevenue = inputs[2][1]
    sncTable1 = [[0.002625, 0.00525, 0],
                 [0.00525, 0.0105, 1],
                 [0.0105, 0.021, 2],
                 [0.021, 0.042, 3],
                 [0.042, 0.0875, 4],
                 [0.0875, 0.175, 5],
                 [0.175, 0.35, 6],
                 [0.35, 0.7, 7],
                 [0.7, 1.4, 8],
                 [1.4, 2.8, 9],
                 [2.8, 5.6, 10],
                 [5.6, 11.2, 11],
                 [11.2, 22.4, 12],
                 [22.4, 44.8, 13],
                 [44.8, 89.6, 14],
                 [89.6, 179.2, 15],
                 [179.2, 358.4, 16],
                 [358.4, 716.8, 17],
                 [716.8, 1433.6, 18],
                 [1433.6, 2867.2, 19],
                 [2867.2, 5734.4, 20],
                 [5734.4, 11468.8, 21],
                 [11468.8, 22937.6, 22],
                 [22937.6, 45875.2, 23],
                 [45875.2, 91750.4, 24],
                 [91750.4, 183500.8, 25],
                 [183500.8, 367001.6, 26],
                 [367001.6, 734003.2, 27],
                 [734003.2, 1468006.4, 28]]
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
    sncTable2 = [[0, 150, 0],
                 [150, 300, 1],
                 [300, 60, 2],
                 [60, 1250, 3],
                 [1250, 2500, 4],
                 [2500, 5000, 5],
                 [5000, 10000, 6],
                 [10000, 20000, 7],
                 [20000, 40000, 8],
                 [40000, 80000, 9],
                 [80000, 160000, 10],
                 [160000, 320000, 11],
                 [320000, 640000, 12],
                 [640000, 1280000, 13],
                 [1280000, 2560000, 14],
                 [2560000, 5120000, 15],
                 [5120000, 10240000, 16],
                 [10240000, 20480000, 17],
                 [20480000, 40960000, 18],
                 [40960000, 81920000, 19]]
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
    sncTable4 = {"Basic" => [0, 1, 2, 3],
                 "Moderate" => [2, 3, 4, 5],
                 "High" => [4, 5, 6, 7]}
    q1 = sncTable4[complexity][region]
    #get size multiplier----------------------------------------------------------
    sncTable5 = {1 => 0.23,
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
                 28 => 2.22,
                 29 => 2.32,
                 30 => 2.42,
                 31 => 2.52,
                 32 => 2.62,
                 33 => 2.72,
                 34 => 2.82,
                 35 => 2.92,
                 36 => 3.02}

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
    respTable2a = {1 => 0, 2 => 1, 3 => 3, 4 => 6} #1 = 0, 2 = 1-10, 3 = 11-100, 4 = 101-1000, 5 = >=1001
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
    respTable4 = {1 => 0, 2 => 16, 3 => 50, 4 => 75, 5 => 100}
    q7 = respTable4[inputs[7]]
    #Calculate score for Question 8-----------------------------------------------
    respTable5 = {1 => 5,
                  2 => 10,
                  3 => 20,
                  4 => 30,
                  5 => 40,
                  6 => 50,
                  7 => 75,
                  8 => 100}
    q8 = respTable5[inputs[8]]
    #Total responsibility score---------------------------------------------------
    respScore = q4 + q5 + q6 + q7 + q8
    #Calculate score for Question 9 and 10----------------------------------------
    effTable1 = {1 => [1, 5, 10, 25],
                 2 => [5, 10, 25, 50],
                 3 => [10, 25, 50, 100],
                 4 => [50, 100, 150, 200]}
    a10 = inputs[10]
    a9 = inputs[9]
    q9_10 = effTable1[a10][a9 - 1] #technical competance
    #Calculate score for Question 11 and 12----------------------------------------------
    effTable2 = {1 => 2,
                 2 => 4,
                 3 => 6,
                 4 => 8,
                 5 => 10,
                 6 => 12,
                 7 => 14,
                 8 => 16,
                 9 => 18,
                 10 => 20}
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
    impTable = {1 => 0, 2 => 5, 3 => 10, 4 => 20, 5 => 35, 6 => 50}
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
    #Calculate CL-----------------------------------------------------------------
    cl = 0
    clTable = [[0, 4, 8],
               [5, 29, 9],
               [30, 54, 10],
               [55, 79, 11],
               [80, 104, 12],
               [105, 129, 13],
               [130, 154, 14],
               [155, 179, 15],
               [180, 204, 16],
               [205, 229, 17],
               [230, 254, 18],
               [255, 279, 19],
               [280, 304, 20],
               [305, 329, 21],
               [330, 354, 22],
               [355, 379, 23],
               [380, 404, 24],
               [405, 429, 25],
               [430, 454, 26],
               [455, 479, 27],
               [480, 504, 28],
               [505, 529, 29],
               [530, 554, 30],
               [555, 579, 31],
               [580, 604, 32],
               [605, 629, 33],
               [630, 654, 34],
               [655, 679, 35],
               [680, 704, 36],
               [705, 729, 37],
               [730, 754, 38],
               [755, 779, 39],
               [780, 804, 40],
               [805, 829, 41],
               [830, 854, 42],
               [855, 879, 43],
               [880, 904, 44],
               [905, 929, 45],
               [930, 954, 46],
               [955, 979, 47],
               [980, 1004, 48],
               [1005, 1029, 49],
               [1030, 1054, 50],
               [1055, 1079, 51],
               [1080, 1104, 52],
               [1105, 1129, 53],
               [1130, 1154, 54],
               [1155, 1179, 55],
               [1180, 1204, 56],
               [1205, 1229, 57],
               [1230, 1254, 58],
               [1255, 1279, 59],
               [1280, 1304, 60],
               [1305, 1329, 61],
               [1330, 1354, 62],
               [1355, 1379, 63],
               [1380, 1404, 64],
               [1405, 1429, 65],
               [1430, 1454, 66],
               [1455, 1479, 67],
               [1480, 1504, 68],
               [1505, 1529, 69],
               [1530, 1554, 70],
               [1555, 1579, 71],
               [1580, 1604, 72],
               [1605, 1629, 73],
               [1630, 1654, 74],
               [1655, 1679, 75],
               [1680, 1704, 76],
               [1705, 1729, 77],
               [1730, 1754, 78],
               [1755, 1779, 79],
               [1780, 1804, 80],
               [1805, 1829, 81],
               [1830, 1854, 82],
               [1855, 1879, 83],
               [1880, 1904, 84],
               [1905, 1929, 85],
               [1930, 1954, 86],
               [1955, 1979, 87],
               [1980, 2004, 88],
               [2005, 2029, 89],
               [2030, 2054, 90],
               [2055, 2079, 91],
               [2080, 2104, 92],
               [2105, 2129, 93],
               [2130, 2154, 94],
               [2155, 2179, 95],
               [2180, 2204, 96],
               [2205, 2229, 97],
               [2230, 2254, 98],
               [2255, 2279, 99],
               [2280, 2304, 100],
               [2305, 2329, 101],
               [2330, 2354, 102],
               [2355, 2379, 103]]
    clPoints = clPoints.round(0)
    clTable.each do |row|
      if clPoints >= row[0] && clPoints <= row[1]
        cl = row[2]
        break
      end
    end
    return cl, [respScore, q9_10 + competanceScore, impactScore]
  end


  def application
    begin
      @role_id = params['roleid']
      @role = CorporateRole.find_by(:role_id => @role_id)
      @allQues = ApplicantQuestion.getques()

      indPath = $filePath + "industries.txt"
      funPath = $filePath + "functions.txt"
      companyPath = $filePath + "companies.txt"
      file = open(companyPath, 'r')
      text = file.read
      file.close
      @allcompanny = [];
      @allcompanny = text.split("\n")
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
      degPath = $filePath + "degrees.txt"
      collPath = $filePath + "colleges.txt"
      file = open(degPath, 'r')
      text = file.read
      file.close
      @allDeg = [];
      @allDeg = text.split("\n")
      file = open(collPath, 'r')
      text = file.read
      file.close
      @allColl = [];
      @allColl = text.split("\n")
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def job_application
    begin
      @role_id = params['roleid']
      @role = CorporateRole.find_by(:role_id => @role_id)
      @allQues = ApplicantQuestion.getques()

      indPath = $filePath + "industries.txt"
      funPath = $filePath + "functions.txt"
      companyPath = $filePath + "companies.txt"
      file = open(companyPath, 'r')
      text = file.read
      file.close
      @allcompanny = [];
      @allcompanny = text.split("\n")
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
      degPath = $filePath + "degrees.txt"
      collPath = $filePath + "colleges.txt"
      file = open(degPath, 'r')
      text = file.read
      file.close
      @allDeg = [];
      @allDeg = text.split("\n")
      file = open(collPath, 'r')
      text = file.read
      file.close
      @allColl = [];
      @allColl = text.split("\n")
      email = session[:applicant_email]
      @user = User.find_by('Email' => email)
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def filter_applicants
    begin
      @data = params
      @allfilter = Hash.new
      @role = Hash.new
      applicant = get_applicants(params['all_app_keys'])
      applicant = applicant.to_s.gsub('=>', ':').to_s.gsub(':nil', ':""')
      @applicant = JSON.parse(applicant)
      role = get_roles(params['role_keys'])
      role = role.to_s.gsub('=>', ':').to_s.gsub(':nil', ':""')
      @role = JSON.parse(role)
      if @data['sal'].present?
        if @data['salary-low'] != "" || @data['salary-up'] != ""
          @allfilter['salary-low'] = @data['salary-low'].to_i
          @allfilter['salary-up'] = @data['salary-up'].to_i
          @allfilter['sal'] = @data['sal']
        else
          @allfilter['sal'] = @data['sal']
        end
      end
      if @data['checkcl'].present?
        if @data['cl-low'] != "" || @data['cl-up'] != ""
          @allfilter['cl-low'] = @data['cl-low'].to_i
          @allfilter['cl-up'] = @data['cl-up'].to_i
          @allfilter['checkcl'] = @data['checkcl'].to_i

        else
          @allfilter['checkcl'] = @data['checkcl'].to_i
        end
      end
      if @data['exp'].present?
        if @data['exp-low'] != "" || @data['exp-up'] != ""
          @allfilter['exp-low'] = @data['exp-low'].to_i
          @allfilter['exp-up'] = @data['exp-up'].to_i
          @allfilter['exp'] = @data['exp']

        else
          @allfilter['exp'] = @data['exp']
        end
      end
      if @data['res'].present?
        if (@data['res-low'] != "" || @data['res-up'] != "")
          @allfilter['res-low'] = @data['res-low'].to_i
          @allfilter['res-up'] = @data['res-up'].to_i
          @allfilter['res'] = @data['res']
        else
          @allfilter['res'] = @data['res']
        end
      end
      if @data['eff'].present?
        if (@data['eff-low'] != "" || @data['eff-up'] != "")
          @allfilter['eff-low'] = @data['eff-low'].to_i
          @allfilter['eff-up'] = @data['eff-up'].to_i
          @allfilter['eff'] = @data['eff']
        else
          @allfilter['eff'] = @data['eff']
        end
      end
      if @data['imp'].present?
        if (@data['imp-low'] != "" || @data['imp-up'] != "")
          @allfilter['imp-low'] = @data['imp-low'].to_i
          @allfilter['imp-up'] = @data['imp-up'].to_i
          @allfilter['imp'] = @data['imp']
        else
          @allfilter['imp'] = @data['imp']
        end
      end
      if @data[:role_function].present? && @data['role_function'] != ""
        @allfilter['role_function'] = @data['role_function']

      end
      if @data[:role_industry].present? && @data['role_industry'] != ""
        @allfilter['role_industry'] = @data['role_industry']
      end
      if @data['res'].present? && @data[:response].present? && @data['response'] != ""
        @allfilter['response'] = @data['response']
        @allfilter['res'] = @data['res']
      end
      if @data['eff'].present? && @data[:effect].present? && @data['effect'] != ""
        @allfilter['effect'] = @data['effect']
        @allfilter['eff'] = @data['eff']
      end
      if @data['imp'].present? && @data[:impact].present? && @data['impact'] != ""
        @allfilter['impact'] = @data['impact']
        @allfilter['imp'] = @data['imp']
      end
      if @data['deg'].present?
        if @data[:degree].present? && @data['degree'] != ""
          if @data[:degree].instance_of?(Array)
            degrees = Array.new
            @data[:degree].each do |key|
              if key != ""
                degrees.push(key)
              end
            end
            @allfilter['degree'] = degrees
          else
            @allfilter['degree'] = @data['degree']
          end
        else
          degrees = Array.new
          @role['role_degree'].each do |key|
            if key != ""
              degrees.push(key)
            end
          end
          @allfilter['degree'] = degrees
        end
      end

      if @data['col'].present?
        if @data[:college].present? && @data['college'] != ""
          if @data[:college].instance_of?(Array)
            colleges = Array.new
            @data[:college].each do |key|
              if key != ""
                colleges.push(key)
              end
            end
            @allfilter['college'] = colleges
          else
            @allfilter['college'] = @data['college']
          end
        else
          colleges = Array.new
          @role['role_colleges'].each do |key|
            if key != ""
              colleges.push(key)
            end
          end
          @allfilter['college'] = colleges
        end
      end

      if @data['tec'].present?
        skills = Array.new
        if @data[:skill].present? && @data['skill'] != ""
          if @data['skill'].instance_of?(Array)
            @data['skill'].each do |skill|
              if skill != ""
                skills.push(skill)
              end
            end
            @allfilter['skill'] = skills
          else
            @allfilter['skill'] = @data['skill']
          end
        else
          @role['role_technical'].each do |key|
            if key != ""
              skills.push(key)
            end
          end
          @allfilter['skill'] = skills
        end
      end
      if @data['key'].present?
        if @data[:keyword].present? && !(@data['keyword'].length == 1 && @data['keyword'][0] == "")
          @allfilter['keyword'] = @data['keyword']
          if @data['min_per_in'] != ""
            @allfilter['min_per'] = @data['min_per_in']
          elsif @data['min_per_out'] != ""
            @allfilter['min_per'] = @data['min_per_out']
          end
        else
          @allfilter['keyword'] = @role['role_keyword']
          if @data['min_per_in'] != ""
            @allfilter['min_per'] = @data['min_per_in']
          elsif @data['min_per_out'] != ""
            @allfilter['min_per'] = @data['min_per_out']
          end
        end
      end

      @filter1 = {'filterdata' => @allfilter, 'order' => @data[:order]}

      if !@filter1.nil? && @filter1.has_key?('filterdata')


        if @filter1['filterdata'].has_key?('sal')
          if @filter1['filterdata'].has_key?('salary-low') && @filter1['filterdata'].has_key?('salary-up')
            @sal_min = (@role['min_salary'].to_f) - (@filter1['filterdata']['salary-low'].to_f)
            @sal_max = (@role['max_salary'].to_f) + (@filter1['filterdata']['salary-up'].to_f)
            @applicant = @applicant.select {|k, t| t['Salary'].between?(@sal_min, @sal_max)}
          else
            @applicant = @applicant.select {|k, t| t['Salary'].between?(@role['min_salary'], @role['max_salary'])}
          end
        end
        if @filter1['filterdata'].has_key?('checkcl')
          if @filter1['filterdata'].has_key?('cl-low')
            @cl_min = (@role['cl'].to_f) - (@filter1['filterdata']['cl-low'].to_f)
            @cl_max = (@role['cl'].to_f) + (@filter1['filterdata']['cl-up'].to_f)
            @applicant = @applicant.select {|k, t| t['cl'].between?(@cl_min, @cl_max)}
          else
            @applicant = @applicant.select {|k, t| t['cl'] == @role['cl']}
          end
        end
        if @filter1['filterdata'].has_key?('exp')
          if @filter1['filterdata'].has_key?('exp-low') && @filter1['filterdata'].has_key?('exp-up')
            @exp_min = (@role['min_experience'].to_f) - (@filter1['filterdata']['exp-low'].to_f)
            @exp_max = (@role['max_experience'].to_f) + (@filter1['filterdata']['exp-up'].to_f)
            @applicant = @applicant.select {|k, t| t['Year_of_experience'].between?(@exp_min, @exp_max)}
          else
            @applicant = @applicant.select {|k, t| t['Year_of_experience'].between?(@role['min_experience'], @role['max_experience'])}
          end
        end
        if @filter1['filterdata'].has_key?('res')
          if @filter1['filterdata'].has_key?('res-low')
            @res_min = (@role['res_score'].to_f) - (@filter1['filterdata']['res-low'].to_f)
            @res_max = (@role['res_score'].to_f) + (@filter1['filterdata']['res-up'].to_f)
            @applicant = @applicant.select {|k, t| t['res_score'].between?(@res_min, @res_max)}
          else
            @applicant = @applicant.select {|k, t| t['res_score'] == @role['res_score']}
          end
        end
        if @filter1['filterdata'].has_key?('eff')
          if @filter1['filterdata'].has_key?('eff-low')
            @eff_min = (@role['eff_score'].to_f) - (@filter1['filterdata']['eff-low'].to_f)
            @eff_max = (@role['eff_score'].to_f) + (@filter1['filterdata']['eff-up'].to_f)
            @applicant = @applicant.select {|k, t| t['eff_score'].between?(@eff_min, @eff_max)}
          else
            @applicant = @applicant.select {|k, t| t['eff_score'] == @role['eff_score']}
          end
        end
        if @filter1['filterdata'].has_key?('imp')
          if @filter1['filterdata'].has_key?('imp-low')
            @imp_min = (@role['imp_score'].to_f) - (@filter1['filterdata']['imp-low'].to_f)
            @imp_max = (@role['imp_score'].to_f) + (@filter1['filterdata']['imp-up'].to_f)
            @applicant = @applicant.select {|k, t| t['imp_score'].between?(@imp_min, @imp_max)}
          else
            @applicant = @applicant.select {|k, t| t['imp_score'] == @role['imp_score']}
          end
        end
        if @filter1['filterdata'].has_key?('role_function')
          @applicant = @applicant.select {|k, t| t['Function'].strip == @filter1['filterdata']['role_function'].strip}
        end
        if @filter1['filterdata'].has_key?('role_industry')
          @applicant = @applicant.select {|k, t| t['Industry'].strip == @filter1['filterdata']['role_industry'].strip}
        end
        if @filter1['filterdata'].has_key?('res')
          if @filter1['filterdata'].has_key?('response')
            ind = 'que' + ((@filter1['filterdata']['response'].to_i) + 1).to_s
            require = ((@role['questions'][ind]).to_i - 1).to_s
            @applicant = @applicant.select {|k, t| t['Questions'][ind] == require}
          end
        end
        if @filter1['filterdata'].has_key?('eff')
          if @filter1['filterdata'].has_key?('effect')
            ind = 'que' + ((@filter1['filterdata']['effect'].to_i) + 1).to_s
            require = ((@role['questions'][ind]).to_i - 1).to_s
            @applicant = @applicant.select {|k, t| t['Questions'][ind] == require}
          end
        end
        if @filter1['filterdata'].has_key?('imp')
          if @filter1['filterdata'].has_key?('impact')
            ind = 'que' + ((@filter1['filterdata']['impact'].to_i) + 1).to_s
            require = ((@role['questions'][ind]).to_i - 1).to_s
            @applicant = @applicant.select {|k, t| t['Questions'][ind] == require}
          end
        end
        if @filter1['filterdata'].has_key?('degree')
          if @filter1['filterdata']['degree'].instance_of?(Array)
            @applicant = @applicant.select {|k, t|
              if t['Degree'].instance_of?(Array)
                (t['Degree'] & @filter1['filterdata']['degree']).length >= 1
              else
                (@filter1['filterdata']['degree'].include?(t['Degree']))
              end}

          else
            @filter1['filterdata']['degree'].each do |degree|
              @applicant = @applicant.select {|k, t| (t['Degree'].include?(degree))}
            end
          end

        end
        if @filter1['filterdata'].has_key?('college')
          if @filter1['filterdata']['college'].instance_of?(Array)
            @applicant = @applicant.select {|k, t|
              if t['Institutions'].instance_of?(Array)
                (t['Institutions'] & @filter1['filterdata']['college']).length >= 1
              else
                (@filter1['filterdata']['college'].include?(t['Institutions']))
              end}
          else
            @filter1['filterdata']['college'].each do |college|
              @applicant = @applicant.select {|k, t| (t['Institutions'].include?(college))}
            end
          end
        end
        if @filter1['filterdata'].has_key?('skill')
          if @filter1['filterdata']['skill'].instance_of?(Array)
            @applicant = @applicant.select {|k, t|
              if t['Technical_skills'].instance_of?(Array)
                (t['Technical_skills'] & @filter1['filterdata']['skill']).length >= 1
              else
                (@filter1['filterdata']['skill'].include?(t['Technical_skills']))
              end}

          else
            @filter1['filterdata']['skill'].each do |skill|
              @applicant = @applicant.select {|k, t| (t['Technical_skills'].include?(skill))}
            end
          end

        end
        if @filter1['filterdata'].has_key?('keyword')
          @applicant.each do |key, value|
            @percent_keyword, @keyword = keyword_per(value['Resume'].to_a, @filter1['filterdata']['keyword'])
            @applicant[key]['keyword_per'] = @percent_keyword
            @applicant[key]['matched_keyword'] = @keyword
          end
          if @filter1['filterdata'].has_key?('min_per')
            @applicant = @applicant.select {|k, t| t['keyword_per'] >= @filter1['filterdata']['min_per'].to_i}
          else
            @applicant = @applicant.select {|k, t| t['keyword_per'] >= 100}
          end

        end

        if !@filter1.nil? && @filter1.has_key?('filterdata') && !@filter1['order'].nil? && @filter1['order'] == 'Descending'
          @applicant = @applicant.to_a.reverse
          @applicant = @applicant.to_h
        end

      end
      @app_keys = Hash.new
      @applicant.each do |k, v|
        @app_keys[k] = ''
      end
      # export_data(@applicant)
      respond_to do |format|
        format.html {render partial: 'applicants'}
      end
        # redirect_to @data[:url], :alert => {'filterdata' => @allfilter, 'order' => @data[:order]}
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts "caught exception #{ex}!"
    end
  end


  def candidatePercentile(userCL, userCompany, userFunction, userSalary)
    #x-axis paths
    path = $filePath + "userPercentileCompIndFn.txt"
    file = open(path)
    text = file.read
    file.close
    textList = text.split("\n")
    caseFilter = [[0, 2, 3], [userCompany.downcase, userFunction.downcase, userCL]]
    checkUser = 0
    percentiles = []
    userPercentile = nil
    textList.each do |row|
      rowList = row.split(";")
      entry = []
      (0..rowList.length - 1).each do |i|
        if [0, 1, 2].include?(i)
          entry.push((rowList[i].strip).downcase)
        else
          if i == 3 # CL
            entry.push(rowList[i].to_i)
          elsif i == 4 #percentiles
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
    return userPercentile
  end

  def find_company
    begin
      data = params
      company_data = CorporateCompany.find_by(:company_name => params['company_name'].to_s.downcase)
      render json: {status: 200, data: company_data}
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      ex.message
    end
  end

  def select_role
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @session = session[:User]
      data = params
      @role_keys = Hash.new
      @app_keys = Hash.new
      @roleid = data['roleid']
      @role = CorporateRole.find_by(:role_id => @roleid)
      @role_keys[@roleid] = ''
      if !@role['cl_data'].present?
        cl_data = rolecl(@role)
        CorporateRole.where(:role_id => @roleid).update(:cl_data => cl_data)
      else
        cl_data = @role['cl_data']
      end


      @cl = cl_data[0]
      @role['cl'] = @cl
      @role['res_score'] = cl_data[1][0]
      @role['eff_score'] = cl_data[1][1]
      @role['imp_score'] = cl_data[1][2]
      role = @role.to_json
      @role = JSON.parse(role).with_indifferent_access
      @applicant = Hash.new
      @degree = Array.new
      @college = Array.new
      @skill = Array.new
      @user = user.find_by('email' => @session['Email'])
      @data = CorporateCompany.find_by('company_id' => @session['company_id'])
      if !@data['roles'].empty?

        @roles = @data['roles']
        @roles.each do |key, value|
          roles = CorporateRole.find_by('role_id' => key)
          roles['responses'].each_with_index do |k, i|
            applicant = CorporateApplication.find_by('app_id' => k)
            if !applicant.nil?
              @candidatecl = clcandidate(applicant)
              applicant['cl'] = @candidatecl[0]
              applicant['res_score'] = @candidatecl[1][0]
              applicant['eff_score'] = @candidatecl[1][1]
              applicant['imp_score'] = @candidatecl[1][2]
              if applicant['Degree'].instance_of?(Array)

                applicant['Degree'].each do |key|
                  if !@degree.include?(key) && key != ""
                    @degree.push(key)
                  end
                end
              elsif !@degree.include?(applicant['Degree'])
                @degree.push(applicant['Degree'])
                if applicant['Degree1'].present? && !(@degree.include?(applicant['Degree1']))
                  @degree.push(applicant['Degree1'])
                end
                if applicant['Degree2'].present? && !(@degree.include?(applicant['Degree2']))
                  @degree.push(applicant['Degree2'])
                end
              end
              if applicant['Institutions'].instance_of?(Array)

                applicant['Institutions'].each do |key|
                  if !@college.include?(key) && key != ""
                    @college.push(key)
                  end
                end
              elsif !@college.include?(applicant['Institutions'])
                @college.push(applicant['Institutions'])
                if applicant['Degree1'].present? && !(@college.include?(applicant['Institutions1']))
                  @college.push(applicant['Institutions1'])
                end
                if applicant['Degree2'].present? && !(@college.include?(applicant['Institutions2']))
                  @college.push(applicant['Institutions1'])
                end
              end
              if !@skill.include?(applicant['Technical_skills'])
                applicant['Technical_skills'].each do |skill|
                  if !@skill.include?(skill) && skill != ""
                    @skill.push(skill)
                  end
                end
              end
              data = applicant.to_json
              @applicant[k] = JSON.parse(data).with_indifferent_access
              @app_keys[k] = ''
            end
          end
        end
      end
      respond_to do |format|
        format.html {render partial: 'filter_popup'}
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def sort_applicants
    begin
      # @sort=params['radio']
      @filter = params['radio']
      applicant = get_applicants(params['all_app_keys'])
      applicant = applicant.to_s.gsub('=>', ':').to_s.gsub(':nil', ':""')
      @applicant = JSON.parse(applicant)
      @filter1 = {'filter' => @filter, 'order' => params[:order]}
      if !@filter1.nil? && @filter1.has_key?('filter') && (@filter1['order'].nil? || @filter1['order'] == 'Ascending')
        @sort = @filter1['filter']
        @applicant = @applicant.sort_by {|k, v| v[@sort]}
        @applicant = @applicant.to_h
      elsif !@filter1.nil? && @filter1.has_key?('filter') && !@filter1['order'].nil? && @filter1['order'] == 'Descending'
        @sort = @filter1['filter']
        @applicant = (@applicant.sort_by {|k, v| v[@sort]}).to_a.reverse
        @applicant = @applicant.to_h
      end
      @app_keys = Hash.new
      @applicant.each do |k, v|
        @app_keys[k] = ''
      end
      # export_data(@applicant)
      respond_to do |format|
        format.html {render partial: 'applicants'}
      end
        # redirect_to @data[:url], :alert => {'filterdata' => @allfilter, 'order' => @data[:order]}
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts "caught exception #{ex}!"
    end
  end

  def sort_applicants_advance
    begin

      @filter = params
      @advance = Hash.new
      applicant = get_applicants(params['all_app_keys'])
      applicant = applicant.to_s.gsub('=>', ':').to_s.gsub(':nil', ':""')
      @applicant = JSON.parse(applicant)
      if @filter.has_key?('Salary') && @filter['Salary'] != " "
        @advance['salary'] = @filter['Salary']
      else
        @advance['salary'] = 0
      end

      if @filter.has_key?('cl') && @filter['cl'] != " "
        @advance['cl'] = @filter['cl']
      else
        @advance['cl'] = 0
      end

      if @filter.has_key?('eff_score') && @filter['eff_score'] != " "
        @advance['eff_score'] = @filter['eff_score']
      else
        @advance['eff_score'] = 0
      end

      if @filter.has_key?('res_score') && @filter['res_score'] != " "
        @advance['res_score'] = @filter['res_score']
      else
        @advance['res_score'] = 0
      end

      if @filter.has_key?('imp_score') && @filter['imp_score'] != " "
        @advance['imp_score'] = @filter['imp_score']
      else
        @advance['imp_score'] = 0
      end
      @filter1 = {'advance' => @advance, 'order' => @filter[:order]}

      if !@filter1.nil? && @filter1.has_key?('advance') && (@filter1['order'].nil? || @filter1['order'] == 'Ascending')
        @applicant.each do |key, value|
          @applicant[key]['weight'] = ((@applicant[key]['cl']).to_f) * ((@filter1['advance']['cl']).to_f) + ((@applicant[key]['Salary']).to_f) * ((@filter1['advance']['Salary']).to_f) + ((@applicant[key]['res_score']).to_f) * ((@filter1['advance']['res_score']).to_f) + ((@applicant[key]['eff_score']).to_f) * ((@filter1['advance']['eff_score']).to_f) + ((@applicant[key]['imp_score']).to_f) * ((@filter1['advance']['imp_score']).to_f)
        end
        @applicant = @applicant.sort_by {|k, v| v['weight']}
        @applicant = @applicant.to_h
      elsif !@filter1.nil? && @filter1.has_key?('advance') && !@filter1['order'].nil? && @filter1['order'] == 'Descending'
        @applicant.each do |key, value|
          @applicant[key]['weight'] = ((@applicant[key]['cl']).to_f) * ((@filter1['advance']['cl']).to_f) + ((@applicant[key]['Salary']).to_f) * ((@filter1['advance']['Salary']).to_f) + ((@applicant[key]['res_score']).to_f) * ((@filter1['advance']['res_score']).to_f) + ((@applicant[key]['eff_score']).to_f) * ((@filter1['advance']['eff_score']).to_f) + ((@applicant[key]['imp_score']).to_f) * ((@filter1['advance']['imp_score']).to_f)
        end
        @applicant = (@applicant.sort_by {|k, v| v['weight']}).to_a.reverse
        @applicant = @applicant.to_h
      end
      @app_keys = Hash.new
      @applicant.each do |k, v|
        @app_keys[k] = ''
      end
      # export_data(@applicant)
      respond_to do |format|
        format.html {render partial: 'applicants'}
      end
        # redirect_to @data[:url], :alert => {'filterdata' => @allfilter, 'order' => @data[:order]}
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts "caught exception #{ex}!"
    end

  end


  def upload
    begin
      @data = params
      puts @data
      @application = Hash.new
      @userchoice = Array.new
      @Questions = Hash.new
      for i in 1..19 do
        ind = 'que' + i.to_s
        @Questions[ind] = @data[ind]
        if ind == 'que2'
          @userchoice[i - 1] = [@data[ind].to_i + 1, 0]
        else
          @userchoice[i - 1] = @data[ind].to_i + 1
        end


      end

      # for i in 20...@data.length do
      #   if @data['opt_que'+i.to_s].present?
      #   ind = 'opt_que' + i.to_s
      #   @opt_que[ind] = @data[ind]
      # end
      # end

      @app_id = 'app_id_' + (((Time.now.to_f) * 1000).to_i).to_s
      @application['roleid'] = @data['roleid']
      @application['app_id'] = @app_id
      @application['Name'] = @data['Name']
      @application['Email'] = @data['Email']
      @application['Phone'] = @data['Phone']
      @application['Degree'] = @data['Degree']
      if @data.has_key?('Degree1')
        @application['Degree1'] = @data['Degree1']

      end
      if @data.has_key?('Degree2')
        @application['Degree2'] = @data['Degree2']

      end
      @application['Institutions'] = @data['Institutions']
      if @data.has_key?('Institutions1')
        @application['Institutions1'] = @data['Institutions1']

      end
      if @data.has_key?('Institutions2')
        @application['Institutions2'] = @data['Institutions2']

      end
      @application['Year_of_experience'] = @data['Year_of_experience']
      @Year_of_experience = @application['Year_of_experience']
      if @Year_of_experience == "0"
        @application['Technical_skills'] = @data['Technical_skills']
        @application['Designation'] = "N/A"
        @application['Company'] = "N/A"
        @application['Industry'] = "N/A"
        @application['Function'] = "N/A"
        @application['Department'] = "N/A"
        @application['Salary'] = 0
        @application['customers'] = "N/A"
        @application['Revenue'] = 0
        @application['Employees'] = 0
        @application['level'] = 0
        @application['Questions'] = @Questions

      else
        @application['Technical_skills'] = @data['Technical_skills']
        @application['Designation'] = @data['Designation']
        @application['Company'] = @data['Company']
        @application['Industry'] = @data['Industry']
        @application['Function'] = @data['Function']
        @application['Department'] = @data['Department']
        @application['Salary'] = @data['Salary']
        @application['customers'] = @data['customers']
        @application['Revenue'] = @data['Revenue']
        @application['Employees'] = @data['Employees']
        @application['level'] = @data['level']
        @application['Questions'] = @Questions
      end
      token = SecureRandom.hex(16)
      @application['token'] = token.to_s
      @application['isread'] = false
      optional = Hash.new
      if @data.has_key?('opt_que')
        @data['opt_que'].each do |key, value|
          optional[key] = value
        end
      end
      @application['que_optional'] = optional
      @application['Resume'] = Array.new
      @approle = CorporateRole.find_by(:role_id => @data['roleid'])
      @RoleDes = @approle['role_designation']
      @Rolefun = @approle['role_function']
      @Roledsf = @approle['dep_sub_fun']
      @application['role_name'] = @approle['role_designation']
      @response = @approle['responses']
      @response.push(@application['app_id'])
      @approle['responses'] = @response

      @company = CorporateCompany.find_by(:company_id => @approle['company_id'])
      @respo = @company['responses']
      @respo.push(@application['app_id'])
      @company['responses'] = @respo
      uploaded_io = params[:file]
      if !uploaded_io.nil? && uploaded_io.content_type == 'application/pdf'

        resume_id = CorporateResume.save_pdf(uploaded_io, @app_id)
        @application['resume_id'] = resume_id

        generate_pdf = CorporateResume.get_pdf(resume_id)
        final_pdf = generate_pdf.data


        File.open(Rails.root.join('public', 'uploads', @app_id + '.pdf'), 'wb') do |file|
          if generate_pdf.contentType == 'application/pdf'
            # @application['Resume'][0] = @app_id
            final_pdf = final_pdf.to_s + "%EOF"
            final_pdf.each_char do |char|
              file.write(char)
            end
            # respond_to do |format|
            #   format.html { redirect_to(root_url, :notice => 'File was uploaded.') }
            # end
          else
            flash[:warning] = 'please select pdf file'
            # redirect_to corporate_application_path
          end
        end
        require 'open-uri'
        filename = '/uploads/' + @app_id.to_s + '.pdf'
        if $live
        path = 'https://' + request.host + ':' + request.port.to_s + filename
        else
          path = 'http://' + request.host + ':' + request.port.to_s + filename
        end
        io = open(path)
        # name=uploaded_io.original_filename
        reader = PDF::Reader.new(io)
        data = Array.new
        reader.pages.each_with_index do |page, i|
          # puts page.fonts
          if i == 19
            break
          end
          data[i] = page.text
          # puts page.raw_content
        end
        @application['Resume'] = data
        puts Dir.pwd + '/public/uploads/' + 'app_id_1537336431551' + '.pdf'
        fil = Rails.root.to_s + '/public' + filename
        File.delete(fil)
      end
      issave = CorporateApplication.create(@application)
      # CorporateRole.where(:role_id => @data['roleid']).update(:responses => @response)
      # CorporateCompany.where(:company_id => @approle['company_id']).update(:responses => @company['responses'])
      if !(@Year_of_experience == "0") && !params['prevent_b2c'].present?
        create_user(@app_id)
      end
      if issave
        @msg = '        Name : ' + @data['Name'].to_s + '
        ' + @msg = 'Email : ' + @data['Email'].to_s + '
        ' + @msg = 'Contact : ' + @data['Phone'].to_s + '
        ' + @msg = 'Role Id : ' + @data['roleid'].to_s + '
        ' + @msg = 'Role Name : ' + @RoleDes + ' | ' + @Rolefun + ' - ' + @Roledsf
        send_applicant_mail(@msg)
        flash[:success] = 'Thank you for your response!'
        redirect_to '/corporate/thank_you_page'
      end

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      loger(ex.to_s)
      puts ex.message
      if ex.message == 'Invalid password ()'
        flash[:success] = 'Your PDF is password protected!'
      else
        flash[:success] = 'Something went wrong!'
      end
      redirect_to '/corporate/application/' + @data['roleid']
      # flash[:success] = 'Thank you for your response!'
      # redirect_to '/corporate/thank_you_page'
    end
  end

  def create_user(app_id)
    begin
      @data = CorporateApplication.find_by(:app_id => app_id)
      @application = Hash.new
      @userchoice = Array.new
      @Questions = Hash.new
      for i in 1..19 do
        ind = 'que' + i.to_s
        @Questions[ind] = @data['Questions'][ind]
        if ind == 'que2'
          @userchoice[i - 1] = [@data['Questions'][ind].to_i + 1, 0]
        else
          @userchoice[i - 1] = @data['Questions'][ind].to_i + 1
        end


      end
      @CompanyDetails = Array.new
      if @data['customers'] == 'Regional (1-5 States)'
        @CompanyDetails[0] = 1
      elsif @data['customers'] == 'National (5+ States)'
        @CompanyDetails[0] = 2
      elsif @data['customers'] == 'International (1-5 Countries)'
        @CompanyDetails[0] = 3
      elsif @data['customers'] == 'Global (5+ Countries)'
        @CompanyDetails[0] = 4
      end
      @CompanyDetails[1] = @data['Employees']
      @CompanyDetails[2] = @data['Revenue']
      if @data['level'] == 'Junior Management (Typically entry level professionals)'
        @CompanyDetails[3] = 1
      elsif @data['level'] == 'Middle Management (If you have someone reporting to you who is NOT a workman)'
        @CompanyDetails[3] = 2
      elsif @data['level'] == 'Senior Management (Typically third level)'
        @CompanyDetails[3] = 3
      elsif @data['level'] == 'Top Management (Typically top 2 levels)'
        @CompanyDetails[3] = 4
      end
      inputs = Array.new
      inputs = [0, @CompanyDetails[0], [@CompanyDetails[1], @CompanyDetails[2]], @CompanyDetails[3]]
      @userchoice.each do |k|
        inputs.push(k)
      end
      cl = CLCalculation(inputs, @data["Industry"].strip)

      @main_user = Hash.new
      @main_user["Salary"] = @data['Salary']
      @main_user["Level"] = cl[0]
      @main_user["EffectiveLevel"] = 2
      @main_user["Name"] = "guestUser"
      @main_user["Contact"] = @data['Phone']
      @main_user["Email"] = ""
      # @main_user["Email"] = @data['Email']
      @main_user["Password"] = "123456"
      @main_user["Experience"] = @data['Year_of_experience'].to_i
      @main_user["Education"] = @data["Degree"][0].strip.gsub('\r', "").gsub('\n', "")
      @main_user["Role"] = @data["Function"]
      @main_user["Industry"] = @data["Industry"]
      @main_user["Institute"] = @data['Institutions'][0].strip.gsub('\r', "").gsub('\n', "")
      @main_user["Company"] = @data['Company']
      @main_user["Score"] = 0
      @main_user["CompanyDetails"] = @CompanyDetails
      @main_user["UserChoices"] = @userchoice
      @main_user["Preference"] = []
      @main_user["ClickMode"] = "AM"
      @main_user["Designation"] = @data['Designation']
      @main_user["token"] = @data['token']
      # @main_user["resolvData"] = {}
      # @main_user["reportValues"] = {}
      # @main_user["growthValues"] = {}
      isuser = UserGuest.find_by(:token => @data['token'])
      if isuser.nil?
        UserGuest.create(@main_user)
      end
      return true
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def send_report
    begin
      data = params
      @host_raw = request.original_url.to_s.split('/')
      @host = @host_raw[0].to_s + '//' + @host_raw[2]
      @applicant1 = CorporateApplication.find_by(:app_id => data['app_id'])
      if @applicant1['token'].present?
        token = @applicant1['token']
      else
        token = SecureRandom.hex(16)
        @applicant1['token'] = token.to_s
        @applicant1.save
      end

      link = @host + '/corporate/redirect/' + token
      issent = ApplicationMailer.reset_password_mail(data['Email'], link).deliver
      create_user(data['app_id'])
      render json: {status: 200, msg: 'Successfully sent email!'}
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      ex.message
    end
  end

  def redirect
    data = params
    @token = data['token']
    # @user = User.find_by(:token => data['token'])
    # if !@user.nil?
    #   # @user['Password'] = data['password']
    #   #       # @user.save
    #   # flash[:success] = "Successfully set password!"
    #   # render :json => {status: 200, msg: "Successfully Logged In!", username: @user}
    # else
    #   render :json => {status: 501, msg: "This email is not registered!"}
    #   flash[:success] = "This email is not registered!"
    # end
  end

  def set_user_data
    data = params


    @user = UserGuest.find_by(:token => data['token'])
    if !@user.nil?
      # @user['Password'] = data['password']
      #       # @user.save
      # flash[:success] = "Successfully set password!"
      render :json => {status: 200, msg: "Successfully Logged In!", username: @user}
    else
      render :json => {status: 501, msg: "This email is not registered!"}
      flash[:success] = "This email is not registered!"
    end

    # @user = User.find_by(:Email => data['Email'])
    # if !@user.nil?
    #   @user['Password'] = data['password']
    #   @user.save
    #   flash[:success] = "Successfully set password!"
    #   render :json => {status: 200, msg: "Successfully Logged In!", username: @user}
    # else
    #   render :json => {status: 501, msg: "This email is not registered!"}
    #   flash[:success] = "This email is not registered!"
    # end
  end

  def new_team_member
    begin
      @sender = params['sender']
      @member = CorporateTeamMember.find_by('token' => params['token'])
      @validlink = true
      if @member.nil?
        @validlink = false
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def generate_token()
    if session['user_type'] == 'recruiter'
      user = RecruiterUser
    else
      user = CorporateUser
    end
    @token = SecureRandom.hex(16)
    @isPresent = user.find_by(:forgot_token => @token.to_s)
    if (!@isPresent.nil?)
      generate_token()
    end
    return @token.to_s
  end

  def corporate_forgot_password
    begin
      @data = Hash.new
      @data = params["email"]
      user_type = 'corporate'
      user = CorporateUser.find_by(:email => @data)
      # if params['user_type'].present?&&params['user_type']=='recruiter'
      if user.nil?
        user = RecruiterUser
        user_type = 'recruiter'
      else
        user = CorporateUser
      end
      session['user_type'] = user_type

      @user = user.find_by(:email => @data)
      if !@user.nil?
        @token = generate_token()
        @host_raw = request.original_url.to_s.split('/')
        @host = @host_raw[0].to_s + '//' + @host_raw[2]
        @link = @host + "/" + user_type + "/reset_password/" + @token.to_s
        ApplicationMailer.corporate_forgot_password_mail(@data, @link).deliver
        @user['forgot_token'] = @token.to_s
        issave = @user.save
        flash[:success] = 'Email Has Been Successfully Sent !'
        if params['authenticity_token'].present?
          redirect_to '/#!/page/index#home3'
        else
          render json: {status: 200, msg: 'Email Has Been Successfully Sent !'}
        end

      else
        flash[:success] = 'Sorry, this email is not registered with is. Please re-enter your email or register with us.'
        if params['authenticity_token'].present?
          redirect_to '/#!/page/index#home3'
        else
          render json: {status: 200, msg: 'Sorry, this email is not registered with is. Please re-enter your email or register with us.'}
        end


      end
    end
  rescue Exception => ex
    log = ex.message.to_s + "...........in...." + params['action']
    loger(log)
    puts ex.message
  end


  def reset_password
    if session['user_type'] == 'recruiter'
      user = RecruiterUser
    else
      user = CorporateUser
    end
    @isvalid = CorporateUser.find_by(:forgot_token => params['token'])
    if @isvalid.nil?
      flash[:success] = "This Link Has Been Expired!"
      redirect_to '/#!/page/index#home3'
    end
  end

  def set_password
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      password = params['password']
      @user = CorporateUser.find_by(:forgot_token => params['token'])
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

  def save_team_member
    begin
      if session['user_type'] == 'recruiter'
        user = RecruiterUser
      else
        user = CorporateUser
      end
      @user = user.find_by(:email => params['sender'])
      @isUser = user.find_by(:email => params[:email])
      @company = CorporateCompany.find_by(:company_id => @user['company_id'])

      if @isUser.nil? || @isUser.empty?
        @Invite = Hash.new
        @Invite["user_id"] = 'uId_' + ((Time.now.to_f * 1000).to_i).to_s
        @Invite["company_id"] = @user['company_id']
        @Invite["user_first_name"] = params[:first_name]
        @Invite["user_last_name"] = params[:last_name]
        @Invite["email"] = params[:email]
        @Invite["usertype"] = params[:usertype]
        @Invite["members"] = Hash.new
        @Invite["designation"] = params[:designation]
        @Invite["password"] = params[:password]
        @Invite["add_permissions_selective"] = @user['add_permissions_selective']
        @Invite["update_permissions_selective"] = @user['update_permissions_selective']
        @Invite["delete_permission_selective"] = @user['delete_permission_selective']
        issave = user.create(@Invite)
        flash[:success] = "Successfully registered"
        # @members = @user['members']
        # @members[@Invite["user_id"]] = @Invite["usertype"]
        # @user['members'] = @members
        # user.where(:email => params['sender']).update('members' => @user['members'])

        @members = @company['members']
        @members[@Invite["user_id"]] = @Invite["usertype"]
        @company['members'] = @members


        CorporateCompany.where(:company_id => @user['company_id']).update('members' => @company['members'])
        @token = CorporateTeamMember.find_by('token' => params['token'])
        @token.delete

        # redirect_to "/corporate/login"
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def candidate
    begin
      if session.has_key?('User') && session[:User]['islogin']
        @app_id = params[:app_id]
        @applicant = CorporateApplication.find_by('app_id' => @app_id)
        @YearOfExp = @applicant['Year_of_experience']
        @applicant['isread'] = true
        @applicant.save
        @company_id = session[:User]['company_id']
        @data = CorporateCompany.find_by('company_id' => @company_id)
        @myrole = CorporateRole.find_by('role_id' => @applicant['roleid'])
        @candidata = clcandidate(@applicant)

        @cl = @candidata[0]
        if @cl == ""
          @cl = 0
        end
        @candi_score = @candidata[1]

        userCompany = @applicant['Company'].strip
        userFunction = @applicant['Function'].strip
        if !@applicant['Salary'].nil?
          userSalary = @applicant['Salary'] * 100000
        else
          @applicant['Salary'] = 0
        end


        @percentile = candidatePercentile(@cl, userCompany, userFunction, userSalary)

        @candi_answers = Array.new
        @applicant['Questions'].each do |k, v|
          @candi_answers.push((v.to_i) + 1)
        end
        @allQues = CorporateQuestion.getques()
        @allroles = Hash.new
        @CandidateQues = ApplicantQuestion.getques()
        @allroles = Hash.new

        # user.find_by(:email=>@email)
        # @allRoles=CorporateRole.getroles()

        if !@data['roles'].empty?
          @roles = @data['roles']
          @roles.each do |k, v|
            role = CorporateRole.find_by('role_id' => k)
            if !(role['partial'].present?)
              @allroles[k] = role
            end
          end
        end


        if params['role'].present?
          @role = @allroles[params['role']]
        else
          if @myrole.nil? && !@data.nil? && !@data['roles'].nil?
            @data['roles'].each do |k, v|
              @first = k
              break
            end
            @role = CorporateRole.find_by('role_id' => @first)
          else
            @role = @myrole
          end

        end


        if !@role.nil? && !(@role['min_salary'].nil? || @role['max_salary'].nil? || @role['min_experience'].nil? || @role['max_experience'].nil?)
          @salchart = @role['max_salary'] - @role['min_salary']
          @expchart = @role['max_experience'] - @role['min_experience']
        end
        @role_answers = Array.new
        @role_answers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        if !@role['cl_data'].present?
          @roledata = rolecl(@role)
          CorporateRole.where(:role_id => @roleid).update(:cl_data => @roledata)
        else
          @roledata = @role['cl_data']
        end
        @rolecl = @roledata[0]
        @role_score = @roledata[1]
        @clchart = (@rolecl * 0.2).to_i
        @role_answers = []
        @role['questions'].each do |k, v|
          @role_answers.push((v.to_i))
        end
        data = @applicant['Resume']
        if data.length != 0
          @percent_keyword, @keyword = keyword_per(data, @role['role_keyword'])
        else
          @percent_keyword = 0
          @keyword = {}
        end
        # generate_pdf=CorporateResume.get_pdf("5b9fb3b0dbefa81b3416e48c")
        # dddd=generate_pdf.data
        # res=send_data(dddd, :filename => "output.pdf", :type => "application/pdf")

        #
        # if @cl == 'partial' || @role_score[0].is_a?(String)
        #   flash['success'] = 'This appication is Partially Filled!'
        #   if params['page'].present? && params['page'] == '1'
        #     redirect_to '/corporate/dashboard/?page=1'
        #   elsif params['page'].present? && params['page'] == '2'
        #     redirect_to '/corporate/summary_report/' + @applicant['roleid'] + '#hide-3'
        #   end
        # end
        @clchart = 2
        @clmin = @rolecl - (2 * @clchart)
        @clmax = @rolecl + (2 * @clchart)
        @cltick1 = @rolecl - @clchart
        @cltick2 = @rolecl + @clchart


        @exmin = @role['min_experience'] - @expchart
        @exmax = @role['max_experience'] + @expchart
        @extick = @role['max_experience'] - @expchart

        @samin = @role['min_salary'] - @salchart
        @samax = @role['max_salary'] + @salchart
        @satick = @role['max_salary'] - @salchart

        @maxexperience = @role['max_experience']
        @maxsalary = @role['max_salary']
      else
        flash[:success] = 'Please Do Log in First'
        redirect_to '/#!/page/index#home3'
      end
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def download_pdf
    begin
      resume_id = params[:resume_id]
      generate_pdf = CorporateResume.get_pdf(resume_id)
      name = generate_pdf['filename'].split('/')
      final_pdf = generate_pdf.data
      res = send_data(final_pdf, :filename => 'Resume_' + name[1].to_s, :type => "application/pdf")
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def resume_data(app_id)
    begin
      @app_id = app_id
      require 'open-uri'
      filename = '/uploads/' + @app_id.to_s + '.pdf'

      if $live
      path = 'https://' + request.host + ':' + request.port.to_s + filename
      else
      path = 'http://' + request.host + ':' + request.port.to_s + filename
      end

      io = open(path)
      reader = PDF::Reader.new(io)
      data = Array.new
      reader.pages.each_with_index do |page, i|
        # puts page.fonts
        data[i] = page.text
        # puts page.raw_content
      end
      return data
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def keyword_per(data, role_keyword)
    begin
      @bool = false
      keyword = Hash.new
      role_keyword.each_with_index do |val, ind|
        if val != ""
          data.each do |key|
            @bool = key.downcase.include? val.downcase
            if @bool
              break
            end
          end
          keyword[val] = @bool
        end
      end
      @match = 0
      keyword.each do |k, v|
        if v == true
          @match = @match + 1
        end
      end
      percent_keyword = (@match * 100) / keyword.length
      if percent_keyword.nil?
        percent_keyword = 0
      end
      return percent_keyword, keyword
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def record_log
    begin
      data = params['data']
      loger(data)
    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def loger(info)
    begin
      date = Time.now.strftime('%F').to_s
      mylog = Logger.new('log/logs_' + date + '.log')
      if session['User'].present? && session['User']['Email'].present?
        email = session['User']['Email'].to_s
        mylog.info 'Logged in with - ' + email + ' | ' + info
      else
        email = ""
        mylog.info info
      end

    rescue Exception => ex
      log = ex.message.to_s + "...........in...." + params['action']
      loger(log)
      puts ex.message
    end
  end

  def clcandidate(applicant)
    @session = session[:User]
    # @role = CorporateRole.find_by('role_id' => applicant['roleid'])
    userIndustry = applicant['Industry'].strip
    inputs = Array.new
    if applicant['customers'] == 'Regional (1-5 States)'
      inputs[1] = 1
    elsif applicant['customers'] == 'National (5+ States)'
      inputs[1] = 2
    elsif applicant['customers'] == 'International (1-5 Countries)'
      inputs[1] = 3
    elsif applicant['customers'] == 'Global (5+ Countries)'
      inputs[1] = 4
    end
    inputs[2] = [applicant['Employees'], applicant['Revenue']]
    if applicant['level'] == 'Junior Management (Typically entry level professionals)'
      inputs[3] = 0
    elsif applicant['level'] == 'Senior Management (Typically third level)'
      inputs[3] = 1
    elsif applicant['level'] == 'Middle Management (If you have someone reporting to you who is NOT a workman)'
      inputs[3] = 2
    elsif applicant['level'] == 'Top Management (Typically top 2 levels)'
      inputs[3] = 3
    end
    a = 4
    applicant['Questions'].each do |k, v|
      if (a == 5)
        inputs[a] = [(v.to_i) + 1, 0]
      else
        inputs[a] = v.to_i + 1
      end

      a += 1
    end
    cl = CLCalculation(inputs, userIndustry)
    if cl[0] == 'partial'
      cl = [0, [0, 0, 0]]
    end
    return cl
  end

  def rolecl(role)
    @session = session['User']
    if !@session['geographical_Spread'].present?
      @session = CorporateCompany.find_by(:company_name => role['company_name'])
    end
    userIndustry = role['role_industry'].strip
    inputs = Array.new
    if @session['geographical_Spread'] == 'Regional (1-5 States)'
      inputs[1] = 1
    elsif @session['geographical_Spread'] == 'National (5+ States)'
      inputs[1] = 2
    elsif @session['geographical_Spread'] == 'International (1-5 Countries)'
      inputs[1] = 3
    elsif @session['geographical_Spread'] == 'Global (5+ Countries)'
      inputs[1] = 4
    end
    inputs[2] = [@session['no_of_employees'], @session['revenue']]
    if role['seniority'] == 'Junior Management (Typically entry level professionals)'
      inputs[3] = 0
    elsif role['seniority'] == 'Senior Management (Typically third level)'
      inputs[3] = 1
    elsif role['seniority'] == 'Middle Management (If you have someone reporting to you who is NOT a workman)'
      inputs[3] = 2
    elsif role['seniority'] == 'Top Management (Typically top 2 levels)'
      inputs[3] = 3
    end
    a = 4
    role['questions'].each do |k, v|
      if (a == 5)
        inputs[a] = [v.to_i, 0]
      else
        inputs[a] = v.to_i
      end

      a += 1
    end
    cl = CLCalculation(inputs, userIndustry)
    return cl
  end

end
