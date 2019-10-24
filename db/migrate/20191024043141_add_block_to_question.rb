class AddBlockToQuestion < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :block, :string, null: false, default: nil
  end
end
