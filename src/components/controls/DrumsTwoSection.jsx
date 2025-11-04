export default function DrumsTwoSection({ 
    controls, 
    onChangeMode 

}) {
  return (
    <div className="collapse" id="drums2Collapse">
        <div className="card card-body">
            <h5 className="text-center">Drums 2 Controls</h5>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums2 === "on"} 
                onChange={(e) => onChangeMode?.("drums2", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 2 Switch</label>
            </div>
        </div>
    </div>
  );
}
