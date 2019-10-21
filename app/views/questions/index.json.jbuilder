json.array! @questions do |q|
  json.text q.text
  json.submitted_by q.submitted_by
  json.up_vote_count q.up_vote_count
  json.down_vote_count q.down_vote_count
  json.vote_count q.vote_count
  json.is_hidden q.is_hidden
end
