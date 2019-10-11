require 'test_helper'

class ElectionTest < ActiveSupport::TestCase
  test "round 1" do
    election = Election.new(votes().map(&:candidate_preference))
    round1 = election.round_1_results
    assert_equal round1, {'Cross' => 1, 'Crum' =>1, 'Heikler' =>1, 'Stokes' => 1 , 'Westry' => 2}
  end
end
