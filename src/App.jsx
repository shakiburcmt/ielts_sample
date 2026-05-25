import { useEffect, useState } from "react";

const VALID_EMAIL = "rhrobin11022000@gmail.com";
const VALID_PASSWORD = "77889900";

// To update the downloaded PDF, replace this base64 string with the newly generated PDF containing the correct scores and date.
const TRF_PDF_B64 = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YxIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKMyAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMiAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0Jhc2VGb250IC9UaW1lcy1Cb2xkIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMyAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0NvbnRlbnRzIDkgMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NiA4NDEuODg5OCBdIC9QYXJlbnQgOCAwIFIgL1Jlc291cmNlcyA8PAovRXh0R1N0YXRlIDw8Ci9nUkxzMCA8PAovQ0EgLjQKPj4gL2dSTHMxIDw8Ci9DQSAuMwo+Pgo+PiAvRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNiAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDggMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9BdXRob3IgKFwoYW5vbnltb3VzXCkpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA1MjUxMDE5NDYrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA1MjUxMDE5NDYrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKFwoYW5vbnltb3VzXCkpIC9UcmFwcGVkIC9GYWxzZQo+PgplbmRvYmoKOCAwIG9iago8PAovQ291bnQgMSAvS2lkcyBbIDUgMCBSIF0gL1R5cGUgL1BhZ2VzCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDMwMTQKPj4Kc3RyZWFtCkdhdS9aOFVLMk1wOSViUkEjPFVlP21DdW9dSmYxO0VAXClcOS5tUlNiQThITzZXLU1TbilvNik1dTk8Z2ciKylLRCI2Y0ttPEJSISw0SXRjaG00JWFWYzM2WE9zOCZxb0gka1wiZSZibU1zOUg/LEhOYFxMJmk/bTtHM2xgWW8nViU7LGApYkFKLTo5XytaLWYwbnVOJidKTSlMcyhSLmNQIVcjKmB0XzVbIkBXMmM1ZlBpLlUsc2hCaylxSEsmZDNiLUxISDFmO2x1JEtSTnJeUSZTTW9xLilUNDwsVWg1cSRlaV9AIlhaJyc4SShaQ1F1cEIpbCFYIV4kXlMiXlZ1c0VeQXRvPyk3X3BmVTArXyQ5XmJKREJGb2E/OyJlYnVLYTtsXHJDLFsrKXAiJ1UuK3IjdC5tcEtJPFElMWsoTk80cmhPRC5MPThgMTw3LCciWllAaUBKYGRjZ2ImMnVzZUolWVRGQy9bbjpKK0IhXm5XPDhpImg2c2BbLz5hZ0JONkJsTjhubTNMSDA5WFEnMjRCQk9bISM/alNmL0Y0UE5iaytKKXMsSickTldhU2ZybUdPL0wobS9AZE8kMTgsZUMsYkFUOEgvdFhWPSYwVUMpLmY7V1NgISdLbHJ1KCN0OXB1Ol4/U2lHRCcvPSFrMXIlOjhBWlZNPSdRb2xJT1MkOi5aITkvZ0Q1Ykk2bXVgb3NtYEk2LFF1PTh0PkFSRW4xU0czMVg7S1lBUVQnJFZnWGplIjZpKkJWMDghT2dDTkFeUlNTODduNElALUdQUikvZ2YwcjYmVGM6J0QpQmkoWmM4QyNyXC1xR206QVA2a2I5XiZubSw+XCE1ZyxlVGhsMjgqbTZBS3UvRjwkJEohXkA3byorPyFVXTJEbmUmJnFoZEBrUW9bYVRYa0tUdF5jPiROLW8za2VkdTJzMFJVI2M+MVJYdVxTJnNpMVA0U28mJGRhb0olTVkySGRQK1R1XVhiZidBbSldNVZhWFd0alRAUWUyc1hWVDctRkFeWmEvbUhAUE0qbDg9MEBvJUdFOTM/OVtLM2UnRC9tMFVzdGRSOj1HYjtCKFQ7WjRiRXEvLW5HO0NRdTpgZjs6dTg+PzVFSCs3bDNuUVssaDtYRSVoNmtqQWFXJXNELzNyLVVVNS5BOHJqL2FkaS1mcFAnbihRNEBKVDYwYFxaY2ZBLSNsT2VjMixNXy0mJmk0UURrSllubE1JW1ErcGVNbmYwU2EpSzhNXUZSJ1RbKDVqMmFFY0whKk5tQVNiUWoqPHFgJUE4VGI3TSNkTzpYTyssWmliOD8pSj80NzBILmh0RzJLbDhjbVIkTi8zIyNbSUx0a283ODo2YUZxMEFZaExuNTZURVFLOCZCOVtlVWIzK2pWX0EwJUxJQmM/Xm4mQU0wVC5XWS1YZjJ0InBzcXM4SUZnX1ZKa1QlOFktS2k/UCdgZjA3NV43OjI0OV1KUFNsI2ReZ0csPWVjRWMvUjNhWSRlaU4sWVEoPGBeWTslIWc2ZzhiYUlLKm1HckFHS01uWXU7M3VCK1RFX2hrNlI2S3E9b1NzTG1fKz5rSFRCQCVjZFZtZ3BBci9eSi0vP2Q7SVtAL0E9WWBeVUFCI1RmZ04wOStJWkk3MVUzW1s7YlouVUBoaztTYD5oWmYhUDg2cSohSkoqbj1SVDA7MEdkWC5VXGFXSkkocjJLTippQEBrckZEUCc0WD9zLCpmJiY/JFNnYV5TRmtxWUxAJmA0bWRJUzQqNDBKTV5ASDVuZmNjVjZjIjMqcGpWbjVQPXRPWlpiIUteSUxsLypeLigxMjpYOV1LTjArKT1GRTEiWzRrXTtBQGstXk1QZTMuVjRub0wtIm89YiM+S0dsUyVsM1E7KihkW3NrWENAMmRWPkVDV3JkQ1QpZ2IsalY+SXJOQ2RoV1pPXU1BWHBpXSpQbyR1Y3RaR2gnK1FlP1JlZl9HUjlgOzNVM0FuKDRba0JfPC0xT0VBNlVaMlkmVDpXcVgqMXIxaGNyPFdaJVdMUCJQbChwW2tvQlo0WS1SLWlZJ2RSRWgzSEw5WWtcYi1yc2A2TjBjRlhwJS5mNylGM29vVyYkR1REXUg1N2poSnEoZzxycUhwZEMpVVVoaV0lSkNoI3RbMDlIWXBCN3B0LC9RLTc9LEdZPFRPWzppQStVKHUrJ2AsY1MuRFFpSWo0P0BmbWU2NzxmTHVBJV5yNVxcX1NbLSVMQ3EjYEdUOVYra1RUbVoxZCEkJW1QXVg0ImxlS2QiO3B1PktfTE5mOm1wTTFHKldyUWdjc0Y6Y2lIXD9GPz4kSl8uR1tIPzhwYFZeanM2TzArTXJEXl5AaktNTTsvbF4mPzFBNWNKUy4vOyowYEFnOjtvPWtKPCcnInBBIV1vJDE0KltHXm9ZUU9EJzIhUGZPSXFcMTsjXUJnYEZDXm9qKSguJmBWZlZMaHAwNHM2ZmtmSURFXThicCVRVz1rMmAlP3NoXGJhK0c7MSE9a1RUOj5Gaj1zPjotVDZnWl0hITVdIWdNYG5qKjJFO2YmaSFEcyI1LzxeXW00czRpcEgsKCRFXmQpRCNsI2JITmFwT25lZyN0SUlxYEU6USlgaWNZUlpLbD4/ZlhrWWFxX0g2L0VFTDJcMm4tYGNFOVdAPChdXm11b1VbMWJXND4kKlstZ1M2N0woaEFgJT0tT2whc2Feaz42M0I/REFTYThoYHUwNiJISi5nbkJSIWtKb0g4OUhzJnVYbF1XUDE6XF5zLj01QVdYdTA3L0Y1Ojk6MlU+RUFMJWcwbis9QXJHMlc7Wy07Zzdkc1hxTyIhOXQ2Lyc2Um1NTjltWClUZmQpNUElc3FaPjBQbjZUI0FvcTNHTmViSlZWZERMJW9uaFZsNm5DOCc2XDtRb1dTUjFqSF0rQj5FLlpMWUQiIko1NSk1ZGc7ZSZuVHJjOiovTS1PXUQ8WygtYlNKYlJLbjo8ZyJeI0ZbYyMvUls/ayFgW1dbVzlpbkYzWS4zK0s3bjltJFFrNSY7Ql5ROEFjQERCUlxoKm4iRXVhZTxjVV5qM1BDJHVIYlU5SSdQLjJHNFVybWNpR2UhLiYycVU+KGUoUnJTRio2MSE9VUxgRDNOaz1GVCppbHRnSFBFWTxKRkYqTj4qOFI0QjlKL1lHbHNvSlctQUZEPzNDSylkLEhXWWk3RGFSQktGW3JIUGdkWU5ZQkR1MCt1J2kpKkpUKlRPWWNiMlhQcGpWZUFjb2lTVmFUTkpyW2koa2Q4LUMyY047TnJ1PCRISyw4OT80VE8hSmdIUDdrTD5ybVpEI0xlW0JYISdHJGpjOz5EIUZiLT8qLFZdNDtQQioyazliWCl0NCNrKkhJXCctQk8hOyZaVnUsalNSRFNoOChxYkxLQkFOJE9HVyM2ZFZPMU4lJWAsKDAxdVA1bEJXVm4sdHRLbCU7RWlnRzJkbjJkO3IxWnBhX2IvYzVlaWMxOUUtJl5LazJmNkdKXF4iQitncV9MQHJTJkdMK09dO28/VD9ZZmlfOV5dc0Nwa2VAPV8+akxoOihDb09ac1ZMZ1Ipbk8zOCokYEs7NiQjYjA+Nk1NbUBBPXAlPiY0JzwnLFYoNnIlMVdGW0tfJ0NjQVxsbClbJy90WURJb21DSkVBPDBDXDpDbWoyWWZlPjU8Jy03ViVcQ3QzRnExSyMvVF1QKmlyKVZiJEd0VFtNUDZESk0/U1w1N29WYStVOFViRyZKYXUuZ0xvQmZmJiMyLkthWkIvQW0qK0FIIWJsTSROcUpyTS5ZdWpoLSdDKyg+NCo/cHRfc1VNbmY0b0U0XzNSJVgxNjgvdEpOaWxhPkRvP0QtUlJOaDEmalBqI2omPTEoX0VpND9CUFw1Zl9wcSVsVCRANUU9ZmB1L3JeUDhhLVMsbHV1bzRlTm5WQktYM05RXFpNclZtdSsvbzJkOD1yJ2wqPGhvYWhCW0ZCXC9TI2loJSh1KEtgTUtiJSFkWElnWDJaT2NwJic7aElcY34+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAxMTIgMDAwMDAgbiAKMDAwMDAwMDIxOSAwMDAwMCBuIAowMDAwMDAwMzMxIDAwMDAwIG4gCjAwMDAwMDA0MzkgMDAwMDAgbiAKMDAwMDAwMDY5OSAwMDAwMCBuIAowMDAwMDAwNzY3IDAwMDAwIG4gCjAwMDAwMDEwNDcgMDAwMDAgbiAKMDAwMDAwMTEwNiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzwzYjAwYzAzNTE5MWFkM2JmODRmM2YxN2RmM2FhZDNjZj48M2IwMGMwMzUxOTFhZDNiZjg0ZjNmMTdkZjNhYWQzY2Y+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAob3BlbnNvdXJjZSkKCi9JbmZvIDcgMCBSCi9Sb290IDYgMCBSCi9TaXplIDEwCj4+CnN0YXJ0eHJlZgo0MjExCiUlRU9GCg==";

