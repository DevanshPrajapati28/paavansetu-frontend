import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Grid, Toolbar } from "@mui/material";
import { gsap } from "gsap";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/* ─── TOKENS ─────────────────────────────────────────────────────────────── */
const T = {
  green:    "#0a4f22",        // darker (was #0e652d)
  greenLt:  "#c8e8d2",        // darker (was #e6f4eb)
  greenMid: "#96cead",        // darker (was #c8e8d2)
  blue:     "#174a72",        // darker (was #1f5b87)
  blueLt:   "#c4d9ec",        // darker (was #e4eef6)
  blueMid:  "#90b8d8",        // darker (was #c2d9ee)
  amber:    "#b06e10",        // darker (was #d4891a)
  amberLt:  "#f5d9a0",        // darker (was #fdf0d8)
  amberMid: "#e8b86d",        // darker (was #f5d8a0)
  white:    "#ffffff",
  ink:      "#111d11",        // darker (was #1a2a1a)
  ash:      "#4d6357",        // darker (was #6b7c72)
};

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');",
  ".pt-page { font-family: 'DM Sans', sans-serif; }",
  ".pt-dots { background-image: radial-gradient(circle, rgba(10,79,34,0.15) 1.5px, transparent 1.5px); background-size: 24px 24px; }",
  "@keyframes pulseRing { 0%,100%{transform:scale(1);opacity:0.45} 50%{transform:scale(1.08);opacity:0.2} }",
  "@keyframes floatA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(10px,-16px)} }",
  ".pt-card { transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s; cursor: pointer; }",
  ".pt-card:hover { transform: translateY(-7px); box-shadow: 0 20px 40px rgba(10,79,34,0.16) !important; }",
  ".pt-card:hover .pt-card-icon { transform: scale(1.12) rotate(-5deg); }",
  ".pt-card-icon { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); display: inline-flex; }",
].join("\n");

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const tests = [
  {
    name: "Commerce Career Selector",
    slug: "commerce-script",
    desc: "Find the best career options suited for commerce stream students.",
    Icon: AccountBalanceIcon,
    bg: T.greenLt, border: T.greenMid, col: T.green, iconBg: T.greenMid,
    barGrad: `${T.green}, ${T.blue}`,
  },
  {
    name: "Stream Selector Test",
    slug: "stream-test",
    desc: "Choose the right stream after 10th with data-backed guidance.",
    Icon: TrendingUpIcon,
    bg: T.blueLt, border: T.blueMid, col: T.blue, iconBg: T.blueMid,
    barGrad: `${T.blue}, ${T.green}`,
  },
  {
    name: "Engineering Branch Selector",
    slug: "engineering-script",
    desc: "Identify the engineering branch that matches your strengths.",
    Icon: EngineeringIcon,
    bg: T.amberLt, border: T.amberMid, col: T.amber, iconBg: T.amberMid,
    barGrad: `${T.amber}, ${T.green}`,
  },
  {
    name: "Humanities Career Test",
    slug: "humanities-script",
    desc: "Explore impactful and fulfilling careers in the humanities.",
    Icon: AutoStoriesIcon,
    bg: T.greenLt, border: T.greenMid, col: T.green, iconBg: T.greenMid,
    barGrad: `${T.green}, ${T.amber}`,
  },
  {
    name: "Ideal Career Test",
    slug: "ideal-career-test",
    desc: "A comprehensive test to discover your perfect career path.",
    Icon: PsychologyIcon,
    bg: T.blueLt, border: T.blueMid, col: T.blue, iconBg: T.blueMid,
    barGrad: `${T.blue}, ${T.amber}`,
  },
];

