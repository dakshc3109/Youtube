var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();

function start(){
    document.getElementById("textBox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event){
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textBox").innerHTML = content;
    if(content == "take my selfie"){
        console.log("taking selfie");
        speak();
    }
}

function speak(){
    var syth = window.speechSynthesis;
    var speech_data = "The Website Is Going To Take Your Selfie In 5 Seconds, Please Wait!"
    var utter_this = new SpeechSynthesisUtterance(speech_data);
    syth.speak(utter_this);
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    },5000)
}

var camera = document.getElementById("camera");

Webcam.set({
    width: 350,
    height: 250,
    image_format: "jpeg",
    jpeg_quality: 90
});

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='selfie_img' src='"+data_uri+"'>";
    });
}
function save(){
    var link = document.getElementById("link");
    var image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}