import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CareerCounselling from './pages/CareerCounselling';
import Books from './pages/Books';
import SchoolsWorkshops from './pages/SchoolsWorkshops';
import About from './pages/About';
import Contact from './pages/Contact';
import Test from "./pages/Test";
import PsychometricTests from "./pages/PsychometricTests";
// import Psychometric from './pages/Psychometric';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career-counselling" element={<CareerCounselling />} />
          <Route path="/books" element={<Books />} />
          <Route path="/schools-workshops" element={<SchoolsWorkshops />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/test" element={<PsychometricTests />} />
          <Route path="/test/:type" element={<Test />} />
          {/* <Route path="/Psychometric" element={<Psychometric />} /> */}
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
