$(document).ready(function() {
  let currentSlide = 0;

  function showSlide(index) {
    const slides = $('.slides');
    const totalSlides = slides.children().length;

    currentSlide = (index + totalSlides) % totalSlides;
    slides.css('transform', `translateX(-${currentSlide * 100}%)`);
  }

  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3000);

  function adjustContainerHeight(container) {
    if (container) {
      const contentHeight = container.prop('scrollHeight') + 'px';
      container.css('height', contentHeight);
    }
  }

  window.showIframe = function(src) {
    const slides = $('.slides');
    const iframe = $('#right-frame');
    const leftSection = $('.left');
    const rightSection = $('.right');

    if (slides.length) slides.hide();
    if (iframe.length) {
      iframe.show().attr('src', src);
    }
    if (leftSection.length) leftSection.show();
    if (rightSection.length) rightSection.show();
  };

  window.showFullSectionAjax = function(url) {
    const leftSection = $('.left');
    const rightSection = $('.right');
    const slides = $('.slides');
    const container = $('.container');
    const fullSectionContainer = $('section.iframe-container');

    if (leftSection.length) leftSection.hide();
    if (rightSection.length) rightSection.hide();
    if (slides.length) slides.hide();
    if (container.length) container.hide();

    if (fullSectionContainer.length) {
      $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          fullSectionContainer.html(data).show();

          // style_sub.css 동적으로 추가 (절대 경로 사용)
          const linkTag = $('<link>', {
            rel: 'stylesheet',
            type: 'text/css',
            href: '/2024-Web-Programming/knitting/style_sub.css' // 절대 경로로 수정
          });
          $('head').append(linkTag);

          // 높이 조정
          adjustContainerHeight(fullSectionContainer);
        },
        error: function(xhr, status, error) {
          console.error('Error loading content:', status, error);
        }
      });
    }

    $('html').css('overflow', 'hidden');
    $('body').css('overflow', 'auto');
  };

  window.showHome = function() {
    const leftSection = $('.left');
    const rightSection = $('.right');
    const slides = $('.slides');
    const fullSectionFrame = $('#full-section-frame');
    const fullSectionContainer = $('section.iframe-container');

    if (leftSection.length) leftSection.show();
    if (rightSection.length) rightSection.show();
    if (slides.length) slides.css('display', 'flex');

    if (fullSectionFrame.length) {
      fullSectionFrame.hide().attr('src', '');
    }
    if (fullSectionContainer.length) fullSectionContainer.hide();

    $('html').css('overflow', 'auto');
    $('body').css('overflow', 'auto');
  };
});

