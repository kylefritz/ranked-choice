class Vote < ApplicationRecord
  has_paper_trail
  def candidate_preference
    ordered_candidate_last_names.split(',')
  end
end
