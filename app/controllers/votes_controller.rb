class VotesController < ApplicationController
  before_action :set_vote
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.json do
        unless @vote
          return render json: nil
        end
        return render :show
      end
    end
  end
  
  def create
    if @vote
      return render :show
    end

    set_voted_by!

    # TODO: just trusting user input here, fine for a small app :)
    @vote = Vote.create!(ordered_candidate_last_names: params[:vote].join(','), voted_by: voted_by)
    render :show
  end

  private

  def set_vote
    if voted_by
      @vote = Vote.find_by(voted_by: voted_by)
    end
  end

  def voted_by
    # used to limit one vote per user
    # obviously can be foiled with an incognito browser window
    cookies.permanent[:voted_by]
  end

  def set_voted_by!
    cookies.permanent[:voted_by] = SecureRandom.hex(10)
    logger.info "setting voted_by to #{voted_by}"
  end
end
