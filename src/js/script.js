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
        // count = parseInt(count);
        count--;
      };
      $(this).html(count);
    });
  });

  //параллакс-эффект в хедере и разделе с большими фотографиями
  const header = $('.header');
  const imgSection = $('.parallax-section__img');

  header.parallax();
  imgSection.parallax({
    naturalWidth: 1920
  });

  //fancybox
  const expandableImages = $('.expandable');

  expandableImages.fancybox();

});
