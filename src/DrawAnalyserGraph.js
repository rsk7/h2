function drawAnalyserGraph(bufferLength, dataUpdater) {
  const dataArray = new Uint8Array(bufferLength);
  return function(canvas) {
    const ctx = canvas.getContext('2d');
    dataUpdater(dataArray);
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * canvas.height / 2;
    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
    x += sliceWidth;
    }
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
  }
};

export default drawAnalyserGraph;