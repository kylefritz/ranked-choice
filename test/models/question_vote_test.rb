require 'test_helper'

class QuestionVoteTest < ActiveSupport::TestCase
  test "add random votes" do
    q_ids = questions().pluck(:id)

    q_ids.each do |id|
      q = Question.find(id)
      rand(16).times do 
        is_upvote = [true, false].sample()
        q.question_votes.create!(is_upvote: is_upvote, voted_by: 'test')
      end
    end
    
    # TODO: doesn't assert anything
  end
end
