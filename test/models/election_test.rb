require 'test_helper'

class ElectionTest < ActiveSupport::TestCase
  test "winner take all" do
    the_votes = votes().map(&:candidate_preference)
    assert_equal the_votes.size, 11

    vote_tally = Election.new(the_votes).winner_take_all_results
    assert_equal({"Cross"=>0, "Crum"=>2, "Heikler"=>3, "Stokes"=>2, "Westry"=>4}, vote_tally)
    assert_equal the_votes.size, vote_tally.values.sum, 'count should be equal'
  end

  test "rcv" do
    the_votes = votes().map(&:candidate_preference)
    assert_equal the_votes.size, 11

    results = Election.new(the_votes).ranked_choice_results
    assert_equal({"Stokes"=>4, "Westry"=>7}, results)
  end
end
