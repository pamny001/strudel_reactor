function PlayBackButtons( {onPlay, onStop, onProc, onProcAndPlay }) {
    return (
        <>
            <nav>
                <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-outline-primary" onClick={onStop}>Stop</button>
            </nav>
        </>
    );
}

export default PlayBackButtons;