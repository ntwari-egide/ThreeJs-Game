
import * as THREE from 'three'
import { Box, Plane } from "@react-three/drei";
import React, { Suspense, useMemo }  from "react";
import { Canvas, useLoader } from "react-three-fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import niceColors from 'nice-color-palettes';
import "./index.css";

function PhyPlane({ color, ...props }) {
  const [ref] = usePlane(() => ({ ...props }));

  return (
      <Plane args={[1000, 1000]} ref={ref}>
        <meshStandardMaterial color={color} />
      </Plane>
  );
}


function PhyBox(props) {
  const [ref, api] = useBox(() => ({ args: [1, 1, 1], mass: 1, ...props }));


  return (
      <Box
          args={[1, 1, 1]}
          ref={ref}
          onClick={() =>

              // This shoots the object when clicked on
              api.applyImpulse([0, 5, -10], [0, 0, 0])
              // &&

              // This makes the object fly upwards when clicked on

              // api.velocity.set(0, 2, 0)

          }
      >
        <meshNormalMaterial />
      </Box>
  );
}


function App() {
  return (

      // Canvas holds all our items and scene
      // Set camera position and focus

      <>
      
      <div className='instruction bg-black p-8 z-50'>
        <p>Interact with game by clicking the objects inside the canvas</p>
      </div>

      <Canvas camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}>

          // Set gravity
          // All items we want to see the effect of gravity on them shall be inside the Physics tags
          // These include the planes and boxes and any other models
          // Four planes are created which shall hold the contents as a platform
          <Physics gravity={[0, -10, 0]}>
              <PhyPlane
                  color={"#347361"}
                  position={[0, -2, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
              />
              <PhyPlane color={"#114033"} position={[0, 0, -10]} />
              <PhyPlane color={"#347361"} position={[-6, 0, -10]} rotation={[0, 2, 0]} />
              <PhyPlane color={"#214029"} position={[6, 0, -10]} rotation={[0, -2, 0]} />

              // Three objects are placed in different positions in the x, y, and z axis
              <PhyBox position={[2, 0, -5]} />
              <PhyBox position={[0, 0, -5]} />
              <PhyBox position={[-2, 0, -5]} />
              <PhyBox position={[-2, 0, -2]} />
          </Physics>

          // This is for provision of ambient lighting in the scene
          <ambientLight intensity={0.3} />

          // We have added some pointLight here at the position showed
          <pointLight intensity={0.8} position={[5, 0, 5]} />

          // Apart from ambient light and point light, you can add others such as fog
      </Canvas>
      </>
  );
}

export default App;
