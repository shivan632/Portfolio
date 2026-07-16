import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ProjectsBackground = ({ darkMode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Objects Creation: 3D Sphere of Points (Plexus Network)
    const particleCount = 80;
    const radius = 65;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
      // Distribute points randomly on sphere surface
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particleData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15
        ),
        numConnections: 0
      });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Texture/Material
    const colorTheme = darkMode ? 0x6366f1 : 0x10b981; // Indigo / Emerald
    const particlesMaterial = new THREE.PointsMaterial({
      color: colorTheme,
      size: 2.2,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const pointCloud = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(pointCloud);

    // 3. Lines connecting nearby points
    const lineMaterial = new THREE.LineBasicMaterial({
      color: darkMode ? 0x10b981 : 0x6366f1, // Emerald / Indigo
      transparent: true,
      opacity: 0.12
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Group to hold sphere objects for mouse rotation
    const sphereGroup = new THREE.Group();
    sphereGroup.add(pointCloud);
    sphereGroup.add(lineSegments);
    scene.add(sphereGroup);

    // 4. Mouse movement handler
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event) => {
      mouse.targetX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouse.targetY = (event.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation loop with Intersection Observer for performance
    let animationFrameId;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;

      // Update positions of particles
      const positionsArray = particlesGeometry.attributes.position.array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        // Move particle within constraint
        let x = positionsArray[i * 3];
        let y = positionsArray[i * 3 + 1];
        let z = positionsArray[i * 3 + 2];

        // Apply velocity physics
        const v = particleData[i].velocity;
        x += v.x;
        y += v.y;
        z += v.z;

        // Keep inside sphere constraint
        const distFromCenter = Math.sqrt(x*x + y*y + z*z);
        if (distFromCenter > radius) {
          // Bounce off boundary wall
          v.negate();
        }

        positionsArray[i * 3] = x;
        positionsArray[i * 3 + 1] = y;
        positionsArray[i * 3 + 2] = z;
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      // Build lines based on distance
      const maxDistance = 45;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const x1 = positionsArray[i * 3];
          const y1 = positionsArray[i * 3 + 1];
          const z1 = positionsArray[i * 3 + 2];

          const x2 = positionsArray[j * 3];
          const y2 = positionsArray[j * 3 + 1];
          const z2 = positionsArray[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

          if (dist < maxDistance) {
            // Draw connection line
            linePositions[lineIndex++] = x1;
            linePositions[lineIndex++] = y1;
            linePositions[lineIndex++] = z1;

            linePositions[lineIndex++] = x2;
            linePositions[lineIndex++] = y2;
            linePositions[lineIndex++] = z2;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex);
      lineGeometry.attributes.position.needsUpdate = true;

      // Smooth rotate & mouse tracking tilt
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      sphereGroup.rotation.y += 0.0025;
      sphereGroup.rotation.x = mouse.y * 0.01;
      sphereGroup.rotation.y += mouse.x * 0.01;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animate();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    // 6. Resize handling
    const handleResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 7. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ProjectsBackground;
