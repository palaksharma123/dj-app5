song1="";
song2="";
song1status="";
song2status="";
scoreLeftWrist="0";
scoreRightWrist="0";
status="";
leftWristX="0";
leftWristY="0";

function preload(){
 song1=loadSound("song1.mp3");
 song2=loadSound("song2.mp3");
}
function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results){
    if (results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist= "+scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
     
    }
}
function draw(){
    image(video,0,0,300,300);

    song1status="song1.isPlaying()";
    song2status="song2.isPlaying()";

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        song1.play()
        document.getElementById("status").innerHTML="Harry Potter Theme Song"
    }

if(song1status==false){
    song1.stop()
}


    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        song2.play()
        document.getElementById("status").innerHTML="Peter Pan Song"
    }

    if(song2status==false){
        song2.stop()
    }
      
}
function modelLoded(){
    console.log("modelLoded");
}
