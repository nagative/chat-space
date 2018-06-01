json.array! @new_messages do |new_message|
  json.id            new_message.id
  json.body          new_message.body
  json.image_url     new_message.image.url
  json.group_id      new_message.group_id
  json.user_id       new_message.user_id
  json.created_at    new_message.created_at.to_s
  json.user_name     new_message.user.name
end
