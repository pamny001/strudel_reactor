//import { ProcAndPlay } from "../App";
import {useState} from "react";

function ControlButtons( {mode = "on", bpm = 120, onChangeMode, onChangeBpm} ) {
    const [tempBpm, setTempBpm] = useState(bpm);
    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={mode === "on"} onChange={() => onChangeMode?.("on")} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    p1: ON
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={mode === "hush"} onChange={() => onChangeMode?.("hush")} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    p1: HUSH
                </label>
            </div>
            <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon">BPM</div>
                <input type="number" className="form-control" placeholder="Enter BPM" aria-label="BPM Input" aria-describedby="btnGroupAddon" value={tempBpm} 
                onChange={(e) => { setTempBpm(e.target.value); }} /> 
                <button type="button" className="btn btn-primary" onClick={() => { onChangeBpm?.(tempBpm)}}>Set BPM</button>
            </div>
        </>
    );
}

export default ControlButtons;