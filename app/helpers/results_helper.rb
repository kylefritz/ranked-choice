module ResultsHelper
  def compute_tallys_by_round!
    the_votes = Vote.all.map(&:candidate_preference)
    _, tallys_by_round = Election.new(the_votes).ranked_choice_results
    tallys_by_round
  end
end
