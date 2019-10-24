json.questions @questions.map do |q|
  json.id q.id
  json.text q.text
  json.submitted_by q.submitted_by
  json.up_vote_count q.up_vote_count
  json.down_vote_count q.down_vote_count
  json.vote_count q.vote_count
  json.is_hidden q.is_hidden
  json.can_vote q.can_vote?(@question_voter_id)
end
json.is_admin @is_admin
json.is_enabled @is_enabled
