function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
console.log(getRandomInt(3));
// Expected output: 0, 1 or 2
  

import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

var boxDist = 200; //distance between the boxes
var squareWidth = 250;
var bufferFix = 400;
var bufferFixWidWin = 0; //50
var bufferFixHeiWin = 200; //150

var PlayerLevel =[20, 50, 80];
var usedLevels = [null, null, null];

//left box
var leftBoxStartX =
  (window.innerWidth - bufferFixWidWin) / 2 - squareWidth / 2 - boxDist;
var leftBoxStartY = (window.innerHeight - bufferFix) / 2 - squareWidth / 2;

//right box
var rightBoxStartX =
  (window.innerWidth - bufferFixWidWin) / 2 - squareWidth / 2 + boxDist;
var rightBoxStartY = (window.innerHeight - bufferFix) / 2 - squareWidth / 2;

export const DrawBlame = ({ choice, correct }) => {
  var leftChoice;
  var rightChoice;
  var rightColour;
  var leftColour;
  var leftText;
  var rightText;
  var PlayerChoice; 


  var randomLevel = getRandomInt(3);

  if (PlayerLevel[randomLevel] in usedLevels) {
    randomLevel = getRandomInt(3); 
  } else {
  var randomLevelChoice = PlayerLevel[randomLevel];
  }

  usedLevels[randomLevel] = randomLevelChoice; 

  var PlayerChoice; 

  var PlayerCorrect;

  if (this.state.dotDiffLeft > this.state.dotDiffRight && PlayerChoice === "left") {
    PlayerCorrect = 1;
  } else if (
    this.state.dotDiffLeft < this.state.dotDiffRight &&
    PlayerChoice === "right"
  ) {
    PlayerCorrect = 1;
  } else {
    PlayerCorrect = 0;
  }


if (correct === 1 && PlayerCorrect === 1) {
  text = (
    <div>
      You both got it right. 
      <br />
      + 1 Point
    </div>
  )
} else if (correct === 0 && PlayerCorrect === 0) {
  text = (
    <div>
      You both got it wrong.
      <br />
      0 Points
    </div>
  )
}

  if (choice === "left" && correct === 1) {
    leftChoice = 10;
    leftColour = "green";
    rightChoice = 2.5;
    rightColour = "white";
    leftText = "Correct!";
    rightText = "";
  } else if (choice === "right" && correct === 1) {
    leftChoice = 2.5;
    leftColour = "white";
    rightChoice = 10;
    rightColour = "green";
    leftText = "";
    rightText = "Correct!";
  } else if (choice === "left" && correct === 0) {
    leftChoice = 10;
    leftColour = "red";
    rightChoice = 2.5;
    rightColour = "white";
    leftText = "Incorrect!";
    rightText = "This was the correct choice.";
  } else if (choice === "right" && correct === 0) {
    leftChoice = 2.5;
    leftColour = "white";
    rightChoice = 10;
    rightColour = "red";
    rightText = "Incorrect!";
    leftText = "This was the correct choice.";
  } else {
    leftChoice = 2.5;
    rightChoice = 2.5;
    leftColour = "white";
    rightColour = "white";
    leftText = "";
    rightText = "";
  }

  const [leftBoxState] = React.useState(leftChoice);
  const [rightBoxState] = React.useState(rightChoice);

  return (
    <Stage
      width={window.innerWidth - bufferFixWidWin}
      height={window.innerHeight - bufferFixHeiWin}
    >
      <Layer>
        <Rect
          x={leftBoxStartX}
          y={leftBoxStartY}
          width={squareWidth}
          height={squareWidth}
          fill="black"
          strokeWidth={leftBoxState} // border width
          stroke={leftColour} // border color
        />
        <Rect
          x={rightBoxStartX}
          y={rightBoxStartY}
          width={squareWidth}
          height={squareWidth}
          fill="black"
          strokeWidth={rightBoxState} // border width
          stroke={rightColour} // border color
        />
        <Text
          fill="white"
          x={leftBoxStartX}
          y={leftBoxStartY - 50}
          text={leftText}
          fontSize={18}
          fontFamily="Courier New"
        />
        <Text
          fill="white"
          x={rightBoxStartX}
          y={rightBoxStartY - 50}
          text={rightText}
          fontSize={18}
          fontFamily="Courier New"
        />

        <Text
          fill="white"
          x={window.innerWidth / 2 - boxDist / 4 - squareWidth / 2}
          y={window.innerHeight / 2 - squareWidth / 8}
          text="Press the [SPACEBAR] to continue"
          fontSize={18}
          fontFamily="Courier New"
        />
      </Layer>
    </Stage>
  );
};
