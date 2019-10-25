class HomeController < ApplicationController
  def show
    if Setting.voting_enabled
      return redirect_to :votes
    end

    if Setting.results_enabled
      return redirect_to :results
    end

    return redirect_to :questions
  end

  def signout
    sign_out :user
    redirect_to "/"
  end
end
