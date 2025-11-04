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

export let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

//Process song and check for control settings. 
function processSong(text, controls) {
    //Song code before adding controls changes
    let output = text;

    //Check for hush control and pause <p1_Radio> section
    //const replacement = controls.drums2 === 'drums2Off' ? '_' : '';

    const switchKeys = ['mainArp', 'bassLine', 'drums1', 'drums2'];

    switchKeys.forEach(key => {
        const replacement = controls[key] === 'off' ? '_' : '';
        const placeholder = `<${key}Switch>`;
        output = output.replaceAll(placeholder, replacement);
    });
    
    output = output.replace(/{{\s*BPM\s*}}/g, String(controls.bpm ?? 120));
    output = output.replace(/{{\s*BASS_LPF\s*}}/g, String(controls.bassLpf ?? 700));
    output = output.replace(/{{\s*MAIN_ARP_LPF\s*}}/g, String(controls.mainArpLpf ?? 300));
    output = output.replace(/{{\s*MAIN_ARP_ROOM\s*}}/g, String(controls.mainArpRoom ?? 0.6));
    output = output.replace(/{{\s*MAIN_ARP_LPENV\s*}}/g, String(controls.mainArpLpenv ?? 3.3));

    return output;
}

export default function StrudelDemo() {

const hasRun = useRef(false);
const [songText, setSongText] = useState(stranger_tune);
const [controls, setControls] = useState({
    bpm: 140,

    bassLine: "on",
    bassLpf: 700,

    mainArp: "on",
    mainArpLpf: 300,
    mainArpRoom: 0.6,
    mainArpLpenv: 3.3,
    
    drums1: "on",

    drums2: "on",
});

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
    setControls(prev => {const next = { ...prev, [key]: value };
            globalEditor.setCode(processSong(songText, next));
            globalEditor.evaluate(); 
        return next;
    });
};

//Play/Stop button functions
const playButton = () => {
    globalEditor.evaluate();
};

const stopButton = () => {
    globalEditor.stop();
};

//Process textfield into code in the strudel textfield.
//const preprocess = () => {
//    globalEditor.setCode(processSong(songText, controls));
//};

//Proc & and play
//const procAndPlay = () => {
//    preprocess();
//    globalEditor.evaluate();
//}

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
            
        //document.getElementById('proc').value = stranger_tune
        /*SetupButtons()
        Proc() */
        globalEditor.setCode(processSong(songText, controls));
    }
    globalEditor.setCode(processSong(songText, controls));
}, [songText, controls]);


return (
    <div>
        <h2 className="text-center">Strudel Demo</h2>
        <main>

            <div className="container">
                <div className='row'>
                    <div className='col-7'>
                        <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            {/*Text Field*/}
                            <TextField defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
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
                                drums2: "on",
                                },
                            }}
                            setAppStateLoad={setAppStateLoad}
                            setAppStateReset={setAppStateReset}
                            />
                            </PlayBackButtons> 
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
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}