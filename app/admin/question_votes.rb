ActiveAdmin.register QuestionVote do
  permit_params :voted_by, :question_id, :is_upvote
end
