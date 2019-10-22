require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  test "question votes" do
    p = questions(:police)
    assert_equal 2, p.up_vote_count
    assert_equal 1, p.down_vote_count
    assert_equal 1, p.vote_count
  end
end
