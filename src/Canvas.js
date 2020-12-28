import { useRef, useEffect } from 'react';

function fixDevicePixelRatio(canvas) {
  const { width, height } = canvas.getBoundingClientRect();
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  return { ctx, width, height };
}

function Canvas(props) {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let animationFrameId;


    const render = () => {
      const { ctx, width, height } = fixDevicePixelRatio(canvas);
      draw(ctx, width, height);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <canvas ref={canvasRef} {...rest}/>
  );
}

export default Canvas;