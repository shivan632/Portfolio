import React, { useEffect, useRef } from 'react';

const AboutBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D Cube vertices relative to its center
    const cubeVertices = [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 }
    ];

    // Edges connecting vertices
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
    ];

    // Array of active floating objects
    const objects = [];
    const objectCount = 6;

    for (let i = 0; i < objectCount; i++) {
      objects.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 200 + 100, // depth
        size: Math.random() * 30 + 20,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        rotX: (Math.random() - 0.5) * 0.015,
        rotY: (Math.random() - 0.5) * 0.015,
        rotZ: (Math.random() - 0.5) * 0.015
      });
    }

    const focalLength = 300;

    // Rotate 3D points
    const rotateX = (p, angle) => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    };

    const rotateY = (p, angle) => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
    };

    const rotateZ = (p, angle) => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos, z: p.z };
    };

    const animate = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      objects.forEach((obj) => {
        // Move object
        obj.x += obj.speedX;
        obj.y += obj.speedY;
        
        // Rotate object
        obj.rx += obj.rotX;
        obj.ry += obj.rotY;
        obj.rz += obj.rotZ;

        // Wrap boundaries
        if (obj.x < -100) obj.x = width + 100;
        if (obj.x > width + 100) obj.x = -100;
        if (obj.y < -100) obj.y = height + 100;
        if (obj.y > height + 100) obj.y = -100;

        // Transform vertices
        const transformedVertices = cubeVertices.map((v) => {
          let p = { x: v.x * obj.size, y: v.y * obj.size, z: v.z * obj.size };
          p = rotateX(p, obj.rx);
          p = rotateY(p, obj.ry);
          p = rotateZ(p, obj.rz);
          
          // Perspective projection
          const scale = focalLength / (focalLength + obj.z + p.z);
          const screenX = obj.x + p.x * scale;
          const screenY = obj.y + p.y * scale;

          return { x: screenX, y: screenY, scale };
        });

        // Draw edges
        ctx.beginPath();
        cubeEdges.forEach(([start, end]) => {
          const p1 = transformedVertices[start];
          const p2 = transformedVertices[end];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        });

        const alpha = Math.max(0.01, (1 - obj.z / 400) * 0.1);
        ctx.strokeStyle = darkMode
          ? `rgba(16, 185, 129, ${alpha})`
          : `rgba(99, 102, 241, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Draw node vertices
        transformedVertices.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = darkMode
            ? `rgba(99, 102, 241, ${alpha * 1.5})`
            : `rgba(16, 185, 129, ${alpha * 1.5})`;
          ctx.fill();
        });
      });

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

    observer.observe(canvas);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AboutBackground;
