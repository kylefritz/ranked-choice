ActiveAdmin.register Question do
  permit_params :text, :submitted_by, :block, :is_hidden
end
