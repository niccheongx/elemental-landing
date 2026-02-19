import React, { useState, useEffect, useRef, useCallback } from "react";


const C = {
  bg: "#060810", bgDeep: "#030408",
  card: "rgba(148,163,184,0.05)", cardHover: "rgba(148,163,184,0.09)",
  border: "rgba(148,163,184,0.08)", borderHover: "rgba(139,92,246,0.2)",
  blue: "#22D3EE", blueMuted: "#38BDF8",
  purple: "#8B5CF6", purpleGlow: "rgba(139,92,246,0.12)",
  gold: "#FBBF24", rose: "#FB7185", emerald: "#34D399",
  text: "#F1F5F9", sub: "rgba(203,213,225,0.82)", dim: "rgba(148,163,184,0.55)",
};

function useInView(t = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: t });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}
const CN = "\u5929\u5730\u6C34\u706B\u6728\u91D1\u571F\u9670\u967D\u547D\u5143\u6C23\u904B\u661F\u7532\u4E59\u4E19\u4E01\u620A\u5DF1\u5E9A\u8F9B\u58EC\u7678";
function useScramble(final) {
  const [d, setD] = useState(final);
  const r = useRef(false);
  const go = useCallback(() => {
    if (r.current) return; r.current = true;
    const ch = final.split(""); let lock = 0;
    const iv = setInterval(() => {
      setD(ch.map((c, i) => c === " " ? " " : i < lock ? c : CN[Math.floor(Math.random() * CN.length)]).join(""));
      lock += Math.ceil(ch.length / 10);
      if (lock >= ch.length) { clearInterval(iv); setD(final); r.current = false; }
    }, 45);
  }, [final]);
  return [d, go];
}

