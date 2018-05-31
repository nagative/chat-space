$(function () {
// インクリメンタルサーチで対象ユーザがいる場合の機能
var user_list = $(".js-user-search-result");
function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  user_list.append(html);
}
// インクリメンタルサーチで対象ユーザがいない場合の機能
function appendNoUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user}
                </p>
              </div>`
  user_list.append(html);
}
// 検索したユーザをチャットメンバー欄に追加する機能
var group_list = $(".chat-group-users.js-add-user")
function appendGroup(userId, userName) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-'${userId}'>
                <input name='group[user_ids][]' type='hidden' value='${userId}'>
                <p class='chat-group-user__name'>${userName}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  group_list.append(html)
}
// インクリメンタルサーチ機能
  $('.js-user-search-field').on('keyup', function() {
    var input = $('.js-user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      $('.js-user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
          appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザ検索に失敗しました')
    })
  });
// 検索ユーザの追加ボタンを押してチャットメンバー欄に追加する機能
  $(".js-user-search-result").on('click','.chat-group-user__btn--add', function() {
    var userId = $(this).data("userId");
    var userName = $(this).data("userName");
    appendGroup(userId, userName);
    $(this).parent().remove();
  });
// チャットメンバーの削除ボタンを押してユーザーを削除する機能
  $(".chat-group-users.js-add-user").on('click','.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
  });
});
