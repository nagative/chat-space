$(function() {
  function buildHTML(message) {
    var html = `<p class="user-name">${message.user_name}</p>
                <p class="time">${message.created_at.to_s}</p>
                  <p class="message">${message.body}</p>
                  <span src:${message.image_url}, class="message__image"></span>`
    return html;
  }
  $('#item_form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var message = $(this).attr('action');
    $.ajax({
      url: message,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__space').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
  });
});
