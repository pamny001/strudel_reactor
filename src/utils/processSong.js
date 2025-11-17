//Process song and check for control settings. 
export function processSong(text, controls) {
    //Song code before adding controls changes
    let output = text;

    //Check for hush control and pause <p1_Radio> section
    //const replacement = controls.drums2 === 'drums2Off' ? '_' : '';

    const switchKeys = ['mainArp', 'bassLine', 'drums1', 'drums2'];

    switchKeys.forEach(key => {
        const replacement = controls[key] === 'off' ? '_' : '';
        const placeholder = `<${key}Switch>`;
        output = output.replaceAll(placeholder, replacement);
    });
    
    //BPM
    output = output.replace(/{{\s*BPM\s*}}/g, String(controls.bpm ?? 120));
    //Bass
    output = output.replace(/{{\s*BASS_LPF\s*}}/g, String(controls.bassLpf ?? 700));
    //Main Arp
    output = output.replace(/{{\s*MAIN_ARP_LPF\s*}}/g, String(controls.mainArpLpf ?? 300));
    output = output.replace(/{{\s*MAIN_ARP_ROOM\s*}}/g, String(controls.mainArpRoom ?? 0.6));
    output = output.replace(/{{\s*MAIN_ARP_LPENV\s*}}/g, String(controls.mainArpLpenv ?? 3.3));
    //Drums
    output = output.replace(/{{\s*DRUMS_1_KICK\s*}}/g, String(controls.drums1Kick ?? 0.25));
    //Drums2
    output = output.replace(/{{\s*DRUMS_2_HPF\s*}}/g, String(controls.drums2Hpf ?? 1000));
    //Global volume
    output = output.replace(/{{\s*VOLUME\s*}}/g, String(controls.volume ?? 1));

    return output;
}