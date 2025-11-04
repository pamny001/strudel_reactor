function PlayBackButtons( {onPlay, onStop, children }) {
    return (
        <>
            <nav>
                <button id="play" className="btn btn-success me-2" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-danger me-2" onClick={onStop}>Stop</button>
                {children}
            </nav>
        </>
    );
}

export default PlayBackButtons;