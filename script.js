gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.

var contactusContent=document.querySelector('#contactusContent');
contactusContent.addEventListener('mousemove',function(dets){
  
  gsap.to('#cursor',{
    x:dets.x,
    y:dets.y,
  })
})

var main=document.querySelector('#main');
main.addEventListener('mousemove',function(dets){
  
  gsap.to('#cursor',{
    x:dets.x,
    y:dets.y,
  })
})

var v = gsap.timeline();
v.from("#navtitle", {
    y: -1000
})
// v.from("#links a", {
//     duration: 0.1,
//     y: -1000,
//     stagger: 1
// })
v.from("#backgroundText h1", {
    x: -10000,
})

v.from("#mainText h3", {
    x: -10000,
})

function calc() {
    var totalBill = parseFloat(document.querySelector("#totalBill").value);
    var percentage = parseFloat(document.querySelector("#percentage").value);
    var numberOfPeople = parseFloat(document.querySelector("#numberOfPeople").value);
    var output = document.querySelector("#box");

    if (isNaN(totalBill) || isNaN(percentage) || isNaN(numberOfPeople) || numberOfPeople === 0) {
        output.textContent = "Please enter valid values.";
        return;
    }

    var tipAmount = (totalBill * (percentage / 100)) / numberOfPeople;
    output.textContent = "The total tip for each person is: " + tipAmount;
}

document.querySelector("#subButton").addEventListener("click", function(event) {
    event.preventDefault();
    calc();
});

gsap.from("#calc",{
  x: 10000,
  scrollTrigger:{
    trigger: "#calc",
    scroller:"#main",
    marker:true,
    start: "top 60%"
  }
})

gsap.from("#aboutUs", {
    x:-10000,
    duration: 0.5,
    scrollTrigger:{
      trigger: "#au",
      scroller:"#main",
      marker:true,
      start: "top 110%"
    }
})

var crsr = document.getElementById('cursor');
var contactus = document.getElementById('contactus');

contactus.addEventListener('mousemove', function(dets) {
    crsr.style.zIndex = "9"; 
});