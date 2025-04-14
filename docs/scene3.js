
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
  
  
  
  
  // ===== CUTSCENE =====
  $(document).ready(function () {

    // Initial animations and sprite setup
    $("#busScene1").animate({ opacity: "1" }, 2000);
    $("#mariSprite").css({ top: "220px", left: "250px", right: "80px" });
    $("#aubreySprite").css({ top: "220px", left: "150px", right: "20px" });
    $("#sunnySprite").css({ top: "340px", left: "-20px" });
    $("#keiSprite").css({ top: "355px", left: "-20px" });

    moveKeiRight(0.02);
    moveSunnyRight(0.02);
    moveMariRight(0.02);
    moveAubreyRight(0.02);

    $("#textBox").animate({ opacity: "1" }, 2000);
    $("#mariSprite").animate({ opacity: "1" });
    $("#aubreySprite").animate({ opacity: "1" });

    $("#textContent").text("(press space to move on)");

    // Handle spacebar press progression
    let dialogueStep = 0;
let canProgress = true; // Controls when spacebar is allowed

document.body.onkeyup = function (e) {
    if ((e.key === " " || e.code === "Space" || e.keyCode === 32) && canProgress) {
        canProgress = false; // Lock progression

        dialogueStep++;

        switch (dialogueStep) {
            case 1:
                moveMariRight(0.7);
                moveAubreyRight(0.7);
                sleep(1000).then(() => {
                    $("#yapper").text("Mari").css("color", "#800080");
                    $("#textContent").text("...");
                });
                break;

            case 2:
                $("#yapper").text("Mari").css("color", "#800080");
                $("#textContent").text("What hypocrites! They make fun of us for doing things that they do just as often! And besides, only like.. 3% of us have tattoos! That shouldn't represent our entire fanbase...");
                break;

            case 3:
                $("#yapper").text("Mari").css("color", "#800080");
                $("#textContent").text("And besides, how is it fair that those 3% represent all of us, while sports fans get to be represented by the majourity!");
                break;

            case 4:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("We should do something about this...");
                break;

            case 5:
                $("#yapper").text("Mari").css("color", "#808080");
                $("#textContent").text("Why don't we go to my house and do some research on this? Let's prove that K-pop fan's treatment isn't fair once and for all.");
                sleep(5000).then(() => {
                    $("#busScene1").animate({ opacity: "0" }, 1000);
                    $("#textBox").animate({ opacity: "0" }, 1000);
                    sleep(1000).then(() => {
                        window.location.href = "scene4.html";
                    });
                });
                break;
        }

        // Set delay before next spacebar can be used (adjust duration per step)
        let delay = 750;
        if (dialogueStep === 1) delay = 1000;
        if (dialogueStep === 5) delay = 6000; // longer wait for final scene transition

        setTimeout(() => {
            canProgress = true;
        }, delay);
    }
};
});
