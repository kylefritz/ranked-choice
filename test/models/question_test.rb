require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  test "question votes" do
    p = questions(:police)
    assert_equal p.up_vote_count, 2
    assert_equal p.down_vote_count, 1
    assert_equal p.vote_count, 1
  end
end
