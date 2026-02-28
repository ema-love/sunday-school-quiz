import { useState, useEffect, useCallback } from "react";

const TEACHER_PASSWORD = "yaya2026";

const EXAM_DATA = {
  id: "exam-1",
  title: "Sunday School Second Quarter Quiz",
  subject: "YAYA Class",
  date: "1st March 2026",
  duration: 90,
  totalMarks: 100,
  instructions: "Answer ALL questions",
  questions: [
    { id: "q1a", type: "short", text: "What is the memory verse of Lesson 14 (PEER PRESSURE)?", marks: 5, answer: '1 Corinthians 15:33 — "Do not be deceived, Evil company corrupts good habits."' },
    { id: "q1b", type: "short", text: "Mention five (5) strategies to employ to stand firm in the face of negative peer pressure.", marks: 5, answer: "(i) Believe in yourself: dare to walk away from compromising situations. Trust your convictions.\n(ii) Prepare in advance — plan how to respond to various scenarios, knowing what to do ahead of time.\n(iii) Seek guidance.\n(iv) Practice saying NO.\n(v) Surround yourself with supportive friends." },
    { id: "q2a", type: "short", text: "What are the disadvantages of running one's mouth (the fool's mouth)? Mention five (5).", marks: 5, answer: "(i) The fool's mouth is very quick to expression.\n(ii) A fool's mouth is his destruction and his rash words are a trap to his own soul.\n(iii) No bridle is employed to keep the mouth shut and to speak only when necessary.\n(iv) A fool is not trusted because of irregularity of speech.\n(v) A fool's mouth is used to engage in ceaseless and unprofitable arguments which may end up in a fight." },
    { id: "q2b", type: "short", text: "Briefly explain the attitude of thanksgiving. Support your answer with a biblical reference.", marks: 5, answer: 'The attitude of thanksgiving is a deliberate choice to remain grateful to God in all circumstances whether good or bad. We should always cultivate the habit of thanksgiving rather than complaining. (1 Thessalonians 5:18 — "In everything give thanks for this is the will of God in Christ.")' },
    { id: "q3a", type: "short", text: "Define the term, Time Management.", marks: 5, answer: "Time management is the way one organizes and plans how long one will spend on a specific activity. It is the art of having time to do everything that you need to do without feeling stressed about it, and prioritizing your tasks in order of importance." },
    { id: "q3b", type: "short", text: "What is the meaning of the acronym SMART?", marks: 5, answer: "S — Specific\nM — Measurable\nA — Achievable\nR — Relevant\nT — Time-bound" },
    { id: "q4a", type: "short", text: "Mention five (5) examples of destiny destroyers.", marks: 5, answer: "(i) Ignorance\n(ii) Pursuit of vanity\n(iii) Lack of faith\n(iv) Pride\n(v) Sinful lifestyle" },
    { id: "q4b", type: "short", text: "List five (5) individuals in the Bible that experienced destruction of their destiny through their actions, and state the specific action each person carried out that led to their downfall.", marks: 5, answer: "(i) Judas — Greed\n(ii) Demas — Love for the world\n(iii) Gehazi — Greed\n(iv) Reuben — Illicit sex (father's concubine)\n(v) Achan — Disobedience" },
    { id: "q5a", type: "short", text: "Mention five (5) factors that affect effective planning.", marks: 5, answer: "(i) Vision\n(ii) Goal\n(iii) Delegation\n(iv) Timing\n(v) Disobedience" },
    { id: "q5b", type: "short", text: "List five (5) benefits of effective planning.", marks: 5, answer: "(i) It helps one realize his/her goals.\n(ii) It relieves stress.\n(iii) It increases productivity.\n(iv) It increases accomplishment.\n(v) It results in more opportunity." },
    { id: "q6a", type: "short", text: "What are the brands and descriptions of untoward freedom? Mention five (5).", marks: 5, answer: "(i) Lawlessness\n(ii) Rebellion\n(iii) Obeying the flesh\n(iv) Throwing caution into the wind\n(v) Evil practices" },
    { id: "q6b", type: "short", text: "Mention five (5) constituents of true freedom.", marks: 5, answer: "(i) Freedom from sin\n(ii) Freedom from oppression\n(iii) Freedom from principalities\n(iv) Freedom from fear\n(v) Freedom from everlasting punishment" },
    { id: "q7a", type: "short", text: "State five (5) negative views about politics that discourage many believers from being involved in politics.", marks: 5, answer: "(i) Politics is dirty and corrupt.\n(ii) Only dishonest people engage in politics.\n(iii) Politicians are naturally untrustworthy.\n(iv) Politics is worldly; believers should only focus on praying for leaders.\n(v) Christians who enter politics will inevitably compromise their faith." },
    { id: "q7b", type: "short", text: "Outline five (5) practical steps Christians can take to engage in responsible politics, while maintaining their faith and integrity.", marks: 5, answer: "(i) Prayer for guidance.\n(ii) Educate yourself.\n(iii) Register to vote and be voted for.\n(iv) Mentor other believers.\n(v) Engage in your community." },
    { id: "q8a", type: "short", text: "Who is an agent of transformation? List two (2) qualities of an agent of transformation.", marks: 5, answer: "An agent of transformation is a man or woman who changes things from what they used to be for the betterment of all. Qualities: They are bold, humble, and people of integrity." },
    { id: "q8b", type: "short", text: "Highlight five (5) practical steps an individual can take to become an agent of transformation.", marks: 5, answer: "(i) Surrender\n(ii) Vision\n(iii) Service\n(iv) Discipline\n(v) Prayer\n(vi) Love and compassion" },
    { id: "q9a", type: "short", text: "Define resourcefulness.", marks: 5, answer: "Resourcefulness is the ability to deal creatively and effectively with challenges, finding innovative and practical solutions using available resources — i.e., using what you have at hand rather than what you would like to have, to succeed." },
    { id: "q9b", type: "short", text: "List five (5) ways an individual can become resourceful.", marks: 5, answer: "(i) Develop a positive mindset.\n(ii) Seek knowledge and be open to new ideas.\n(iii) Stay persistent.\n(iv) Leverage on what you have.\n(v) Practice adaptability." },
    { id: "q10a", type: "short", text: "Define purity. Identify two (2) roles each individual has to play to be sexually pure.", marks: 5, answer: "Purity is a state of being uncontaminated, untainted. It is abstinence from sexual pollution like premarital sex, illicit sex, and lustful thoughts. Roles: Guard your heart to know what to allow and what to discard. Stay off toxic friends." },
    { id: "q10b", type: "short", text: "Highlight five (5) benefits of sexual purity.", marks: 5, answer: "(i) No entanglement with the yoke of bondage.\n(ii) It is honourable.\n(iii) It is interesting and exciting.\n(iv) It helps our relationship with God.\n(v) We are not victims like Reuben and Amnon." },
  ],
};

