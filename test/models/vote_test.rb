require 'test_helper'

class VoteTest < ActiveSupport::TestCase
  test "candidate_preference" do
    assert_equal votes(:vote1).candidate_preference[0], 'Heikler'
    assert_equal votes(:vote2).candidate_preference[0], 'Cross'
    assert_equal votes(:vote3).candidate_preference[0], 'Westry'
    assert_equal votes(:vote4).candidate_preference[0], 'Crum'
    assert_equal votes(:vote5).candidate_preference[0], 'Westry'
    assert_equal votes(:vote6).candidate_preference[0], 'Stokes'
  end
end
