require 'test_helper'

class VoteTest < ActiveSupport::TestCase
  test "candidate_preference" do
    assert_equal votes(:vote1).candidate_preference[0], 'Crum'
  end
end
