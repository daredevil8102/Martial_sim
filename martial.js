let d = document.getElementById("canvas");
let x = d.getContext("2d");

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6],
};

let loadImage = (src, callback) => {
  let imgx = document.createElement("img");
  imgx.onload = () => callback(imgx);
  imgx.src = src;
};

let imagePath = (frame, animation) => {
  return "images/" + animation + "/" + frame + ".png";
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    forward: [],
    block: [],
  };
  let imagesToLoad = 0;
  let action = Object.keys(images);
  action.forEach((animation) => {
    let animationFrames = frames[animation];
    
    

    imagesToLoad = imagesToLoad + animationFrames.length;

    animationFrames.forEach((frame) => {
      let path = imagePath(frame, animation);

      loadImage(path, (image) => {
        imagesToLoad = imagesToLoad - 1;
        images[animation][frame - 1] = image;
        if (imagesToLoad === 0) callback(images);
});});
  });};

let animate = (x, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      x.clearRect(0, 0, 500, 500);
      x.drawImage(image, 0, 0, 500, 500);
    }, index * 100);});
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let que = [];
  let recur = () => {
    let anim;
    if (que.length !== 0) {
      anim = que.shift();} else {
      anim = "idle";}
    animate(x, images, anim, recur);
  };

  document.getElementById("kick").onclick = () => {
    que.push("kick");};
document.getElementById("punch").onclick = () => {
    que.push("punch");
};
document.getElementById("forward").onclick = () => {
    que.push("forward");
  };
 document.getElementById("backward").onclick = () => {
    que.push("backward");
  };
    document.getElementById("block").onclick = () => {
    que.push("block");
  };
document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowUp") {
      que.push("kick");
    } else if (key === "ArrowDown") 
    {
      que.push("punch");
    } else if (key === "ArrowRight")
     {
      que.push("forward");
    } else if (key === "ArrowLeft") 
    {
      que.push("backward");
    } else if (key === " ") 
    {
      que.push("block");
    }
  });

  recur();
});