const CANDIDATE = {
  nameUpper: "MD. RAKIBUL HASAN ROBIN",
  center: "British Council Dhaka",
  testDate: "24 May 2026",
  testType: "Academic",
  reference: "A3-BD001-A-14816662",
  trf: "26BD507946KHAS001A",
  scores: { listening: 7.5, reading: 6.5, writing: 7.0, speaking: 6.5, overall: 7 },
};

const bandDescriptor = (score) => {
  if (score >= 8.5) return { label: "Expert User", desc: "The test taker has fully operational command of the language. Their use of English is appropriate, accurate and fluent, and shows complete understanding." };
  if (score >= 8.0) return { label: "Very Good User", desc: "The test taker has fully operational command of the language with only occasional unsystematic inaccuracies and inappropriate usage. They may misunderstand some things in unfamiliar situations." };
  if (score >= 7.0) return { label: "Good User", desc: "The test taker has operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. They generally handle complex language well and understand detailed reasoning." };
  if (score >= 6.0) return { label: "Competent User", desc: "The test taker has an effective command of the language despite some inaccuracies, inappropriate usage and misunderstandings. They can use and understand fairly complex language, particularly in familiar situations." };
  return { label: "Modest User", desc: "The test taker has a partial command of the language and copes with overall meaning in most situations, though is likely to make many mistakes." };
};

