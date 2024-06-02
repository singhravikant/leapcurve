class ApplicationMailer < ActionMailer::Base
  default from: 'support@leapcurve.com'

  # def mailer(user)
  #   @user = user
  #   @url  = 'http://example.com/login'
  #   mail(to: @user.email, subject: 'Link to Reset password')
  # end
  def forgot_password_mail(email, link)
    if (email != "") && (link != "")
      @email = email
      @link = link
      mail(:to => email,
           :bcc => "aanchal@algowire.com,stutivermaa@gmail.com",
           :subject => "Leap Curve Reset Password")
    end
  end


  def send_file_log(email, logfile)
    @now = Time.now.to_s
    attachments.inline["Leap_Curve_logs_file " + @now.to_s] = File.read(logfile)
    mail(:to => email,
         :cc => "stutivermaa@gmail.com",
         :subject => "Leap Curve logs file " + @now.to_s
    )
  end

  def send_applicant_mail(email, logfile,msg)
    @now = Time.now.to_s
    # attachments.inline["Leap_Curve_logs_file " + @now.to_s] = File.read(logfile)
    mail(:to => email,
         :cc => "",
         :subject => "Leap Curve New Applicant Details " + @now.to_s,
    :body =>msg
    )
  end


  def new_team_member_invitation(email, sender, link, name)
    if (email != "") && (link != "")
      @email = email
      @sender = sender
      @link = link
      @name = name
      mail(:to => email,
           :bcc => "aanchal@algowire.com",
           :subject => "Leap Curve Member Invitation")
    end
  end

  def corporate_forgot_password_mail(email, link)
    begin
      if (email != "") && (link != "")
        @email = email
        @link = link
        mail(:to => email,
             :bcc => "",
             :subject => "Leap Curve Forget Password")
      end
    rescue Exception => ex
      puts ex.message
    end
  end

  def reset_password_mail(email, link)
    begin
      if (email != "") && (link != "")
        @email = email
        @link = link
        mail(:to => 'aanchal@algowire.com',
             :bcc => "",
             :subject => "Leap Curve Report"

        )
      end
    rescue Exception => ex
      puts ex.message
    end
  end

  def contact_us_mail(name,email, body)
    begin
      if (email != "") && (body != "")
        mail(:to => 'mylestones.help@gmail.com',
             :bcc => "",
             :subject => "Contact us from "+email,
             :body => name.upcase+"\n"+body

        )
      end
    rescue Exception => ex
      puts ex.message
    end
  end

end

