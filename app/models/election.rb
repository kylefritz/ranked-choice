class Election
  attr_reader :votes
  def initialize(votes)
    @votes = votes
  end

  def round_1_results
    # we migth mutate our copy here; make a duplicate
    votes = @votes.dup

    # intialize a hash with each candidate set to 0 
    votes.flatten.uniq.sort.zip([0] * 5).to_h.tap do |vote_tally|

      votes.each do |ranked_vote|
        top_pick = ranked_vote[0]
        vote_tally[top_pick] += 1
      end

    end
  end

  def winner_decided?
    
  end
end