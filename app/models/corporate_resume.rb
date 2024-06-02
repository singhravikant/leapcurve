class CorporateResume
  include Mongoid::Document

    field :resume_id, :type => String
  protected
    def self.save_pdf(file_path,id)
      begin
      resume_id = Mongoid::GridFs.put(file_path).id
      # self.save
        return resume_id
      rescue Exception=>ex
        puts ex.message
        end
    end

    def self.get_pdf(resume_id)
      Mongoid::GridFs.get(resume_id)
    end

end
