/* =========================================================
   main.js — shared page effects (every page includes this)
   ========================================================= */
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- active nav highlighting ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.termnav a, .mobilenav a').forEach(function(a){
    var href = a.getAttribute('href');
    if(href === here || (here === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });

  /* ---------- scroll progress bar ---------- */
  var bar = document.getElementById('progress-bar');
  function updateProgress(){
    if(!bar) return;
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = (isFinite(scrolled) ? scrolled : 0) + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- decrypt / scramble text effect on section headers ---------- */
  var scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  function decryptEl(el){
    if(el.dataset.decrypted) return;
    el.dataset.decrypted = '1';
    var final = el.textContent;
    var len = final.length;
    if(reduceMotion){ el.textContent = final; return; }
    var frame = 0;
    var totalFrames = 18;
    var interval = setInterval(function(){
      var out = '';
      for(var i=0; i<len; i++){
        if(final[i] === ' '){ out += ' '; continue; }
        var reveal = (frame / totalFrames) * len;
        if(i < reveal){ out += final[i]; }
        else { out += scrambleChars[Math.floor(Math.random()*scrambleChars.length)]; }
      }
      el.textContent = out;
      frame++;
      if(frame > totalFrames){
        el.textContent = final;
        clearInterval(interval);
      }
    }, 28);
  }
  var decryptEls = document.querySelectorAll('.decrypt');
  if('IntersectionObserver' in window && decryptEls.length){
    var io2 = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          decryptEl(entry.target);
          io2.unobserve(entry.target);
        }
      });
    }, { threshold:0.4 });
    decryptEls.forEach(function(el){ io2.observe(el); });
  }

  /* ---------- tilt effect on project cards ---------- */
  if(!reduceMotion && window.matchMedia('(hover:hover)').matches){
    document.querySelectorAll('.commit').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(600px) rotateY(' + (x*6) + 'deg) rotateX(' + (-y*6) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform = '';
      });
    });
  }
})();
