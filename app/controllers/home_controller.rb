class HomeController < ApplicationController
  def show
    redirect_to :questions
  end
end
