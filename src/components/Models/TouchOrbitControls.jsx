import React, { useEffect, useMemo, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const TouchOrbitControls = (props) => {
  const { gl } = useThree();
  const isTouchDevice = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return (navigator.maxTouchPoints || 0) > 0;
  }, []);
  const [touchCount, setTouchCount] = useState(0);

  useEffect(() => {
    if (!isTouchDevice) return undefined;

    const domElement = gl.domElement;
    const syncTouchCount = (event) => {
      setTouchCount(event.touches?.length || 0);
    };

    domElement.style.touchAction = "pan-y";

    domElement.addEventListener("touchstart", syncTouchCount, { passive: true });
    domElement.addEventListener("touchmove", syncTouchCount, { passive: true });
    domElement.addEventListener("touchend", syncTouchCount, { passive: true });
    domElement.addEventListener("touchcancel", syncTouchCount, { passive: true });

    return () => {
      domElement.removeEventListener("touchstart", syncTouchCount);
      domElement.removeEventListener("touchmove", syncTouchCount);
      domElement.removeEventListener("touchend", syncTouchCount);
      domElement.removeEventListener("touchcancel", syncTouchCount);
      domElement.style.touchAction = "";
    };
  }, [gl, isTouchDevice]);

  useEffect(() => {
    if (!isTouchDevice) return;
    gl.domElement.style.touchAction = touchCount >= 2 ? "none" : "pan-y";
  }, [gl, isTouchDevice, touchCount]);

  return (
    <OrbitControls
      {...props}
      enableRotate={!isTouchDevice || touchCount >= 2}
    />
  );
};

export default TouchOrbitControls;
