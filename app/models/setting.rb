# RailsSettings Model
class Setting < RailsSettings::Base
  has_paper_trail
  cache_prefix { "v1" }

  field :questions_enabled, default: true, type: :boolean
  field :voting_visible, default: true, type: :boolean
  field :voting_enabled, default: false, type: :boolean
  field :results_enabled, default: false, type: :boolean
  field :google_analytics_tracker, default: nil, type: :string
  field :app_name, default: "12th District Forum", type: :string

  def self.questions_mode!
    Setting.questions_enabled = true
    Setting.voting_enabled = false
    Setting.results_enabled = false
  end

  def self.voting_mode!
    Settings.voting_visible = true
    Setting.questions_enabled = false
    Setting.voting_enabled = true
    Setting.results_enabled = false
  end

  def self.results_mode!
    Settings.voting_visible = true
    Setting.questions_enabled = false
    Setting.voting_enabled = false
    Setting.results_enabled = true
  end
end
