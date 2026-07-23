/* =========================================================
   terminal.js — boot sequence + interactive command terminal
   (included on index.html only)
   ========================================================= */
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- boot sequence ---------- */
  var overlay = document.getElementById('boot-overlay');
  var bootText = document.getElementById('boot-text');
  var skipBtn = document.getElementById('skip-boot');

  var bootLines = [
    'antony-portfolio boot sequence v2.0',
    '[  OK  ] Mounting filesystem /home/antony ...',
    '[  OK  ] Starting network manager ...',
    '[  OK  ] Loading profile antony_sabu.json ...',
    '[  OK  ] Role: Cybersecurity Analyst (Entry-Level)',
    '[  OK  ] Location: Kottayam, Kerala, India',
    '[  OK  ] Status: available for opportunities',
    '[  OK  ] Starting terminal session ...',
    '',
    'Welcome. Initializing portfolio interface...'
  ];

  function finishBoot(){
    if(!overlay) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    sessionStorage.setItem('bootSeen', '1');
  }

  function runBoot(){
    if(!overlay || !bootText) return;

    if(reduceMotion || sessionStorage.getItem('bootSeen')){
      finishBoot();
      return;
    }

    document.body.style.overflow = 'hidden';
    var i = 0;
    function nextLine(){
      if(i >= bootLines.length){
        setTimeout(finishBoot, 500);
        return;
      }
      var p = document.createElement('div');
      p.textContent = bootLines[i];
      bootText.appendChild(p);
      i++;
      setTimeout(nextLine, 130);
    }
    nextLine();
  }

  if(skipBtn){ skipBtn.addEventListener('click', finishBoot); }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ finishBoot(); }
  });
  runBoot();

  /* ---------- typed role line ---------- */
  var roles = [
    'Cybersecurity Analyst (Entry-Level)',
    'Threat Detection & Digital Forensics',
    'SIEM Monitoring · Incident Response'
  ];
  var roleEl = document.getElementById('roleTyped');
  if(roleEl){
    if(reduceMotion){
      roleEl.textContent = roles[0];
    } else {
      (function typeLoop(){
        var ri = 0;
        function cycle(){
          var text = roles[ri % roles.length];
          var i = 0;
          roleEl.textContent = '';
          var typeInt = setInterval(function(){
            roleEl.textContent = text.slice(0, i+1);
            i++;
            if(i === text.length){
              clearInterval(typeInt);
              setTimeout(eraseText, 1600);
            }
          }, 38);
          function eraseText(){
            var eraseInt = setInterval(function(){
              roleEl.textContent = text.slice(0, i-1);
              i--;
              if(i === 0){
                clearInterval(eraseInt);
                ri++;
                setTimeout(cycle, 300);
              }
            }, 22);
          }
        }
        cycle();
      })();
    }
  }

  /* ---------- interactive terminal ---------- */
  var body = document.getElementById('termBody');
  var input = document.getElementById('termInput');
  if(!body || !input) return;

  function print(html, cls){
    var p = document.createElement('p');
    p.className = 'term-line ' + (cls || 'out');
    p.innerHTML = html;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }
  function printCmd(cmd){ print('<span class="p">antony@kali:~$</span> ' + cmd, 'cmd'); }

  var pages = {
    about: 'about.html', skills: 'skills.html', experience: 'experience.html',
    projects: 'projects.html', contact: 'contact.html', home: 'index.html'
  };

  var commands = {
    help: function(){
      print('Available commands:', 'head');
      print('cd &lt;page&gt;  — navigate (about, skills, experience, projects, contact)', 'out');
      print('ls          — list pages', 'out');
      print('whoami      — who I am', 'out');
      print('clear       — clear the terminal', 'out');
      print('sudo        — try it and see', 'out');
    },
    whoami: function(){ print('antony_sabu — cybersecurity analyst (entry-level)', 'ok'); },
    ls: function(){ print('about.html  skills.html  experience.html  projects.html  contact.html', 'ok'); },
    sudo: function(){
      print('[sudo] password for visitor: ********', 'warn');
      print('Nice try. Access requires an actual job offer.', 'warn');
    },
    clear: function(){ body.innerHTML = ''; },
  };

  function runCommand(raw){
    var trimmed = raw.trim();
    var cmd = trimmed.toLowerCase();
    if(cmd === '') return;
    printCmd(raw);

    var cdMatch = cmd.match(/^(cd|open|goto)\s+([a-z]+)$/);
    if(cdMatch && pages[cdMatch[2]]){
      print('→ navigating to ' + pages[cdMatch[2]] + ' ...', 'ok');
      setTimeout(function(){ window.location.href = pages[cdMatch[2]]; }, 350);
      return;
    }
    if(commands[cmd]){ commands[cmd](); return; }
    if(pages[cmd]){
      print('→ navigating to ' + pages[cmd] + ' ...', 'ok');
      setTimeout(function(){ window.location.href = pages[cmd]; }, 350);
      return;
    }
    print('command not found: ' + raw + ' — type <span class="ok">help</span>', 'warn');
  }

  input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){ runCommand(input.value); input.value = ''; }
  });
  document.querySelector('.term-body').addEventListener('click', function(){ input.focus(); });
})();
