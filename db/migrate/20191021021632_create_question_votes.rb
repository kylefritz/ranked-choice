class CreateQuestionVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :question_votes do |t|
      t.string :voted_by, null: false
      t.references :question, null: false
      t.boolean :is_upvote, null: false

      t.timestamps
    end
  end
end
