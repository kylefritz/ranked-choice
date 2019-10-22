require 'test_helper'

class ElectionTest < ActiveSupport::TestCase
  test "first 100" do
    the_votes = votes()[0..99]
    assert_equal the_votes.size, 100

    election = Election.new(the_votes.map(&:candidate_preference))
    vote_talley = election.winner_take_all_results
    assert_equal vote_talley, {"Cross"=>17, "Crum"=>13, "Heikler"=>19, "Stokes"=>25, "Westry"=>26}
    assert_equal the_votes.size, vote_talley.values.sum, 'count should be equal'
  end

  test "all fixture means 3-way tie for 3rd" do
    election = Election.new(votes().map(&:candidate_preference))
    vote_talley = election.winner_take_all_results
    assert_equal vote_talley, {"Cross"=>19, "Crum"=>19, "Heikler"=>19, "Stokes"=>25, "Westry"=>26}
    assert_equal votes().size, vote_talley.values.sum, 'count should be equal'
  end

  test "first 10" do
    the_votes = votes()[0..9]
    assert_equal the_votes.size, 10

    election = Election.new(the_votes.map(&:candidate_preference))
    vote_talley = election.winner_take_all_results
    assert_equal vote_talley, {"Cross"=>0, "Crum"=>2, "Heikler"=>2, "Stokes"=>2, "Westry"=>4}
    assert_equal the_votes.size, vote_talley.values.sum, 'count should be equal'

    winner = election.ranked_choice_results.max_by {|k,v| v}.first
    assert_equal winner, "Westry"
  end
end
