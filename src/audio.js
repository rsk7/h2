const audioContext = new window.AudioContext();

const oscillator = audioContext.createOscillator();

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

oscillator.start();

export {
  audioContext,
  gainNode,
  oscillator,
  analyser,
};
