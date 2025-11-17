import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import ControlButtons from './components/controlButtons';
import PlayBackButtons from './components/playBackButtons';
import StrudelContainer from './components/strudelContainer';
import TextField from './components/textField';
import SaveLoadButtons from './components/SaveLoadButtons';
import Graph from './components/Graph'
import StrudelLogo from './StrudelLogo.png';
import * as d3 from 'd3'

// Import utilities
import { processSong } from './utils/processSong';
import { defaultControls } from './constants/defaultControls';

export let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

const hasRun = useRef(false);
const [songText, setSongText] = useState(stranger_tune);//tunes.js
const [controls, setControls] = useState(defaultControls);//Import controls from constant file
const [isPlaying, setIsPlaying] = useState(false);//Check if playing.
const [tempVolume, setTempVolume] = useState(controls.volume ?? 1);//Default volume

useEffect(() => {
    setTempVolume(controls.volume ?? 1);
}, [controls.volume]);

const setAppStateLoad = (updateVar) => {
    const prev = { songText, controls };
    const next = updateVar(prev)
    if ('songText' in next) setSongText(next.songText);
    if ('controls' in next) setControls(next.controls);

    //Store next values for before sending to strudel console
    const nextSong = 'songText' in next ? next.songText : songText;
    const nextControls = 'controls' in next ? next.controls : controls;

    //Plays the changes made on load immediately
    globalEditor.setCode(processSong(nextSong, nextControls));
    globalEditor.evaluate();

};

const setAppStateReset = (nextObj) => {
    if ("songText" in nextObj) setSongText(nextObj.songText);
    if ("controls" in nextObj) setControls(nextObj.controls);

    //Store default values
    const nextSong = "songText" in nextObj ? nextObj.songText : songText;
    const nextControls = "controls" in nextObj ? nextObj.controls : controls;

    //Plays the changes made on reset immediately
    globalEditor.setCode(processSong(nextSong, nextControls));
    globalEditor.evaluate();
}

//Only replace the control that has changed by keeping the previous value
const setControl = (key, value) => {
    setControls(prev => {
        const next = { ...prev, [key]: value };
        globalEditor.setCode(processSong(songText, next));
        if (isPlaying) {            
            globalEditor.evaluate();
        }                       
        return next;
    });
};

//Play/Stop button functions
const playButton = () => {
    globalEditor.evaluate();
    setIsPlaying(true);
};

const stopButton = () => {
    globalEditor.stop();
    setIsPlaying(false);
};

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
        globalEditor.setCode(processSong(songText, controls));
    }
    globalEditor.setCode(processSong(songText, controls));
}, [songText, controls]);


return (
    <div>

        <div
            className="row justify-content-center py-4"
            style={{ backgroundColor: '#f0d8bd' }}
        >
            <div className="col-10">

                <img classname="mb-5" src={StrudelLogo} alt="Strudel Demo Logo" 
                style={{ width: '200px', display: 'block', margin: '0 auto' }}/>

                <main style={{ backgroundColor: '#f7e8d8', padding: '20px', borderRadius: '10px' }}> 
                    
                    <div className="container">
                        <div className='row'>
                            <div className='col-7'>
                                <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                    {/*Text Field*/}
                                    {/*<TextField defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>*/}
                                    <Graph/>
                                </div>
                                <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                    {/*Strudel container*/}
                                    <StrudelContainer />
                                </div>
                            </div>
                            <div className='col-5'>
                                <div>
                                    {/*Play/Stop/Preprocess/Proc&Play*/}
                                    <PlayBackButtons onPlay={playButton} onStop={stopButton}>
                                        <SaveLoadButtons
                                            appState={{
                                                songText,
                                                controls,
                                                defaultSongText: stranger_tune,
                                                defaultControls: {
                                                    bpm: 140,
                                                    bassLine: "on",
                                                    bassLpf: 700,
                                                    mainArp: "on",
                                                    mainArpLpf: 300,
                                                    mainArpRoom: 0.6,
                                                    mainArpLpenv: 3.3,
                                                    drums1: "on",
                                                    drums1Kick: 0.25,
                                                    drums2: "on",
                                                    drums2Hpf: 1000,
                                                    volume: 1
                                                },
                                            }}
                                            setAppStateLoad={setAppStateLoad}
                                            setAppStateReset={setAppStateReset}
                                        />
                                    </PlayBackButtons> 
                                </div>

                                <div className="card mt-2">
                                <div className="card-body">
                                    <label htmlFor="volumeControl" className="form-label">
                                    Volume
                                    </label>
                                    <input
                                    type="range"
                                    className="form-range"
                                    id="volumeControl"
                                    min="0"
                                    max="2"
                                    step="0.01"
                                    value={tempVolume}
                                    onChange={(e) => setTempVolume(parseFloat(e.target.value))}
                                    onMouseUp={() => setControl("volume", tempVolume)}
                                    />
                                    <div className="small text-muted">
                                    Current: {(controls.volume ?? 1).toFixed(2)}
                                    </div>
                                </div>
                                </div>

                                <div className='mt-2'>
                                    {/*On and Hush Buttons*/}
                                    <ControlButtons
                                        controls={controls}
                                        onChangeMode={(key, value) => { setControl(key, value)}}
                                    />
                                </div>
                            </div>
                        </div>
                        <canvas id="roll" style={{ display: 'none' }}></canvas> 
                    </div>

                </main>
            </div>
        </div>

    </div>
);


}