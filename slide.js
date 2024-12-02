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

  function adjustIframeHeight(iframe) {
    if (iframe) {
      $(iframe).on('load', function () {
        const contentHeight = $(iframe).contents().find('body').prop('scrollHeight') + 'px';
        $(iframe).css('height', contentHeight);

        const fullSectionContainer = $('section.iframe-container');
        if (fullSectionContainer.length) {
          fullSectionContainer.css('height', contentHeight);
        }
      });
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
          fullSectionContainer.html(data).show().css('height', '100vh');
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
