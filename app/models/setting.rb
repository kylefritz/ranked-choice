# RailsSettings Model
class Setting < RailsSettings::Base
  has_paper_trail
  cache_prefix { "v1" }

  field :voting_enabled, default: false, type: :boolean
  field :results_enabled, default: false, type: :boolean
  field :questions_enabled, default: true, type: :boolean
end
