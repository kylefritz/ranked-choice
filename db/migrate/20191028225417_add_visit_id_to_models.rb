class AddVisitIdToModels < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :ahoy_visit_id, :bigint
    add_column :question_votes, :ahoy_visit_id, :bigint
    add_column :votes, :ahoy_visit_id, :bigint
  end
end
