//import { ProcAndPlay } from "../App";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { set } from "@strudel/core";

//Component imports
import CollapseButtons from "./controls/CollapseButtons.jsx";
import SpeedSection from "./controls/SpeedSection.jsx";
import BassLineSection from "./controls/BassLineSection.jsx";
import MainArpSection from "./controls/MainArpSection.jsx";
import DrumsOneSection from "./controls/DrumsOneSection.jsx";
import DrumsTwoSection from "./controls/DrumsTwoSection.jsx";



function ControlButtons({ controls, onChangeMode, onChangeBpm }) {
  const [tempBpm, setTempBpm] = useState(controls.bpm);

  //Temp states for sliders
  const [tempBassLpf, setTempBassLpf] = useState(controls.bassLpf ?? 700);
  const [tempMainArpLpf, setTempMainArpLpf] = useState(controls.mainArpLpf ?? 300);
  const [tempMainArpRoom, setTempMainArpRoom] = useState(controls.mainArpRoom ?? 0.6);
  const [tempMainArpLpenv, setTempMainArpLpenv] = useState(controls.mainArpLpenv ?? 3.3);
  //Update temp states when controls change
  useEffect(() => {
    setTempBpm(controls.bpm);
    setTempBassLpf(controls.bassLpf ?? 700);
    setTempMainArpLpf(controls.mainArpLpf ?? 300);
    setTempMainArpRoom(controls.mainArpRoom ?? 0.6);
    setTempMainArpLpenv(controls.mainArpLpenv ?? 3.3);
  }, [controls]);
  //Commit changes on click release
  const commitOnRelease = (key, value) => {
    onChangeMode?.(key, value);
  };

  return (
    <>
      <CollapseButtons />

      <div className="row">
        {/* Speed Section */}
        <div className="col-12 mb-3">
          <SpeedSection
            tempBpm={tempBpm}
            setTempBpm={setTempBpm}
            onChangeMode={onChangeMode}
          />
        </div>

        { /* Bass Line */ }
        <div className="col-12 mb-3">
          <BassLineSection
            controls={controls}
            tempBassLpf={tempBassLpf}
            setTempBassLpf={setTempBassLpf}
            commitOnRelease={commitOnRelease}
            onChangeMode={onChangeMode}
          />
        </div>

        {/* Main Arp */}
        <div className="col-12 mb-3">
          <MainArpSection
            controls={controls}
            tempMainArpLpf={tempMainArpLpf}
            setTempMainArpLpf={setTempMainArpLpf}
            tempMainArpRoom={tempMainArpRoom}
            setTempMainArpRoom={setTempMainArpRoom}
            tempMainArpLpenv={tempMainArpLpenv}
            setTempMainArpLpenv={setTempMainArpLpenv}
            commitOnRelease={commitOnRelease}
            onChangeMode={onChangeMode}
          />
        </div>

        { /* Drums1 */}
        <div className="col-12 mb-3">
          <DrumsOneSection
            controls={controls}
            onChangeMode={onChangeMode}
          />
        </div>

        { /* Drums2 */}
        <div className="col-12 mb-3">
          <DrumsTwoSection
            controls={controls}
            onChangeMode={onChangeMode}
          />
        </div>
      </div>
    </>
  );
}

export default ControlButtons;
