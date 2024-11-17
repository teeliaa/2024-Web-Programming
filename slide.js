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

window.showFullSectionIframe = function(src) {
    // 'left'와 'right' 영역 숨기기
    document.querySelector('.left').style.display = 'none';
    document.querySelector('.right').style.display = 'none';

    // section 영역 비우기
    const section = document.querySelector('section');
    section.innerHTML = ''; // 기존 내용 지우기

    // 새 iframe 요소 생성
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.frameborder = '0';
    iframe.style.width = '70%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    if (src.includes('gage_cal.html')) {
       // gage_cal.html일 때, 전체 페이지의 높이를 조정
       document.documentElement.style.height = '100%'; // HTML의 높이를 100%로 설정
       document.body.style.height = '100%'; // BODY의 높이를 100%로 설정
       document.documentElement.style.overflow = 'hidden'; // 바깥 스크롤 숨기기
       section.style.height = '100vh'; // section의 높이를 화면 크기와 맞춤
   }

    // section에 iframe 추가
    section.appendChild(iframe);
  }
