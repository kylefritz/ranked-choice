ActiveAdmin.register Candidate do
  permit_params :first_name, :last_name
  config.sort_order = 'last_name_asc'  
end
