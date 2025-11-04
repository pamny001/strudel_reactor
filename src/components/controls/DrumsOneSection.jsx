export default function DrumsOneSection({ 
    controls, 
    onChangeMode 

}) {
  return (
    <div className="collapse" id="drums1Collapse">
        <div className="card card-body">
            <h5 className="text-center">Drums 1 Controls</h5>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums1 === "on"} 
                onChange={(e) => onChangeMode?.("drums1", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 1 Switch</label>
            </div>
        </div>
    </div>
  );
}
