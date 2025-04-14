
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
    let dialogueStep = 0;

    // Initial animations and sprite setup
    $("#hallwayScene2").animate({ opacity: "1" }, 2000);
    $("#mariSprite").css({ top: "30px", left: "340px", right: "80px" });
    $("#aubreySprite").css({ top: "30px", left: "240px", right: "20px" });
    $("#sunnySprite").css({ top: "340px", left: "-20px" });
    $("#keiSprite").css({ top: "355px", left: "-20px" });

    moveKeiRight(0.02);
    moveSunnyRight(0.02);
    moveMariDown(0.02);
    moveAubreyDown(0.02);

    $("#textBox").animate({ opacity: "1" }, 2000);
    $("#mariSprite").animate({ opacity: "1" });
    $("#aubreySprite").animate({ opacity: "1" });

    $("#yapper").text("Mari").css("color", "#800080");
    $("#textContent").text("Finally school is over...");

    // Handle spacebar press progression
    let canProgress = true; // Prevents spacebar spam

document.body.onkeyup = function (e) {
    if ((e.key === " " || e.code === "Space" || e.keyCode === 32) && canProgress) {
        canProgress = false;
        dialogueStep++;

        switch (dialogueStep) {
            case 1:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("I know...");
                break;

            case 2:
                $("#textContent").text("Do you really think we're immature?? I mean.. stereotypes exist for a reason right?..");
                break;

            case 3:
                $("#yapper").text("Mari").css("color", "#800080");
                $("#textContent").text("No! Of course not! Besides, what do they know about us? All they do is argue about LeBron all day and talk about sports. They're nothing like us.");
                break;

            case 4:
                $("#keiSprite").animate({ opacity: "1" });
                $("#sunnySprite").animate({ opacity: "1" });
                $("#sunnySprite").css("clip-path", "inset(55px 0px 0px 0px)");
                moveKeiRight(1.5);
                moveSunnyRight(2.2);
                sleep(2500).then(() => {
                    $("#sunnySprite").css({ height: "calc(16px * 13)", "clip-path": "inset(60px 0px 0px 0px)" });
                    moveSunnyUp(0.15);
                    sleep(500).then(() => {
                        $("#sunnySprite").css({ height: "calc(16px * 12)", "clip-path": "inset(40px 0px 20px 0px)" });
                        moveSunnyLeft(0.002);
                    });
                });
                break;

            case 5:
                $("#yapper").text("John").css("color", "#808080");
                $("#textContent").text("Hey Kurt! Check out this awesome tattoo I got!");
                break;

            case 6:
                $("#yapper").text("Kurt").css("color", "#964B00");
                $("#textContent").text("Yooo! How did you convince your mom to get a Kobe tattoo???");
                break;

            case 7:
                $("#yapper").text("John").css("color", "#808080");
                $("#textContent").text("I didn't! Heheee...");
                break;

            case 8:
                $("#yapper").text("Kurt").css("color", "#964B00");
                $("#textContent").text("Haha!");
                sleep(1500).then(() => {
                    $("#sunnySprite").css({ height: "calc(16px * 13)", "clip-path": "inset(50px 0px 20px 0px)" });
                    moveKeiRight(2.2);
                    moveSunnyRight(1.5);
                    sleep(2500).then(() => {
                        $("#sunnySprite").css("opacity", "0");
                        $("#keiSprite").css("opacity", "0");
                    });
                });
                break;

            case 9:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("Wait... Isn't that exactly what they just accused us of?? Getting a tattoo??!");
                break;

            case 10:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("Maybe we aren't so different after all...");
                sleep(3000).then(() => {
                    $("#hallwayScene2").animate({ opacity: "0" }, 1000);
                    $("#textBox").animate({ opacity: "0" }, 1000);
                    sleep(1000).then(()=>{
                      window.location.href = "scene3.html";
                    })
                });
                break;
        }

        // Set different delays for specific steps (optional fine-tuning)
        let delay = 750; // default

        if (dialogueStep === 4) delay = 3000;
        if (dialogueStep === 8) delay = 4500;
        if (dialogueStep === 10) delay = 4000;

        setTimeout(() => {
            canProgress = true;
        }, delay);
    }
};
});
