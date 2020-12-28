import { useState } from 'react';
import Canvas from './Canvas';
import {
  drawTimeDomain,
  drawFreqDomain,
} from './DrawAnalyserGraph';
import {
  analyser,
  audioContext,
  gainNode,
} from './audio';
import styles from './Node.module.css';

function Node() {
  const [isOn, setOn] = useState(false);

  function play() {
    audioContext.resume();
    gainNode.gain.setValueAtTime(isOn ? 1 : 0, audioContext.currentTime);
    setOn(!isOn);
  }

  const drawTimeDomainData = drawTimeDomain(
    analyser.frequencyBinCount,
    (dataArray) => analyser.getByteTimeDomainData(dataArray),
  );

  const drawFreqDomainData = drawFreqDomain(
    analyser.frequencyBinCount,
    (dataArray) => analyser.getByteFrequencyData(dataArray),
  );

  return(
    <div className={styles.node}>
      <button className={styles.button} onClick={play}>Play</button>
      <Canvas className={styles.canvas} height="50" width="300" draw={drawTimeDomainData}/>
      <Canvas className={styles.canvas} height="50" width="300" draw={drawFreqDomainData}/>
    </div>
  );
}

export default Node;