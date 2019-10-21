class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.text :text, null: false
      t.text :submitted_by, null: false
      t.boolean :is_hidden, null: false, default: false
      t.timestamps
    end
  end
end
