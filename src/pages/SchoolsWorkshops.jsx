import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GroupsIcon from '@mui/icons-material/Groups';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* ─── TOKENS ─────────────────────────────────────────────────────────────── */
var T = {
  green:     '#0e652d',
  greenLt:   '#e6f4eb',
  greenMid:  '#c8e8d2',
  blue:      '#1f5b87',
  blueLt:    '#e4eef6',
  blueMid:   '#c2d9ee',
  amber:     '#d4891a',
  amberLt:   '#fdf0d8',
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
  "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');",
  "*, *::before, *::after { box-sizing: border-box; }",
  ".sw-page { font-family: 'DM Sans', sans-serif; }",

  /* floating blob keyframes */
  "@keyframes floatA { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(12px,-18px) rotate(3deg)} 66%{transform:translate(-8px,10px) rotate(-2deg)} }",
  "@keyframes floatB { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(-14px,10px) rotate(-4deg)} 66%{transform:translate(10px,-12px) rotate(2deg)} }",
  "@keyframes floatC { 0%,100%{transform:translate(0,0)} 50%{transform:translate(8px,-14px)} }",
  "@keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }",
  "@keyframes pulseRing { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.08);opacity:0.25} }",
  "@keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }",
  "@keyframes countUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }",
  "@keyframes wave { 0%,100%{d:path('M0,40 C100,10 200,70 300,40 C400,10 500,70 600,40 L600,80 L0,80 Z')} 50%{d:path('M0,40 C100,70 200,10 300,40 C400,70 500,10 600,40 L600,80 L0,80 Z')} }",
  "@keyframes slideInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }",
  "@keyframes slideInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }",
  "@keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }",

  /* buttons */
  ".sw-btn-blue { display:inline-flex;align-items:center;gap:8px;background:#1f5b87;color:#fff;border:none;border-radius:50px;padding:14px 32px;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s; }",
  ".sw-btn-blue:hover { background:#0e652d;transform:translateY(-3px);box-shadow:0 12px 28px rgba(31,91,135,0.28); }",
  ".sw-btn-wa { display:inline-flex;align-items:center;gap:8px;background:#e6f4eb;color:#0e652d;border:2px solid #c8e8d2;border-radius:50px;padding:12px 28px;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s; }",
  ".sw-btn-wa:hover { background:#0e652d;color:#fff;border-color:#0e652d;transform:translateY(-3px);box-shadow:0 12px 28px rgba(14,101,45,0.22); }",
  ".sw-btn-green-pill { display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#0e652d;color:#fff;border:none;border-radius:50px;padding:16px 40px;font-size:1rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s;min-width:260px; }",
  ".sw-btn-green-pill:hover { background:#1f5b87;transform:translateY(-3px);box-shadow:0 14px 32px rgba(14,101,45,0.28); }",
  ".sw-btn-outline-green { display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;color:#0e652d;border:2px solid #0e652d;border-radius:50px;padding:14px 36px;font-size:1rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s;min-width:260px; }",
  ".sw-btn-outline-green:hover { background:#0e652d;color:#fff;transform:translateY(-3px); }",

  /* workshop cards */
  ".sw-wcard { transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s; }",
  ".sw-wcard:hover { transform:translateY(-8px) rotate(-0.4deg);box-shadow:0 24px 48px rgba(14,101,45,0.13) !important; }",
  ".sw-wcard:hover .sw-wcard-icon { transform:scale(1.12) rotate(-5deg); }",
  ".sw-wcard-icon { transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1); display:inline-flex; }",
  ".sw-highlight-tag { transition:all 0.25s; }",
  ".sw-highlight-tag:hover { transform:scale(1.05); }",

  /* stat cards */
  ".sw-stat-card { transition:transform 0.3s,box-shadow 0.3s; }",
  ".sw-stat-card:hover { transform:translateY(-5px);box-shadow:0 16px 36px rgba(14,101,45,0.12) !important; }",

  /* logo tiles */
  ".sw-logo-tile { transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1); }",
  ".sw-logo-tile:hover { transform:scale(1.15) rotate(-4deg);background:#e6f4eb !important; }",

  /* decorative dots grid */
  ".sw-dots { background-image:radial-gradient(circle, rgba(14,101,45,0.12) 1.5px, transparent 1.5px);background-size:24px 24px; }",
  ".sw-dots-blue { background-image:radial-gradient(circle, rgba(31,91,135,0.1) 1.5px, transparent 1.5px);background-size:20px 20px; }",

  /* wavy divider */
  ".sw-wave-wrap { line-height:0;overflow:hidden; }",
  ".sw-wave-wrap svg { display:block;width:100%; }",
].join('\n');

