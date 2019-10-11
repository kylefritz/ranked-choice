module RandomVotes
  def votes(count)
    names = Candidate.all.map(&:last_name)
    (1..count).map do |i|
      names.shuffle
    end
  end

  def votes_str(count)
    votes(count).map do |voted_for_list|
      voted_for_list.join(',')
    end
  end

  def votes_fixture(count)
    votes_str(count).each_with_index do |v, i|
      puts "vote#{i}: {ordered_candidate_last_names: #{v}}"
    end
  end
end