const skillExplanations = {
  listening: "Test takers at Band 7.5 can typically follow extended speech and understand detailed instructions to complete tasks, including some involving complex ideas. They can identify ideas, attitudes, opinions or purposes which are implied by the speaker but not directly stated. They can easily understand meaning, including references within and between sentences, without having to process individual words and structures. They can understand a wide range of vocabulary, including some idiomatic, technical, and academic language, even when the language and ideas are complex.",
  reading: "Test takers at Band 6.5 can read and understand a variety of texts. They can identify the main ideas and some specific information. They demonstrate understanding of meaning, opinion and purpose and show some awareness of text structure and cohesion.",
  writing: "Test takers at Band 7 can typically address all parts of the task. They present a clear position throughout the response. They logically organise information and ideas and there is a clear progression throughout. They use a range of cohesive devices appropriately. They use a sufficient range of vocabulary to allow some flexibility and precision. They use a variety of complex structures and produce frequent error-free sentences.",
  speaking: "Test takers at Band 6.5 speak at length without noticeable effort or loss of coherence. They may demonstrate some hesitation but this is usually while searching for language rather than ideas. They use a range of connectives and discourse markers with some flexibility.",
};

// ─── helpers ───────────────────────────────────────────────
function downloadTRF() {
  try {
    const bin = atob(TRF_PDF_B64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    const blob = new Blob([arr], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "IELTS_TRF_Md_Rakibul_Hasan_Robin.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch(e) {
    alert("Download failed: " + e.message);
  }
}

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", zIndex:9999, minWidth:300, maxWidth:"90vw" }}>
      <div style={{
        display:"flex", alignItems:"center", gap:12, padding:"14px 20px",
        borderRadius:8, background: type==="error"?"#c7002b":"#2e7d32",
        color:"white", fontSize:14, fontWeight:500, boxShadow:"0 4px 24px rgba(0,0,0,0.25)"
      }}>
        <span style={{fontSize:18}}>{type==="error"?"✕":"✓"}</span>
        <span style={{flex:1}}>{message}</span>
        <button onClick={onClose} style={{background:"none",border:"none",color:"white",fontSize:20,cursor:"pointer",opacity:.8,lineHeight:1}}>×</button>
      </div>
    </div>
  );
}

