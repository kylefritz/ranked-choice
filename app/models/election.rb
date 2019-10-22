class Election
  def initialize(votes)
    @votes = votes
  end

  def winner_take_all_results
    vote_tally = update_vote_tally_for_votes(empty_vote_tally(), @votes)
    summarize_results(vote_tally)
  end

  def ranked_choice_results
    vote_tally = update_vote_tally_for_votes(empty_vote_tally(), @votes)
    (1..(empty_vote_tally().keys.size + 2)).each do |round|
      round_results = summarize_results(vote_tally)
      Rails.logger.info "\nround=#{round} leader_has=#{leading_fraction(round_results)} #{round_results}"

      if winner_decided?(round_results)
        winner = round_results.max_by {|k,v| v}.first
        Rails.logger.info "decided on #{winner}\n\n"
        return round_results
      end
      Rails.logger.info "not decided"
      
      vote_tally = instant_runoff(vote_tally, round_results)
    end
    throw "round #{round} too high, wtf?"
  end

  def instant_runoff(vote_tally, round_results)
    min_vote_count = round_results.values.min
    Rails.logger.info "instant_runoff min_vote_count #{min_vote_count}"

    last_place_candidates = round_results.select {|candidate, num_votes| num_votes == min_vote_count}.keys
    if last_place_candidates.size > 1
      Rails.logger.warn "more than 1 last_place_candidates=#{last_place_candidates}\n random pick to be eliminated"
    end

    srand 42 # set random seed for reproducibility
    eliminated_candidate = last_place_candidates.sample
    Rails.logger.info "eliminated_candidate=#{eliminated_candidate}"

    ballots_for_next_choice = vote_tally.delete(eliminated_candidate)
    update_vote_tally_for_votes(vote_tally, ballots_for_next_choice)
  end

  def empty_vote_tally
    # create empty vote_tally: a hash with each candidate set to 0 
    candidate_names = @votes.flatten.uniq.sort
    candidate_zeros = candidate_names.map {[]}
    vote_tally = candidate_names.zip(candidate_zeros).to_h
  end

  def update_vote_tally_for_votes(vote_tally, ballots)
    vote_tally.tap do |vote_tally|
      ballots.each do |b|
        ballot = b.dup
        original_top = ballot[0]
        while !ballot.empty? do
          pick = ballot.shift()

          if vote_tally.has_key?(pick)
            # move ballots to candidate according to first choice
            vote_tally[pick].push(ballot)
            if original_top != pick
              Rails.logger.info "moved from #{original_top} to #{pick}"
            end
            break
          end
          
          if ballot.empty?
            Rails.logger.info "no picks left"
          end
        end
      end
    end
  end

  def summarize_results(vote_tally)
    {}.tap do |summary|
      vote_tally.each do |candidate_name, ballots|
        summary[candidate_name] = ballots.size
      end
    end
  end

  def leading_fraction(vote_summary)
    leading_votes = vote_summary.values.max
    votes_cast = vote_summary.values.sum
    Float(leading_votes) / votes_cast
  end

  def winner_decided?(vote_summary)
    leading_fraction(vote_summary) > 0.5
  end
end
