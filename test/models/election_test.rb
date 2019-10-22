require 'test_helper'

class ElectionTest < ActiveSupport::TestCase
  test "first 100" do
    the_votes = votes()[0..99].map(&:candidate_preference)
    assert_equal the_votes.size, 100

    election = Election.new(the_votes)
    vote_tally = election.winner_take_all_results
    assert_equal vote_tally, {"Cross"=>17, "Crum"=>13, "Heikler"=>19, "Stokes"=>25, "Westry"=>26}
    assert_equal the_votes.size, vote_tally.values.sum, 'count should be equal'
  end

  test "all fixture means 3-way tie for 3rd" do
    election = Election.new(votes().map(&:candidate_preference))
    vote_tally = election.winner_take_all_results
    assert_equal vote_tally, {"Cross"=>19, "Crum"=>19, "Heikler"=>19, "Stokes"=>25, "Westry"=>26}
    assert_equal votes().size, vote_tally.values.sum, 'count should be equal'

    rcv_tally = election.ranked_choice_results
    rcv_winner = rcv_tally.max_by {|k,v| v}.first
    assert_equal rcv_winner, "Westry"
  end

  test "first 10" do
    the_votes = votes()[0..9].map(&:candidate_preference)
    assert_equal the_votes.size, 10

    election = Election.new(the_votes)
    vote_tally = election.winner_take_all_results
    assert_equal vote_tally, {"Cross"=>0, "Crum"=>2, "Heikler"=>2, "Stokes"=>2, "Westry"=>4}
    assert_equal the_votes.size, vote_tally.values.sum, 'count should be equal'

    winner = election.ranked_choice_results.max_by {|k,v| v}.first
    assert_equal winner, "Westry"
  end

  test "doesnt throw on many tries" do
    (10..(votes().size - 1)).each do |top|
      the_votes = votes().slice(0..top).map(&:candidate_preference)

      results = Election.new(the_votes).ranked_choice_results
      winner = results.max_by {|k,v| v}.first
      assert_equal winner, "Westry"
    end
  end
end
