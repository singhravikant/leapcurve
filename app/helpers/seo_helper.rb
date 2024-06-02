module SeoHelper
  def get_seo_data()
    begin
      url = request.fullpath
      url_array = url.split('/')
      action = url_array[2]
      if $da_path=="leapCurveTest"
      client = Mongo::Client.new(['103.90.241.54:20189'], :database => 'leapCurveTest', :user => 'leapcurvedb', :password => 'leapcurve@54db', :auth_source => 'admin')
      else
      client = Mongo::Client.new(['103.90.241.122:57017'], :database => 'mylestone', :user => 'mylestone', :password => 'mylestone123', :auth_source => 'admin')
      end
      db = client.use($da_path)
      @db_data = Hash.new
      @db_data = client[:seo_collection].find.each {|doc|
        if doc.include?('page')&&doc['page']==action
          @title = doc['title']
          @description = doc['description']
          @keyword = doc['keyword']
        else
          @title = 'Leap Curve'
        end

      }

      client.close
    rescue Exception => ex
      puts ex.message
      client.close
    end
  end


end