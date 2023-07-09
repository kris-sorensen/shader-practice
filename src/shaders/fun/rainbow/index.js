import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./rainbow";
import { Flex, Box, useReflow } from "@react-three/flex";

const Shader = () => {
  // const { gl } = useThree();
  const mat = useRef(null);

  useFrame(({ clock }) => {
    if (mat.current) {
      // mat.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  const uniforms = useMemo(
    () => ({
      time: {
        value: 0.0,
      },
    }),
    []
  );

  return (
    <Box margin={0.05}>
      <mesh position={[0.5, -0.5, 0]}>
        <planeBufferGeometry args={[2, 2]} />
        <shaderMaterial
          ref={mat}
          // transparent
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </Box>
  );
};

export default Shader;
