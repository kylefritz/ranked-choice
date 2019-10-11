class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.text :ordered_candidate_last_names

      t.timestamps
    end
  end
end
