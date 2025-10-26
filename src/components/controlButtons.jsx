//import { ProcAndPlay } from "../App";
import {useState} from "react";

function ControlButtons( {drums2 = "on", bpm = 120, onChangeMode, onChangeBpm} ) {
    const [tempBpm, setTempBpm] = useState(bpm);
    return (
        <>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={drums2 === "on"} onChange={(e) => onChangeMode?.(e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">
                    Drums 2
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