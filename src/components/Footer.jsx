import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Divider, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
// Import logo from assets
import logo from '../assets/logo_final321.png'; // Adjust the path based on your folder structure

export default function Footer() {
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #0e652d, #1f5b87)',
      color: 'white',
      pt: 8, pb: 4,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #E05A1C, #F4B942, #7B2D8B, #E05A1C)',
        backgroundSize: '200% auto',
        animation: 'gradientShift 3s linear infinite',
      },
      '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% center' },
        '100%': { backgroundPosition: '200% center' },
      },
    }}>
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute', top: -80, right: -80,
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,45,139,0.2), transparent)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: -60, left: -60,
        width: 250, height: 250,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224,90,28,0.15), transparent)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand with Logo Left and Text Right */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2.5, 
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' },
            }}>
              {/* Logo - Left Side with Curved Edges - No Orange Background */}
              <Box
                component="img"
                src={logo}
                alt="Paavan SETU Logo"
                sx={{
                  width: { xs: 100, sm: 120, md: 140 },
                  height: { xs: 100, sm: 120, md: 140 },
                  borderRadius: '30px', // Curved edges
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                  },
                }}
              />

              {/* Text Content - Right Side */}
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #F4B942, #FFE5B4)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    letterSpacing: '-0.5px',
                    fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem' },
                    lineHeight: 1.2,
                    mb: 0.5,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  Paavan SETU
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.75rem',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    borderLeft: { xs: 'none', sm: '3px solid #F4B942' },
                    paddingLeft: { xs: 0, sm: 1.5 },
                    fontWeight: 500,
                  }}
                >
                  Bridging Values with Education
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, mb: 3, fontSize: '0.88rem' }}>
              Helping students find clarity, confidence, and direction through career counselling, value education, and holistic learning.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: <WhatsAppIcon />, color: '#25D366', href: 'https://wa.me/6351113766?text=Hello%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20programs%20and%20services.%20Please%20assist%20me.' },
                { icon: <InstagramIcon />, color: '#E1306C', href: 'https://www.instagram.com/paavansetu.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                { icon: <FacebookIcon />, color: '#1877F2', href: 'https://www.facebook.com/share/18NLzSmM16/' },
              ].map((s, i) => (
                <IconButton
                  key={i}
                  component="a" href={s.href} target="_blank"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    width: 38, height: 38,
                    '&:hover': { 
                      color: s.color, 
                      borderColor: s.color, 
                      background: `${s.color}18`,
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography sx={{ 
              color: '#F4B942', 
              fontWeight: 700, 
              letterSpacing: '0.1em', 
              fontSize: '0.78rem', 
              textTransform: 'uppercase', 
              mb: 2.5,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8, left: 0,
                width: 35, height: 2,
                background: '#E05A1C',
                borderRadius: 2,
              }
            }}>
              Quick Links
            </Typography>
            {[
              { label: 'Home', path: '/' },
              { label: 'About Us', path: '/about' },
              { label: 'Career Counselling', path: '/career-counselling' },
              { label: 'Books', path: '/books' },
              { label: 'Contact', path: '/contact' },
            ].map(link => (
              <Box key={link.path} sx={{ mb: 1.2 }}>
                <MuiLink
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontFamily: '"Lato", sans-serif',
                    display: 'inline-block',
                    transition: 'all 0.2s',
                    '&:hover': { 
                      color: '#F4B942',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              </Box>
            ))}
          </Grid>

          {/* Services */}
          <Grid item xs={6} md={3}>
            <Typography sx={{ 
              color: '#F4B942', 
              fontWeight: 700, 
              letterSpacing: '0.1em', 
              fontSize: '0.78rem', 
              textTransform: 'uppercase', 
              mb: 2.5,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8, left: 0,
                width: 35, height: 2,
                background: '#E05A1C',
                borderRadius: 2,
              }
            }}>
              Our Services
            </Typography>
            {[
              'Career Counselling',
              'Teacher Training Programs',
              'School Workshops',
              'Value Education',
              'Student Mentoring',
              'Parent Counselling',
            ].map(s => (
              <Box key={s} sx={{ mb: 1.2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 6, height: 6, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #E05A1C, #F4B942)',
                  flexShrink: 0,
                }} />
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.65)', 
                  fontSize: '0.88rem', 
                  fontFamily: '"Lato", sans-serif',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#F4B942' },
                  cursor: 'pointer',
                }}>
                  {s}
                </Typography>
              </Box>
            ))}
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography sx={{ 
              color: '#F4B942', 
              fontWeight: 700, 
              letterSpacing: '0.1em', 
              fontSize: '0.78rem', 
              textTransform: 'uppercase', 
              mb: 2.5,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8, left: 0,
                width: 35, height: 2,
                background: '#E05A1C',
                borderRadius: 2,
              }
            }}>
              Get In Touch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 1.5,
                p: 0.5,
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateX(5px)' },
              }}>
                <WhatsAppIcon sx={{ color: '#25D366', fontSize: 22, mt: 0.2 }} />
                <Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem' }}>WhatsApp / Call</Typography>
                  <Typography sx={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>+91-6351113766</Typography>
                </Box>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 1.5,
                p: 0.5,
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateX(5px)' },
              }}>
                <EmailIcon sx={{ color: '#F4B942', fontSize: 22, mt: 0.2 }} />
                <Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem' }}>Email Us</Typography>
                  <Typography sx={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>careerhatch2024@gmail.com</Typography>
                </Box>
              </Box>
            </Box>

            {/* Quote Box */}
            <Box sx={{
              mt: 3, p: 2.5,
              border: '1px solid rgba(244,185,66,0.3)',
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(244,185,66,0.08), rgba(224,90,28,0.05))',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '"❝"',
                position: 'absolute',
                top: -8, left: 8,
                fontSize: 55,
                opacity: 0.1,
                fontFamily: 'serif',
                color: '#F4B942',
              }
            }}>
              <Typography sx={{ 
                color: '#F4B942', 
                fontSize: '0.9rem', 
                fontStyle: 'italic', 
                fontFamily: '"Cormorant Garamond", serif', 
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 1,
              }}>
                "Education is the most powerful weapon which you can use to change the world."
              </Typography>
              <Typography sx={{ 
                color: 'rgba(255,255,255,0.5)', 
                fontSize: '0.7rem', 
                mt: 1,
                textAlign: 'right',
              }}>
                — Nelson Mandela
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: 1,
          textAlign: 'center',
        }}>

          {/* Left */}
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} Paavan SETU. All rights reserved.
          </Typography>

          {/* Center (NEW) */}
          <Typography sx={{ 
          color: 'rgba(255,255,255,0.55)', 
          fontSize: '0.82rem',
          fontWeight: 500,
        }}>
          Designed & Developed by{' '}
          <MuiLink
            href="https://www.logicmindsbyparii.com/"
            target="_blank"
            rel="noreferrer"
            sx={{
              color: '#F4B942',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
                color: '#FFE5B4',
              },
            }}
          >
            Logicminds by parii
          </MuiLink>
        </Typography>

          {/* Right */}
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.45)', 
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}>
            Bridging Values with Education 
            <span style={{ 
              display: 'inline-block',
              animation: 'twinkle 1.5s ease-in-out infinite',
            }}>🌟</span>
          </Typography>

        </Box>
      </Container>
      
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>
    </Box>
  );
}
