class Vote < ApplicationRecord
  has_paper_trail
  visitable :ahoy_visit

  def candidate_preference
    ordered_candidate_last_names.split(',')
  end
end
