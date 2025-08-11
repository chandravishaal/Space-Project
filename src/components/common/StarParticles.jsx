import React, { useRef, useEffect } from "react";

const StarParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("[StarParticles] mounted");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Make canvas fill its parent
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = [];

    // Create 3 layers of stars
    const createStars = () => {
      stars.length = 0;

      const totalStars = Math.floor((canvas.width * canvas.height) / 3000);

      for (let i = 0; i < totalStars; i++) {
        const layer = Math.floor(Math.random() * 3); // 0, 1, or 2
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size:
            layer === 0 ? 0.5 :
            layer === 1 ? 1.0 :
            1.5,
          speed:
            layer === 0 ? 0.05 :
            layer === 1 ? 0.15 :
            0.3,
          alpha: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005
        });
      }
    };
    createStars();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Movement
        star.x -= star.speed;
        if (star.x < 0) star.x = canvas.width;

        // Twinkle
        star.alpha += star.twinkleSpeed * (Math.random() > 0.5 ? 1 : -1);
        if (star.alpha < 0.2) star.alpha = 0.2;
        if (star.alpha > 1) star.alpha = 1;

        // Draw
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      console.log("[StarParticles] unmounted");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",  
        zIndex: 0
      }}
    />
  );
};

export default StarParticles;
