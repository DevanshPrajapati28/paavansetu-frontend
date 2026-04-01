import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Rating } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CardMedia } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';

import setuToSuccessImg   from '../assets/Myfriendganesha2.jpeg';
import valuesInActionImg  from '../assets/krishna_classroom.jpeg';
import purposeCompassImg  from '../assets/Hanuman_chalisa2.jpeg';
import parentAsGuideImg   from '../assets/Krishna_leela2.jpeg';
import moralCompassImg    from '../assets/Ramayan2.jpeg';
import mfg from '../assets/myfriendganesha2.png';
import krishnapathsala from '../assets/krishna_pathsala2.png';
import hanumanchalisa from '../assets/hanumanchalisa2.png';
import kleela from '../assets/kleela.png';
import Ramayan from '../assets/Ramayan2.png';

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
  ".bk-page{font-family:'DM Sans',sans-serif;}",

  /* keyframes */
  "@keyframes floatA{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(12px,-18px) rotate(3deg)}66%{transform:translate(-8px,10px) rotate(-2deg)}}",
  "@keyframes floatB{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(-14px,10px) rotate(-4deg)}66%{transform:translate(10px,-12px) rotate(2deg)}}",
  "@keyframes floatC{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-14px)}}",
  "@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  "@keyframes pulseRing{0%,100%{transform:scale(1);opacity:0.45}50%{transform:scale(1.08);opacity:0.2}}",
  "@keyframes imageZoom{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}",

  /* dot grids */
  ".bk-dots{background-image:radial-gradient(circle,rgba(14,101,45,0.11) 1.5px,transparent 1.5px);background-size:24px 24px;}",
  ".bk-dots-blue{background-image:radial-gradient(circle,rgba(31,91,135,0.09) 1.5px,transparent 1.5px);background-size:20px 20px;}",

  /* wave */
  ".bk-wave{line-height:0;overflow:hidden;}",
  ".bk-wave svg{display:block;width:100%;}",

  /* book cards */
  ".bk-card{transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s,border-color 0.3s;}",
  ".bk-card:hover{transform:translateY(-10px) rotate(-0.3deg);box-shadow:0 24px 48px rgba(14,101,45,0.13) !important;}",
  ".bk-card:hover .bk-cover-img{transform:scale(1.07);}",
  ".bk-cover-img{transition:transform 0.55s ease;}",
  ".bk-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#0e652d,#1f5b87);transform:scaleX(0);transform-origin:left;transition:transform 0.3s ease;z-index:2;}",
  ".bk-card:hover::before{transform:scaleX(1);}",

  /* order button */
  ".bk-order-btn{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;background:#0e652d;color:#fff;border:none;border-radius:50px;padding:13px 20px;font-size:0.88rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s;}",
  ".bk-order-btn:hover{background:#1f5b87;transform:translateY(-2px);box-shadow:0 10px 24px rgba(14,101,45,0.24);}",

  /* bulk CTA buttons */
  ".bk-btn-green{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#0e652d;color:#fff;border:none;border-radius:50px;padding:15px 36px;font-size:0.95rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;min-width:250px;transition:all 0.3s;}",
  ".bk-btn-green:hover{background:#1f5b87;transform:translateY(-3px);box-shadow:0 14px 32px rgba(14,101,45,0.26);}",
  ".bk-btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;color:#0e652d;border:2px solid #0e652d;border-radius:50px;padding:13px 34px;font-size:0.95rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;min-width:250px;transition:all 0.3s;}",
  ".bk-btn-outline:hover{background:#0e652d;color:#fff;transform:translateY(-3px);}",

  /* tag chip */
  ".bk-tag{display:inline-block;padding:4px 12px;border-radius:50px;font-size:0.68rem;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;}",
].join('\n');

