import { Blob } from "window-or-global";

export let recorder, blob;
let items = [];

if (typeof window !== "undefined") {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        
        recorder.ondataavailable = e => {
            items.push(e.data);
            if (recorder.state == 'inactive') {
                console.log(3); 
                blob = new Blob(items, { type: 'audio/webm' });
            }
        }
       
        recorder.start = () => {
            console.log(1); 
        };
        
        recorder.stop = () => {
            console.log(2);
          }

    });
}