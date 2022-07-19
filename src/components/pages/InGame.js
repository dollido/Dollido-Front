import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

import LoadGIF from "./Giftest";
import MyVideo, { stopWebcam } from "./MyVideo";
import Button from "../common/Button.js";
import { Background } from "../common/Background.tsx"
import BestPerformer from './BestPerformer';
import { useInterval } from '../common/usefulFuntions';

import mainBackground from '../../images/main_background.png';


/** 1초 줄어든 시간을 리턴 */
function decreaseOneSec(minutes, seconds) {
    if (seconds === 0) {
        seconds = 59;
        minutes -= 1;
    } else {
        seconds -= 1;
    }
    return [minutes, seconds];
}

function handleGameStart() {
    console.log("Game Start");
}

function Player(props) {
    return <div style={{ backgroundColor: 'moccasin', margin:'0px 0 20px 0' }}>
        <h2 style={{ color: 'gray' }}>{props.playerId}</h2>
        <video autoPlay height={300} style={{ backgroundColor: 'white', width: "100%" }}></video>
        <h2>HP : 100</h2>
    </div>
}

function ChattingWindow(props) {
    return <div>
        <h1>Chatting Window Here</h1>
    </div>
}

function GifWindow(props) {
    return  <div>
        <h1>GIF Here</h1>
        <LoadGIF></LoadGIF>
    </div>
}


function Timer(props) {
    const gameMinutes = 1;
    const gameSeconds = 30;
    const [remainTime, setTimer] = useState([gameMinutes, gameSeconds]);
    const [minutes, seconds] = remainTime;

    let delay = 1000;
    let insertZero = '';
    let content = '';

    if (minutes === 0 && seconds === 0) { // 종료 조건
        content = <h1> Game Over! </h1>
        delay = null; // clear useInterval
    } else {
        if (seconds < 10) insertZero = '0';
        content = <h1> {'0' + remainTime[0] + ":" + insertZero + remainTime[1]} </h1>
    }

    useInterval(() => {
        setTimer(decreaseOneSec(remainTime[0], remainTime[1]));
    }, delay);

    return content;
}

const InGame = () => {

    const [gameStarted, setGameStart] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const padding = 0;

    useEffect(()=>stopWebcam, []); // InGame 페이지 unmount 됐을 때 카메라 종료

    /** CSS */
    const hColumnStyle = {
        width: "25%",
        float: "left",
        height: 80,
        padding: padding,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const hMiddleStyle = {
        width: "50%",
        float: "left",
        height: 80,
        padding: padding,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFCC',
    }

    const columnStyle = {
        width: "25%",
        float: "left",
        height: 700,
        padding: padding,
        textAlign: 'center'
    }

    const middleStyle = {
        width: "50%",
        float: "left",
        height: 730,
        padding: padding,
        backgroundColor: '#FFC19E   ',
        textAlign: 'center'
    }

    function handleStart(event) {
        setGameStart(!gameStarted);
        handleGameStart();
    }

    function handleFinish() {
        console.log("Game Finished");
        setGameFinished(true);
    }

    return (
        <ThemeProvider
            theme={{
                palette: {
                    yellow: "#E5B941"
                }
            }}>
            <Background
                background={mainBackground}
                element={
                    <div>
                        <header style={{ backgroundColor: 'white', height: 80 }}>
                            <div>
                                <div className="left" style={hColumnStyle}>
                                    <h1> Room Name </h1>
                                </div>
                                <div className="middle" style={hMiddleStyle}>
                                    {!gameStarted ? <h1>DOLLIDO</h1> : <Timer></Timer>}
                                </div>
                                <div className="right" style={hColumnStyle}>
                                    <h1> Mode </h1>
                                </div>
                            </div>
                        </header>
                        <div className="left" style={columnStyle}>
                            <MyVideo playerId={'SalmonSushi'}></MyVideo>
                            <Player playerId={'DongDongBro'}></Player>
                        </div>
                        <div className="middle" style={middleStyle}>
                            {gameStarted ?
                                gameFinished ?
                                    <BestPerformer></BestPerformer> :
                                    <GifWindow></GifWindow> :
                                <ChattingWindow></ChattingWindow>}
                        </div>
                        <div className="right" style={columnStyle}>
                            <Player playerId={'EleShock'}></Player>
                            <Player playerId={'BonJukLove'}></Player>
                        </div>
                    </div>
                }>
            </Background>
            <Button color="yellow" size="large" style={{ position: "absolute", top: "88%", left: "33%" }} onClick={handleStart}>
                START
            </Button>
            <Link to="/">
                <Button color="yellow" size="large" style={{ position: "absolute", top: "88%", left: "55%" }}>
                    QUIT
                </Button>
            </Link>
            <Button color="yellow" size="large" style={{ position: "absolute", top: "88%", left: "70%" }} onClick={handleFinish}>
                FINISH GAME
            </Button>
        </ThemeProvider>
    );
};

export default InGame;