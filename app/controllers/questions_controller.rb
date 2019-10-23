class QuestionsController < ApplicationController
  def index
    @questions = load_all_questions
    respond_to do |format|
      format.html # index.html.erb
      format.json # index.json.jbuilder
    end
  end

  def create
    Question.create!(text: params[:text], submitted_by: params[:author])

    # return json of all questions
    @questions = load_all_questions
    render :index
  end

  private

  def load_all_questions
    Question.includes(:question_votes).all.sort_by {|q| -1 * q.vote_count }
  end
end
