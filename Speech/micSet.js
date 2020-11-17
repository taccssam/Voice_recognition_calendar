import { recognition } from "./speechStart";


const MIC = `mic`;


export const ret="";

export const saveMic = (coordsObj) => {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

export const initMic = () => {
    /*const loadedMIC = localStorage.getItem(MIC);
    if (loadedMIC !== "prompt") {
        navigator.permissions
            .query({ name: "microphone" })
            .then(function (permissionStatus) {
                // granted, denied, prompt
                localStorage.setItem(MIC, permissionStatus.state);
                permissionStatus.granted = function () {
                    localStorage.setItem(MIC, permissionStatus.state);
                };
            });
    }
    recognition.start();*/
	window.Recorder = Recorder;
}

	function message(msg){  
	    try {
            var parsedJson = JSON.parse(msg);
            if( parsedJson.cmd == "onFinalResult") {
                CLOG('onFinalResult');
                var txt_result = document.getElementById("txt_result");
                txt_result.innerHTML = parsedJson.msg;
                toggleVoice('onFinalResult');
			} else if(parsedJson.cmd == "onPartialResult") {
                CLOG('onPartialResult');
                var txt_result = document.getElementById("txt_result");
                txt_result.innerHTML = parsedJson.msg;
            } else if( parsedJson.cmd == "onEndPointDetect" ) {
                CLOG('onEndPointDetect');
            } else if( parsedJson.cmd == "onJsonMsg" ) {
                var txt_result = document.getElementById("txt_result");
                txt_result.innerHTML = JSON.stringify(parsedJson.msg);
            } else if( parsedJson.cmd == "onError" ) {
                var txt_result = document.getElementById("txt_result");
                txt_result.innerHTML = JSON.stringify(parsedJson.msg);
                CLOG('onError');
                toggleVoice('onError');
            } else if( parsedJson.cmd == "onopen" ) {
                CLOG('onOpen');
                if (audioRecorder) {
                    audioRecorder.connection = true;
                }
            } else {
                CLOG(msg);
			}
         } catch(e) {
             CLOG('e.message:' + e.message);
            CLOG(msg);
         }
	}  

	var Recorder = (source, cfg) => {
		var config = cfg || {};
		CLOG(config);
		var bufferLen = config.bufferLen || 4096;
		var worker;
		var WORKER_PATH = '/web/recorderWorker.js' + config.cachedate;
        CLOG('bufferLen='+bufferLen);
        this.connection = false;
		this.context = source.context;
		if(!this.context.createScriptProcessor){
            CLOG('createJavaScriptNode');
			this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
		} else {
            CLOG('createScriptProcessor');
			this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
		}
		var recording = false,
			currCallback;

		this.node.onaudioprocess = function(e){
			if (!recording) return;
			worker.postMessage({
				command: 'record',
				buffer: [
					e.inputBuffer.getChannelData(0),
					e.inputBuffer.getChannelData(1)
				]
			});
		}

		this.configure = function(cfg){
			for (var prop in cfg){
				if (cfg.hasOwnProperty(prop)){
					config[prop] = cfg[prop];
				}
			}
		}

		this.newWorker = function(){
			worker = new Worker(config.workerPath || WORKER_PATH);
			this.connection = false;

			worker.onmessage = function(e){
				CLOG("worker.onmessage");
				switch (e.data.aType) {
					case 'text':
						CLOG("onmessage text");
						message(e.data.aBuf);
						//translation( e.data.aBuf );
						break;
					case 'blob':
						CLOG("onmessage blob");
						var blob = e.data.aBuf;
						currCallback(blob);
						break;
					case 'raw':
						CLOG("onmessage raw");
						var blob = e.data.aBuf;
						currCallback(blob);
						break;
					default:
						throw 'no aType on incoming message to ChromeWorker';
				}
			}
		}

		this.deleteWorker = function(){
			worker.terminate();
		}

		this.init = function(){
			worker.postMessage({
				command: 'init',
				config: {
					sampleRate: this.context.sampleRate,
					wss: config.wss,
				}
			});
		}

		this.record = function(){
			recording = true;
			worker.postMessage({ command: 'startRecord', cmd: 'recog', aiid: 'aiid', kaccountid: 'kaccountid', service: 'DICTATION' });
		}

		this.record = function(cmd, aiid, kaccountid, service){
		    CLOG('record : ' + aiid + ' , ' + kaccountid + ' , ' + service );
			recording = true;
			worker.postMessage({ command: 'startRecord', cmd: cmd, aiid: aiid, kaccountid: kaccountid, service: service });
		}

		this.stop = function(){
			recording = false;
			worker.postMessage({ command: 'stopRecord', cmd: 'recogEnd', aiid: 'aiid', kaccountid: 'kaccountid', service: 'DICTATION' });
		}

		this.stop = function(cmd, aiid, kaccountid, service){
			recording = false;
			worker.postMessage({ command: 'stopRecord', cmd: cmd, aiid: aiid, kaccountid: kaccountid, service: service });
		}

		this.clear = function(){
			worker.postMessage({ command: 'clear' });
		}

		this.connect = function(){
			worker.postMessage({ command: 'connect' });
		}

		this.close = function(){
			worker.postMessage({ command: 'close' });
        	this.connection = false;
		}

		this.getBuffers = function(cb) {
			currCallback = cb || config.callback;
			worker.postMessage({ command: 'getBuffers' })
		}

		this.getAudio = function(cb, type){
			CLOG("this.getAudio");
			currCallback = cb || config.callback;
			if (!currCallback) throw new Error('Callback not set');
			worker.postMessage({ command: 'getAudio' });
		}

		source.connect(this.node);
        this.node.connect(this.context.destination);
        // if the script node is not connected to an output the "onaudioprocess" event is not triggered in chrome.
        CLOG('Recorder end');
	};


    //WebCon();

