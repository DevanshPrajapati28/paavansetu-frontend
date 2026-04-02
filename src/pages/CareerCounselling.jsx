import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarsIcon from '@mui/icons-material/Stars';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

gsap.registerPlugin(ScrollTrigger);

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
  white:    '#ffffff',
  snow:     '#fafdf7',
  cream:    '#fdf8f0',
  parchment:'#f5f0e8',
  ink:      '#1a2a1a',
  slate:    '#3d5a4a',
  ash:      '#6b7c72',
};

var CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');",
  "*,*::before,*::after{box-sizing:border-box;}",
  ".cc2-page{font-family:'DM Sans',sans-serif;}",
  "@keyframes floatA{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(12px,-18px) rotate(3deg)}66%{transform:translate(-8px,10px) rotate(-2deg)}}",
  "@keyframes floatB{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(-14px,10px) rotate(-4deg)}66%{transform:translate(10px,-12px) rotate(2deg)}}",
  "@keyframes floatC{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-14px)}}",
  "@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  "@keyframes pulseRing{0%,100%{transform:scale(1);opacity:0.45}50%{transform:scale(1.08);opacity:0.2}}",
  ".cc2-dots{background-image:radial-gradient(circle,rgba(14,101,45,0.11) 1.5px,transparent 1.5px);background-size:24px 24px;}",
  ".cc2-dots-blue{background-image:radial-gradient(circle,rgba(31,91,135,0.09) 1.5px,transparent 1.5px);background-size:20px 20px;}",
  ".cc2-wave{line-height:0;overflow:hidden;}",
  ".cc2-wave svg{display:block;width:100%;}",
  ".cc2-btn-wa{display:inline-flex;align-items:center;gap:8px;background:#22c55e;color:#fff;border:none;border-radius:50px;padding:14px 32px;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s;}",
  ".cc2-btn-wa:hover{background:#16a34a;transform:translateY(-3px);box-shadow:0 12px 28px rgba(34,197,94,0.28);}",
  ".cc2-btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#0e652d;border:2px solid #0e652d;border-radius:50px;padding:12px 28px;font-size:0.95rem;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;transition:all 0.3s;}",
  ".cc2-btn-outline:hover{background:#0e652d;color:#fff;transform:translateY(-3px);}",
  ".cc2-btn-green{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#0e652d;color:#fff;border:none;border-radius:50px;padding:15px 38px;font-size:1rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;min-width:260px;transition:all 0.3s;}",
  ".cc2-btn-green:hover{background:#1f5b87;transform:translateY(-3px);box-shadow:0 14px 32px rgba(14,101,45,0.26);}",
  ".cc2-btn-outline-green{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;color:#0e652d;border:2px solid #0e652d;border-radius:50px;padding:13px 34px;font-size:1rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;min-width:260px;transition:all 0.3s;}",
  ".cc2-btn-outline-green:hover{background:#0e652d;color:#fff;transform:translateY(-3px);}",
  ".cc2-who-card{transition:transform 0.32s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s;}",
  ".cc2-who-card:hover{transform:translateY(-7px) rotate(-0.3deg);box-shadow:0 20px 40px rgba(14,101,45,0.12) !important;}",
  ".cc2-who-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:#0e652d;transform:scaleX(0);transform-origin:left;transition:transform 0.3s ease;}",
  ".cc2-who-card:hover::before{transform:scaleX(1);}",
  ".cc2-offer-card{transition:transform 0.32s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s,border-color 0.3s;}",
  ".cc2-offer-card:hover{transform:translateY(-7px);box-shadow:0 20px 40px rgba(14,101,45,0.1) !important;}",
  ".cc2-offer-card:hover .cc2-offer-icon{transform:scale(1.15) rotate(-6deg);}",
  ".cc2-offer-icon{transition:transform 0.38s cubic-bezier(0.34,1.56,0.64,1);display:inline-flex;}",
  ".cc2-step-icon{transition:background 0.35s cubic-bezier(0.34,1.56,0.64,1),color 0.3s,transform 0.35s cubic-bezier(0.34,1.56,0.64,1) !important;}",
  ".cc2-step-card:hover .cc2-step-icon{background:#0e652d !important;color:#fff !important;transform:rotate(-8deg) scale(1.1) !important;}",
  ".cc2-benefit{transition:background 0.25s,transform 0.25s;}",
  ".cc2-benefit:hover{background:#e6f4eb !important;transform:translateX(5px);}",
  ".cc2-faq-item{border:1px solid #e0d8cc;border-radius:12px;margin-bottom:12px;overflow:hidden;transition:border-color 0.3s,box-shadow 0.3s;cursor:pointer;}",
  ".cc2-faq-item:hover,.cc2-faq-item.cc2-open{border-color:#0e652d;box-shadow:0 4px 18px rgba(14,101,45,0.1);}",
  ".cc2-faq-body{max-height:0;overflow:hidden;transition:max-height 0.38s ease;}",
  ".cc2-faq-body.cc2-open{max-height:220px;}",
  ".cc2-tag{transition:all 0.25s;}",
  ".cc2-tag:hover{transform:scale(1.05);}",
].join('\n');