/* ─── SECTION LABEL ───────────────────────────────────────────────────────── */
function SectionLabel({ bg, col, border, children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1.5 }}>
      <Box sx={{ width: 36, height: 3, bgcolor: col, borderRadius: 2, mr: 1 }} />
      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, bgcolor: bg, border: `1px solid ${border}`, color: col, px: 1.8, py: 0.6, borderRadius: 99, fontSize: "0.73rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
        {children}
      </Box>
      <Box sx={{ width: 36, height: 3, bgcolor: col, borderRadius: 2, ml: 1 }} />
    </Box>
  );
}

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
export default function PsychometricTests() {
  const navigate = useNavigate();
  const headRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Toolbar />

      <Box
        className="pt-page"
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #daeee2 0%, #cce0f0 100%)",
          position: "relative",
          overflow: "hidden",
          pb: 10,
        }}
      >
        {/* Dot grid */}
        <Box className="pt-dots" sx={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none" }} />

        {/* Ambient blobs */}
        <Box sx={{ position: "absolute", top: 60, left: "3%", width: 120, height: 120, borderRadius: "40% 60% 55% 45%", bgcolor: T.greenMid, opacity: 0.42, animation: "floatA 8s ease-in-out infinite", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: "12%", right: "4%", width: 90, height: 90, borderRadius: "55% 45% 40% 60%", bgcolor: T.blueMid, opacity: 0.38, animation: "floatA 10s ease-in-out infinite 2s", pointerEvents: "none" }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: { xs: 6, md: 8 } }}>

          {/* Header */}
          <Box ref={headRef} sx={{ textAlign: "center", mb: 7, opacity: 0 }}>
            <SectionLabel bg={T.greenLt} col={T.green} border={T.greenMid}>
              Career Guidance
            </SectionLabel>
            <Typography variant="h2" sx={{ fontFamily: "'Playfair Display', serif", color: T.ink, fontSize: { xs: "2rem", md: "2.8rem" }, fontWeight: 700, mt: 1 }}>
              Psychometric{" "}
              <Box component="span" sx={{ color: T.green, fontStyle: "italic" }}>Tests</Box>
            </Typography>
            <Typography sx={{ color: T.ash, fontSize: "1rem", mt: 1.5, maxWidth: 480, mx: "auto", lineHeight: 1.8 }}>
              Science-backed assessments to align your strengths with the right career path.
            </Typography>
          </Box>

          {/* Cards */}
          <Grid container spacing={3}>
            {tests.map((test, i) => {
              const IconComp = test.Icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={test.slug}>
                  <Box
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="pt-card"
                    onClick={() => navigate(`/test/${test.slug}`)}
                    sx={{
                      opacity: 0,
                      bgcolor: T.white,
                      border: `1.5px solid ${test.border}`,
                      borderRadius: 4,
                      p: 3.5,
                      boxShadow: "0 3px 14px rgba(10,79,34,0.08)",
                      position: "relative",
                      overflow: "hidden",
                      height: "100%",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${test.barGrad})`,
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.3s",
                        zIndex: 2,
                      },
                      "&:hover::before": { transform: "scaleX(1)" },
                    }}
                  >
                    {/* Pulse ring */}
                    <Box sx={{ position: "absolute", bottom: -14, right: -14, width: 54, height: 54, borderRadius: "50%", border: `2px solid ${test.col}`, opacity: 0.12, animation: "pulseRing 4s ease-in-out infinite" }} />

                    {/* Icon */}
                    <Box sx={{ display: "inline-flex", bgcolor: test.iconBg, p: 1.6, borderRadius: 2, mb: 2 }}>
                      <IconComp className="pt-card-icon" sx={{ fontSize: 32, color: test.col }} />
                    </Box>

                    {/* Title */}
                    <Typography sx={{ fontFamily: "'Playfair Display', serif", color: T.ink, fontWeight: 600, fontSize: "1.08rem", mb: 0.6 }}>
                      {test.name}
                    </Typography>

                    {/* Divider */}
                    <Box sx={{ width: 22, height: 3, bgcolor: test.col, borderRadius: 2, mb: 1.5 }} />

                    {/* Desc */}
                    <Typography sx={{ color: T.ash, fontSize: "0.87rem", lineHeight: 1.75, mb: 2.5 }}>
                      {test.desc}
                    </Typography>

                    {/* CTA Button */}
                    <Box
                      component="button"
                      onClick={(e) => { e.stopPropagation(); navigate(`/test/${test.slug}`); }}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2.2,
                        py: 1,
                        bgcolor: test.col,
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "0.83rem",
                        fontWeight: 700,
                        fontFamily: "'DM Sans', sans-serif",
                        cursor: "pointer",
                        transition: "opacity 0.2s, transform 0.2s",
                        "&:hover": { opacity: 0.88, transform: "translateY(-1px)" },
                      }}
                    >
                      Start Test
                      <ArrowForwardIcon sx={{ fontSize: 15 }} />
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

        </Container>
      </Box>
    </>
  );
}
