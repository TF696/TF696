let slideIndex = 0;
let autoSlideTimeout;

// ฟังก์ชันสำหรับแสดงสไลด์
function showSlides(index = null) {
  let slides = document.querySelectorAll(".slide");

  // หากมี index (เช่น จากการกดปุ่ม) ให้ตั้งค่า slideIndex ตาม index
  if (index !== null) {
    slideIndex = index;
  } else {
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1; // กลับไปสไลด์แรกเมื่อเกิน
    }
  }

  // ซ่อนทุกสไลด์
  slides.forEach(slide => slide.style.display = "none");

  // แสดงสไลด์ปัจจุบัน
  slides[slideIndex - 1].style.display = "block";

  // รีสตาร์ท Auto Slideshow
  clearTimeout(autoSlideTimeout);
  autoSlideTimeout = setTimeout(() => showSlides(), 3000); // เปลี่ยนสไลด์ทุก 3 วินาที
}

// ฟังก์ชันสำหรับเปลี่ยนสไลด์ด้วยปุ่ม Next/Previous
function changeSlide(step) {
  let slides = document.querySelectorAll(".slide");
  let newIndex = slideIndex + step;

  // ตรวจสอบการวนกลับเมื่อเกินขอบเขต
  if (newIndex > slides.length) {
    newIndex = 1;
  } else if (newIndex < 1) {
    newIndex = slides.length;
  }

  // เรียก showSlides พร้อม index ใหม่
  showSlides(newIndex);
}

// เริ่มต้นการทำงานของ Slideshow
showSlides();
