import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code2, Server, Cpu, Database, ChevronRight, Play } from "lucide-react";
import { SiPython, SiTypescript, SiReact, SiNodedotjs, SiPostgresql, SiDocker, SiGo, SiPhp, SiDart, SiJavascript, SiMysql, SiLinux, SiFlutter } from "react-icons/si";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import the real photo
import heroImage from "@assets/github_1777184211010.jpeg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Order & Quotation Manager",
    type: "Dashboard & System",
    desc: "A Python order and quotation management system with a built-in dashboard.",
    stack: ["Python", "Dashboard", "System"],
    url: "https://github.com/caioomega/gerenciadorde-usuarios",
    color: "#ff3333"
  },
  {
    title: "Hotel Management System",
    type: "Full System",
    desc: "A full hotel management system covering parking, rooms, and employees.",
    stack: ["Python", "Management", "Full System"],
    url: "https://github.com/caioomega/hotel-management-system",
    color: "#3366ff"
  },
  {
    title: "Travis Scott Bio",
    type: "Interactive Biography",
    desc: "An interactive TypeScript biography page for Travis Scott.",
    stack: ["TypeScript", "Frontend"],
    url: "https://github.com/caioomega/travis-scott",
    color: "#33ff99"
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAct, setCurrentAct] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Custom Cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);
    lenis.on('scroll', (e: any) => {
      setScrollProgress(e.progress);
    });

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Make sure ScrollTrigger uses the right scroller measurements after lenis takes over
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
    };
  }, []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Act indicators
      const sections = document.querySelectorAll('.act-section');
      sections.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setCurrentAct(i + 1);
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background overflow-hidden text-foreground selection:bg-accent/30 selection:text-accent font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-accent z-50 transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      
      {/* Act Indicator */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 text-xs font-mono text-muted-foreground mix-blend-difference">
        {[1, 2, 3, 4, 5].map(act => (
          <div key={act} className={`transition-all duration-300 ${currentAct === act ? 'text-accent font-bold scale-110' : 'opacity-50'}`}>
            ACT {act.toString().padStart(2, '0')}
          </div>
        ))}
      </div>

      {/* Custom Cursor Orb */}
      <motion.div 
        className="fixed top-0 left-0 rounded-full border border-accent/50 pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-difference"
        animate={{ 
          x: mousePosition.x - (isHovering ? 24 : 8), 
          y: mousePosition.y - (isHovering ? 24 : 8),
          width: isHovering ? 48 : 16,
          height: isHovering ? 48 : 16,
          backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 lg:px-16 py-6 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
        <div className="font-serif text-xl font-bold tracking-tighter flex items-center gap-3 pointer-events-auto cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">CHM</div>
          <span className="hidden md:inline uppercase tracking-widest text-sm">Caio Hilario Mega</span>
        </div>
        <nav className="hidden md:flex gap-8 text-xs font-mono tracking-[0.2em] uppercase pointer-events-auto">
          <a href="#about" className="hover:text-accent transition-colors duration-300">About</a>
          <a href="#work" className="hover:text-accent transition-colors duration-300">Work</a>
          <a href="#contact" className="hover:text-accent transition-colors duration-300">Contact</a>
        </nav>
      </header>

      <main className="relative z-10 w-full">
        <HeroScene />
        <PhotoRevealScene />
        <NumbersScene />
        <ProjectsScene />
        <StackScene />
        <ContactScene />
      </main>
    </div>
  );
}

// SCENE 1: Kinetic Opening
function HeroScene() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Intro animation (not scrubbed)
      gsap.from(".char", {
        opacity: 0,
        y: 40,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.2,
        ease: "back.out(1.7)",
        filter: "blur(10px)",
      });

      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power3.out"
      });

      // Scrubbed animation (on scroll)
      tl.to(".hero-title", { scale: 0.8, y: "-20vh", opacity: 0.2, filter: "blur(10px)" }, 0)
        .to(".hero-sub", { opacity: 0, y: -50 }, 0);
        
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="hero-container act-section relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 radial-gradient-accent opacity-20 pointer-events-none" />
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <div className="hero-sub text-accent font-mono text-xs uppercase tracking-[0.3em] mb-6">Director of Engineering</div>
        <h1 className="hero-title font-serif text-6xl md:text-[9vw] leading-[0.9] font-bold tracking-tighter text-white perspective-[1000px]">
          {"CAIO HILARIO MEGA".split("").map((char, i) => (
            char === " " ? <span key={i}>&nbsp;</span> : <span key={i} className="char inline-block">{char}</span>
          ))}
        </h1>
        <p className="hero-sub mt-12 text-sm md:text-lg text-white/50 font-light max-w-xl font-sans perspective-[1000px]">
          Software Developer. 5+ years experience. <br/>
          Building cinematic interfaces and robust backend systems.
        </p>
        <div className="hero-sub mt-12 flex items-center gap-2 text-xs font-mono text-white/30 uppercase tracking-[0.2em] animate-pulse">
          <Play className="w-3 h-3" /> Scroll to play
        </div>
      </div>
    </section>
  );
}

