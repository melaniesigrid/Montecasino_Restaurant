    const body = document.querySelector("body");
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    menuBtn.onclick = ()=>{
      navbar.classList.add("show");
      menuBtn.classList.add("hide");
    }
    cancelBtn.onclick = ()=>{
      navbar.classList.remove("show");
      menuBtn.classList.remove("hide");
    }
window.addEventListener('scroll', function () {
  let navbar = document.querySelector('nav');
  let logoImage = document.getElementById('logo-image');
  let windowPosition = window.scrollY > 40;
  navbar.classList.toggle('scroll-active', windowPosition);
  logoImage.classList.toggle('logo-scroll', windowPosition);
})