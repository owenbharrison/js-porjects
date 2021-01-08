var camW = 640;
var camH = 480;
var video = document.getElementById("video");
video.width = camW;
video.height = camH;

var allDetectedFaces = [];

var webcamParams = {video: {mandatory: {maxWidth: camW, maxHeight: camH, minWidth: camW, minHeight: camH}}};
var webcamMgr = new WebCamManager({webcamParams: webcamParams, testVideoMode: false, videoTag: video});
var faceDetector = new FaceDetector({video: webcamMgr.getVideoTag(), lipLeftRight: false, lipUpsideDown: false});

webcamMgr.setOnGetUserMediaCallback(()=>{
  faceDetector.startDetecting();
});

faceDetector.setOnFaceUpdatedCallback(df=>{
  var arr = [];
  df.forEach(f=>{
    var face = {};
    face.x = f.x*width;
    face.y = f.y*height;
    face.width = f.width*width;
    face.height = f.height*height;
    arr.push(face);
  });
  allDetectedFaces = arr;
});
webcamMgr.startCamera();