function BCLogo() {
  return (
    <div style={{display:"flex",alignItems:"center"}}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="11" cy="11" r="9" fill="white"/>
        <circle cx="33" cy="11" r="9" fill="white"/>
        <circle cx="11" cy="33" r="9" fill="white"/>
        <circle cx="33" cy="33" r="9" fill="white"/>
      </svg>
      <div style={{display:"flex",flexDirection:"column",lineHeight:1.1,marginRight:14}}>
        <span style={{color:"white",fontSize:11,fontWeight:700,letterSpacing:"0.12em"}}>BRITISH</span>
        <span style={{color:"white",fontSize:11,fontWeight:700,letterSpacing:"0.12em"}}>COUNCIL</span>
      </div>
      <div style={{width:1,height:30,background:"rgba(255,255,255,0.4)",marginRight:14}}/>
      <span style={{color:"white",fontSize:26,fontWeight:900,fontFamily:"Georgia,'Times New Roman',serif",letterSpacing:"-0.5px"}}>IELTS</span>
      <span style={{color:"white",fontSize:10,verticalAlign:"super",marginTop:-6,fontFamily:"Georgia,serif"}}>™</span>
    </div>
  );
}

// ─── MENU DRAWER ───────────────────────────────────────────
const MENU_LINKS = [
  { label:"Book a Test", href:"https://takeielts.britishcouncil.org/take-ielts/test-taker-portal", desc:"Find available test dates and centres" },
  { label:"One Skill Retake", href:"https://www.britishcouncil.org.bd/en/exam/ielts/one-skill-retake", desc:"Retake a single IELTS section" },
  { label:"Share My Results", href:"https://takeielts.britishcouncil.org/ielts-recognising-organisations", desc:"Share results with institutions" },
  { label:"IELTS Band Scores", href:"https://takeielts.britishcouncil.org/teach-ielts/test-information/assessment", desc:"Understand IELTS band descriptors" },
  { label:"Enquiry on Results (EOR)", href:"https://www.britishcouncil.org.bd/sites/default/files/bgl_ielts_enquiry_on_results_form.pdf", desc:"Request a review of your scores" },
  { label:"Help & Support", href:"https://www.britishcouncil.org/contact/complaints", desc:"Contact the British Council helpdesk" },
  { label:"British Council Home", href:"https://www.britishcouncil.org", desc:"Official British Council website" },
];

