
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
    var viewed = 0;

    // Initial animations and sprite setup
    $("#libraryScene1").animate({ opacity: "1" }, 2000);
    $("#textBox").animate({ opacity: "1" }, 2000);
    $("#textContent").text("(press space to move on)");
    //opening folder images for essay text
    $("img").on("click", function(){
      $(this).css("height", "140px")
      $(this).css("width", "150px")
      if((this.id) == "f2"){
        //if f2 folder
        viewed +=1;
        $("#essayText2").text("To start, K-Pop fans and sports fans are both equally invested and passionate in their own fandoms. Both types of fans form strong emotional connections with their favorites and create close communities. According to Tilburg University (2024), sports fans strongly identify with their team and players, celebrating victories and sharing disappointments as a community. Korean fans of K-pop feel the same about their idols, following their careers, attending concerts, purchasing albums, and streaming their songs to boost numbers. In addition to this, Sporting Bounce (2024) explains that a major reason sports fans become emotionally invested in their teams is because they feel part of something bigger. The same is true for K-pop idols. Many K-pop fan groups hold charity projects, campaign for social causes, or collaborate on large-scale projects. For example, BTS fans (also known as ARMY) were able to raise over $1 million in a single day for BLM (Black Lives Matter), showing how organized and passionate K-pop fans can be (Locke, 2021). The difference here is that despite both fandoms sharing a similarity in the strength of their passions, sports fans are considered loyal and dedicated, while K-pop fans are ridiculed. This unequal judgment often comes down to the media’s portrayal of K-pop in comparison to sports, in combination with other factors. " + 
          "In the wider media, Sports fans are often shown as passionate, dedicated, and committed, and their enthusiasm is portrayed as a good thing. They appear in advertisements, documentaries, and interviews about their devotion. In contrast, nearly every instance of K-pop fans appearing in the media, broadcasters are ridiculing them for “ridiculous” fan behaviors. The bias here is that while sports fans have, objectively, equally irrational or sometimes even violent fan behaviours every now and then, such as sports riots or fights that end in deaths, the media tends to gloss over these, while the extreme actions of K-pop fans are put under a microscope and given the big stage. The media is the door to the wider population’s information base, and what goes through mainstream media affects the perception of K-pop severely, on the scale of billions. It is obvious that the average fan, K-pop or sports, does not participate in the extreme actions of the minority, however K-pop’s extremes are focused on, the media allowing the minority to represent the whole. This creates a stereotype of K-pop fans being unreasonable or emotional when their attitude is actually comparable to that of sports fans.");
        sleep(100).then(()=>{
          $(this).attr('src', 'closefolder.png');
          $("#essayText").addClass("active");
          $("#closeButton").on("click", function(){
            $(essayText).removeClass("active");
            sleep(100).then(()=>{
              $("#f2").attr('src', 'folder.png');
              $("#f2").css("height", "160px")
              $("#f2").css("width", "170px")
            })
          })
        })

      }
      else if((this.id) == "f3"){
        //if f3 folder
        viewed +=1;
        $("#essayText2").text("As a result of this, sports fandom receives broader social acceptance worldwide. Choi (2015) highlights how high-profile business leaders in South Korea publicly support professional sports teams. They go to games, sponsor teams, and generally promote sports fandom as respectable behavior. This contrasts with how K-pop fandom is seen. While sports fans can spend a very big amount of money on tickets, merchandise, and travel, and not be judged for it, K-pop fans who buy multiple album versions or spend time streaming are considered wasting money or too invested in entertainment. You will never see LeBron James or Elon Musk attending a Blackpink concert, and yet you will see the same celebrities at baseball or soccer matches. The difference is that these celebrities know that if they appear at a sports game, it will actually make them seem more relatable to the general public, utilizing the mainstream media to increase their likability and relatability, whereas Trump appearing at a K-pop concert almost certainly would have led to less voters. Even though both fandoms contribute to billion-dollar industries, only one is considered “serious.”" + 
          "Some would argue K-pop fandom’s extremes go past the norm, even for obsessive fanbases, like online fan wars and obsessive behaviors such as breaking into idol’s dorms and homes. While some fans go overboard, sports fans are no different. Sports hooliganism, violent riots, and even player harassment incidents are well documented but are often seen as actions of a few and not representative of all sports fans behavior. Meanwhile, extreme K-pop fans who behave badly are generally labeled as obsessive or toxic, an unfair double standard. The public often generalizes K-pop fandom based on its loudest minority, while excusing similar behaviors from sports fans.");

        sleep(100).then(()=>{
          $(this).attr('src', 'closefolder.png');
          $("#essayText").addClass("active");
          $("#closeButton").on("click", function(){
            $(essayText).removeClass("active");
            sleep(100).then(()=>{
              $("#f3").attr('src', 'folder.png');
              $("#f3").css("height", "160px")
              $("#f3").css("width", "170px")
            })
          })
        })

      }
      else if((this.id) == "f4"){
        //if f4 folder
        viewed +=1;
        $("#essayText2").text("Some would also argue that K-pop fandom’s parasocial relationships with their idols separates them from other fanbases, and adds an element of instability to the fandom. However, sports fandom research suggests similar patterns. Many fans feel deeply connected to their favorite athletes, following their careers closely and experiencing emotional highs and lows based on their performances (Tilburg University, 2024). Emotions behind both fandoms are the same, but K-pop fans are judged more for expressing them. The only difference is in who’s allowed to be passionate without shame." + 
          "This stereotyping of K-pop fans against sports fans is emblematic of a larger question about how society values different types of passions. Both groups show great commitment, emotional investment, and financial backing, but K-pop fans get much more criticism. This bias is rooted in media representations, historical significance, and cultural perspectives. But these stodgy stereotypes are getting stale as K-pop becomes more global in scope. More inclusive views of fandom are needed as culture becomes more interconnected.");
        sleep(100).then(()=>{
          $(this).attr('src', 'closefolder.png');
          $("#essayText").addClass("active");
          $("#closeButton").on("click", function(){
            $(essayText).removeClass("active");
            sleep(100).then(()=>{
              $("#f4").attr('src', 'folder.png');
              $("#f4").css("height", "160px")
              $("#f4").css("width", "170px")
            })
          })
        })

      }
      
    })

