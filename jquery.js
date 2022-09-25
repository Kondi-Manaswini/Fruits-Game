var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ['Apple', 'Banana', 'Mango', 'Strawberry', 'WaterMelon'];

$(function () {

    $("#startreset").click(function () {
        if (playing == true) {
            location.reload();
        }
        else {
            playing = true;
            score = 0;
            $("#scorevalue").html(score);

            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();

            $("#gameOver").hide();

            $("#startreset").html("Reset Game");

            startAction();
        }
    });


    //slice a fruit
    $("#fruit1").mouseover(function () {

        score++;
        $("#scorevalue").html(score);

        $("#slicesound")[0].play();

        clearInterval(action);

        $("#fruit1").hide("explode", 500);

        setTimeout(startAction, 800);
    });


    //fill trialLeft box with hearts
    function addHearts() {

        $("#trialsLeft").empty();
        for (i = 0; i < trialsLeft; i++) {
            $("#trialsLeft").append('<img src="images/Life.png" class="life">');
        }
    }

    //start sending fruits
    function startAction() {

        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });

        step = 1 + Math.round(5 * Math.random());

        action = setInterval(function () {

            $("#fruit1").css('top', $("#fruit1").position().top + step);

            if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
                if (trialsLeft > 1) {
                    $("#fruit1").show();
                    chooseFruit();

                    $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });

                    step = 1 + Math.round(5 * Math.random());

                    trialsLeft--;
                    addHearts();
                }
                else {
                    playing = false;
                    $("#startreset").html("Start Game");
                    $("#gameOver").show();
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 10);
    }

    // generate a random fruit
    function chooseFruit() {
        $("#fruit1").attr('src', 'images/fruits/' + fruits[Math.round(4 * Math.random())] + '.png');
    }

    //Stop dropping fruits
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }
});