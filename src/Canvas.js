import { useRef, useEffect } from 'react';

function Canvas(props) {

  const { draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let animationFrameId;

    const render = () => {
      draw(canvas);
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