import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import founderImage from '../assets/profile2.jpeg';

gsap.registerPlugin(ScrollTrigger);

/* ─── TOKENS (same palette as SchoolsWorkshops) ──────────────────────────── */
var T = {
  green:     '#0e652d',
  greenLt:   '#e6f4eb',
  greenMid:  '#c8e8d2',
  blue:      '#1f5b87',
  blueLt:    '#e4eef6',
  blueMid:   '#c2d9ee',
  amber:     '#d4891a',
  amberLt:   '#fdf0d8',
  amberMid:  '#f5d8a0',
  white:     '#ffffff',
  snow:      '#fafdf7',
  cream:     '#fdf8f0',
  parchment: '#f5f0e8',
  ink:       '#1a2a1a',
  slate:     '#3d5a4a',
  ash:       '#6b7c72',
};

/* ─── GLOBAL CSS ─────────────────────────────────────────────────────────── */
var CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');",
  "*, *::before, *::after { box-sizing: border-box; }",
  ".ab-page { font-family: 'DM Sans', sans-serif; }",

  /* floating shapes */
  "@keyframes floatA { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(12px,-18px) rotate(3deg)} 66%{transform:translate(-8px,10px) rotate(-2deg)} }",
  "@keyframes floatB { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(-14px,10px) rotate(-4deg)} 66%{transform:translate(10px,-12px) rotate(2deg)} }",
  "@keyframes floatC { 0%,100%{transform:translate(0,0)} 50%{transform:translate(8px,-14px)} }",
  "@keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }",
  "@keyframes pulseRing { 0%,100%{transform:scale(1);opacity:0.45} 50%{transform:scale(1.08);opacity:0.2} }",
  "@keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }",
  "@keyframes shimmerBar { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }",

  /* dots */
  ".ab-dots { background-image:radial-gradient(circle, rgba(14,101,45,0.11) 1.5px, transparent 1.5px);background-size:24px 24px; }",
  ".ab-dots-blue { background-image:radial-gradient(circle, rgba(31,91,135,0.09) 1.5px, transparent 1.5px);background-size:20px 20px; }",

  /* buttons */
  ".ab-btn-blue { display:inline-flex;align-items:center;gap:8px;background:#1f5b87;color:#fff;border:none;border-radius:50px;padding:14px 36px;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s; }",
  ".ab-btn-blue:hover { background:#0e652d;transform:translateY(-3px);box-shadow:0 12px 28px rgba(31,91,135,0.26); }",
  ".ab-btn-outline { display:inline-flex;align-items:center;gap:8px;background:transparent;color:#0e652d;border:2px solid #0e652d;border-radius:50px;padding:12px 32px;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s; }",
  ".ab-btn-outline:hover { background:#0e652d;color:#fff;transform:translateY(-3px); }",

  /* cards */
  ".ab-value-card { transition:transform 0.32s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s,border-color 0.3s; }",
  ".ab-value-card:hover { transform:translateY(-7px) rotate(-0.3deg);box-shadow:0 20px 40px rgba(14,101,45,0.11) !important; }",
  ".ab-value-card:hover .ab-val-icon { transform:scale(1.18) rotate(-6deg); }",
  ".ab-val-icon { transition:transform 0.38s cubic-bezier(0.34,1.56,0.64,1);display:inline-block; }",

  ".ab-mission-card { transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }",
  ".ab-mission-card:hover { transform:translateY(-6px);box-shadow:0 18px 36px rgba(14,101,45,0.1) !important; }",

  ".ab-journey-item { transition:transform 0.3s,box-shadow 0.3s; }",
  ".ab-journey-item:hover .ab-journey-box { border-color:#0e652d !important;box-shadow:0 8px 24px rgba(14,101,45,0.08); }",

  /* credential chip */
  ".ab-cred-chip { transition:all 0.25s; }",
  ".ab-cred-chip:hover { transform:scale(1.04);background:#e6f4eb !important;color:#0e652d !important;border-color:#c8e8d2 !important; }",

  /* wave */
  ".ab-wave-wrap { line-height:0;overflow:hidden; }",
  ".ab-wave-wrap svg { display:block;width:100%; }",

  /* shimmer on image frame */
  ".ab-img-frame::after { content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%);animation:shimmerBar 3.5s ease-in-out infinite;pointer-events:none; }",
].join('\n');