const SEED_SUBMISSIONS = [
  {
    id: "sub-1", examId: "exam-1", studentName: "Blessing Adeyemi", submittedAt: "2026-03-01T09:45:00", status: "pending",
    answers: {
      q1a: '1 Corinthians 15:33 "Do not be deceived, evil company corrupts good habits"',
      q1b: "1. Believe in yourself\n2. Prepare in advance\n3. Seek guidance from elders\n4. Practice saying no\n5. Surround yourself with good friends",
      q2a: "A fool talks too much without thinking. His mouth brings destruction. He doesn't control his tongue. People don't trust him. He argues over small things.",
      q2b: "Thanksgiving is being grateful to God in every situation whether good or bad. 1 Thessalonians 5:18 says in everything give thanks.",
      q3a: "Time management is how we organize our time and plan activities so we don't feel stressed.",
      q3b: "S - Specific\nM - Measurable\nA - Achievable\nR - Relevant\nT - Time bound",
      q4a: "Ignorance, pride, sin, vanity, lack of faith",
      q4b: "Judas was greedy\nDemas loved the world\nGehazi was greedy\nReuben committed sexual sin\nAchan disobeyed God",
      q5a: "Vision, goals, time, delegation, and discipline",
      q5b: "It helps achieve goals. Reduces stress. More productive. More accomplishments. Creates more opportunities.",
      q6a: "Lawlessness, rebellion, obeying the flesh, throwing caution to the wind, evil practices",
      q6b: "Freedom from sin, freedom from fear, freedom from oppression, freedom from principalities, freedom from everlasting punishment",
      q7a: "Politics is dirty. Only bad people do politics. Politicians lie. Politics is worldly. Christians should just pray instead.",
      q7b: "Pray for guidance, educate yourself about policies, register to vote, mentor other believers, be active in your community.",
      q8a: "An agent of transformation is someone who changes things for the better. They are bold and humble.",
      q8b: "Surrender to God, have a vision, serve others, be disciplined, pray always",
      q9a: "Resourcefulness is the ability to solve problems creatively using what you have available.",
      q9b: "Have a positive mindset, seek knowledge, be persistent, use what you have, be adaptable",
      q10a: "Purity means being clean and uncontaminated. To be sexually pure you should guard your heart and avoid bad friends.",
      q10b: "No bondage, it is honourable, it is exciting, better relationship with God, you won't be a victim like Reuben.",
    },
    grades: {}, feedback: {}, overallFeedback: "", totalScore: null,
  },
  {
    id: "sub-2", examId: "exam-1", studentName: "Emmanuel Okafor", submittedAt: "2026-03-01T10:15:00", status: "pending",
    answers: {
      q1a: "Evil company corrupts good habits. I think it's from Corinthians.",
      q1b: "Say no to bad friends. Believe in yourself. Walk away from bad situations. Ask your parents for help.",
      q2a: "A fool talks too much. His words get him in trouble. People don't like him.",
      q2b: "We should be thankful to God always. The Bible says give thanks in everything.",
      q3a: "Time management is planning your time well.",
      q3b: "S - Specific\nM - Measurable\nA - Achievable\nR - Realistic\nT - Time",
      q4a: "Pride, sin, ignorance, bad friends, laziness",
      q4b: "Judas betrayed Jesus for money\nSamson told Delilah his secret\nEsau sold his birthright",
      q5a: "Goals, vision, time, resources",
      q5b: "Helps you succeed. Less stress. Better results. More time for other things.",
      q6a: "Rebellion, lawlessness, doing whatever you want, evil things",
      q6b: "Freedom from sin, freedom from the devil, freedom from fear, freedom from death",
      q7a: "Politics is corrupt. Politicians are liars. It's not for Christians.",
      q7b: "Pray about it. Learn about politics. Vote. Help in your community.",
      q8a: "Someone who makes positive change. They are courageous and honest.",
      q8b: "Pray, serve, have vision, be disciplined",
      q9a: "Being creative with what you have to solve problems.",
      q9b: "Think positive, learn new things, don't give up, use available resources",
      q10a: "Being pure and staying away from sexual sin. Guard your heart and avoid bad influence.",
      q10b: "God is happy with you. No bondage. It is honourable. Good for your future.",
    },
    grades: {}, feedback: {}, overallFeedback: "", totalScore: null,
  },
];

