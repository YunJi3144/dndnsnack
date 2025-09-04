// 프로모션
document.addEventListener("DOMContentLoaded", function () {
   const tabs = document.querySelectorAll(".tab");
   const contents = document.querySelectorAll(".cont_promotion");

   // URL에서 tab 파라미터 읽기
   const urlParams = new URLSearchParams(window.location.search);
   const targetTabId = urlParams.get("tab"); // 예: "tab4"

   // 활성화할 탭 인덱스 찾기 (없으면 첫 번째)
   let activeIndex = 0;
   if (targetTabId) {
      tabs.forEach((tab, index) => {
         if (tab.dataset.tab === targetTabId) {
            activeIndex = index;
         }
      });
   }

   // 초기화 후 활성화
   tabs.forEach(t => t.classList.remove("active"));
   contents.forEach(c => c.classList.remove("active"));
   tabs[activeIndex].classList.add("active");
   contents[activeIndex].classList.add("active");

   // 클릭 이벤트
   tabs.forEach(tab => {
      tab.addEventListener("click", function (e) {
         e.preventDefault();

         tabs.forEach(t => t.classList.remove("active"));
         contents.forEach(c => c.classList.remove("active"));

         this.classList.add("active");
         const targetId = this.getAttribute("data-tab");
         document.getElementById(targetId).classList.add("active");
      });
   });
});