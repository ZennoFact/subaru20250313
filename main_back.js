let video;
let objectDetector;
let objects = [];

// p5.jsの初期セットアップ関数
function setup() {
  createCanvas(640, 480);

  video = createCapture({
    audio: false,
    video: {
      facingMode: "environment",
    },
  });
  video.size(width, height);
  video.hide();

  video.elt.addEventListener("loadeddata", () => {
    console.log("カメラがロードされました。");
    // YOLOがちょっと精度低かったので cocossdの方がよさそう
    objectDetector = ml5.objectDetector("cocossd", () => {
      console.log("モデルがロードされました。");
      detect();
    });
  });
}

function draw() {
  const flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0);
  objects.forEach((object) => drawResult(object));
}

function drawResult(object) {
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);

  // 反転後の座標系に合わせて矩形を描画
  const x = width - object.x - object.width; // x座標を反転
  const y = object.y; // y座標はそのまま

  rect(x, y, object.width, object.height);
  fill(0, 255, 0);
  stroke(0);
  textSize(16);
  text(`${object.label} ${object.confidence.toFixed(2)}`, x + 10, y + 20);
}

const detect = () => {
  objectDetector.detect(video, gotResult);
};

const gotResult = (error, results) => {
  if (error) {
    console.error(error);
    return;
  }

  objects = results;
  detect();
};
