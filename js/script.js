//нужно разобраться с проверкой формы и отправкой

$('.js-slider').slick({
    // setting-name: setting-value
    nextArrow: '<div class="slick-arrowBox slick-arrowBox_top"><button type="button" class="slick-next slick-btn">След</button><i class="icon-arrow-right"></i></div>',
    prevArrow: '<div class="slick-arrowBox slick-arrowBox_bottom"><i class="icon-arrow-left"></i><button type="button" class="slick-prev slick-btn">Назад</button></div>',

    speed: 700,
    fade: true,
  });

// $('input, select').styler();
  let resized = false;

  $(window).resize(function(event) {
      let ww = $(window).width();
      // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
      if (resized == ww) { return; }
      resized = ww;
      // console.log();

      replaceVehicalImage(ww);
  });

  function replaceVehicalImage(ww) {
      // $('.transportation__box').each(function(index, el) {
      console.log(ww);
      let slide = $('.transportation__box'), left, right, text;
      slide.each(function(index, el) {
          right = $(el).find('.transportation__right');
          left = $(el).find('.transportation__left');
          text = $(el).find('.transportation__text');
          if (ww < 751) {
              console.log("isMobile");
              right.insertAfter(text);
              // $('.transportation__right').insertAfter('.transportation__text');
          } else {
              console.log('isDesctop');
              right.insertAfter(left);
          }
      });
      // });
  }
replaceVehicalImage($(window).width());

// $('.map__content').click(function(event) {
//     console.log('work');
//     console.log($(this));
//     $(this).removeClass('dark');
// });
// $('.map__content').mouseover(function(event) {
//     /* Act on the event */
//     // console.log('work');
//     // console.log($(this));
//     $(this).removeClass('map__content_dark');
// });
// $('.map__content').mouseout(function(event) {
//     /* Act on the event */
//     // console.log('work');
//     // console.log($(this));
//     $(this).addClass('map__content_dark');
// });

$('.js_showVacancies').on('click', function(){
    showVac();
});
// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
$('a[href^="#"]').click( function(e){
    e.preventDefault();
    var scroll_el = $(this).attr('href');
    if (scroll_el == "#") {
        return false;
    }
    console.log("work");
    console.log(scroll_el);

	if ($(scroll_el).length != 0) {
        // меняю


        if (scroll_el=='#form') {

            $('#info').animate({ scrollTop: $(scroll_el).offset().top }, 500);
            console.log(scroll_el);
        }else {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
            console.log('2');
            console.log(scroll_el);
        }
        // конец меняю
	// $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	}
    $(this).blur();
	return false;
});


function showVac() {

    let template = `<div class="productModal__img">
            <img src="" alt="" title="">
        </div>
        <div class="productModal__content">
          <div class="productModal__name"></div>
          <div class="productModal__price">$</div>
          <div class="productModal__description"></div>
          <div class="productModal__action">
            <button class="btn js_buy" type="button">Buy</button>
          </div>
        </div>`;

    let modal = $('#vac');
    let body = modal.find('.modal-body');

    // body.html(template);
    modal.modal('show');
    $('.modal-close').on('click', function(){
        modal.modal('hide');
    });
}

$('.drop__wrapper').on('click', function() {
    $(this).toggleClass('active');

    $(this).closest('.drop').find('.drop__list').toggleClass('open');
});

//функция заполняющая желаемую должность
function posContatation(){
    let pos = "";
    let arr = [];
    // $('.drop__checkbox').on('checked', function() {
    //     pos = $(this).closest('.drop__item').text();
    //     console.log(pos);
    // });
    $('.drop__checkbox').on('click', function() {
        arr = [];
        $('.drop__checkbox').each(function(){
            // console.log($(this).attr('checked'));
            if ($(this).prop("checked")) {
                arr.push($(this).closest('.drop__item').text());
            }

        });

        console.log(arr);
        if (arr.length) {
            $('.drop__toogle').text(arr);
        }else {
            $('.drop__toogle').text("Желаемая должность");
        }



        // if ($(this).attr('checked') == 'checked') {
        //
        //     pos = $(this).closest('.drop__item').text();
        //     console.log(pos);
        // }
    });
}
posContatation();
function submitForm() {
    // подготавливаем модальное окно с сообщением
    let modal = $('#info'),
        message = modal.find('.info__message');

    modal.on('hidden.bs.modal', function (e) {
        message.html('');
    });

    $('[type=submit]').on('click', function(e) {
        console.log('push');
        // Отменяем стандартное действие.
        // В данном случае отправку формы после нажатия унопки с type=submit
        e.preventDefault();
        // Можно отменить работу отельных библиотек и скриптов.
        // e.stopPropagination();
        console.log('pushed button ');


        // Можно почитать что входит в стандартный аргумент event срабатывающий при событии
        // console.log(e);

        // Объявляем набор переменных для того чтобы с крипт работал исключительно с формой к которому относится кнопка
        let form = $(this).closest('form'),
            // Ищем обязательные поля
            fields = form.find('[required]'),
            // Записываем значение атрибута формы action
            url = form.attr('action'),
            // Хаписываем значения полей форм. Обязателен атрибут name у полей с уникальным значением
            formData = form.serialize(),

            // Создаем переменную для счетчика пустых полей
            empty = 0;

        // console.log(fields);
        console.log(form);


        // console.log(url);
        console.log(formData);

        // Перебираем обязательные поля формы
        fields.each(function(index, el) {
            // Проверяем пустое ли поле
            // console.log("ioi");
            // console.log($(this).val());
            if ($(this).val() === '') {
                // Увеличиваем счетчик полей на 1
                empty++;
            }

            // Универсальная функция для проверки и визуализации пустых полей
            checkFiels($(this));
        });

        console.log(empty);

        if (empty > 0) {
            // hideLoader($('.eightSection'));
            // Если пустых полей больше 1, останавливаем работу скрипта
            return false;
        } else {
            // showLoader($('.eightSection'));
            // Если пустых полей нет, отправляем форму
            // Либо стандартым методом с перезагрузкой страницы
            // form.submit();
            // Либо через аякс, без перезагрузки страницы
            $.ajax({
                // Ссылка на обработчик файла
                url: url,
                // Тип метода отправки
                type: "POST",
                // Тип данных
                dataType: "html",
                // Данные из формы
                data: formData,
                // Если все хорошо, то
                success: function (response) {
                    console.log('success');

                    // Пример с открытием окна
                    modal.modal('show');

                    // Пример с перенаправлением на другую страницу
                    // document.location.href = "js.html";

                    // Пример вывода текста в какой то блок
                    message.html('Ваша форма успешно отправлена. <br> Мы свяжемся с вами в ближайшее время.');
                    // hideLoader($('.eightSection'));
                    // Дополнительно можно удалить текст из блока спустя какое то время
                    // setTimeout(function () {
                        //     message.html('');
                        // }, 5000);

                },

                // Тут можно выполнить действия если произошла ошибка отправки
                error: function (response) {
                    console.log('error');

                    // message.text('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                    modal.modal('show');

                    message.html('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                    // hideLoader($('.eightSection'));
                    // setTimeout(function () {
                        //     message.html('');
                        // }, 5000);

                }
            });
        }

    });

    // Проверка заполненности полей на лету
    $('input').on('keyup', function() {
        checkFiels($(this));
    });


    function checkFiels(el) {
        // При разных условиях меняем классы и внешний вид полей
        if (el.val() === '') {
            el.addClass('invalid');
            el.removeClass('valid');
        } else {
            el.removeClass('invalid');
            el.addClass('valid');
        }
    }
}
submitForm();
