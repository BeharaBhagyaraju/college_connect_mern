import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Info, Megaphone, Search, Users } from 'lucide-react';
import { gsap } from 'gsap';

// The animated canvas background copied exactly from index.php
const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Canvas animation from legacy PHP
    let width = window.innerWidth;
    let height = window.innerHeight;
    let target = { x: width / 2, y: height / 2 };
    let canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');
    let points = [];
    let animateHeader = true;
    let animationFrameId;

    canvas.width = width;
    canvas.height = height;

    const getDistance = (p1, p2) => Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);

    class Circle {
      constructor(pos, rad, color) {
        this.pos = pos;
        this.radius = rad;
        this.color = color;
        this.active = 0;
      }
      draw() {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(156,217,249,${this.active})`;
        ctx.fill();
      }
    }

    // Initialize points
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        let px = x + Math.random() * width / 20;
        let py = y + Math.random() * height / 20;
        let p = { x: px, originX: px, y: py, originY: py, closest: [] };
        points.push(p);
      }
    }

    // Find 5 closest points
    for (let i = 0; i < points.length; i++) {
      let closest = [];
      let p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        let p2 = points[j];
        if (p1 !== p2) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // Create circles
    for (let i in points) {
      let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      points[i].circle = c;
    }

    const drawLines = (p) => {
      if (!p.active) return;
      for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctx.stroke();
      }
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in points) {
          if (Math.abs(getDistance(target, points[i])) < 4000) {
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          } else if (Math.abs(getDistance(target, points[i])) < 20000) {
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          } else if (Math.abs(getDistance(target, points[i])) < 40000) {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          } else {
            points[i].active = 0;
            points[i].circle.active = 0;
          }

          drawLines(points[i]);
          points[i].circle.draw();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const shiftPoint = (p) => {
      gsap.to(p, {
        duration: 1 + 1 * Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: 'circ.inOut',
        onComplete: () => {
          shiftPoint(p);
        }
      });
    };

    // Events
    const mouseMove = (e) => {
      let posx = 0;
      let posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('resize', resize);
    
    // Start animation
    animate();
    for (let i in points) {
      shiftPoint(points[i]);
    }

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="font-[Nunito] w-full overflow-x-hidden">
      {/* Hero Section */}
      <div 
        className="relative w-full h-screen overflow-hidden flex justify-center items-center" 
        style={{ backgroundImage: "url('https://www.marcoguglie.it/Codepen/AnimatedHeaderBg/demo-1/img/demo-1-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center center' }}
      >
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-white text-5xl md:text-7xl mb-5 tracking-wide drop-shadow-md">
            College <span className="font-extralight">Connect</span>
          </h1>
          <p className="text-white/90 text-xl md:text-2xl mb-8 drop-shadow">
            Bridging the gap between students, representatives, and administration
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4e73df] hover:bg-[#2e59d9] text-white rounded-full font-semibold uppercase tracking-wider transition-all transform hover:-translate-y-1 shadow-lg shadow-[#4e73df]/40">
              <UserPlus size={20} /> Join Now
            </Link>
            <Link to="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-full font-semibold uppercase tracking-wider transition-all transform hover:-translate-y-1">
              <Info size={20} /> Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-white text-center">
        <h2 className="text-4xl text-gray-800 font-bold mb-14 relative inline-block">
          Our Features
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#4e73df] rounded-full"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-10 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-2 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#4e73df] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <Megaphone className="w-16 h-16 text-[#4e73df] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Announcements</h3>
            <p className="text-gray-600 leading-relaxed">
              Stay updated with all official and unofficial notices from your college administration and class representatives.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-10 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-2 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#4e73df] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <Search className="w-16 h-16 text-[#4e73df] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Lost & Found</h3>
            <p className="text-gray-600 leading-relaxed">
              Report lost items or find items that others have lost through our efficient lost and found system.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white p-10 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all transform hover:-translate-y-2 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#4e73df] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <Users className="w-16 h-16 text-[#4e73df] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Role-Based Access</h3>
            <p className="text-gray-600 leading-relaxed">
              Different access levels for students, class representatives, and administrators for secure information sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
