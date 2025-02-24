let capture;
let mirrorButton;
let mirror = true;


function setup() {
  background(255);
  
  createCanvas(48, 36);
  capture = createCapture(VIDEO);
  capture.size(48, 36);
  capture.hide();
  
  mirrorButton = createButton('Toggle Mirror');
  mirrorButton.position(10, 40);
  mirrorButton.mousePressed(toggleMirror);
}

function draw() {
  if (mirror) {
    translate(width, 0);
    scale(-1, 1);
  }
  
  image(capture, 0, 0, width, height);
  capture.loadPixels();

  let faceData = getFaceData(); 
  
  if (faceData) {
    let pixels = capture.get(faceData.x, faceData.y, faceData.width, faceData.height);
    pixels.loadPixels();
    
    // var tempZoom = zoom*res/24;
    var frame = [];
    var src = pixels.pixels;
  
    for (var i = 0; i < src.length; i += 4) {
      // from https://jsperf.com/convert-rgba-to-grayscale
      var pixel = (src[i] * 306 + src[i + 1] * 601 + src[i + 2] * 117) >> 10;
      var emoji = mapColorToEmoji(src[i], src[i + 1], src[i + 2]);

      frame.push("<span style='color:rgb("+src[i]+","+src[i+1]+","+src[i+2]+")'>"+ emoji +"</span>");
}


    while (viewfinder.firstChild) {
      viewfinder.removeChild(viewfinder.firstChild);
    }
    for (var r = 0; r < pixels.height; r++) {
      var lineOfString = [];
      for (var c = 0; c < pixels.width; c++) {
        lineOfString.push(frame[r*pixels.width+c]);
      }
      if (mirror) {
        lineOfString = lineOfString.reverse();
      }
      
      var line = document.createElement('p');
      line.innerHTML = lineOfString.join('');
      viewfinder.appendChild(line);
    }
   }
}


function getFaceData() {
  
  return {
    x: 0,
    y: 0,
    width: 48,
    height: 36,
  };
}

function toggleMirror() {
  mirror = !mirror;
}

function mapColorToEmoji(r, g, b) {
  // if (255 > r && r > 102 && 50 > g && g > 0 && 0 < b && b < 50) {
  // if (255 > r && r > 102 && 50 > g && g > 0 && 0 < b && b < 50) {
  //   return "🌹"; 
  // } else if (254 < r && 153 > g && g > 0 && 153 > b && b > 0 ){
  //   return "🌸";
  // } else if (255 > r && r > 102 && 0 < g && g < 50 && 0 < b && b < 50){
  //   return "🧸"; 
  // } else if (204 > r && r > 51 && 255 > g && g > 102 && 0 < b && b < 153) {
  //   return "🥝"; 
  // } else if (153 > r && r > 0 && 255 > g && g > 102 && 0 < b && b < 153) {
  //   return "🌵"; 
  // } else if (153 > r && r > 0 && 255 > g && g > 102 && 51 < b && b < 204) {
  //   return "🍈"; 
  // } else if (153 > r && r > 0 && 255 > g && g > 102 &&  255 > b && b > 102) {
  //   return "🗳️"; 
  // } else if (153 > r && r > 0 && 204 > g && g > 51 &&  255 > b && b > 102) {
  //   return "🫐"; 
  // } else if (153 > r && r > 0 && 153 > g && g > 0 &&  255 > b && b > 102) {
  //   return "🧿"; 
  // } else if (204 > r && r > 51 && 153 > g && g > 0 &&  255 > b && b > 102) {
  //   return "😈";   
  // } else if (255 > r && r > 102 && 153 > g && g > 0 &&  255 > b && b > 102) {
  //   return "🦄";
  // } else if (255 > r && r > 102 && 153 > g && g > 0 &&  204 > b && b > 51) {
  //   return "🌷"; 
  // } else if (224 > r && r > 32 && 224 > g && g > 32 &&  224 > b && b > 32 ) {
  //   return "💡";  
  // } else if (255 > r && r > 204 && 255 > g && g > 204 &&  255 > b && b > 204) {
  //   return "🤍";
  // } else {
  //   return "💎";
  // }

  if (255 > r && r > 102 && 102 > g && g > 0 && 0 < b && b < 102) {
    return "🌹"; 
  } else if (254 < r && 255 > g && g > 0 && 153 > b && b > 0 ){
    return "🌸";
  } else if (255 > r && r > 102 && 0 < g && g < 50 && 0 < b && b < 50){
    return "🧸"; 
  } else if (204 > r && r > 51 && 255 > g && g > 102 && 0 < b && b < 153) {
    return "🥝";
  } else if (255 > r && r > 102 && 153 > g && g > 0 &&  255 > b && b > 102) {
    return "🦄";
  } else if (153 > r && r > 0 && 204 > g && g > 51 &&  255 > b && b > 102) {
    return "🫐";  
  } else if (102 > r && r > 0 && 255 > g && g > 102 && 102 < b && b < 255) {
    return "🍈";     
  } else if (224 > r && r > 32 && 224 > g && g > 32 &&  224 > b && b > 32 ) {
    return "💡";  
  } else if (255 > r && r > 204 && 255 > g && g > 204 &&  255 > b && b > 204) {
    return "🤍";
  } else {
    return "💎";
 }
}
// function mapColorToEmoji(r, g, b) {
//   // red colum
//   if (r > 127 && g < 63 && b < 63) {
//     return "🥀"; 
//   } else if (r > 127 && g < 127 && b < 63) {
//     return "🎒"; 
//   } else if (r > 127 && g < 127 && b < 127) {
//     return "🍄"; 
//   } else if (r > 127 && g < 191 && b < 191) {
//     return "🎀"; 