var WHO_DATA = [
  { emoji: String.fromCodePoint(0x1F392), title: 'Students of Class 9 & 10',          desc: 'Early guidance to choose the right stream and subjects with clarity and confidence.',                                                              tag: 'Early Guidance',   bg: T.greenLt,  border: T.greenMid, col: T.green },
  { emoji: String.fromCodePoint(0x1F4DA), title: 'Students of Class 11 & 12',          desc: 'Planning career paths within India? Get clarity on courses, colleges, and entrance exams.',                                                       tag: 'College Planning', bg: T.blueLt,   border: T.blueMid,  col: T.blue  },
  { emoji: String.fromCodePoint(0x1F46A), title: 'Parents',                            desc: "Seeking clarity on academic direction for your child? Join a parent counselling session to understand how to support them.",                       tag: 'Parent Session',   bg: T.amberLt,  border: T.amberMid, col: T.amber },
  { emoji: String.fromCodePoint(0x1F393), title: 'Students planning careers in India', desc: 'Get expert guidance on Indian admissions, colleges, and academic pathways.',                                                                       tag: 'Admissions',       bg: T.greenLt,  border: T.greenMid, col: T.green },
];

var OFFER_DATA = [
  { Icon: GroupsIcon,      title: 'One-to-One Career Counselling',        desc: "Personalised sessions focused on understanding the student's aptitude, interests, and concerns.",         bg: T.greenLt,  border: T.greenMid, col: T.green, iconBg: T.greenMid },
  { Icon: AssessmentIcon,  title: 'Psychometric Assessments',             desc: 'Scientific tools to assess personality traits, abilities, and learning preferences.',                     bg: T.blueLt,   border: T.blueMid,  col: T.blue,  iconBg: T.blueMid  },
  { Icon: FingerprintIcon, title: 'DMIT Assessment',                      desc: "A fingerprint-based test to understand a student's innate strengths and natural inclinations.",            bg: T.amberLt,  border: T.amberMid, col: T.amber, iconBg: T.amberMid },
  { Icon: AutoStoriesIcon, title: 'Stream & Subject Selection',           desc: 'Support for choosing the right stream and subjects after Class 9 or 10.',                                 bg: T.greenLt,  border: T.greenMid, col: T.green, iconBg: T.greenMid },
  { Icon: StarsIcon,       title: 'Indian Admissions Guidance',           desc: 'Clarity on courses, colleges, and academic pathways within India.',                                       bg: T.blueLt,   border: T.blueMid,  col: T.blue,  iconBg: T.blueMid  },
  { Icon: PsychologyIcon,  title: 'Career-Related Astrological Insights', desc: 'Offered on request as an additional perspective to support decision-making.',                             bg: T.amberLt,  border: T.amberMid, col: T.amber, iconBg: T.amberMid },
];

