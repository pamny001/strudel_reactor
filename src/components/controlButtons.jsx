//import { ProcAndPlay } from "../App";

function ControlButtons( {mode = "on", onChangeMode} ) {
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
        </>
    );
}

export default ControlButtons;