// SCENE 2: Photo Reveal
function PhotoRevealScene() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".photo-container",
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Start as a sliver, expand to full
      tl.fromTo(".photo-mask", 
        { clipPath: "polygon(48% 0%, 52% 0%, 52% 100%, 48% 100%)", filter: "grayscale(100%) blur(5px)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", filter: "grayscale(0%) blur(0px)", ease: "power2.inOut" }
      )
      .to(".photo-image", { scale: 1, objectPosition: "50% 65%" }, "<")
      .from(".photo-text", { opacity: 0, x: 100, stagger: 0.1 }, "-=0.2");
      
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={comp} className="photo-container act-section relative w-full h-[100vh] bg-zinc-950 flex items-center overflow-hidden px-6 md:px-12 lg:px-24">
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-24">
        
        {/* Photo Left */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative flex items-center justify-center">
          <div className="photo-mask w-full max-w-[450px] aspect-[4/5] relative overflow-hidden bg-zinc-900 border border-white/10">
            <img 
              src={heroImage} 
              alt="Caio" 
              className="photo-image w-full h-full object-cover object-[50%_65%] scale-150 transform-gpu"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white font-mono text-xs uppercase tracking-widest">
              17 Y/O — BR
            </div>
          </div>
        </div>

        {/* Text Right */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-right">
          <h2 className="photo-text font-serif text-4xl md:text-6xl text-white leading-tight">
            I wrote my first line of code at 13.
          </h2>
          <p className="photo-text text-white/60 text-lg md:text-xl font-light font-sans max-w-lg ml-auto">
            While others were playing games, I was figuring out how they were built. Today, I focus on performance, clean architecture, and scalable systems.
          </p>
          <div className="photo-text mt-8 flex justify-end gap-6">
            <div className="text-right">
              <div className="text-accent font-mono text-xl">5+</div>
              <div className="text-white/40 text-xs uppercase tracking-widest">Years Exp</div>
            </div>
            <div className="text-right">
              <div className="text-accent font-mono text-xl">0</div>
              <div className="text-white/40 text-xs uppercase tracking-widest">Fear</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// SCENE 3: Big Numbers / Stats
const numberStats = [
  { value: "17", label: "Years Old", caption: "Born 2008" },
  { value: "5+", label: "Years Coding", caption: "Since age 12" },
  { value: "13", label: "Languages", caption: "And counting" },
  { value: "∞", label: "Curiosity", caption: "Always learning" },
];

function NumbersScene() {
  const comp = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Entry reveal — fires once when the section comes into view, items STAY visible
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".numbers-container",
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out", duration: 0.9 },
      });

      tl.from(".numbers-eyebrow", { y: 30, opacity: 0 })
        .from(".numbers-title-line", {
          y: 80,
          opacity: 0,
          skewY: 5,
          stagger: 0.12,
          duration: 1.1,
          ease: "power4.out",
        }, "<0.1")
        .from(".num-item", {
          y: 100,
          opacity: 0,
          rotationX: 55,
          transformOrigin: "bottom center",
          stagger: 0.15,
        }, "<0.25")
        .from(".num-divider", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power2.inOut",
        }, "<0.3")
        .from(".numbers-quote", { y: 25, opacity: 0 }, "<0.2");

      // Separate pin — holds the scene at viewport center so the user dwells on it
      ScrollTrigger.create({
        trigger: ".numbers-container",
        start: "top top",
        end: "+=70%",
        pin: true,
        anticipatePin: 1,
      });

    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="numbers-container act-section relative w-full h-[100vh] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/10 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="numbers-eyebrow inline-flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-accent" />
            <span className="font-mono text-accent text-xs tracking-[0.4em] uppercase">Act 03 — By the Numbers</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tighter font-bold overflow-hidden">
            <span className="numbers-title-line block">Five years.</span>
            <span className="numbers-title-line block text-white/40 italic">A whole filmography.</span>
          </h2>
        </div>

        {/* Numbers grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-8 perspective-[1200px]">
          {numberStats.map((stat, i) => (
            <div key={stat.label} className="num-item flex flex-col items-start">
              <div className="font-mono text-[10px] text-white/30 tracking-[0.3em] mb-2">
                0{i + 1}
              </div>
              <span className="font-serif text-7xl md:text-8xl lg:text-9xl leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30">
                {stat.value}
              </span>
              <span className="font-mono text-accent tracking-[0.25em] uppercase text-xs md:text-sm mt-4">
                {stat.label}
              </span>
              <span className="font-mono text-white/40 text-[11px] mt-1 tracking-wide">
                {stat.caption}
              </span>
            </div>
          ))}
        </div>

        {/* Divider + quote */}
        <div className="num-divider mt-12 md:mt-16 h-px bg-gradient-to-r from-accent/60 via-white/10 to-transparent" />
        <div className="numbers-quote mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <p className="font-serif italic text-xl md:text-3xl text-white/70 max-w-2xl leading-snug">
            "Started shipping at 12. Still curious every single day."
          </p>
          <div className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">
            — The Director
          </div>
        </div>
      </div>
    </section>
  );
}

