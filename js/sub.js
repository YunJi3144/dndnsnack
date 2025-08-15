// 프로모션
document.addEventListener("DOMContentLoaded", function () {
   const tabs = document.querySelectorAll(".tab"); // 모든 탭 버튼
   const contents = document.querySelectorAll(".cont_promotion"); // 모든 이미지 영역

   tabs.forEach(tab => {
      tab.addEventListener("click", function (e) {
         e.preventDefault(); // a 태그 기본 이동 방지

         // 1. 모든 탭/이미지 영역에서 active 제거
         tabs.forEach(t => t.classList.remove("active"));
         contents.forEach(c => c.classList.remove("active"));

         // 2. 클릭한 탭에 active 부여
         this.classList.add("active");

         // 3. data-tab 값과 같은 id를 가진 이미지 영역에 active 부여
         const targetId = this.getAttribute("data-tab"); // 예: "tab1"
         document.getElementById(targetId).classList.add("active");
      });
   });
});