function MenuDrawer({ open, onClose }) {
  return (
    <>
      {open && <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:100}}/>}
      <div style={{
        position:"fixed",top:0,right:0,height:"100%",width:Math.min(320,window.innerWidth*0.88),
        background:"white",zIndex:101,
        transform: open?"translateX(0)":"translateX(100%)",
        transition:"transform 0.28s cubic-bezier(.4,0,.2,1)",
        display:"flex",flexDirection:"column",boxShadow:"-4px 0 24px rgba(0,0,0,0.18)"
      }}>
        {/* Drawer header */}
        <div style={{background:"#2d2366",padding:"18px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{color:"white",fontWeight:700,fontSize:17}}>Menu</span>
          <button onClick={onClose} style={{background:"none",border:"none",color:"white",fontSize:26,cursor:"pointer",lineHeight:1,opacity:.85}}>×</button>
        </div>
        {/* Links */}
        <div style={{flex:1,overflowY:"auto"}}>
          {MENU_LINKS.map((l,i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{display:"block",padding:"14px 20px",borderBottom:"1px solid #eef0f6",textDecoration:"none",
                background:"white",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#f0f4fb"}
              onMouseLeave={e=>e.currentTarget.style.background="white"}
            >
              <div style={{fontWeight:700,fontSize:15,color:"#2d2366",marginBottom:2}}>{l.label}</div>
              <div style={{fontSize:12,color:"#777"}}>{l.desc}</div>
            </a>
          ))}
        </div>
        {/* Drawer footer */}
        <div style={{padding:"14px 20px",background:"#f8f9fc",borderTop:"1px solid #e8edf3"}}>
          <p style={{fontSize:11,color:"#aaa",margin:0,textAlign:"center"}}>
            © {new Date().getFullYear()} British Council · <a href="https://www.britishcouncil.org.bd/en/privacy-terms" target="_blank" rel="noopener noreferrer" style={{color:"#2d2366"}}>Privacy & Terms</a>
          </p>
        </div>
      </div>
    </>
  );
}

// ─── LOGIN ──────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [eFocus, setEFocus] = useState(false);
  const [pFocus, setPFocus] = useState(false);

  const go = () => {
    if (!email || !password) { setToast({message:"Please enter your email and password.",type:"error"}); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.trim().toLowerCase()===VALID_EMAIL && password===VALID_PASSWORD) {
        localStorage.setItem("ieltsSession", JSON.stringify({ email, loggedIn: true }));
        onLogin();
      } else {
        setToast({message:"No result found. Please check your credentials and try again.",type:"error"});
      }
    }, 900);
  };

  return (
    <div style={{minHeight:"100vh",background:"#f0f4f8",display:"flex",flexDirection:"column"}}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)}/>}
      <div style={{height:6,background:"#c7002b"}}/>
      <header style={{background:"#2d2366",padding:"0 20px"}}>
        <div style={{maxWidth:600,margin:"0 auto",padding:"14px 0"}}><BCLogo/></div>
      </header>
      <main style={{flex:1,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"44px 16px 32px"}}>
        <div style={{width:"100%",maxWidth:560}}>
          <h1 style={{fontSize:30,fontWeight:900,color:"#1a1a4b",marginBottom:6,fontFamily:"Georgia,serif"}}>
            Let's check your details
          </h1>
          <div style={{width:44,height:4,background:"#2d2366",borderRadius:2,marginBottom:26}}/>
          <div style={{background:"#dde6f0",borderRadius:12,padding:14}}>
            <div style={{background:"white",borderRadius:8,padding:"24px 24px 28px"}}>
              <p style={{color:"#555",fontSize:15,marginBottom:22,lineHeight:1.6}}>
                You need an account to continue. Enter your email address to create an account or log in to your existing account.
              </p>
              <div style={{marginBottom:18}}>
                <label style={{display:"block",fontWeight:600,fontSize:14,color:"#333",marginBottom:6}}>E-mail address:</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&go()}
                  onFocus={()=>setEFocus(true)} onBlur={()=>setEFocus(false)}
                  placeholder="Enter your email"
                  style={{width:"100%",padding:"12px 14px",fontSize:15,borderRadius:6,boxSizing:"border-box",
                    border:eFocus?"2px solid #2d2366":"1.5px solid #ccc",
                    background:"#f4f7fb",outline:"none",color:"#222"}}/>
              </div>
              <div style={{marginBottom:26}}>
                <label style={{display:"block",fontWeight:600,fontSize:14,color:"#333",marginBottom:6}}>Password:</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&go()}
                  onFocus={()=>setPFocus(true)} onBlur={()=>setPFocus(false)}
                  placeholder="Enter your password"
                  style={{width:"100%",padding:"12px 14px",fontSize:15,borderRadius:6,boxSizing:"border-box",
                    border:pFocus?"2px solid #2d2366":"1.5px solid #ccc",
                    background:"#f4f7fb",outline:"none",color:"#222"}}/>
              </div>
              <button onClick={go} disabled={loading}
                style={{width:"100%",padding:14,borderRadius:50,background:loading?"#5565b0":"#2d2366",
                  color:"white",fontSize:16,fontWeight:700,border:"none",
                  cursor:loading?"not-allowed":"pointer",transition:"background 0.2s"}}>
                {loading
                  ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                      <svg style={{animation:"spin 1s linear infinite"}} width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                        <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      Checking...
                    </span>
                  : "Log in"}
              </button>
            </div>
          </div>
          <p style={{textAlign:"center",color:"#aaa",fontSize:12,marginTop:22}}>
            © {new Date().getFullYear()} British Council. All rights reserved.
          </p>
        </div>
      </main>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

// ─── SCORE ROW ──────────────────────────────────────────────
function ScoreRow({ icon, label, score }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"13px 18px",background:"white",borderRadius:10,
      border:"1px solid #e8edf3",marginBottom:8,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <span style={{color:"#c7002b",fontSize:20}}>{icon}</span>
        <span style={{fontSize:16,color:"#333"}}>{label}</span>
      </div>
      <span style={{fontSize:16,fontWeight:700,color:"#2d2366"}}>{score % 1===0 ? score+".0" : score}</span>
    </div>
  );
}

