Rails.application.routes.draw do
  get 'home/index'

  get 'corporate/send_log_mail', to: 'corporate#send_log_mail'
  get 'corporate/login'
  get 'corporate/new_team_member'
  post 'corporate/save_team_member'
  post 'corporate/other_Question'
  post 'corporate/Contact'
  post 'corporate/change_password'
  post 'corporate/corporate_forgot_password'
  get 'corporate/logout'
  get '/assessor_questionnaire' => 'corporate#assessor_questionnaire'
  get 'corporate/reset_password/:token' => 'corporate#reset_password'
  post 'corporate/set_password'
  post 'corporate/impact_qustion'
  post 'users/impact_qustion'
  get 'corporate/thank_you_page'
  get 'corporate/my_account'
  get 'corporate/edit_account'
  post 'corporate/update_account'
  post 'corporate/match_password'
  post 'corporate/login_status'
  get 'corporate/summary_report/:roleid' => 'corporate#summary_report'
  get 'corporate/salary_report/:roleid' => 'corporate#salary_report'
  get 'corporate/edit_role/:roleid' => 'corporate#edit_role'
  post 'corporate/update_role'
  get 'corporate/add_role_info'
  get 'corporate/add_role_candidate_info/:roleid' => 'corporate#add_role_candidate_info'
  get 'corporate/role_summary'
  get 'corporate/dashboard'
  post 'corporate/delete_applicant'
  post 'corporate/update_application'
  get 'corporate/edit_application/:app_id' => 'corporate#edit_application'
  get 'corporate/add_role_summary/:roleid' => 'corporate#add_role_summary'
  get 'corporate/registration'
  get 'corporate/registration-recruitment'=>'corporate#registration_recruitment'
  get 'corporate/member_registration'
  get 'corporate/add_role_cl/:roleid' => 'corporate#add_role_cl'
  post 'corporate/getAllQuestion'
  get 'corporate/invite_new_member'
  post 'corporate/invite_member'
  get 'corporate/corporate_dashboard'
  get 'corporate/application/:roleid' => 'corporate#application'
  get 'corporate/job_application/:roleid' => 'corporate#job_application'
  post 'corporate/upload'
  post 'corporate/deleterole'
  post 'corporate/sort_applicants'
  post 'corporate/filter_applicants'
  post 'corporate/sort_applicants_advance'
  get 'corporate/candidate/:app_id' => 'corporate#candidate'
  post 'corporate/candidate/:app_id' => 'corporate#candidate'
  post 'corporate/select_role'
  post 'corporate/delete_member'
  post 'corporate/add_question'
  post 'corporate/delete_question'
  post 'corporate/edit_question'
  post 'corporate/send_report'
  get 'corporate/download_pdf/:resume_id' => 'corporate#download_pdf'
  get 'corporate/redirect/:token' => 'corporate#redirect'
  post 'corporate/set_user_data'
  post 'corporate/download_data'
  post 'corporate/get_seo'
  post 'corporate/get_jobs'
  # resources :corporate do
  #   collection {post :upload}
  # end

  post 'find_company/index'
  post 'find_company/getAllCharts'
  post 'corporate/new_member_registration'
  post 'report/CalculateIntialValues'
  post 'report/calculateUserPosition'
  post 'report/calculateIntalBar'
  post 'report/compensationGraph'
  post 'report/getCompensationChart'
  post 'report/getPromotionChart'
  post 'report/GrowthReport'
  post 'report/CLReport'
  post 'report/getInitialChart'
  post 'corporate/add_newroll_3'
  post 'users/reset_password'
  post 'users/user_reset_password'
  post 'corporate/corporate_login'
  get 'corporate/add_new_role'
  post 'corporate/add_newrole'
  post 'corporate/add_role_summary'
  post 'corporate/sign_up'
  post 'corporate/changefilter'
  post 'corporate/record_log'
  get 'corporate/get_seo'
  post 'corporate/find_company'

  get 'recruiter/registration'
  post 'recruiter/sign_up'
  get 'recruiter/reset_password/:token' => 'recruiter#reset_password'
  post 'recruiter/set_password'


  get 'admin/getDistnicValues'
  get 'qustioner/getStarted'
  get 'qustioner/gotoQuiz'
  post 'qustioner/getAllQuestions'
  post 'qustioner/getQuestionFactorWise'
  post 'qustioner/report'
  post 'qustioner/getGrowthChart'
  post 'qustioner/getPromationChart'
  post 'qustioner/getRoleChart'
  post 'qustioner/getScore'
  post 'qustioner/getMyLevel'
  post 'corporate/add_new_role_1'
  post 'corporate/add_newrole_3'
  get 'users/readFile'
  get 'users/SignUpForm'
  post 'users/delete_account'
  post 'users/getUserInfo'
  post 'users/show_selected_opt_details'
  post 'users/conpentency_cl_cal'
  post 'users/get_compentency_result'
  post 'users/getquestioninformation'
  post 'users/user_forgot_password'
  post 'users/getUserLevel'
  post 'users/updateUserInfo'
  post 'users/sign_up_user'
  post 'users/sign_up_initial'
  post 'users/Login_user'
  post 'users/checkUser'
  post 'users/updateUserPassword'
  post 'qustioner/getIndustryWiseAvgSalary'
  post 'qustioner/getRoleWiseAvgScore'
  post 'qustioner/getAllIndustries'
  get 'qustioner/getAllRoles'
  root 'admin#index'
  get '*any' => "corporate#error_page"

  # root to: 'application#angular'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
