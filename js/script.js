$('.js-slider').slick({
    // setting-name: setting-value
    nextArrow: '<div class="slick-arrowBox slick-arrowBox_top"><button type="button" class="slick-next slick-btn">След</button><i class="icon-arrow-right"></i></div>',
    prevArrow: '<div class="slick-arrowBox slick-arrowBox_bottom"><i class="icon-arrow-left"></i><button type="button" class="slick-prev slick-btn">Назад</button></div>',

    speed: 700,
    fade: true,
  });

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


// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
$('a[href^="#"]').click( function(e){
    e.preventDefault();
    console.log("work");
	var scroll_el = $(this).attr('href');
	if ($(scroll_el).length != 0) {
	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	}
	return false;
});
