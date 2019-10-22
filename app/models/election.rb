class Election
  attr_reader :votes
  def initialize(votes)
    @votes = votes
  end

  def winner_take_all_results
    vote_tally = empty_vote_tally()
    vote_tally = update_vote_tally_for_votes(vote_tally, @votes)
    summarize_results(vote_tally)
  end

  def ranked_choice_results
    round = 1
    vote_tally = empty_vote_tally()
    vote_tally = update_vote_tally_for_votes(vote_tally, @votes)

    loop do
      results = summarize_results(vote_tally)
      Rails.logger.warn "round=#{round} #{results}"

      if winner_decided?(vote_tally)
        return results.tap do |results|
          winner = results.max_by {|k,v| v}.first
          Rails.logger.warn "decided on #{winner}"
        end
      end
      Rails.logger.warn "not decided\n"
      round += 1
      
      vote_tally = instant_runoff(vote_tally, round)
      if round > 10
        throw "rounds #{round} too high "
      end
    end
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
      vote_tally.each do |candidate_name, votes|
        summary[candidate_name] = votes.size
      end
    end
  end

  def leading_fraction(vote_tally)
    vote_summary = summarize_results(vote_tally)
    leading_votes = vote_summary.values.max
    votes_cast = vote_summary.values.sum
    Float(leading_votes) / votes_cast
  end

  def winner_decided?(vote_summary)
    leading_fraction(vote_summary) > 0.5
  end

  def instant_runoff(vote_tally, round)
    vote_summary = summarize_results(vote_tally)
    min_vote_count = vote_summary.values.min
    Rails.logger.warn "round #{round}: min_vote_count #{min_vote_count}"

    last_place_candidates = vote_summary.select {|candidate, num_votes| num_votes == min_vote_count}.keys
    Rails.logger.warn "last_place_candidates=#{last_place_candidates}"

    srand 42 # set random seed for reproducibility
    eliminated_candidate = last_place_candidates.sample
    Rails.logger.warn "eliminated_candidate=#{eliminated_candidate}"

    ballots_for_next_choice = vote_tally.delete(eliminated_candidate)
    update_vote_tally_for_votes(vote_tally, ballots_for_next_choice)
  end
end