var STEPS_DATA = [
  { num: '01', Icon: AssessmentIcon,   title: 'Psychometric Assessment', desc: 'A comprehensive online test evaluating personality, aptitude, interest, and learning style.',   bg: T.greenLt,  border: T.greenMid, col: T.green },
  { num: '02', Icon: PsychologyIcon,   title: 'One-on-One Counselling',  desc: '60-90 min personalised session to decode your report and understand your unique strengths.',     bg: T.blueLt,   border: T.blueMid,  col: T.blue  },
  { num: '03', Icon: RocketLaunchIcon, title: 'Career Roadmap',          desc: 'A detailed written roadmap listing streams, courses, colleges, and action steps.',                bg: T.amberLt,  border: T.amberMid, col: T.amber },
  { num: '04', Icon: SupportAgentIcon, title: 'Follow-Up Support',       desc: '30 days of post-session WhatsApp support as you implement your roadmap.',                         bg: T.greenLt,  border: T.greenMid, col: T.green },
];

var BENEFITS_DATA = [
  'One-to-One Career Counselling Sessions',
  'Personalised 60-90 min counselling session',
  'Psychometric Assessments',
  'DMIT (Dermatoglyphics Multiple Intelligence Test)',
  'Stream & Subject Selection Guidance',
  'Indian Admissions Guidance',
  'Career-Related Astrological Insights (Optional)',
  'Parent briefing (optional add-on)',
  '30 days of WhatsApp follow-up support',
];

var FAQS_DATA = [
  { q: 'What age groups do you work with?',     a: 'We work with students from Class 8 onwards up to undergraduates and working professionals seeking a career change. Different programmes are available for different life stages.' },
  { q: 'Is the session available online?',       a: 'Yes! Sessions are available both in-person in Surat and online via Google Meet or Zoom, making it accessible across India.' },
  { q: 'What is included in the fee?',           a: 'The fee includes the psychometric assessment, the counselling session, the written career report, and 30 days of follow-up support.' },
  { q: 'How accurate is the psychometric test?', a: "We use internationally validated assessments with a high reliability score. However, the test is a tool — our counsellor's interpretive session is where the real insight comes from." },
  { q: 'Can parents attend the session?',        a: 'Yes, parents are welcome to attend the session or a separate 15-minute parent briefing can be scheduled.' },
];

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