/* ─── DATA ────────────────────────────────────────────────────────────────── */
var VALUES = [
  { icon:'🌟', title:'Integrity',      desc:"We believe in transparent, honest guidance — always putting the student's best interests first.", bg:T.amberLt, border:T.amberMid, col:T.amber },
  { icon:'❤️', title:'Compassion',     desc:'Every student is seen, heard, and valued as a unique individual with a powerful story to tell.', bg:'#fde8f0', border:'#f5b8cc', col:'#c0395a' },
  { icon:'📚', title:'Excellence',     desc:'We bring depth, research, and genuine expertise to every session, workshop, and publication.', bg:T.blueLt, border:T.blueMid, col:T.blue },
  { icon:'🌱', title:'Growth',         desc:'We believe in lifelong learning — for our students, for teachers, and for ourselves.', bg:T.greenLt, border:T.greenMid, col:T.green },
  { icon:'🤝', title:'Collaboration',  desc:'We work alongside families and schools as true partners in a child\'s development.', bg:T.amberLt, border:T.amberMid, col:T.amber },
  { icon:'🔥', title:'Purpose',        desc:'We are driven by a deep passion for helping young people discover and live their true purpose.', bg:T.blueLt, border:T.blueMid, col:T.blue },
];

var JOURNEY = [
  { year:'2014', title:'Founded Paavan SETU',   desc:'Started with one-on-one career counselling sessions in Surat.', col:T.green, bg:T.greenLt, border:T.greenMid },
  { year:'2016', title:'First School Workshops',desc:'Expanded to conduct value education workshops in 5 schools.', col:T.blue, bg:T.blueLt, border:T.blueMid },
  { year:'2018', title:'First Book Published',  desc:'Authored and launched "Setu to Success" — became a bestseller.', col:T.amber, bg:T.amberLt, border:T.amberMid },
  { year:'2020', title:'Online Counselling',    desc:'Launched digital counselling to reach students across India.', col:T.green, bg:T.greenLt, border:T.greenMid },
  { year:'2022', title:'50+ Schools Milestone', desc:'Crossed 50 school partnerships and 10,000 students reached.', col:T.blue, bg:T.blueLt, border:T.blueMid },
  { year:'2024', title:'Expanding Nationwide',  desc:'Partnerships with schools and NGOs across 5 states.', col:T.amber, bg:T.amberLt, border:T.amberMid },
];

