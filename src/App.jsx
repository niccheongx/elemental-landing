import React, { useState, useEffect, useRef, useCallback } from "react";
import CosmicParallaxBg from "./components/CosmicParallaxBg";

const C = {
  bg: "#0F172A", bgDeep: "#0B1120",
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
function StarField() {
  const stars = useRef(null);
  useEffect(() => {
    if (!stars.current || stars.current.childNodes.length > 0) return;
    [[50,"star-sm"],[25,"star-md"],[10,"star-lg"]].forEach(([count,cls]) => {
      for (let i = 0; i < count; i++) {
        const s = document.createElement("div"); s.className = `star ${cls}`;
        s.style.left = `${Math.random()*100}%`; s.style.top = `${Math.random()*100}%`;
        s.style.setProperty("--dur", `${2+Math.random()*4}s`);
        s.style.setProperty("--del", `${Math.random()*5}s`);
        stars.current.appendChild(s);
      }
    });
  }, []);
  return <div ref={stars} className="star-field" />;
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
    <div className="phone-float">
      <div className="phone-mockup">
        {children}
        <div className="phone-reflection" />
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
// V7 — TRANSFORMATION-CENTERED
// Joanna Wiebe framework: sell the BRIDGE between before and after
// Winning transformation: "Tomorrow's energy is already mapped."
// ═══════════════════════════════════════════
export default function ElementalLanding() {
  const [annual, setAnnual] = useState(true);
  const [showAfter, setShowAfter] = useState(true);
  const [ctaText, scramble] = useScramble("Check My Reading \u2014 Free");
  const [ctaText2, scramble2] = useScramble("Get Started Free");

  // Stories — reframed as "how they use the guide" not "magic things happened"
  const storiesTop = [
    { q: "I check every Sunday night before planning my week. It's like having a strategic advisor on my phone.", who: "P.R., 33, Finance", tag: "Weekly planning" },
    { q: "The reading suggested holding off on the career move. I trusted it, waited a month, and a better opportunity showed up.", who: "S.T., 34, Product Manager", tag: "Decision timing" },
    { q: "I stopped scheduling important meetings on days the app flags as low-energy. My hit rate on pitches went up.", who: "D.C., 36, Consultant", tag: "Daily strategy" },
    { q: "My shifu charges $400/session. The app gives me the same chart analysis daily. I still see my shifu annually for the deep stuff.", who: "K.W., 41, Business Owner", tag: "Practitioner-grade" },
    { q: "I share my daily reading with my partner every morning. It's opened up conversations we never used to have.", who: "A.T., 31, Teacher", tag: "Relationships" },
  ];
  const storiesBottom = [
    { q: "It helped me understand why I keep clashing with authority figures. That self-awareness alone was worth it.", who: "J.L., 28, Designer", tag: "Self-understanding" },
    { q: "Three friends downloaded after I shared my card to IG Stories. Now we compare mornings \u2014 it's become our ritual.", who: "M.L., 27, Marketing", tag: "Community" },
    { q: "I used to dread uncertainty. Now I check the month ahead and feel prepared. The anxiety is genuinely less.", who: "L.K., 39, HR Director", tag: "Reduced anxiety" },
    { q: "The monthly map said to hold on the partnership deal until week 3. My gut said the same. I waited. Better terms came.", who: "J.T., 52, Entrepreneur", tag: "Strategic patience" },
    { q: "It's not fortune-telling. It's more like a weather forecast for your decisions. I treat it as one more data point.", who: "V.C., 44, Tech Lead", tag: "Pragmatic use" },
  ];

  const faqs = [
    { q: "How is this different from horoscope apps?", top: true,
      a: "Western astrology groups billions into 12 sun signs by birth month. BaZi uses your exact birth year, month, day, AND hour \u2014 producing over 8,640 unique chart types. That precision is what enables guidance that actually changes day-to-day, not vague weekly affirmations." },
    { q: "Is this fortune-telling?", top: true,
      a: "No. BaZi doesn't predict specific events. It maps the energetic quality of each day as it interacts with your unique chart \u2014 showing which life areas are supported and which face friction. Think of it as a weather forecast for your decisions: it won't tell you what will happen, but it helps you prepare." },
    { q: "How accurate is it?",
      a: "Your chart is calculated using classical BaZi methodology \u2014 the same system taught by Joey Yap Academy and used by certified practitioners across Asia. Given correct birth data, the math is identical to what a S$400 consultation produces. Many of our users cross-check with their own shifu \u2014 we encourage it." },
    { q: "Is my birth data private?",
      a: "Encrypted end-to-end with AES-256. We never share your data with third parties. No ads, no data selling, no exceptions." },
    { q: "What if I don't know my exact birth time?",
      a: "You can start with just your birth date. The birth hour adds depth to your chart, but many users begin without it and add it later. You'll still get meaningful daily guidance." },
    { q: "What does the free plan actually include?",
      a: "Your full daily reading every morning: energy score, 6 life area breakdown, 3 specific actions for the day, and your personal element profile. It's not a teaser \u2014 it's a genuinely useful daily briefing. Pro adds the week ahead, monthly and yearly maps, the Ask Your Guide chat, and compatibility readings." },
    { q: "Can I use this alongside my existing shifu?",
      a: "Absolutely. Many of our most loyal users are people who already see a BaZi practitioner. They use Elemental for daily and weekly guidance between annual consultations. The chart calculation is identical \u2014 it's the same system." },
    { q: "How is this different from Calm, Headspace, or wellness apps?",
      a: "Those apps offer generic meditation and wellness routines. Elemental gives you guidance that's personalized to YOUR chart and changes every single day. It's not one-size-fits-all mindfulness \u2014 it's a navigation system built from your birth data that tells you how to move through THIS specific day." },
  ];

  const pricing = [
    { name: "Free", price: "S$0", per: "", desc: "Your daily briefing",
      sub: "Know the terrain before you step into it",
      feat: ["Daily reading with energy score", "6 life area breakdown", "3 Magic Actions (what to wear, where to sit, when to act)", "Personal element profile", "Shareable daily card"],
      cta: "Start Free", ctaStyle: "outline" },
    { name: "Pro", price: annual ? "S$119" : "S$14.90", per: annual ? "/year" : "/mo", desc: "Your full navigation system",
      sub: annual ? "= S$9.90/month \u00B7 billed annually" : "or S$119/year (save 33%)", featured: true,
      feat: ["Everything in Free", "Week Ahead Briefing \u2014 best days, caution days, decision windows", "Monthly + Yearly Strategic Maps with key timing", "Ask Your Guide \u2014 20 questions/day about your chart", "Date scrubber \u2014 check any past or future date", "People Intelligence (compatibility)", "10 Insight Tokens/month for deep analysis"],
      cta: "Try Pro \u2014 S$1.90 first month", badge: "Most popular" },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <StarField />
      <div className="noise" />
      <ScrollBar />

      <nav className="nav"><div className="nav-in">
        <div className="nav-logo">Elemental</div>
        <div className="nav-r">
          <a href="#stories">Stories</a>
          <a href="#pricing">Pricing</a>
          <button className="btn-p btn-sm" onMouseEnter={scramble2}>{ctaText2}</button>
        </div>
      </div></nav>

      <main>

      {/* ═══ S1: HERO — The transformation, not the product ═══ */}
      <section className="hero">
        <CosmicParallaxBg />
        <div className="hero-inner">
          <div className="hero-copy">
            <Fade><p className="eyebrow">Your daily life navigation system</p></Fade>
            <Fade delay={.06}><h1>You're making decisions<br />every day that matter.<br /><span className="h1-accent">Are you navigating blind?</span></h1></Fade>
            <Fade delay={.12}><p className="hero-sub">The job offer. The difficult conversation. The deal you're not sure about. You've been making these calls on gut feeling alone. Elemental reads your personal birth chart every morning and shows you the landscape before you walk into it \u2014 which days to push, which to hold, and where the real opportunities are hiding.</p></Fade>
            <Fade delay={.18}><div className="hero-ctas">
              <button className="btn-p" onMouseEnter={scramble}>{ctaText} <span className="arr">{"\u2192"}</span></button>
              <button className="btn-g" onClick={() => document.getElementById('daywith')?.scrollIntoView({behavior:'smooth'})}>{"\u2193"} See how it works</button>
            </div></Fade>
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
                  style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
                  src="/hero-demo.webm"
                />
              </Phone>
            </Fade>
            <Fade delay={.3}><p className="phone-caption">Real app footage. Your reading will be unique to your chart.</p></Fade>
          </div>
        </div>
        {/* Trust bar */}
        <Fade delay={.35}><div className="trust-bar">
          <span>Classical BaZi methodology</span>
          <span className="trust-dot">{"\u00B7"}</span>
          <span>8,640+ unique chart types</span>
          <span className="trust-dot">{"\u00B7"}</span>
          <span>Same math as certified practitioners</span>
          <span className="trust-dot">{"\u00B7"}</span>
          <span style={{color:C.emerald}}>Free forever tier</span>
        </div></Fade>
      </section>

      {/* ═══ S2: AGITATE — Decision stream (chat-style flooding cards) ═══ */}
      <section className="agitate" id="daywith">
        <div className="container">
          <Fade><p className="sec-label">Your week is full of these</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">Every week, dozens of decisions.<br />You're making them all blind.</h2></Fade>
        </div>
        <Fade delay={.1}><div className="stream-viewport">
          <div className="stream-fade-top" />
          <div className="stream-cols">
            <div className="stream-col stream-up">
              {[...[
                {cat:"Career",q:"Should I bring up the promotion this week?",color:"var(--bl)"},
                {cat:"Timing",q:"Is this the right month to sign the lease?",color:C.amber},
                {cat:"People",q:"Can I trust this new business partner?",color:C.violet},
                {cat:"Career",q:"The offer expires Friday. Take it or hold?",color:"var(--bl)"},
                {cat:"Health",q:"Why do I feel drained every Thursday?",color:C.emerald},
                {cat:"Relationships",q:"Do I bring it up tonight or wait?",color:C.rose},
                {cat:"Timing",q:"Launch this quarter or next?",color:C.amber},
                {cat:"Career",q:"My gut says no. But the money says yes.",color:"var(--bl)"},
              ],...[
                {cat:"Career",q:"Should I bring up the promotion this week?",color:"var(--bl)"},
                {cat:"Timing",q:"Is this the right month to sign the lease?",color:C.amber},
                {cat:"People",q:"Can I trust this new business partner?",color:C.violet},
                {cat:"Career",q:"The offer expires Friday. Take it or hold?",color:"var(--bl)"},
                {cat:"Health",q:"Why do I feel drained every Thursday?",color:C.emerald},
                {cat:"Relationships",q:"Do I bring it up tonight or wait?",color:C.rose},
                {cat:"Timing",q:"Launch this quarter or next?",color:C.amber},
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
                {cat:"Relationships",q:"We keep having the same fight. Why?",color:C.rose},
                {cat:"Timing",q:"Move now or wait until after Chinese New Year?",color:C.amber},
                {cat:"Career",q:"The restructure is coming. Should I be worried?",color:"var(--bl)"},
                {cat:"Patterns",q:"Every August, things fall apart. Coincidence?",color:C.violet},
                {cat:"Relationships",q:"He's pulling away again. What am I missing?",color:C.rose},
                {cat:"Career",q:"I've been passed over twice. Try again or leave?",color:"var(--bl)"},
                {cat:"Health",q:"The burnout is back. Same time as last year.",color:C.emerald},
                {cat:"People",q:"My new manager and I clash on everything.",color:C.violet},
              ],...[
                {cat:"Relationships",q:"We keep having the same fight. Why?",color:C.rose},
                {cat:"Timing",q:"Move now or wait until after Chinese New Year?",color:C.amber},
                {cat:"Career",q:"The restructure is coming. Should I be worried?",color:"var(--bl)"},
                {cat:"Patterns",q:"Every August, things fall apart. Coincidence?",color:C.violet},
                {cat:"Relationships",q:"He's pulling away again. What am I missing?",color:C.rose},
                {cat:"Career",q:"I've been passed over twice. Try again or leave?",color:"var(--bl)"},
                {cat:"Health",q:"The burnout is back. Same time as last year.",color:C.emerald},
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
            <h3 className="ag-bridge-h">What if you could see the landscape<br />before you stepped in?</h3>
            <p className="ag-bridge-sub">Not predictions. Not fortune-telling. A daily map of which days support action and which days resist it \u2014 personalized to your exact birth chart.</p>
            <button className="btn-p" onClick={() => document.getElementById('transform')?.scrollIntoView({behavior:'smooth'})}>See how it works {"\u2192"}</button>
          </div></Fade>
        </div>
      </section>

      {/* ═══ S3: TRANSFORMATION — Interactive toggle + scrollable features ═══ */}
      <section className="transform-sec" id="transform">
        <div className="container">
          <Fade><p className="sec-label">The shift</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">Same week. Different navigation.</h2></Fade>

          {/* Toggle comparison */}
          <Fade delay={.1}><div className="toggle-wrap">
            <div className="toggle-bar">
              <button className={`toggle-btn ${!showAfter ? 'toggle-active' : ''}`} onClick={() => setShowAfter(false)}>
                <span className="toggle-dot" style={{background: !showAfter ? C.rose : 'transparent', border: !showAfter ? 'none' : `1px solid ${C.border}`}} />
                Without a map
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
                  {area:"Patterns",text:"You finally see WHY the same friction keeps showing up. The chart shows it clearly. Now you can do something different."},
                  {area:"Decisions",text:"You've seen the terrain. The knot in your stomach loosens. Not because the decision is easy \u2014 but because you're not guessing."},
                ] : [
                  {area:"Career",text:"You accept the offer because the money looks right. Three months in, something feels off. You can't explain it."},
                  {area:"Relationships",text:"You have the conversation on a Tuesday after a long day. It goes badly. Same argument, same result, again."},
                  {area:"Patterns",text:"You keep hitting an invisible wall. Same type of conflict. Same stalling months. You notice it but can't see the cause."},
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
            <p className="feat-label">Your daily navigation kit</p>
            <div className="feat-scroll">
              {[
                {icon:"\uD83C\uDF05",t:"Daily Briefing",d:"Today's landscape across 6 life areas. Where the energy flows and where it resists.",span:false},
                {icon:"\u2694\uFE0F",t:"3 Daily Protocols",d:"What to wear, where to sit, when to make the call. Tailored to your chart.",span:false},
                {icon:"\uD83D\uDCC5",t:"Week Ahead Map",d:"See your strongest and weakest days before the week begins.",span:false},
                {icon:"\uD83D\uDDFA\uFE0F",t:"Monthly + Yearly Intel",d:"Strategic timing for big decisions. When to push and when to hold \u2014 mapped months ahead.",span:false},
                {icon:"\uD83D\uDCAC",t:"Ask Your Guide",d:"20 questions a day about your chart. It knows your birth data and gives specific, personalized answers.",span:false},
                {icon:"\uD83D\uDC65",t:"People Intelligence",d:"Compatibility with anyone. Where your charts align, where they'll clash.",span:false},
                {icon:"\uD83D\uDD2E",t:"10-Year Map",d:"See the major life phases ahead. Career peaks, transition windows, best years for big moves.",span:false},
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

      {/* ═══ S4: STORIES — Animated marquee, 2 rows, safe "guide usage" framing ═══ */}
      <section className="stories" id="stories">
        <div className="container" style={{maxWidth:'100%',padding:0}}>
          <div style={{maxWidth:'var(--mw)',margin:'0 auto',padding:'0 24px'}}>
            <Fade><p className="sec-label">From real users</p></Fade>
            <Fade delay={.05}><h2 className="sec-h2">How people use their guide.</h2></Fade>
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

      {/* ═══ S5: PRICING — Recall + reveal ═══ */}
      <section className="pricing-sec" id="pricing">
        <div className="container" style={{ textAlign: "center" }}>
          <Fade><p className="sec-label">Pricing</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">Start free. Go deeper when you're ready.</h2></Fade>
          <Fade delay={.09}><p className="pricing-anchor">A single BaZi consultation costs S$300\u2013500.<br />Elemental gives you the same chart intelligence daily \u2014 for less than one session a year.</p></Fade>
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
          <Fade delay={.25}><p className="pricing-extra">Need unlimited access? <strong>Inner Circle</strong> at S$38/mo {"\u2014"} unlimited Ask Shifu, monthly personalized PDF report, priority everything. <a href="#" style={{color:'var(--bl)',textDecoration:'none',borderBottom:'1px solid var(--bl)'}}>Learn more</a></p></Fade>
        </div>
      </section>

      {/* ═══ S6: FAQ + FINAL CTA ═══ */}
      <section className="faq-sec" id="faq">
        <div className="container" style={{ maxWidth: 720 }}>
          <Fade><p className="sec-label">Questions</p></Fade>
          <Fade delay={.05}><h2 className="sec-h2">Good questions to ask before you start</h2></Fade>
          <Fade delay={.1}><div className="faq-list">{faqs.map((f, i) => <FAQ key={i} q={f.q} a={f.a} defaultOpen={f.top} />)}</div></Fade>
        </div>
      </section>

      <section className="cta-final">
        <CharWall bright />
        <div className="cta-orb" />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Fade><h2 className="gradient-text cta-h">You wouldn't walk into a negotiation<br />without preparation.</h2></Fade>
          <Fade delay={.1}><p className="cta-sub">Why walk into tomorrow without checking the map? Your first reading takes 30 seconds.</p></Fade>
          <Fade delay={.18}><button className="btn-p btn-lg" onMouseEnter={scramble}>{ctaText} <span className="arr">{"\u2192"}</span></button></Fade>
          <Fade delay={.25}><p className="cta-fine">Free forever {"\u00B7"} No credit card {"\u00B7"} 30 seconds to your first reading</p></Fade>
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

.star-field{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}
@keyframes twinkle{0%{opacity:.3;transform:scale(.6)}100%{opacity:1;transform:scale(1.15)}}
.star{position:absolute;border-radius:50%;animation:twinkle var(--dur) ease-in-out var(--del) infinite alternate}
.star-sm{width:1.5px;height:1.5px;background:rgba(148,163,184,.5)}
.star-md{width:2px;height:2px;background:rgba(139,92,246,.45);box-shadow:0 0 4px rgba(139,92,246,.3)}
.star-lg{width:2.5px;height:2.5px;background:rgba(34,211,238,.5);box-shadow:0 0 8px rgba(34,211,238,.25)}
.noise{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.025;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

/* Cosmic Parallax Background */
.cosmic-parallax-container{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}

@keyframes animStar{from{transform:translateY(0)}to{transform:translateY(-2000px)}}

.cosmic-stars{width:1px;height:1px;background:transparent;animation:animStar 50s linear infinite}
.cosmic-stars::after{content:'';position:absolute;top:2000px;width:1px;height:1px;background:transparent;box-shadow:inherit}

.cosmic-stars-medium{width:2px;height:2px;background:transparent;animation:animStar 100s linear infinite;filter:drop-shadow(0 0 3px #fff)}
.cosmic-stars-medium::after{content:'';position:absolute;top:2000px;width:2px;height:2px;background:transparent;box-shadow:inherit}

.cosmic-stars-large{width:3px;height:3px;background:transparent;animation:animStar 150s linear infinite;filter:drop-shadow(0 0 6px #fff)}
.cosmic-stars-large::after{content:'';position:absolute;top:2000px;width:3px;height:3px;background:transparent;box-shadow:inherit}

@keyframes charScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.char-wall{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.char-row{white-space:nowrap;animation:charScroll linear infinite;font-family:'JetBrains Mono',monospace;letter-spacing:.3em;line-height:2.8;user-select:none}

.scroll-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--bl),var(--pu));z-index:1000;transition:width .15s}

.nav{position:fixed;top:0;left:0;right:0;z-index:999;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);background:rgba(11,17,32,.7);border-bottom:1px solid rgba(148,163,184,.06)}
.nav-in{max-width:var(--mw);margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between}
.nav-logo{font-family:'Fraunces',serif;font-size:18px;font-weight:600;color:var(--tx);letter-spacing:-.01em}
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
.hero-visual{position:relative;display:flex;flex-direction:column;align-items:center;min-width:0;overflow:visible}
.hero-orb{position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.1) 0%,rgba(139,92,246,.08) 40%,transparent 70%);filter:blur(80px);top:50%;left:50%;transform:translate(-50%,-50%);z-index:0}
.phone-caption{font-size:12px;color:var(--dim);text-align:center;margin-top:14px;font-style:italic}

/* Trust bar */
.trust-bar{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:24px;font-size:12px;font-family:'JetBrains Mono',monospace;color:var(--dim);letter-spacing:.04em;max-width:var(--mw);margin:0 auto;position:relative;z-index:10}
.trust-dot{opacity:.3}

/* Phone — premium floating mockup */
.phone-float{position:relative;z-index:2;animation:phoneFloat 6s ease-in-out infinite}
@keyframes phoneFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.phone-mockup{position:relative;width:280px;max-height:580px;aspect-ratio:9/19.5;border-radius:40px;overflow:hidden;border:1px solid rgba(255,255,255,.1);box-shadow:0 20px 80px rgba(0,150,255,.15),0 40px 100px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.05)}
.phone-reflection{position:absolute;bottom:0;left:0;right:0;height:35%;background:linear-gradient(to top,${C.bgDeep},transparent);pointer-events:none;z-index:2}
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
.sec-h2{font-family:'Fraunces',serif;font-size:clamp(26px,3.5vw,40px);font-weight:500;text-align:center;line-height:1.2;margin-bottom:40px}

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
.stream-q{font-size:13.5px;color:rgba(226,232,240,.85);line-height:1.5}
.ag-bridge{text-align:center;padding:44px 36px;position:relative;border-radius:20px;background:linear-gradient(135deg,rgba(34,211,238,.03),rgba(139,92,246,.03));border:1px solid rgba(34,211,238,.08);overflow:hidden}
.ag-bridge-line{position:absolute;top:0;left:50%;width:1px;height:32px;background:linear-gradient(to bottom,transparent,rgba(34,211,238,.3))}
.ag-bridge-h{font-family:'Fraunces',serif;font-size:clamp(20px,2.5vw,28px);color:var(--tx);margin-bottom:14px}
.ag-bridge-sub{font-size:14px;color:var(--sub);line-height:1.65;max-width:520px;margin:0 auto 22px}

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
.tc-text{font-size:13.5px;color:rgba(226,232,240,.85);line-height:1.6}

/* Features — horizontal scroll */
.feat-section{position:relative}
.feat-label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--bl);margin-bottom:20px;text-align:center}
.feat-scroll{display:flex;gap:14px;overflow-x:auto;padding:4px 0 16px;scroll-snap-type:x mandatory;-ms-overflow-style:none;scrollbar-width:none}.feat-scroll::-webkit-scrollbar{display:none}
.feat-card{flex-shrink:0;width:220px;scroll-snap-align:start;background:${C.card};border:1px solid ${C.border};border-radius:14px;padding:24px 20px;transition:border-color .4s,transform .35s,box-shadow .35s}.feat-card:hover{border-color:rgba(34,211,238,.12);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.15)}
.feat-icon{font-size:24px;display:block;margin-bottom:14px}
.feat-title{font-family:'Fraunces',serif;font-size:15px;font-weight:500;margin-bottom:8px;color:var(--tx)}
.feat-desc{font-size:12px;color:rgba(203,213,225,.8);line-height:1.55}
.feat-fade-r{position:absolute;top:0;right:0;width:80px;height:100%;background:linear-gradient(to right,transparent,${C.bgDeep});pointer-events:none;border-radius:0 14px 14px 0}

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
.story-q{font-size:13.5px;color:rgba(226,232,240,.88);line-height:1.6;flex:1}
.story-who{font-size:11px;color:var(--dim)}

/* Pricing */
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
.pricing-feats li{font-size:13px;color:rgba(226,232,240,.82);display:flex;align-items:flex-start;gap:8px;line-height:1.45}
.pf-check{color:var(--bl);font-size:9px;flex-shrink:0;margin-top:4px}
.pricing-extra{font-size:13px;color:var(--dim);line-height:1.6;max-width:540px;margin:0 auto}

/* FAQ */
.faq-sec{padding:40px 0 32px}
.faq-list{display:flex;flex-direction:column;gap:6px}
.faq{border:1px solid ${C.border};border-radius:12px;overflow:hidden;cursor:pointer;transition:border-color .3s;background:${C.card}}.faq:hover{border-color:${C.borderHover}}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;font-size:14px;font-weight:500}
.faq-chev{color:var(--dim);font-size:12px;transition:transform .3s}
.faq-open .faq-chev{transform:rotate(180deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.16,1,.3,1)}
.faq-open .faq-a{max-height:300px}
.faq-ai{padding:0 20px 16px;font-size:13px;color:rgba(226,232,240,.78);line-height:1.7}

/* CTA Final */
.cta-final{padding:64px 24px;position:relative;overflow:hidden}
.cta-orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.1),rgba(34,211,238,.05),transparent 70%);filter:blur(80px);top:50%;left:50%;transform:translate(-50%,-50%);z-index:1}
.gradient-text{background:linear-gradient(135deg,var(--bl),var(--pu),var(--go));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.cta-h{font-family:'Fraunces',serif;font-size:clamp(28px,4vw,44px);font-weight:500;line-height:1.2;margin-bottom:16px}
.cta-sub{font-size:15px;color:var(--sub);margin-bottom:28px}
.cta-fine{font-size:12px;color:var(--dim);margin-top:16px}

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
  .phone-mockup{width:240px;max-height:500px}
  .hero{padding:100px 24px 60px}
  .nav-r a{display:none}
  .trust-bar{flex-direction:column;gap:4px}
  .trust-dot{display:none}
  .story-card{min-width:280px;max-width:300px}
  .marquee-left{animation-duration:35s}
  .marquee-right{animation-duration:35s}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;
