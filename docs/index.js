
//waiting function, for breaks in cutscenes & transitions based on time
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


$(function () {
  const speed = 3;

  // ======================
  // AUBREY MOVEMENT
  // ======================
  const $aubrey = $('#aubreySprite');
  const $aubreySheet = $aubrey.find('.aubreySprite_spritesheet');
  let frameAubrey = 0;
  let aubreyFrameCounter = 0;

  const dirOffsets = {
    right: 0,
    up: 4,
    left: 8,
    down: 12
  };

  const directions = {
    up:    { dx: 0, dy: -1 },
    down:  { dx: 0, dy: 1 },
    left:  { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 }
  };

  function moveAubreyDirection(dir, durationSeconds) {
    if (!(dir in directions)) return;

    let timeElapsed = 0;
    let interval = 1000 / 60; // 60 fps
    let totalDuration = durationSeconds * 1000;

    let moveInterval = setInterval(() => {
      if (timeElapsed >= totalDuration) {
        clearInterval(moveInterval);
        frameAubrey = 0;
        updateAubreyFrame(dir, frameAubrey);
        return;
      }

      const pos = $aubrey.position();
      let top = pos.top + directions[dir].dy * speed;
      let left = pos.left + directions[dir].dx * speed;
      $aubrey.css({ top, left });

      aubreyFrameCounter++;
      if (aubreyFrameCounter % 8 === 0) {
        frameAubrey = (frameAubrey + 1) % 4;
        updateAubreyFrame(dir, frameAubrey);
      }

      timeElapsed += interval;
    }, interval);
  }

  function updateAubreyFrame(dir, frame) {
    const frameIndex = dirOffsets[dir] + frame;
    const xOffset = -128 * frameIndex;
    $aubreySheet.css('transform', `translateX(${xOffset}px)`);
  }

  // ======================
  // MARI MOVEMENT
  // ======================
  const $mari = $('#mariSprite');
  const $mariSheet = $mari.find('.mariSprite_spritesheet');
  const mariDirections = {
    up:    { dx: 0, dy: -1, class: 'face-up' },
    down:  { dx: 0, dy: 1, class: 'face-down' },
    left:  { dx: -1, dy: 0, class: 'face-left' },
    right: { dx: 1, dy: 0, class: 'face-right' }
  };

  function moveMariDirection(dir, durationSeconds) {
    if (!(dir in mariDirections)) return;

    const direction = mariDirections[dir];
    let timeElapsed = 0;
    let interval = 1000 / 60;
    let totalDuration = durationSeconds * 1000;

    $mariSheet.removeClass('face-down face-up face-left face-right walking');
    $mariSheet.addClass(direction.class);
    $mariSheet.addClass('walking');

    let moveInterval = setInterval(() => {
      if (timeElapsed >= totalDuration) {
        clearInterval(moveInterval);
        $mariSheet.removeClass('walking');
        $mariSheet.css('transform', 'translateX(-128px)'); // idle frame
        return;
      }

      const pos = $mari.position();
      const top = pos.top + direction.dy * speed;
      const left = pos.left + direction.dx * speed;
      $mari.css({ top, left });

      timeElapsed += interval;
    }, interval);
  }
  // ======================
  // KEI MOVEMENT
  // ======================
  const $kei = $('#keiSprite');
  const $keiSheet = $kei.find('.keiSprite_spritesheet');
  const keiDirections = {
    up:    { dx: 0, dy: -1, class: 'face-up' },
    down:  { dx: 0, dy: 1, class: 'face-down' },
    left:  { dx: -1, dy: 0, class: 'face-left' },
    right: { dx: 1, dy: 0, class: 'face-right' }
  };

  function moveKeiDirection(dir, durationSeconds) {
    if (!(dir in keiDirections)) return;

    const direction = keiDirections[dir];
    let timeElapsed = 0;
    let interval = 1000 / 60;
    let totalDuration = durationSeconds * 1000;

    $keiSheet.removeClass('face-down face-up face-left face-right keiWalk');
    $keiSheet.addClass(direction.class);
    $keiSheet.addClass('keiWalk');

    let moveInterval = setInterval(() => {
      if (timeElapsed >= totalDuration) {
        clearInterval(moveInterval);
        $keiSheet.removeClass('keiWalk');
        $keiSheet.css('transform', 'translateX(-128px)'); // idle frame
        return;
      }

      const pos = $kei.position();
      const top = pos.top + direction.dy * speed;
      const left = pos.left + direction.dx * speed;
      $kei.css({ top, left });

      timeElapsed += interval;
    }, interval);
  }
  // ======================
  // SUNNY MOVEMENT
  // ======================
  const $sunny = $('#sunnySprite');
  const $sunnySheet = $sunny.find('.sunnySprite_spritesheet');
  const sunnyDirections = {
    up:    { dx: 0, dy: -1, class: 'face-up' },
    down:  { dx: 0, dy: 1, class: 'face-down' },
    left:  { dx: -1, dy: 0, class: 'face-left' },
    right: { dx: 1, dy: 0, class: 'face-right' }
  };

  function moveSunnyDirection(dir, durationSeconds) {
  if (!(dir in sunnyDirections)) return;

  const direction = sunnyDirections[dir];
  let timeElapsed = 0;
  let interval = 1000 / 60;
  let totalDuration = durationSeconds * 1000;

  $sunnySheet.removeClass('face-down face-up face-left face-right sunnyWalk');
  $sunnySheet.addClass(direction.class);
  $sunnySheet.addClass('sunnyWalk');

  let moveInterval = setInterval(() => {
    if (timeElapsed >= totalDuration) {
      clearInterval(moveInterval);
      $sunnySheet.removeClass('sunnyWalk');

      // ✅ Set transform back to idle frame (middle one)
      $sunnySheet.css('transform', 'translateX(-128px)');
      return;
    }

    const pos = $sunny.position();
    const top = pos.top + direction.dy * speed;
    const left = pos.left + direction.dx * speed;
    $sunny.css({ top, left });

    timeElapsed += interval;
  }, interval);
}



  
  // ================================
  // PUBLIC CONTROL FUNCTIONS
  // ================================
  window.moveAubreyUp =    (sec) => moveAubreyDirection('up', sec);
  window.moveAubreyDown =  (sec) => moveAubreyDirection('down', sec);
  window.moveAubreyLeft =  (sec) => moveAubreyDirection('left', sec);
  window.moveAubreyRight = (sec) => moveAubreyDirection('right', sec);

  window.moveMariUp =    (sec) => moveMariDirection('up', sec);
  window.moveMariDown =  (sec) => moveMariDirection('down', sec);
  window.moveMariLeft =  (sec) => moveMariDirection('left', sec);
  window.moveMariRight = (sec) => moveMariDirection('right', sec);
  
  window.moveKeiUp =    (sec) => moveKeiDirection('up', sec);
  window.moveKeiDown =  (sec) => moveKeiDirection('down', sec);
  window.moveKeiLeft =  (sec) => moveKeiDirection('left', sec);
  window.moveKeiRight = (sec) => moveKeiDirection('right', sec);
  
  window.moveSunnyUp =    (sec) => moveSunnyDirection('up', sec);
  window.moveSunnyDown =  (sec) => moveSunnyDirection('down', sec);
  window.moveSunnyLeft =  (sec) => moveSunnyDirection('left', sec);
  window.moveSunnyRight = (sec) => moveSunnyDirection('right', sec);
  
});




