import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import educationAnimation from '../animations/Educatin.json';

gsap.registerPlugin(ScrollTrigger);

/* ─── TOKENS ─────────────────────────────────────────────────────────────── */
var T = {
  green:    '#0e652d',
  greenLt:  '#e6f4eb',
  greenMid: '#c8e8d2',
  blue:     '#1f5b87',
  blueLt:   '#e4eef6',
  blueMid:  '#c2d9ee',
  amber:    '#d4891a',
  amberLt:  '#fdf0d8',
  amberMid: '#f5d8a0',
  wa:       '#22c55e',
  waLt:     '#dcfce7',
  waMid:    '#a3e6b8',
  white:    '#ffffff',
  snow:     '#fafdf7',
  cream:    '#fdf8f0',
  parchment:'#f5f0e8',
  ink:      '#1a2a1a',
  slate:    '#3d5a4a',
  ash:      '#6b7c72',
};

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
var CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');",
  "*,*::before,*::after{box-sizing:border-box;}",
  ".hm-page{font-family:'DM Sans',sans-serif;}",

  /* keyframes */
  "@keyframes floatA{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(12px,-18px) rotate(3deg)}66%{transform:translate(-8px,10px) rotate(-2deg)}}",
  "@keyframes floatB{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(-14px,10px) rotate(-4deg)}66%{transform:translate(10px,-12px) rotate(2deg)}}",
  "@keyframes floatC{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-14px)}}",
  "@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  "@keyframes pulseRing{0%,100%{transform:scale(1);opacity:0.45}50%{transform:scale(1.08);opacity:0.2}}",
  "@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}",
  "@keyframes countTick{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}",

  /* dot grids */
  ".hm-dots{background-image:radial-gradient(circle,rgba(14,101,45,0.11) 1.5px,transparent 1.5px);background-size:24px 24px;}",
  ".hm-dots-blue{background-image:radial-gradient(circle,rgba(31,91,135,0.09) 1.5px,transparent 1.5px);background-size:20px 20px;}",

  /* wave */
  ".hm-wave{line-height:0;overflow:hidden;}",
  ".hm-wave svg{display:block;width:100%;}",

  /* service cards */
  ".hm-svc-card{transition:transform 0.32s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s,border-color 0.3s;text-decoration:none !important;}",
  ".hm-svc-card:hover{transform:translateY(-8px) rotate(-0.3deg);box-shadow:0 22px 44px rgba(14,101,45,0.12) !important;}",
  ".hm-svc-card:hover .hm-svc-icon{transform:scale(1.14) rotate(-6deg);}",
  ".hm-svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;transform:scaleX(0);transform-origin:left;transition:transform 0.3s;z-index:2;}",
  ".hm-svc-card:hover::before{transform:scaleX(1);}",
  ".hm-svc-icon{transition:transform 0.38s cubic-bezier(0.34,1.56,0.64,1);display:inline-flex;}",

  /* testimonial cards */
  ".hm-testi-card{transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s;}",
  ".hm-testi-card:hover{transform:translateY(-6px);box-shadow:0 18px 36px rgba(14,101,45,0.1) !important;}",

  /* stat cards */
  ".hm-stat-card{transition:transform 0.3s,box-shadow 0.3s;}",
  ".hm-stat-card:hover{transform:translateY(-5px);box-shadow:0 16px 32px rgba(14,101,45,0.12) !important;}",

  /* why chips */
  ".hm-chip{transition:all 0.25s;}",
  ".hm-chip:hover{transform:scale(1.06);}",

  /* flip card */
  ".hm-flip-wrap{perspective:1000px;}",
  ".hm-flip-inner{position:relative;width:100%;transition:transform 0.85s;transform-style:preserve-3d;}",
  ".hm-flip-wrap:hover .hm-flip-inner{transform:rotateY(180deg);}",
  ".hm-flip-face{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;}",
  ".hm-flip-back{transform:rotateY(180deg);}",

  /* CTA buttons */
  ".hm-btn-green{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#0e652d;color:#fff;border:none;border-radius:50px;padding:15px 38px;font-size:1rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;min-width:200px;transition:all 0.3s;}",
  ".hm-btn-green:hover{background:#1f5b87;transform:translateY(-3px);box-shadow:0 14px 32px rgba(14,101,45,0.26);}",
  ".hm-btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;color:#0e652d;border:2px solid #0e652d;border-radius:50px;padding:13px 34px;font-size:1rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;min-width:200px;transition:all 0.3s;}",
  ".hm-btn-outline:hover{background:#0e652d;color:#fff;transform:translateY(-3px);}",
  ".hm-btn-wa{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#22c55e;color:#fff;border:none;border-radius:50px;padding:13px 30px;font-size:0.95rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s;}",
  ".hm-btn-wa:hover{background:#16a34a;transform:translateY(-3px);box-shadow:0 12px 28px rgba(34,197,94,0.28);}",
].join('\n');