var CREDS = [
  'B.Com (Accountancy & Business Management)',
  'Mass Communication, Journalism & Media Studies',
  'Trained Global Career Counsellor (GCC)',
  'Shrimad Bhagavad Gita Course',
  'Soft Skills & Personality Development',
  'Mental Health of Students in Higher Education',
];

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
export default function About() {

  useEffect(function() {
    /* Hero */
    gsap.fromTo('.ab-hero-anim',
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.13, ease: 'power3.out', delay: 0.15 }
    );

    /* Founder section */
    gsap.fromTo('.ab-founder-l',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-founder-section', start: 'top 78%', once: true } }
    );
    gsap.fromTo('.ab-founder-r',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-founder-section', start: 'top 78%', once: true } }
    );

    /* Mission cards */
    gsap.fromTo('.ab-mission-card',
      { opacity: 0, y: 50, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.ab-mission-grid', start: 'top 82%', once: true } }
    );

    /* Value cards */
    gsap.fromTo('.ab-value-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-values-grid', start: 'top 82%', once: true } }
    );

    /* Journey items */
    gsap.fromTo('.ab-journey-item',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-journey-list', start: 'top 82%', once: true } }
    );

    /* Section headings */
    gsap.utils.toArray('.ab-section-head').forEach(function(el) {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
      );
    });

    /* CTA */
    gsap.fromTo('.ab-cta-inner',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: '.ab-cta-inner', start: 'top 88%', once: true } }
    );

    return function() { ScrollTrigger.getAll().forEach(function(t) { t.kill(); }); };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Box className="ab-page" sx={{ bgcolor: T.snow, pt: 8, overflowX: 'hidden' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <Box sx={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(145deg, #f0faf3 0%, #e8f4ff 55%, #fdf8f0 100%)',
          py: { xs: 10, md: 14 },
        }}>
          {/* Floating blobs */}
          <Box sx={{ position:'absolute', top:50, left:'5%', width:130, height:130, borderRadius:'40% 60% 55% 45%', bgcolor:T.greenMid, opacity:0.4, animation:'floatA 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', top:'20%', right:'7%', width:100, height:100, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.38, animation:'floatB 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'16%', left:'14%', width:65, height:65, borderRadius:'50%', bgcolor:'#fde8b8', opacity:0.65, animation:'floatC 7s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'12%', right:'16%', width:85, height:85, borderRadius:'45% 55% 60% 40%', bgcolor:T.greenMid, opacity:0.32, animation:'floatA 9s ease-in-out infinite 2s', pointerEvents:'none' }} />
          {/* Spinning rings */}
          <Box sx={{ position:'absolute', top:'6%', right:'20%', width:160, height:160, borderRadius:'50%', border:'2px dashed rgba(14,101,45,0.16)', animation:'spinSlow 20s linear infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'10%', left:'18%', width:110, height:110, borderRadius:'50%', border:'2px dashed rgba(31,91,135,0.14)', animation:'spinSlow 26s linear infinite reverse', pointerEvents:'none' }} />
          {/* Dot grid */}
          <Box className="ab-dots" sx={{ position:'absolute', inset:0, opacity:0.55, pointerEvents:'none' }} />

          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ textAlign:'center', position:'relative', zIndex:1 }}>

              {/* Badge */}
              <Box className="ab-hero-anim" sx={{
                display:'inline-flex', alignItems:'center', gap:1, opacity:0,
                bgcolor:'#fff', border:'1.5px solid ' + T.greenMid,
                color:T.green, px:2.5, py:1, borderRadius:99, mb:4,
                fontSize:'0.78rem', fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase',
                boxShadow:'0 4px 12px rgba(14,101,45,0.1)',
              }}>
                <span style={{ fontSize:'1rem' }}>🌟</span>
                Our Story
              </Box>

              {/* Headline */}
              <Typography className="ab-hero-anim" variant="h1" sx={{
                fontFamily:"'Playfair Display', Georgia, serif",
                color:T.ink, fontSize:{ xs:'2.5rem', sm:'3rem', md:'4.6rem' },
                fontWeight:700, lineHeight:1.08, mb:2.5, opacity:0, letterSpacing:'-0.025em',
              }}>
                About{' '}
                <Box component="span" sx={{
                  background:'linear-gradient(135deg, #0e652d 0%, #1f5b87 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                }}>
                  Paavan SETU
                </Box>
              </Typography>

              {/* Tagline */}
              <Typography className="ab-hero-anim" sx={{
                color:T.slate, fontSize:{ xs:'1rem', sm:'1.1rem', md:'1.22rem' },
                lineHeight:1.8, mb:6, maxWidth:560, mx:'auto', opacity:0, fontWeight:400,
              }}>
                Building bridges between{' '}
                <strong style={{ color:T.green }}>values</strong> and{' '}
                <strong style={{ color:T.blue }}>education</strong>,
                one student at a time.
              </Typography>

              {/* Quick stats - FIXED MOBILE ALIGNMENT */}
              <Box className="ab-hero-anim" sx={{ opacity:0, width: '100%' }}>
                <Grid 
                  container 
                  spacing={{ xs: 1.5, sm: 2, md: 2.5 }}
                  justifyContent="center" 
                  alignItems="stretch"
                  sx={{ 
                    width: '100%',
                    m: 0,
                    p: 0,
                  }}
                >
                  {[
                    { num:'5+',    label:'Years Experience', icon:'📅', bg:T.blueLt,  border:T.blueMid,  col:T.blue  },
                    { num:'20+',   label:'Schools Visited',  icon:'🏫', bg:T.greenLt, border:T.greenMid, col:T.green },
                    { num:'2000+',   label:'Students Reached', icon:'👩‍🎓', bg:T.amberLt, border:T.amberMid, col:T.amber },
                    { num:'20+',    label:'School Partners',  icon:'🤝', bg:T.blueLt,  border:T.blueMid,  col:T.blue  },
                  ].map(function(s, i) {
                    return (
                      <Grid item xs={6} sm={3} key={i} sx={{ display: 'flex', p: 0 }}>
                        <Box sx={{
                          bgcolor:s.bg, 
                          border:'1.5px solid ' + s.border,
                          borderRadius: { xs: 2, sm: 3 }, 
                          p: { xs: 1.5, sm: 2, md: 2.5 }, 
                          textAlign:'center',
                          boxShadow:'0 4px 14px rgba(14,101,45,0.07)',
                          position:'relative', 
                          overflow:'hidden',
                          width: '100%',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 28px rgba(14,101,45,0.12)',
                          }
                        }}>
                          <Box sx={{ position:'absolute', bottom:-18, right:-18, width:60, height:60, borderRadius:'50%', border:'2px solid ' + s.col, opacity:0.12, animation:'pulseRing 3s ease-in-out infinite' }} />
                          <Typography sx={{ fontSize:{ xs: '1.4rem', sm: '1.6rem', md: '1.8rem' }, mb:0.5 }}>{s.icon}</Typography>
                          <Typography sx={{ 
                            fontFamily:"'Playfair Display', serif", 
                            fontSize:{ xs: '1.3rem', sm: '1.6rem', md: '1.85rem' }, 
                            fontWeight:700, 
                            color:s.col, 
                            lineHeight:1 
                          }}>
                            {s.num}
                          </Typography>
                          <Typography sx={{ 
                            color:T.ash, 
                            fontSize:{ xs: '0.65rem', sm: '0.72rem', md: '0.78rem' }, 
                            mt: 0.8, 
                            fontWeight:600,
                            letterSpacing: '0.3px',
                            lineHeight: 1.2
                          }}>
                            {s.label}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 1 ════════════════════════════════════════════════════════ */}
        <Box className="ab-wave-wrap" sx={{ mt:'-1px' }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ FOUNDER ═══════════════════════════════════════════════════════ */}
        <Box className="ab-founder-section" sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs:5, md:8 }} alignItems="center">

              {/* Image column */}
              <Grid item xs={12} md={5}>
                <Box className="ab-founder-l" sx={{ opacity:0, position:'relative' }}>

                  {/* Main image frame */}
                  <Box className="ab-img-frame" sx={{
                    width:'100%', aspectRatio:'3/4',
                    borderRadius:'28px', overflow:'hidden',
                    border:'2px solid ' + T.greenMid,
                    boxShadow:'0 24px 60px rgba(14,101,45,0.14)',
                    position:'relative',
                  }}>
                    <Box
                      component="img"
                      src={founderImage}
                      alt="Shweta Kothari - Founder Paavan SETU"
                      sx={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}
                    />
                    {/* Soft gradient overlay */}
                    <Box sx={{ position:'absolute', bottom:0, left:0, right:0, height:'30%', background:'linear-gradient(to top, rgba(14,101,45,0.12), transparent)' }} />
                  </Box>

                  {/* Floating badge — years */}
                  <Box sx={{
                    position:'absolute', top:24, right:-20,
                    bgcolor:T.white, border:'1.5px solid ' + T.greenMid,
                    borderRadius:3, p:2, textAlign:'center',
                    boxShadow:'0 8px 28px rgba(14,101,45,0.12)',
                    minWidth:72,
                  }}>
                    <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:'1.9rem', fontWeight:700, color:T.green, lineHeight:1 }}>10+</Typography>
                    <Typography sx={{ fontSize:'0.68rem', color:T.ash, fontWeight:600, mt:0.3, letterSpacing:0.5 }}>Years</Typography>
                  </Box>

                  {/* Floating badge — schools */}
                  <Box sx={{
                    position:'absolute', bottom:32, left:-20,
                    bgcolor:T.blueLt, border:'1.5px solid ' + T.blueMid,
                    borderRadius:3, p:2, textAlign:'center',
                    boxShadow:'0 8px 24px rgba(31,91,135,0.12)',
                    minWidth:80,
                  }}>
                    <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:'1.9rem', fontWeight:700, color:T.blue, lineHeight:1 }}>200+</Typography>
                    <Typography sx={{ fontSize:'0.68rem', color:T.ash, fontWeight:600, mt:0.3, letterSpacing:0.5 }}>Schools</Typography>
                  </Box>

                  {/* Decorative ring behind image */}
                  <Box sx={{ position:'absolute', inset:-12, borderRadius:'32px', border:'2px dashed rgba(14,101,45,0.13)', animation:'spinSlow 30s linear infinite', pointerEvents:'none', zIndex:-1 }} />
                </Box>
              </Grid>

              {/* Text column */}
              <Grid item xs={12} md={7}>
                <Box className="ab-founder-r" sx={{ opacity:0 }}>

                  {/* Label */}
                  <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:T.greenLt, color:T.green, px:2, py:0.7, borderRadius:99, fontSize:'0.75rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', mb:2, border:'1px solid ' + T.greenMid }}>
                    Meet Our Founder
                  </Box>

                  <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', sm:'2.5rem', md:'3rem' }, fontWeight:600, mb:0.5, lineHeight:1.15 }}>
                    Shweta Kothari
                  </Typography>
                  <Typography sx={{ color:T.green, fontSize:'1.05rem', mb:3.5, fontStyle:'italic', fontFamily:"'Playfair Display',serif" }}>
                    Founder &ndash; Paavan SETU
                  </Typography>

                  {[
                    "I have been associated with the field of education for over 10 years, working closely with students, parents, teachers, and school leadership. During my professional journey, I had the opportunity to visit over 200 schools across Gujarat, which gave me valuable exposure to real classroom environments, student behaviour, and the practical challenges faced by educators.",
                    "My experience as an Education Counsellor at Arrcode allowed me to interact directly with educators and learners, helping me understand the diverse needs, aspirations, and pressures within the education system. These on-ground interactions have strongly shaped my counselling approach and my work with schools.",
                    "Alongside counselling, I have been actively involved in educational content development, working on books for kindergarten learners as well as value-education books for higher classes. These books are currently being followed as part of the curriculum in several schools.",
                    "Through Paavan SETU, I bring together my experience in education, counselling, and value-based learning to support holistic student development.",
                  ].map(function(para, i) {
                    return (
                      <Typography key={i} sx={{ color:T.ash, lineHeight:1.9, mb:2, fontSize:'0.98rem' }}>
                        {para}
                      </Typography>
                    );
                  })}

                  {/* Credentials */}
                  <Box sx={{ display:'flex', flexWrap:'wrap', gap:1, mt:3 }}>
                    {CREDS.map(function(c, i) {
                      return (
                        <Box key={i} className="ab-cred-chip" sx={{
                          px:1.6, py:0.6, borderRadius:99,
                          bgcolor:i % 3 === 0 ? T.greenLt : i % 3 === 1 ? T.blueLt : T.amberLt,
                          border:'1px solid ' + (i % 3 === 0 ? T.greenMid : i % 3 === 1 ? T.blueMid : T.amberMid),
                          color:i % 3 === 0 ? T.green : i % 3 === 1 ? T.blue : T.amber,
                          fontSize:'0.78rem', fontWeight:600, cursor:'default',
                        }}>
                          {c}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE 2 ════════════════════════════════════════════════════════ */}
        <Box className="ab-wave-wrap">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,0 720,60 1080,30 C1260,15 1380,10 1440,0 L1440,60 L0,60 Z" fill="#f0faf3" />
          </svg>
        </Box>

        {/* ══ MISSION & VISION ══════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, background:'linear-gradient(135deg, #f0faf3 0%, #eaf4ff 100%)' }}>
          <Container maxWidth="lg">
            <Box className="ab-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:T.blueLt, color:T.blue, px:2, py:0.7, borderRadius:99, fontSize:'0.75rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', mb:2, border:'1px solid ' + T.blueMid }}>
                What Drives Us
              </Box>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Mission &amp;{' '}
                <Box component="span" sx={{ color:T.blue, fontStyle:'italic' }}>Vision</Box>
              </Typography>
            </Box>

            <Box className="ab-mission-grid">
              <Grid container spacing={3.5}>
                {[
                  {
                    icon:'🎯', label:'Our Mission', col:T.green, bg:T.white, accentBorder:T.greenMid, accentBar:T.green,
                    text:'To bring values, clarity, and direction back into education by providing holistic learning solutions that nurture both academic excellence and strong character.',
                  },
                  {
                    icon:'🌟', label:'Our Vision', col:T.blue, bg:T.white, accentBorder:T.blueMid, accentBar:T.blue,
                    text:'A future where every student makes informed decisions with confidence, understanding their unique strengths and purpose, supported by value-based education.',
                  },
                ].map(function(card, i) {
                  return (
                    <Grid item xs={12} md={6} key={i}>
                      <Box className="ab-mission-card" sx={{
                        opacity:0, height:'100%', bgcolor:card.bg,
                        border:'1.5px solid ' + card.accentBorder,
                        borderRadius:4, overflow:'hidden',
                        boxShadow:'0 4px 18px rgba(14,101,45,0.06)',
                        position:'relative',
                      }}>
                        {/* Top accent bar */}
                        <Box sx={{ height:5, background:'linear-gradient(90deg, ' + card.accentBar + ' 0%, ' + (card.col === T.green ? T.blue : T.green) + ' 100%)' }} />
                        {/* Dots in corner */}
                        <Box className="ab-dots" sx={{ position:'absolute', top:0, right:0, width:110, height:110, opacity:0.45, pointerEvents:'none' }} />
                        <Box sx={{ p:{ xs:3, md:4.5 }, position:'relative', zIndex:1 }}>
                          <Typography sx={{ fontSize:'3rem', mb:2 }}>{card.icon}</Typography>
                          <Typography variant="h4" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, mb:2, fontWeight:600, fontSize:'1.6rem' }}>
                            {card.label}
                          </Typography>
                          {/* Accent rule */}
                          <Box sx={{ width:40, height:3, bgcolor:card.col, borderRadius:2, mb:2.5 }} />
                          <Typography sx={{ color:T.ash, lineHeight:1.9, fontSize:'1rem' }}>
                            {card.text}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 3 ════════════════════════════════════════════════════════ */}
        <Box className="ab-wave-wrap">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ CORE VALUES ═══════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="lg">
            <Box className="ab-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:T.greenLt, color:T.green, px:2, py:0.7, borderRadius:99, fontSize:'0.75rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', mb:2, border:'1px solid ' + T.greenMid }}>
                What We Stand For
              </Box>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Our{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Core Values</Box>
              </Typography>
            </Box>

            <Box className="ab-values-grid">
              <Grid container spacing={3}>
                {VALUES.map(function(v, i) {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Box className="ab-value-card" sx={{
                        opacity:0, p:3.5, height:'100%',
                        bgcolor:v.bg, border:'1.5px solid ' + v.border,
                        borderRadius:4,
                        boxShadow:'0 3px 14px rgba(14,101,45,0.05)',
                        position:'relative', overflow:'hidden',
                      }}>
                        {/* Subtle pulse ring decoration */}
                        <Box sx={{ position:'absolute', bottom:-20, right:-20, width:80, height:80, borderRadius:'50%', border:'2px solid ' + v.col, opacity:0.1, animation:'pulseRing 4s ease-in-out infinite' }} />
                        <Typography className="ab-val-icon" sx={{ fontSize:'2.6rem', mb:2, display:'block' }}>{v.icon}</Typography>
                        <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontWeight:600, fontSize:'1.15rem', mb:1.2 }}>{v.title}</Typography>
                        {/* Small accent dash */}
                        <Box sx={{ width:28, height:3, bgcolor:v.col, borderRadius:2, mb:1.5 }} />
                        <Typography sx={{ color:T.ash, fontSize:'0.91rem', lineHeight:1.85 }}>{v.desc}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 4 ════════════════════════════════════════════════════════ */}
        <Box className="ab-wave-wrap">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,20 C300,60 700,0 1100,40 C1280,55 1380,45 1440,30 L1440,60 L0,60 Z" fill="#eaf5ee" />
          </svg>
        </Box>

        

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════ */}
        <Box sx={{
          py:{ xs:10, md:14 },
          background:'linear-gradient(145deg, #eaf5ee 0%, #e4eef6 50%, #fdf8f0 100%)',
          position:'relative', overflow:'hidden', textAlign:'center',
        }}>
          {/* Floating shapes */}
          <Box sx={{ position:'absolute', top:'12%', left:'4%', width:100, height:100, borderRadius:'50%', bgcolor:T.greenMid, opacity:0.28, animation:'floatA 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'14%', right:'5%', width:80, height:80, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.28, animation:'floatB 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box className="ab-dots-blue" sx={{ position:'absolute', inset:0, opacity:0.45, pointerEvents:'none' }} />

          <Container maxWidth="sm" sx={{ position:'relative', zIndex:1 }}>
            <Box className="ab-cta-inner" sx={{ opacity:0 }}>
              <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:T.white, color:T.green, px:2.5, py:1, borderRadius:99, fontSize:'0.78rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', mb:3, boxShadow:'0 4px 14px rgba(14,101,45,0.1)', border:'1.5px solid ' + T.greenMid }}>
                Let&apos;s Connect
              </Box>

              <Typography sx={{
                fontFamily:"'Playfair Display',serif",
                color:T.ink, fontSize:{ xs:'1.9rem', md:'2.8rem' },
                fontWeight:700, mb:2, lineHeight:1.2,
              }}>
                Want to know more about{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>our journey?</Box>
              </Typography>

              <Typography sx={{ color:T.slate, fontSize:'1.05rem', mb:5, lineHeight:1.8 }}>
                We would love to share more about our work, our books, and how we can support your school or student.
              </Typography>

              <Box sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', mb:4 }}>
                <Link to="/contact" className="ab-btn-blue">
                  Get in Touch
                </Link>
                <a href="https://wa.me/916351113766" target="_blank" rel="noreferrer" className="ab-btn-outline">
                  WhatsApp Us
                </a>
              </Box>

              <Box sx={{ display:'flex', justifyContent:'center', gap:3, flexWrap:'wrap' }}>
                {['5+ Years Experience', 'Free Consultation', 'Across India'].map(function(t) {
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