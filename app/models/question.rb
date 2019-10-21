class Question < ApplicationRecord
  has_many :question_votes

  def vote_count
    up_vote_count - down_vote_count
  end

  def up_vote_count
    question_votes.where(is_upvote: true).count
  end

  def down_vote_count
    question_votes.where(is_upvote: false).count
  end
end