// ─── RESULT PAGE ────────────────────────────────────────────
function ResultPage({ onLogout }) {
  const { nameUpper, center, testDate, testType, reference, trf, scores } = CANDIDATE;
  const overall = scores.overall;
  const bd = bandDescriptor(overall);
  const [accordion, setAccordion] = useState(true);
  const [banner, setBanner] = useState(true);
  const [fullScores, setFullScores] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const skills = [
    { key:"listening", label:"Listening", icon:"🎧", score:scores.listening },
    { key:"reading",   label:"Reading",   icon:"📖", score:scores.reading },
    { key:"writing",   label:"Writing",   icon:"✏️", score:scores.writing },
    { key:"speaking",  label:"Speaking",  icon:"💬", score:scores.speaking },
  ];

  const Dots = () => (
    <div style={{display:"flex",flexDirection:"column",gap:4,cursor:"pointer"}} onClick={()=>setMenuOpen(true)}>
      {[0,1,2].map(i=><div key={i} style={{width:22,height:2.5,background:"white",borderRadius:2}}/>)}
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#f0f4f8",display:"flex",flexDirection:"column"}}>
      <MenuDrawer open={menuOpen} onClose={()=>setMenuOpen(false)}/>

      <div style={{height:6,background:"#c7002b"}}/>
      <header style={{background:"#2d2366",padding:"0 16px"}}>
        <div style={{maxWidth:640,margin:"0 auto",padding:"14px 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <BCLogo/>
          <button onClick={onLogout} style={{color:"white",background:"none",border:"1.5px solid rgba(255,255,255,0.5)",
            borderRadius:20,padding:"6px 16px",fontSize:13,fontWeight:600,cursor:"pointer"}}>
            Sign out
          </button>
        </div>
      </header>

      {/* Menu bar */}
      <div style={{background:"#2d2366",borderTop:"1px solid rgba(255,255,255,0.12)",padding:"0 16px"}}>
        <div style={{maxWidth:640,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 0"}}>
          <button onClick={()=>setMenuOpen(true)}
            style={{color:"white",fontWeight:700,fontSize:16,background:"none",border:"none",cursor:"pointer",padding:0}}>
            Menu
          </button>
          <Dots/>
        </div>
      </div>

      <main style={{flex:1,maxWidth:640,margin:"0 auto",width:"100%",padding:"0 16px 40px",boxSizing:"border-box"}}>

        {/* Heading */}
        <div style={{padding:"20px 0 14px"}}>
          <h1 style={{fontSize:22,fontWeight:800,color:"#1a1a4b",marginBottom:6}}>
            IELTS {testType}: {testDate}
          </h1>
          <p style={{color:"#333",fontSize:15,margin:"0 0 3px",fontWeight:500}}>{nameUpper}</p>
          <p style={{color:"#555",fontSize:14,margin:"0 0 3px"}}>{center}</p>
          <p style={{color:"#555",fontSize:14,margin:"0 0 3px"}}>Reference: {reference}</p>
          <p style={{color:"#555",fontSize:14,margin:0}}>TRF number: {trf}</p>
        </div>

        {/* Green banner */}
        {banner && (
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            background:"#e6f4ea",border:"1.5px solid #a8d5b0",borderRadius:8,padding:"12px 14px",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:"#2e7d32",
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{fontSize:15,color:"#1b5e20",fontWeight:500}}>Your results are now available.</span>
            </div>
            <button onClick={()=>setBanner(false)}
              style={{background:"none",border:"none",cursor:"pointer",color:"#555",fontSize:20,fontWeight:700,lineHeight:1}}>×</button>
          </div>
        )}

        {/* Results accordion pill */}
        <div style={{marginBottom:16}}>
          <button onClick={()=>setAccordion(!accordion)}
            style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
              padding:"14px 18px",background:"white",border:"2px solid #2d2366",borderRadius:30,
              cursor:"pointer",color:"#2d2366",fontWeight:700,fontSize:17}}>
            <span>Results</span>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
              style={{transform:accordion?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.28s"}}>
              <path d="M5 8l6 6 6-6" stroke="#2d2366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {accordion && (
            <div style={{background:"#e8eef6",borderRadius:"0 0 16px 16px",padding:"20px 16px 24px"}}>
              {/* Overall score */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:12}}>
                <p style={{fontWeight:800,fontSize:17,color:"#222",margin:0,lineHeight:1.35}}>
                  Your overall<br/>band score
                </p>
                {/* Green circle */}
                <div style={{position:"relative",width:82,height:82,flexShrink:0}}>
                  <svg width="82" height="82" viewBox="0 0 82 82">
                    <circle cx="41" cy="41" r="35" fill="none" stroke="#c8e6c9" strokeWidth="7"/>
                    <circle cx="41" cy="41" r="35" fill="none" stroke="#2e7d32" strokeWidth="7"
                      strokeDasharray={`${(overall/9)*219.9} ${219.9}`}
                      strokeLinecap="round" transform="rotate(-90 41 41)"/>
                    <text x="41" y="47" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1a1a4b" fontFamily="Georgia,serif">
                      {overall % 1===0 ? overall : overall.toFixed(1)}
                    </text>
                  </svg>
                </div>
                <button onClick={()=>setFullScores(!fullScores)}
                  style={{background:"none",border:"none",color:"#2d2366",fontSize:15,fontWeight:700,
                    cursor:"pointer",textDecoration:"underline",textAlign:"right",lineHeight:1.4,maxWidth:110}}>
                  View full scores and explanation
                </button>
              </div>
              {/* Description card */}
              <div style={{background:"white",borderRadius:12,padding:18,position:"relative",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                <div style={{position:"absolute",top:-10,left:"36%",
                  width:0,height:0,borderLeft:"12px solid transparent",borderRight:"12px solid transparent",borderBottom:"10px solid white"}}/>
                <p style={{fontWeight:700,fontSize:15,color:"#222",marginBottom:10}}>
                  This means you're a "{bd.label}"
                </p>
                <p style={{color:"#444",fontSize:14,lineHeight:1.7,margin:0}}>{bd.desc}</p>
              </div>
            </div>
          )}
        </div>

        {/* Dotted divider */}
        <div style={{borderTop:"2px dashed #c0ccd8",margin:"18px 0"}}/>

        {/* Got the score */}
        <div style={{background:"white",borderRadius:12,padding:"20px",marginBottom:0,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#2d2366",marginBottom:10}}>Got the score you needed?</h2>
          <p style={{color:"#555",fontSize:15,marginBottom:16,lineHeight:1.6}}>Here's what you can do now:</p>
          {/* Download TRF */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14,cursor:"pointer"}}
            onClick={downloadTRF}>
            <div style={{width:42,height:42,background:"#e8eef6",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2d2366" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </div>
            <span style={{color:"#2d2366",fontWeight:700,fontSize:15,textDecoration:"underline"}}>
              Download your Test Report Form
            </span>
          </div>
          {/* Share results */}
          <div style={{display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}
            onClick={()=>window.open("https://takeielts.britishcouncil.org/ielts-recognising-organisations","_blank","noopener")}>
            <div style={{width:42,height:42,background:"#e8eef6",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2d2366" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
              </svg>
            </div>
            <span style={{color:"#2d2366",fontWeight:700,fontSize:15,textDecoration:"underline"}}>
              Share results with organisations
            </span>
          </div>
        </div>

        <div style={{borderTop:"2px dashed #c0ccd8",margin:"18px 0"}}/>

        {/* Full scores */}
        {fullScores && (
          <>
            <h2 style={{fontSize:22,fontWeight:800,color:"#2d2366",marginBottom:14}}>Your full score and explanation</h2>
            {skills.map(s=><ScoreRow key={s.key} icon={s.icon} label={s.label} score={s.score}/>)}
            {/* Overall bold row */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
              padding:"14px 18px",background:"white",borderRadius:10,
              border:"1px solid #e8edf3",marginBottom:8,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
              <span style={{fontSize:16,fontWeight:800,color:"#222"}}>Your overall band score</span>
              <span style={{fontSize:17,fontWeight:800,color:"#2d2366"}}>{overall % 1===0 ? overall+".0" : overall.toFixed(1)}</span>
            </div>

            <div style={{borderTop:"2px dashed #c0ccd8",margin:"18px 0"}}/>
            <h3 style={{fontSize:17,fontWeight:800,color:"#222",marginBottom:14}}>Your scores explained:</h3>

            {skills.map(s=>(
              <div key={s.key} style={{marginBottom:18}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                  padding:"13px 18px",background:"white",borderRadius:10,
                  border:"1px solid #e8edf3",marginBottom:10,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <span style={{color:"#c7002b",fontSize:20}}>{s.icon}</span>
                    <span style={{fontSize:16,color:"#333"}}>{s.label}</span>
                  </div>
                  <span style={{fontSize:16,fontWeight:700,color:"#2d2366"}}>{s.score % 1===0 ? s.score+".0" : s.score}</span>
                </div>
                <p style={{color:"#444",fontSize:14,lineHeight:1.7,padding:"0 4px",margin:0}}>
                  {skillExplanations[s.key]}
                </p>
              </div>
            ))}

            <div style={{borderTop:"2px dashed #c0ccd8",margin:"18px 0"}}/>
          </>
        )}

        {/* Want to improve */}
        <div style={{background:"white",borderRadius:12,padding:"20px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#2d2366",marginBottom:10}}>Want to improve your score?</h2>
          <p style={{color:"#555",fontSize:15,marginBottom:16,lineHeight:1.6}}>
            If you're aiming for a higher band score, we offer options to help you achieve your goals:
          </p>
          <div style={{display:"flex",gap:14,marginBottom:16}}>
            <div style={{width:42,height:42,background:"#fce8e8",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c7002b" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <p style={{fontSize:15,lineHeight:1.65,margin:0,color:"#333"}}>
              <strong>One Skill Retake:</strong> Need to improve just one section of the test (Listening, Reading, or Writing)? You can resit a single skill within 60 days of your test.{" "}
              <a href="https://www.britishcouncil.org.bd/en/exam/ielts/one-skill-retake" target="_blank" rel="noopener noreferrer"
                style={{color:"#2d2366",fontWeight:700}}>Book here</a>
            </p>
          </div>
          <div style={{display:"flex",gap:14}}>
            <div style={{width:42,height:42,background:"#fce8e8",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c7002b" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
            <p style={{fontSize:15,lineHeight:1.65,margin:0,color:"#333"}}>
              <strong>Book a new test date:</strong> Ready to take the entire test again? You can{" "}
              <a href="https://takeielts.britishcouncil.org/take-ielts/test-taker-portal" target="_blank" rel="noopener noreferrer"
                style={{color:"#2d2366",fontWeight:700}}>book a new IELTS test here</a>.
            </p>
          </div>
        </div>

        <div style={{borderTop:"2px dashed #c0ccd8",margin:"18px 0"}}/>

        {/* Need to query */}
        <div style={{background:"white",borderRadius:12,padding:"20px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#2d2366",marginBottom:10}}>Need to query your results?</h2>
          <div style={{display:"flex",gap:14,marginBottom:16}}>
            <div style={{width:42,height:42,background:"#fce8e8",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#c7002b" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p style={{fontSize:15,color:"#444",lineHeight:1.65,margin:0}}>
              If you believe your scores need to be reviewed, you can submit an enquiry on your results (EOR) within 6 weeks of your test date.{" "}
              <a href="https://www.britishcouncil.org.bd/sites/default/files/bgl_ielts_enquiry_on_results_form.pdf" target="_blank" rel="noopener noreferrer"
                style={{color:"#2d2366",fontWeight:700,textDecoration:"underline"}}>Request here.</a>
            </p>
          </div>
          {/* Help link */}
          <div style={{background:"#f0f4fb",borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#2d2366" strokeWidth="2" style={{flexShrink:0}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <p style={{fontSize:14,color:"#333",margin:0}}>
              Need more help?{" "}
              <a href="https://www.britishcouncil.org.bd/en/about/contact" target="_blank" rel="noopener noreferrer"
                style={{color:"#2d2366",fontWeight:700,textDecoration:"underline"}}>
                Visit the British Council Help Centre
              </a>
            </p>
          </div>
        </div>

        {/* Thank you */}
        <div style={{padding:"22px 4px 8px"}}>
          <p style={{fontSize:16,color:"#333",marginBottom:4}}>Thank you,</p>
          <p style={{fontSize:17,fontWeight:800,color:"#222"}}>The IELTS team</p>
        </div>

        {/* Footer block */}
        <div style={{background:"#3d3d5c",borderRadius:10,padding:"20px"}}>
          <div style={{display:"flex",alignItems:"center",marginBottom:12}}>
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
              <circle cx="11" cy="11" r="9" fill="white"/><circle cx="33" cy="11" r="9" fill="white"/>
              <circle cx="11" cy="33" r="9" fill="white"/><circle cx="33" cy="33" r="9" fill="white"/>
            </svg>
            <div style={{display:"flex",flexDirection:"column",lineHeight:1.1,marginRight:12}}>
              <span style={{color:"white",fontSize:10,fontWeight:700,letterSpacing:"0.12em"}}>BRITISH</span>
              <span style={{color:"white",fontSize:10,fontWeight:700,letterSpacing:"0.12em"}}>COUNCIL</span>
            </div>
            <div style={{width:1,height:26,background:"rgba(255,255,255,0.3)",marginRight:12}}/>
            <span style={{color:"white",fontSize:22,fontWeight:900,fontFamily:"Georgia,serif"}}>IELTS™</span>
          </div>
          <p style={{color:"rgba(255,255,255,0.75)",fontSize:14,margin:"0 0 10px",lineHeight:1.5}}>
            British Council is a proud co-owner of IELTS.
          </p>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.18)",paddingTop:10}}>
            <p style={{color:"rgba(255,255,255,0.45)",fontSize:11,margin:0}}>
              © {new Date().getFullYear()} British Council ·{" "}
              <a href="https://www.britishcouncil.org.bd/en/privacy-terms" target="_blank" rel="noopener noreferrer"
                style={{color:"rgba(255,255,255,0.65)"}}>Privacy & Terms</a>{" · "}
            </p>
          </div>
        </div>
      </main>

      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

// ─── ROOT ───────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedSession = localStorage.getItem("ieltsSession");
    return savedSession ? !!JSON.parse(savedSession).loggedIn : false;
  });
  return loggedIn
    ? <ResultPage onLogout={() => {
        localStorage.removeItem("ieltsSession");
        setLoggedIn(false);
      }}/>
    : <LoginPage onLogin={()=>setLoggedIn(true)}/>;
}