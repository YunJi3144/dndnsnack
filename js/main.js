/* Header */ 
let lastScroll = 0;
const header = document.querySelector("#header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 50) {
    // 스크롤 내림 → 헤더 숨김
    header.classList.add("hide");
  } else {
    // 스크롤 올림 → 헤더 보임
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});


/* 메인 배너 */
const btnPlayStop = document.querySelector('.btn-play-stop');
const swiperElm = document.querySelector('#mainswiper');
let isPlaying = true; // play와 stop을 토글하기 위한 변수

const mainswiper = new Swiper('#mainswiper', {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  loop: true,
  autoplay: {
    delay: 5000, // 슬라이드가 5초마다 자동으로 변경되도록 설정
    disableOnInteraction: false // 사용자가 슬라이드 후에도 계속 자동 변경되도록
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      const progressWidth = (current / total) * 100; // 진행 상태를 비율로 계산
      return `
        <span class="num">${current}</span>
        <div class="progress">
          <div class="bar" style="width: ${progressWidth}%;"></div>
        </div>
        <span class="num">${total}</span>
      `;
    },
  },
  navigation: {
    nextEl: '.btn-next',
    prevEl: '.btn-prev'
  }
});

// 재생/정지 버튼 클릭 시 자동 슬라이드 멈추기 및 시작하기
btnPlayStop.addEventListener('click', () => {
  if (isPlaying) {
    mainswiper.autoplay.pause(); // 슬라이드 멈추기
    btnPlayStop.innerHTML = '<i class="ri-play-fill"></i>'; // 아이콘을 play로 변경
  } else {
    mainswiper.autoplay.resume(); // 슬라이드 재개
    btnPlayStop.innerHTML = '<i class="ri-pause-line"></i>'; // 아이콘을 pause로 변경
  }
  isPlaying = !isPlaying; // 상태 반전
});


/* 든든스낵 추천 */
document.addEventListener("DOMContentLoaded", function () {
  const chatGroups = document.querySelectorAll(".chat_group");
  let currentIndex = 0;
  let isLocked = true;

  function showGroup(index) {
    chatGroups.forEach((group, i) => {
      group.classList.remove("active");
      if (i === index) {
        group.classList.add("active");
      }
    });
  }

  showGroup(currentIndex);

  const chatArea = document.querySelector(".chat_scroll_area");

  chatArea.addEventListener("wheel", function (e) {
    if (!isLocked) return; // 잠금 해제되면 무시

    e.preventDefault();

    if (e.deltaY > 0 && currentIndex < chatGroups.length - 1) {
      currentIndex++;
      showGroup(currentIndex);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
      showGroup(currentIndex);
    }

    // 마지막 채팅까지 본 경우 → 잠금 해제
    if (currentIndex === chatGroups.length - 1) {
      setTimeout(() => {
        isLocked = false;
        document.body.style.overflowY = "auto"; // 스크롤 해제
      }, 300); // 자연스럽게 약간의 지연
    }
  }, { passive: false });

  // 초기엔 스크롤 잠금
  document.body.style.overflowY = "hidden";
});



/* reason_swiper */
const reasonSwiper = new Swiper('.reason_swiper', {
  autoplay: true,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


/* 우리 회사 맞춤 서비스 */ 
// const serviceImg = document.querySelector('#serviceImage');
// const serviceTabs = document.querySelectorAll('.service_cont .tab');

// serviceTabs.forEach(function (tab) {
//   tab.addEventListener('click', function () {
//     // 1. 모든 탭 초기화
//     serviceTabs.forEach(function (el) {
//       el.classList.remove('active');
//     });

//     // 2. 현재 클릭된 탭에 active 추가
//     this.classList.add('active');

//     // 3. 이미지 변경
//     const imgSrc = this.getAttribute('data-image');
//     serviceImg.setAttribute('src', imgSrc);
//   });
// });

const tabs = document.querySelectorAll('.tab');
const numbers = document.querySelectorAll('.tab-number .num');
const serviceImage = document.getElementById('serviceImage');

let activeIndex = 0; // 현재 열린 탭 인덱스를 저장하는 변수

// 숫자 클릭 이벤트
numbers.forEach((num, index) => {
  num.addEventListener('click', () => {
    handleTabToggle(index);
  });
});

// 탭 클릭 이벤트
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    handleTabToggle(index);
  });
});

