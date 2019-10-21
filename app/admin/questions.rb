ActiveAdmin.register Question do
  permit_params :text, :submitted_by, :is_hidden
end
