import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
import {
  useAspect,
  Html,
  TorusKnot,
  Plane,
  useTexture,
} from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Flex, Box, useReflow } from "@react-three/flex";

//Shader Materials
import BwpowgradMaterial from "./shaders/bwgradient/bwpowgrad";
import SinWaveMaterial from "./shaders/sine/sin";
import SmilyMaterial from "./shaders/shapes/smily";
import RainbowMaterial from "./shaders/colors/rainbow";
import UvGradMaterial from "./shaders/Journey/1";
import OrangeGreenMaterial from "./shaders/Journey/2";
import BwlrgradMaterial from "./shaders/Journey/3";
import BwlrgradYMaterial from "./shaders/Journey/4";
import InvertedYGradMaterial from "./shaders/Journey/5";
import InvertedYSqueezeGradMaterial from "./shaders/Journey/6";
import StepBlindsMaterial from "./shaders/Journey/7";
import StepGapMaterial from "./shaders/Journey/8";
import StepBigGapMaterial from "./shaders/Journey/9";
import StepXBigGapMaterial from "./shaders/Journey/10";
import GridMaterial from "./shaders/Journey/11";
import DotToDotMaterial from "./shaders/Journey/12";
import DashGridMaterial from "./shaders/Journey/13";
import LGridMaterial from "./shaders/Journey/14";
import PlusGridMaterial from "./shaders/Journey/15";
import MovingUVGradMaterial from "./shaders/coolAndAccidental/movingUVGrad";
import MiddleGradMaterial from "./shaders/Journey/16";
import CornerGradMaterial from "./shaders/Journey/17";
import DarkXMaterial from "./shaders/Journey/18";
import FrameMaterial from "./shaders/Journey/19";
import ThinFrameMaterial from "./shaders/Journey/20";
import SpiralFanMaterial from "./shaders/Journey/spiralfan";
import HaloMaterial from "./shaders/shapes/halo";
import TargetMaterial from "./shaders/polar/target";
import LinearVsSmoothstepMaterial from "./shaders/simonDev/1";
import SmoothstepFurMaterial from "./shaders/simonDev/2";
import MinMaxMaterial from "./shaders/simonDev/3";
import GridRefMaterial from "./shaders/simonDev/4";
import RemapMaterial from "./shaders/simonDev/5";
// import SpiralMaterial from './shaders/points/spiral'

extend({ BwlrgradMaterial });
extend({ BwpowgradMaterial });
extend({ SinWaveMaterial });
extend({ SmilyMaterial });
extend({ UvGradMaterial });
extend({ OrangeGreenMaterial });
extend({ InvertedYGradMaterial });
extend({ BwlrgradYMaterial });
extend({ InvertedYSqueezeGradMaterial });
extend({ StepBlindsMaterial });
extend({ StepGapMaterial });
extend({ StepBigGapMaterial });
extend({ StepXBigGapMaterial });
extend({ GridMaterial });
extend({ DotToDotMaterial });
extend({ DashGridMaterial });
extend({ LGridMaterial });
extend({ PlusGridMaterial });
extend({ MovingUVGradMaterial });
extend({ MiddleGradMaterial });
extend({ CornerGradMaterial });
extend({ DarkXMaterial });
extend({ FrameMaterial });
extend({ RainbowMaterial });
extend({ ThinFrameMaterial });
extend({ SpiralFanMaterial });
extend({ HaloMaterial });
extend({ TargetMaterial });
extend({ LinearVsSmoothstepMaterial });
extend({ SmoothstepFurMaterial });
extend({ MinMaxMaterial });
extend({ GridRefMaterial });
extend({ RemapMaterial });
// extend({ SpiralMaterial });

const state = {
  top: 0,
};

