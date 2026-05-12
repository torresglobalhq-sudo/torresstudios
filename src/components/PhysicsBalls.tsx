import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export function PhysicsBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          Events = Matter.Events,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies;

    const engine = Engine.create();
    const world = engine.world;
    engine.gravity.y = 0.2; // Light gravity

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const createWalls = () => {
        return [
            Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true }), // bottom
            Bodies.rectangle(width / 2, -50, width * 2, 100, { isStatic: true }), // top
            Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true }), // left
            Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true }) // right
        ];
    };

    let walls = createWalls();
    Composite.add(world, walls);

    const balls: Matter.Body[] = [];
    // Radius values for the balls
    const radiusClasses = [40, 60, 30, 50, 70, 45, 35, 80];
    const colors = [
        { color1: '#ff5533', color2: '#990000' }, // Brand red
        { color1: '#ffffff', color2: '#666666' }, // White/Grey
        { color1: '#333333', color2: '#000000' }, // Dark
    ];

    // Generate some balls
    for (let i = 0; i < 18; i++) {
        const r = radiusClasses[i % radiusClasses.length] * (Math.random() * 0.4 + 0.8);
        const x = Math.random() * (width - r * 2) + r;
        const y = Math.random() * (height - r * 2) + r;
        
        const ball = Bodies.circle(x, y, r, {
            restitution: 0.9,
            friction: 0.005,
            density: 0.04,
        });
        
        // Save the color index to use in rendering loop
        (ball as any).colorIndex = i % colors.length;
        
        balls.push(ball);
    }
    Composite.add(world, balls);

    let mousePos = { x: -1000, y: -1000 };
    let mouseVelocity = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as PointerEvent).clientX;
            clientY = (e as PointerEvent).clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Track only if somewhat near the section
        if (y > -200 && y < rect.height + 200) {
            mouseVelocity = { x: x - mousePos.x, y: y - mousePos.y };
            mousePos = { x, y };
        }
    };

    window.addEventListener('pointermove', handlePointerMove as any);
    window.addEventListener('touchmove', handlePointerMove as any, { passive: true });

    Events.on(engine, 'beforeUpdate', () => {
        balls.forEach(ball => {
            const dx = ball.position.x - mousePos.x;
            const dy = ball.position.y - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                const forceMagnitude = (200 - dist) * 0.00003;
                const safeDist = dist || 1;
                Matter.Body.applyForce(ball, ball.position, {
                    x: (dx / safeDist) * forceMagnitude,
                    y: (dy / safeDist) * forceMagnitude
                });

                Matter.Body.setVelocity(ball, {
                    x: ball.velocity.x + mouseVelocity.x * 0.015,
                    y: ball.velocity.y + mouseVelocity.y * 0.015
                });
            }
        });

        // Decay mouse velocity
        mouseVelocity.x *= 0.8;
        mouseVelocity.y *= 0.8;
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    let animationFrameId: number;
    const ctx = canvasRef.current.getContext('2d');

    const render = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        balls.forEach(ball => {
            const { x, y } = ball.position;
            const r = ball.circleRadius!;
            const colorObj = colors[(ball as any).colorIndex];
            
            // Draw 3D-ish ball using radial gradient
            const gradient = ctx.createRadialGradient(
                x - r * 0.3, y - r * 0.3, r * 0.1,
                x, y, r
            );
            gradient.addColorStop(0, colorObj.color1);
            gradient.addColorStop(1, colorObj.color2);

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.closePath();
            
            // Add a subtle glossy reflection to enhance 3D effect
            ctx.beginPath();
            ctx.arc(x - r * 0.2, y - r * 0.2, r * 0.4, 0, 2 * Math.PI);
            const reflectGrad = ctx.createRadialGradient(
                x - r * 0.2, y - r * 0.2, 0,
                x - r * 0.2, y - r * 0.2, r * 0.4
            );
            reflectGrad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            reflectGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = reflectGrad;
            ctx.fill();
            ctx.closePath();
            
            // Apply rotation if needed (gradient doesn't strictly need it, but we can visualize spin if we drew lines, but without lines it looks fine as glossy spheres).
        });

        animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        if (!containerRef.current || !canvasRef.current) return;
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        Matter.Composite.remove(world, walls);
        walls = createWalls();
        Matter.Composite.add(world, walls);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('pointermove', handlePointerMove as any);
        window.removeEventListener('touchmove', handlePointerMove as any);
        Runner.stop(runner);
        Engine.clear(engine);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
