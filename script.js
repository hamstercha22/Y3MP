const video = document.getElementById('video')

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);



Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(startVideo)

async function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  );
}

var name
var date

video.addEventListener('play', async () => {
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5)

  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)

  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  setInterval(async () => {
    
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks().withFaceExpressions().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)

      name = results.map( a=> a.label).toString()
      date = new Date();
      logData()

    // localStorage.setItem('result', JSON.stringify(result));

      console.log(new Date());
      // console.log('test');
  })
  }, 100)

})

function loadLabeledImages() {
  const labels = ['Rachel', 'Reyann', 'Raelene']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/hamstercha22/MP-Project/master/labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}

console.log(Date());



function logData(){
// $.ajax({
//   type: "POST",
//   url: 'log.php',
//   data:{ name : 'name'},
//   success: function(data)
//   {
//       alert("success!");
//   }
// })

$.ajax({
  traditional: true,
  url: 'log.php',
  type: "POST",
  data:{'name': name},
  dataType: "json"
});
// window.location.replace("log.php")



}

function log(){
  console.log(name);
  console.log(new Date());
}