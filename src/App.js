import { useState } from "react";
import {
  FileText,
  Zap,
  Linkedin,
  Copy,
  Check,
  RefreshCw,
  ArrowRight,
  Star,
  Shield,
  Clock,
} from "lucide-react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Lora:wght@700&display=swap');`;

const FREE_LIMIT = 3;

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}

function Badge({ children, color = "#f59e0b" }) {
  return (
    <span
      style={{
        background: color + "22",
        color,
        border: `1px solid ${color}44`,
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function Btn({
  children,
  onClick,
  disabled,
  variant = "primary",
  style: s = {},
}) {
  const base = {
    fontFamily: "Sora, sans-serif",
    fontWeight: 600,
    fontSize: 15,
    border: "none",
    borderRadius: 10,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.18s",
    padding: "13px 28px",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    opacity: disabled ? 0.5 : 1,
    ...s,
  };
  const styles = {
    primary: { background: "#f59e0b", color: "#0a0a0a" },
    outline: {
      background: "transparent",
      color: "#f59e0b",
      border: "1.5px solid #f59e0b33",
    },
    ghost: {
      background: "#ffffff10",
      color: "#fff",
      padding: "10px 20px",
      fontSize: 14,
    },
  };
  return (
    <button
      style={{ ...base, ...styles[variant] }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Input({ label, value, onChange, placeholder, multiline, rows = 3 }) {
  const inputStyle = {
    width: "100%",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 10,
    color: "#fff",
    fontFamily: "Sora, sans-serif",
    fontSize: 14,
    padding: "12px 14px",
    outline: "none",
    resize: multiline ? "vertical" : "none",
    boxSizing: "border-box",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#aaa" }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          style={inputStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          style={inputStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function UsageMeter({ used, limit }) {
  const left = limit - used;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#1a1a1a",
        borderRadius: 8,
        padding: "8px 14px",
        border: "1px solid #333",
      }}
    >
      <Zap size={14} color="#f59e0b" />
      <span style={{ fontSize: 13, color: "#aaa" }}>
        <span
          style={{ color: left > 0 ? "#f59e0b" : "#ef4444", fontWeight: 600 }}
        >
          {left}
        </span>{" "}
        free uses left
      </span>
    </div>
  );
}

function LandingPage({ onStart }) {
  const features = [
    {
      icon: <FileText size={22} color="#f59e0b" />,
      title: "Cover Letters",
      desc: "Tailored, compelling letters that get interviews. Not generic templates.",
    },
    {
      icon: <Zap size={22} color="#f59e0b" />,
      title: "Resume Bullets",
      desc: "Transform weak bullet points into powerful, quantified achievements.",
    },
    {
      icon: <Linkedin size={22} color="#f59e0b" />,
      title: "LinkedIn Bio",
      desc: "A magnetic About section that attracts recruiters and opportunities.",
    },
  ];
  const testimonials = [
    {
      name: "Sara M.",
      role: "Software Engineer",
      text: "Got 3 interviews in my first week. This tool is insane.",
      rating: 5,
    },
    {
      name: "James K.",
      role: "Marketing Manager",
      text: "I was applying for months with nothing. Used ApplyAI and got called back in 2 days.",
      rating: 5,
    },
    {
      name: "Nour A.",
      role: "UX Designer",
      text: "Worth every penny. My cover letters finally sound like me, but better.",
      rating: 5,
    },
  ];
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "Sora, sans-serif",
      }}
    >
      <style>{FONT}</style>
      {/* Nav */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#f59e0b",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={18} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.02em",
            }}
          >
            ApplyAI
          </span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: "#aaa", fontSize: 14 }}>$12/month</span>
          <Btn onClick={onStart} style={{ padding: "10px 22px", fontSize: 14 }}>
            Try Free <ArrowRight size={14} />
          </Btn>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "90px 24px 70px",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        <Badge>AI-Powered Job Applications</Badge>
        <h1
          style={{
            fontFamily: "Lora, serif",
            fontSize: "clamp(38px, 7vw, 68px)",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: "20px 0 24px",
            letterSpacing: "-0.03em",
          }}
        >
          Land your dream job.
          <br />
          <span style={{ color: "#f59e0b" }}>In half the time.</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#888",
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 520,
            margin: "0 auto 36px",
          }}
        >
          AI writes tailored cover letters, upgrades your resume bullets, and
          crafts a LinkedIn profile that gets recruiters sliding into your DMs.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Btn onClick={onStart}>
            Start for Free <ArrowRight size={16} />
          </Btn>
          <Btn variant="ghost" onClick={onStart}>
            See it work →
          </Btn>
        </div>
        <p style={{ color: "#555", fontSize: 13, marginTop: 16 }}>
          3 free uses · No credit card required
        </p>
      </div>

      {/* Social proof bar */}
      <div
        style={{
          background: "#111",
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
          padding: "16px 40px",
          display: "flex",
          justifyContent: "center",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        {[
          ["2,400+", "users hired"],
          ["98%", "satisfaction"],
          ["4.9/5", "avg rating"],
        ].map(([n, l]) => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#f59e0b" }}>
              {n}
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Lora, serif",
            textAlign: "center",
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 48,
            letterSpacing: "-0.02em",
          }}
        >
          Everything you need to get hired
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: 16,
                padding: "28px 24px",
              }}
            >
              <div
                style={{
                  background: "#f59e0b15",
                  borderRadius: 10,
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "0 24px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Lora, serif",
            textAlign: "center",
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 48,
            letterSpacing: "-0.02em",
          }}
        >
          Real people. Real results.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: 16,
                padding: "24px",
              }}
            >
              <div style={{ color: "#f59e0b", fontSize: 16, marginBottom: 12 }}>
                {"★".repeat(t.rating)}
              </div>
              <p
                style={{
                  color: "#ccc",
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                "{t.text}"
              </p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: "0 24px 100px", maxWidth: 800, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Lora, serif",
            textAlign: "center",
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: "-0.02em",
          }}
        >
          Simple pricing
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 48 }}>
          Start free. Upgrade when you're ready.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {/* Free */}
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: 16,
              padding: "32px 28px",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#888",
                marginBottom: 8,
              }}
            >
              Free
            </div>
            <div style={{ fontSize: 44, fontWeight: 700, marginBottom: 4 }}>
              $0
            </div>
            <div style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>
              3 uses · forever
            </div>
            {["3 AI generations", "All 3 tools", "No credit card"].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Check size={14} color="#555" />
                <span style={{ color: "#888", fontSize: 14 }}>{f}</span>
              </div>
            ))}
            <Btn
              variant="outline"
              onClick={onStart}
              style={{ width: "100%", justifyContent: "center", marginTop: 24 }}
            >
              Get started
            </Btn>
          </div>
          {/* Pro */}
          <div
            style={{
              background: "#111",
              border: "2px solid #f59e0b",
              borderRadius: 16,
              padding: "32px 28px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -12,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Badge>Most Popular</Badge>
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#f59e0b",
                marginBottom: 8,
              }}
            >
              Pro
            </div>
            <div style={{ fontSize: 44, fontWeight: 700, marginBottom: 4 }}>
              $12<span style={{ fontSize: 18, color: "#666" }}>/mo</span>
            </div>
            <div style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>
              Unlimited · cancel anytime
            </div>
            {[
              "Unlimited AI generations",
              "All 3 tools",
              "Priority speed",
              "New features first",
            ].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Check size={14} color="#f59e0b" />
                <span style={{ color: "#ccc", fontSize: 14 }}>{f}</span>
              </div>
            ))}
            <Btn
              onClick={onStart}
              style={{ width: "100%", justifyContent: "center", marginTop: 24 }}
            >
              Start free trial
            </Btn>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #1a1a1a",
          padding: "24px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 24,
              height: 24,
              background: "#f59e0b",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={13} color="#0a0a0a" fill="#0a0a0a" />
          </div>
          <span style={{ fontFamily: "Lora, serif", fontWeight: 700 }}>
            ApplyAI
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            <Shield size={14} color="#555" />,
            <Clock size={14} color="#555" />,
            <Star size={14} color="#555" />,
          ].map((icon, i) => (
            <span
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#555",
                fontSize: 12,
              }}
            >
              {icon} {["SSL Secure", "24h Support", "4.9★ Rating"][i]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolPage({ onBack }) {
  const [tab, setTab] = useState("cover");
  const [uses, setUses] = useState(FREE_LIMIT);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isPro] = useState(false);

  const [cover, setCover] = useState({
    jobTitle: "",
    company: "",
    jobDesc: "",
    background: "",
  });
  const [resume, setResume] = useState({ bullet: "" });
  const [linkedin, setLinkedin] = useState({ name: "", role: "", skills: "" });

  const tabs = [
    { id: "cover", label: "Cover Letter", icon: <FileText size={15} /> },
    { id: "resume", label: "Resume Bullets", icon: <Zap size={15} /> },
    { id: "linkedin", label: "LinkedIn Bio", icon: <Linkedin size={15} /> },
  ];

  const canGenerate = isPro || uses > 0;

  const generate = async () => {
    if (!canGenerate) {
      setShowUpgrade(true);
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      let prompt = "";
      if (tab === "cover") {
        if (!cover.jobTitle || !cover.jobDesc) {
          setOutput("Please fill in at least the job title and description.");
          setLoading(false);
          return;
        }
        prompt = `Write a compelling, personalized cover letter for:\n\nPosition: ${cover.jobTitle}${cover.company ? ` at ${cover.company}` : ""}\n\nJob Description:\n${cover.jobDesc}\n\nMy Background:\n${cover.background || "Not provided"}\n\nWrite exactly 3 paragraphs. Opening: grab attention with a specific reason you want this role. Middle: connect your background to their needs with 2-3 specific examples. Closing: confident call to action. Avoid all clichés. Sound like a real, confident human.`;
      } else if (tab === "resume") {
        if (!resume.bullet) {
          setOutput("Please enter a bullet point to improve.");
          setLoading(false);
          return;
        }
        prompt = `Transform this weak resume bullet point into 3 powerful alternatives:\n\n"${resume.bullet}"\n\nRules: Start each with a different strong action verb. Include specific metrics (%, $, numbers) where plausible. Highlight impact, not just duties. Format as:\n\n1. [bullet]\n2. [bullet]\n3. [bullet]\n\nThen briefly explain what made each one stronger.`;
      } else {
        if (!linkedin.role) {
          setOutput("Please enter your role.");
          setLoading(false);
          return;
        }
        prompt = `Write a compelling LinkedIn "About" section for:\nName: ${linkedin.name || "me"}\nRole: ${linkedin.role}\nKey skills/achievements: ${linkedin.skills || "Not provided"}\n\nWrite 3-4 sentences in first person. Be warm, specific, and professional. End with what kind of opportunities you're open to. Do NOT use buzzwords like "passionate" or "results-driven".`;
      }
      const result = await callClaude(prompt);
      setOutput(result);
      if (!isPro) setUses((u) => u - 1);
    } catch {
      setOutput("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "Sora, sans-serif",
      }}
    >
      <style>{FONT}</style>
      {showUpgrade && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000cc",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 20,
              padding: "40px 36px",
              maxWidth: 420,
              width: "100%",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚡</div>
            <h2
              style={{
                fontFamily: "Lora, serif",
                fontSize: 26,
                marginBottom: 12,
              }}
            >
              You've hit the free limit
            </h2>
            <p
              style={{
                color: "#888",
                fontSize: 14,
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Upgrade to Pro for unlimited cover letters, resume bullets, and
              LinkedIn bios. Cancel anytime.
            </p>
            <Btn
              style={{
                width: "100%",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              Upgrade for $12/month
            </Btn>
            <button
              onClick={() => setShowUpgrade(false)}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                cursor: "pointer",
                fontSize: 14,
                padding: 8,
              }}
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
      {/* Header */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontFamily: "Sora, sans-serif",
          }}
        >
          ←{" "}
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 22,
                height: 22,
                background: "#f59e0b",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={12} color="#0a0a0a" fill="#0a0a0a" />
            </div>
            ApplyAI
          </span>
        </button>
        <UsageMeter used={FREE_LIMIT - uses} limit={FREE_LIMIT} />
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 28,
            background: "#111",
            borderRadius: 12,
            padding: 6,
            border: "1px solid #1a1a1a",
            width: "fit-content",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setOutput("");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontFamily: "Sora, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                transition: "all 0.15s",
                background: tab === t.id ? "#f59e0b" : "transparent",
                color: tab === t.id ? "#0a0a0a" : "#888",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          {/* Input Panel */}
          <div
            style={{
              background: "#111",
              border: "1px solid #1a1a1a",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 4,
                color: "#ddd",
              }}
            >
              {tab === "cover"
                ? "Job Details"
                : tab === "resume"
                  ? "Your Bullet Point"
                  : "Your Profile"}
            </h3>
            {tab === "cover" && (
              <>
                <Input
                  label="Job Title *"
                  value={cover.jobTitle}
                  onChange={(v) => setCover((p) => ({ ...p, jobTitle: v }))}
                  placeholder="e.g. Product Designer"
                />
                <Input
                  label="Company Name"
                  value={cover.company}
                  onChange={(v) => setCover((p) => ({ ...p, company: v }))}
                  placeholder="e.g. Stripe"
                />
                <Input
                  label="Job Description *"
                  value={cover.jobDesc}
                  onChange={(v) => setCover((p) => ({ ...p, jobDesc: v }))}
                  placeholder="Paste the job description here..."
                  multiline
                  rows={5}
                />
                <Input
                  label="Your Background"
                  value={cover.background}
                  onChange={(v) => setCover((p) => ({ ...p, background: v }))}
                  placeholder="Your relevant experience, skills, achievements..."
                  multiline
                  rows={3}
                />
              </>
            )}
            {tab === "resume" && (
              <>
                <Input
                  label="Current bullet point *"
                  value={resume.bullet}
                  onChange={(v) => setResume({ bullet: v })}
                  placeholder='e.g. "Responsible for managing social media accounts"'
                  multiline
                  rows={4}
                />
                <p style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>
                  Paste your weak, vague bullet point. We'll rewrite it with
                  strong verbs and measurable impact.
                </p>
              </>
            )}
            {tab === "linkedin" && (
              <>
                <Input
                  label="Your Name"
                  value={linkedin.name}
                  onChange={(v) => setLinkedin((p) => ({ ...p, name: v }))}
                  placeholder="e.g. Alex Johnson"
                />
                <Input
                  label="Your Role *"
                  value={linkedin.role}
                  onChange={(v) => setLinkedin((p) => ({ ...p, role: v }))}
                  placeholder="e.g. Full-Stack Developer"
                />
                <Input
                  label="Key Skills & Achievements"
                  value={linkedin.skills}
                  onChange={(v) => setLinkedin((p) => ({ ...p, skills: v }))}
                  placeholder="e.g. 5 years React, built app used by 10k users, open to remote roles..."
                  multiline
                  rows={4}
                />
              </>
            )}
            <Btn
              onClick={generate}
              disabled={loading || !canGenerate}
              style={{ marginTop: 4, justifyContent: "center" }}
            >
              {loading ? (
                <>
                  <RefreshCw
                    size={15}
                    style={{ animation: "spin 1s linear infinite" }}
                  />{" "}
                  Generating...
                </>
              ) : (
                <>
                  <Zap size={15} /> Generate{" "}
                  {tab === "cover"
                    ? "Cover Letter"
                    : tab === "resume"
                      ? "Bullets"
                      : "Bio"}
                </>
              )}
            </Btn>
          </div>

          {/* Output Panel */}
          <div
            style={{
              background: "#111",
              border: "1px solid #1a1a1a",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#ddd" }}>
                Result
              </h3>
              {output && (
                <button
                  onClick={copy}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#ffffff10",
                    border: "1px solid #333",
                    borderRadius: 7,
                    padding: "6px 12px",
                    cursor: "pointer",
                    color: copied ? "#4ade80" : "#aaa",
                    fontSize: 13,
                    fontFamily: "Sora, sans-serif",
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}{" "}
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            {!output && !loading && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 12,
                  color: "#333",
                }}
              >
                <Zap size={32} color="#222" />
                <p style={{ fontSize: 14, color: "#444", textAlign: "center" }}>
                  Fill in the form and hit Generate.
                  <br />
                  Your result appears here.
                </p>
              </div>
            )}
            {loading && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    border: "3px solid #222",
                    borderTop: "3px solid #f59e0b",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <p style={{ color: "#555", fontSize: 14 }}>
                  Writing your{" "}
                  {tab === "cover"
                    ? "cover letter"
                    : tab === "resume"
                      ? "bullets"
                      : "bio"}
                  ...
                </p>
              </div>
            )}
            {output && !loading && (
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "#ccc",
                  whiteSpace: "pre-wrap",
                  fontFamily: "Georgia, serif",
                }}
              >
                {output}
              </div>
            )}
          </div>
        </div>

        {uses === 0 && !isPro && (
          <div
            style={{
              marginTop: 20,
              background: "#f59e0b15",
              border: "1px solid #f59e0b33",
              borderRadius: 12,
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                You've used all 3 free generations
              </div>
              <div style={{ color: "#888", fontSize: 13 }}>
                Upgrade to Pro for unlimited access — only $12/month
              </div>
            </div>
            <Btn>Upgrade to Pro →</Btn>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  return view === "landing" ? (
    <LandingPage onStart={() => setView("tool")} />
  ) : (
    <ToolPage onBack={() => setView("landing")} />
  );
}