// 탭 토글 함수
function handleTabToggle(index) {
  // 현재 탭이 열려 있는 탭이면 닫기
  if (index === activeIndex && tabs[index].classList.contains('active')) {
    tabs[index].classList.remove('active');
    numbers[index].classList.remove('active');
    const accordion = tabs[index].querySelector('.accordion-content');
    if (accordion) accordion.style.display = 'none';
    activeIndex = -1; // 열린 탭 없음
    return;
  }

  // 기존 열려있던 탭 닫기
  tabs.forEach((tab, i) => {
    tab.classList.remove('active');
    const accordion = tab.querySelector('.accordion-content');
    if (accordion) accordion.style.display = 'none';
  });
  numbers.forEach(n => n.classList.remove('active'));

  // 새로운 탭 열기
  tabs[index].classList.add('active');
  const accordion = tabs[index].querySelector('.accordion-content');
  if (accordion) accordion.style.display = 'flex';

  numbers[index].classList.add('active');
  const newImage = tabs[index].getAttribute('data-image');
  if (newImage) serviceImage.setAttribute('src', newImage);

  activeIndex = index;
}

/* 무상 설비 */ 
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault(); // 기본 클릭 동작 방지 (링크 이동 방지)

    // 기존에 활성화된 탭과 콘텐츠에서 'active' 클래스 제거
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cont_list').forEach(content => content.classList.remove('active'));

    // 클릭한 탭에 'active' 클래스 추가
    tab.classList.add('active');

    // 해당 탭의 콘텐츠에 'active' 클래스 추가
    const tabId = tab.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});


/* 서비스 재원 */
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".service_tab .link");
  const tabBoxes = document.querySelectorAll(".service_contents .tab_box");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // 모든 탭 비활성화
      tabs.forEach(t => t.classList.remove("on"));
      // 클릭된 탭 활성화
      tab.classList.add("on");

      // 모든 tab_box 숨김
      tabBoxes.forEach(box => box.style.display = "none");
      // 현재 index의 tab_box만 보여줌
      tabBoxes[index].style.display = "block";
    });
  });

  // 초기 상태: 첫 번째 탭만 보이도록 설정
  tabBoxes.forEach((box, i) => {
    box.style.display = (i === 0) ? "block" : "none";
  });
});


/* 고객사 후기 */
const ReviewSwiper = new Swiper('.review_swiper', {
  // autoplay: true, //자동실행
  autoplay: {
    delay: 0, //다음 애니메이션이 시작 시간과의 간격
  },
  speed: 10000, //애니메이션 지속시간
  loop: true, //무한반복
  slidesPerView: '2.7', //화면에 보여질 슬라이드 갯수
  spaceBetween: 50, //슬라이드 사이 간격
  breakpoints: {
    1280: {
      slidesPerView: '2',
      spaceBetween: 40,
    }
  }
});


/* DNDN SNS */
const SnsSwiper = new Swiper('.sns_swiper', {
  // autoplay: true, //자동실행
  autoplay: {
    delay: 0, //다음 애니메이션이 시작 시간과의 간격
  },
  speed: 9000, //애니메이션 지속시간
  loop: true, //무한반복
  slidesPerView: '4', //화면에 보여질 슬라이드 갯수
  spaceBetween: 40, //슬라이드 사이 간격
  breakpoints: {
    1280: {
      slidesPerView: '3.5',
      spaceBetween: 30,
    }
  }
});
