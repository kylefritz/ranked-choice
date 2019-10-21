candidates = Candidate.pluck('last_name')
100.times do |i|
  puts "vote#{i}:"
  vote = candidates.sample(candidates.size)
  puts "  ordered_candidate_last_names: #{vote.join(',')}"
  puts "  voted_by: voter#{i}"
  puts ""
end