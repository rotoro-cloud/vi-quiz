var rows = 9;
var cell_height = 100;
var cell_width = 90;

var icon_height = 50;
var icon_width = 50;

var Range = ace.require('ace/range').Range;

var app = angular.module('myApp', [
  'ngSanitize',
  'ng-showdown'
]);
app.controller('myCtrl', ['$scope', '$sce', '$timeout', '$location', '$showdown', function($scope, $sce, $timeout, $location, $showdownProvider) {
    $showdownProvider.setOption('tables', true);

    $scope.jsonData = []
    $scope.correct_answer = false;
    $scope.question_state = "light-blue darken-4"
    $scope.showSolutionFlag = false;
    $scope.lastQuestion = false;
    $scope.submittedAnswer = false;


    /*---------------------------------------------
    FUNCTION STAGE QUESTION
    ---------------------------------------------*/
    var stageQuestion = function(){
        //$('.tabs').tabs();

        if($scope.current_question.stage_file){
            $.getScript( "static/files/" + $scope.current_question.stage_file)
                .done(function( script, textStatus ) {
                    $('#editor').val(script)
                    editor = vi(document.querySelector('#editor'), {
                        onSave: onSave,
                        onExit: onExit
                    });
                    editor.cursortoxy(0,0)
                    $scope.$apply();
                })
                .fail(function( jqxhr, settings, exception ) {
                    console.error(exception);
                });
        }

        if($scope.current_question.test.type == "mode"){
            testMode($scope.current_question.test.mode)
        }else if($scope.current_question.test.type == "text"){
            testContent($scope.current_question.test.content)
        }else if($scope.current_question.test.type == "textsave"){
            saved = false;
            testContentSave($scope.current_question.test.content)
        }
        else if($scope.current_question.test.type == "file"){
            $.getScript( "static/files/" + $scope.current_question.test.solution_file)
                .done(function( script, textStatus ) {
                    testContent(script)
                })
                .fail(function( jqxhr, settings, exception ) {
                    console.error(exception);
                });
        }else if($scope.current_question.test.type == "cursor"){
            testCursor($scope.current_question.test.position)
        }
    }

    var timer_cancel;
    var testCursor = function(cursorPosition){
        timer_cancel= $timeout(function(){
            console.log(editor.cursor())
            if(cursorPosition.x == editor.cursor().x && cursorPosition.y == editor.cursor().y){
                console.log("Cursor position set")
                celebrate()
                $scope.nextQuestion()
            }else{
                console.log("Cursor position not set. trying again")
                testCursor(cursorPosition)
            }
        }, 500)
    }

    var testMode = function(requiredMode){
        timer_cancel= $timeout(function(){
            if(requiredMode == editor.mode()){
                console.log("Correct mode set")
                celebrate()
                $scope.nextQuestion()
            }else{
                console.log("Mode not set. trying again")
                testMode(requiredMode)
            }
        }, 500)
    }

    var testContent = function(requiredText){
        timer_cancel= $timeout(function(){
            if(requiredText.trim() == editor.freeze().trim().replace(/&lt;/g,"<")){
                console.log("Correct text set")
                celebrate()
                $scope.nextQuestion()
            }else{
                console.log("Text not set. trying again")
                testContent(requiredText)
            }
        }, 500)
    }

    var testContentSave = function(requiredText){
        timer_cancel= $timeout(function(){
            if(requiredText.trim() == editor.freeze().trim().replace(/&lt;/g,"<") && saved){
                console.log("Correct text set")
                celebrate()
                $scope.nextQuestion()
            }else{
                console.log("Text not set. trying again")
                saved = false;
                testContentSave(requiredText)
            }
        }, 500)
    }

    var typeWriter = function() {
        if (i < txt.length) {
            document.getElementById("demo").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    /*---------------------------------------------
    FUNCTION SUBMIT SOLUTION and CHECK ANSWER
    ---------------------------------------------*/
    $scope.submitSolution = function(){

    }
	
	
	
//////
    const colors = [ "DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson" ];
    const mp = 180;

    const celebrate = () => {

        let particles = [];
        let ratio = window.devicePixelRatio;
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');
        let W = window.innerWidth* ratio;
        let H = window.innerHeight* ratio;

        c.width = W;
        c.height = H;
        c.style.position = 'absolute';
        c.style.left = '0px';
        c.style.top = '0px';
        c.style.pointerEvents = 'none';
        c.style.zIndex = 9999; 

        document.body.appendChild(c);

        for(var i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * W,
                y: 1,
                r: Math.random() * 15 + 1,
                d: Math.random() * mp,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 5) -5,
                fade: .03,
                opacity: 1,
                angle: 0
            });
        }

        render(particles, ctx, W, H);
        setTimeout(() => document.body.removeChild(c), 5000);
    }

    const render = (particles, ctx, W, H) => {
        requestAnimationFrame(() => render(particles, ctx, W, H));
        ctx.clearRect(0, 0, W, H);

        particles.forEach((p, i) => {

            p.angle += 0.01;
            p.x += Math.sin(p.angle) * 2;
            p.y += Math.cos(p.angle * p.d) + 0.004 + p.r / 2;

            if(p.x > W +5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0)
                {
                    particles[i] = {
                        x: Math.random() * W,
                        y: -10,
                        r: p.r,
                        d: p.d,
                        color: p.color,
                        tilt: p.tilt
                    };
                } else {
                        particles[i] = {
                        x: W + 5,
                        y: Math.random() * H,
                        r: p.r,
                        d: p.d,
                        color: p.color,
                        tilt: p.tilt
                    };
                }
            }
            p.opacity -= 0.001;

            if(p.opacity < 0 || p.radius < 0) return;

            ctx.beginPath();
            ctx.globalAlpha = p.opacity;
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.tilt + p.r / 2, p.y + p.tilt);
            ctx.stroke();
        });

        return ctx;
    }
