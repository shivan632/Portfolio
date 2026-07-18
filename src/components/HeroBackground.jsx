import React, { useEffect, useRef } from 'react';

const HeroBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D Grid parameters
    const cols = 24;
    const rows = 18;
    const spacingX = width / (cols - 1);
    const spacingY = height / (rows - 1);
    const points = [];

    // Perspective parameters
    const focalLength = 400;
    const centerY = height * 0.55;
    const centerX = width * 0.5;

    // Generate grid points in 3D
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Center the coordinate space
        const x = (c - cols / 2) * spacingX * 0.8;
        const z = (r - rows / 2) * 50 + 200; // depth
        const y = 150; // height offset
        points.push({ x, y, z, baseZ: z, col: c, row: r });
      }
    }

    let time = 0;

    const animate = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Project and draw grid lines
      const projected = points.map((p) => {
        // Calculate dynamic wave heights
        const wave = Math.sin(time + p.col * 0.3) * Math.cos(time + p.row * 0.3) * 35;
        const currentY = p.y + wave;

        // Perspective projection
        const scale = focalLength / (focalLength + p.z);
        const sx = centerX + p.x * scale;
        const sy = centerY + currentY * scale;

        return { x: sx, y: sy, scale, valid: p.z > -focalLength };
      });

      // Draw horizontal lines
      ctx.lineWidth = 0.8;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = projected[idx];
          if (p.valid) {
            if (c === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = darkMode
          ? `rgba(16, 185, 129, ${0.05 + (1 - r / rows) * 0.08})`
          : `rgba(99, 102, 241, ${0.03 + (1 - r / rows) * 0.05})`;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          const p = projected[idx];
          if (p.valid) {
            if (r === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = darkMode
          ? `rgba(99, 102, 241, ${0.05 + (1 - c / cols) * 0.08})`
          : `rgba(16, 185, 129, ${0.03 + (1 - c / cols) * 0.05})`;
        ctx.stroke();
      }

      // Draw dots at intersections
      projected.forEach((p, idx) => {
        if (p.valid && idx % 3 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = darkMode
            ? `rgba(16, 185, 129, ${0.12 * p.scale})`
            : `rgba(99, 102, 241, ${0.08 * p.scale})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Performance Optimization: IntersectionObserver
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

export default HeroBackground;