function Shaders({ onChangePages }) {
  const sinWave = useRef();
  const group = useRef();
  const smily = useRef();
  const spiral = useRef();
  const uvGrad = useRef();
  const test = useRef();
  const spiralfan = useRef();
  const gridRef = useRef();
  const remap = useRef();
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const vec = new THREE.Vector3();
  useFrame(
    ({ clock }) => (smily.current.uniforms.uTime.value = clock.getElapsedTime())
  );
  useFrame(
    ({ clock }) =>
      (sinWave.current.uniforms.uTime.value = clock.getElapsedTime())
  );
  useFrame(
    ({ clock }) =>
      (uvGrad.current.uniforms.uTime.value = clock.getElapsedTime())
  );
  useFrame(
    ({ clock }) =>
      (uvGrad.current.uniforms.uTime.value = clock.getElapsedTime())
  );
  useFrame(
    ({ clock }) => (test.current.uniforms.uTime.value = clock.getElapsedTime())
  );
  // useFrame(({ clock }) => spiral.current.uniforms.uTime.value = clock.getElapsedTime())

  useFrame(() =>
    group.current.position.lerp(vec.set(0, state.top / 100, 0), 0.1)
  );

  useFrame(({ clock }) => {
    remap.current.uniforms.time.value = clock.getElapsedTime();
    console.log(`Here`, remap.current.uniforms.time.value);
    // console.log("time", clock.getDelta());
  });

  const handleReflow = useCallback(
    (w, h) => {
      onChangePages(h / vpHeight);
      // console.log({ h, vpHeight, pages: h / vpHeight })
    },
    [onChangePages, vpHeight]
  );

  const fur = useTexture("/textures/fur.jpg");

  useEffect(() => {
    const handleResize = () => {
      gridRef.current.uniforms.resolution.value = new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      );
      gridRef.current.uniforms.aspectRatio.value =
        window.innerWidth / window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <group ref={group}>
      <Flex
        flexDirection="column"
        size={[vpWidth, vpHeight, 0]}
        onReflow={handleReflow}
        position={[-vpWidth / 2, vpHeight / 2, 0]}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          // width="70%"
        >
          {/* SimonDev 5 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <remapMaterial ref={remap} time={0} />
            </mesh>
          </Box>
          {/* SimonDev 4 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <gridRefMaterial
                ref={gridRef}
                uniforms={{
                  resolution: {
                    value: new THREE.Vector2(
                      window.innerWidth,
                      window.innerHeight
                    ),
                  },
                  aspectRatio: {
                    value: window.innerWidth / window.innerHeight,
                  },
                }}
              />
            </mesh>
          </Box>
          {/* SimonDev 3 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <minMaxMaterial />
            </mesh>
          </Box>
          {/* SimonDev 2 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <smoothstepFurMaterial uniforms={{ tFur: { value: fur } }} />
            </mesh>
          </Box>
          {/* SimonDev 1 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <linearVsSmoothstepMaterial />
            </mesh>
          </Box>

          {/* POLAR 1*/}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <targetMaterial />
            </mesh>
          </Box>

          {/* SHADERS */}
          {/* Test Mat */}
          {/* <Box margin={0.05} >
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1, 500, 500]} />
              <spiralMaterial ref={spiral} />
            </mesh>
          </Box> */}

          {/* Journey sprialfan */}
          {/* <Box margin={0.05} >
            <mesh position={[0.5, -0.5, 0]}>
              <sphereBufferGeometry args={[15, 64, 32]} />
              <spiralFanMaterial ref={spiralfan} />
            </mesh>
          </Box> */}

          {/* Journey 20 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <thinFrameMaterial />
            </mesh>
          </Box>

          {/* Journey 19 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <frameMaterial />
            </mesh>
          </Box>
          {/* Journey 18 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <darkXMaterial />
            </mesh>
          </Box>
          {/* Journey 17 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <cornerGradMaterial />
            </mesh>
          </Box>
          {/* Journey 16 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <middleGradMaterial />
            </mesh>
          </Box>
          {/* Journey 15 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <plusGridMaterial />
            </mesh>
          </Box>

          {/* Journey 14 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <lGridMaterial />
            </mesh>
          </Box>
          {/* Journey 13 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <dashGridMaterial />
            </mesh>
          </Box>
          {/* Journey 12 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <dotToDotMaterial />
            </mesh>
          </Box>
          {/* Journey 11 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <gridMaterial />
            </mesh>
          </Box>
          {/* Journey 10 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <stepXBigGapMaterial />
            </mesh>
          </Box>
          {/* Journey 9 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <stepBigGapMaterial />
            </mesh>
          </Box>
          {/* Journey 8 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <stepGapMaterial />
            </mesh>
          </Box>
          {/* Journey 7 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <stepBlindsMaterial />
            </mesh>
          </Box>
          {/* Journey 6 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <invertedYSqueezeGradMaterial />
            </mesh>
          </Box>

          {/* Journey 5 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <invertedYGradMaterial />
            </mesh>
          </Box>

          {/* Journey 4 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <bwlrgradYMaterial />
            </mesh>
          </Box>

          {/* Journey 3 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <bwlrgradMaterial />
            </mesh>
          </Box>
          {/* Journey 2 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <orangeGreenMaterial />
            </mesh>
          </Box>
          {/* Journey 1 */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <uvGradMaterial ref={uvGrad} uTime={0} />
            </mesh>
          </Box>
          {/* Journey 1
          <Box margin={0.05} >
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <uvGradMaterial

              />
            </mesh>
          </Box> */}
          {/* halo Material */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <haloMaterial ref={test} />
            </mesh>
          </Box>
          {/* Moving UV Material */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <movingUVGradMaterial ref={test} />
            </mesh>
          </Box>
          {/* Rainbow */}
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <rainbowMaterial />
            </mesh>
          </Box>

          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <bwpowgradMaterial />
            </mesh>
          </Box>
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <sinWaveMaterial ref={sinWave} uTime={0} />
            </mesh>
          </Box>
          <Box margin={0.05}>
            <mesh position={[0.5, -0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <smilyMaterial uTime={0} ref={smily} />
            </mesh>
          </Box>
        </Box>
      </Flex>
    </group>
  );
}

function App() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top = e.target.scrollTop);
  // useEffect(() => void onScroll({ target: scrollArea.current }), [])
  const [pages, setPages] = useState(0);
  return (
    <>
      <Canvas
        gl={{}}
        camera={{ position: [0, 0, 2], zoom: 1 }}
        // orthographic
        // pixelRatio={window.devicePixelRatio}
      >
        <Suspense fallback={<Html center>loading..</Html>}>
          <Shaders onChangePages={setPages} />
        </Suspense>

        {/* <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={1024}
          />
        </EffectComposer> */}
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  );
}

export default App;
