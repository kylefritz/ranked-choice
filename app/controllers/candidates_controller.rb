class CandidatesController < ApplicationController
  def index
    @candidates = Candidate.order(:last_name).all
    respond_to do |format|
      format.json # index.json.jbuilder
    end
  end
end
