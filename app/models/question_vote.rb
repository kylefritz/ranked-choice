class QuestionVote < ApplicationRecord
  belongs_to :question
  visitable :ahoy_visit
end
