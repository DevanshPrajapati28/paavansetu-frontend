import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Container, Typography, Grid,
  TextField, MenuItem, Snackbar, Alert, Stack
} from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const API = process.env.REACT_APP_API_URL;

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
  ".ct-page{font-family:'DM Sans',sans-serif;}",
  "@keyframes floatA{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(12px,-18px) rotate(3deg)}66%{transform:translate(-8px,10px) rotate(-2deg)}}",
  "@keyframes floatB{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(-14px,10px) rotate(-4deg)}66%{transform:translate(10px,-12px) rotate(2deg)}}",
  "@keyframes floatC{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,-14px)}}",
  "@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  "@keyframes pulseRing{0%,100%{transform:scale(1);opacity:0.45}50%{transform:scale(1.08);opacity:0.2}}",
  "@keyframes shimmerBtn{0%{background-position:200% center}100%{background-position:-200% center}}",
  ".ct-dots{background-image:radial-gradient(circle,rgba(14,101,45,0.11) 1.5px,transparent 1.5px);background-size:24px 24px;}",
  ".ct-dots-blue{background-image:radial-gradient(circle,rgba(31,91,135,0.09) 1.5px,transparent 1.5px);background-size:20px 20px;}",
  ".ct-wave{line-height:0;overflow:hidden;}",
  ".ct-wave svg{display:block;width:100%;}",

  /* info cards */
  ".ct-info-card{transition:transform 0.32s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s;}",
  ".ct-info-card:hover{transform:translateY(-6px);box-shadow:0 18px 36px rgba(14,101,45,0.12) !important;}",

  /* action link buttons */
  ".ct-action-link{display:inline-flex;align-items:center;gap:6px;border-radius:50px;padding:7px 18px;font-size:0.78rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;text-decoration:none;border:1.5px solid;transition:all 0.25s;}",

  /* submit button */
  ".ct-submit-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;background:#0e652d;color:#fff;border:none;border-radius:50px;padding:16px 32px;font-size:1rem;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.3s;letter-spacing:0.3px;}",
  ".ct-submit-btn:hover:not(:disabled){background:#1f5b87;transform:translateY(-2px);box-shadow:0 12px 30px rgba(14,101,45,0.26);}",
  ".ct-submit-btn:disabled{opacity:0.65;cursor:not-allowed;}",

  /* form field overrides are handled via sx on TextField */
].join('\n');

var SERVICES = [
  'Career Counselling',
  'School Workshop',
  'Bulk Book Order',
  'Teacher Training',
  'Parent Workshop',
  'Partnership Enquiry',
  'Other',
];

var TRUST_ITEMS = [
  'Response within 2-4 hours',
  'No spam, ever',
  'Free initial consultation',
];

