require 'test_helper'

class ElectionTest < ActiveSupport::TestCase
  test "first 100" do
    the_votes = votes()[0..99]
    assert_equal the_votes.size, 100

    election = Election.new(the_votes.map(&:candidate_preference))
    round1 = election.round_1_results
    assert_equal round1, {"Cross"=>17, "Crum"=>13, "Heikler"=>19, "Stokes"=>25, "Westry"=>26}
    assert_equal the_votes.size, round1.values.sum, 'count should be equal'
  end

  test "all fixture means 3-way tie for 3rd" do
    election = Election.new(votes().map(&:candidate_preference))
    round1 = election.round_1_results
    assert_equal round1, {"Cross"=>19, "Crum"=>19, "Heikler"=>19, "Stokes"=>25, "Westry"=>26}
    assert_equal votes().size, round1.values.sum, 'count should be equal'
  end
end
