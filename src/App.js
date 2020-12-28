import './App.css';
import { useState, useRef, useEffect } from 'react';
import Canvas from './Canvas';
import drawAnalyserGraph from './DrawAnalyserGraph';

const audioContext = new window.AudioContext();
const oscillator = audioContext.createOscillator();

/*
oscillator.type = 'square';
oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
*/

const real = new Float32Array(2);
const imag = new Float32Array(2);
real[0] = 0;
real[1] = 1;
imag[0] = 0;
imag[1] = 0;
const wave = audioContext.createPeriodicWave(real, imag, {disableNormalization: true});
oscillator.setPeriodicWave(wave);

const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;


const gainNode = audioContext.createGain();
oscillator.connect(gainNode);
gainNode.connect(analyser);
analyser.connect(audioContext.destination);
gainNode.gain.setValueAtTime(0, audioContext.currentTime);

function init() {
  oscillator.start();
}

function App() {
  const [isOn, setOnOff] = useState(false);

  function play() {
    console.log(isOn);
    if (!isOn)
      gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    else
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    setOnOff(!isOn);
  }

  const drawTimeDomainData = drawAnalyserGraph(
    analyser.frequencyBinCount,
    (dataArray) => analyser.getByteTimeDomainData(dataArray)
  );

  const drawFreqDomainData = drawAnalyserGraph(
    analyser.frequencyBinCount,
    (dataArray) => analyser.getByteFrequencyData(dataArray)
  );

  return (
    <div className="App">
      <button onClick={init}>Init</button>
      <button onClick={play}>Play</button>
      <Canvas height="50" width="300" draw={drawTimeDomainData}/>
      <Canvas height="50" width="300" draw={drawFreqDomainData}/>
    </div>
  );
}

export default App;