// ─── Icons ────────────────────────────────────────────────
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UserIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ArrowLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const SendIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const CheckIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const EyeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const LockIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const LogOutIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }
  @keyframes scaleIn { from{transform:scale(0)} to{transform:scale(1)} }
  @keyframes slideUp { from{transform:translate(-50%,20px);opacity:0} to{transform:translate(-50%,0);opacity:1} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
  .role-card:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,.12)!important }
  .sub-row:hover { background:#fefce8!important }
`;

function questionLabel(id) {
  const m = id.match(/q(\d+)([ab])/);
  return m ? `${m[1]}${m[2]}` : id;
}
function questionFullLabel(id) {
  const m = id.match(/q(\d+)([ab])/);
  return m ? `Question ${m[1]}${m[2]}` : id;
}

// ─── Timer ────────────────────────────────────────────────
function Timer({ duration, onTimeUp }) {
  const [seconds, setSeconds] = useState(duration * 60);
  useEffect(() => {
    if (seconds <= 0) { onTimeUp(); return; }
    const t = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds, onTimeUp]);
  const m = Math.floor(seconds / 60), s = seconds % 60, low = seconds < 300;
  return (
    <div style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 16px",borderRadius:12,
      background:low?"#fef2f2":"#f0fdf4",color:low?"#dc2626":"#16a34a",
      fontWeight:600,fontSize:15,fontFamily:"'JetBrains Mono',monospace",
      border:`1.5px solid ${low?"#fecaca":"#bbf7d0"}`,animation:low?"pulse 1s infinite":"none" }}>
      <ClockIcon/>{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STUDENT APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function StudentApp({ onLogout, submissions, onAddSubmission }) {
  const [studentName, setStudentName] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [view, setView] = useState("dashboard"); // dashboard | exam
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const exam = EXAM_DATA;

  const mySubmissions = submissions.filter(s => s.studentName === studentName);
  const hasSubmitted = mySubmissions.length > 0;
  const gradedSub = mySubmissions.find(s => s.status === "graded");

  // Name entry
  if (!nameSet) {
    return (
      <div style={{ minHeight:"100vh",background:"linear-gradient(180deg,#eff6ff,#dbeafe)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:20 }}>
        <style>{GLOBAL_CSS}</style>
        <div style={{ background:"white",borderRadius:24,padding:40,maxWidth:420,width:"100%",boxShadow:"0 4px 24px rgba(37,99,235,.1)",animation:"fadeIn .4s ease",textAlign:"center" }}>
          <div style={{ width:56,height:56,borderRadius:16,margin:"0 auto 20px",background:"linear-gradient(135deg,#2563eb,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",color:"white" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <h2 style={{ fontSize:24,fontWeight:700,color:"#1e3a5f",marginBottom:8,fontFamily:"'Playfair Display',serif" }}>Student Login</h2>
          <p style={{ color:"#64748b",fontSize:15,marginBottom:28 }}>Enter your full name to begin</p>
          <input type="text" value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Your full name" autoFocus
            style={{ width:"100%",padding:"14px 18px",borderRadius:14,border:"2px solid #bfdbfe",fontSize:16,outline:"none",marginBottom:20,boxSizing:"border-box" }}
            onFocus={e=>e.target.style.borderColor="#2563eb"} onBlur={e=>e.target.style.borderColor="#bfdbfe"}
            onKeyDown={e=>{ if(e.key==="Enter"&&studentName.trim()) setNameSet(true) }} />
          <button onClick={()=>{ if(studentName.trim()) setNameSet(true) }} disabled={!studentName.trim()}
            style={{ width:"100%",padding:14,borderRadius:14,border:"none",background:studentName.trim()?"linear-gradient(135deg,#2563eb,#3b82f6)":"#e2e8f0",color:studentName.trim()?"white":"#94a3b8",fontSize:16,fontWeight:600,cursor:studentName.trim()?"pointer":"default",marginBottom:12 }}>
            Continue
          </button>
          <button onClick={onLogout} style={{ width:"100%",padding:12,borderRadius:14,border:"1px solid #e2e8f0",background:"white",color:"#64748b",fontSize:14,fontWeight:500,cursor:"pointer" }}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    const unanswered = exam.questions.length - Object.keys(answers).filter(k=>answers[k]?.trim()).length;
    if (unanswered > 0 && !confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
    onAddSubmission({
      id: `sub-${Date.now()}`,
      examId: exam.id,
      studentName,
      submittedAt: new Date().toISOString(),
      status: "pending",
      answers: { ...answers },
      grades: {},
      feedback: {},
      overallFeedback: "",
      totalScore: null,
    });
    setAnswers({});
    setCurrentQ(0);
    setJustSubmitted(true);
    setView("dashboard");
    setTimeout(() => setJustSubmitted(false), 4000);
  };

  // ── Exam View ──
  if (view === "exam" && !hasSubmitted) {
    const q = exam.questions[currentQ];
    const answeredCount = Object.keys(answers).filter(k=>answers[k]?.trim()).length;
    const progress = (answeredCount / exam.questions.length) * 100;

    return (
      <div style={{ minHeight:"100vh",background:"#eff6ff",fontFamily:"'DM Sans',sans-serif" }}>
        <style>{GLOBAL_CSS}</style>
        <div style={{ background:"white",borderBottom:"1px solid #bfdbfe",padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#2563eb,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",color:"white" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <span style={{ fontSize:17,fontWeight:700,color:"#1e3a5f",fontFamily:"'Playfair Display',serif" }}>Sunday School Quiz</span>
              <span style={{ fontSize:12,color:"#64748b",display:"block",marginTop:-2 }}>YAYA Class</span>
            </div>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ fontSize:14,color:"#1e3a5f",fontWeight:500 }}>{studentName}</span>
            <span style={{ padding:"5px 14px",borderRadius:10,fontSize:13,fontWeight:600,background:"#dbeafe",color:"#2563eb" }}>Student</span>
          </div>
        </div>

        <div style={{ padding:"32px 24px",maxWidth:800,margin:"0 auto",animation:"fadeIn .4s ease" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12 }}>
            <div>
              <button onClick={()=>setView("dashboard")} style={{ background:"none",border:"none",color:"#64748b",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontSize:14,marginBottom:4 }}><ArrowLeft/> Back to Dashboard</button>
              <h2 style={{ fontSize:22,fontWeight:700,color:"#1e3a5f",fontFamily:"'Playfair Display',serif" }}>{exam.title}</h2>
              <p style={{ color:"#64748b",fontSize:13 }}>{exam.date} — {exam.subject}</p>
            </div>
            <Timer duration={exam.duration} onTimeUp={handleSubmit}/>
          </div>

          <div style={{ marginBottom:24 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13,color:"#64748b" }}>
              <span>{answeredCount} of {exam.questions.length} answered</span><span>{Math.round(progress)}%</span>
            </div>
            <div style={{ height:6,background:"#dbeafe",borderRadius:99,overflow:"hidden" }}>
              <div style={{ height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#2563eb,#3b82f6)",borderRadius:99,transition:"width .4s ease" }}/>
            </div>
          </div>

          <div style={{ display:"flex",gap:5,marginBottom:24,flexWrap:"wrap" }}>
            {exam.questions.map((question,i)=>(
              <button key={question.id} onClick={()=>setCurrentQ(i)} style={{
                minWidth:36,height:34,padding:"0 8px",borderRadius:8,border:"none",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .2s",
                background:currentQ===i?"#1e3a5f":answers[question.id]?.trim()?"#bfdbfe":"#f1f5f9",
                color:currentQ===i?"white":answers[question.id]?.trim()?"#1e40af":"#94a3b8",
              }}>{questionLabel(question.id)}</button>
            ))}
          </div>

          <div style={{ background:"white",borderRadius:20,padding:32,border:"1px solid #bfdbfe",boxShadow:"0 4px 24px rgba(0,0,0,.04)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <span style={{ padding:"4px 14px",borderRadius:8,fontSize:13,fontWeight:700,background:"#dbeafe",color:"#1e40af" }}>{questionFullLabel(q.id)}</span>
              <span style={{ fontSize:14,fontWeight:600,color:"#2563eb" }}>{q.marks} marks</span>
            </div>
            <p style={{ fontSize:17,fontWeight:600,color:"#1e3a5f",lineHeight:1.7,marginBottom:24 }}>{q.text}</p>
            <textarea value={answers[q.id]||""} onChange={e=>setAnswers(prev=>({...prev,[q.id]:e.target.value}))}
              placeholder="Type your answer here..."
              style={{ width:"100%",minHeight:180,padding:16,borderRadius:14,border:"2px solid #dbeafe",fontSize:15,lineHeight:1.7,resize:"vertical",fontFamily:"inherit",outline:"none",transition:"border-color .2s",boxSizing:"border-box" }}
              onFocus={e=>e.target.style.borderColor="#2563eb"} onBlur={e=>e.target.style.borderColor="#dbeafe"} />
          </div>

          <div style={{ display:"flex",justifyContent:"space-between",marginTop:24 }}>
            <button onClick={()=>setCurrentQ(Math.max(0,currentQ-1))} disabled={currentQ===0} style={{
              padding:"12px 24px",borderRadius:12,border:"1px solid #dbeafe",background:"white",
              color:currentQ===0?"#cbd5e1":"#334155",fontSize:15,fontWeight:600,cursor:currentQ===0?"default":"pointer",
            }}>Previous</button>
            {currentQ===exam.questions.length-1?(
              <button onClick={handleSubmit} style={{ padding:"12px 32px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#2563eb,#3b82f6)",color:"white",fontSize:15,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8 }}><SendIcon/> Submit Exam</button>
            ):(
              <button onClick={()=>setCurrentQ(Math.min(exam.questions.length-1,currentQ+1))} style={{ padding:"12px 24px",borderRadius:12,border:"none",background:"#1e3a5f",color:"white",fontSize:15,fontWeight:600,cursor:"pointer" }}>Next</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Student Dashboard ──
  return (
    <div style={{ minHeight:"100vh",background:"#eff6ff",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ background:"white",borderBottom:"1px solid #bfdbfe",padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#2563eb,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",color:"white" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <span style={{ fontSize:17,fontWeight:700,color:"#1e3a5f",fontFamily:"'Playfair Display',serif" }}>Sunday School Quiz</span>
            <span style={{ fontSize:12,color:"#64748b",display:"block",marginTop:-2 }}>YAYA Class</span>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ fontSize:14,color:"#1e3a5f",fontWeight:500 }}>{studentName}</span>
          <span style={{ padding:"5px 14px",borderRadius:10,fontSize:13,fontWeight:600,background:"#dbeafe",color:"#2563eb" }}>Student</span>
          <button onClick={onLogout} style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:10,border:"1px solid #bfdbfe",background:"white",color:"#64748b",fontSize:13,cursor:"pointer" }}><LogOutIcon/> Logout</button>
        </div>
      </div>

      <div style={{ padding:"32px 24px",maxWidth:800,margin:"0 auto",animation:"fadeIn .4s ease" }}>
        <h2 style={{ fontSize:26,fontWeight:700,color:"#1e3a5f",marginBottom:4,fontFamily:"'Playfair Display',serif" }}>Welcome, {studentName}</h2>
        <p style={{ color:"#64748b",fontSize:15,marginBottom:32 }}>Your examination dashboard</p>

        {/* Success toast */}
        {justSubmitted && (
          <div style={{
            background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:16,padding:"16px 24px",marginBottom:24,
            display:"flex",alignItems:"center",gap:12,animation:"fadeIn .4s ease",
          }}>
            <div style={{ width:36,height:36,borderRadius:"50%",background:"#10b981",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div style={{ fontWeight:700,color:"#16a34a",fontSize:15 }}>Exam Submitted Successfully!</div>
              <div style={{ color:"#15803d",fontSize:13 }}>Your answers have been recorded. Your teacher will review and grade your submission.</div>
            </div>
          </div>
        )}

        {/* Exam card */}
        <div style={{
          background:"white",borderRadius:20,padding:32,border:"1px solid #bfdbfe",
          boxShadow:"0 2px 12px rgba(37,99,235,.05)",
        }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16 }}>
            <div>
              <div style={{ padding:"4px 12px",borderRadius:8,fontSize:12,fontWeight:600,display:"inline-block",marginBottom:12,background:"#dbeafe",color:"#2563eb" }}>{exam.subject}</div>
              <h3 style={{ fontSize:20,fontWeight:700,color:"#1e3a5f",marginBottom:8 }}>{exam.title}</h3>
              <p style={{ color:"#64748b",fontSize:14,marginBottom:12 }}>{exam.date}</p>
              <div style={{ display:"flex",gap:20,color:"#64748b",fontSize:13 }}>
                <span style={{ display:"flex",alignItems:"center",gap:4 }}><ClockIcon/> {exam.duration} min</span>
                <span>{exam.questions.length} questions</span>
                <span>{exam.totalMarks} marks</span>
              </div>
            </div>

            {hasSubmitted ? (
              <div style={{ textAlign:"center" }}>
                {gradedSub ? (
                  <div style={{ padding:"16px 24px",borderRadius:16,background:"#f0fdf4",border:"1px solid #bbf7d0" }}>
                    <div style={{ fontSize:28,fontWeight:800,color:"#16a34a",fontFamily:"'JetBrains Mono',monospace" }}>
                      {gradedSub.totalScore}/{exam.totalMarks}
                    </div>
                    <div style={{ fontSize:12,color:"#16a34a",fontWeight:600,marginTop:2 }}>Graded</div>
                    <div style={{ fontSize:12,color:"#15803d",marginTop:4 }}>
                      {Math.round((gradedSub.totalScore / exam.totalMarks) * 100)}%
                    </div>
                  </div>
                ) : (
                  <div style={{ padding:"16px 24px",borderRadius:16,background:"#fefce8",border:"1px solid #fde68a" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                      <div style={{ width:10,height:10,borderRadius:"50%",background:"#f59e0b",animation:"pulse 2s infinite" }}/>
                      <span style={{ fontSize:15,fontWeight:700,color:"#92400e" }}>Submitted</span>
                    </div>
                    <div style={{ fontSize:13,color:"#a16207" }}>Awaiting teacher's grade</div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={()=>setView("exam")} style={{
                padding:"14px 32px",borderRadius:14,border:"none",
                background:"linear-gradient(135deg,#2563eb,#3b82f6)",color:"white",
                fontSize:16,fontWeight:600,cursor:"pointer",
                boxShadow:"0 4px 16px rgba(37,99,235,.3)",
              }}>Start Quiz</button>
            )}
          </div>

          {/* Show graded feedback if available */}
          {gradedSub && gradedSub.overallFeedback && (
            <div style={{ marginTop:20,padding:16,borderRadius:14,background:"#f8fafc",borderLeft:"4px solid #2563eb" }}>
              <div style={{ fontSize:12,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".05em",marginBottom:6 }}>Teacher's Feedback</div>
              <p style={{ fontSize:14,color:"#334155",lineHeight:1.6 }}>{gradedSub.overallFeedback}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TEACHER APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function TeacherApp({ onLogout, submissions, onUpdateSubmission }) {
  const [selectedSub, setSelectedSub] = useState(null);
  const exam = EXAM_DATA;

  if (selectedSub) {
    // Keep selectedSub in sync with latest from submissions
    const latest = submissions.find(s => s.id === selectedSub.id) || selectedSub;
    return <TeacherGradingView
      submission={latest} exam={exam}
      onSave={updated => { onUpdateSubmission(updated); setSelectedSub(updated); }}
      onBack={()=>setSelectedSub(null)} onLogout={onLogout}
    />;
  }

  const pending = submissions.filter(s=>s.status==="pending").length;
  const graded = submissions.filter(s=>s.status==="graded").length;
  const inProgress = submissions.filter(s=>s.status==="in_progress").length;

  return (
    <div style={{ minHeight:"100vh",background:"#fefce8",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ background:"white",borderBottom:"1px solid #fde68a",padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#92400e,#d97706)",display:"flex",alignItems:"center",justifyContent:"center",color:"white" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <span style={{ fontSize:17,fontWeight:700,color:"#78350f",fontFamily:"'Playfair Display',serif" }}>Sunday School Quiz</span>
            <span style={{ fontSize:12,color:"#a16207",display:"block",marginTop:-2 }}>YAYA Class — Teacher Panel</span>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ padding:"5px 14px",borderRadius:10,fontSize:13,fontWeight:600,background:"#fef3c7",color:"#92400e" }}>Teacher</span>
          <button onClick={onLogout} style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:10,border:"1px solid #fde68a",background:"white",color:"#92400e",fontSize:13,cursor:"pointer" }}><LogOutIcon/> Logout</button>
        </div>
      </div>

      <div style={{ padding:"32px 24px",maxWidth:1000,margin:"0 auto",animation:"fadeIn .4s ease" }}>
        <h2 style={{ fontSize:26,fontWeight:700,color:"#78350f",marginBottom:4,fontFamily:"'Playfair Display',serif" }}>Submissions</h2>
        <p style={{ color:"#a16207",fontSize:15,marginBottom:32 }}>Review and grade student quiz submissions</p>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:16,marginBottom:32 }}>
          {[
            {label:"Total",value:submissions.length,color:"#d97706",bg:"#fffbeb"},
            {label:"Pending",value:pending,color:"#ea580c",bg:"#fff7ed"},
            {label:"In Progress",value:inProgress,color:"#ca8a04",bg:"#fefce8"},
            {label:"Graded",value:graded,color:"#16a34a",bg:"#f0fdf4"},
          ].map(st=>(
            <div key={st.label} style={{ background:st.bg,borderRadius:16,padding:20,border:`1px solid ${st.color}22` }}>
              <div style={{ fontSize:28,fontWeight:800,color:st.color,fontFamily:"'JetBrains Mono',monospace" }}>{st.value}</div>
              <div style={{ fontSize:13,color:"#64748b",fontWeight:500,marginTop:2 }}>{st.label}</div>
            </div>
          ))}
        </div>

        {submissions.length === 0 ? (
          <div style={{ background:"white",borderRadius:20,padding:"48px 32px",border:"1px solid #fde68a",textAlign:"center" }}>
            <div style={{ fontSize:48,marginBottom:16 }}>📭</div>
            <h3 style={{ fontSize:18,fontWeight:700,color:"#78350f",marginBottom:8 }}>No submissions yet</h3>
            <p style={{ color:"#a16207",fontSize:15 }}>Student submissions will appear here once they complete the quiz.</p>
          </div>
        ) : (
          <div style={{ background:"white",borderRadius:20,overflow:"hidden",border:"1px solid #fde68a" }}>
            <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 100px",padding:"14px 24px",borderBottom:"1px solid #fde68a",fontSize:12,fontWeight:700,color:"#92400e",textTransform:"uppercase",letterSpacing:".05em" }}>
              <span>Student</span><span>Status</span><span>Score</span><span></span>
            </div>
            {submissions.map(sub=>(
              <div key={sub.id} className="sub-row" style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 100px",padding:"16px 24px",borderBottom:"1px solid #fefce8",alignItems:"center",transition:"background .2s" }}>
                <div>
                  <div style={{ fontWeight:600,color:"#78350f",fontSize:15 }}>{sub.studentName}</div>
                  <div style={{ color:"#a16207",fontSize:12 }}>{new Date(sub.submittedAt).toLocaleString()}</div>
                </div>
                <span style={{
                  padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:600,display:"inline-block",width:"fit-content",
                  background:sub.status==="graded"?"#f0fdf4":sub.status==="in_progress"?"#fefce8":"#fff7ed",
                  color:sub.status==="graded"?"#16a34a":sub.status==="in_progress"?"#ca8a04":"#ea580c",
                }}>{sub.status==="graded"?"Graded":sub.status==="in_progress"?"In Progress":"Pending"}</span>
                <span style={{ fontWeight:700,color:"#78350f",fontFamily:"'JetBrains Mono',monospace" }}>
                  {sub.totalScore!==null?`${sub.totalScore}/${exam.totalMarks}`:"—"}
                </span>
                <button onClick={()=>setSelectedSub(sub)} style={{
                  padding:"8px 16px",borderRadius:10,border:"none",
                  background:sub.status==="graded"?"#f1f5f9":"linear-gradient(135deg,#92400e,#d97706)",
                  color:sub.status==="graded"?"#64748b":"white",fontSize:13,fontWeight:600,cursor:"pointer",
                }}>{sub.status==="graded"?"Review":"Grade"}</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Teacher Grading Sub-view ──
function TeacherGradingView({ submission, exam, onSave, onBack, onLogout }) {
  const [grades, setGrades] = useState(submission.grades||{});
  const [feedback, setFeedback] = useState(submission.feedback||{});
  const [overallFeedback, setOverallFeedback] = useState(submission.overallFeedback||"");
  const [saved, setSaved] = useState(false);
  const [showAnswer, setShowAnswer] = useState({});

  const totalAwarded = Object.values(grades).reduce((s,v)=>s+(Number(v)||0),0);

  const handleSave = (publish) => {
    onSave({ ...submission, grades, feedback, overallFeedback, totalScore:totalAwarded, status:publish?"graded":"in_progress" });
    setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  };

  return (
    <div style={{ minHeight:"100vh",background:"#fefce8",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ background:"white",borderBottom:"1px solid #fde68a",padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#92400e,#d97706)",display:"flex",alignItems:"center",justifyContent:"center",color:"white" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <span style={{ fontSize:17,fontWeight:700,color:"#78350f",fontFamily:"'Playfair Display',serif" }}>Sunday School Quiz</span>
            <span style={{ fontSize:12,color:"#a16207",display:"block",marginTop:-2 }}>Grading — {submission.studentName}</span>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ padding:"5px 14px",borderRadius:10,fontSize:13,fontWeight:600,background:"#fef3c7",color:"#92400e" }}>Teacher</span>
          <button onClick={onLogout} style={{ display:"flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:10,border:"1px solid #fde68a",background:"white",color:"#92400e",fontSize:13,cursor:"pointer" }}><LogOutIcon/> Logout</button>
        </div>
      </div>

      <div style={{ padding:"32px 24px",maxWidth:880,margin:"0 auto" }}>
        <button onClick={onBack} style={{ background:"none",border:"none",color:"#92400e",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontSize:14,marginBottom:16 }}><ArrowLeft/> Back to Submissions</button>

        <div style={{ background:"linear-gradient(135deg,#78350f 0%,#92400e 50%,#b45309 100%)",borderRadius:20,padding:32,color:"white",marginBottom:32 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16 }}>
            <div>
              <h2 style={{ fontSize:24,fontWeight:700,marginBottom:4,fontFamily:"'Playfair Display',serif" }}>{exam.title}</h2>
              <p style={{ opacity:.8,fontSize:14,marginBottom:8 }}>{exam.date} — {exam.subject}</p>
              <div style={{ display:"flex",alignItems:"center",gap:8,opacity:.9,fontSize:15 }}><UserIcon/> {submission.studentName}</div>
              <p style={{ opacity:.6,fontSize:13,marginTop:6 }}>Submitted: {new Date(submission.submittedAt).toLocaleString()}</p>
            </div>
            <div style={{ background:"rgba(255,255,255,.18)",borderRadius:16,padding:"16px 28px",textAlign:"center",backdropFilter:"blur(10px)" }}>
              <div style={{ fontSize:34,fontWeight:800,fontFamily:"'JetBrains Mono',monospace" }}>{totalAwarded}<span style={{ fontSize:18,opacity:.6 }}>/{exam.totalMarks}</span></div>
              <div style={{ fontSize:12,opacity:.7,textTransform:"uppercase",letterSpacing:".1em" }}>Total Score</div>
              <div style={{ marginTop:8,fontSize:13,fontWeight:600,padding:"3px 12px",borderRadius:8,
                background:totalAwarded>=exam.totalMarks*.7?"rgba(16,185,129,.3)":totalAwarded>=exam.totalMarks*.5?"rgba(251,191,36,.3)":"rgba(239,68,68,.3)" }}>
                {Math.round((totalAwarded/exam.totalMarks)*100)}%
              </div>
            </div>
          </div>
        </div>

        {exam.questions.map((q,i)=>(
          <div key={q.id} style={{ background:"white",borderRadius:20,padding:28,marginBottom:16,border:"1px solid #e2e8f0",boxShadow:"0 2px 12px rgba(0,0,0,.03)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
              <span style={{ padding:"4px 12px",borderRadius:8,fontSize:12,fontWeight:700,background:"#fef3c7",color:"#92400e" }}>{questionFullLabel(q.id)}</span>
              <span style={{ fontSize:13,fontWeight:600,color:"#94a3b8" }}>Max: {q.marks} marks</span>
            </div>
            <p style={{ fontSize:16,fontWeight:600,color:"#1a1a2e",lineHeight:1.6,marginBottom:16 }}>{q.text}</p>

            <div style={{ background:"#f8fafc",borderRadius:14,padding:18,marginBottom:12,borderLeft:"4px solid #d97706" }}>
              <div style={{ fontSize:11,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".05em",marginBottom:8 }}>Student's Answer</div>
              <p style={{ fontSize:14,color:"#334155",lineHeight:1.7,whiteSpace:"pre-wrap" }}>
                {submission.answers[q.id]||<span style={{ color:"#cbd5e1",fontStyle:"italic" }}>No answer provided</span>}
              </p>
            </div>

            <div style={{ marginBottom:16 }}>
              <button onClick={()=>setShowAnswer(p=>({...p,[q.id]:!p[q.id]}))} style={{
                display:"flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:8,border:"1px solid #e2e8f0",
                background:showAnswer[q.id]?"#fef3c7":"white",color:"#92400e",fontSize:13,fontWeight:600,cursor:"pointer",
              }}><EyeIcon/> {showAnswer[q.id]?"Hide":"Show"} Expected Answer</button>
              {showAnswer[q.id]&&(
                <div style={{ background:"#fffbeb",borderRadius:14,padding:18,marginTop:10,borderLeft:"4px solid #f59e0b" }}>
                  <div style={{ fontSize:11,fontWeight:700,color:"#92400e",textTransform:"uppercase",letterSpacing:".05em",marginBottom:8 }}>Expected Answer</div>
                  <p style={{ fontSize:14,color:"#78350f",lineHeight:1.7,whiteSpace:"pre-wrap" }}>{q.answer}</p>
                </div>
              )}
            </div>

            <div style={{ display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap" }}>
              <div style={{ minWidth:120 }}>
                <label style={{ fontSize:12,fontWeight:700,color:"#64748b",display:"block",marginBottom:6 }}>SCORE</label>
                <div style={{ display:"flex",alignItems:"center",gap:4 }}>
                  <input type="number" min="0" max={q.marks} value={grades[q.id]??""} onChange={e=>{
                    const v=Math.min(q.marks,Math.max(0,Number(e.target.value)));
                    setGrades(p=>({...p,[q.id]:v}));
                  }} style={{ width:64,padding:"10px 12px",borderRadius:10,border:"2px solid #e2e8f0",fontSize:18,fontWeight:700,textAlign:"center",fontFamily:"'JetBrains Mono',monospace",outline:"none" }}
                    onFocus={e=>e.target.style.borderColor="#d97706"} onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
                  <span style={{ fontSize:16,color:"#94a3b8",fontWeight:600 }}>/ {q.marks}</span>
                </div>
              </div>
              <div style={{ flex:1,minWidth:200 }}>
                <label style={{ fontSize:12,fontWeight:700,color:"#64748b",display:"block",marginBottom:6 }}>FEEDBACK</label>
                <input type="text" value={feedback[q.id]||""} onChange={e=>setFeedback(p=>({...p,[q.id]:e.target.value}))}
                  placeholder="Add feedback for this question..."
                  style={{ width:"100%",padding:"10px 14px",borderRadius:10,border:"2px solid #e2e8f0",fontSize:14,outline:"none",boxSizing:"border-box" }}
                  onFocus={e=>e.target.style.borderColor="#d97706"} onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
              </div>
            </div>
          </div>
        ))}

        <div style={{ background:"white",borderRadius:20,padding:28,marginBottom:24,border:"1px solid #e2e8f0" }}>
          <label style={{ fontSize:14,fontWeight:700,color:"#1a1a2e",display:"block",marginBottom:10 }}>Overall Feedback</label>
          <textarea value={overallFeedback} onChange={e=>setOverallFeedback(e.target.value)}
            placeholder="Write overall feedback for the student..."
            style={{ width:"100%",minHeight:100,padding:16,borderRadius:14,border:"2px solid #e2e8f0",fontSize:15,lineHeight:1.7,resize:"vertical",fontFamily:"inherit",outline:"none",boxSizing:"border-box" }}
            onFocus={e=>e.target.style.borderColor="#d97706"} onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
        </div>

        <div style={{ display:"flex",gap:12,justifyContent:"flex-end",marginBottom:40 }}>
          <button onClick={()=>handleSave(false)} style={{ padding:"12px 24px",borderRadius:12,border:"1px solid #e2e8f0",background:"white",color:"#334155",fontSize:15,fontWeight:600,cursor:"pointer" }}>Save Draft</button>
          <button onClick={()=>handleSave(true)} style={{ padding:"12px 32px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#10b981,#059669)",color:"white",fontSize:15,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8 }}><CheckIcon/> Publish Grades</button>
        </div>

        {saved&&(
          <div style={{ position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:"#10b981",color:"white",padding:"12px 24px",borderRadius:12,fontWeight:600,fontSize:15,boxShadow:"0 8px 32px rgba(16,185,129,.3)",animation:"slideUp .3s ease",zIndex:100 }}>
            Grades saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ROOT — Shared submissions state + role routing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function ExamPortal() {
  const [screen, setScreen] = useState("home");
  const [teacherPw, setTeacherPw] = useState("");
  const [pwError, setPwError] = useState(false);

  // Shared submissions state — lives here so both sides see updates
  const [submissions, setSubmissions] = useState(SEED_SUBMISSIONS);

  const addSubmission = (sub) => setSubmissions(prev => [...prev, sub]);
  const updateSubmission = (updated) => setSubmissions(prev => prev.map(s => s.id === updated.id ? updated : s));

  if (screen === "student") {
    return <StudentApp
      onLogout={()=>setScreen("home")}
      submissions={submissions}
      onAddSubmission={addSubmission}
    />;
  }

  if (screen === "teacher") {
    return <TeacherApp
      onLogout={()=>setScreen("home")}
      submissions={submissions}
      onUpdateSubmission={updateSubmission}
    />;
  }

  // Teacher Login
  if (screen === "teacherLogin") {
    const handleLogin = () => {
      if (teacherPw === TEACHER_PASSWORD) { setScreen("teacher"); setTeacherPw(""); setPwError(false); }
      else setPwError(true);
    };
    return (
      <div style={{ minHeight:"100vh",background:"linear-gradient(180deg,#fffbeb 0%,#fef3c7 50%,#fde68a 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:20 }}>
        <style>{GLOBAL_CSS}</style>
        <div style={{ background:"white",borderRadius:24,padding:40,maxWidth:420,width:"100%",boxShadow:"0 4px 24px rgba(120,53,15,.1)",animation:"fadeIn .4s ease",textAlign:"center" }}>
          <div style={{ width:56,height:56,borderRadius:16,margin:"0 auto 20px",background:"linear-gradient(135deg,#92400e,#d97706)",display:"flex",alignItems:"center",justifyContent:"center",color:"white" }}>
            <LockIcon/>
          </div>
          <h2 style={{ fontSize:24,fontWeight:700,color:"#78350f",marginBottom:8,fontFamily:"'Playfair Display',serif" }}>Teacher Login</h2>
          <p style={{ color:"#a16207",fontSize:15,marginBottom:28 }}>Enter the teacher password to continue</p>
          <input type="password" value={teacherPw} onChange={e=>{setTeacherPw(e.target.value);setPwError(false)}}
            placeholder="Enter password" autoFocus
            style={{ width:"100%",padding:"14px 18px",borderRadius:14,border:`2px solid ${pwError?"#ef4444":"#fde68a"}`,fontSize:16,outline:"none",
              marginBottom:pwError?8:20,boxSizing:"border-box",transition:"border-color .2s",
              animation:pwError?"shake .4s ease":"none" }}
            onFocus={e=>e.target.style.borderColor=pwError?"#ef4444":"#d97706"}
            onBlur={e=>e.target.style.borderColor=pwError?"#ef4444":"#fde68a"}
            onKeyDown={e=>{if(e.key==="Enter")handleLogin()}} />
          {pwError&&<p style={{ color:"#ef4444",fontSize:14,fontWeight:600,marginBottom:16,textAlign:"left" }}>Incorrect password. Please try again.</p>}
          <button onClick={handleLogin} style={{ width:"100%",padding:14,borderRadius:14,border:"none",background:"linear-gradient(135deg,#92400e,#d97706)",color:"white",fontSize:16,fontWeight:600,cursor:"pointer",marginBottom:12 }}>Sign In</button>
          <button onClick={()=>{setScreen("home");setTeacherPw("");setPwError(false)}} style={{ width:"100%",padding:12,borderRadius:14,border:"1px solid #fde68a",background:"white",color:"#92400e",fontSize:14,fontWeight:600,cursor:"pointer" }}>← Back to Home</button>
        </div>
      </div>
    );
  }

  // ── Home Screen ──
  return (
    <div style={{ minHeight:"100vh",background:"linear-gradient(180deg,#fffbeb 0%,#fef3c7 50%,#fde68a 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",padding:20 }}>
      <style>{GLOBAL_CSS}</style>
      <div style={{ textAlign:"center",animation:"fadeIn .6s ease" }}>
        <div style={{ width:64,height:64,borderRadius:18,margin:"0 auto 20px",background:"linear-gradient(135deg,#92400e,#d97706)",display:"flex",alignItems:"center",justifyContent:"center",color:"white" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h1 style={{ fontSize:38,fontWeight:800,color:"#78350f",marginBottom:4,fontFamily:"'Playfair Display',serif" }}>Sunday School Quiz</h1>
        <p style={{ color:"#92400e",fontSize:16,marginBottom:8,fontWeight:500 }}>YAYA Class — Second Quarter</p>
        <p style={{ color:"#a16207",fontSize:14,marginBottom:48 }}>1st March 2026</p>

        <div style={{ display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center" }}>
          <div className="role-card" onClick={()=>setScreen("student")} style={{
            width:260,padding:36,borderRadius:24,background:"white",
            border:"1px solid #bfdbfe",cursor:"pointer",transition:"all .3s ease",
            boxShadow:"0 4px 24px rgba(37,99,235,.08)",
          }}>
            <div style={{ width:64,height:64,borderRadius:20,margin:"0 auto 20px",background:"linear-gradient(135deg,#dbeafe,#bfdbfe)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <h3 style={{ fontSize:20,fontWeight:700,color:"#1e3a5f",marginBottom:8 }}>Student</h3>
            <p style={{ color:"#64748b",fontSize:14,lineHeight:1.5 }}>Take the quiz and submit your answers</p>
          </div>

          <div className="role-card" onClick={()=>setScreen("teacherLogin")} style={{
            width:260,padding:36,borderRadius:24,background:"white",
            border:"1px solid #fde68a",cursor:"pointer",transition:"all .3s ease",
            boxShadow:"0 4px 24px rgba(120,53,15,.08)",
          }}>
            <div style={{ width:64,height:64,borderRadius:20,margin:"0 auto 20px",background:"linear-gradient(135deg,#fef3c7,#fde68a)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 style={{ fontSize:20,fontWeight:700,color:"#78350f",marginBottom:8 }}>Teacher</h3>
            <p style={{ color:"#a16207",fontSize:14,lineHeight:1.5 }}>Review and grade submissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