//   // Orange colum
//   } else if (r > 127 && g > 63 && b < 63) {
//     return "🚪";  
//   } else if (r > 127 && g > 127 && b < 127) {
//     return "🧸";  
//   } else if (r > 127 && g > 191 && b < 127) {
//     return "🌅";  
//   } else if (r > 127 && g > 191 && b < 191) {
//     return "🗂️"; 

//   // Yellow
//   } else if (r > 127 && g > 127 && b < 63) {
//     return "🪝"; 
//   } else if (r > 191 && g > 191 && b < 127) {
//     return "🎗️"; 
//   } else if (r > 191 && g > 191 && b < 191) {
//     return "🧽"; 
//   } else if (r > 127 && g > 127 && b > 191) {
//     return "💡"; 

//   // 绿色
//   } else if (r < 63 && g > 127 && b < 63) {
//     return "🥦"; 
//   } else if (r > 63 && r < 191 && g > 191 && b < 63) {
//     return "🥒"; 
//   } else if (r > 63 && r < 191 && g > 191 && b > 63) {
//     return "🥝"; 
//   } else if (r < 127 && g > 127 && b < 127) {
//     return "🍈"; 

//   // 蓝绿色
//   } else if (r < 63 && g > 127 && b > 127) {
//     return "🩱"; 
//   } else if (r < 127 && g > 191 && b > 127) {
//     return "🩴"; 
//   } else if (r < 191 && g > 191 && b > 63) {
//     return "👗";

//   // 蓝色
//   } else if (r < 127 && g < 127 && b > 127) {
//     return "🧿"; 
//   } else if (r < 191 && g < 191 && b > 191) {
//     return "🫐"; 
//   } else if (r > 63 && g < 63 && b > 127) {
//     return "🦋"; 
//   } else if (r > 63 && g < 63 && b < 191) {
//     return "🗳️"; 

//   // 紫色
//   } else if (r < 191 && g < 63 && b > 127) {
//     return "👾"; 
//   } else if (r < 191 && g < 127 && b > 127) {
//     return "😈"; 
//   } else if (r < 127 && g < 127 && b > 191) {
//     return "☂️"; 
//   } else if (r < 191 && g < 191 && b > 63) {
//     return "🦄"; 

//   // 桃红色
//   } else if (r > 127 && g < 127 && b > 127) {
//     return "🎆"; 
//   } else if (r > 191 && g < 127 && b > 127) {
//     return "🍇"; 
//   } else if (r > 191 && g < 127 && b > 63) {
//     return "🌷"; 
//   } else if (r > 191 && g < 63 && b > 127) {
//     return "🌸"; 

//   // 白色、黑色和灰色
//   } else if (r > 191 && g > 191 && b > 191) {
//     return "🤍"; 
//   } else if (r < 96 && g < 96 && b < 96) {
//     return "🖤"; 
//   } else if (r > 96 && r < 192 && g > 96 && g < 192 && b > 96 && b < 192) {
//     return "🪨";
//   } else {
//     return "❓"; 
//   }
// }







