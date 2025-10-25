function PlayBackButtons( {onPlay, onStop, onProc }) {
    return (
        <>
            <nav>
                <button id="process" className="btn btn-outline-primary" onClick={onProc}>Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
                <br />
                <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-outline-primary" onClick={onStop}>Stop</button>
            </nav>
        </>
    );
}

export default PlayBackButtons;