// ===== INTRO SCREEN INTERACTIONS =====
$(document).ready(function () {
  $('#startBtn').click(function () {
    const introContent = document.querySelector('.intro-content');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Fade out title content
    introContent.style.transition = 'opacity 1s ease';
    introContent.style.opacity = '0';

    // After fade out, hide intro content and show loading overlay
    setTimeout(() => {
      introContent.style.display = 'none';
      loadingOverlay.style.display = 'flex';

      // Wait for loading bar animation (3s)
      setTimeout(() => {
        $('#introScreen').fadeOut(1000, function () {
          $('#mainContent').fadeIn(500, () => {

            setTimeout(() => {
              moveAubreyLeft(0.02);
              moveMariLeft(0.02);
              $("#aubreySprite").css("visibility", "visible");
              $("#mariSprite").css("visibility", "visible");
              moveKeiLeft(0.02);
              moveSunnyLeft(0.02);
              $("#textContent").text("(press space to move on)");

              const steps = [
                () => {
                  $("#yapper").text("Aubrey:").css("color", "#1F51FF");
                  $("#textContent").text("Man, I wish school was over already...");
                },
                () => {
                  $("#yapper").text("Mari:").css("color", "#800080");
                  $("#textContent").text("I know right! Why do we have to learn English? We speak the language!");
                },
                () => {
                  $("#yapper").text("Aubrey:").css("color", "#1F51FF");
                  $("#textContent").text("...");
                },
                () => {
                  $("#yapper").text("Aubrey:").css("color", "#1F51FF");
                  $("#textContent").text("How's acquiring those Blackpink tickets going?");
                },
                () => {
                  $("#yapper").text("Mari:").css("color", "#800080");
                  $("#textContent").text("Hmm.. I'm not sure. I'm going to have to ask my parents about that. Turns out it's stupidly difficult to get tickets to a BP concert!");
                  $("#keiSprite").css("visibility", "visible");
                  $("#sunnySprite").css("visibility", "visible");
                  moveSunnyLeft(5);
                  moveKeiLeft(4.8);
                },
                () => {
                  moveAubreyRight(0.02);
                  moveMariRight(0.02);
                  $("#yapper").text("Kurt:").css("color", "#964B00");
                  $("#textContent").text("Hey LOSERS, still talking about K-pop? When are you going to grow up??");
                },
                () => {
                  $("#yapper").text("John:").css("color", "#808080");
                  $("#textContent").text("Yeah! We know what you guys do. Spending all your money on stupid pictures or posters of your favorite idols, fighting on the streets over idol groups, even getting tattoos of them! Ridiculous! Could you imagine Kurt??");
                },
                () => {
                  $("#yapper").text("Kurt:").css("color", "#964B00");
                  $("#textContent").text("Nope! Not at all.");
                },
                () => {
                  $("#yapper").text("Kurt:").css("color", "#964B00");
                  $("#textContent").text("...");
                },
                () => {
                  $("#yapper").text("Kurt:").css("color", "#964B00");
                  $("#textContent").text("Let's get out of here John. We've got the NBA Finals to watch anyways.");
                },
                () => {
                  $("#yapper").text("John:").css("color", "#808080");
                  $("#textContent").text("Right. Cya Losers!");
                },
                () => {
                  $("#sunnySprite").css("height", "calc(16px * 13)");
                  $("#sunnySprite").css("clip-path", "inset(47px 0px 20px 0px)");
                  moveKeiRight(4.8);
                  moveSunnyRight(5);
                  setTimeout(() => {
                    $("#keiSprite").css("visibility", "hidden");
                    $("#sunnySprite").css("visibility", "hidden");
                  }, 5000);
                },
                () => {
                  $("#yapper").text("Mari:").css("color", "#800080");
                  $("#textContent").text("Ugh! What idiots. Is LeBron even that good?1?!");
                  setTimeout(() => {
                    $("#mainContent").animate({ opacity: "0" }, 1000);
                    $("#textBox").animate({ opacity: "0" }, 1000);
                    setTimeout(() => {
                      window.location.href = "scene2.html";
                    }, 1000);
                  }, 3000);
                }
              ];
              
              let currentStep = 0;
              let canAdvance = true;
              
              document.body.onkeyup = function (e) {
                if ((e.key === " " || e.code === "Space" || e.keyCode === 32) && canAdvance) {
                  if (currentStep < steps.length) {
                    canAdvance = false;
              
                    steps[currentStep]();
                    currentStep++;
              
                    // Custom delay logic (adjustable per step)
                    let delay = 750;
              
                    if (currentStep === 5) delay = 3000;
                    if (currentStep === 12) delay = 5500;
                    if (currentStep === 13) delay = 4000;
              
                    setTimeout(() => {
                      canAdvance = true;
                    }, delay);
                  }
                }
              };

            }, 100); // buffer after main content is shown
          });
        });
      }, 3500);
    }, 1000);
  });
});


