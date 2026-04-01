import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer,
  List, ListItem, ListItemText, useScrollTrigger, Slide,
  useTheme, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import logo from '../assets/logo_final.png'; // Make sure this path is correct

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Career Counselling', path: '/career-counselling' },
  {label:'Psychometric Test', path:'/test'},
  { label: 'Books', path: '/books' },
  { label: 'Schools & Workshops', path: '/schools-workshops' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
  

];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo(linksRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.4 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HideOnScroll>
      <AppBar
        ref={navRef}
        elevation={scrolled ? 4 : 0}
        sx={{
          background: scrolled
            ? 'rgba(255,255,255,0.97)'
            : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? 'none' : '1px solid rgba(14,101,45,0.1)',
          transition: 'all 0.4s ease',
          boxShadow: scrolled ? '0 4px 30px rgba(14,101,45,0.12)' : 'none',
        }}
      >
        <Toolbar sx={{ py: 1, px: { xs: 2, md: 4 } }}>
          {/* Logo - moved right with margin left */}
          <Box 
            ref={logoRef} 
            component={Link} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              ml: { xs: 2, md: 27 }, // Responsive margin left
              mr: { xs: 1, md: 2 }, // Space between logo and nav links
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Paavan SETU"
              sx={{ 
                height: 52,
                width: 'auto', 
                objectFit: 'contain',
                transform: {
                  xs: 'scale(1.5)',
                  md: 'scale(2.0)'
                },
                transformOrigin: 'center center',
              }}
            />
          </Box>

          {/* Desktop Nav Links - now with left alignment */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              flex: 1, // Take remaining space
              ml: 3, // Pull links slightly left
            }}>
              {navLinks.map((link, i) => (
                <Button
                  key={link.path}
                  ref={el => linksRef.current[i] = el}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: location.pathname === link.path ? '#0e652d' : '#3D2B50',
                    fontSize: '0.78rem',
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: '4px',
                    position: 'relative',
                    fontFamily: '"Lato", sans-serif',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: location.pathname === link.path ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                      width: '60%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #0e652d, #7B2D8B)',
                      transition: 'transform 0.3s ease',
                      borderRadius: '2px',
                    },
                    '&:hover': {
                      background: 'rgba(14,101,45,0.06)',
                      color: '#0e652d',
                      '&::after': { transform: 'translateX(-50%) scaleX(1)' },
                    },
                    transition: 'all 0.25s ease',
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Book Session Button - on the right */}
          {!isMobile && (
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              sx={{ 
                ml: 2, 
                fontSize: '0.75rem',
                bgcolor: '#0e652d',
                flexShrink: 0, // Prevent button from shrinking
                '&:hover': {
                  bgcolor: '#0a4d22',
                }
              }}
            >
              Book Session
            </Button>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton 
              onClick={() => setDrawerOpen(true)} 
              sx={{ 
                color: '#0e652d',
                ml: 'auto', // Push to right on mobile
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 280,
              background: 'linear-gradient(180deg, #0e652d 0%, #4CAF50 100%)',
              color: 'white',
            }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo in mobile drawer */}
            <Box
              sx={{
                background: '#ffffff',
                borderRadius: '16px',
                px: 1,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Paavan SETU"
                sx={{ 
                  height: 60,
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List sx={{ mt: 2 }}>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  color: location.pathname === link.path ? 'white' : 'rgba(255,255,255,0.85)',
                  borderLeft: location.pathname === link.path ? '3px solid white' : '3px solid transparent',
                  transition: 'all 0.2s',
                  '&:hover': { background: 'rgba(255,255,255,0.15)', color: 'white' },
                  textDecoration: 'none',
                  display: 'block',
                  py: 1.5,
                  px: 3,
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ 
                    fontFamily: '"Lato", sans-serif', 
                    fontSize: '0.95rem', 
                    letterSpacing: '0.05em',
                    fontWeight: location.pathname === link.path ? 600 : 400,
                  }}
                />
              </ListItem>
            ))}
          </List>
          
          {/* Book Session button in mobile drawer */}
          <Box sx={{ p: 3, mt: 'auto' }}>
            <Button
              component={Link}
              to="/career-counselling"
              variant="contained"
              fullWidth
              onClick={() => setDrawerOpen(false)}
              sx={{
                bgcolor: 'white',
                color: '#ffffff',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                }
              }}
            >
              Book Session
            </Button>
          </Box>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
}