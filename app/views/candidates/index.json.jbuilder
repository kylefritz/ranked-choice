json.array! @candidates do |c|
  json.first_name c.first_name
  json.last_name c.last_name
end
