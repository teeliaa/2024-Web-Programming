window.onload = function() {
  let currentSlide = 0;

  const slides = document.querySelector('.slides');
  if(slides){
    const totalSlides = slides.children.length;

    function showSlide(indes){
      currentSlide = (index + totalSlides) % totalSlides;
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 3000);
  }

  function loadContent(src, container) {
    fetch(src)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        container.innerHTML = data;
        container.style.display = 'block';
        adjustContainerHeight(container);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  function adjustContainerHeight(container) {
    if (container) {
      container.style.height = container.scrollHeight + 'px';
    }
  }

  window.showIframeAjax = function(src) {
    const slides = document.querySelector('.slides');
    const leftSection = document.querySelector('.left');
    const rightSection = document.querySelector('.right');
    const dynamicContent = document.getElementById('dynamic-content');

    if (slides) slides.style.display = 'none';
    if (leftSection) leftSection.style.display = 'block';
    if (rightSection) rightSection.style.display = 'block';
    if (dynamicContent) dynamicContent.style.display = 'none';

    loadContent(src, rightSection);
  };

  window.showFullSectionAjax = function(src) {
    const leftSection = document.querySelector('.left');
    const rightSection = document.querySelector('.right');
    const slides = document.querySelector('.slides');
    const container = document.querySelector('.container');
    const dynamicContent = document.getElementById('dynamic-content');

    if (leftSection) leftSection.style.display = 'none';
    if (rightSection) rightSection.style.display = 'none';
    if (slides) slides.style.display = 'none';
    if (container) container.style.display = 'none';

    if (dynamicContent) {
      loadContent(src, dynamicContent);
      dynamicContent.style.height = '100vh';
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'auto';
  };

  window.showHome = function() {
    const leftSection = document.querySelector('.left');
    const rightSection = document.querySelector('.right');
    const slides = document.querySelector('.slides');
    const dynamicContent = document.getElementById('dynamic-content');

    if (leftSection) leftSection.style.display = 'block';
    if (rightSection) rightSection.style.display = 'block';
    if (slides) slides.style.display = 'flex';

    if (dynamicContent) dynamicContent.style.display = 'none';
    dynamicContent.innerHTML = '';

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };
};