/* ─── DATA ────────────────────────────────────────────────────────────────── */
var BOOKS = [
  {
    title:    'My Friend Ganesha',
    subtitle: 'Early Learners / Primary',
    desc:     'My Friend Ganesha helps children learn good values and simple life skills through gentle stories and playful moments with their favourite friend, Ganesha.',
    audience: 'Class 9-12',
    pages:    220,
    image:    setuToSuccessImg,
    tag:      'Bestseller',
    tagBg:    T.amberLt,
    tagCol:   T.amber,
    tagBorder:T.amberMid,
    rating:   4.9,
    reviews:  128,
    price:    200,
    accentBg: T.amberLt,
    accentBorder: T.amberMid,
    accentCol:T.amber,
    // Individual image styling
    imageStyle: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 60%',
      display: 'block'
    }
  },
  {
    title:    "Krishnaa's Classroom",
    subtitle: 'Primary / Upper Primary',
    desc:     'This is the Bhagavad Gita retold for children in a way that is simple, engaging, and alive. Each chapter becomes a short, colorful story where the reader steps into Arjun’s place, makes decisions, and discovers the lesson for themselves.',
    audience: 'Age 6+',
    pages:    180,
    image:    valuesInActionImg,
    tag:      'New',
    tagBg:    T.waLt,
    tagCol:   T.wa,
    tagBorder:T.waMid,
    rating:   4.8,
    reviews:  87,
    price:    250,
    accentBg: T.greenLt,
    accentBorder: T.greenMid,
    accentCol:T.green,
    // Individual image styling - different size and position
    imageStyle: {
      width: '100%',
      height: '115%',
      objectFit: 'cover',
      objectPosition: 'top 30%',
      display: 'block'
    }
  },
  {
    title:    'Hanuman Chalisa for Kids',
    subtitle: 'Primary / Middle School',
    desc:     'This book gently answers those questions. Through simple meanings, inspiring stories from Hanuman’s life, relatable value-based tales, and thoughtful activities, children don’t just chant—they understand.',
    audience: 'Class 7-10',
    pages:    160,
    image:    purposeCompassImg,
    tag:      'Workbook',
    tagBg:    T.blueLt,
    tagCol:   T.blue,
    tagBorder:T.blueMid,
    rating:   4.7,
    reviews:  63,
    price:    250,
    accentBg: T.blueLt,
    accentBorder: T.blueMid,
    accentCol:T.blue,
    // Individual image styling - zoomed in
    imageStyle: {
      width: '100%',
      height: '130%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block'
    }
  },
  {
    title:    'Krishna Leela',
    subtitle: 'Primary',
    desc:     'Krishna Leela is a gentle collection of childhood stories told in simple, lyrical language; these stories follow a playful little boy and the people around him—his family, friends, and village—through moments of joy, mischief, courage, and care.',
    audience: 'Parents',
    pages:    200,
    image:    parentAsGuideImg,
    tag:      'For Parents',
    tagBg:    '#fde8f0',
    tagCol:   '#c0395a',
    tagBorder:'#f5b8cc',
    rating:   4.9,
    reviews:  54,
    price:    200,
    accentBg: '#fde8f0',
    accentBorder:'#f5b8cc',
    accentCol:'#c0395a',
    // Individual image styling - slightly zoomed
    imageStyle: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 40%',
      display: 'block'
    }
  },
  {
    title:    'Kids Ramayana',
    subtitle: 'Primary / Upper Primary',
    desc:     'This book presents a carefully adapted retelling of the Ramayan, based on the Valmiki tradition, for young readers. The narrative has been structured to support clarity of thought, emotional balance, and ethical understanding.',
    audience: 'Teachers & Schools',
    pages:    280,
    image:    moralCompassImg,
    tag:      'Curriculum',
    tagBg:    T.greenLt,
    tagCol:   T.green,
    tagBorder:T.greenMid,
    rating:   4.8,
    reviews:  41,
    price:    250,
    accentBg: T.greenLt,
    accentBorder: T.greenMid,
    accentCol:T.green,
    // Individual image styling - different positioning
    imageStyle: {
      width: '100%',
      height: '125%',
      objectFit: 'cover',
      objectPosition: 'center 5%',
      display: 'block'
    }
  },
  {
    title:    'માય ફ્રેન્ડ ગણેશ ',
    subtitle: 'પ્રારંભિક શીખનારા / પ્રાથમિક',
    desc:     'બાળકોને તેમના પ્રિય મિત્ર ગણેશ સાથેની કોમળ વાર્તાઓ અને રમતિયાળ ક્ષણો દ્વારા સારા મૂલ્યો અને સરળ જીવન કૌશલ્યો શીખવામાં મદદ કરે છે.દબાણ કે ઉપદેશ આપ્યા વિના,આ પુસ્તક બાળકોને શાંતિથી વિચારવા,અન્યની આદર કરવા અને આત્મવિશ્વાસ સાથે દરેક દિવસની શરૂઆત કરવા માર્ગદર્શન આપે છે.',
    audience: 'Class 9-12',
    pages:    220,
    image:    mfg,
    tag:      'Bestseller',
    tagBg:    T.amberLt,
    tagCol:   T.amber,
    tagBorder:T.amberMid,
    rating:   4.9,
    reviews:  128,
    price:    160,
    accentBg: T.amberLt,
    accentBorder: T.amberMid,
    accentCol:T.amber,
    // Individual image styling
    imageStyle: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 60%',
      display: 'block'
    }
  },
  {
    title:    "કૃષ્ણની પાઠશાળા",
    subtitle: 'પ્રાથમિક / ઉચ્ચ પ્રાથમિક',
    desc:     `આ ભગવદ ગીતા બાળકોને સરળ, આકર્ષક અને જીવંત રીતે ફરીથી કહેવામાં આવી છે.  
    દરેક પ્રકરણ એક ટૂંકી, રંગીન વાર્તા બની જાય છે જ્યાં વાચક અર્જુનના સ્થાને પણ મૂકે છે, નિર્ણય લે છે અને પોતાને માટે પાઠ શોધે છે.`,
    audience: 'Age 6+',
    pages:    180,
    image:    krishnapathsala,
    tag:      'New',
    tagBg:    T.waLt,
    tagCol:   T.wa,
    tagBorder:T.waMid,
    rating:   4.8,
    reviews:  87,
    price:    220,
    accentBg: T.greenLt,
    accentBorder: T.greenMid,
    accentCol:T.green,
    // Individual image styling - different size and position
    imageStyle: {
      width: '100%',
      height: '115%',
      objectFit: 'cover',
      objectPosition: 'top 40%',
      display: 'block'
    }
  },
  {
    title:    'હનુમાન ચાલીસા',
    subtitle: 'પ્રાથમિક / માધ્યમિક શાળા',
    desc: `આ પુસ્તક આ પ્રશ્નોના જવાબો હળવાશથી આપે છે. સરળ અર્થો, હૃદયસ્પર્શી જીવનની પ્રેરણાદાયી વાર્તાઓ, સંબંધિત મૂલ્ય-આધારિત વાર્તાઓ અને વિચારશીલ પ્રવૃત્તિઓ દ્વારા, બાળકો ફક્ત જપ નથી — તેઓ સમજવા લાગે છે.`,
    audience: 'Class 7-10',
    pages:    160,
    image:    hanumanchalisa,
    tag:      'Workbook',
    tagBg:    T.blueLt,
    tagCol:   T.blue,
    tagBorder:T.blueMid,
    rating:   4.7,
    reviews:  63,
    price:    210,
    accentBg: T.blueLt,
    accentBorder: T.blueMid,
    accentCol:T.blue,
    // Individual image styling - zoomed in
    imageStyle: {
      width: '100%',
      height: '130%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block'
    }
  },
  {
    title:    'ક્રિષ્ણા લીલા ',
    subtitle: 'પ્રાથમિક',
    desc: `કૃષ્ણલીલા આ બાળપણની વાર્તાઓનો એક સૌમ્ય સંગ્રહ છે જે સરળ, ગીતાત્મક ભાષામાં કહેવામાં આવ્યા છે; આ વાર્તાઓ એક રમતિયાળ નાના છોકરા અને તેની આસપાસના લોકો – તેના પરિવાર, મિત્રો અને ગામ – ને આનંદ, તોફાન, હિંમત અને સંભાળની ક્ષણો દ્વારા અનુસરે છે.`,
    audience: 'Parents',
    pages:    200,
    image:    kleela,
    tag:      'For Parents',
    tagBg:    '#fde8f0',
    tagCol:   '#c0395a',
    tagBorder:'#f5b8cc',
    rating:   4.9,
    reviews:  54,
    price:    180,
    accentBg: '#fde8f0',
    accentBorder:'#f5b8cc',
    accentCol:'#c0395a',
    // Individual image styling - slightly zoomed
    imageStyle: {
      width: '100%',
      height: '120%',
      objectFit: 'cover',
      objectPosition: 'center 60%',
      display: 'block'
    }
  },
  {
    title:    'રામાયણ ',
    subtitle: 'પ્રાથમિક / ઉચ્ચ પ્રાથમિક',
    desc: `આ પુસ્તક વાલ્મીકિ પરંપરા પર આધારિત રામાયણનું કાળજીપૂર્વક રૂપાંતરિત પુનઃકથન, યુવા વાચકો માટે રજૂ કરે છે. આ કથા વિચારની સ્પષ્ટતા, ભાવનાત્મક સંતુલન અને નૈતિક સમજણને સમર્થન આપવા માટે રચાયેલ છે.`,
    audience: 'Teachers & Schools',
    pages:    280,
    image:    Ramayan,
    tag:      'Curriculum',
    tagBg:    T.greenLt,
    tagCol:   T.green,
    tagBorder:T.greenMid,
    rating:   4.8,
    reviews:  41,
    price:    200,
    accentBg: T.greenLt,
    accentBorder: T.greenMid,
    accentCol:T.green,
    // Individual image styling - different positioning
    imageStyle: {
      width: '100%',
      height: '125%',
      objectFit: 'cover',
      objectPosition: 'top',
      display: 'block'
    }
  },
];

