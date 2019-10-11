ActiveAdmin.register Vote do
  index do
    selectable_column
    id_column
    column :ordered_candidate_last_names
    column :created_at
    column :updated_at
    actions
  end

end