function FaqSection() {
  var s = useState(FAQS_DATA.map(function(){ return false; }));
  var openArr = s[0]; var setOpenArr = s[1];
  function toggle(i){ setOpenArr(function(p){ return p.map(function(v,idx){ return idx===i?!v:v; }); }); }
  return React.createElement(React.Fragment, null,
    FAQS_DATA.map(function(faq, i) {
      var open = openArr[i];
      return React.createElement('div', { key:i, className:'cc2-faq-item'+(open?' cc2-open':''), onClick:function(){ toggle(i); } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 24px', gap:14 } },
          React.createElement('span', { style:{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, color:T.blue, fontSize:'1rem', flex:1 } }, faq.q),
          React.createElement('span', { style:{ color:T.green, width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', background:T.greenLt, borderRadius:'50%', flexShrink:0 } },
            open ? React.createElement(RemoveIcon, { sx:{ fontSize:15 } }) : React.createElement(AddIcon, { sx:{ fontSize:15 } })
          )
        ),
        React.createElement('div', { className:'cc2-faq-body'+(open?' cc2-open':'') },
          React.createElement('p', { style:{ margin:0, padding:'0 24px 20px', fontFamily:"'DM Sans',sans-serif", color:T.ash, lineHeight:1.85, fontSize:'0.94rem' } }, faq.a)
        )
      );
    })
  );
}

export default function CareerCounselling() {

  useEffect(function() {
    gsap.fromTo('.cc2-hero-anim', { opacity:0, y:32 }, { opacity:1, y:0, duration:0.9, stagger:0.13, ease:'power3.out', delay:0.15 });

    gsap.fromTo('.cc2-who-card', { opacity:0, y:45, scale:0.94 }, { opacity:1, y:0, scale:1, duration:0.65, stagger:0.1, ease:'back.out(1.6)', scrollTrigger:{ trigger:'.cc2-who-grid', start:'top 83%', once:true } });

    gsap.utils.toArray('.cc2-offer-card').forEach(function(card, i) {
      gsap.fromTo(card, { opacity:0, x:i%2===0?-45:45, y:15 }, { opacity:1, x:0, y:0, duration:0.72, ease:'power3.out', scrollTrigger:{ trigger:card, start:'top 85%', once:true } });
    });

    gsap.fromTo('.cc2-approach-l', { opacity:0, x:-45 }, { opacity:1, x:0, duration:0.8, ease:'power3.out', scrollTrigger:{ trigger:'.cc2-approach-wrap', start:'top 80%', once:true } });
    gsap.fromTo('.cc2-approach-r', { opacity:0, x:45  }, { opacity:1, x:0, duration:0.8, ease:'power3.out', scrollTrigger:{ trigger:'.cc2-approach-wrap', start:'top 80%', once:true } });

    gsap.fromTo('.cc2-step-card', { opacity:0, y:50 }, { opacity:1, y:0, duration:0.65, stagger:0.12, ease:'back.out(1.5)', scrollTrigger:{ trigger:'.cc2-steps-grid', start:'top 83%', once:true } });

    gsap.utils.toArray('.cc2-benefit').forEach(function(el, i) {
      gsap.fromTo(el, { opacity:0, x:i%2===0?-28:28 }, { opacity:1, x:0, duration:0.6, ease:'power2.out', scrollTrigger:{ trigger:el, start:'top 88%', once:true } });
    });

    gsap.fromTo('.cc2-faq-item', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, stagger:0.1, ease:'power2.out', scrollTrigger:{ trigger:'.cc2-faq-list', start:'top 83%', once:true } });

    gsap.utils.toArray('.cc2-section-head').forEach(function(el) {
      gsap.fromTo(el, { opacity:0, y:24 }, { opacity:1, y:0, duration:0.7, ease:'power2.out', scrollTrigger:{ trigger:el, start:'top 86%', once:true } });
    });

    gsap.fromTo('.cc2-cta-inner', { opacity:0, y:36 }, { opacity:1, y:0, duration:0.85, ease:'power2.out', scrollTrigger:{ trigger:'.cc2-cta-inner', start:'top 88%', once:true } });

    return function(){ ScrollTrigger.getAll().forEach(function(t){ t.kill(); }); };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Box className="cc2-page" sx={{ bgcolor:T.snow, pt:8, overflowX:'hidden' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <Box sx={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#f0faf3 0%,#e8f4ff 55%,#fdf8f0 100%)', py:{ xs:10, md:14 } }}>
          <Box sx={{ position:'absolute', top:50, left:'5%', width:130, height:130, borderRadius:'40% 60% 55% 45%', bgcolor:T.greenMid, opacity:0.4, animation:'floatA 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', top:'20%', right:'7%', width:100, height:100, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.38, animation:'floatB 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'16%', left:'14%', width:65, height:65, borderRadius:'50%', bgcolor:'#fde8b8', opacity:0.65, animation:'floatC 7s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'12%', right:'16%', width:85, height:85, borderRadius:'45% 55% 60% 40%', bgcolor:T.greenMid, opacity:0.32, animation:'floatA 9s ease-in-out infinite 2s', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', top:'6%', right:'20%', width:160, height:160, borderRadius:'50%', border:'2px dashed rgba(14,101,45,0.16)', animation:'spinSlow 20s linear infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'10%', left:'18%', width:110, height:110, borderRadius:'50%', border:'2px dashed rgba(31,91,135,0.14)', animation:'spinSlow 26s linear infinite reverse', pointerEvents:'none' }} />
          <Box className="cc2-dots" sx={{ position:'absolute', inset:0, opacity:0.55, pointerEvents:'none' }} />

          <Container maxWidth="lg">
            <Box sx={{ textAlign:'center', position:'relative', zIndex:1 }}>

              <Box className="cc2-hero-anim" sx={{ display:'inline-flex', alignItems:'center', gap:1, opacity:0, bgcolor:T.white, border:'1.5px solid '+T.greenMid, color:T.green, px:2.5, py:1, borderRadius:99, mb:4, fontSize:'0.78rem', fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase', boxShadow:'0 4px 12px rgba(14,101,45,0.1)' }}>
                <span style={{ fontSize:'1rem' }}>🎯</span>
                Expert Career Guidance
              </Box>

              <Typography className="cc2-hero-anim" variant="h1" sx={{ fontFamily:"'Playfair Display',Georgia,serif", color:T.ink, fontSize:{ xs:'2.8rem', md:'4.6rem' }, fontWeight:700, lineHeight:1.08, mb:2, opacity:0, letterSpacing:'-0.025em' }}>
                Why Career{' '}
                <Box component="span" sx={{ background:'linear-gradient(135deg,#0e652d 0%,#1f5b87 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Counselling
                </Box>
              </Typography>

              <Typography className="cc2-hero-anim" sx={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', color:T.slate, fontSize:{ xs:'1.1rem', md:'1.3rem' }, mb:2.5, opacity:0 }}>
                Is Important
              </Typography>

              <Typography className="cc2-hero-anim" sx={{ color:T.ash, fontSize:{ xs:'1rem', md:'1.1rem' }, lineHeight:1.85, mb:3, maxWidth:640, mx:'auto', opacity:0 }}>
                Students are expected to make life-defining decisions at a very early stage — often based on marks, peer pressure, or limited information. This leads to confusion, stress, and lack of clarity.
              </Typography>

              <Box className="cc2-hero-anim" sx={{ opacity:0, maxWidth:640, mx:'auto', mb:6, bgcolor:T.greenLt, border:'1.5px solid '+T.greenMid, borderRadius:3, px:3, py:2.5, display:'flex', alignItems:'flex-start', gap:1.5 }}>
                <Box sx={{ width:4, flexShrink:0, bgcolor:T.green, borderRadius:2, alignSelf:'stretch', minHeight:40 }} />
                <Typography sx={{ color:T.green, fontSize:'1.02rem', fontStyle:'italic', lineHeight:1.8, fontFamily:"'Playfair Display',serif" }}>
                  Career counselling at <strong>Paavan Setu</strong> focuses on helping students understand <strong>themselves first</strong> — their interests, strengths, learning style, and natural abilities — so decisions are taken with awareness and confidence, not pressure.
                </Typography>
              </Box>

              <Box className="cc2-hero-anim" sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', opacity:0 }}>
                <a className="cc2-btn-wa" href="https://wa.me/916351113766?text=Hello%2C%20I%20would%20like%20to%20book%20a%20career%20counselling%20session.%20Please%20share%20available%20slots%2C%20fees%2C%20and%20further%20details." 
                  target="_blank" 
                  rel="noreferrer">
                  <WhatsAppIcon sx={{ fontSize:20 }} />
                  Book via WhatsApp
                </a>
                <Link to="/contact" className="cc2-btn-outline">
                  Enquire Now
                  <ArrowForwardIcon sx={{ fontSize:18 }} />
                </Link>
              </Box>

            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 1 ════════════════════════════════════════════════════════ */}
        <Box className="cc2-wave" sx={{ mt:'-1px' }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ WHO IS THIS FOR ═══════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="lg">
            <Box className="cc2-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.blueLt} col={T.blue} border={T.blueMid}>Is This For You?</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Who This Is <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>For</Box>
              </Typography>
            </Box>
            <Box className="cc2-who-grid">
              <Grid container spacing={3}>
                {WHO_DATA.map(function(item, i) {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Box className="cc2-who-card" sx={{ opacity:0, height:'100%', p:3.5, bgcolor:item.bg, border:'1.5px solid '+item.border, borderRadius:3, position:'relative', overflow:'hidden', boxShadow:'0 3px 14px rgba(14,101,45,0.05)' }}>
                        <Box sx={{ position:'absolute', bottom:-16, right:-16, width:64, height:64, borderRadius:'50%', border:'2px solid '+item.col, opacity:0.1, animation:'pulseRing 3.5s ease-in-out infinite' }} />
                        <Box sx={{ display:'inline-flex', bgcolor:T.white, border:'1px solid '+item.border, px:1.5, py:0.5, borderRadius:99, mb:2 }}>
                          <Typography sx={{ fontSize:'0.7rem', color:item.col, fontWeight:700, letterSpacing:1 }}>{item.tag}</Typography>
                        </Box>
                        <Typography sx={{ fontSize:'2.2rem', mb:1.5 }}>{item.emoji}</Typography>
                        <Typography sx={{ color:T.ink, mb:1, fontSize:'1.05rem', fontWeight:700 }}>{item.title}</Typography>
                        <Box sx={{ width:24, height:3, bgcolor:item.col, borderRadius:2, mb:1.2 }} />
                        <Typography sx={{ color:T.ash, fontSize:'0.9rem', lineHeight:1.8 }}>{item.desc}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 2 ════════════════════════════════════════════════════════ */}
        <Box className="cc2-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,0 720,60 1080,30 C1260,15 1380,10 1440,0 L1440,60 L0,60 Z" fill="#f0faf3" />
          </svg>
        </Box>

        {/* ══ WHAT WE OFFER ═════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, background:'linear-gradient(135deg,#f0faf3 0%,#eaf4ff 100%)' }}>
          <Container maxWidth="lg">
            <Box className="cc2-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.greenLt} col={T.green} border={T.greenMid}>Our Services</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                What We <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Offer</Box>
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {OFFER_DATA.map(function(item, i) {
                var IconComp = item.Icon;
                return (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box className="cc2-offer-card" sx={{ opacity:0, p:3.5, height:'100%', bgcolor:T.white, border:'1.5px solid '+item.border, borderRadius:4, textAlign:'center', boxShadow:'0 3px 14px rgba(14,101,45,0.05)', position:'relative', overflow:'hidden' }}>
                      <Box sx={{ position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(90deg,'+item.col+','+(item.col===T.amber?T.green:T.blue)+')' }} />
                      <Box sx={{ position:'absolute', bottom:-16, right:-16, width:60, height:60, borderRadius:'50%', border:'2px solid '+item.col, opacity:0.08, animation:'pulseRing 4s ease-in-out infinite' }} />
                      <Box sx={{ display:'flex', justifyContent:'center', mb:2, mt:1 }}>
                        <Box sx={{ bgcolor:item.iconBg, p:1.8, borderRadius:2, display:'inline-flex' }}>
                          <IconComp className="cc2-offer-icon" sx={{ fontSize:34, color:item.col }} />
                        </Box>
                      </Box>
                      <Typography sx={{ color:T.ink, fontWeight:700, fontSize:'1rem', mb:0.8 }}>{item.title}</Typography>
                      <Box sx={{ width:28, height:3, bgcolor:item.col, borderRadius:2, mb:1.2, mx:'auto' }} />
                      <Typography sx={{ color:T.ash, fontSize:'0.9rem', lineHeight:1.75 }}>{item.desc}</Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE 3 ════════════════════════════════════════════════════════ */}
        <Box className="cc2-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ OUR APPROACH ══════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="lg">
            <Box className="cc2-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.amberLt} col={T.amber} border={T.amberMid}>Our Philosophy</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Our <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Approach</Box>
              </Typography>
            </Box>
            <Box className="cc2-approach-wrap">
              <Grid container spacing={5} alignItems="center">
                <Grid item xs={12} md={5}>
                  <Box className="cc2-approach-l" sx={{ opacity:0, p:{ xs:3.5, md:5 }, borderRadius:4, bgcolor:T.parchment, borderLeft:'6px solid '+T.green, position:'relative', overflow:'hidden', boxShadow:'0 8px 28px rgba(14,101,45,0.08)' }}>
                    <Box sx={{ position:'absolute', top:6, right:18, fontFamily:'Georgia,serif', fontSize:'7rem', color:T.green, opacity:0.07, lineHeight:1, userSelect:'none' }}>&ldquo;</Box>
                    <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:{ xs:'1.4rem', md:'1.7rem' }, fontStyle:'italic', color:T.ink, lineHeight:1.55, mb:3 }}>
                      The right career begins with knowing yourself, not just your marks.
                    </Typography>
                    <Box sx={{ display:'flex', gap:1, flexWrap:'wrap' }}>
                      {['Student-Centric', 'Practical', 'No Pressure'].map(function(tag) {
                        return (
                          <Box key={tag} className="cc2-tag" sx={{ px:1.8, py:0.5, bgcolor:T.greenLt, border:'1px solid '+T.greenMid, borderRadius:99, color:T.green, fontSize:'0.78rem', fontWeight:700, display:'flex', alignItems:'center', gap:0.7 }}>
                            <CheckCircleOutlineIcon sx={{ fontSize:13 }} />
                            {tag}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Box className="cc2-approach-r" sx={{ opacity:0 }}>
                    <Typography sx={{ color:T.ash, fontSize:'1.04rem', lineHeight:1.9, mb:2.5 }}>
                      At <strong style={{ color:T.ink }}>Paavan Setu</strong>, career counselling is{' '}
                      <strong style={{ color:T.green }}>student-centric and practical</strong>.
                      Each session begins with listening and understanding, followed by structured guidance.
                    </Typography>
                    <Typography sx={{ color:T.ash, fontSize:'1.04rem', lineHeight:1.9 }}>
                      The aim is to help students move forward with clarity, confidence, and self-belief — without comparison or unnecessary pressure. We guide; you decide.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 4 ════════════════════════════════════════════════════════ */}
        <Box className="cc2-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,20 C300,60 700,0 1100,40 C1280,55 1380,45 1440,30 L1440,60 L0,60 Z" fill="#eaf5ee" />
          </svg>
        </Box>

        {/* ══ HOW IT WORKS ══════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, background:'linear-gradient(135deg,#eaf5ee 0%,#e4eef6 100%)' }}>
          <Container maxWidth="lg">
            <Box className="cc2-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.greenLt} col={T.green} border={T.greenMid}>Our Process</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                How It <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Works</Box>
              </Typography>
            </Box>
            <Box className="cc2-steps-grid" sx={{ position:'relative' }}>
              <Box sx={{ display:{ xs:'none', md:'block' }, position:'absolute', top:50, left:'12.5%', right:'12.5%', height:2, backgroundImage:'repeating-linear-gradient(90deg,'+T.amber+' 0,'+T.amber+' 8px,transparent 8px,transparent 18px)', zIndex:0 }} />
              <Grid container spacing={3} sx={{ position:'relative', zIndex:1 }}>
                {STEPS_DATA.map(function(step, i) {
                  var Icon = step.Icon;
                  return (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Box className="cc2-step-card" sx={{ opacity:0, textAlign:'center', px:2 }}>
                        <Box className="cc2-step-icon" sx={{ width:76, height:76, borderRadius:'50%', bgcolor:T.white, border:'2px solid '+step.border, boxShadow:'0 4px 16px rgba(14,101,45,0.1)', mx:'auto', mb:1.5, display:'flex', alignItems:'center', justifyContent:'center', color:step.col }}>
                          <Icon sx={{ fontSize:30 }} />
                        </Box>
                        <Box sx={{ display:'inline-block', bgcolor:step.bg, color:step.col, border:'1.5px solid '+step.border, px:1.8, py:0.35, borderRadius:99, fontSize:'0.7rem', fontWeight:800, letterSpacing:1, mb:1.5 }}>
                          STEP {step.num}
                        </Box>
                        <Typography sx={{ color:T.ink, fontWeight:700, fontSize:'1.02rem', mb:1 }}>{step.title}</Typography>
                        <Typography sx={{ color:T.ash, fontSize:'0.9rem', lineHeight:1.8 }}>{step.desc}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 5 ════════════════════════════════════════════════════════ */}
        <Box className="cc2-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C240,55 600,5 960,35 C1200,55 1380,20 1440,10 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ EVERYTHING YOU GET ════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="md">
            <Box className="cc2-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.blueLt} col={T.blue} border={T.blueMid}>What You Receive</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Everything You <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Get</Box>
              </Typography>
            </Box>
            <Grid container spacing={1.5}>
              {BENEFITS_DATA.map(function(item, i) {
                return (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box className="cc2-benefit" sx={{ opacity:0, display:'flex', alignItems:'flex-start', gap:1.5, p:2, borderRadius:2, bgcolor:i%2===0?T.greenLt:T.blueLt, border:'1px solid '+(i%2===0?T.greenMid:T.blueMid) }}>
                      <CheckCircleOutlineIcon sx={{ color:i%2===0?T.green:T.blue, fontSize:20, mt:0.1, flexShrink:0 }} />
                      <Typography sx={{ color:T.ash, fontSize:'0.92rem', lineHeight:1.7 }}>{item}</Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE 6 ════════════════════════════════════════════════════════ */}
        <Box className="cc2-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C400,5 800,55 1200,25 C1340,10 1400,15 1440,20 L1440,60 L0,60 Z" fill="#f5f0e8" />
          </svg>
        </Box>

        {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.parchment }}>
          <Container maxWidth="md">
            <Box className="cc2-section-head" sx={{ textAlign:'center', mb:7, opacity:0 }}>
              <SectionLabel bg={T.amberLt} col={T.amber} border={T.amberMid}>FAQ</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.8rem' }, fontWeight:600 }}>
                Frequently Asked <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Questions</Box>
              </Typography>
            </Box>
            <Box className="cc2-faq-list"><FaqSection /></Box>
          </Container>
        </Box>

        {/* ══ WAVE 7 ════════════════════════════════════════════════════════ */}
        <Box className="cc2-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,10 C300,55 700,5 1050,35 C1250,55 1380,30 1440,20 L1440,60 L0,60 Z" fill="#eaf5ee" />
          </svg>
        </Box>

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:10, md:14 }, background:'linear-gradient(145deg,#eaf5ee 0%,#e4eef6 50%,#fdf8f0 100%)', position:'relative', overflow:'hidden', textAlign:'center' }}>
          <Box sx={{ position:'absolute', top:'10%', left:'4%', width:100, height:100, borderRadius:'50%', bgcolor:T.greenMid, opacity:0.28, animation:'floatA 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'14%', right:'5%', width:80, height:80, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.28, animation:'floatB 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box className="cc2-dots-blue" sx={{ position:'absolute', inset:0, opacity:0.45, pointerEvents:'none' }} />

          <Container maxWidth="sm" sx={{ position:'relative', zIndex:1 }}>
            <Box className="cc2-cta-inner" sx={{ opacity:0 }}>
              <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:T.white, color:T.green, px:2.5, py:1, borderRadius:99, fontSize:'0.78rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', mb:3, boxShadow:'0 4px 14px rgba(14,101,45,0.1)', border:'1.5px solid '+T.greenMid }}>
                Ready to Start?
              </Box>
              <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'1.9rem', md:'2.8rem' }, fontWeight:700, mb:2, lineHeight:1.2 }}>
                Ready to find your{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>true path?</Box>
              </Typography>
              <Typography sx={{ color:T.slate, fontSize:'1.05rem', mb:1, lineHeight:1.8 }}>
                Sessions available <strong style={{ color:T.ink }}>by prior appointment</strong>.
              </Typography>
              <Typography sx={{ color:T.ash, fontSize:'0.9rem', mb:5 }}>
                Surat (in-person) &bull; Online across India
              </Typography>
              <Box sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', mb:4 }}>
                <a className="cc2-btn-green" href="https://wa.me/916351113766" target="_blank" rel="noreferrer">
                  <WhatsAppIcon sx={{ fontSize:20 }} />
                  Book a Session
                </a>
                <Link to="/contact" className="cc2-btn-outline-green">
                  Request a Call
                  <ArrowForwardIcon sx={{ fontSize:18 }} />
                </Link>
              </Box>
              <Box sx={{ display:'flex', justifyContent:'center', gap:3, flexWrap:'wrap' }}>
                {['Free 10-min consultation', 'No commitment required', 'Expert guidance'].map(function(t) {
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