function Fade({ children, delay = 0, className = "", style = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} className={className} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}
function CosmicParallaxBG() {
  const [smStars, setSmStars] = useState('');
  const [mdStars, setMdStars] = useState('');
  const [lgStars, setLgStars] = useState('');

  useEffect(() => {
    const gen = (n) => {
      const s = [];
      for (let i = 0; i < n; i++) s.push(`${Math.floor(Math.random()*2000)}px ${Math.floor(Math.random()*2000)}px #FFF`);
      return s.join(', ');
    };
    setSmStars(gen(700));
    setMdStars(gen(200));
    setLgStars(gen(100));
  }, []);

  return (
    <div className="cosmic-parallax-container">
      <div style={{boxShadow: smStars}} className="cosmic-stars" />
      <div style={{boxShadow: mdStars}} className="cosmic-stars-medium" />
      <div style={{boxShadow: lgStars}} className="cosmic-stars-large" />
      <div className="cosmic-horizon"><div className="cosmic-glow" /></div>
    </div>
  );
}
const CHARS = "\u5929 \u5730 \u6C34 \u706B \u6728 \u91D1 \u571F \u9670 \u967D \u547D \u5143 \u6C23 \u904B \u661F \u7532 \u4E59 \u4E19 \u4E01 \u620A \u5DF1 \u5E9A \u8F9B \u58EC \u7678 \u5B50 \u4E11 \u5BC5 \u536F \u8FB0 \u5DF3 \u5348 \u672A \u7533 \u9149 \u620C \u4EA5 ";
function CharWall({ bright }) {
  const rows = [
    { op: bright ? .09 : .035, sz: 14, spd: 55, dir: "normal" },
    { op: bright ? .13 : .06, sz: 19, spd: 40, dir: "reverse" },
    { op: bright ? .16 : .08, sz: 22, spd: 50, dir: "normal" },
    { op: bright ? .11 : .05, sz: 16, spd: 38, dir: "reverse" },
    { op: bright ? .08 : .04, sz: 20, spd: 62, dir: "normal" },
    { op: bright ? .12 : .055, sz: 15, spd: 45, dir: "reverse" },
  ];
  return <div className="char-wall">{rows.map((r, i) => <div key={i} className="char-row" style={{ fontSize: r.sz, color: `rgba(148,163,184,${r.op})`, animationDuration: `${r.spd}s`, animationDirection: r.dir }}>{CHARS.repeat(4)}</div>)}</div>;
}
function Phone({ children }) {
  return (
    <div className="phone-static">
      <div className="phone-mockup">
        <div className="phone-bar-top" />
        {children}
        <div className="phone-bar-bot" />
        <div className="phone-island" />
      </div>
    </div>
  );
}
function FAQ({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return <div className={`faq ${open ? "faq-open" : ""}`} onClick={() => setOpen(!open)}>
    <div className="faq-q"><span>{q}</span><span className="faq-chev">{"\u25BE"}</span></div>
    <div className="faq-a"><div className="faq-ai">{a}</div></div>
  </div>;
}
function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => { const h = () => setP(document.documentElement.scrollHeight - window.innerHeight > 0 ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return <div className="scroll-bar" style={{ width: `${p * 100}%` }} />;
}

// ═══════════════════════════════════════════
// V10 — SEQUENTIAL NARRATIVE (Andy Raskin framework)
// Each section = a chapter. Each chapter answers the question the last one planted.
// Ch1: Know Before You Decide → Ch2: Your Daily Forecast → Ch3: Your Daily Edge
// Ch4: Stop Guessing, Start Knowing → Ch5: Your Personal Shifu → Ch6: Your Rhythm, Decoded
// Ch7: See What's Coming → Ch8: Designed for Your Chart → Ch9: Your Cosmic Blueprint
// Ch10: Check Your Forecast (CTA)
// ═══════════════════════════════════════════
export default function ElementalLanding() {
  const [annual, setAnnual] = useState(true);
  const [showAfter, setShowAfter] = useState(true);
  const [ctaText, scramble] = useScramble("Show Me My Chart \u2014 Free");
  const [ctaText2, scramble2] = useScramble("See my chart");

  // Set favicon + page title
  useEffect(() => {
    document.title = "Elemental \u2014 Daily guidance from your Chinese birth chart";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.type = 'image/png'; link.href = '/favicon-32x32.png';
  }, []);

  // Stories — behavior-change framing only, grounded in real persona usage patterns
  // Testimonials — Joanna Wiebe structure: before → realization → after, each kills one objection
  const storiesTop = [
    { q: "I downloaded this expecting generic horoscope content. The first reading described a career pattern I\u2019ve literally never told anyone about. Now I check the forecast every morning before I plan my week.", who: "P.R., 33, Senior Analyst, Singapore", tag: "Eerily accurate" },
    { q: "I rolled my eyes when my wife showed me this. I\u2019m an engineer \u2014 I don\u2019t do horoscopes. Two weeks later I\u2019m checking the energy card before quarterly reviews. I still don\u2019t fully understand how it works. I just know it keeps being right.", who: "D.T., 38, Engineering Lead, San Francisco", tag: "Skeptic converted" },
    { q: "I stop scheduling presentations on days the app flags as low-energy. I feel noticeably sharper on the high-energy days. My team hasn\u2019t noticed the pattern \u2014 but my close rate is up.", who: "D.C., 36, Management Consultant, Hong Kong", tag: "Daily strategy" },
    { q: "I\u2019ve seen a BaZi practitioner for years \u2014 $400 per session, once a year. Elemental gives me the same chart analysis every single day. I still see my shifu annually for the deep stuff, but between sessions, this fills the gap completely.", who: "K.W., 41, Business Owner, Singapore", tag: "Practitioner-grade" },
    { q: "I share my daily reading with my partner every morning over coffee. It\u2019s given us a shared language for energy and timing \u2014 what each of us needs that week, why one of us is off. We plan more. We fight less.", who: "A.T., 31, Primary School Teacher, Singapore", tag: "Relationships" },
  ];
  const storiesBottom = [
    { q: "I had zero knowledge of Chinese metaphysics when a friend sent me a link. The guest demo hooked me in five minutes. Three months later I check every morning before leaving the house. No prior knowledge needed.", who: "S.C., 24, Architecture Student, Melbourne", tag: "Complete newcomer" },
    { q: "I posted my daily card to IG Stories as a joke. Three friends downloaded it that day. Now we compare mornings in our group chat \u2014 it\u2019s become our thing.", who: "M.L., 27, Marketing Coordinator, Kuala Lumpur", tag: "Social ritual" },
    { q: "I pull up tomorrow\u2019s forecast before bed every night. I know which meetings to push harder on, which conversations to save for later. I sleep better knowing what\u2019s coming.", who: "M.Y., 29, HR Manager, Singapore", tag: "Evening ritual" },
    { q: "I\u2019ve always had friction with bosses. The chart showed a specific elemental clash in my career palace that explains it exactly. That self-awareness alone changed how I approach every work conversation.", who: "J.L., 28, Product Designer, Taipei", tag: "Self-understanding" },
    { q: "I treat this as one more data point \u2014 like checking the weather before a meeting. Some weeks it\u2019s eerily on point. Other weeks, less so. But the pattern recognition over months convinced me this system is measuring something real.", who: "V.C., 44, Senior Tech Lead, Singapore", tag: "Pragmatic use" },
  ];

  const faqs = [
    { q: "Is this fortune-telling?", top: true,
      a: "No \u2014 and this is the most important thing to understand. BaZi doesn\u2019t predict specific events. It maps the energetic quality of each day as it interacts with your unique chart \u2014 showing which decisions the day supports and where to expect friction. Think of it as a weather forecast for your decisions: it won\u2019t tell you what will happen, but it helps you prepare. Even if you\u2019re deeply skeptical, the daily guidance works as a decision-making prompt \u2014 a 30-second pause before you react." },
    { q: "How accurate is it, really?", top: true,
      a: "Your chart is calculated using classical BaZi methodology \u2014 the same system taught by Joey Yap Academy and used by certified practitioners across Asia. Given correct birth data, the math is identical to what a S$400 consultation produces. Many users say the timing forecasts are the most unexpectedly accurate part \u2014 we hear \u2018eerily accurate\u2019 more than any other phrase. That said, no system is perfect. We encourage you to cross-check with your own practitioner if you have one." },
    { q: "How is this different from Co-Star or The Pattern?",
      a: "Completely different system. Co-Star and The Pattern use Western astrology \u2014 your sun sign plus planetary transits. That\u2019s 12 categories for 8 billion people. Elemental uses BaZi and Zi Wei Dou Shu \u2014 two independent Chinese systems that analyze your full birth data across Five Elements. Your exact birth year, month, day, and hour produce over 8,640 unique chart types. The practical difference: Western apps tell you who you are. Elemental tells you when to act. Even if you love your current astrology app, Elemental adds a timing layer that Western astrology doesn\u2019t offer." },
    { q: "Do I need to know anything about BaZi?",
      a: "Zero prior knowledge needed. Traditional BaZi readings involve complex charts with Chinese characters that take years to learn. Elemental\u2019s AI translates all of it into plain English \u2014 you\u2019ll see guidance like \u2018Today favors direct conversations. Hold off on financial commitments until Thursday\u2019 instead of raw chart data. Even if you\u2019ve never heard of BaZi before today, your first reading will make sense within 30 seconds." },
    { q: "What does the free plan actually include?",
      a: "Everything you need for a meaningful daily practice. Your full BaZi chart, a complete daily reading with energy score, 6 life area breakdown, 3 personalized actions for the day, your personal element profile, and a shareable daily card. This isn\u2019t a teaser \u2014 it\u2019s a complete daily briefing. Even if you never upgrade, you\u2019ll have a full reading waiting every morning." },
    { q: "What if I don\u2019t know my exact birth time?",
      a: "You can start with just your birth date. Your birth time adds depth to your chart, but many users begin without it and still get highly meaningful daily guidance from their Year, Month, and Day pillars alone. If you find your exact time later, update it anytime and your chart recalculates instantly. Even if you never find your birth time, you\u2019ll still have 6 out of 8 characters \u2014 more than enough for powerful daily readings." },
    { q: "Can I use this with my partner?",
      a: "Yes \u2014 compatibility is one of the most popular features. Add your partner\u2019s birth details and you\u2019ll see where your charts naturally align and where they create friction. Couples use it for timing difficult conversations, understanding recurring arguments, and even picking wedding dates." },
    { q: "Is my birth data safe?",
      a: "Encrypted end-to-end with AES-256. We never share your data with third parties. No ads, no data selling, no tracking pixels monetizing your chart. Even if you delete your account, your data is permanently removed from our servers." },
    { q: "Can I cancel anytime?",
      a: "Yes. One tap. No questions, no retention flow. Cancel your Pro subscription and you\u2019ll immediately revert to the free plan \u2014 which still gives you a full daily reading every morning. You keep your chart data, your reading history, and your element profile. Even if you cancel after the first month, your daily briefing is waiting every morning." },
  ];

  const pricing = [
    { name: "Free", price: "S$0", per: "", desc: "Your daily briefing",
      sub: "A complete daily reading \u2014 even if you never upgrade",
      feat: ["Daily reading with energy score", "6 life area breakdown", "3 Magic Actions (what to wear, where to sit, when to act)", "Personal element profile", "Shareable daily card"],
      cta: "See my chart \u2014 free", ctaStyle: "outline" },
    { name: "Pro", price: annual ? "S$119" : "S$14.90", per: annual ? "/year" : "/mo", desc: "Your complete forecast",
      sub: annual ? "= S$9.90/month \u00B7 billed annually" : "or S$119/year (save 33%)", featured: true,
      feat: ["Everything in Free", "Week Ahead Forecast \u2014 best days, caution days, decision windows", "Monthly + Yearly Forecast with key timing", "Ask Your Guide \u2014 20 questions/day about your chart", "Date scrubber \u2014 check any past or future date", "People Intelligence (compatibility)", "10 Insight Tokens/month for deep analysis"],
      cta: "Try Pro for S$1.90 \u2192", badge: "Most popular" },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="noise" />
      <ScrollBar />

      <nav className="nav"><div className="nav-in">
        <a href="#" className="nav-logo"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAGWAZsDASIAAhEBAxEB/8QAHQABAAEEAwEAAAAAAAAAAAAAAAECAwYIBAUHCf/EAFoQAAEDAgIFBQcMDgkCBgMAAAEAAgMEBQYRBxIhMUEIE1FhcRUyc4GRsdEUIjRCUlRykpOUodIWGCMkMzZEU1VidIOEwRc1Q0VjZIKi4UZ1CSUnVsLwJjey/8QAGwEBAAMBAQEBAAAAAAAAAAAAAAECAwQGBQf/xAAnEQEAAgIBBAIDAQEBAQEAAAAAAQIDERIEEyExBUEyUWEiBnEU8f/aAAwDAQACEQMRAD8A0yREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERd7ZsOVFY0VFU8UlLwkfvd1NHFB0YBJyC7OhsF2qwHx0crYz/aPbqt8pWW0VLbbeNWkomveB+FqWhzs+kN3D6VcqZ5Ztk00koG4OdmB2DcFpXHMqTeGPnChjAMt1onHiyIueR5Bl9K5dLZbFGPvttwkP+GWtH0rnZ5cMlSc+gLSMUKdyVsW3CY/Ibq7+IaP/AIq42gwiN9suZ/im/VUeIJs6Ap7UI52V+osH/ou5fOh9VSKLCH6LuXzofVVrxBPEE7VTnZdNBhA/3bcvnTfqqk2/CP6OuXzkfVVHiU+IJ2qnOye52E/0dcfnI+qnc7Cn6OuHzkfVUeIKfEE7VTnZHc3Cn6OuPzkfVUdzcKfo+4/OR9VVeIKPEE7VTnZT3Nwr+j7j85H1U7m4W94XH5yPqqr/AEhTl1BO1U52Ui24U/R9x+cj6qdzcK8LfcfnI+qqsuoKcuoJ2qnOy2bZhb3hcfnI+qncvC3vG4/OW/VVzxBTl1BO1U52Wu5WF/eVx+cN+qncrC/vG4/OG/VV7xBPEE7VTnZZ7lYY943D5y36qC14Y94XD5yPqq92gJ4gnaqc7LPcvDGX9X3D5yPqqh1rw3wobh84H1VyvEFPiCdqpzs4L7Th0j1tJcAfDNP/AMVxZrDQSHKA1MfW/J3mXcZgcAoLtijtQmLy6KbCztTWgu1BI7825xY/yOAXU1dquNKM56OZjfdapyPjWYOY128JHJUQn7jMWt4sI1mO7WnYqTin6Wi7AkWY3GitdwdnLAbfPlskiGcLj1jePpXQXeyV9tc3now+NwzbLEdZhHaFnMTHteJ261ERQkREQEREBERAREQEREBERAREQFcp4ZZ5RFCwve7cANpURRvlkEcbS5x3AcVnlhoYsP0cNZkO7EgzDXjMQt90evoUxG0TOlm1WCitEUdVcwKqseM20hHrWdBef5LmVEz5nB0rg4gZNAGQaOgDgFZke5z3Pe4ukcc3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" alt="Elemental" className="nav-logo-img" /><span className="nav-logo-text">Elemental</span></a>
        <div className="nav-r">
          <a href="#stories">Stories</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <button className="btn-p btn-sm" onMouseEnter={scramble2}>{ctaText2}</button>
        </div>
      </div></nav>

      <main>

      {/* ═══ Ch1: KNOW BEFORE YOU DECIDE — Hook: decisions exist, information exists ═══ */}
      <section className="hero">
        <CosmicParallaxBG />
        <CharWall />
        <div className="hero-inner">
          <div className="hero-copy">
            <Fade><p className="eyebrow">Daily guidance from your Chinese birth chart</p></Fade>
            <Fade delay={.06}><h1>Know your timing.<br /><span className="h1-accent">Change your outcomes.</span></h1></Fade>
            <Fade delay={.12}><p className="hero-sub">ELEMENTAL reads your BaZi chart {"\u2014"} the system 1 in 4 people on Earth use to time major life decisions {"\u2014"} and translates it into plain-English guidance you can use today.</p></Fade>
            <Fade delay={.14}><p className="hero-resolve">30 seconds. Free forever.</p></Fade>
            <Fade delay={.18}><div className="hero-ctas">
              <button className="btn-p" onMouseEnter={scramble}>{ctaText} <span className="arr">{"\u2192"}</span></button>
              <button className="btn-g" onClick={() => document.getElementById('daywith')?.scrollIntoView({behavior:'smooth'})}>{"\u2193"} See how it works</button>
            </div></Fade>
            <Fade delay={.22}><p className="hero-ghost-cta">or <a href="#" className="ghost-link">peek at a sample reading first</a></p></Fade>
          </div>
          <div className="hero-visual">
            <div className="hero-orb" />
            <Fade delay={.1}>
              <Phone>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{width:'100%',height:'100%',objectFit:'contain',display:'block',background:'#000',flex:1,minHeight:0}}
                  src="/hero-demo.webm"
                />
              </Phone>
            </Fade>
            <Fade delay={.3}><p className="phone-caption">Real reading for a {"\u4E59\u6728"} Day Master in Singapore. Yours will look completely different.</p></Fade>
          </div>
        </div>
        {/* Trust bar — user-facing proof, not system jargon (Oli Gardner fix) */}
        <Fade delay={.35}><div className="trust-bar">
          <span>{"\u2605"} 4.8/5 from early testers</span>
          <span className="trust-dot">{"\u00B7"}</span>
          <span>Same math as S$400 consultations</span>
          <span className="trust-dot">{"\u00B7"}</span>
          <span style={{color:C.emerald}}>Free forever {"\u00B7"} No credit card</span>
        </div></Fade>
      </section>

      {/* ═══ Ch2: YOUR DAILY FORECAST — Answers "check WHAT?" ═══ */}
      {/* Reader asked: "What information?" → Answer: BaZi, 8,640 chart types, daily energy */}
      <section className="bazi-bridge">
        <div className="container" style={{maxWidth:760,textAlign:'center'}}>
          <Fade><p className="sec-label">Not a horoscope</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">Your zodiac sign is 2% of your chart.<br />We read the other 98%.</h2></Fade>
          <Fade delay={.1}><p className="bazi-exp">It{"\u2019"}s called BaZi ({"\u516B\u5B57"}). Where Western astrology sorts everyone into 12 signs by birth month, BaZi uses your exact birth <em>year, month, day, and hour</em> to map your strengths, timing, and energy across career, love, health, and wealth {"\u2014"} producing over <strong>8,640 unique chart types</strong>. That{"\u2019"}s why two Scorpios get completely different readings.</p></Fade>
          <Fade delay={.15}><div className="bazi-compare">
            <div className="bazi-col">
              <div className="bazi-col-label" style={{color:'var(--dim)'}}>Western astrology</div>
              <div className="bazi-stat">12</div>
              <div className="bazi-stat-label">sun signs</div>
            </div>
            <div className="bazi-vs">vs</div>
            <div className="bazi-col">
              <div className="bazi-col-label" style={{color:'var(--bl)'}}>BaZi</div>
              <div className="bazi-stat" style={{color:'var(--bl)'}}>8,640+</div>
              <div className="bazi-stat-label">unique chart types</div>
            </div>
          </div></Fade>
          <Fade delay={.2}><p className="bazi-closer">It{"\u2019"}s not mystical. It{"\u2019"}s mathematical. And yours updates every morning.</p></Fade>
        </div>
      </section>

      {/* ═══ Ch3: YOUR DAILY EDGE — Reframes problem as competitive advantage ═══ */}
      <section className="agitate" id="daywith">
        <div className="container">
          <Fade><p className="sec-label">The decisions you{"\u2019"}re already making</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">You{"\u2019"}re making these calls every week.<br />Without checking.</h2></Fade>
        </div>
        <Fade delay={.1}><div className="stream-viewport">
          <div className="stream-fade-top" />
          <div className="stream-cols">
            <div className="stream-col stream-up">
              {[...[
                {cat:"Career",q:"The quarterly review is next week. Do I push for the raise now?",color:"var(--bl)"},
                {cat:"Timing",q:"Is this the right month to sign the lease?",color:C.amber},
                {cat:"Relationships",q:"We keep having the same argument. What am I not seeing?",color:C.rose},
                {cat:"Career",q:"The offer expires Friday. Take it or hold?",color:"var(--bl)"},
                {cat:"Health",q:"The burnout is back. Same time as last year.",color:C.emerald},
                {cat:"Relationships",q:"Do I bring it up tonight or wait for a better moment?",color:C.rose},
                {cat:"Timing",q:"Launch this quarter or wait until after Chinese New Year?",color:C.amber},
                {cat:"Career",q:"My gut says no. But the money says yes.",color:"var(--bl)"},
              ],...[
                {cat:"Career",q:"The quarterly review is next week. Do I push for the raise now?",color:"var(--bl)"},
                {cat:"Timing",q:"Is this the right month to sign the lease?",color:C.amber},
                {cat:"Relationships",q:"We keep having the same argument. What am I not seeing?",color:C.rose},
                {cat:"Career",q:"The offer expires Friday. Take it or hold?",color:"var(--bl)"},
                {cat:"Health",q:"The burnout is back. Same time as last year.",color:C.emerald},
                {cat:"Relationships",q:"Do I bring it up tonight or wait for a better moment?",color:C.rose},
                {cat:"Timing",q:"Launch this quarter or wait until after Chinese New Year?",color:C.amber},
                {cat:"Career",q:"My gut says no. But the money says yes.",color:"var(--bl)"},
              ]].map((m,i) => (
                <div key={i} className="stream-card" style={{'--sc':m.color}}>
                  <span className="stream-cat">{m.cat}</span>
                  <span className="stream-q">{m.q}</span>
                </div>
              ))}
            </div>
            <div className="stream-col stream-down">
              {[...[
                {cat:"Compatibility",q:"My partner and I clash on finances. Is this a chart thing?",color:C.rose},
                {cat:"Timing",q:"Move now or wait until after Chinese New Year?",color:C.amber},
                {cat:"Career",q:"The restructure is coming. Should I be worried?",color:"var(--bl)"},
                {cat:"Patterns",q:"Every August, things fall apart. Coincidence?",color:C.violet},
                {cat:"Planning",q:"I\u2019m picking a wedding date. Which months are best for us?",color:C.rose},
                {cat:"Career",q:"I\u2019ve been passed over twice. Try again or leave?",color:"var(--bl)"},
                {cat:"Health",q:"I always crash mid-afternoon. Is there an energy pattern here?",color:C.emerald},
                {cat:"People",q:"My new manager and I clash on everything.",color:C.violet},
              ],...[
                {cat:"Compatibility",q:"My partner and I clash on finances. Is this a chart thing?",color:C.rose},
                {cat:"Timing",q:"Move now or wait until after Chinese New Year?",color:C.amber},
                {cat:"Career",q:"The restructure is coming. Should I be worried?",color:"var(--bl)"},
                {cat:"Patterns",q:"Every August, things fall apart. Coincidence?",color:C.violet},
                {cat:"Planning",q:"I\u2019m picking a wedding date. Which months are best for us?",color:C.rose},
                {cat:"Career",q:"I\u2019ve been passed over twice. Try again or leave?",color:"var(--bl)"},
                {cat:"Health",q:"I always crash mid-afternoon. Is there an energy pattern here?",color:C.emerald},
                {cat:"People",q:"My new manager and I clash on everything.",color:C.violet},
              ]].map((m,i) => (
                <div key={i} className="stream-card" style={{'--sc':m.color}}>
                  <span className="stream-cat">{m.cat}</span>
                  <span className="stream-q">{m.q}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="stream-fade-bot" />
        </div></Fade>
        <div className="container">
          <Fade delay={.3}><div className="ag-bridge">
            <div className="ag-bridge-line" />
            <h3 className="ag-bridge-h">Elemental checks for you.<br />Every morning.</h3>
            <p className="ag-bridge-sub">Not predictions. A daily briefing from your birth chart {"\u2014"} what to push, what to pause, and what to skip entirely.</p>
            <button className="btn-p" onClick={() => document.getElementById('transform')?.scrollIntoView({behavior:'smooth'})}>Show me a real reading {"\u2192"}</button>
          </div></Fade>
        </div>
      </section>

      {/* ═══ Ch4: STOP GUESSING, START KNOWING — Before/After + features ═══ */}
      <section className="transform-sec" id="transform">
        <div className="container">
          <Fade><p className="sec-label">Stop guessing. Start knowing.</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">Two versions of your week.<br />Only one has a forecast.</h2></Fade>

          {/* Toggle comparison */}
          <Fade delay={.1}><div className="toggle-wrap">
            <div className="toggle-bar">
              <button className={`toggle-btn ${!showAfter ? 'toggle-active' : ''}`} onClick={() => setShowAfter(false)}>
                <span className="toggle-dot" style={{background: !showAfter ? C.rose : 'transparent', border: !showAfter ? 'none' : `1px solid ${C.border}`}} />
                Without a forecast
              </button>
              <button className={`toggle-btn ${showAfter ? 'toggle-active' : ''}`} onClick={() => setShowAfter(true)}>
                <span className="toggle-dot" style={{background: showAfter ? C.emerald : 'transparent', border: showAfter ? 'none' : `1px solid ${C.border}`}} />
                With Elemental
              </button>
            </div>
            <div className="toggle-content" style={{background: showAfter ? 'rgba(52,211,153,.03)' : 'rgba(251,113,133,.03)', borderColor: showAfter ? 'rgba(52,211,153,.1)' : 'rgba(251,113,133,.1)'}}>
              <div className="tc-grid" key={showAfter ? 'after' : 'before'}>
                {(showAfter ? [
                  {area:"Career",text:"You see this month doesn't favor big career moves. You prepare instead \u2014 and when the window opens, you're ready."},
                  {area:"Relationships",text:"You bring up the difficult topic on a day your chart supports honest exchange. It lands. No explosion."},
                  {area:"Patterns",text:"Your chart flags the same elemental clash showing up every Q3. Now you see the pattern \u2014 and you stop walking into it."},
                  {area:"Decisions",text:"You've checked the forecast. The knot in your stomach loosens. Not because the decision is easy \u2014 but because you're not guessing."},
                ] : [
                  {area:"Career",text:"You accept the offer because the money looks right. Three months in, something feels off. You can't explain it."},
                  {area:"Relationships",text:"You have the conversation on a Tuesday after a long day. It goes badly. Same argument, same result, again."},
                  {area:"Patterns",text:"You keep hitting the same friction. Same months. Same type of conflict. You see the pattern but not the cause."},
                  {area:"Decisions",text:"Every big choice carries a heaviness. You're always partially guessing. You wish someone would just tell you when."},
                ]).map((item, i) => (
                  <div key={i} className="tc-item" style={{animationDelay:`${i * .06}s`}}>
                    <div className="tc-area">{item.area}</div>
                    <p className="tc-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div></Fade>

          {/* Features — horizontal scroll */}
          <Fade delay={.2}><div className="feat-section">
            <p className="feat-label">What your reading looks like</p>
            <div className="feat-scroll">
              {[
                {icon:"\uD83C\uDF05",t:"Daily Briefing",d:"Today's forecast across 6 life areas. Where the energy flows and where it resists.",span:false},
                {icon:"\u2694\uFE0F",t:"3 Daily Protocols",d:"What to wear, where to sit, when to make the call. Tailored to your chart.",span:false},
                {icon:"\uD83D\uDCC5",t:"Week Ahead Forecast",d:"See your strongest and weakest days before Monday.",span:false},
                {icon:"\uD83D\uDDFA\uFE0F",t:"Monthly + Yearly Forecast",d:"Strategic timing for big decisions. When to push and when to hold \u2014 forecast months ahead.",span:false},
                {icon:"\uD83D\uDCAC",t:"Ask Your Guide",d:"20 questions a day about your chart. It knows your birth data and gives specific, personalized answers.",span:false},
                {icon:"\uD83D\uDC65",t:"People Intelligence",d:"Compatibility with anyone. Where your charts align, where they'll clash.",span:false},
                {icon:"\uD83D\uDD2E",t:"10-Year Outlook",d:"See the major life phases ahead. Career peaks, transition windows, best years for big moves.",span:false},
              ].map((f,i) => (
                <div key={i} className="feat-card">
                  <span className="feat-icon">{f.icon}</span>
                  <h4 className="feat-title">{f.t}</h4>
                  <p className="feat-desc">{f.d}</p>
                </div>
              ))}
            </div>
            <div className="feat-fade-r" />
          </div></Fade>
        </div>
      </section>

      {/* ═══ Ch5: YOUR PERSONAL SHIFU — ON CALL — Social proof + price anchor ═══ */}
      <section className="stories" id="stories">
        <div className="container" style={{maxWidth:'100%',padding:0}}>
          <div style={{maxWidth:'var(--mw)',margin:'0 auto',padding:'0 24px'}}>
            <Fade><p className="sec-label">Your personal shifu {"\u2014"} on call</p></Fade>
            <Fade delay={.05}><h2 className="sec-h2">A S$400 consultation happens once a year.<br />This happens every morning.</h2></Fade>
            <Fade delay={.1}><p className="sec-sub">Here{"\u2019"}s what happens when people start checking their chart before their next move.</p></Fade>
          </div>
          <div className="marquee-wrap">
            <div className="marquee-track marquee-left">
              {[...storiesTop,...storiesTop].map((s, i) => (
                <div key={i} className="story-card">
                  <div className="story-tag">{s.tag}</div>
                  <p className="story-q">{"\u201C"}{s.q}{"\u201D"}</p>
                  <div className="story-who">{"\u2014"} {s.who}</div>
                </div>
              ))}
            </div>
            <div className="marquee-track marquee-right">
              {[...storiesBottom,...storiesBottom].map((s, i) => (
                <div key={i} className="story-card">
                  <div className="story-tag">{s.tag}</div>
                  <p className="story-q">{"\u201C"}{s.q}{"\u201D"}</p>
                  <div className="story-who">{"\u2014"} {s.who}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Ch6: YOUR RHYTHM, DECODED — Pattern discovery testimonials ═══ */}
      <section className="testimonials-sec">
        <div className="container" style={{ textAlign: "center" }}>
          <Fade><p className="sec-label">What 200 early testers said</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">{"\u201C"}I finally understand why last year<br />was so hard.{"\u201D"}</h2></Fade>
          <Fade delay={.1}><p className="sec-sub">We gave 200 people early access. Here{"\u2019"}s what surprised them most.</p></Fade>
        </div>
        <div className="testi-cols">
          {[
            [
              { text: "It actually calculated my BaZi AND Zi Wei in one place. Most apps only do one \u2014 this does both with AI that actually explains what it means.", name: "Mei Lin", detail: "28 \u00B7 Singapore", stars: 5 },
              { text: "I\u2019ve been studying BaZi for 3 years and this is the first app that makes the Ten Gods and Luck Pillars accessible to non-practitioners. The timeline view is brilliant.", name: "Marcus L.", detail: "42 \u00B7 Taipei", stars: 5 },
              { text: "The compatibility feature is what hooked me. I added my partner\u2019s birth details and the reading was scarily accurate about our dynamic.", name: "Priya S.", detail: "30 \u00B7 Singapore", stars: 5 },
              { text: "I expected fortune-cookie nonsense. The AI gave specific recommendations based on my actual chart. I\u2019m not saying I\u2019m a believer \u2014 but I haven\u2019t deleted it.", name: "Wei", detail: "40 \u00B7 Hong Kong", stars: 4 },
            ],
            [
              { text: "The AI referenced my \u4E59\u6728 Day Master specifically. This is more detailed than any BaZi reading I\u2019ve paid for \u2014 and I\u2019ve paid $80+ before.", name: "David K.", detail: "35 \u00B7 Kuala Lumpur", stars: 5 },
              { text: "I used to spend S$400 every Chinese New Year for a BaZi reading. Now I get that level of detail every single morning. My practitioner would probably hate this app.", name: "Kenneth T.", detail: "45 \u00B7 Singapore", stars: 5 },
              { text: "Finally, Chinese metaphysics in an app that doesn\u2019t look like it was built in 2005. The design alone makes it feel trustworthy.", name: "Jonathan W.", detail: "33 \u00B7 Melbourne", stars: 5 },
              { text: "I track my energy score against my actual productivity each week. The correlation is unsettling. Whatever this system is measuring, it\u2019s measuring something real.", name: "Jason P.", detail: "36 \u00B7 Singapore", stars: 4 },
            ],
            [
              { text: "Way more premium than Co-Star. The dark theme with the element colors is gorgeous. And it has an AI chat \u2014 Co-Star doesn\u2019t have that.", name: "Rachel T.", detail: "27 \u00B7 Los Angeles", stars: 4 },
              { text: "The AI chat is like having a BaZi consultant on call. I asked about career timing and it broke down my current Luck Pillar transition in plain English.", name: "Angie F.", detail: "29 \u00B7 Jakarta", stars: 5 },
              { text: "What sold me was the Year in Review feature. Seeing how the elemental energy shifts month by month helped me understand why Q3 last year was so rough.", name: "Natalie R.", detail: "31 \u00B7 Singapore", stars: 4 },
              { text: "I tried three other Zi Wei apps before this. They just give you the chart \u2014 no interpretation. Elemental actually tells you what the stars in your palaces mean for YOUR life.", name: "Tommy H.", detail: "37 \u00B7 Hong Kong", stars: 5 },
            ],
          ].map((col, ci) => (
            <div key={ci} className={`testi-col ${ci === 1 ? "testi-col-reverse" : ""} ${ci === 2 ? "testi-col-hide" : ""}`}>
              <div className="testi-scroll">
                {[...col, ...col].map((t, ti) => (
                  <div key={ti} className="testi-card">
                    <div className="testi-stars">{"\u2605".repeat(t.stars)}{"\u2606".repeat(5 - t.stars)}</div>
                    <p className="testi-text">{t.text}</p>
                    <span className="testi-name">{"\u2014"} {t.name}</span>
                    <span className="testi-detail">{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Ch7: SEE WHAT'S COMING — 3-step process ═══ */}
      <section className="howitworks">
        <div className="container" style={{maxWidth:800,textAlign:'center'}}>
          <Fade><p className="sec-label">How it works</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">Three minutes to your first reading.</h2></Fade>
          <Fade delay={.1}><div className="hiw-steps">
            <div className="hiw-step">
              <div className="hiw-num">1</div>
              <h4 className="hiw-title">Enter your birth details</h4>
              <p className="hiw-desc">Date, time, and city of birth. Takes about 30 seconds. If you don{"\u2019"}t know your exact birth hour, you can skip it and add it later.</p>
            </div>
            <div className="hiw-arrow">{"\u2192"}</div>
            <div className="hiw-step">
              <div className="hiw-num">2</div>
              <h4 className="hiw-title">We calculate your chart</h4>
              <p className="hiw-desc">Your birth data runs through 1,000 years of BaZi calculations {"\u2014"} decoded into a reading you can actually understand.</p>
            </div>
            <div className="hiw-arrow">{"\u2192"}</div>
            <div className="hiw-step">
              <div className="hiw-num">3</div>
              <h4 className="hiw-title">AI reads it for you, daily</h4>
              <p className="hiw-desc">Every morning, your reading updates with today{"\u2019"}s energy across 6 life areas, 3 specific actions, and personalized timing {"\u2014"} in plain English, not practitioner jargon.</p>
            </div>
          </div></Fade>
          <Fade delay={.2}><p className="hiw-note">No metaphysics degree required. <a href="#" className="ghost-link">Explore a full reading</a> {"\u2014"} no sign-up needed.</p></Fade>
        </div>
      </section>

      {/* ═══ Ch8: DESIGNED FOR YOUR CHART — Pricing ═══ */}
      <section className="pricing-sec" id="pricing">
        <div className="container" style={{ textAlign: "center" }}>
          <Fade><p className="sec-label">Pricing</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">Professional-grade readings.<br />Not professional-grade prices.</h2></Fade>
          <Fade delay={.09}><p className="pricing-anchor">A single BaZi consultation costs S$300\u2013500.<br />Elemental gives you the same analysis daily \u2014 for less than one session a year.</p></Fade>
          <Fade delay={.09}><div className="annual-toggle">
            <span className={!annual ? "at-active" : ""}>Monthly</span>
            <button className="at-switch" onClick={() => setAnnual(!annual)}><div className={`at-knob ${annual ? "at-on" : ""}`} /></button>
            <span className={annual ? "at-active" : ""}>Annual</span>
            {annual && <span className="at-save">Save 33%</span>}
          </div></Fade>
          <div className="pricing-grid">
            {pricing.map((p, i) => (
              <Fade key={i} delay={.1 + i * .07}>
                <div className={`pricing-card ${p.featured ? "pricing-feat" : ""}`}>
                  {p.badge && <span className="pricing-badge">{p.badge}</span>}
                  <h3 className="pricing-name">{p.name}</h3>
                  <div className="pricing-desc">{p.desc}</div>
                  <div className="pricing-price">{p.price}{p.per && <span>{p.per}</span>}</div>
                  <div className="pricing-sub">{p.sub}</div>
                  <ul className="pricing-feats">{p.feat.map((f, j) => <li key={j}><span className="pf-check">{"\u2726"}</span>{f}</li>)}</ul>
                  <button className={`btn-p ${p.ctaStyle === "outline" ? "btn-outline" : ""}`} style={{ width: "100%", justifyContent: "center" }}>{p.cta}</button>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={.25}><p className="pricing-extra">Need unlimited access? <strong>Inner Circle</strong> at S$38/mo {"\u2014"} unlimited Ask Your Guide chats, monthly personalized PDF report, and early access to new features. <a href="#" style={{color:'var(--bl)',textDecoration:'none',borderBottom:'1px solid var(--bl)'}}>Learn more</a></p></Fade>
          <Fade delay={.3}><div className="pricing-proof">
            <p>{"\u201C"}This is more detailed than any BaZi reading I{"\u2019"}ve paid for {"\u2014"} and I{"\u2019"}ve paid $80+ before.{"\u201D"} <span>{"\u2014"} David K., 35 {"\u00B7"} Kuala Lumpur</span></p>
          </div></Fade>
        </div>
      </section>

      {/* ═══ Ch9: YOUR COSMIC BLUEPRINT — FAQ ═══ */}
      {/* ═══ Ch10: CHECK YOUR FORECAST — Final CTA ═══ */}
      <section className="faq-sec" id="faq">
        <div className="container" style={{ maxWidth: 720 }}>
          <Fade><p className="sec-label">No, it{"\u2019"}s not fortune-telling.</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">(And other things you{"\u2019"}re<br />probably wondering.)</h2></Fade>
          <Fade delay={.1}><div className="faq-list">{faqs.map((f, i) => <FAQ key={i} q={f.q} a={f.a} defaultOpen={f.top} />)}</div></Fade>
        </div>
      </section>

      <section className="cta-final">
        <CharWall bright />
        <div className="cta-orb" />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Fade><h2 className="gradient-text cta-h">Your chart already exists.<br />You just haven{"\u2019"}t read it yet.</h2></Fade>
          <Fade delay={.1}><p className="cta-sub">Want to hear it?</p></Fade>
          <Fade delay={.18}><button className="btn-p btn-lg" onMouseEnter={scramble}>{ctaText} <span className="arr">{"\u2192"}</span></button></Fade>
          <Fade delay={.25}><p className="cta-fine">Free forever {"\u00B7"} 30 seconds {"\u00B7"} No credit card {"\u00B7"} Cancel anytime</p></Fade>
          <Fade delay={.3}><p className="cta-proof">{"\u2605\u2605\u2605\u2605\u2605"} Rated 4.8/5 by early testers</p></Fade>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">{"\u5143\u7D20"} Elemental</div>
        <div className="footer-links">
          <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a>
        </div>
      </footer>

      </main>
    </>
  );
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:${C.bg};--bl:${C.blue};--pu:${C.purple};--go:${C.gold};--tx:${C.text};--sub:${C.sub};--dim:${C.dim};--mw:1080px}
body{background:var(--bg);color:var(--tx);font-family:'DM Sans',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;line-height:1.55}

/* Cosmic Parallax Background */
.cosmic-parallax-container{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}

@keyframes animStar{from{transform:translateY(0)}to{transform:translateY(-2000px)}}

.cosmic-stars{width:1px;height:1px;background:transparent;animation:animStar 50s linear infinite}
.cosmic-stars::after{content:'';position:absolute;top:2000px;width:1px;height:1px;background:transparent;box-shadow:inherit}

.cosmic-stars-medium{width:2px;height:2px;background:transparent;animation:animStar 100s linear infinite;filter:drop-shadow(0 0 3px rgba(139,92,246,.6))}
.cosmic-stars-medium::after{content:'';position:absolute;top:2000px;width:2px;height:2px;background:transparent;box-shadow:inherit}

.cosmic-stars-large{width:3px;height:3px;background:transparent;animation:animStar 150s linear infinite;filter:drop-shadow(0 0 6px rgba(34,211,238,.5))}
.cosmic-stars-large::after{content:'';position:absolute;top:2000px;width:3px;height:3px;background:transparent;box-shadow:inherit}

.cosmic-horizon{position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent 5%,rgba(34,211,238,.15) 30%,rgba(139,92,246,.2) 50%,rgba(34,211,238,.15) 70%,transparent 95%)}
.cosmic-glow{position:absolute;bottom:0;left:10%;right:10%;height:120px;background:radial-gradient(ellipse at bottom,rgba(139,92,246,.06) 0%,rgba(34,211,238,.03) 40%,transparent 70%);filter:blur(20px)}
.noise{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.025;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

@keyframes charScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.char-wall{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.char-row{white-space:nowrap;animation:charScroll linear infinite;font-family:'JetBrains Mono',monospace;letter-spacing:.3em;line-height:2.8;user-select:none}

.scroll-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--bl),var(--pu));z-index:1000;transition:width .15s}

.nav{position:fixed;top:0;left:0;right:0;z-index:999;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);background:rgba(3,4,8,.85);border-bottom:1px solid rgba(148,163,184,.06)}
.nav-in{max-width:var(--mw);margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.nav-logo-img{height:34px;width:34px;object-fit:cover;border-radius:7px}
.nav-logo-text{font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#f1f5f9;letter-spacing:.02em}
.nav-r{display:flex;align-items:center;gap:22px}
.nav-r a{color:rgba(226,232,240,.65);font-size:13px;text-decoration:none;transition:color .2s}.nav-r a:hover{color:var(--tx)}

.btn-p{display:inline-flex;align-items:center;gap:7px;padding:13px 28px;border-radius:50px;background:linear-gradient(135deg,var(--bl),${C.blueMuted});color:${C.bgDeep};font-weight:600;font-size:14px;border:none;cursor:pointer;transition:box-shadow .3s,transform .2s;font-family:'DM Sans',sans-serif;position:relative}
.btn-p:hover{box-shadow:0 0 28px rgba(34,211,238,.25);transform:translateY(-1px)}
.btn-p::after{content:'';position:absolute;inset:-2px;border-radius:52px;background:linear-gradient(135deg,var(--bl),${C.blueMuted});opacity:0;z-index:-1;filter:blur(12px);transition:opacity .4s}.btn-p:hover::after{opacity:.35}
.arr{font-size:16px}
.btn-sm{padding:8px 18px;font-size:12px}
.btn-lg{padding:16px 38px;font-size:16px}
.btn-g{display:inline-flex;align-items:center;gap:6px;padding:13px 24px;border-radius:50px;background:transparent;color:var(--sub);border:1px solid var(--dim);font-size:14px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .3s}
.btn-g:hover{border-color:var(--bl);color:var(--bl)}
.btn-outline{background:transparent;color:var(--bl);border:1.5px solid rgba(34,211,238,.3)}.btn-outline:hover{background:rgba(34,211,238,.08)}

/* HERO */
.hero{position:relative;display:flex;flex-direction:column;justify-content:center;padding:120px 48px 80px;overflow:hidden;min-height:100vh}
.hero-inner{max-width:var(--mw);margin:0 auto;display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:center;width:100%;position:relative;z-index:10}
.hero-copy{position:relative;z-index:2}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--bl);margin-bottom:18px}
h1{font-family:'Fraunces',serif;font-size:clamp(32px,4.5vw,52px);line-height:1.15;font-weight:500;color:var(--tx);letter-spacing:-.01em}
.h1-accent{background:linear-gradient(135deg,var(--bl),var(--pu));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{color:rgba(226,232,240,.82);font-size:15.5px;line-height:1.7;margin:22px 0 28px;max-width:520px}
.hero-ctas{display:flex;gap:12px;flex-wrap:wrap}
.hero-visual{position:relative;display:flex;flex-direction:column;align-items:center;min-width:0;overflow:visible;margin-right:32px}
.hero-orb{position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.1) 0%,rgba(139,92,246,.08) 40%,transparent 70%);filter:blur(80px);top:50%;left:50%;transform:translate(-50%,-50%);z-index:0}
.phone-caption{font-size:12px;color:var(--dim);text-align:center;margin-top:14px;font-style:italic}

/* Trust bar */
.trust-bar{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:24px;font-size:12px;font-family:'JetBrains Mono',monospace;color:var(--dim);letter-spacing:.04em;max-width:var(--mw);margin:0 auto;position:relative;z-index:10}
.trust-dot{opacity:.3}

/* Phone — premium static mockup */
.phone-static{position:relative;z-index:2}
.phone-mockup{position:relative;max-height:600px;aspect-ratio:9/19.5;width:auto;border-radius:44px;overflow:hidden;border:1px solid rgba(255,255,255,.08);box-shadow:0 20px 80px rgba(0,150,255,.12),0 0 0 1px rgba(255,255,255,.04);background:#000;display:flex;flex-direction:column}
.phone-bar-top{height:44px;background:#000;flex-shrink:0;width:100%}
.phone-bar-bot{height:28px;background:#000;flex-shrink:0;width:100%}
.phone-island{position:absolute;top:12px;left:50%;transform:translateX(-50%);width:90px;height:24px;border-radius:12px;background:rgba(0,0,0,.6);z-index:3;pointer-events:none}
.app-preview{padding:12px 10px;height:100%;display:flex;flex-direction:column;gap:6px;background:linear-gradient(180deg,${C.bgDeep},${C.bg})}
.app-date{font-size:8px;color:var(--dim);font-family:'JetBrains Mono',monospace;text-align:center}
.app-top{text-align:center;padding:4px 0}
.app-score{font-family:'Fraunces',serif;font-size:36px;font-weight:700;background:linear-gradient(135deg,var(--bl),var(--pu));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.app-of{font-size:12px;color:var(--dim);margin-left:2px}
.app-headline{font-family:'Fraunces',serif;font-size:10px;text-align:center;color:var(--tx);line-height:1.4;padding:0 6px}
.app-insight{font-size:8.5px;color:var(--sub);line-height:1.5;padding:6px 8px;background:rgba(34,211,238,.06);border:1px solid rgba(34,211,238,.1);border-radius:5px;margin:2px 0}
.app-divider{height:1px;background:rgba(148,163,184,.06);margin:3px 0}
.app-section-label{font-size:7px;text-transform:uppercase;letter-spacing:.12em;color:var(--dim);font-family:'JetBrains Mono',monospace;margin-top:2px}
.app-actions{display:flex;flex-direction:column;gap:3px}
.app-action{font-size:8px;color:var(--sub);padding:4px 6px;background:rgba(148,163,184,.04);border-radius:4px;border:1px solid rgba(148,163,184,.05)}
.app-areas-mini{display:grid;grid-template-columns:1fr 1fr;gap:3px}
.app-area-mini{display:flex;justify-content:space-between;padding:3px 6px;background:rgba(148,163,184,.04);border-radius:4px;border:1px solid rgba(148,163,184,.05)}
.aam-name{font-size:7.5px;color:var(--dim)}
.aam-val{font-size:7.5px;color:var(--tx)}

/* Sections */
.container{max-width:var(--mw);margin:0 auto;padding:0 24px}
.sec-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--bl);margin-bottom:10px;text-align:center}
.sec-h2{font-family:'Fraunces',serif;font-size:clamp(26px,3.5vw,40px);font-weight:500;text-align:center;line-height:1.2;margin-bottom:16px}
.sec-sub{text-align:center;color:var(--sub);font-size:15px;line-height:1.65;max-width:520px;margin:0 auto 40px}

/* S2: Decision Stream */
.agitate{padding:48px 0;position:relative;overflow:hidden}
.stream-viewport{position:relative;height:420px;overflow:hidden;margin:32px 0 40px}
.stream-fade-top,.stream-fade-bot{position:absolute;left:0;right:0;height:100px;z-index:2;pointer-events:none}
.stream-fade-top{top:0;background:linear-gradient(to bottom,${C.bgDeep},transparent)}
.stream-fade-bot{bottom:0;background:linear-gradient(to top,${C.bgDeep},transparent)}
.stream-cols{display:flex;gap:14px;justify-content:center;height:100%;padding:0 24px}
.stream-col{display:flex;flex-direction:column;gap:10px;width:min(420px,45%);flex-shrink:0}
@keyframes streamUp{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
@keyframes streamDown{0%{transform:translateY(-50%)}100%{transform:translateY(0)}}
.stream-up{animation:streamUp 40s linear infinite}
.stream-down{animation:streamDown 40s linear infinite}
.stream-col:hover{animation-play-state:paused}
.stream-card{background:rgba(148,163,184,.03);border:1px solid rgba(148,163,184,.06);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:12px;flex-shrink:0;transition:border-color .3s,background .3s;cursor:default}
.stream-card:hover{background:rgba(148,163,184,.06);border-color:rgba(148,163,184,.12)}
.stream-cat{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--sc);flex-shrink:0;width:72px;opacity:.85}
.stream-q{font-size:14.5px;color:rgba(226,232,240,.88);line-height:1.55}
.ag-bridge{text-align:center;padding:44px 36px;position:relative;border-radius:20px;background:linear-gradient(135deg,rgba(34,211,238,.03),rgba(139,92,246,.03));border:1px solid rgba(34,211,238,.08);overflow:hidden}
.ag-bridge-line{position:absolute;top:0;left:50%;width:1px;height:32px;background:linear-gradient(to bottom,transparent,rgba(34,211,238,.3))}
.ag-bridge-h{font-family:'Fraunces',serif;font-size:clamp(20px,2.5vw,28px);color:var(--tx);margin-bottom:14px}
.ag-bridge-sub{font-size:14.5px;color:var(--sub);line-height:1.65;max-width:520px;margin:0 auto 22px}

/* S3: Transform — Toggle + Features */
.transform-sec{padding:48px 0;position:relative}
.toggle-wrap{margin-bottom:48px}
.toggle-bar{display:flex;gap:4px;background:rgba(148,163,184,.04);border:1px solid ${C.border};border-radius:12px;padding:4px;width:fit-content;margin:0 auto 24px}
.toggle-btn{display:flex;align-items:center;gap:8px;padding:10px 22px;border:none;background:none;border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--dim);cursor:pointer;transition:all .3s}
.toggle-active{background:rgba(148,163,184,.06);color:var(--tx)}
.toggle-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;transition:all .3s}
.toggle-content{border:1px solid;border-radius:16px;padding:32px;transition:background .4s,border-color .4s}
@keyframes tcFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.tc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.tc-item{animation:tcFadeIn .4s ease both}
.tc-area{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--bl);margin-bottom:8px;opacity:.6}
.tc-text{font-size:14.5px;color:rgba(226,232,240,.88);line-height:1.65}

/* Features — horizontal scroll */
.feat-section{position:relative}
.feat-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--bl);margin-bottom:20px;text-align:center}
.feat-scroll{display:flex;gap:14px;overflow-x:auto;padding:4px 0 16px;scroll-snap-type:x mandatory;-ms-overflow-style:none;scrollbar-width:none}.feat-scroll::-webkit-scrollbar{display:none}
.feat-card{flex-shrink:0;width:220px;scroll-snap-align:start;background:${C.card};border:1px solid ${C.border};border-radius:14px;padding:24px 20px;transition:border-color .4s,transform .35s,box-shadow .35s}.feat-card:hover{border-color:rgba(34,211,238,.12);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.15)}
.feat-icon{font-size:24px;display:block;margin-bottom:14px}
.feat-title{font-family:'Fraunces',serif;font-size:15px;font-weight:500;margin-bottom:8px;color:var(--tx)}
.feat-desc{font-size:13.5px;color:rgba(203,213,225,.82);line-height:1.6}
.feat-fade-r{position:absolute;top:0;right:0;width:80px;height:100%;background:linear-gradient(to right,transparent,${C.bgDeep});pointer-events:none;border-radius:0 14px 14px 0}

/* Hero additions */
.hero-resolve{font-family:'Fraunces',serif;font-size:16px;color:var(--bl);font-weight:500;margin-top:-4px;margin-bottom:8px;opacity:.9}
.hero-ghost-cta{font-size:13px;color:var(--dim);margin-top:10px}
.ghost-link{color:var(--bl);text-decoration:none;border-bottom:1px solid rgba(34,211,238,.3);transition:border-color .3s}.ghost-link:hover{border-color:var(--bl)}

/* BaZi Bridge — education for newcomers */
.bazi-bridge{padding:40px 24px 48px;position:relative;z-index:2}
.bazi-exp{font-size:15px;color:var(--sub);line-height:1.75;max-width:580px;margin:0 auto 32px}
.bazi-exp em{color:var(--tx);font-style:normal;font-weight:500}
.bazi-compare{display:flex;align-items:center;justify-content:center;gap:32px;margin-bottom:28px}
.bazi-col{text-align:center}
.bazi-col-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}
.bazi-stat{font-family:'Fraunces',serif;font-size:42px;font-weight:700;color:var(--dim);line-height:1}
.bazi-stat-label{font-size:12px;color:var(--dim);margin-top:4px}
.bazi-vs{font-size:13px;color:var(--dim);font-weight:500}
.bazi-closer{font-size:14px;color:rgba(203,213,225,.7);line-height:1.65;max-width:540px;margin:0 auto}

/* How It Works */
.howitworks{padding:48px 24px;position:relative;z-index:2}
.hiw-steps{display:flex;align-items:flex-start;justify-content:center;gap:0;margin:28px 0 24px}
.hiw-step{flex:0 1 220px;text-align:center;padding:0 12px}
.hiw-num{width:36px;height:36px;border-radius:50%;border:1px solid var(--bl);color:var(--bl);font-family:'Fraunces',serif;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.hiw-title{font-family:'Fraunces',serif;font-size:15px;font-weight:500;margin-bottom:8px}
.hiw-desc{font-size:13.5px;color:rgba(203,213,225,.82);line-height:1.6}
.hiw-arrow{color:var(--dim);font-size:18px;margin-top:8px;padding:0 2px;flex-shrink:0}
.hiw-note{font-size:13px;color:var(--dim);margin-top:4px}

/* Stories — Animated marquee */
.stories{padding:48px 0;overflow:hidden}
.marquee-wrap{display:flex;flex-direction:column;gap:14px;overflow:hidden;padding:0 0}
@keyframes marqueeLeft{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes marqueeRight{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
.marquee-track{display:flex;gap:14px;width:max-content;will-change:transform}
.marquee-left{animation:marqueeLeft 45s linear infinite}
.marquee-right{animation:marqueeRight 45s linear infinite}
.marquee-track:hover{animation-play-state:paused}
.story-card{background:${C.card};border:1px solid ${C.border};border-radius:14px;padding:22px 24px;min-width:320px;max-width:360px;flex-shrink:0;transition:border-color .3s;display:flex;flex-direction:column;gap:10px}.story-card:hover{border-color:${C.borderHover}}
.story-tag{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--bl);opacity:.7}
.story-q{font-size:14.5px;color:rgba(226,232,240,.9);line-height:1.65;flex:1}
.story-who{font-size:12px;color:var(--dim)}

/* Pricing */
/* Testimonials — scrolling columns, warm/human feel distinct from story cards */
.testimonials-sec{padding:48px 0;overflow:hidden}
.testi-cols{display:flex;gap:20px;justify-content:center;max-height:520px;overflow:hidden;-webkit-mask-image:linear-gradient(to bottom,transparent,black 12%,black 88%,transparent);mask-image:linear-gradient(to bottom,transparent,black 12%,black 88%,transparent);padding:0 24px;margin-top:32px}
.testi-col{flex:0 0 300px;overflow:hidden}
.testi-col-hide{display:none}
@media(min-width:900px){.testi-col-hide{display:block}}
@keyframes testiScroll{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
@keyframes testiScrollR{0%{transform:translateY(-50%)}100%{transform:translateY(0)}}
.testi-scroll{display:flex;flex-direction:column;gap:20px;animation:testiScroll 35s linear infinite}
.testi-col-reverse .testi-scroll{animation:testiScrollR 40s linear infinite}
.testi-card{padding:28px 24px;border-radius:16px;background:linear-gradient(135deg,rgba(30,25,40,.5),rgba(20,18,35,.4));position:relative}
.testi-stars{font-size:13px;color:${C.gold};letter-spacing:2px;margin-bottom:12px}
.testi-text{font-family:'Fraunces',serif;font-style:italic;color:rgba(226,232,240,.78);font-size:15px;line-height:1.7;font-weight:400}
.testi-name{display:block;margin-top:14px;font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(148,163,184,.5);font-weight:500;letter-spacing:.02em}
.testi-detail{display:block;font-family:'DM Sans',sans-serif;font-size:11px;color:rgba(148,163,184,.3);margin-top:2px}

.pricing-sec{padding:48px 0}
.pricing-anchor{font-size:15px;color:rgba(226,232,240,.8);margin-bottom:28px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.65}
.annual-toggle{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:36px;font-size:13px;color:var(--dim)}
.at-active{color:var(--tx);font-weight:600}
.at-switch{width:44px;height:24px;border-radius:12px;background:rgba(148,163,184,.15);border:none;cursor:pointer;position:relative;transition:background .3s}
.at-knob{width:18px;height:18px;border-radius:50%;background:var(--tx);position:absolute;top:3px;left:3px;transition:transform .3s}
.at-on{transform:translateX(20px);background:var(--bl)}
.at-save{font-size:11px;color:var(--bl);font-weight:600;padding:3px 8px;border:1px solid rgba(34,211,238,.2);border-radius:50px}
.pricing-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:700px;margin:0 auto 20px}
.pricing-card{background:${C.card};border:1px solid ${C.border};border-radius:18px;padding:28px;text-align:left;position:relative;transition:transform .3s,border-color .3s}.pricing-card:hover{border-color:${C.borderHover};transform:translateY(-3px)}
.pricing-feat{border-color:rgba(34,211,238,.15);background:rgba(34,211,238,.03)}
.pricing-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);font-size:10px;font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:${C.bgDeep};background:var(--bl);padding:3px 12px;border-radius:50px;white-space:nowrap}
.pricing-name{font-family:'Fraunces',serif;font-size:22px;font-weight:500}
.pricing-desc{font-size:12px;color:var(--bl);margin:4px 0 14px}
.pricing-price{font-family:'Fraunces',serif;font-size:32px;font-weight:700}.pricing-price span{font-size:14px;font-weight:400;color:var(--sub)}
.pricing-sub{font-size:12px;color:rgba(148,163,184,.65);margin:4px 0 18px}
.pricing-feats{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:22px}
.pricing-feats li{font-size:14px;color:rgba(226,232,240,.82);display:flex;align-items:flex-start;gap:8px;line-height:1.5}
.pf-check{color:var(--bl);font-size:9px;flex-shrink:0;margin-top:4px}
.pricing-extra{font-size:13px;color:var(--dim);line-height:1.6;max-width:540px;margin:0 auto}
.pricing-proof{margin-top:28px;padding:20px 28px;border-radius:12px;border:1px solid rgba(34,211,238,.1);background:rgba(34,211,238,.03);max-width:480px;margin-left:auto;margin-right:auto}
.pricing-proof p{font-size:14px;color:rgba(226,232,240,.75);line-height:1.6;font-style:italic}
.pricing-proof span{font-style:normal;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--bl);opacity:.7}

/* FAQ */
.faq-sec{padding:40px 0 32px}
.faq-list{display:flex;flex-direction:column;gap:6px}
.faq{border:1px solid ${C.border};border-radius:12px;overflow:hidden;cursor:pointer;transition:border-color .3s;background:${C.card}}.faq:hover{border-color:${C.borderHover}}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;font-size:14px;font-weight:500}
.faq-chev{color:var(--dim);font-size:12px;transition:transform .3s}
.faq-open .faq-chev{transform:rotate(180deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.16,1,.3,1)}
.faq-open .faq-a{max-height:300px}
.faq-ai{padding:0 20px 16px;font-size:14.5px;color:rgba(226,232,240,.85);line-height:1.7}

/* CTA Final */
.cta-final{padding:64px 24px;position:relative;overflow:hidden}
.cta-orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.1),rgba(34,211,238,.05),transparent 70%);filter:blur(80px);top:50%;left:50%;transform:translate(-50%,-50%);z-index:1}
.gradient-text{background:linear-gradient(135deg,var(--bl),var(--pu),var(--go));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.cta-h{font-family:'Fraunces',serif;font-size:clamp(28px,4vw,44px);font-weight:500;line-height:1.2;margin-bottom:16px}
.cta-sub{font-size:15px;color:var(--sub);margin-bottom:28px}
.cta-fine{font-size:12px;color:var(--dim);margin-top:16px}
.cta-proof{font-size:12px;color:var(--go);margin-top:10px;letter-spacing:.02em}

.footer{text-align:center;padding:40px 24px;border-top:1px solid rgba(148,163,184,.06)}
.footer-brand{font-family:'Fraunces',serif;font-size:15px;color:var(--dim);margin-bottom:8px}
.footer-links{display:flex;gap:16px;justify-content:center}
.footer-links a{font-size:12px;color:var(--dim);text-decoration:none}.footer-links a:hover{color:var(--tx)}

@media(max-width:768px){
  .hero-inner{grid-template-columns:1fr;text-align:center;gap:40px}
  .hero-sub{margin-left:auto;margin-right:auto}
  .hero-ctas{justify-content:center}
  .dw-panels{grid-template-columns:1fr;gap:14px}
  .ba-grid{grid-template-columns:1fr}
  .tc-grid{grid-template-columns:1fr}
  .feat-card{width:200px}
  .pricing-grid{grid-template-columns:1fr;max-width:380px}
  .phone-mockup{max-height:480px}
  .hero-visual{margin-right:0}
  .hero{padding:100px 24px 60px}
  .nav-r a{display:none}
  .trust-bar{flex-direction:column;gap:4px}
  .trust-dot{display:none}
  .bazi-compare{gap:20px}
  .bazi-stat{font-size:32px}
  .hiw-steps{flex-direction:column;gap:20px;align-items:center}
  .hiw-arrow{transform:rotate(90deg);margin:0}
  .hiw-step{max-width:300px}
  .story-card{min-width:280px;max-width:300px}
  .marquee-left{animation-duration:35s}
  .marquee-right{animation-duration:35s}

  /* Decisions stream — mobile single-column stack */
  .stream-viewport{height:400px;margin:24px 0 32px}
  .stream-cols{flex-direction:column;gap:0;padding:0 16px}
  .stream-col{width:100%}
  .stream-col:nth-child(2){display:none}
  .stream-card{padding:16px;gap:14px}
  .stream-cat{font-size:11px;width:80px}
  .stream-q{font-size:14px;line-height:1.5}
  .ag-bridge{padding:32px 20px}
  .ag-bridge-h{font-size:20px}
  .ag-bridge-sub{font-size:13px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;
