document.addEventListener("DOMContentLoaded", function () {

  window.addEventListener('scroll', function () {

    if (window.scrollY > 200) {
      document.getElementById('navbar_top').classList.add('fixed-top');
      // add padding top to show content behind navbar
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar_top').classList.remove('fixed-top');
      // remove padding top from body
      document.body.style.paddingTop = '0';
    }
  });
});
// MOBILE NAVBAR
document.addEventListener("DOMContentLoaded", function () {

  window.addEventListener('scroll', function () {

    if (window.scrollY > 200) {
      document.getElementById('navbar_mobile').classList.add('fixed-top');
      // add padding top to show content behind navbar
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar_mobile').classList.remove('fixed-top');
      // remove padding top from body
      document.body.style.paddingTop = '0';
    }
  });
});
// hide and show password===========
$(".toggle-password").click(function () {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});
// SIGN UP TYPEWITER
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #447d02;}";
  document.body.appendChild(css);
};
// SIGN FORM VELIDATION===========
(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form3) {
      form3.addEventListener('submit', function (event) {
        if (!form3.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form3.classList.add('was-validated')
      }, false)
    })
})()
// VERIFY YOUR NUMBER FOR SIGN UP

// SIGN UP NEXT FUNCTION=============================================================

$(document).ready(function(){
  $.validator.addMethod('date', function(value, element, param) {
    return (value != 0) && (value <= 31) && (value == parseInt(value, 10));
  }, 'Please enter a valid date!');
  $.validator.addMethod('month', function(value, element, param) {
    return (value != 0) && (value <= 12) && (value == parseInt(value, 10));
  }, 'Please enter a valid month!');
  $.validator.addMethod('year', function(value, element, param) {
    return (value != 0) && (value >= 1900) && (value == parseInt(value, 10));
  }, 'Please enter a valid year not less than 1900!');
  $.validator.addMethod('username', function(value, element, param) {
    var nameRegex = /^[a-zA-Z0-9]+$/;
    return value.match(nameRegex);
  }, 'Only a-z, A-Z, 0-9 characters are allowed');

  var val	=	{
      // Specify validation rules
      rules: {
        fname: "required",
        email: {
              required: true,
              email: true
            },
      phone: {
        required:true,
        minlength:10,
        maxlength:10,
        digits:true
      },
      // otp:{
      //   required:true,
      //   minlength:1,
      //   maxlength:1,
      //   digits:true
      // },
      password:{
        required:true,
        minlength:8,
        maxlength:16,
      }
      },
      // Specify validation error messages
      messages: {
      fname: 		"First name is required",
      email: {
        required: 	"Email is required",
        email: 		"Please enter a valid e-mail",
      },
      phone:{
        required: 	"Phone number is requied",
        minlength: 	"Please enter 10 digit mobile number",
        maxlength: 	"Please enter 10 digit mobile number",
        digits: 	"Only numbers are allowed in this field"
      },
     
      password:{
        required: 	"Password is required",
        minlength: 	"Password should be minimum 8 characters",
        maxlength: 	"Password should be maximum 16 characters",
      }
      }
  }
  $("#myForm").multiStepForm(
  {
    // defaultStep:0,
    beforeSubmit : function(form, submit){
      console.log("called before submiting the form");
      console.log(form);
      console.log(submit);
    },
    validations:val,
  }
  ).navigateTo(0);
});
// otp code===========
const $inp = $(".ap-otp-input");

$inp.on({
  paste(ev) { // Handle Pasting
  
    const clip = ev.originalEvent.clipboardData.getData('text').trim();
    // Allow numbers only
    if (!/\d{6}/.test(clip)) return ev.preventDefault(); // Invalid. Exit here
    // Split string to Array or characters
    const s = [...clip];
    // Populate inputs. Focus last input.
    $inp.val(i => s[i]).eq(5).focus(); 
  },
  input(ev) { // Handle typing
    
    const i = $inp.index(this);
    if (this.value) $inp.eq(i + 1).focus();
  },
  keydown(ev) { // Handle Deleting
    
    const i = $inp.index(this);
    if (!this.value && ev.key === "Backspace" && i) $inp.eq(i - 1).focus();
  }
  
});


// FOR events ==========
// $('.owl-carousel').owlCarousel({
//   loop:true,
//   margin:2,
//   dots:false,
//   nav:true,
//   responsive:{
//       0:{
//           items:2
//       },
//       600:{
//           items:5
//       },
//       1000:{
//           items:8
//       }
//   }
// })
// fixed event top
document.addEventListener("DOMContentLoaded", function () {

  window.addEventListener('scroll', function () {

    if (window.scrollY > 200) {
      document.getElementById('navbar_top-menu').classList.add('fixed-top');
      // add padding top to show content behind navbar
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar_top-menu').classList.remove('fixed-top');
      // remove padding top from body
      document.body.style.paddingTop = '0';
    }
  });
});
// mobile envent category===========
$('.event-category').owlCarousel({
  stagePadding: 0,
  loop:true,
  margin:0,
  nav:false,
  dots:false,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
})

$('.all-cate').owlCarousel({
  // stagePadding: 0,
  loop:true,
  margin:10,
  nav:false,
  dots:false,
  // autoWidth:true,
  responsive:{
      0:{
          items:1.2
      },
      600:{
          items:1.2
      },
      1000:{
          items:1.2
      }
  }
})
// HOW IT WORKS==========
if (window.innerWidth > 834) {

  const accordion = document.getElementById("stepsAccordion");

  const initAccordion = (accordionElement) => {
    const handlePanelClick = (e) => {
      showPanel(e.currentTarget);
    };

    const showPanel = (panel) => {
      const expandedPanel = accordionElement.querySelector(".expanded");
      if (expandedPanel) {
        expandedPanel.classList.remove("expanded");
      }
      panel.classList.add("expanded");
    };

    const allPanel = accordionElement.querySelectorAll(".panel");

    for (let i = 0; i < allPanel.length; i++) {
      allPanel[i].addEventListener("click", handlePanelClick);
    }
  };

  initAccordion(accordion);

}

$("#stepsAccordion")
.find(".panel")
.on("click", function () {
  let panelId = $(this).attr("data-id");
  let sectionImg = $(this)
    .parents("#how__it__works__cover")
    .find(".img-cover img");

  if (panelId === "1") {
    sectionImg.animate({
      left: "0px",
    });
  } else if (panelId === "2") {
    sectionImg.animate({
      left: "-100%",
    });
  } else if (panelId === "3") {
    sectionImg.animate({
      left: "-200%",
    });
  } else if (panelId === "4") {
    sectionImg.animate({
      left: "-300%",
    });
  }
});

