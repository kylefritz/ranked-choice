class HomeController < ApplicationController
  def show
    if Setting.voting_enabled
      return redirect_to :votes
    end

    if Setting.results_enabled
      return redirect_to :results
    end

    if Setting.questions_enabled
      return redirect_to :questions
    end
  end
end
