class ResultsController < ApplicationController
  before_action :set_vars_for_jbuilder

  def index
    respond_to do |format|
      format.html # index.html.erb
      format.json # index.json.jbuilder
    end
  end

  private
  def set_vars_for_jbuilder
    @is_admin = !!current_user&.is_admin?
  end
end