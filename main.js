let video;
let objectDetector;
let objects = [];

// p5.jsの初期セットアップ関数
function setup() {
  video.elt.addEventListener("loadeddata", () => {
    // 追記

    console.log("カメラがロードされました。");
    // YOLOがちょっと精度低かったので cocossdの方がよさそう
    objectDetector = ml5.objectDetector("cocossd", () => {
      // 追記

      console.log("モデルがロードされました。");
    });
  });
}

function draw() {
  const flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0);
  // 追記
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
  // 追記
};

const gotResult = (error, results) => {
  // 追記
};
