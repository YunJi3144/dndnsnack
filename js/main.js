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


/* 든든스낵이 추천 */
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
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


/* 우리 회사 맞춤 서비스 */ 
const serviceImg = document.querySelector('#serviceImage')
  // serviceImg.setAttribute('src', 'img/sec03_tab01.png')

  const serviceTab = document.querySelectorAll('.service_cont .tab')

  serviceTab.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const imgSrc = this.getAttribute('data-image') //
      serviceImg.setAttribute('src', imgSrc)
    })
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
});


/* DNDN SNS */
const SnsSwiper = new Swiper('.sns_swiper', {
  // autoplay: true, //자동실행
  autoplay: {
    delay: 0, //다음 애니메이션이 시작 시간과의 간격
  },
  speed: 9000, //애니메이션 지속시간
  loop: true, //무한반복
  slidesPerView: '4.5', //화면에 보여질 슬라이드 갯수
  spaceBetween: 50, //슬라이드 사이 간격
});