/* ─── DATA ────────────────────────────────────────────────────────────────── */
var STATS = [
  { num:'2000+', label:'Students Guided',   icon:'🎓', bg:T.greenLt,  border:T.greenMid, col:T.green },
  { num:'20+',   label:'Schools Partnered', icon:'🏫', bg:T.blueLt,   border:T.blueMid,  col:T.blue  },
  { num:'5+',   label:'Years Experience',  icon:'📅', bg:T.amberLt,  border:T.amberMid, col:T.amber },
  { num:'10',     label:'Published Books',   icon:'📚', bg:T.greenLt,  border:T.greenMid, col:T.green },
];

var SERVICES = [
  {
    Icon: PsychologyIcon,
    title: 'Career Counselling',
    desc: 'Personalised one-on-one sessions using psychometric tools to help students discover their true potential and ideal career path.',
    link: '/career-counselling',
    bg: T.greenLt, border: T.greenMid, col: T.green, iconBg: T.greenMid,
    barGrad: '#0e652d, #1f5b87',
  },
  {
    Icon: MenuBookIcon,
    title: 'Value Education Books',
    desc: 'Thoughtfully authored books that bridge academic knowledge with life values, available for students of all age groups.',
    link: '/books',
    bg: T.blueLt, border: T.blueMid, col: T.blue, iconBg: T.blueMid,
    barGrad: '#1f5b87, #0e652d',
  },
  {
    Icon: GroupsIcon,
    title: 'Schools & Workshops',
    desc: 'Interactive workshops and school programmes designed to instil discipline, empathy, and purpose in young learners.',
    link: '/schools-workshops',
    bg: T.amberLt, border: T.amberMid, col: T.amber, iconBg: T.amberMid,
    barGrad: '#d4891a, #0e652d',
  },
  {
    Icon: EmojiObjectsIcon,
    title: 'DMIT Assessment',
    desc: "A fingerprint-based test to understand a student's innate strengths and natural inclinations.",
    link: '/about',
    bg: T.greenLt, border: T.greenMid, col: T.green, iconBg: T.greenMid,
    barGrad: '#0e652d, #d4891a',
  },
];

var TESTIMONIALS = [
  {
    name: 'Riya Sharma',
    role: 'Class 12 Student, Surat',
    text: 'The counselling session changed my perspective completely. I now know exactly what I want to pursue and feel confident about my future.',
    avatar: 'R', avatarBg: T.green, rating: 5,
  },
  {
    name: 'Anil Mehta',
    role: 'Parent, Ahmedabad',
    text: 'Paavan SETU helped my son discover his passion for design. The psychometric test results were an eye-opener for our whole family.',
    avatar: 'A', avatarBg: T.blue, rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Teacher, Surat',
    text: 'The school workshop was engaging, practical and truly impactful. Our students still talk about the activities and what they learned.',
    avatar: 'P', avatarBg: T.amber, rating: 5,
  },
];

var WHY_CHIPS = ['Experienced Mentors', 'Value-Based', 'Holistic Approach', 'Proven Results'];

var ACHIEVEMENTS = [
  '2000+ Students Guided',
  '20+ Partner Schools',
  '10 Published Books',
  '98% Satisfaction Rate',
];

