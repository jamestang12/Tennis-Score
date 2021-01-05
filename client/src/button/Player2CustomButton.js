import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const Player1CustomButton = ({
  result,
  setResult,
  p1Score,
  p2Score,
  p1DisplayScore,
  p2DisplayScore,
  resetGame,
  updateScore,
  setP1,
  setP2,
  setDisplayP2,
  setDisplayP1,
}) => {
  const onClickP2 = async () => {
    setP2(p2Score + 1);
    // Adding Player 1 score by 1
    const point = p2Score + 1;
    let _result = 3;
    // Setting a display to take the display score since this function is async
    // so the useState call might completed after the updateScore is call than update to old score to the database
    // by using the display value to track of the display score prevent pasing old data into database
    let display = 0;
    // Check if Player is in first 2 point so it will increment by 15
    if (p2Score <= 1) {
      setDisplayP2(p2DisplayScore + 15);
      display = p2DisplayScore + 15;
      // Check if Player is in his 3 and 4 point so it will increment by 10
    } else if (p2Score >= 2 && p2Score < 3) {
      setDisplayP2(p2DisplayScore + 10);
      display = p2DisplayScore + 10;
      // Check if Player is in his 4th point so it will set it to 1
    } else if (p2Score === 3) {
      display = 1;
      setDisplayP2(1);
      // If Player is in his 4+ point so it will increment by 1
    } else {
      display = p2DisplayScore + 1;
      setDisplayP2(p2DisplayScore + 1);
    }
    // Check if is a winning point
    if (point > 3 && point - 1 - p1Score >= 2) {
      console.log("p2 won------------------------------------");
      setResult(2);
      _result = 2;
    } else if (
      (point > 3 && display - p1DisplayScore >= 2) ||
      (display == 1 && p1DisplayScore < 40)
    ) {
      setResult(2);
    }

    // Call updateScore to update to score to the database
    updateScore(p1Score, point, p1DisplayScore, display, _result);
    console.log(
      `${point} ||${p2Score}||${p1DisplayScore}|| ${display} || ${_result}  `
    );
  };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => onClickP2()}
        disabled={result === 3 ? false : true}
      >
        Player 1 scored
      </Button>
    </div>
  );
};

export default Player1CustomButton;
