class QuestionsController < ApplicationController
  def index
    @questions = Question.includes(:question_votes).all.sort_by {|q| -1 * q.vote_count }
    respond_to do |format|
      format.html # index.html.erb
      format.json # index.json.jbuilder
    end
  end
end
