const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const processBtn = document.getElementById('process');
const processContainer = document.getElementById('process-container');
const fileInput = document.getElementById('fileInput');
const errorMsgElement = document.getElementById('span#ErrorMsg');

const constraints = {
    audio: false,
    video: {
        width: 640, height: 480
    }
};

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error:${e.toString()}`;
    }
}

function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

init();

var context = canvas.getContext('2d');

snap.addEventListener("click", function () {
    context.drawImage(video, 0, 0, 640, 480);
    video.srcObject.getTracks().forEach(track => track.stop());
    video.style.display = "none";
    snap.style.display = "none";
    processContainer.style.display = "block";
});

processBtn.addEventListener("click", function () {
    // Process the captured image here
    // For demonstration purposes, you can simply alert
    alert("Image processing goes here!");
});

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0, 640, 480);
                // Stop the video stream and hide the video element
                video.srcObject.getTracks().forEach(track => track.stop());
                video.style.display = "none";
                // Hide the capture button
                snap.style.display = "none";
                // Show the process button container
                // processContainer.style.display = "block";
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
        // Disable the capture button
        snap.disabled = true;
    }
});
