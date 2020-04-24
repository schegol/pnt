$(document).ready(function() {
  //кнопки like в разделе "Фотоконскурс"
  const likeBtn = $('.photo-contest__item-likes');

  likeBtn.each(function () {
    $(this).click(function (e) {
      e.preventDefault();
      $(this).toggleClass('photo-contest__item-likes--active');
      let count = $(this).html();
      if ($(this).hasClass('photo-contest__item-likes--active')) {
        count++;
      } else {
        count--;
      };
      $(this).html(count);
    });
  });

  //параллакс-эффект в хедере и разделе с большими фотографиями
  const header = $('.header');
  const headerBgLayer = $('.header__bg-layer');
  const imgSection = $('.parallax-section__img');

  if (headerBgLayer.length) {
    header.parallax();
    headerBgLayer.parallax({
      naturalWidth: 1920,
      speed: 0.5,
      zIndex: 0
    });
    imgSection.parallax({
      naturalWidth: 1920
    });
  };

  //fancybox
  const expandableImages = $('.expandable');

  if (expandableImages.length) {
    expandableImages.fancybox({
      buttons : [
        'close'
      ],
      loop: false,
      keyboard: true,
      arrows: true,
      smallBtn: true,
      toolbar: 'auto'
    });
  };

  //slick
  const historySlider = $('.slider__items');
  const indicator = $('.slider__status-indicator');

  if (historySlider.length) {
    historySlider.on('init', function (event, slick) {
      var slidesAmount = slick.$slides.length;
      var slidesSeen = historySlider.find('.slick-slide.slick-active:last').index() + 1;
      var indicatorWidth = slidesSeen / slidesAmount * 100;

      indicator.css('width', indicatorWidth + '%');
    });

    historySlider.slick({
      prevArrow: $('.slider__btn--prev'),
      nextArrow: $('.slider__btn--next'),
      autoPlay: false,
      adaptiveHeight: true,
      infinite: false,
      slidesToShow: 2,
      dots: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }]
    });

    historySlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var slidesAmount = slick.$slides.length;

      if ($(window).width() >= 768) {
        var slidesSeen = nextSlide + 2;
      } else {
        var slidesSeen = nextSlide + 1;
      };

      var indicatorWidth = slidesSeen / slidesAmount * 100;

      indicator.css('width', indicatorWidth + '%');
    });
  };

  //переключение дат в истории компании
  const yearToggles = $('.timeline__item');
  const timelineIndicator = $('.timeline__status-indicator');

  if (yearToggles.length) {
    yearToggles.each(function () {
      if ($(window).width() >= 768) {
        $(this).click(function (e) {
          let circleOffset = $(this).offset();
          let posY = circleOffset.left;

          e.preventDefault();
          yearToggles.removeClass('timeline__item--active');
          yearToggles.children('.timeline__btn').removeClass('circleOut');
          $(this).addClass('timeline__item--active');
          $(this).children('.timeline__btn').addClass('circleOut');
          timelineIndicator.css('width', posY+1);
        });
      } else {
        $(this).click(function (e) {
          e.preventDefault();
          yearToggles.removeClass('timeline__item--active');
          yearToggles.children('.timeline__btn').removeClass('circleOut');
          $(this).addClass('timeline__item--active');
          $(this).children('.timeline__btn').addClass('circleOut');
        });
      }
    });
  };

  //конкурсная страница
  const contestGallery = $('#galleryContest');

  if (contestGallery.length) {
    contestGallery.unitegallery({
      gallery_theme: 'tiles',
      tiles_min_columns: 2,
      tiles_max_columns: 3,
      tiles_space_between_cols: 10,
			tiles_space_between_cols_mobile: 10,
      tile_enable_icons: true,
      tile_as_link: false,
      tile_show_link_icon: true,
      tile_link_newpage: false,
      lightbox_show_numbers: false,
      lightbox_type: 'wide',
      lightbox_overlay_opacity: 0.6,
      lightbox_arrows_inside_alwayson: true,
      lightbox_arrows_position: 'sides',
      lightbox_arrows_offset: 20,
      lightbox_arrows_inside_offset: 20,
    });

    //ВРЕМЕННОЕ РЕШЕНИЕ
    var randomLikes = function randomLikes(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const contestItems = contestGallery.find('.ug-thumb-wrapper');
    const itemLikeBtns = contestItems.find('.ug-icon-link');

    itemLikeBtns.each(function () {
      $(this).html(randomLikes(10, 999));

      $(this).click(function (e) {
        let count = $(this).html();

        e.preventDefault();
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
          count++;
        } else {
          count--;
        };
        $(this).html(count);
      });
    });
  };
});

$(window).on('load resize', function () {
  //пересчет индикатора дат при ресайзе окна
  const activeYearToggle = $('.timeline__item--active');
  const timelineIndicator = $('.timeline__status-indicator');
  if (activeYearToggle.length) {
    var activeCircleOffset = activeYearToggle.offset();
    let activePosY = activeCircleOffset.left;

    if ($(window).width() >= 768) {
      timelineIndicator.css('width', activePosY+1);
    };
  };
});
