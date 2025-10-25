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

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

/* export function SetupButtons() {

    //document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    //document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    document.getElementById('process').addEventListener('click', () => {
        Proc()
    }
    )
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor != null) {
            Proc()
            globalEditor.evaluate()
        }
    }
    )
} */



/* export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started == true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
} */

/* export function Proc() {

    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced)
} */

/* export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
} */

//Process song and check for control settings. 
function processSong(songText, mode) {
    const replace = mode === 'HUSH' ? '_' : '';
    return songText.replaceAll('<p1_Radio>', replace);
}

export default function StrudelDemo() {

const hasRun = useRef(false);

//Play/Stop button functions
const playButton = () => {
    globalEditor.evaluate();
};

const stopButton = () => {
    globalEditor.stop();
};

const [songText, setSongText] = useState(stranger_tune);
const [mode, setMode] = useState('on');

//Process textfield into code in the strudel textfield.
const preprocess = () => {
    const processing = processSong(songText, mode);
    globalEditor.setCode(processing);
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
            
        document.getElementById('proc').value = stranger_tune
/*         SetupButtons()
        Proc() */
    }
    globalEditor.setCode(songText);
}, [songText]);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        {/*Text Field*/}
                        <TextField defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        {/*Play/Stop/Preprocess/Proc&Play*/}
                        <PlayBackButtons onPlay={playButton} onStop={stopButton} onProc={preprocess}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        {/*Strudel container*/}
                        <StrudelContainer />
                    </div>
                    <div className="col-md-4">
                        {/*On and Hush Buttons*/}
                        <ControlButtons />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}