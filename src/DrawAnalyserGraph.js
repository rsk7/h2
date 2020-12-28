function draw(bufferLength, dataUpdater, graphDrawer) {
  const dataArray = new Uint8Array(bufferLength);
  return (ctx, width, height) => {
    dataUpdater(dataArray);
    ctx.fillStyle = '#EFEFEF';
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#C0C0C0";
    graphDrawer(ctx, dataArray, width, height);
  };
}

function drawTimeDomain(bufferLength, dataUpdater) {
  return draw(
    bufferLength,
    dataUpdater,
    (ctx, dataArray, width, height) => {
      ctx.beginPath();
      const sliceWidth = width * 1.0 / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * height / 2;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.lineTo(width, height/2);
      ctx.stroke();
    }
  );
};

function drawFreqDomain(bufferLength, dataUpdater) {
  return draw(
    bufferLength,
    dataUpdater,
    (ctx, dataArray, width, height) => {
      ctx.beginPath();
      const sliceWidth = width * 1.0 / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (height - 1) - (v * height);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.lineTo(width, height);
      ctx.stroke();
    }
  );
}

export { drawTimeDomain, drawFreqDomain };