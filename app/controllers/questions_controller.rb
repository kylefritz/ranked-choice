class QuestionsController < ApplicationController
  before_action :set_cookie_question_voter_id
  before_action :set_is_admin

  def index
    respond_to do |format|
      format.html # index.html.erb
      format.json do
        render_all_questions
      end
    end
  end

  def create
    Question.create!(text: params[:text], submitted_by: params[:author])

    render_all_questions
  end

  def vote
    question = Question.find(params[:id])

    # TODO: this isn't realy working
    # HACK: could use a db index for better concurrency
    if question.can_vote?(question_voter_id)
      question.question_votes.create!(
        voted_by: question_voter_id,
        is_upvote: params[:up]
      )
    end

    render_all_questions
  end

  def dismiss
    # TODO: finish dismiss
    question = Question.find(params[:id])
    question.is_hidden = true
    question.save!

    render_all_questions
  end

  private

  def render_all_questions
    @questions = Question.includes(:question_votes).all.sort_by {|q| -1 * q.vote_count }
    render :index
  end

  def question_voter_id
    # used to limit one vote per user
    # obviously can be foiled with an incognito browser window
    @question_voter_id = cookies.permanent[:question_voter_id]
  end

  def set_cookie_question_voter_id
    unless question_voter_id
      cookies.permanent[:question_voter_id] = SecureRandom.hex(10)
      logger.info "setting question_voter_id=#{question_voter_id}"
    end
  end

  def set_is_admin
    @is_admin = !!current_user&.is_admin?
  end
end
