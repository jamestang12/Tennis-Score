import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [p1Score, setP1] = useState(0);
  const [p2Score, setP2] = useState(0);
  const [p1DisplayScore, setDisplayP1] = useState(0);
  const [p2DisplayScore, setDisplayP2] = useState(0);
  const [result, setResult] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      async function fetchData() {
        const value = await axios.get("/api/game/5ff395ad653be0020cfdc998");
        const data = value.data.data;
        setP1(parseInt(data.p1Score));
        setP1(parseInt(data.p2Score));
        setDisplayP1(parseInt(data.p1DisplayScore));
        setDisplayP2(parseInt(data.p2DisplayScore));
        setResult(parseInt(data.result));
        setLoading(false);
      }
      fetchData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [setLoading]);

  const resetGame = async () => {
    setP1(0);
    setP2(0);
    setDisplayP1(0);
    setDisplayP2(0);
    setResult(3);

    try {
      const result = await axios.put("api/game/reset/5ff395ad653be0020cfdc998");

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const updateScore = async (
    p1Score,
    p2Score,
    p1DisplayScore,
    p2DisplayScore,
    result
  ) => {
    try {
      const value = await axios.put(
        "/api/game/5ff395ad653be0020cfdc998",
        {
          p1Score: p1Score,
          p2Score: p2Score,
          p1DisplayScore: p1DisplayScore,
          p2DisplayScore: p2DisplayScore,
          result: result,
        },
        config
      );
      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickP1 = () => {
    setP1(p1Score + 1);
    const point = p1Score + 1;
    let displayScore;
    let _result = 3;
    if (p1Score <= 1) {
      setDisplayP1(p1DisplayScore + 15);
      displayScore = p1DisplayScore + 15;
    } else if (p1Score >= 2 && p1Score < 3) {
      setDisplayP1(p1DisplayScore + 10);
      displayScore = p1DisplayScore + 10;
    } else if (p1Score === 3) {
      setDisplayP1(1);
    } else {
      setDisplayP1(p1DisplayScore + 1);
      displayScore = p1DisplayScore + 1;
    }
    console.log(`${point} ||${p2Score} `);
    if (point > 3 && point - p2Score >= 2) {
      setResult(1);
      _result = 1;
    }

    updateScore(point, p2Score, displayScore, p2DisplayScore, _result);
  };

  const onClickP2 = () => {
    setP2(p2Score + 1);
    const point = p2Score + 1;
    let displayScore;
    let _result = 3;
    if (p2Score <= 1) {
      setDisplayP2(p2DisplayScore + 15);
      displayScore = p2DisplayScore + 15;
    } else if (p2Score >= 2 && p2Score < 3) {
      setDisplayP2(p2DisplayScore + 10);
      displayScore = p2DisplayScore + 10;
    } else if (p2Score === 3) {
      setDisplayP2(1);
    } else {
      setDisplayP2(p2DisplayScore + 1);
      displayScore = p2DisplayScore + 1;
    }

    if (point > 3 && point - 1 - p1Score >= 2) {
      setResult(2);
      _result = 2;
    }

    updateScore(p1Score, point, p1DisplayScore, displayScore, _result);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {loading ? (
            <Typography component="h1" variant="h4" align="center">
              Loading.....
            </Typography>
          ) : (
            <div>
              <Typography component="h1" variant="h4" align="center">
                Tennis Score Keeper
              </Typography>
              <Typography component="h1" variant="h6" align="center">
                {result !== 3 ? (
                  <div>{result === 1 ? "Player 1 won" : "Player 2 won"}</div>
                ) : null}
              </Typography>

              <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                  <h2 style={{ textAlign: "center" }}>
                    Score: {p1DisplayScore}
                  </h2>
                  <h3 style={{ textAlign: "center" }}>Player 1</h3>
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    {" "}
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={() => onClickP1()}
                      disabled={result === 3 ? false : true}
                    >
                      Player 1 scored
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h2 style={{ textAlign: "center" }}>
                    Score: {p2DisplayScore}
                  </h2>
                  <h3 style={{ textAlign: "center" }}>Player 2</h3>
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    {" "}
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={() => onClickP2()}
                      disabled={result === 3 ? false : true}
                    >
                      Player 2 scored
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                {" "}
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => resetGame()}
                >
                  Reset Game
                </Button>
              </div>
            </div>
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default App;
