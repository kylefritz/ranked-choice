class ResultsController < ApplicationController
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.json do
        # TODO: is this slow? i don't think so
        the_votes = Vote.all.map(&:candidate_preference)
        _, tallys_by_round = Election.new(the_votes).ranked_choice_results
        render json: tallys_by_round
      end
    end
  end
end