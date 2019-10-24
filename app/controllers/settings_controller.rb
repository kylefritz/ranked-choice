class SettingsController < ApplicationController
  before_action :redirect_unless_user_is_admin!

  def questions
    Setting.questions_mode!
    redirect_to '/admin/app'
  end

  def voting
    Setting.voting_mode!
    redirect_to '/admin/app'
  end

  def results
    Setting.results_mode!
    redirect_to '/admin/app'
  end
end