import { useCallback, useEffect } from "react";

const KeyDownHandler = (props) => {

  const evaluateKeyPressing = useCallback((event) => {
    if (event.keyCode === 27) {
      props.escHandler(event);
    } else if (event.keyCode === 37) {
      props.leftHandler(event);
    } else if (event.keyCode === 39) {
      props.rightHandler(event);
    }
  }, [props]);

  useEffect(() => {
    document.addEventListener("keydown", evaluateKeyPressing);

    return () => {
      document.removeEventListener("keydown", evaluateKeyPressing);
    };
  }, [evaluateKeyPressing]);

  return (null);
};

export default KeyDownHandler;