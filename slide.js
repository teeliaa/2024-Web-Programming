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

  window.showIframe = function(src) {
    const slides = document.querySelector('.slides'); // 슬라이드 요소 찾기
    if (slides) {
      slides.style.display = 'none'; // 슬라이드를 숨기기
    }

    const iframe = document.getElementById('right-frame');
    if (iframe) {
      iframe.style.display = 'block'; // iframe 보이기
      iframe.src = src; // iframe에 src 설정
    } else {
      console.error("iframe 요소를 찾을 수 없습니다.");
    }
};