let dialogueStep = 0;
let canProgress = true; // flag to control spacebar progression

document.body.onkeyup = function (e) {
    if ((e.key === " " || e.code === "Space" || e.keyCode === 32) && canProgress) {
        canProgress = false; // lock progression
        dialogueStep++;

        switch (dialogueStep) {
            case 1:
                $("#yapper").text("Mari").css("color", "#800080");
                $("#textContent").text("Alright, I've organized our research three folders. Let's take a look at what we've found! If you're a lazy bum and don't feel like reading, you can just move on :D!(click on space TWICE when done)");
                break;
            case 2:
                break;
            case 3:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("Hnm... alright, so K-pop's treatment is completely unwarrented then?.");
                break;
            case 4:
              $("#yapper").text("Mari").css("color", "#800080");
                $("#textContent").text("Yup! K-pop's discrimination doesn't make sense. Fans like us have the same passion as sports fans, but the media tends to choose to depict us as immature, while sports fans get the benefit of the doubt.");
                break;
            case 5:
              $("#yapper").text("Aubrey").css("color", "#1F51FF");
              $("#textContent").text("Wow. This issue really reflects on the rest of society, don't you think? If we can't even tell the difference between us and the people we're making fun of, how are we supposed to group together to solve bigger problems?");
              break;
            case 6:
              $("#yapper").text("Mari").css("color", "#800080");
              $("#textContent").text("Exactly. As a society, we need to come together. This one issue isn't just about K-pop and sports, this reflects on our entire species.");
              break;
            case 7:
              $("#yapper").text("Aubrey").css("color", "#1F51FF");
              $("#textContent").text("Yup. Learning that fandom is fandom, and taht all fans deserve this respect, can help us solve other issues as well.");
              break;
            case 8:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("Great! This all looks good... but now what?");
                break;
            case 9:
                $("#yapper").text("Mari").css("color", "#800080");
                $("#textContent").text("...");
                break;
            case 10:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("Hmm...");
                break;
            case 11:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("I got it! We've gotta get this out there somehow..");
                break;
            case 12:
                $("#yapper").text("Aubrey").css("color", "#1F51FF");
                $("#textContent").text("What about a video game?");
                sleep(3000).then(() => {
                    $("#whiteOverlay").animate({ opacity: "1" });
                    sleep(1000).then(()=>{
                      document.body.addEventListener("keydown", function (e) {
                        if (e.key.toLowerCase() === "r") {
                          window.location.href = "index.html";
                        }
                      });
                    })
                });
                break;
        }

        // Set delay before allowing next step (e.g., 2 seconds)
        setTimeout(() => {
            canProgress = true;
        }, 750); // adjust the delay time to match your desired pacing
    }
};
});