/* ─── FIELD SX ────────────────────────────────────────────────────────────── */
var tfSx = {
  '& .MuiOutlinedInput-root': {
    fontFamily: "'DM Sans', sans-serif",
    borderRadius: '12px',
    bgcolor: T.white,
    '& fieldset': { borderColor: T.greenMid, borderWidth: '1.5px' },
    '&:hover fieldset': { borderColor: T.green },
    '&.Mui-focused fieldset': { borderColor: T.green, borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'DM Sans', sans-serif",
    color: T.ash,
    '&.Mui-focused': { color: T.green },
  },
  '& .MuiInputBase-input': {
    fontFamily: "'DM Sans', sans-serif",
    color: T.ink,
  },
  '& .MuiSelect-select': {
    fontFamily: "'DM Sans', sans-serif",
  },
};

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
export default function Contact() {
  var formState  = useState({ name:'', email:'', phone:'', service:'', message:'' });
  var formData   = formState[0]; var setFormData = formState[1];
  var snackState = useState({ open:false, msg:'', severity:'success' });
  var snack      = snackState[0]; var setSnack = snackState[1];
  var loadState  = useState(false);
  var loading    = loadState[0]; var setLoading = loadState[1];

  useEffect(function() {
    gsap.fromTo('.ct-hero-anim',
      { opacity:0, y:32 },
      { opacity:1, y:0, duration:0.9, stagger:0.13, ease:'power3.out', delay:0.15 }
    );
    gsap.fromTo('.ct-info-card',
      { opacity:0, y:45, scale:0.94 },
      { opacity:1, y:0, scale:1, duration:0.65, stagger:0.12, ease:'back.out(1.6)',
        scrollTrigger:{ trigger:'.ct-info-col', start:'top 83%', once:true } }
    );
    gsap.fromTo('.ct-form-wrap',
      { opacity:0, x:45 },
      { opacity:1, x:0, duration:0.85, ease:'power3.out',
        scrollTrigger:{ trigger:'.ct-form-wrap', start:'top 82%', once:true } }
    );
    gsap.fromTo('.ct-trust-item',
      { opacity:0, y:20 },
      { opacity:1, y:0, duration:0.55, stagger:0.1, ease:'power2.out',
        scrollTrigger:{ trigger:'.ct-trust-row', start:'top 88%', once:true } }
    );
    return function(){ ScrollTrigger.getAll().forEach(function(t){ t.kill(); }); };
  }, []);

  function handleChange(e) {
    var name = e.target.name; var value = e.target.value;
    setFormData(function(p){ return Object.assign({}, p, { [name]: value }); });
  }

  async function handleSubmit() {
    if (!formData.name || !formData.phone) {
      setSnack({
        open: true,
        msg: 'Please fill in your name and phone number.',
        severity: 'error'
      });
      return;
    }
  
    try {
      setLoading(true);
  
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.success) {
        setSnack({
          open: true,
          msg: data.message,
          severity: 'success'
        });
  
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
  
      } else {
        setSnack({
          open: true,
          msg: data.message || 'Something went wrong',
          severity: 'error'
        });
      }
  
    } catch (error) {
      console.error(error);
  
      setSnack({
        open: true,
        msg: 'Server error. Please try again.',
        severity: 'error'
      });
  
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <Box className="ct-page" sx={{ bgcolor:T.snow, pt:8, overflowX:'hidden' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <Box sx={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#f0faf3 0%,#e8f4ff 55%,#fdf8f0 100%)', py:{ xs:10, md:14 } }}>
          {/* Floating blobs */}
          <Box sx={{ position:'absolute', top:50, left:'5%', width:120, height:120, borderRadius:'40% 60% 55% 45%', bgcolor:T.greenMid, opacity:0.4, animation:'floatA 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', top:'18%', right:'7%', width:95, height:95, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.38, animation:'floatB 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'15%', left:'13%', width:60, height:60, borderRadius:'50%', bgcolor:'#fde8b8', opacity:0.65, animation:'floatC 7s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'12%', right:'14%', width:80, height:80, borderRadius:'45% 55% 60% 40%', bgcolor:T.greenMid, opacity:0.3, animation:'floatA 9s ease-in-out infinite 2s', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', top:'6%', right:'22%', width:150, height:150, borderRadius:'50%', border:'2px dashed rgba(14,101,45,0.16)', animation:'spinSlow 20s linear infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'10%', left:'18%', width:100, height:100, borderRadius:'50%', border:'2px dashed rgba(31,91,135,0.14)', animation:'spinSlow 26s linear infinite reverse', pointerEvents:'none' }} />
          <Box className="ct-dots" sx={{ position:'absolute', inset:0, opacity:0.55, pointerEvents:'none' }} />

          <Container maxWidth="md">
            <Box sx={{ textAlign:'center', position:'relative', zIndex:1 }}>

              <Box className="ct-hero-anim" sx={{ display:'inline-flex', alignItems:'center', gap:1, opacity:0, bgcolor:T.white, border:'1.5px solid '+T.greenMid, color:T.green, px:2.5, py:1, borderRadius:99, mb:4, fontSize:'0.78rem', fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase', boxShadow:'0 4px 12px rgba(14,101,45,0.1)' }}>
                <span style={{ fontSize:'1rem' }}>💬</span>
                We'd Love to Hear From You
              </Box>

              <Typography className="ct-hero-anim" variant="h1" sx={{ fontFamily:"'Playfair Display',Georgia,serif", color:T.ink, fontSize:{ xs:'2.8rem', md:'4.6rem' }, fontWeight:700, lineHeight:1.08, mb:2.5, opacity:0, letterSpacing:'-0.025em' }}>
                Get In{' '}
                <Box component="span" sx={{ background:'linear-gradient(135deg,#0e652d 0%,#1f5b87 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Touch
                </Box>
              </Typography>

              <Typography className="ct-hero-anim" sx={{ color:T.ash, fontSize:{ xs:'1rem', md:'1.15rem' }, lineHeight:1.85, mb:6, maxWidth:500, mx:'auto', opacity:0 }}>
                Have a question? Want to book a session or partner with us?
                We&apos;d love to hear from you.
              </Typography>

              {/* Quick-action buttons row */}
              <Box className="ct-hero-anim" sx={{ display:'flex', justifyContent:'center', gap:2, flexWrap:'wrap', opacity:0 }}>
                <a href="https://wa.me/916351113766?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20organization%20and%20the%20services%20you%20offer.%20Kindly%20provide%20more%20details." 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:T.wa, color:'#fff', border:'none', borderRadius:50,
                  padding:'12px 28px', fontSize:'0.92rem', fontWeight:700,
                  fontFamily:"'DM Sans',sans-serif", textDecoration:'none',
                  transition:'all 0.3s',
                }}
                  onMouseEnter={function(e){ e.currentTarget.style.background='#16a34a'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={function(e){ e.currentTarget.style.background=T.wa; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  <WhatsAppIcon style={{ fontSize:20 }} />
                  WhatsApp Us
                </a>
                <a href="mailto:careerhatch2024@gmail.com" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'transparent', color:T.blue,
                  border:'2px solid '+T.blue, borderRadius:50,
                  padding:'10px 26px', fontSize:'0.92rem', fontWeight:700,
                  fontFamily:"'DM Sans',sans-serif", textDecoration:'none',
                  transition:'all 0.3s',
                }}
                  onMouseEnter={function(e){ e.currentTarget.style.background=T.blue; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={function(e){ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=T.blue; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  <EmailIcon style={{ fontSize:18 }} />
                  Email Us
                </a>
              </Box>

            </Box>
          </Container>
        </Box>

        {/* ══ WAVE 1 ════════════════════════════════════════════════════════ */}
        <Box className="ct-wave" sx={{ mt:'-1px' }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </Box>

        {/* ══ CONTACT SECTION ════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.white }}>
          <Container maxWidth="lg">
            <Grid container spacing={5} alignItems="flex-start">

              {/* ── LEFT: Info cards ── */}
              <Grid item xs={12} md={4} className="ct-info-col">
                <Box sx={{ mb:4 }}>
                  <SectionLabel bg={T.greenLt} col={T.green} border={T.greenMid}>Contact Details</SectionLabel>
                  <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'1.8rem', md:'2.2rem' }, fontWeight:600, textAlign:'center' }}>
                    Reach Us{' '}
                    <Box component="span" sx={{ color:T.blue, fontStyle:'italic' }}>Anytime</Box>
                  </Typography>
                </Box>

                <Stack spacing={2.5}>
                  {/* WhatsApp */}
                  <Box className="ct-info-card" sx={{ opacity:0, p:3, borderRadius:3, bgcolor:T.waLt, border:'1.5px solid '+T.waMid, boxShadow:'0 3px 14px rgba(34,197,94,0.07)', position:'relative', overflow:'hidden' }}>
                    <Box sx={{ position:'absolute', bottom:-14, right:-14, width:56, height:56, borderRadius:'50%', border:'2px solid '+T.wa, opacity:0.12, animation:'pulseRing 3.5s ease-in-out infinite' }} />
                    <Box sx={{ display:'flex', alignItems:'center', gap:1.5, mb:1 }}>
                      <Box sx={{ bgcolor:'#bbf7d0', p:1, borderRadius:2, display:'flex' }}>
                        <WhatsAppIcon sx={{ color:T.wa, fontSize:22 }} />
                      </Box>
                      <Typography sx={{ color:T.ash, fontSize:'0.72rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase' }}>WhatsApp / Call</Typography>
                    </Box>
                    <Typography sx={{ color:T.ink, fontWeight:700, fontSize:'1.1rem', mb:1.5 }}>+91 63511-13766</Typography>
                    <a href="https://wa.me/916351113766?text=Hello%2C%20I%20would%20like%20to%20connect%20with%20you%20and%20get%20more%20information%20about%20your%20programs.%20Please%20guide%20me." 
                      target="_blank" 
                      rel="noreferrer" 
                      className="ct-action-link" 
                      style={{ color:T.wa, borderColor:T.waMid, background:'#fff' }}>
                      <WhatsAppIcon style={{ fontSize:14 }} />
                      Chat Now
                    </a>
                  </Box>

                  {/* Email */}
                  <Box className="ct-info-card" sx={{ opacity:0, p:3, borderRadius:3, bgcolor:T.blueLt, border:'1.5px solid '+T.blueMid, boxShadow:'0 3px 14px rgba(31,91,135,0.06)', position:'relative', overflow:'hidden' }}>
                    <Box sx={{ position:'absolute', bottom:-14, right:-14, width:56, height:56, borderRadius:'50%', border:'2px solid '+T.blue, opacity:0.1, animation:'pulseRing 4s ease-in-out infinite' }} />
                    <Box sx={{ display:'flex', alignItems:'center', gap:1.5, mb:1 }}>
                      <Box sx={{ bgcolor:T.blueMid, p:1, borderRadius:2, display:'flex' }}>
                        <EmailIcon sx={{ color:T.blue, fontSize:22 }} />
                      </Box>
                      <Typography sx={{ color:T.ash, fontSize:'0.72rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase' }}>Email Us</Typography>
                    </Box>
                    <Typography sx={{ color:T.ink, fontWeight:700, fontSize:'0.95rem', mb:1.5, wordBreak:'break-all' }}>careerhatch2024@gmail.com</Typography>
                    <a href="mailto:careerhatch2024@gmail.com" className="ct-action-link" style={{ color:T.blue, borderColor:T.blueMid, background:'#fff' }}>
                      <EmailIcon style={{ fontSize:14 }} />
                      Send Email
                    </a>
                  </Box>

                  {/* Location */}
                  <Box className="ct-info-card" sx={{ opacity:0, p:3, borderRadius:3, bgcolor:T.greenLt, border:'1.5px solid '+T.greenMid, boxShadow:'0 3px 14px rgba(14,101,45,0.06)', position:'relative', overflow:'hidden' }}>
                    <Box sx={{ position:'absolute', bottom:-14, right:-14, width:56, height:56, borderRadius:'50%', border:'2px solid '+T.green, opacity:0.1, animation:'pulseRing 4.5s ease-in-out infinite' }} />
                    <Box sx={{ display:'flex', alignItems:'center', gap:1.5, mb:1 }}>
                      <Box sx={{ bgcolor:T.greenMid, p:1, borderRadius:2, display:'flex' }}>
                        <LocationOnIcon sx={{ color:T.green, fontSize:22 }} />
                      </Box>
                      <Typography sx={{ color:T.ash, fontSize:'0.72rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase' }}>Location</Typography>
                    </Box>
                    <Typography sx={{ color:T.ink, fontWeight:600, fontSize:'0.9rem', lineHeight:1.7 }}>
                      A-5/29, 6th Floor, Green City Gold,<br />Pal Bhata Road, Pal, Surat,<br />Gujarat – 394510
                    </Typography>
                  </Box>

                  {/* Response time */}
                  {/* <Box className="ct-info-card" sx={{ opacity:0, p:3, borderRadius:3, bgcolor:T.amberLt, border:'1.5px solid '+T.amberMid, textAlign:'center', boxShadow:'0 3px 14px rgba(212,137,26,0.07)', position:'relative', overflow:'hidden' }}>
                    <Box sx={{ position:'absolute', bottom:-14, right:-14, width:56, height:56, borderRadius:'50%', border:'2px solid '+T.amber, opacity:0.1, animation:'pulseRing 3s ease-in-out infinite' }} />
                    <Typography sx={{ fontSize:'2rem', mb:0.5 }}>⚡</Typography>
                    <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.amber, fontWeight:700, fontSize:'1rem', mb:0.5 }}>Quick Response</Typography>
                    <Typography sx={{ color:T.ash, fontSize:'0.84rem', lineHeight:1.65 }}>
                      We typically respond within<br /><strong style={{ color:T.ink }}>2-4 hours</strong> on working days.
                    </Typography>
                  </Box> */}
                </Stack>
              </Grid>

              {/* ── RIGHT: Form ── */}
              <Grid item xs={12} md={8}>
                <Box className="ct-form-wrap" sx={{
                  opacity:0, p:{ xs:3, md:5 },
                  bgcolor:T.white, border:'1.5px solid '+T.greenMid,
                  borderRadius:4, boxShadow:'0 8px 40px rgba(14,101,45,0.08)',
                  position:'relative', overflow:'hidden',
                }}>
                  {/* Top accent bar */}
                  <Box sx={{ position:'absolute', top:0, left:0, right:0, height:5, background:'linear-gradient(90deg,'+T.green+' 0%,'+T.blue+' 100%)' }} />
                  {/* Dots corner */}
                  <Box className="ct-dots" sx={{ position:'absolute', top:0, right:0, width:140, height:140, opacity:0.4, pointerEvents:'none' }} />

                  <Box sx={{ position:'relative', zIndex:1 }}>
                    <SectionLabel bg={T.blueLt} col={T.blue} border={T.blueMid}>Send a Message</SectionLabel>
                    <Typography variant="h3" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'1.6rem', md:'2rem' }, fontWeight:600, mb:0.8, textAlign:'center' }}>
                      Let&apos;s Start a{' '}
                      <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Conversation</Box>
                    </Typography>
                    <Typography sx={{ color:T.ash, fontSize:'0.92rem', mb:4, textAlign:'center' }}>
                      Fill in the form and we&apos;ll get back to you as soon as possible.
                    </Typography>

                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Your Name *" name="name" value={formData.name} onChange={handleChange} sx={tfSx} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Phone Number *" name="phone" value={formData.phone} onChange={handleChange} sx={tfSx} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleChange} sx={tfSx} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth select label="I'm interested in..." name="service" value={formData.service} onChange={handleChange} sx={tfSx}>
                          {SERVICES.map(function(s) {
                            return React.createElement(MenuItem, { key:s, value:s, style:{ fontFamily:"'DM Sans',sans-serif" } }, s);
                          })}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth multiline rows={5}
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your requirements, questions, or how we can help..."
                          sx={tfSx}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <button
                          className="ct-submit-btn"
                          onClick={handleSubmit}
                          disabled={loading}
                          type="button"
                        >
                          {loading
                            ? React.createElement(React.Fragment, null,
                                React.createElement('span', { style:{ display:'inline-block', width:18, height:18, border:'2.5px solid rgba(255,255,255,0.4)', borderTopColor:'#fff', borderRadius:'50%', animation:'spinSlow 0.7s linear infinite' } }),
                                'Sending...'
                              )
                            : React.createElement(React.Fragment, null,
                                React.createElement(SendIcon, { style:{ fontSize:18 } }),
                                'Send Message'
                              )
                          }
                        </button>
                      </Grid>
                    </Grid>

                    {/* Trust row under button */}
                    <Box className="ct-trust-row" sx={{ display:'flex', justifyContent:'center', gap:{ xs:2, sm:3 }, flexWrap:'wrap', mt:3, pt:3, borderTop:'1px dashed '+T.greenMid }}>
                      {TRUST_ITEMS.map(function(t) {
                        return (
                          <Box key={t} className="ct-trust-item" sx={{ display:'flex', alignItems:'center', gap:0.7, color:T.ash, fontSize:'0.82rem', fontWeight:600, opacity:0 }}>
                            <CheckCircleOutlineIcon sx={{ fontSize:14, color:T.green }} />
                            {t}
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE 2 ════════════════════════════════════════════════════════ */}
        <Box className="ct-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,20 C300,60 700,0 1100,40 C1280,55 1380,45 1440,30 L1440,60 L0,60 Z" fill="#eaf5ee" />
          </svg>
        </Box>

        {/* ══ MAP / FIND US STRIP ════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:7, md:10 }, background:'linear-gradient(135deg,#eaf5ee 0%,#e4eef6 100%)' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign:'center', mb:6 }}>
              <SectionLabel bg={T.amberLt} col={T.amber} border={T.amberMid}>Find Us</SectionLabel>
              <Typography variant="h2" sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'2rem', md:'2.6rem' }, fontWeight:600 }}>
                Visit Us in{' '}
                <Box component="span" sx={{ color:T.green, fontStyle:'italic' }}>Surat</Box>
              </Typography>
              <Typography sx={{ color:T.ash, fontSize:'1rem', mt:1.5, maxWidth:480, mx:'auto' }}>
                In-person sessions available at our Surat office &bull; Online sessions available across India
              </Typography>
            </Box>

            <Grid container spacing={3} justifyContent="center" alignItems="stretch">
              {[
                { icon:'🏢', title:'Office Address', detail:'A-5/29, 6th Floor, Green City Gold, Pal Bhata Road, Pal, Surat, Gujarat - 394510', bg:T.greenLt, border:T.greenMid, col:T.green },
                { icon:'🕐', title:'Working Hours', detail:'Monday - Saturday\n10:00 AM – 7:00 PM\nSunday: By appointment only', bg:T.blueLt, border:T.blueMid, col:T.blue },
                { icon:'🌐', title:'Online Sessions', detail:'Google Meet or Zoom\nAvailable across India\nSame-day booking available', bg:T.amberLt, border:T.amberMid, col:T.amber },
              ].map(function(item, i) {
                return (
                  <Grid item xs={12} sm={4} key={i}>
                    <Box sx={{
                      p:3.5, height:'100%', bgcolor:item.bg, border:'1.5px solid '+item.border,
                      borderRadius:3, textAlign:'center',
                      boxShadow:'0 3px 14px rgba(14,101,45,0.06)',
                      transition:'transform 0.3s,box-shadow 0.3s',
                      '&:hover':{ transform:'translateY(-5px)', boxShadow:'0 16px 32px rgba(14,101,45,0.1)' },
                      position:'relative', overflow:'hidden',
                    }}>
                      <Box sx={{ position:'absolute', bottom:-16, right:-16, width:60, height:60, borderRadius:'50%', border:'2px solid '+item.col, opacity:0.1, animation:'pulseRing 4s ease-in-out infinite' }} />
                      <Typography sx={{ fontSize:'2.4rem', mb:1.5 }}>{item.icon}</Typography>
                      <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontWeight:600, fontSize:'1.05rem', mb:1.2 }}>{item.title}</Typography>
                      <Box sx={{ width:24, height:3, bgcolor:item.col, borderRadius:2, mb:1.5, mx:'auto' }} />
                      <Typography sx={{ color:T.ash, fontSize:'0.88rem', lineHeight:1.8, whiteSpace:'pre-line' }}>{item.detail}</Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* ══ WAVE 3 ════════════════════════════════════════════════════════ */}
        <Box className="ct-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,10 C300,55 700,5 1050,35 C1250,55 1380,30 1440,20 L1440,60 L0,60 Z" fill="#fdf8f0" />
          </svg>
        </Box>

        {/* ══ BOTTOM CTA ════════════════════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, bgcolor:T.cream, textAlign:'center', position:'relative', overflow:'hidden' }}>
          <Box sx={{ position:'absolute', top:'10%', left:'4%', width:90, height:90, borderRadius:'50%', bgcolor:T.greenMid, opacity:0.28, animation:'floatA 10s ease-in-out infinite', pointerEvents:'none' }} />
          <Box sx={{ position:'absolute', bottom:'14%', right:'5%', width:75, height:75, borderRadius:'55% 45% 40% 60%', bgcolor:T.blueMid, opacity:0.26, animation:'floatB 8s ease-in-out infinite', pointerEvents:'none' }} />
          <Box className="ct-dots-blue" sx={{ position:'absolute', inset:0, opacity:0.4, pointerEvents:'none' }} />

          <Container maxWidth="sm" sx={{ position:'relative', zIndex:1 }}>
            <Typography sx={{ fontSize:'2.8rem', mb:2 }}>👋</Typography>
            <Typography sx={{ fontFamily:"'Playfair Display',serif", color:T.ink, fontSize:{ xs:'1.7rem', md:'2.4rem' }, fontWeight:700, mb:2, lineHeight:1.2 }}>
              Prefer a quick chat?
            </Typography>
            <Typography sx={{ color:T.ash, fontSize:'1rem', mb:4, lineHeight:1.8 }}>
              No forms needed — just drop us a WhatsApp message and we&apos;ll respond right away.
            </Typography>
            <a href="https://wa.me/916351113766?text=Hello%2C%20I%20am%20reaching%20out%20through%20your%20website.%20I%20would%20like%20to%20get%20more%20information%20about%20your%20services%20and%20discuss%20my%20requirements." 
              target="_blank" 
              rel="noreferrer" 
              style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
              background:T.wa, color:'#fff', border:'none', borderRadius:50,
              padding:'15px 40px', fontSize:'1rem', fontWeight:700,
              fontFamily:"'DM Sans',sans-serif", textDecoration:'none',
              transition:'all 0.3s', minWidth:240,
            }}
              onMouseEnter={function(e){ e.currentTarget.style.background='#16a34a'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 14px 32px rgba(34,197,94,0.28)'; }}
              onMouseLeave={function(e){ e.currentTarget.style.background=T.wa; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
            >
              <WhatsAppIcon style={{ fontSize:22 }} />
              Open WhatsApp
            </a>
            <Typography sx={{ color:T.ash, fontSize:'0.84rem', mt:3 }}>
              +91 63511-13766 &bull; Available Mon–Sat, 10am–7pm
            </Typography>
          </Container>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={snack.open}
          autoHideDuration={5000}
          onClose={function(){ setSnack(function(p){ return Object.assign({},p,{open:false}); }); }}
          anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        >
          <Alert severity={snack.severity} variant="filled" onClose={function(){ setSnack(function(p){ return Object.assign({},p,{open:false}); }); }}>
            {snack.msg}
          </Alert>
        </Snackbar>

      </Box>
    </>
  );
}

var TRUST_ITEMS = [
  'Response within 2-4 hours',
  'No spam, ever',
  'Free initial consultation',
];