//////




    /*---------------------------------------------
    FUNCTION LOAD QUESTION
    ---------------------------------------------*/
    var loadQuestion = function(){
        $timeout.cancel(timer_cancel);

        if($scope.lastQuestion){
            $scope.correct_answer = true;
            return;
        }

        $scope.current_question = questions[$scope.current_question_number]
        $scope.current_question.question = $scope.current_question.question
        $scope.current_question.subText = $scope.current_question.subText
        $scope.correct_answer = false;

        $scope.question_state = "light-blue darken-4"
        if($scope.current_question_number >= (questions.length - 1))$scope.lastQuestion = true
        else $scope.lastQuestion = false

        $timeout(function(){
          stageQuestion();
        }, 500)

    }

    $scope.nextQuestion = function(){
        $scope.current_question_number += 1
        loadQuestion()
    }

    $scope.previousQuestion = function(){
        $scope.current_question_number -= 1
        loadQuestion()
    }

    $scope.showSolution = function(){
        $scope.showSolutionFlag = !$scope.showSolutionFlag
    }

    $scope.resetAnswer = function(){
        $timeout.cancel(timer_cancel);
        stageQuestion()
    }

    $scope.showHintFlag = false
    $scope.showHint = function(){
      $scope.showHintFlag = !$scope.showHintFlag

    }

    $scope.current_question_number = -1

    $scope.questions_override = $location.search();

    var questions_file = $scope.questions_override.questions || "vi_editor"

    
	$scope.feedback_url = $sce.trustAsResourceUrl("https://docs.google.com/forms/d/e/1FAIpQLSe9wIeyh0C4A7qzkvVcJUiCc_XiVpxsd2Tm8cK3-8ZX_R0GcQ/viewform?embedded=true&entry.87961767=" + questions_file);

    $.getScript( "static/" + ( questions_file + ".js"))
      .done(function( script, textStatus ) {
        $scope.questions = questions;
        $scope.$apply();
        $timeout(function(){
          $scope.nextQuestion();
        }, 100)

      })
      .fail(function( jqxhr, settings, exception ) {
        console.error(exception);
    });

    var saved = false
    var onSave = function(){
        console.log("Saved")
        saved = true
    }

    var exited = false
    var onExit = function(){
        exited = true
        console.log("Exited")
        editor = vi(document.querySelector('#editor'), {
            onSave: onSave,
            onExit: onExit
        });
    }

    var editor = vi(document.querySelector('#editor'), {
        onSave: onSave,
        onExit: onExit
    });


}]);
