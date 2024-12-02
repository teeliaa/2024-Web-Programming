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
        const contentHeight = iframe.contentWindow.document.body.scrollHeight + 'px';
        iframe.style.height = contentHeight;

        // iframe-container 높이도 조절
        const fullSectionContainer = document.querySelector('section.iframe-container');
        if (fullSectionContainer) {
          fullSectionContainer.style.height = contentHeight;
        }
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

        fullSectionFrame.onload = function () {
            // Adjust the iframe height based on the content
            const contentHeight = fullSectionFrame.contentWindow.document.body.scrollHeight;
            const adjustedHeight = Math.max(contentHeight, window.innerHeight) + 'px';
            
            fullSectionFrame.style.height = adjustedHeight;

            // Adjust the container height
            if (fullSectionContainer) {
                fullSectionContainer.style.minHeight = adjustedHeight;
            }
        };
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