/* ─── SECTION LABEL ───────────────────────────────────────────────────────── */
function SectionLabel(props) {
  var bg = props.bg || T.blueLt;
  var col = props.col || T.blue;
  var border = props.border || T.blueMid;
  return (
    React.createElement('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 } },
      React.createElement('span', { style: { width:36, height:3, background:col, borderRadius:2, marginRight:10 } }),
      React.createElement('span', { style: { display:'inline-flex', alignItems:'center', gap:6, background:bg, border:'1px solid '+border, color:col, padding:'5px 14px', borderRadius:99, fontSize:'0.74rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' } }, props.children),
      React.createElement('span', { style: { width:36, height:3, background:col, borderRadius:2, marginLeft:10 } })
    )
  );
}

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
export default function Home() {
  var flipState = useState(false);
  var flipped = flipState[0]; var setFlipped = flipState[1];
  var lottieRef = useRef(null);

  useEffect(function() {
    /* Hero stagger */
    gsap.fromTo('.hm-hero-anim',
      { opacity:0, y:32 },
      { opacity:1, y:0, duration:0.9, stagger:0.13, ease:'power3.out', delay:0.15 }
    );

    /* Lottie */
    if (lottieRef.current) {
      gsap.fromTo(lottieRef.current,
        { opacity:0, scale:0.88, y:20 },
        { opacity:1, scale:1, y:0, duration:0.95, delay:0.4, ease:'back.out(1.4)' }
      );
    }

    /* Stats */
    gsap.fromTo('.hm-stat-card',
      { opacity:0, y:45, scale:0.92 },
      { opacity:1, y:0, scale:1, duration:0.65, stagger:0.1, ease:'back.out(1.6)',
        scrollTrigger:{ trigger:'.hm-stats-grid', start:'top 83%', once:true } }
    );

    /* Service cards — alternate slide */
    gsap.utils.toArray('.hm-svc-card').forEach(function(card, i) {
      gsap.fromTo(card,
        { opacity:0, x:i%2===0?-45:45, y:15 },
        { opacity:1, x:0, y:0, duration:0.72, ease:'power3.out',
          scrollTrigger:{ trigger:card, start:'top 85%', once:true } }
      );
    });

    /* Why section */
    gsap.fromTo('.hm-why-l',
      { opacity:0, x:-50 },
      { opacity:1, x:0, duration:0.85, ease:'power3.out',
        scrollTrigger:{ trigger:'.hm-why-wrap', start:'top 80%', once:true } }
    );
    gsap.fromTo('.hm-why-r',
      { opacity:0, x:50 },
      { opacity:1, x:0, duration:0.85, ease:'power3.out',
        scrollTrigger:{ trigger:'.hm-why-wrap', start:'top 80%', once:true } }
    );

    /* Testimonials */
    gsap.fromTo('.hm-testi-card',
      { opacity:0, y:40 },
      { opacity:1, y:0, duration:0.65, stagger:0.12, ease:'back.out(1.5)',
        scrollTrigger:{ trigger:'.hm-testi-grid', start:'top 83%', once:true } }
    );

    /* Section heads */
    gsap.utils.toArray('.hm-section-head').forEach(function(el) {
      gsap.fromTo(el,
        { opacity:0, y:24 },
        { opacity:1, y:0, duration:0.7, ease:'power2.out',
          scrollTrigger:{ trigger:el, start:'top 86%', once:true } }
      );
    });

    /* CTA */
    gsap.fromTo('.hm-cta-inner',
      { opacity:0, y:36 },
      { opacity:1, y:0, duration:0.85, ease:'power2.out',
        scrollTrigger:{ trigger:'.hm-cta-inner', start:'top 88%', once:true } }
    );

    return function(){ ScrollTrigger.getAll().forEach(function(t){ t.kill(); }); };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Box className="hm-page" sx={{ bgcolor:T.snow, overflowX:'hidden' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <Box sx={{
          minHeight:'100vh', display:'flex', alignItems:'center',
          position:'relative', overflow:'hidden',
          background:'linear-gradient(145deg,#f0faf3 0%,#e8f4ff 55%,#fdf8f0 100%)',
          pt:{ xs:10, md:10 },
        }}>
          {/* Floating blobs */}
          <Box sx={{ position:'absolute', top:80, left:'3%', width:140, height:140, borderRadius:'40% 60% 55% 45%', bgcolor:T.greenMid, opacity:0.38, animation:'floatA 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', top:'25%', right:'4%', width:110, height:110, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.35, animation:'floatB 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'20%', left:'8%', width:70, height:70, borderRadius:'50%', bgcolor:'#fde8b8', opacity:0.6, animation:'floatC 7s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'10%', right:'10%', width:90, height:90, borderRadius:'45% 55% 60% 40%', bgcolor:T.amberMid, opacity:0.28, animation:'floatA 9s ease-in-out infinite 2s', pointerEvents:'none' }} />
          {/* Spinning rings */}
          <Box sx={{ position:'absolute', top:'8%', right:'25%', width:170, height:170, borderRadius:'50%', border:'2px dashed rgba(14,101,45,0.15)', animation:'spinSlow 22s linear infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'12%', left:'20%', width:120, height:120, borderRadius:'50%', border:'2px dashed rgba(31,91,135,0.13)', animation:'spinSlow 28s linear infinite reverse', pointerEvents:'none' }} />
          {/* Dot grid */}
          <Box className="hm-dots" sx={{ position:'absolute', inset:0, opacity:0.5, pointerEvents:'none' }} />

          <Container maxWidth="xl" sx={{ position:'relative', zIndex:1, px:{ xs:2, sm:3, md:4 } }}>
            <Grid container spacing={{ xs:4, md:8 }} alignItems="center">

              {/* Left — text */}
              <Grid item xs={12} md={6}>

                {/* Badge */}
                <Box className="hm-hero-anim" sx={{ display:'inline-flex', alignItems:'center', gap:1, opacity:0,ml:5, bgcolor:T.white, border:'1.5px solid '+T.greenMid, color:T.green, px:2.5, py:1, borderRadius:99, mb:4, fontSize:'0.78rem', fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase', boxShadow:'0 4px 12px rgba(14,101,45,0.1)' }}>
                  <span style={{ fontSize:'1rem' }}>✨</span>
                  Bridging Values with Education 
                </Box>

                {/* Headline */}
                <Typography className="hm-hero-anim" variant="h1" sx={{ fontFamily:"'Playfair Display',Georgia,serif", color:T.ink, fontSize:{ xs:'2.6rem', sm:'3rem', md:'3.8rem', lg:'4.6rem' }, fontWeight:700, lineHeight:1.08, mb:1.5,ml:5, opacity:0, letterSpacing:'-0.025em' }}>
                  <Box component="span" sx={{ background:'linear-gradient(135deg,#0e652d 0%,#1f5b87 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    Paavan Setu
                  </Box>
                </Typography>

                <Typography className="hm-hero-anim" sx={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', color:T.slate, fontSize:{ xs:'1.15rem', md:'1.4rem' }, mb:2.5, ml:5,opacity:0 }}>
                  Bridging Values with Education
                </Typography>

                <Typography className="hm-hero-anim" sx={{ color:T.ash, fontSize:{ xs:'1rem', md:'1.12rem' }, ml:5,lineHeight:1.85, maxWidth:560, mb:5, opacity:0 }}>
                  Nurturing minds and building character across generations.
                  We combine <strong style={{ color:T.green }}>academic excellence</strong> with{' '}
                  <strong style={{ color:T.blue }}>value-based learning</strong> to create
                  well-rounded individuals ready for a meaningful future.
                </Typography>

                {/* CTA buttons */}
                <Box className="hm-hero-anim" sx={{ display:'flex', flexWrap:'wrap', ml:5,gap:2, mb:5, opacity:0 }}>
                  <Link to="/schools-workshops" className="hm-btn-green">
                    Explore Programs
                    <ArrowForwardIcon style={{ fontSize:18 }} />
                  </Link>
                  <a href="https://wa.me/916351113766" target="_blank" rel="noreferrer" className="hm-btn-wa">
                    <WhatsAppIcon style={{ fontSize:20 }} />
                    WhatsApp
                  </a>
                </Box>

                {/* Mini stats row */}
                <Box className="hm-hero-anim" sx={{ opacity:0, display:'flex', gap:3, flexWrap:'wrap' ,ml:5}}>
                  {[
                    { num:'20k+', label:'Learners',    col:T.green },
                    { num:'100', label:'Programs',    col:T.blue  },
                    { num:'95%',  label:'Satisfaction', col:T.amber },
                    { num:'4.9★', label:'Rating',      col:T.green },
                  ].map(function(s, i) {
                    return (
                      <Box key={i}>
                        <Typography sx={{ fontFamily:"'Playfair Display',serif", color:s.col, fontSize:{ xs:'1.5rem', md:'1.8rem' }, fontWeight:700, lineHeight:1 }}>{s.num}</Typography>
                        <Typography sx={{ color:T.ash, fontSize:'0.72rem', fontWeight:700, letterSpacing:1, textTransform:'uppercase', mt:0.3 }}>{s.label}</Typography>
                      </Box>
                    );
                  })}
                </Box>

              </Grid>

              {/* Right — Lottie */}
              <Grid item xs={12} md={6}>
                <Box ref={lottieRef} sx={{ width:'100%', maxWidth:{ xs:400, md:580 }, mx:'auto', opacity:0, position:'relative' }}>
                  {/* Decorative ring behind animation */}
                  <Box sx={{ position:'absolute', inset:-16, borderRadius:'50%', border:'2px dashed rgba(14,101,45,0.12)', animation:'spinSlow 30s linear infinite', pointerEvents:'none' }} />
                  <Lottie animationData={educationAnimation} loop autoplay style={{ width:'100%', height:'100%' }} />
                </Box>
              </Grid>

            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE 1 ════════════════════════════════════════════════════════ */}
        <Box className="hm-wave" sx={{ mt:'-1px' }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ STATS STRIP ═══════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:7, md:10 }, bgcolor:T.white }}>
          <Container maxWidth="lg">
            <Box className="hm-section-head" sx={{ textAlign:'center', mb:6, opacity:0 }}>
              <SectionLabel bg={T.blueLt} col={T.blue} border={T.blueMid}>Our Impact</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Numbers That{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Speak</Box>
              </Typography>
            </Box>
            <Box className="hm-stats-grid">
              <Grid container spacing={3}>
                {STATS.map(function(s, i) {
                  return (
                    <Grid item xs={6} sm={3} key={i}>
                      <Box className="hm-stat-card" sx={{ opacity:0, bgcolor:s.bg, border:'1.5px solid '+s.border, borderRadius:3, p:3, textAlign:'center', boxShadow:'0 3px 14px rgba(14,101,45,0.06)', position:'relative', overflow:'hidden' }}>
                        <Box sx={{ position:'absolute', bottom:-14, right:-14, width:54, height:54, borderRadius:'50%', border:'2px solid '+s.col, opacity:0.1, animation:'pulseRing 3.5s ease-in-out infinite' }} />
                        <Typography sx={{ fontSize:'2rem', mb:0.5 }}>{s.icon}</Typography>
                        <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:700, color:s.col, lineHeight:1 }}>{s.num}</Typography>
                        <Typography sx={{ color:T.ash, fontSize:'0.8rem', mt:0.5, fontWeight:600 }}>{s.label}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 2 ════════════════════════════════════════════════════════ */}
        <Box className="hm-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,0 720,60 1080,30 C1260,15 1380,10 1440,0 L1440,60 L0,60 Z" fill="#f0faf3" />
          </svg>
        </Box>

        {/* ══ SERVICES ══════════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, background:'linear-gradient(135deg,#f0faf3 0%,#eaf4ff 100%)' }}>
          <Container maxWidth="lg">
            <Box className="hm-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.greenLt} col={T.green} border={T.greenMid}>What We Offer</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Our{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Services</Box>
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {SERVICES.map(function(svc, i) {
                var IconComp = svc.Icon;
                return (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Link to={svc.link} className="hm-svc-card" style={{ display:'block', height:'100%', textDecoration:'none' }}>
                      <Box sx={{ opacity:5, height:'100%', bgcolor:T.white, border:'1.5px solid '+svc.border, borderRadius:4, p:3.5, textAlign:'center', boxShadow:'0 3px 14px rgba(14,101,45,0.05)', position:'relative', overflow:'hidden',
                        '&::before':{ content:'""', position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(90deg,'+svc.barGrad+')', transform:'scaleX(0)', transformOrigin:'left', transition:'transform 0.3s', zIndex:2 },
                        '&:hover::before':{ transform:'scaleX(1)' },
                      }}>
                        <Box sx={{ position:'absolute', bottom:-14, right:-14, width:52, height:52, borderRadius:'50%', border:'2px solid '+svc.col, opacity:0.09, animation:'pulseRing 4s ease-in-out infinite' }} />
                        <Box sx={{ display:'flex', justifyContent:'center', mb:2 }}>
                          <Box sx={{ bgcolor:svc.iconBg, p:1.8, borderRadius:2, display:'inline-flex' }}>
                            <IconComp className="hm-svc-icon" sx={{ fontSize:36, color:svc.col }} />
                          </Box>
                        </Box>
                        <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontWeight:600, fontSize:'1.1rem', mb:0.7 }}>{svc.title}</Typography>
                        <Box sx={{ width:24, height:3, bgcolor:svc.col, borderRadius:2, mb:1.5, mx:'auto' }} />
                        <Typography sx={{ color:T.ash, fontSize:'0.88rem', lineHeight:1.75 }}>{svc.desc}</Typography>
                        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap:0.5, mt:2, color:svc.col, fontSize:'0.8rem', fontWeight:700 }}>
                          Learn more
                          <ArrowForwardIcon style={{ fontSize:14 }} />
                        </Box>
                      </Box>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE 3 ════════════════════════════════════════════════════════ */}
        <Box className="hm-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ WHY CHOOSE US ══════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="lg">
            <Box className="hm-why-wrap">
              <Grid container spacing={6} alignItems="center">

                {/* Left text */}
                <Grid item xs={12} md={6}>
                  <Box className="hm-why-l" sx={{ opacity:0 }}>
                    <SectionLabel bg={T.amberLt} col={T.amber} border={T.amberMid}>Why Choose Us</SectionLabel>
                    <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600, mb:2 }}>
                      Building{' '}
                      <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Character</Box>
                      {' '}Through Education
                    </Typography>
                    <Typography sx={{ color:T.ash, fontSize:'1.05rem', lineHeight:1.9, mb:4 }}>
                      At Paavan Setu, we believe that true education goes beyond textbooks.
                      We combine academic excellence with value-based learning to create
                      well-rounded individuals ready to make a positive impact on society.
                    </Typography>
                    <Box sx={{ display:'flex', gap:1.2, flexWrap:'wrap' }}>
                      {WHY_CHIPS.map(function(chip, i) {
                        var chipColors = [
                          { bg:T.greenLt, border:T.greenMid, col:T.green },
                          { bg:T.blueLt,  border:T.blueMid,  col:T.blue  },
                          { bg:T.amberLt, border:T.amberMid, col:T.amber },
                          { bg:T.greenLt, border:T.greenMid, col:T.green },
                        ];
                        var cc = chipColors[i];
                        return (
                          <Box key={chip} className="hm-chip" sx={{ display:'inline-flex', alignItems:'center', gap:0.7, px:1.8, py:0.7, bgcolor:cc.bg, border:'1px solid '+cc.border, borderRadius:99, color:cc.col, fontSize:'0.82rem', fontWeight:700 }}>
                            <CheckCircleOutlineIcon sx={{ fontSize:13 }} />
                            {chip}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Grid>

                {/* Right — flip card */}
                <Grid item xs={12} md={6}>
                  <Box className="hm-why-r" sx={{ opacity:0 }}>
                    <Box
                      className="hm-flip-wrap"
                      onClick={function(){ if(window.innerWidth < 900) setFlipped(function(p){ return !p; }); }}
                      sx={{ cursor:{ xs:'pointer', md:'default' } }}
                    >
                      <Box
                        className="hm-flip-inner"
                        sx={{ height:{ xs:320, sm:380 }, transform:flipped?'rotateY(180deg)':'rotateY(0deg)' }}
                      >
                        {/* Front */}
                        <Box className="hm-flip-face" sx={{ background:'linear-gradient(135deg,#0e652d,#1f5b87)', boxShadow:'0 20px 48px rgba(14,101,45,0.22)' }}>
                          <Box sx={{ position:'absolute', inset:0, borderRadius:24, opacity:0.06 }} className="hm-dots" />
                          <Box sx={{ position:'absolute', top:16, right:16, width:80, height:80, borderRadius:'50%', border:'2px dashed rgba(255,255,255,0.2)', animation:'spinSlow 20s linear infinite' }} />
                          <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:{ xs:'4rem', sm:'5rem' }, color:'#fff', fontWeight:700, lineHeight:1 }}>5+</Typography>
                          <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:{ xs:'1.4rem', sm:'1.8rem' }, color:'#fff', fontWeight:500, mt:1 }}>Years of Excellence</Typography>
                          <Typography sx={{ mt:2, fontSize:'0.82rem', color:'rgba(255,255,255,0.65)', display:{ xs:'block', md:'none' } }}>
                            Tap to see our achievements
                          </Typography>
                          <Typography sx={{ mt:1.5, fontSize:'0.82rem', color:'rgba(255,255,255,0.5)', display:{ xs:'none', md:'block' } }}>
                            Hover to see our achievements
                          </Typography>
                        </Box>

                        {/* Back */}
                        <Box className="hm-flip-face hm-flip-back" sx={{ bgcolor:T.white, border:'1.5px solid '+T.greenMid, boxShadow:'0 20px 48px rgba(14,101,45,0.1)' }}>
                          <Box sx={{ position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(90deg,'+T.green+','+T.blue+')', borderRadius:'24px 24px 0 0' }} />
                          <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.green, fontWeight:700, fontSize:'1.1rem', mb:3 }}>Our Achievements</Typography>
                          {ACHIEVEMENTS.map(function(item, i) {
                            return (
                              <Box key={i} sx={{ display:'flex', alignItems:'center', gap:1.5, mb:2 }}>
                                <Box sx={{ bgcolor:T.greenLt, border:'1px solid '+T.greenMid, p:0.6, borderRadius:99, display:'flex' }}>
                                  <StarIcon sx={{ color:T.green, fontSize:14 }} />
                                </Box>
                                <Typography sx={{ color:T.ash, fontSize:{ xs:'0.9rem', sm:'1rem' }, fontWeight:500 }}>{item}</Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 4 ════════════════════════════════════════════════════════ */}
        <Box className="hm-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,20 C300,60 700,0 1100,40 C1280,55 1380,45 1440,30 L1440,60 L0,60 Z" fill="#eaf5ee" />
          </svg>
        </Box>

        {/* ══ TESTIMONIALS ══════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, background:'linear-gradient(135deg,#eaf5ee 0%,#e4eef6 100%)' }}>
          <Container maxWidth="lg">
            <Box className="hm-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.amberLt} col={T.amber} border={T.amberMid}>Testimonials</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                What{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>People Say</Box>
              </Typography>
            </Box>
            <Box className="hm-testi-grid">
              <Grid container spacing={3}>
                {TESTIMONIALS.map(function(t, i) {
                  var cardColors = [
                    { bg:T.greenLt,  border:T.greenMid, col:T.green  },
                    { bg:T.blueLt,   border:T.blueMid,  col:T.blue   },
                    { bg:T.amberLt,  border:T.amberMid, col:T.amber  },
                  ];
                  var cc = cardColors[i];
                  return (
                    <Grid item xs={12} md={4} key={i}>
                      <Box className="hm-testi-card" sx={{ opacity:0, height:'100%', bgcolor:T.white, border:'1.5px solid '+cc.border, borderRadius:4, p:3.5, boxShadow:'0 3px 14px rgba(14,101,45,0.05)', position:'relative', overflow:'hidden' }}>
                        {/* Top bar */}
                        <Box sx={{ position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(90deg,'+cc.col+','+(cc.col===T.amber?T.green:T.blue)+')' }} />
                        {/* Pulse ring */}
                        <Box sx={{ position:'absolute', bottom:-14, right:-14, width:54, height:54, borderRadius:'50%', border:'2px solid '+cc.col, opacity:0.09, animation:'pulseRing 4s ease-in-out infinite' }} />
                        {/* Quote icon */}
                        <Box sx={{ display:'inline-flex', bgcolor:cc.bg, p:1, borderRadius:2, mb:2 }}>
                          <FormatQuoteIcon sx={{ fontSize:22, color:cc.col }} />
                        </Box>
                        <Typography sx={{ color:T.ash, fontSize:'0.92rem', lineHeight:1.8, mb:3, fontStyle:'italic' }}>
                          &ldquo;{t.text}&rdquo;
                        </Typography>
                        <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>
                          <Avatar sx={{ bgcolor:t.avatarBg, fontFamily:"'Playfair Display',serif", fontWeight:700, width:38, height:38, fontSize:'1rem' }}>
                            {t.avatar}
                          </Avatar>
                          <Box sx={{ flex:1 }}>
                            <Typography sx={{ color:T.ink, fontWeight:700, fontSize:'0.92rem' }}>{t.name}</Typography>
                            <Typography sx={{ color:T.ash, fontSize:'0.75rem' }}>{t.role}</Typography>
                          </Box>
                          <Box sx={{ display:'flex', gap:0.2 }}>
                            {Array.from({ length: t.rating }).map(function(_, j) {
                              return React.createElement(StarIcon, { key:j, sx:{ fontSize:13, color:T.amber } });
                            })}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 5 ════════════════════════════════════════════════════════ */}
        <Box className="hm-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,10 C300,55 700,5 1050,35 C1250,55 1380,30 1440,20 L1440,60 L0,60 Z" fill="#fdf8f0" />
          </svg>
        </Box>

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:10, md:14 }, background:'linear-gradient(145deg,#eaf5ee 0%,#e4eef6 50%,#fdf8f0 100%)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <Box sx={{ position:'absolute', top:'10%', left:'4%', width:100, height:100, borderRadius:'50%', bgcolor:T.greenMid, opacity:0.28, animation:'floatA 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'14%', right:'5%', width:80, height:80, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.28, animation:'floatB 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box className="hm-dots-blue" sx={{ position:'absolute', inset:0, opacity:0.4, pointerEvents:'none' }} />

          <Container maxWidth="sm" sx={{ position:'relative', zIndex:1 }}>
            <Box className="hm-cta-inner" sx={{ opacity:0 }}>
              <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:T.white, color:T.green, px:2.5, py:1, borderRadius:99, mb:3, fontSize:'0.78rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', boxShadow:'0 4px 14px rgba(14,101,45,0.1)', border:'1.5px solid '+T.greenMid }}>
                Start Your Journey
              </Box>
              <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'1.9rem', md:'2.8rem' }, fontWeight:700, mb:2, lineHeight:1.2 }}>
                Ready to Discover Your{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>True Path?</Box>
              </Typography>
              <Typography sx={{ color:T.ash, fontSize:'1.05rem', mb:5, lineHeight:1.8 }}>
                Book a personalised career counselling session today and take the
                first step towards a meaningful, confident future.
              </Typography>
              <Box sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', mb:4 }}>
                <Link to="/career-counselling" className="hm-btn-green">
                  Book a Session
                  <ArrowForwardIcon style={{ fontSize:18 }} />
                </Link>
                <Link to="/contact" className="hm-btn-outline">
                  Contact Us
                </Link>
              </Box>
              <Box sx={{ display:'flex', justifyContent:'center', gap:3, flexWrap:'wrap' }}>
                {['Free consultation', 'No commitment', 'Expert guidance'].map(function(t) {
                  return (
                    <Box key={t} sx={{ display:'flex', alignItems:'center', gap:0.7, color:T.slate, fontSize:'0.84rem', fontWeight:600 }}>
                      <CheckCircleOutlineIcon sx={{ fontSize:15, color:T.green }} />
                      {t}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Container>
        </Box>

      </Box>
    </>
  );
}