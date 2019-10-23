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

    results, tallys_by_round = Election.new(the_votes).ranked_choice_results
    assert_equal({"Stokes"=>4, "Westry"=>7}, results)
    assert_equal 4, tallys_by_round.size
  end

  test "2016 primary" do
    votes = []
    200.times do
      votes.push(%w(Crum Cross Stokes))
    end
    999.times do
      votes.push(%w(Stokes Crum Cross))
    end
    800.times do
      votes.push(%w(Cross Stokes Crum))
    end
    results, tallys_by_round = Election.new(votes).ranked_choice_results
    assert_equal({"Cross"=>1000, "Stokes"=>999}, results)
    assert_equal 2, tallys_by_round.size
  end

  test "2 tied candidates" do
    votes = []

    votes.push(%w(Crum Cross Stokes))
    votes.push(%w(Crum Stokes Cross))

    9.times do
      votes.push(%w(Stokes Crum Cross))
    end
    9.times do
      votes.push(%w(Cross Stokes Crum))
    end
    results, tallys_by_round = Election.new(votes).ranked_choice_results
    assert_equal({"Cross"=>10, "Stokes"=>10}, results)
    assert_equal 2, tallys_by_round.size
  end

  test "no votes" do
    Election.new([]).ranked_choice_results
    Election.new([]).winner_take_all_results
  end
end