/* ─── DATA ────────────────────────────────────────────────────────────────── */
var WORKSHOPS = [
  {
    Icon: SchoolIcon,
    title: 'Student Development Workshops',
    duration: '1-2 Hours',
    audience: 'Class 1-12',
    desc: 'Interactive sessions focusing on life skills, emotional intelligence, value education, and character building for students across all grade levels.',
    highlights: ['Life skill activities', 'Emotional intelligence', 'Group exercises', 'Take-home workbook'],
    accentBg: T.blueLt,
    accentBorder: T.blueMid,
    accentColor: T.blue,
    iconBg: '#ddeaf5',
  },
  {
    Icon: PeopleAltIcon,
    title: 'Parent Engagement Sessions',
    duration: '1-2 Hours',
    audience: 'Parents',
    desc: 'Guidance for parents on child psychology, academic support, career planning, and building stronger parent-child relationships.',
    highlights: ['Child psychology', 'Academic support', 'Career awareness', 'Live Q&A'],
    accentBg: T.greenLt,
    accentBorder: T.greenMid,
    accentColor: T.green,
    iconBg: '#c8e8d2',
  },
  {
    Icon: AutoStoriesIcon,
    title: 'Teacher Training Programs',
    duration: '1-2 Hours',
    audience: 'Teachers',
    desc: 'Professional development for educators on value-based teaching, classroom management, and student counselling techniques.',
    highlights: ['Value-based teaching', 'Classroom management', 'Student counselling', 'Action planning'],
    accentBg: T.amberLt,
    accentBorder: '#f5d8a0',
    accentColor: T.amber,
    iconBg: '#fde8b8',
  },
  {
    Icon: IntegrationInstructionsIcon,
    title: 'Value Education Integration',
    duration: 'Customized',
    audience: 'Institutions',
    desc: 'Comprehensive programs to integrate value-based education into school curriculum using our books and proven teaching methodologies.',
    highlights: ['Curriculum mapping', 'Book integration', 'Peer learning', 'Progress tracking'],
    accentBg: T.greenLt,
    accentBorder: T.greenMid,
    accentColor: T.green,
    iconBg: '#c8e8d2',
  },
];

var STATS = [
  { num: '20+',    label: 'Schools Partnered',  icon: '🏫', bg: T.blueLt,    col: T.blue  },
  { num: '2000+',label: 'Students Reached',   icon: '👩‍🎓', bg: T.greenLt,  col: T.green },
  // { num: '15+',    label: 'Cities Covered',     icon: '📍', bg: T.amberLt,  col: T.amber },
  { num: '95%',    label: 'Satisfaction Rate',  icon: '🏆', bg: T.blueLt,   col: T.blue  },
];

var LOGOS = ['🏫','🏛','🎓','📚','🌟','⭐','🏆','🌱','🎯'];

