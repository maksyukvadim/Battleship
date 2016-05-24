$(function() {
  //при нажатии на кнопку с id="save"
  $('#save').click(function() {
    //переменная formValid
    var formValid = true;
    //перебрать все элементы управления input
    $('input').each(function() {
    //найти предков, которые имеют класс .form-group, для установления success/error
    var formGroup = $(this).parents('.form-group');
    //найти glyphicon, который предназначен для показа иконки успеха или ошибки
    var glyphicon = formGroup.find('.form-control-feedback');
    //для валидации данных используем HTML5 функцию checkValidity
    if (this.checkValidity()) {
      //добавить к formGroup класс .has-success, удалить has-error
      formGroup.addClass('has-success').removeClass('has-error');
      //добавить к glyphicon класс glyphicon-ok, удалить glyphicon-remove
      glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');
    } else {
      //добавить к formGroup класс .has-error, удалить .has-success
      formGroup.addClass('has-error').removeClass('has-success');
      //добавить к glyphicon класс glyphicon-remove, удалить glyphicon-ok
      glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
      //отметить форму как невалидную
      formValid = false;
    }
  });
  //если форма валидна, то
  if (formValid) {
    //сркыть модальное окно
    $('#myModal').modal('hide');
    //отобразить сообщение об успехе
    $('#success-alert').removeClass('hidden');
  }
});
});