// SCENE 4: Horizontal Scroll Projects
function ProjectsScene() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const track = comp.current?.querySelector(".projects-track") as HTMLElement | null;
      if (!track || cards.length === 0) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      // Main horizontal scroll — pin and translate the track
      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: comp.current,
          start: "top top",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Generous distance so each card has time to animate in
          end: () => "+=" + Math.max(getDistance(), window.innerHeight * (cards.length + 0.5)),
        }
      });

      // Per-card cinematic reveals as each card enters center
      cards.forEach((card) => {
        const num = card.querySelector(".card-num");
        const title = card.querySelector(".card-title");
        const desc = card.querySelector(".card-desc");
        const tags = card.querySelectorAll(".card-tag");
        const cta = card.querySelector(".card-cta");
        const visual = card.querySelector(".card-visual");
        const visualGlyph = card.querySelector(".card-glyph");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontal,
            start: "left 80%",
            end: "right 30%",
            scrub: 1,
          }
        });

        tl.fromTo(num, { x: -120, opacity: 0 }, { x: 0, opacity: 1, ease: "power3.out" }, 0)
          .fromTo(title, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out" }, 0.05)
          .fromTo(desc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.15)
          .fromTo(tags, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, ease: "power2.out" }, 0.2)
          .fromTo(cta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.3)
          .fromTo(visual, { scale: 0.85, opacity: 0, rotate: -4 }, { scale: 1, opacity: 1, rotate: 0, ease: "power3.out" }, 0)
          .fromTo(visualGlyph, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, ease: "power2.out" }, 0.1);
      });

    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={comp} className="projects-container act-section relative w-full h-[100vh] bg-zinc-950 overflow-hidden flex items-center">
      {/* Top label */}
      <div className="absolute top-8 md:top-12 left-8 md:left-16 lg:left-24 z-20 font-mono text-xs uppercase tracking-[0.3em] text-white/50 pointer-events-none">
        Selected Work // <span className="text-accent">scroll →</span>
      </div>

      {/* Card counter on the right */}
      <div className="absolute top-8 md:top-12 right-8 md:right-16 lg:right-24 z-20 font-mono text-xs uppercase tracking-[0.3em] text-white/30 pointer-events-none">
        <span className="text-accent">01</span> / 0{projects.length}
      </div>

      <div className="projects-track flex h-full items-center" style={{ width: `${projects.length * 100}vw` }}>
        {projects.map((project, i) => (
          <div key={i} className="project-card w-screen h-full flex-shrink-0 flex items-center justify-center px-8 md:px-16 lg:px-24">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10 md:gap-16 group">

              {/* Left: Project Number & Info */}
              <div className="w-full md:w-1/2 flex flex-col gap-5">
                <div className="card-num font-serif text-7xl md:text-[9rem] font-bold text-white/10 leading-none">
                  0{i + 1}
                </div>
                <h3 className="card-title font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight font-bold">
                  {project.title}
                </h3>
                <p className="card-desc text-white/60 text-base md:text-lg font-light font-sans max-w-md">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="card-tag px-3 py-1 border border-white/10 text-white/50 text-xs font-mono uppercase tracking-wider rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-cta clickable mt-6 inline-flex items-center gap-3 text-accent font-mono uppercase tracking-widest text-xs md:text-sm hover:text-white transition-colors w-fit group/btn border border-accent/30 hover:border-accent px-5 py-3 rounded-full"
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                  Inspect Repository
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Right: Abstract Visuals representing project */}
              <div className="card-visual w-full md:w-1/2 aspect-video bg-zinc-900 relative overflow-hidden border border-white/5 rounded-md flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent z-10" />
                <div className="w-[150%] h-[150%] animate-spin-slow opacity-30" style={{ background: `conic-gradient(from 0deg, transparent, ${project.color}, transparent)` }} />
                <div className="card-glyph absolute z-20 text-white/10 font-serif text-[18vw] md:text-[14vw] font-bold mix-blend-overlay">
                  {project.title.charAt(0)}
                </div>
                <div className="absolute bottom-4 left-4 z-30 font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {project.type}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// SCENE 5: The Arsenal — premium animated tech showcase
type ArsenalTech = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  name: string;
  category: string;
  color: string;
  years: number;
};

const arsenalTechs: ArsenalTech[] = [
  { Icon: SiGo, name: "Go", category: "Backend", color: "#fb923c", years: 3 },
  { Icon: SiTypescript, name: "TypeScript", category: "Frontend", color: "#fbbf24", years: 4 },
  { Icon: SiReact, name: "React", category: "Frontend", color: "#fb923c", years: 3 },
  { Icon: SiNodedotjs, name: "Node.js", category: "Backend", color: "#f97316", years: 4 },
  { Icon: SiPython, name: "Python", category: "Backend", color: "#fbbf24", years: 5 },
  { Icon: SiPhp, name: "PHP", category: "Backend", color: "#fb7185", years: 4 },
  { Icon: SiPostgresql, name: "PostgreSQL", category: "Data", color: "#fb923c", years: 3 },
  { Icon: SiDart, name: "Dart", category: "Mobile", color: "#fb7185", years: 2 },
  { Icon: SiFlutter, name: "Flutter", category: "Mobile", color: "#f97316", years: 2 },
  { Icon: SiDocker, name: "Docker", category: "Devops", color: "#fbbf24", years: 3 },
  { Icon: SiJavascript, name: "JavaScript", category: "Frontend", color: "#fbbf24", years: 5 },
  { Icon: SiLinux, name: "Linux", category: "Devops", color: "#fb923c", years: 5 },
];

function ArsenalCard({ tech, index }: { tech: ArsenalTech; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      className="arsenal-card group relative aspect-square rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm overflow-hidden cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${tech.color}30, transparent 70%)` }}
      />

      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          {tech.category}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <tech.Icon
          className="w-14 h-14 md:w-20 md:h-20 transition-all duration-500 group-hover:scale-110"
          style={{ color: tech.color, filter: `drop-shadow(0 0 20px ${tech.color}80)` }}
        />
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
        <span className="font-serif text-base md:text-lg text-white font-bold tracking-tight">
          {tech.name}
        </span>
        <span className="font-mono text-[10px] text-white/40">{tech.years}y</span>
      </div>
    </div>
  );
}

function StackScene() {
  const comp = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".arsenal-eyebrow", {
        y: 30,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stack-container",
          start: "top 75%",
          end: "top 50%",
          scrub: 1,
        },
      });

      gsap.from(".arsenal-title-line", {
        y: 100,
        opacity: 0,
        skewY: 6,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".stack-container",
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
      });

      gsap.from(".arsenal-sub", {
        y: 30,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stack-container",
          start: "top 65%",
          end: "top 30%",
          scrub: 1,
        },
      });

      gsap.from(".arsenal-card", {
        y: 60,
        opacity: 0,
        scale: 0.85,
        rotateX: -25,
        stagger: { amount: 0.6, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".arsenal-grid-container",
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });

      gsap.from(".arsenal-stat", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".arsenal-stats",
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Subtle parallax on background blobs based on scroll
      gsap.to(".arsenal-blob-1", {
        y: -150,
        scrollTrigger: {
          trigger: ".stack-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".arsenal-blob-2", {
        y: 150,
        scrollTrigger: {
          trigger: ".stack-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="stack-container act-section relative w-full min-h-[100vh] bg-black overflow-hidden py-32 px-6 md:px-12 lg:px-20">
      {/* Animated mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="arsenal-grid absolute inset-0" />
        <div className="arsenal-blob-1 absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-orange-500/25 blur-[140px]" />
        <div className="arsenal-blob-2 absolute bottom-[5%] right-[5%] w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-[150px]" />
        <div className="arsenal-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-red-500/15 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20 md:mb-24">
          <div className="arsenal-eyebrow inline-flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-accent" />
            <span className="font-mono text-accent text-xs tracking-[0.4em] uppercase">Act 05 — Arsenal</span>
          </div>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-white leading-[0.9] tracking-tighter font-bold overflow-hidden">
            <span className="arsenal-title-line block">The</span>
            <span className="arsenal-title-line arsenal-title-gradient block italic">Arsenal.</span>
          </h2>

          <p className="arsenal-sub mt-8 text-white/50 text-base md:text-lg font-light max-w-md">
            Twelve weapons. Each one battle-tested in production. Hover to inspect.
          </p>
        </div>

        <div className="arsenal-grid-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {arsenalTechs.map((tech, i) => (
            <ArsenalCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>

        <div className="arsenal-stats mt-20 md:mt-28 grid grid-cols-3 gap-6 md:gap-12 pt-12 border-t border-white/5">
          <div className="arsenal-stat text-center md:text-left">
            <div className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none bg-gradient-to-b from-orange-300 to-orange-600 bg-clip-text text-transparent">
              12
            </div>
            <div className="mt-3 font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-[0.3em]">
              Production Tools
            </div>
          </div>
          <div className="arsenal-stat text-center md:text-left">
            <div className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none bg-gradient-to-b from-amber-300 to-amber-600 bg-clip-text text-transparent">
              5+
            </div>
            <div className="mt-3 font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-[0.3em]">
              Years Shipping
            </div>
          </div>
          <div className="arsenal-stat text-center md:text-left">
            <div className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none bg-gradient-to-b from-red-300 to-red-600 bg-clip-text text-transparent">
              ∞
            </div>
            <div className="mt-3 font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-[0.3em]">
              Curiosity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SCENE 6: End Credits Contact
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-cta clickable group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-accent text-accent-foreground font-mono uppercase tracking-[0.2em] text-sm font-bold overflow-hidden shadow-[0_0_40px_hsl(var(--accent)/0.4)]"
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 inline-block transition-transform group-hover:translate-x-2">→</span>
    </a>
  );
}

function ContactScene() {
  const comp = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "America/Sao_Paulo",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formatted);
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".footer-status", {
        y: 30,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-container",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      gsap.from(".footer-marquee-row", {
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-container",
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      });

      gsap.from(".footer-name-letter", {
        y: 200,
        opacity: 0,
        skewY: 10,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".footer-name-block",
          start: "top 85%",
          end: "top 30%",
          scrub: 1,
        },
      });

      gsap.from(".footer-cta-row", {
        y: 50,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-cta-row",
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      });

      gsap.from(".footer-meta-col", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-meta",
          start: "top 95%",
          end: "top 70%",
          scrub: 1,
        },
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const name = "CAIO";
  const phrases = ["LET'S BUILD SOMETHING REAL", "AVAILABLE FOR HIRE", "OPEN TO COLLABORATION", "FROM IDEA TO PRODUCTION"];

  return (
    <section
      id="contact"
      ref={comp}
      className="contact-container act-section relative w-full min-h-screen bg-black flex flex-col overflow-hidden"
    >
      {/* Animated rotating gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-name-glow" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col px-6 md:px-12 lg:px-20 pt-32 pb-10">
        {/* Top status row */}
        <div className="footer-status flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative w-3 h-3">
              <div className="footer-status-dot absolute inset-0 rounded-full bg-accent" />
              <div className="absolute inset-0 rounded-full bg-accent/40 blur-md" />
            </div>
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-white">
              Available for new projects
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            <span>São Paulo, BR</span>
            <span className="hidden md:inline">·</span>
            <span className="text-accent tabular-nums">{time} GMT-3</span>
          </div>
        </div>

        {/* Marquee row */}
        <div className="footer-marquee-row py-12 overflow-hidden">
          <div className="footer-marquee-track flex gap-16 whitespace-nowrap items-center">
            {[...phrases, ...phrases, ...phrases].map((phrase, i) => (
              <div key={i} className="flex items-center gap-16 shrink-0">
                <span className="font-serif italic text-5xl md:text-7xl text-white/10 font-bold tracking-tight">
                  {phrase}
                </span>
                <span className="text-accent text-4xl md:text-6xl">●</span>
              </div>
            ))}
          </div>
        </div>

        {/* Massive interactive name */}
        <div className="footer-name-block flex-1 flex items-center justify-center py-12">
          <h2 className="footer-name-outline font-serif font-bold leading-none tracking-[-0.04em] text-center select-none cursor-default text-[28vw] md:text-[24vw] lg:text-[22vw]">
            {name.split("").map((letter, i) => (
              <span key={i} className="footer-name-letter inline-block">
                {letter}
              </span>
            ))}
          </h2>
        </div>

        {/* CTA row */}
        <div className="footer-cta-row flex flex-col md:flex-row items-center justify-center gap-8 py-12 border-y border-white/10">
          <span className="font-serif text-2xl md:text-3xl text-white/70 font-light italic">
            Got a wild idea?
          </span>
          <MagneticButton href="mailto:caiohilarioomega@gmail.com">
            Say Hello
          </MagneticButton>
        </div>

        {/* Bottom meta grid */}
        <div className="footer-meta grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 pt-16">
          <div className="footer-meta-col min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">
              Direct Line
            </div>
            <a
              href="mailto:caiohilarioomega@gmail.com"
              className="footer-social-link font-mono text-xs lg:text-[13px] text-white leading-relaxed"
            >
              caiohilarioomega@gmail.com
            </a>
          </div>

          <div className="footer-meta-col min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">
              Code
            </div>
            <a
              href="https://github.com/caioomega"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link font-mono text-xs lg:text-[13px] text-white leading-relaxed"
            >
              github.com/caioomega&nbsp;→
            </a>
          </div>

          <div className="footer-meta-col min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">
              Network
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link font-mono text-xs lg:text-[13px] text-white leading-relaxed"
            >
              linkedin&nbsp;→
            </a>
          </div>

          <div className="footer-meta-col min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">
              Currently
            </div>
            <div className="font-mono text-xs lg:text-[13px] text-white leading-relaxed">
              Building backends · Learning PLC
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-meta-col mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} Caio Hilario Mega · All Reels Reserved
          </div>
          <div className="flex items-center gap-6">
            <span>Crafted with React, GSAP & curiosity</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="clickable text-accent hover:text-white transition-colors"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}