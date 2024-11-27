window.onload = function() {
  let currentSlide = 0;

  function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;

    currentSlide = (index + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3000);

  function adjustIframeHeight(iframe) {
    if (iframe) {
      iframe.onload = function () {
        const fullSectionContainer = document.querySelector('section.iframe-container');
        // iframe의 높이를 postMessage를 사용해 설정하기 위한 이벤트 리스너 추가
        iframe.contentWindow.postMessage({ action: "getHeight" }, "*");

        window.addEventListener("message", function (event) {
          if (event.data && event.data.action === "setHeight") {
            const contentHeight = event.data.height + 'px';
            iframe.style.height = contentHeight;
            if (fullSectionContainer) {
              fullSectionContainer.style.height = contentHeight;
            }
          }
        });
      };
    }
  }

  window.showIframe = function(src) {
    const slides = document.querySelector('.slides');
    const iframe = document.getElementById('right-frame');
    const leftSection = document.querySelector('.left');
    const rightSection = document.querySelector('.right');

    if (slides) slides.style.display = 'none';
    if (iframe) {
      iframe.style.display = 'block';
      iframe.src = src;
    }
    if (leftSection) leftSection.style.display = 'block';
    if (rightSection) rightSection.style.display = 'block';
  };

  window.showFullSectionIframe = function(src) {
    const leftSection = document.querySelector('.left');
    const rightSection = document.querySelector('.right');
    const slides = document.querySelector('.slides');
    const container = document.querySelector('.container');
    const fullSectionFrame = document.getElementById('full-section-frame');
    const fullSectionContainer = document.querySelector('section.iframe-container');

    if (leftSection) leftSection.style.display = 'none';
    if (rightSection) rightSection.style.display = 'none';
    if (slides) slides.style.display = 'none';
    if (container) container.style.display = 'none';

    if (fullSectionContainer) {
        fullSectionContainer.style.display = 'block';
        fullSectionContainer.style.height = '100vh';
    }
    if (fullSectionFrame) {
        fullSectionFrame.style.display = 'block';
        fullSectionFrame.src = src;
        adjustIframeHeight(fullSectionFrame);
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'auto';
  };

  window.showHome = function() {
    const leftSection = document.querySelector('.left');
    const rightSection = document.querySelector('.right');
    const slides = document.querySelector('.slides');
    const fullSectionFrame = document.getElementById('full-section-frame');
    const fullSectionContainer = document.querySelector('section.iframe-container');

    if (leftSection) leftSection.style.display = 'block';
    if (rightSection) rightSection.style.display = 'block';
    if (slides) slides.style.display = 'flex';

    if (fullSectionFrame) {
      fullSectionFrame.style.display = 'none';
      fullSectionFrame.src = ""; // iframe의 콘텐츠를 리셋합니다.
    }
    if (fullSectionContainer) fullSectionContainer.style.display = 'none';

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };
};
