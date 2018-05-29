$(function() {
  function buildHTML(message) {
    var image_url = ""
    if (message.image_url != null) {
      var image_url = `<div class="lower-message__image"><img src=${message.image_url} height="200" width="200"></div>`
    }
    var html = `<div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__time">
                    ${message.created_at}
                  </div>
                </div>
                <div class="lower-message">
                  <div class="lower-message__message">
                    ${message.body}
                  </div>
                  ${image_url}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData($(this).get(0));
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
      $('.form__button').prop("disabled", false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
  });
});
