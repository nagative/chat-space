json.body @message.body
json.user_name @message.user.name
json.created_at @message.created_at.to_s
json.image_url @message.image.url