// '🌿'

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
export default function SchoolsWorkshops() {

  useEffect(function() {
    /* Hero stagger */
    gsap.fromTo('.sw-hero-anim',
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.13, ease: 'power3.out', delay: 0.15 }
    );

    /* Floating blobs (continuous) — no scroll trigger needed */

    /* Stats count-up feel */
    gsap.fromTo('.sw-stat-card',
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.sw-stats-grid', start: 'top 82%', once: true } }
    );

    /* Workshop cards — alternate slide in */
    gsap.utils.toArray('.sw-wcard').forEach(function(card, i) {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true, delay: i * 0.05 } }
      );
    });

    /* Section headings */
    gsap.utils.toArray('.sw-section-head').forEach(function(el) {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    });

    /* Partners row */
    gsap.fromTo('.sw-logo-tile',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)',
        scrollTrigger: { trigger: '.sw-logos-row', start: 'top 85%', once: true } }
    );

    /* CTA section */
    gsap.fromTo('.sw-cta-inner',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: '.sw-cta-inner', start: 'top 88%', once: true } }
    );

    /* Trust strip */
    gsap.fromTo('.sw-trust-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.sw-trust-strip', start: 'top 85%', once: true } }
    );

    return function() { ScrollTrigger.getAll().forEach(function(t) { t.kill(); }); };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Box className="sw-page" sx={{ bgcolor: T.snow, pt: 8, overflowX: 'hidden' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <Box sx={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(145deg, #f0faf3 0%, #e8f4ff 55%, #fdf8f0 100%)',
          py: { xs: 10, md: 14 },
        }}>
          {/* Floating decorative shapes */}
          <Box sx={{ position:'absolute', top:60, left:'6%', width:120, height:120, borderRadius:'40% 60% 55% 45%', bgcolor:T.greenMid, opacity:0.45, animation:'floatA 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', top:'15%', right:'8%', width:90, height:90, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.4, animation:'floatB 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'18%', left:'12%', width:60, height:60, borderRadius:'50%', bgcolor:'#fde8b8', opacity:0.7, animation:'floatC 7s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'10%', right:'15%', width:80, height:80, borderRadius:'45% 55% 60% 40%', bgcolor:T.greenMid, opacity:0.35, animation:'floatA 9s ease-in-out infinite 2s', pointerEvents:'none' }} />
          {/* Spinning dotted ring */}
          <Box sx={{ position:'absolute', top:'8%', right:'22%', width:150, height:150, borderRadius:'50%', border:'2px dashed rgba(14,101,45,0.18)', animation:'spinSlow 18s linear infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'12%', left:'20%', width:100, height:100, borderRadius:'50%', border:'2px dashed rgba(31,91,135,0.15)', animation:'spinSlow 22s linear infinite reverse', pointerEvents:'none' }} />
          {/* Dots grid */}
          <Box className="sw-dots" sx={{ position:'absolute', inset:0, opacity:0.6, pointerEvents:'none' }} />

          <Container maxWidth="lg">
            <Box sx={{ textAlign:'center', position:'relative', zIndex:1 }}>

              {/* Badge */}
              <Box className="sw-hero-anim" sx={{
                display:'inline-flex', alignItems:'center', gap:1, opacity:0,
                bgcolor:'#fff', border:'1.5px solid ' + T.greenMid,
                color:T.green, px:2.5, py:1, borderRadius:99, mb:4,
                fontSize:'0.78rem', fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase',
                boxShadow:'0 4px 12px rgba(14,101,45,0.1)',
              }}>
                <span style={{ fontSize:'1rem' }}>🏫</span>
                Transformative School Programmes
              </Box>

              {/* Headline */}
              <Typography className="sw-hero-anim" variant="h1" sx={{
                fontFamily:"'Playfair Display', Georgia, serif",
                color:T.ink, fontSize:{ xs:'2.8rem', md:'4.6rem' },
                fontWeight:700, lineHeight:1.08, mb:2.5, opacity:0, letterSpacing:'-0.025em',
              }}>
                Schools &amp;{' '}
                <Box component="span" sx={{
                  color:T.blue,
                  background:'linear-gradient(135deg, #1f5b87 0%, #0e652d 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                  backgroundClip:'text',
                }}>
                  Workshops
                </Box>
              </Typography>

              {/* Subline */}
              <Typography className="sw-hero-anim" sx={{
                color:T.slate, fontSize:{ xs:'1.05rem', md:'1.25rem' },
                lineHeight:1.8, mb:6, maxWidth:620, mx:'auto', opacity:0, fontWeight:400,
              }}>
                Bringing <strong style={{ color:T.green }}>career guidance</strong> and{' '}
                <strong style={{ color:T.blue }}>value education</strong> to students,
                teachers, and parents across Gujarat.
              </Typography>

              {/* CTAs */}
              <Box className="sw-hero-anim" sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', opacity:0, mb:10 }}>
                <Link to="/contact" className="sw-btn-blue">
                  <CalendarTodayIcon sx={{ fontSize:18 }} />
                  Schedule a Workshop
                </Link>
                <a className="sw-btn-wa" href="https://wa.me/916351113766" target="_blank" rel="noreferrer">
                  <WhatsAppIcon sx={{ fontSize:18 }} />
                  WhatsApp Us
                </a>
              </Box>

              {/* ── STATS ── */}
              <Box className="sw-stats-grid">
                <Grid container spacing={3} justifyContent="center">
                  {STATS.map(function(s, i) {
                    return (
                      <Grid item xs={6} sm={3} key={i}>
                        <Box className="sw-stat-card" sx={{
                          opacity:0, bgcolor:s.bg, border:'1.5px solid',
                          borderColor: i % 2 === 0 ? T.blueMid : T.greenMid,
                          borderRadius:3, p:3, textAlign:'center',
                          boxShadow:'0 4px 16px rgba(14,101,45,0.07)',
                          position:'relative', overflow:'hidden',
                        }}>
                          {/* Decorative ring behind */}
                          <Box sx={{ position:'absolute', bottom:-20, right:-20, width:70, height:70, borderRadius:'50%', border:'2px solid', borderColor: s.col, opacity:0.12, animation:'pulseRing 3s ease-in-out infinite' }} />
                          <Typography sx={{ fontSize:'2rem', mb:0.5 }}>{s.icon}</Typography>
                          <Typography sx={{
                            fontFamily:"'Playfair Display', serif",
                            fontSize:'2.1rem', fontWeight:700, color:s.col, lineHeight:1,
                          }}>
                            {s.num}
                          </Typography>
                          <Typography sx={{ color:T.ash, fontSize:'0.82rem', mt:0.5, fontWeight:600 }}>
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

        {/* ══ WAVE DIVIDER ═════════════════════════════════════════════════ */}
        <Box className="sw-wave-wrap" sx={{ bgcolor:'linear-gradient(145deg,#f0faf3,#e8f4ff,#fdf8f0)', mt:'-1px' }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ PROGRAMME CATALOGUE ══════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="lg">

            <Box className="sw-section-head" sx={{ textAlign:'center', mb:8, opacity:0 }}>
              <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:T.blueLt, color:T.blue, px:2, py:0.75, borderRadius:99, fontSize:'0.75rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', mb:2 }}>
                Programme Catalogue
              </Box>
              <Typography variant="h2" sx={{
                fontFamily:"'Playfair Display', serif",
                color:T.ink, fontSize:{ xs:'2rem', md:'3rem' }, fontWeight:600,
              }}>
                Our{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Workshops</Box>
              </Typography>
              <Typography sx={{ color:T.ash, fontSize:'1.05rem', mt:1.5, maxWidth:520, mx:'auto' }}>
                Programmes designed for every stakeholder in a student&apos;s journey
              </Typography>
            </Box>

            <Grid container spacing={3.5}>
              {WORKSHOPS.map(function(w, i) {
                var Icon = w.Icon;
                return (
                  <Grid item xs={12} md={6} key={i}>
                    <Box className="sw-wcard" sx={{
                      opacity:0, height:'100%',
                      bgcolor:T.white,
                      border:'1.5px solid',
                      borderColor:w.accentBorder,
                      borderRadius:4,
                      overflow:'hidden',
                      boxShadow:'0 4px 20px rgba(14,101,45,0.06)',
                      position:'relative',
                    }}>
                      {/* Top accent bar with gradient */}
                      <Box sx={{ height:5, background:'linear-gradient(90deg, ' + w.accentColor + ' 0%, ' + (w.accentColor === T.amber ? T.green : T.blue) + ' 100%)' }} />

                      {/* Decorative dots in corner */}
                      <Box className="sw-dots" sx={{ position:'absolute', top:0, right:0, width:120, height:120, opacity:0.5, pointerEvents:'none' }} />

                      <Box sx={{ p:{ xs:3, md:4 }, position:'relative', zIndex:1 }}>
                        {/* Header row */}
                        <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', mb:3 }}>
                          <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
                            <Box sx={{
                              bgcolor:w.iconBg, p:1.5, borderRadius:2,
                              display:'flex', alignItems:'center', justifyContent:'center',
                            }}>
                              <Icon className="sw-wcard-icon" sx={{ fontSize:32, color:w.accentColor }} />
                            </Box>
                            <Box>
                              <Typography sx={{ fontFamily:"'Playfair Display', serif", color:T.ink, fontWeight:600, fontSize:'1.15rem', lineHeight:1.3 }}>
                                {w.title}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ textAlign:'right', flexShrink:0, ml:1 }}>
                            <Box sx={{ bgcolor:w.accentBg, color:w.accentColor, px:1.5, py:0.4, borderRadius:99, fontSize:'0.7rem', fontWeight:700, mb:0.6, whiteSpace:'nowrap' }}>
                              {w.duration}
                            </Box>
                            <Box sx={{ bgcolor:T.parchment, color:T.ash, px:1.5, py:0.4, borderRadius:99, fontSize:'0.7rem', fontWeight:600, whiteSpace:'nowrap' }}>
                              {w.audience}
                            </Box>
                          </Box>
                        </Box>

                        {/* Description */}
                        <Typography sx={{ color:T.ash, fontSize:'0.92rem', lineHeight:1.85, mb:3 }}>
                          {w.desc}
                        </Typography>

                        {/* Highlights */}
                        <Box sx={{ display:'flex', flexWrap:'wrap', gap:1 }}>
                          {w.highlights.map(function(h, j) {
                            return (
                              <Box key={j} className="sw-highlight-tag" sx={{
                                display:'inline-flex', alignItems:'center', gap:0.6,
                                bgcolor:w.accentBg, color:w.accentColor,
                                border:'1px solid ' + w.accentBorder,
                                px:1.4, py:0.5, borderRadius:99, fontSize:'0.75rem', fontWeight:600,
                              }}>
                                <CheckCircleOutlineIcon sx={{ fontSize:13 }} />
                                {h}
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE DIVIDER 2 ═══════════════════════════════════════════════ */}
        <Box className="sw-wave-wrap">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,0 720,60 1080,30 C1260,15 1380,10 1440,0 L1440,60 L0,60 Z" fill="#f0faf3" />
          </svg>
        </Box>

        {/* ══ WHY CHOOSE US / TRUST STRIP ══════════════════════════════════ */}
        <Box className="sw-trust-strip" sx={{ py:{ xs:7, md:10 }, background:'linear-gradient(135deg, #f0faf3 0%, #eaf4ff 100%)' }}>
          <Container maxWidth="lg">
            <Box className="sw-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display', serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Why Schools{' '}
                <Box component="span" sx={{ color:T.blue, fontStyle:'italic' }}>Choose Us</Box>
              </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
              {[
                { icon:'🎯', title:'Goal-Oriented Design', desc:'Every programme is mapped to measurable student outcomes, not just activities.', bg:T.blueLt, border:T.blueMid, col:T.blue },
                { icon:'📖', title:'Curriculum-Aligned', desc:'Sessions complement existing school curriculum without disrupting schedules.', bg:T.greenLt, border:T.greenMid, col:T.green },
                { icon:'🤝', title:'School-Wide Support', desc:'We work with students, teachers, and parents for a holistic impact.', bg:T.amberLt, border:'#f5d8a0', col:T.amber },
                { icon:'📊', title:'Data-Backed Methods', desc:'Assessments use internationally validated psychometric and DMIT tools.', bg:T.blueLt, border:T.blueMid, col:T.blue },
                { icon:'📍', title:'On-Site Delivery', desc:'Our facilitators travel to your institution — no logistics on your end.', bg:T.greenLt, border:T.greenMid, col:T.green },
                { icon:'💬', title:'Ongoing Support', desc:'Post-workshop follow-up and resources for continued impact.', bg:T.amberLt, border:'#f5d8a0', col:T.amber },
              ].map(function(item, i) {
                return (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box className="sw-trust-item sw-stat-card" sx={{
                      opacity:0, bgcolor:item.bg, border:'1.5px solid ' + item.border,
                      borderRadius:3, p:3, display:'flex', gap:2, alignItems:'flex-start',
                      boxShadow:'0 2px 12px rgba(14,101,45,0.06)', transition:'all 0.3s',
                    }}>
                      <Box sx={{ fontSize:'2rem', flexShrink:0 }}>{item.icon}</Box>
                      <Box>
                        <Typography sx={{ color:T.ink, fontWeight:700, fontSize:'0.98rem', mb:0.5, fontFamily:"'DM Sans',sans-serif" }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ color:T.ash, fontSize:'0.87rem', lineHeight:1.7 }}>
                          {item.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE DIVIDER 3 ═══════════════════════════════════════════════ */}
        <Box className="sw-wave-wrap">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ TRUSTED BY ═══════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="md" sx={{ textAlign:'center' }}>
            <Box className="sw-section-head" sx={{ opacity:0 }}>
              <Box sx={{ display:'inline-flex', alignItems:'center', gap:1.5, bgcolor:T.amberLt, color:T.amber, px:2, py:0.75, borderRadius:99, fontSize:'0.75rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', mb:3 }}>
                <EmojiEventsIcon sx={{ fontSize:16 }} />
                Trusted Partners
              </Box>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display', serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600, mb:2 }}>
                Trusted by{' '}
                <Box component="span" sx={{ color:T.blue, fontStyle:'italic' }}>10+ Schools</Box>
              </Typography>
              <Typography sx={{ color:T.ash, fontSize:'1.05rem', lineHeight:1.8, mb:6, maxWidth:560, mx:'auto' }}>
                We have delivered workshops and programmes across leading schools and institutions
                in Surat.
              </Typography>
            </Box>

            {/* Logo tiles */}
            <Box className="sw-logos-row" sx={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:2, mb:6 }}>
              {LOGOS.map(function(logo, i) {
                return (
                  <Box key={i} className="sw-logo-tile" sx={{
                    width:72, height:72, borderRadius:3,
                    bgcolor:i % 3 === 0 ? T.blueLt : i % 3 === 1 ? T.greenLt : T.amberLt,
                    border:'1.5px solid ' + (i % 3 === 0 ? T.blueMid : i % 3 === 1 ? T.greenMid : '#f5d8a0'),
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'2rem', cursor:'default',
                    boxShadow:'0 2px 8px rgba(14,101,45,0.07)',
                    opacity:0,
                  }}>
                    {logo}
                  </Box>
                );
              })}
            </Box>

            {/* Testimonial strip */}
            <Box sx={{
              bgcolor:T.greenLt, border:'1.5px solid ' + T.greenMid,
              borderRadius:3, p:3.5, maxWidth:560, mx:'auto',
              position:'relative', overflow:'hidden',
            }}>
              <Box sx={{ position:'absolute', top:8, left:14, fontFamily:'Georgia,serif', fontSize:'4rem', color:T.green, opacity:0.12, lineHeight:1 }}>
                &ldquo;
              </Box>
              <Typography sx={{ fontFamily:"'Playfair Display', serif", fontStyle:'italic', color:T.ink, fontSize:'1.05rem', lineHeight:1.7, mb:1.5, position:'relative', zIndex:1 }}>
                The workshop transformed how our students approach career decisions. The counsellor was exceptional and the materials were outstanding.
              </Typography>
              <Typography sx={{ color:T.slate, fontSize:'0.82rem', fontWeight:700, letterSpacing:1 }}>
                — Principal, Prominent School, Surat
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE DIVIDER 4 ═══════════════════════════════════════════════ */}
        <Box className="sw-wave-wrap">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,20 C300,60 700,0 1100,40 C1280,55 1380,45 1440,30 L1440,60 L0,60 Z" fill="#eaf5ee" />
          </svg>
        </Box>

        {/* ══ BOTTOM CTA ═══════════════════════════════════════════════════ */}
        <Box sx={{
          py:{ xs:10, md:14 },
          background:'linear-gradient(145deg, #eaf5ee 0%, #e4eef6 50%, #fdf8f0 100%)',
          position:'relative', overflow:'hidden',
          textAlign:'center',
        }}>
          {/* Floating shapes */}
          <Box sx={{ position:'absolute', top:'10%', left:'5%', width:100, height:100, borderRadius:'50%', bgcolor:T.greenMid, opacity:0.3, animation:'floatA 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'15%', right:'6%', width:80, height:80, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.3, animation:'floatB 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box className="sw-dots-blue" sx={{ position:'absolute', inset:0, opacity:0.5, pointerEvents:'none' }} />

          <Container maxWidth="md" sx={{ position:'relative', zIndex:1 }}>
            <Box className="sw-cta-inner" sx={{ opacity:0 }}>
              <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:T.white, color:T.green, px:2.5, py:1, borderRadius:99, fontSize:'0.78rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', mb:3, boxShadow:'0 4px 14px rgba(14,101,45,0.12)', border:'1.5px solid ' + T.greenMid }}>
                Ready to Partner?
              </Box>

              <Typography sx={{
                fontFamily:"'Playfair Display', serif",
                color:T.ink, fontSize:{ xs:'2rem', md:'3rem' }, fontWeight:700, mb:2, lineHeight:1.2,
              }}>
                Bring these programmes{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>to your school</Box>
              </Typography>

              <Typography sx={{ color:T.slate, fontSize:'1.1rem', mb:5, maxWidth:500, mx:'auto', lineHeight:1.8 }}>
                Quick response &bull; Custom programmes available &bull; Free consultation call included
              </Typography>

              <Box sx={{ display:'flex', justifyContent:'center', gap:2.5, flexWrap:'wrap', mb:5 }}>
                <a className="sw-btn-green-pill" href="https://wa.me/916351113766" target="_blank" rel="noreferrer">
                  <WhatsAppIcon sx={{ fontSize:20 }} />
                  Chat on WhatsApp
                </a>
                <Link to="/contact" className="sw-btn-outline-green">
                  <CalendarTodayIcon sx={{ fontSize:18 }} />
                  Schedule a Call
                </Link>
              </Box>

              {/* Micro trust row */}
              <Box sx={{ display:'flex', justifyContent:'center', gap:{ xs:2, sm:4 }, flexWrap:'wrap' }}>
                {['50+ schools trust us', 'Free consultation', 'Custom programmes'].map(function(t, i) {
                  return (
                    <Box key={i} sx={{ display:'flex', alignItems:'center', gap:0.8, color:T.slate, fontSize:'0.85rem', fontWeight:600 }}>
                      <CheckCircleOutlineIcon sx={{ fontSize:16, color:T.green }} />
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
