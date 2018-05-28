$(function() {
  function buildHTML(message) {
    var html = `<div class="upper-message">
                  <p class="upper-message__user-name">${message.user_name}</p>
                  <p class="upper-message__time">${message.created_at}</p>
                </div>
                <div class="lower-message">
                  <p class="lower-message__message">${message.body}</p>
                  <span src:${message.image_url}, class="message__image"></span>
                </div>`
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      $('.form__button').prop("disabled", false);
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
  });
});
