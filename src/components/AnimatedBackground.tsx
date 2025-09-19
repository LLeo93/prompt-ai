import { useEffect, useState } from 'react';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function AnimatedBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: '#060818',
        },
        particles: {
          number: {
            value: 150,
            density: { enable: true },
          },
          color: { value: ['#ffffff', '#a5f3fc', '#93c5fd'] },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.3, max: 0.9 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 0.2,
            random: true,
            outModes: { default: 'out' },
          },
          links: {
            enable: true,
            distance: 120,
            color: '#ffffff',
            opacity: 0.15,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.4 } },
            push: { quantity: 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default AnimatedBackground;
