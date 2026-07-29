(function(){
  "use strict";

  /* ---------- sticky nav shrink ---------- */
  var navbar = document.getElementById('navbar');
  var toTop = document.getElementById('toTop');
  function onScroll(){
    var y = window.scrollY || document.documentElement.scrollTop;
    if(navbar) navbar.classList.toggle('is-scrolled', y > 12);
    if(toTop) toTop.classList.toggle('show', y > 500);
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  if(toTop){
    toTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  /* ---------- mobile drawer ---------- */
  var drawer = document.getElementById('mobileDrawer');
  var openBtns = [document.getElementById('menuBtn'), document.getElementById('navToggle')];
  var closeBtn = document.getElementById('drawerClose');
  var scrim = document.getElementById('drawerScrim');

  function openDrawer(){ drawer.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeDrawer(){ drawer.classList.remove('open'); document.body.style.overflow=''; }

  openBtns.forEach(function(btn){
    if(btn) btn.addEventListener('click', openDrawer);
  });
  if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if(scrim) scrim.addEventListener('click', closeDrawer);
  drawer && drawer.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeDrawer);
  });

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
    reveals.forEach(function(el){ io.observe(el); });

    // stagger children indices
    document.querySelectorAll('.reveal-stagger').forEach(function(group){
      Array.prototype.forEach.call(group.children, function(child, i){
        child.style.setProperty('--i', i);
      });
    });
  } else {
    reveals.forEach(function(el){ el.classList.add('is-in'); });
  }

  /* ---------- horizontal carousels ---------- */
  function wireCarousel(trackId, prevId, nextId){
    var track = document.getElementById(trackId);
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    if(!track) return;
    function step(){
      var card = track.querySelector('article, .svc-card, .social-card');
      var gap = 22;
      return card ? card.getBoundingClientRect().width + gap : 280;
    }
    if(prev) prev.addEventListener('click', function(){
      track.scrollBy({left:-step()*1.2, behavior:'smooth'});
    });
    if(next) next.addEventListener('click', function(){
      track.scrollBy({left:step()*1.2, behavior:'smooth'});
    });
  }
  wireCarousel('svcTrack','svcPrev','svcNext');

  /* ---------- drag-to-scroll for horizontal tracks ---------- */
  document.querySelectorAll('.svc-track, .social-track').forEach(function(track){
    var isDown = false, startX, scrollLeft;
    track.addEventListener('pointerdown', function(e){
      isDown = true;
      track.setPointerCapture(e.pointerId);
      startX = e.clientX;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('pointermove', function(e){
      if(!isDown) return;
      track.scrollLeft = scrollLeft - (e.clientX - startX);
    });
    ['pointerup','pointerleave','pointercancel'].forEach(function(ev){
      track.addEventListener(ev, function(){ isDown = false; });
    });
  });

  /* ---------- active nav link on scroll (Utama vs sections) ---------- */
  // Kept simple: single-page mock, "Utama" stays active.

})();
