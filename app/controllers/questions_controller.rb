class QuestionsController < ApplicationController
  before_action :set_question_voter_id

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

  def vote
    question = Question.find(params[:id])

    # TODO: this isn't realy working
    # HACK: could use a db index for better concurrency
    unless earlier_vote = question.question_votes.find_by(voted_by: question_voter_id)
      question.question_votes.create!(
        voted_by: question_voter_id,
        is_upvote: params[:up]
      )
    end

    # return json of all questions
    @questions = load_all_questions
    render :index
  end

  private

  def load_all_questions
    Question.includes(:question_votes).all.sort_by {|q| -1 * q.vote_count }
  end

    def question_voter_id
    # used to limit one vote per user
    # obviously can be foiled with an incognito browser window
    cookies.permanent[:question_voter_id]
  end

  def set_question_voter_id
    cookies.permanent[:question_voter_id] = SecureRandom.hex(10)
    logger.info "setting set_question_voter_id to #{question_voter_id}"
  end
end
