class Question < ApplicationRecord
  has_many :question_votes
  visitable :ahoy_visit

  def vote_count
    up_vote_count - down_vote_count
  end

  def up_vote_count
    question_votes.select {|q| q.is_upvote}.count
  end

  def down_vote_count
    question_votes.reject {|q| q.is_upvote}.count
  end

  def can_vote?(voter_id)
    # if user has not already voted for this question, user can vote
    !self.question_votes.any? {|v| v.voted_by == voter_id}
  end
end