var WHY_ITEMS = [
  { icon:'✍️', title:'Author-Led',        desc:'Each book is crafted and personally reviewed by Shweta Kothari, founder of Paavan Setu.',   bg:T.greenLt,  border:T.greenMid,  col:T.green },
  { icon:'🏫', title:'School-Adopted',    desc:'Used as curriculum material in 50+ schools across Gujarat and beyond.',                       bg:T.blueLt,   border:T.blueMid,   col:T.blue  },
  { icon:'🌱', title:'Value-Based',       desc:'Every book weaves together character-building, cultural roots, and practical life lessons.',   bg:T.amberLt,  border:T.amberMid,  col:T.amber },
  { icon:'👶', title:'Age-Appropriate',   desc:'Thoughtfully designed for each developmental stage from early learners to teens.',             bg:T.greenLt,  border:T.greenMid,  col:T.green },
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
export default function Books() {

  useEffect(function() {
    /* Hero */
    gsap.fromTo('.bk-hero-anim',
      { opacity:0, y:32 },
      { opacity:1, y:0, duration:0.9, stagger:0.13, ease:'power3.out', delay:0.15 }
    );

    /* Book cards — staggered scale bounce */
    gsap.fromTo('.bk-card',
      { opacity:0, y:50, scale:0.94 },
      { opacity:1, y:0, scale:1, duration:0.7, stagger:0.1, ease:'back.out(1.5)',
        scrollTrigger:{ trigger:'.bk-grid', start:'top 83%', once:true } }
    );

    /* Why cards */
    gsap.fromTo('.bk-why-card',
      { opacity:0, y:40 },
      { opacity:1, y:0, duration:0.65, stagger:0.1, ease:'power3.out',
        scrollTrigger:{ trigger:'.bk-why-grid', start:'top 83%', once:true } }
    );

    /* Section heads */
    gsap.utils.toArray('.bk-section-head').forEach(function(el) {
      gsap.fromTo(el,
        { opacity:0, y:24 },
        { opacity:1, y:0, duration:0.7, ease:'power2.out',
          scrollTrigger:{ trigger:el, start:'top 86%', once:true } }
      );
    });

    /* Bulk CTA */
    gsap.fromTo('.bk-bulk-inner',
      { opacity:0, y:36 },
      { opacity:1, y:0, duration:0.85, ease:'power2.out',
        scrollTrigger:{ trigger:'.bk-bulk-inner', start:'top 88%', once:true } }
    );

    return function(){ ScrollTrigger.getAll().forEach(function(t){ t.kill(); }); };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Box className="bk-page" sx={{ bgcolor:T.snow, pt:8, overflowX:'hidden' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <Box sx={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#f0faf3 0%,#e8f4ff 55%,#fdf8f0 100%)', py:{ xs:10, md:14 } }}>
          {/* Floating blobs */}
          <Box sx={{ position:'absolute', top:50, left:'5%', width:130, height:130, borderRadius:'40% 60% 55% 45%', bgcolor:T.greenMid, opacity:0.4, animation:'floatA 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', top:'20%', right:'7%', width:100, height:100, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.38, animation:'floatB 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'16%', left:'14%', width:65, height:65, borderRadius:'50%', bgcolor:'#fde8b8', opacity:0.65, animation:'floatC 7s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'12%', right:'16%', width:85, height:85, borderRadius:'45% 55% 60% 40%', bgcolor:T.amberMid, opacity:0.3, animation:'floatA 9s ease-in-out infinite 2s', pointerEvents:'none' }} />
          {/* Spinning rings */}
          <Box sx={{ position:'absolute', top:'6%', right:'20%', width:160, height:160, borderRadius:'50%', border:'2px dashed rgba(14,101,45,0.16)', animation:'spinSlow 20s linear infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'10%', left:'18%', width:110, height:110, borderRadius:'50%', border:'2px dashed rgba(31,91,135,0.14)', animation:'spinSlow 26s linear infinite reverse', pointerEvents:'none' }} />
          {/* Dot grid */}
          <Box className="bk-dots" sx={{ position:'absolute', inset:0, opacity:0.55, pointerEvents:'none' }} />

          <Container maxWidth="md">
            <Box sx={{ textAlign:'center', position:'relative', zIndex:1 }}>

              {/* Badge */}
              <Box className="bk-hero-anim" sx={{ display:'inline-flex', alignItems:'center', gap:1, opacity:0, bgcolor:T.white, border:'1.5px solid '+T.greenMid, color:T.green, px:2.5, py:1, borderRadius:99, mb:4, fontSize:'0.78rem', fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase', boxShadow:'0 4px 12px rgba(14,101,45,0.1)' }}>
                <span style={{ fontSize:'1rem' }}>📚</span>
                Paavan Setu Publications
              </Box>

              {/* Headline */}
              <Typography className="bk-hero-anim" variant="h1" sx={{ fontFamily:"'Playfair Display',Georgia,serif", color:T.ink, fontSize:{ xs:'2.8rem', md:'4.6rem' }, fontWeight:700, lineHeight:1.08, mb:2.5, opacity:0, letterSpacing:'-0.025em' }}>
                Our{' '}
                <Box component="span" sx={{ background:'linear-gradient(135deg,#0e652d 0%,#1f5b87 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Books
                </Box>
              </Typography>

              {/* Desc */}
              <Typography className="bk-hero-anim" sx={{ color:T.ash, fontSize:{ xs:'1rem', md:'1.15rem' }, lineHeight:1.85, mb:6, maxWidth:600, mx:'auto', opacity:0 }}>
                In today&apos;s fast-paced environment, children face pressure and distractions from a very young age. While academics build knowledge,{' '}
                <strong style={{ color:T.green }}>values build character</strong> — and both are essential for balanced growth.
              </Typography>

              {/* Mini stats */}
              <Box className="bk-hero-anim" sx={{ opacity:0, display:'flex', justifyContent:'center', gap:3, flexWrap:'wrap' }}>
                {[
                  { num:'5', label:'Books Published', bg:T.greenLt, border:T.greenMid, col:T.green },
                  { num:'20+', label:'Schools Adopted', bg:T.blueLt, border:T.blueMid, col:T.blue },
                  { num:'4.8★', label:'Avg Rating', bg:T.amberLt, border:T.amberMid, col:T.amber },
                ].map(function(s, i) {
                  return (
                    <Box key={i} sx={{ bgcolor:s.bg, border:'1.5px solid '+s.border, borderRadius:3, px:3, py:2, textAlign:'center', minWidth:110, boxShadow:'0 3px 12px rgba(14,101,45,0.07)' }}>
                      <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem', fontWeight:700, color:s.col, lineHeight:1 }}>{s.num}</Typography>
                      <Typography sx={{ color:T.ash, fontSize:'0.76rem', mt:0.4, fontWeight:600 }}>{s.label}</Typography>
                    </Box>
                  );
                })}
              </Box>

            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 1 ════════════════════════════════════════════════════════ */}
        <Box className="bk-wave" sx={{ mt:'-1px' }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ WHY OUR BOOKS ═════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:7, md:10 }, bgcolor:T.white }}>
          <Container maxWidth="lg">
            <Box className="bk-section-head" sx={{ textAlign:'center', mb:6, opacity:0 }}>
              <SectionLabel bg={T.blueLt} col={T.blue} border={T.blueMid}>Why Our Books</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Books That{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Inspire</Box>
              </Typography>
            </Box>
            <Box className="bk-why-grid">
              <Grid container spacing={2.5}>
                {WHY_ITEMS.map(function(item, i) {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Box className="bk-why-card" sx={{ opacity:0, p:3, bgcolor:item.bg, border:'1.5px solid '+item.border, borderRadius:3, textAlign:'center', transition:'transform 0.3s,box-shadow 0.3s', '&:hover':{ transform:'translateY(-5px)', boxShadow:'0 16px 32px rgba(14,101,45,0.1)' }, position:'relative', overflow:'hidden' }}>
                        <Box sx={{ position:'absolute', bottom:-14, right:-14, width:52, height:52, borderRadius:'50%', border:'2px solid '+item.col, opacity:0.1, animation:'pulseRing 3.5s ease-in-out infinite' }} />
                        <Typography sx={{ fontSize:'2.4rem', mb:1.5 }}>{item.icon}</Typography>
                        <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontWeight:600, fontSize:'1.05rem', mb:0.8 }}>{item.title}</Typography>
                        <Box sx={{ width:24, height:3, bgcolor:item.col, borderRadius:2, mb:1.2, mx:'auto' }} />
                        <Typography sx={{ color:T.ash, fontSize:'0.86rem', lineHeight:1.75 }}>{item.desc}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 2 ════════════════════════════════════════════════════════ */}
        <Box className="bk-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,0 720,60 1080,30 C1260,15 1380,10 1440,0 L1440,60 L0,60 Z" fill="#f0faf3" />
          </svg>
        </Box>

        {/* ══ BOOK COLLECTION ═══════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, background:'linear-gradient(135deg,#f0faf3 0%,#eaf4ff 100%)' }}>
          <Container maxWidth="lg">
            <Box className="bk-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.greenLt} col={T.green} border={T.greenMid}>Our Collection</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Browse the{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Collection</Box>
              </Typography>
              <Typography sx={{ color:T.ash, fontSize:'1rem', mt:1.5, maxWidth:480, mx:'auto' }}>
                Each book is available for individual purchase or bulk school orders
              </Typography>
            </Box>

            <Box className="bk-grid">
              <Grid container spacing={3.5}>
                {BOOKS.map(function(book, i) {
                  return (
                    <Grid item xs={12} sm={6} lg={4} key={i}>
                      <Box className="bk-card" sx={{
                        opacity:0, height:'100%',
                        bgcolor:T.white, border:'1.5px solid '+book.accentBorder,
                        borderRadius:4, overflow:'hidden',
                        display:'flex', flexDirection:'column',
                        boxShadow:'0 4px 18px rgba(14,101,45,0.06)',
                        position:'relative',
                      }}>
                        {/* Cover image */}
                        <Box sx={{ position:'relative', height:220, overflow:'hidden', bgcolor:'#f5f5f0', flexShrink:0 }}>
                          <img
                            className="bk-cover-img"
                            src={book.image}
                            alt={book.title}
                            style={book.imageStyle} // Apply individual image styles
                          />
                          {/* Soft gradient overlay at bottom of image */}
                          <Box sx={{ position:'absolute', bottom:0, left:0, right:0, height:'40%', background:'linear-gradient(to top,rgba(255,255,255,0.5),transparent)', pointerEvents:'none' }} />
                        </Box>

                        {/* Content */}
                        <Box sx={{ p:3, flexGrow:1, display:'flex', flexDirection:'column' }}>

                          {/* Audience + pages row */}
                          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:1.8 }}>
                            <Box sx={{ bgcolor:book.accentBg, border:'1px solid '+book.accentBorder, color:book.accentCol, px:1.4, py:0.4, borderRadius:99, fontSize:'0.7rem', fontWeight:700 }}>
                              {book.audience}
                            </Box>
                          </Box>

                          {/* Title */}
                          <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontWeight:600, fontSize:'1.2rem', mb:0.4, lineHeight:1.3 }}>
                            {book.title}
                          </Typography>
                          <Typography sx={{ color:book.accentCol, fontStyle:'italic', fontSize:'0.83rem', mb:1.5 }}>
                            {book.subtitle}
                          </Typography>

                          {/* Accent dash */}
                          <Box sx={{ width:28, height:3, bgcolor:book.accentCol, borderRadius:2, mb:1.5 }} />

                          {/* Description */}
                          <Typography sx={{ color:T.ash, fontSize:'0.88rem', lineHeight:1.75, mb:2.5, flexGrow:1 }}>
                            {book.desc}
                          </Typography>

                          {/* Price row */}
                          <Box sx={{ display:'flex', alignItems:'center', gap:0.5, mb:2.5, pt:1.5, borderTop:'1px dashed '+book.accentBorder }}>
                            <CurrencyRupeeIcon sx={{ color:book.accentCol, fontSize:'1.1rem' }} />
                            <Typography sx={{ fontFamily:"'Playfair Display',serif", color:book.accentCol, fontWeight:700, fontSize:'1.5rem', lineHeight:1 }}>
                              {book.price}
                            </Typography>
                            <Typography sx={{ color:T.ash, fontSize:'0.78rem', ml:0.5 }}>incl. all taxes</Typography>
                          </Box>

                          {/* Order button */}
                          <a
                            className="bk-order-btn"
                            href={'https://wa.me/916351113766?text=I%27m%20interested%20in%20the%20book%3A%20' + encodeURIComponent(book.title)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <WhatsAppIcon style={{ fontSize:17 }} />
                            Order via WhatsApp
                          </a>
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
        <Box className="bk-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ BULK ORDERS ═══════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="md" sx={{ textAlign:'center' }}>
            <Box className="bk-bulk-inner" sx={{ opacity:0 }}>
              <SectionLabel bg={T.amberLt} col={T.amber} border={T.amberMid}>School Orders</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'1.9rem', md:'2.8rem' }, fontWeight:600, mb:2 }}>
                Introduce these books in{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>your school</Box>
              </Typography>
              <Typography sx={{ color:T.ash, fontSize:'1rem', lineHeight:1.85, mb:5, maxWidth:560, mx:'auto' }}>
                We offer special programmes for schools including sample books, bulk orders, curriculum integration support, and teacher training.
              </Typography>

              {/* Feature tiles */}
              <Grid container spacing={2} justifyContent="center" sx={{ mb:5 }}>
                {[
                  { icon:'📦', label:'Sample books provided', bg:T.greenLt, border:T.greenMid, col:T.green },
                  { icon:'💰', label:'Special bulk pricing',  bg:T.amberLt, border:T.amberMid, col:T.amber },
                  { icon:'🎓', label:'Curriculum support',   bg:T.blueLt,  border:T.blueMid,  col:T.blue  },
                  { icon:'🚚', label:'Pan-India delivery',   bg:T.greenLt, border:T.greenMid, col:T.green },
                ].map(function(f, i) {
                  return (
                    <Grid item xs={6} sm={3} key={i}>
                      <Box sx={{ bgcolor:f.bg, border:'1.5px solid '+f.border, borderRadius:3, p:2, textAlign:'center', transition:'transform 0.3s', '&:hover':{ transform:'translateY(-4px)' } }}>
                        <Typography sx={{ fontSize:'1.8rem', mb:0.6 }}>{f.icon}</Typography>
                        <Typography sx={{ color:f.col, fontSize:'0.8rem', fontWeight:700, lineHeight:1.4 }}>{f.label}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              <Box sx={{ display:'flex', flexDirection:{ xs:'column', sm:'row' }, justifyContent:'center', gap:2 }}>
                <a className="bk-btn-green" href="https://wa.me/916351113766?text=I'd%20like%20to%20request%20a%20sample%20book%20for%20my%20school" target="_blank" rel="noreferrer">
                  <WhatsAppIcon style={{ fontSize:18 }} />
                  Request School Sample
                </a>
                <a className="bk-btn-outline" href="https://wa.me/916351113766?text=I'd%20like%20to%20enquire%20about%20bulk%20book%20orders" target="_blank" rel="noreferrer">
                  Enquire Bulk Orders
                  <AutoStoriesIcon style={{ fontSize:18 }} />
                </a>
              </Box>

              <Typography sx={{ color:T.ash, fontSize:'0.84rem', mt:3 }}>
                Quick response &bull; Custom programmes available &bull; Free consultation
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 4 ════════════════════════════════════════════════════════ */}
        <Box className="bk-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,20 C300,60 700,0 1100,40 C1280,55 1380,45 1440,30 L1440,60 L0,60 Z" fill="#eaf5ee" />
          </svg>
        </Box>

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, background:'linear-gradient(145deg,#eaf5ee 0%,#e4eef6 50%,#fdf8f0 100%)', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <Box sx={{ position:'absolute', top:'10%', left:'4%', width:100, height:100, borderRadius:'50%', bgcolor:T.greenMid, opacity:0.28, animation:'floatA 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'14%', right:'5%', width:80, height:80, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.28, animation:'floatB 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box className="bk-dots-blue" sx={{ position:'absolute', inset:0, opacity:0.4, pointerEvents:'none' }} />

          <Container maxWidth="sm" sx={{ position:'relative', zIndex:1 }}>
            <Typography sx={{ fontSize:'2.8rem', mb:2 }}>📖</Typography>
            <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'1.8rem', md:'2.6rem' }, fontWeight:700, mb:2, lineHeight:1.2 }}>
              Want to know more about{' '}
              <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>our books?</Box>
            </Typography>
            <Typography sx={{ color:T.ash, fontSize:'1rem', mb:5, lineHeight:1.8 }}>
              Drop us a message and we will share more details, sample pages, or arrange a school visit.
            </Typography>
            <Box sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap' }}>
              <a className="bk-btn-green" href="https://wa.me/916351113766" target="_blank" rel="noreferrer">
                <WhatsAppIcon style={{ fontSize:18 }} />
                Chat on WhatsApp
              </a>
            </Box>
            <Box sx={{ display:'flex', justifyContent:'center', gap:3, flexWrap:'wrap', mt:3 }}>
              {['Free sample on request', 'Ships across India', '50+ schools trust us'].map(function(t) {
                return (
                  <Box key={t} sx={{ display:'flex', alignItems:'center', gap:0.7, color:T.slate, fontSize:'0.84rem', fontWeight:600 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize:15, color:T.green }} />
                    {t}
                  </Box>
                );
              })}
            </Box>
          </Container>
        </Box>

      </Box>
    </>
  );
}