class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  $filePath='./allFiles/'
  $filePathCCX='./graphTypes/'
  $filePathCCY='./Percentiles/'
  $da_path='mylestone'

  $live = true;
  def angular
    # render 'layouts/application'
    # render :json => {status=>200}
  end
end
