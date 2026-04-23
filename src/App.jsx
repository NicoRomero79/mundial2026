import { useState, useEffect, useRef } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://upomuqwkiuzbfswcdfov.supabase.co',
  'sb_publishable_5Bwtoc-ZB5FFvRXOCRBqjA_I4_nYAP6'
);

// ── DATA ────────────────────────────────────────────────────────────────────
const GRUPOS = {
  A: { equipos: ["México 🇲🇽","Corea del Sur 🇰🇷","Sudáfrica 🇿🇦","Rep. Checa 🇨🇿"],
       partidos:[
         {id:"A1",f:1,e1:"México 🇲🇽",e2:"Sudáfrica 🇿🇦",fecha:"11 jun"},
         {id:"A2",f:1,e1:"Corea del Sur 🇰🇷",e2:"Rep. Checa 🇨🇿",fecha:"11 jun"},
         {id:"A3",f:2,e1:"Rep. Checa 🇨🇿",e2:"Sudáfrica 🇿🇦",fecha:"18 jun"},
         {id:"A4",f:2,e1:"México 🇲🇽",e2:"Corea del Sur 🇰🇷",fecha:"18 jun"},
         {id:"A5",f:3,e1:"Rep. Checa 🇨🇿",e2:"México 🇲🇽",fecha:"24 jun"},
         {id:"A6",f:3,e1:"Sudáfrica 🇿🇦",e2:"Corea del Sur 🇰🇷",fecha:"24 jun"},
       ]},
  B: { equipos: ["Canadá 🇨🇦","Suiza 🇨🇭","Qatar 🇶🇦","Bosnia-Herz. 🇧🇦"],
       partidos:[
         {id:"B1",f:1,e1:"Canadá 🇨🇦",e2:"Bosnia-Herz. 🇧🇦",fecha:"12 jun"},
         {id:"B2",f:1,e1:"Qatar 🇶🇦",e2:"Suiza 🇨🇭",fecha:"13 jun"},
         {id:"B3",f:2,e1:"Suiza 🇨🇭",e2:"Bosnia-Herz. 🇧🇦",fecha:"18 jun"},
         {id:"B4",f:2,e1:"Canadá 🇨🇦",e2:"Qatar 🇶🇦",fecha:"18 jun"},
         {id:"B5",f:3,e1:"Suiza 🇨🇭",e2:"Canadá 🇨🇦",fecha:"24 jun"},
         {id:"B6",f:3,e1:"Bosnia-Herz. 🇧🇦",e2:"Qatar 🇶🇦",fecha:"24 jun"},
       ]},
  C: { equipos: ["Brasil 🇧🇷","Marruecos 🇲🇦","Escocia 🏴󠁧󠁢󠁳󠁣󠁴󠁿","Haití 🇭🇹"],
       partidos:[
         {id:"C1",f:1,e1:"Brasil 🇧🇷",e2:"Marruecos 🇲🇦",fecha:"13 jun"},
         {id:"C2",f:1,e1:"Haití 🇭🇹",e2:"Escocia 🏴󠁧󠁢󠁳󠁣󠁴󠁿",fecha:"13 jun"},
         {id:"C3",f:2,e1:"Escocia 🏴󠁧󠁢󠁳󠁣󠁴󠁿",e2:"Marruecos 🇲🇦",fecha:"19 jun"},
         {id:"C4",f:2,e1:"Brasil 🇧🇷",e2:"Haití 🇭🇹",fecha:"19 jun"},
         {id:"C5",f:3,e1:"Escocia 🏴󠁧󠁢󠁳󠁣󠁴󠁿",e2:"Brasil 🇧🇷",fecha:"24 jun"},
         {id:"C6",f:3,e1:"Marruecos 🇲🇦",e2:"Haití 🇭🇹",fecha:"24 jun"},
       ]},
  D: { equipos: ["EE.UU. 🇺🇸","Australia 🇦🇺","Paraguay 🇵🇾","Turquía 🇹🇷"],
       partidos:[
         {id:"D1",f:1,e1:"EE.UU. 🇺🇸",e2:"Paraguay 🇵🇾",fecha:"12 jun"},
         {id:"D2",f:1,e1:"Australia 🇦🇺",e2:"Turquía 🇹🇷",fecha:"13 jun"},
         {id:"D3",f:2,e1:"Turquía 🇹🇷",e2:"Paraguay 🇵🇾",fecha:"19 jun"},
         {id:"D4",f:2,e1:"EE.UU. 🇺🇸",e2:"Australia 🇦🇺",fecha:"19 jun"},
         {id:"D5",f:3,e1:"Turquía 🇹🇷",e2:"EE.UU. 🇺🇸",fecha:"25 jun"},
         {id:"D6",f:3,e1:"Paraguay 🇵🇾",e2:"Australia 🇦🇺",fecha:"25 jun"},
       ]},
  E: { equipos: ["Alemania 🇩🇪","Ecuador 🇪🇨","Costa de Marfil 🇨🇮","Curazao 🇨🇼"],
       partidos:[
         {id:"E1",f:1,e1:"Alemania 🇩🇪",e2:"Curazao 🇨🇼",fecha:"14 jun"},
         {id:"E2",f:1,e1:"Costa de Marfil 🇨🇮",e2:"Ecuador 🇪🇨",fecha:"14 jun"},
         {id:"E3",f:2,e1:"Alemania 🇩🇪",e2:"Costa de Marfil 🇨🇮",fecha:"20 jun"},
         {id:"E4",f:2,e1:"Ecuador 🇪🇨",e2:"Curazao 🇨🇼",fecha:"20 jun"},
         {id:"E5",f:3,e1:"Ecuador 🇪🇨",e2:"Alemania 🇩🇪",fecha:"25 jun"},
         {id:"E6",f:3,e1:"Curazao 🇨🇼",e2:"Costa de Marfil 🇨🇮",fecha:"25 jun"},
       ]},
  F: { equipos: ["Países Bajos 🇳🇱","Japón 🇯🇵","Suecia 🇸🇪","Túnez 🇹🇳"],
       partidos:[
         {id:"F1",f:1,e1:"Países Bajos 🇳🇱",e2:"Japón 🇯🇵",fecha:"14 jun"},
         {id:"F2",f:1,e1:"Suecia 🇸🇪",e2:"Túnez 🇹🇳",fecha:"14 jun"},
         {id:"F3",f:2,e1:"Países Bajos 🇳🇱",e2:"Suecia 🇸🇪",fecha:"20 jun"},
         {id:"F4",f:2,e1:"Túnez 🇹🇳",e2:"Japón 🇯🇵",fecha:"20 jun"},
         {id:"F5",f:3,e1:"Japón 🇯🇵",e2:"Suecia 🇸🇪",fecha:"25 jun"},
         {id:"F6",f:3,e1:"Túnez 🇹🇳",e2:"Países Bajos 🇳🇱",fecha:"25 jun"},
       ]},
  G: { equipos: ["Bélgica 🇧🇪","Egipto 🇪🇬","Irán 🇮🇷","Nueva Zelanda 🇳🇿"],
       partidos:[
         {id:"G1",f:1,e1:"Bélgica 🇧🇪",e2:"Egipto 🇪🇬",fecha:"15 jun"},
         {id:"G2",f:1,e1:"Irán 🇮🇷",e2:"Nueva Zelanda 🇳🇿",fecha:"15 jun"},
         {id:"G3",f:2,e1:"Bélgica 🇧🇪",e2:"Irán 🇮🇷",fecha:"21 jun"},
         {id:"G4",f:2,e1:"Nueva Zelanda 🇳🇿",e2:"Egipto 🇪🇬",fecha:"21 jun"},
         {id:"G5",f:3,e1:"Egipto 🇪🇬",e2:"Irán 🇮🇷",fecha:"26 jun"},
         {id:"G6",f:3,e1:"Nueva Zelanda 🇳🇿",e2:"Bélgica 🇧🇪",fecha:"26 jun"},
       ]},
  H: { equipos: ["España 🇪🇸","Uruguay 🇺🇾","Arabia Saudita 🇸🇦","Cabo Verde 🇨🇻"],
       partidos:[
         {id:"H1",f:1,e1:"España 🇪🇸",e2:"Cabo Verde 🇨🇻",fecha:"15 jun"},
         {id:"H2",f:1,e1:"Arabia Saudita 🇸🇦",e2:"Uruguay 🇺🇾",fecha:"15 jun"},
         {id:"H3",f:2,e1:"España 🇪🇸",e2:"Arabia Saudita 🇸🇦",fecha:"21 jun"},
         {id:"H4",f:2,e1:"Cabo Verde 🇨🇻",e2:"Uruguay 🇺🇾",fecha:"21 jun"},
         {id:"H5",f:3,e1:"Arabia Saudita 🇸🇦",e2:"Uruguay 🇺🇾",fecha:"26 jun"},
         {id:"H6",f:3,e1:"Cabo Verde 🇨🇻",e2:"España 🇪🇸",fecha:"26 jun"},
       ]},
  I: { equipos: ["Francia 🇫🇷","Senegal 🇸🇳","Irak 🇮🇶","Noruega 🇳🇴"],
       partidos:[
         {id:"I1",f:1,e1:"Francia 🇫🇷",e2:"Senegal 🇸🇳",fecha:"15 jun"},
         {id:"I2",f:1,e1:"Irak 🇮🇶",e2:"Noruega 🇳🇴",fecha:"16 jun"},
         {id:"I3",f:2,e1:"Francia 🇫🇷",e2:"Irak 🇮🇶",fecha:"21 jun"},
         {id:"I4",f:2,e1:"Noruega 🇳🇴",e2:"Senegal 🇸🇳",fecha:"21 jun"},
         {id:"I5",f:3,e1:"Senegal 🇸🇳",e2:"Irak 🇮🇶",fecha:"26 jun"},
         {id:"I6",f:3,e1:"Noruega 🇳🇴",e2:"Francia 🇫🇷",fecha:"26 jun"},
       ]},
  J: { equipos: ["Argentina 🇦🇷","Argelia 🇩🇿","Austria 🇦🇹","Jordania 🇯🇴"],
       partidos:[
         {id:"J1",f:1,e1:"Argentina 🇦🇷",e2:"Argelia 🇩🇿",fecha:"16 jun"},
         {id:"J2",f:1,e1:"Austria 🇦🇹",e2:"Jordania 🇯🇴",fecha:"16 jun"},
         {id:"J3",f:2,e1:"Argentina 🇦🇷",e2:"Austria 🇦🇹",fecha:"22 jun"},
         {id:"J4",f:2,e1:"Jordania 🇯🇴",e2:"Argelia 🇩🇿",fecha:"22 jun"},
         {id:"J5",f:3,e1:"Argelia 🇩🇿",e2:"Austria 🇦🇹",fecha:"27 jun"},
         {id:"J6",f:3,e1:"Jordania 🇯🇴",e2:"Argentina 🇦🇷",fecha:"27 jun"},
       ]},
  K: { equipos: ["Portugal 🇵🇹","Colombia 🇨🇴","Uzbekistán 🇺🇿","RD Congo 🇨🇩"],
       partidos:[
         {id:"K1",f:1,e1:"Portugal 🇵🇹",e2:"RD Congo 🇨🇩",fecha:"17 jun"},
         {id:"K2",f:1,e1:"Uzbekistán 🇺🇿",e2:"Colombia 🇨🇴",fecha:"17 jun"},
         {id:"K3",f:2,e1:"Portugal 🇵🇹",e2:"Uzbekistán 🇺🇿",fecha:"23 jun"},
         {id:"K4",f:2,e1:"RD Congo 🇨🇩",e2:"Colombia 🇨🇴",fecha:"23 jun"},
         {id:"K5",f:3,e1:"Colombia 🇨🇴",e2:"Portugal 🇵🇹",fecha:"27 jun"},
         {id:"K6",f:3,e1:"RD Congo 🇨🇩",e2:"Uzbekistán 🇺🇿",fecha:"27 jun"},
       ]},
  L: { equipos: ["Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croacia 🇭🇷","Ghana 🇬🇭","Panamá 🇵🇦"],
       partidos:[
         {id:"L1",f:1,e1:"Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿",e2:"Croacia 🇭🇷",fecha:"17 jun"},
         {id:"L2",f:1,e1:"Ghana 🇬🇭",e2:"Panamá 🇵🇦",fecha:"17 jun"},
         {id:"L3",f:2,e1:"Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿",e2:"Ghana 🇬🇭",fecha:"23 jun"},
         {id:"L4",f:2,e1:"Panamá 🇵🇦",e2:"Croacia 🇭🇷",fecha:"23 jun"},
         {id:"L5",f:3,e1:"Croacia 🇭🇷",e2:"Ghana 🇬🇭",fecha:"27 jun"},
         {id:"L6",f:3,e1:"Panamá 🇵🇦",e2:"Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿",fecha:"27 jun"},
       ]},
};

const ALL_TEAMS = Object.values(GRUPOS).flatMap(g => g.equipos);

const STORAGE_KEY = "mundial2026_v4";

// ── HELPERS ────────────────────────────────────────────────────────────────
function initScores() {
  const s = {};
  Object.values(GRUPOS).forEach(g => g.partidos.forEach(p => { s[p.id] = {g1:"",g2:""}; }));
  return s;
}

function allScoresFilled(scores) {
  return Object.values(scores).every(sc => sc.g1 !== "" && sc.g2 !== "");
}

// Devuelve el resultado de un partido: "e1", "e2" o "empate"
function getGanador(g1, g2) {
  if (g1 > g2) return "e1";
  if (g2 > g1) return "e2";
  return "empate";
}

// Calcula puntos de quiniela para UN partido, dado el marcador real y el pronosticado
// bonus: 5 si es insignia, 3 si es caballo, 0 si ninguno
function ptsPartido(realG1, realG2, predG1, predG2, bonus) {
  if (realG1 === predG1 && realG2 === predG2) return 5 + bonus;  // exacto
  if (getGanador(realG1, realG2) === getGanador(predG1, predG2)) return 3 + bonus;  // ganador correcto
  return 0;
}

// Calcula puntos totales de un participante comparando sus scores vs scores reales
function calcPtsParticipante(selInsignia, selCaballo, scoresReales, scoresUsuario) {
  let total = 0;
  Object.values(GRUPOS).forEach(g => {
    g.partidos.forEach(p => {
      const real = scoresReales[p.id];
      const pred = scoresUsuario ? scoresUsuario[p.id] : null;
      if (!real || real.g1 === "" || real.g2 === "") return;
      if (!pred || pred.g1 === "" || pred.g2 === "") return;
      const rG1 = parseInt(real.g1), rG2 = parseInt(real.g2);
      const pG1 = parseInt(pred.g1), pG2 = parseInt(pred.g2);
      if (isNaN(rG1)||isNaN(rG2)||isNaN(pG1)||isNaN(pG2)) return;

      let bonus = 0;
      if (p.e1 === selInsignia || p.e2 === selInsignia) bonus = 5;
      else if (p.e1 === selCaballo || p.e2 === selCaballo) bonus = 3;

      total += ptsPartido(rG1, rG2, pG1, pG2, bonus);
    });
  });
  return total;
}


// ── CUSTOM SELECT CON BANDERAS ─────────────────────────────────────────────
function FlagSelect({ value, onChange, options, placeholder, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position:"relative", marginBottom:"10px" }}>
      <div
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          width:"100%", padding:"11px 14px", borderRadius:"10px", fontSize:"0.95rem",
          background:"rgba(255,255,255,0.07)", border:"1.5px solid rgba(255,255,255,0.18)",
          color: value ? "#fff" : "#94a3b8",
          cursor: disabled ? "not-allowed" : "pointer",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          opacity: disabled ? 0.5 : 1,
          userSelect:"none",
        }}
      >
        <span style={{fontSize:"1rem"}}>{value || placeholder}</span>
        <span style={{color:"#888", fontSize:"0.75rem"}}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{
          position:"absolute", top:"calc(100% + 4px)", left:0, right:0, zIndex:9999,
          background:"#0f172a", border:"1.5px solid rgba(255,255,255,0.15)",
          borderRadius:"10px", maxHeight:"220px", overflowY:"auto",
          boxShadow:"0 8px 32px rgba(0,0,0,0.5)",
        }}>
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding:"10px 14px", cursor:"pointer", fontSize:"0.95rem",
                background: value===opt ? "rgba(240,192,64,0.15)" : "transparent",
                color: value===opt ? "#f0c040" : "#eee",
                transition:"background 0.15s",
              }}
              onMouseEnter={e => { if(value!==opt) e.currentTarget.style.background="rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { if(value!==opt) e.currentTarget.style.background="transparent"; }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── SCORE INPUT ────────────────────────────────────────────────────────────
function ScoreInput({ value, onChange }) {
  return (
    <input
      type="number" min="0" max="20"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width:"46px", textAlign:"center", fontSize:"1.3rem", fontWeight:"700",
        background:"rgba(255,255,255,0.08)", border:"2px solid rgba(255,255,255,0.2)",
        borderRadius:"8px", color:"#fff", padding:"4px 2px",
        WebkitAppearance:"none", MozAppearance:"textfield",
      }}
    />
  );
}

function MatchCard({ partido, scores, onChange }) {
  const sc = scores[partido.id];
  const filled = sc.g1 !== "" && sc.g2 !== "";
  return (
    <div style={{
      background: filled ? "rgba(240,192,64,0.06)" : "rgba(255,255,255,0.04)",
      borderRadius:"12px", padding:"10px 12px", marginBottom:"8px",
      border: filled ? "1px solid rgba(240,192,64,0.25)" : "1px solid rgba(255,255,255,0.08)",
      display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap",
      transition:"all 0.2s",
    }}>
      <span style={{fontSize:"0.7rem", color:"#aaa", minWidth:"48px"}}>{partido.fecha}</span>
      <span style={{flex:1, fontSize:"0.82rem", textAlign:"right", fontWeight:"600"}}>{partido.e1}</span>
      <div style={{display:"flex", alignItems:"center", gap:"6px"}}>
        <ScoreInput value={sc.g1} onChange={v => onChange(partido.id,"g1",v)} />
        <span style={{color:"#f0c040", fontWeight:"900", fontSize:"1.1rem"}}>–</span>
        <ScoreInput value={sc.g2} onChange={v => onChange(partido.id,"g2",v)} />
      </div>
      <span style={{flex:1, fontSize:"0.82rem", fontWeight:"600"}}>{partido.e2}</span>
      {filled && <span style={{fontSize:"0.8rem"}}>✅</span>}
    </div>
  );
}

function TablaGrupo({ grupo, scores }) {
  const clasificacion = grupo.equipos.map(e => ({ e, ...calcPts(e, scores) }))
    .sort((a,b) => b.pts - a.pts || (b.gf-b.gc) - (a.gf-a.gc) || b.gf - a.gf);
  return (
    <div style={{fontSize:"0.75rem", marginTop:"10px"}}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 32px 32px 32px 32px 36px",
        gap:"2px", color:"#aaa", padding:"2px 4px", fontWeight:"600"}}>
        <span>Sel.</span>
        <span style={{textAlign:"center"}}>PJ</span>
        <span style={{textAlign:"center"}}>GF</span>
        <span style={{textAlign:"center"}}>GC</span>
        <span style={{textAlign:"center"}}>DG</span>
        <span style={{textAlign:"center",color:"#f0c040"}}>Pts</span>
      </div>
      {clasificacion.map((row,i) => (
        <div key={row.e} style={{display:"grid", gridTemplateColumns:"1fr 32px 32px 32px 32px 36px",
          gap:"2px", padding:"3px 4px", borderRadius:"6px",
          background: i<2 ? "rgba(240,192,64,0.08)" : "transparent",
          borderLeft: i<2 ? "3px solid #f0c040" : "3px solid transparent"}}>
          <span style={{fontWeight:"600", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{row.e}</span>
          <span style={{textAlign:"center"}}>{row.pj}</span>
          <span style={{textAlign:"center"}}>{row.gf}</span>
          <span style={{textAlign:"center"}}>{row.gc}</span>
          <span style={{textAlign:"center"}}>{row.gf-row.gc}</span>
          <span style={{textAlign:"center", fontWeight:"800", color:"#f0c040"}}>{row.pts}</span>
        </div>
      ))}
    </div>
  );
}

// ── PROGRESO DE MARCADORES ─────────────────────────────────────────────────
function ProgresoMarcadores({ scores }) {
  const total = Object.keys(scores).length;
  const llenos = Object.values(scores).filter(sc => sc.g1 !== "" && sc.g2 !== "").length;
  const pct = Math.round((llenos / total) * 100);
  return (
    <div style={{marginBottom:"16px"}}>
      <div style={{display:"flex", justifyContent:"space-between", fontSize:"0.75rem", color:"#aaa", marginBottom:"4px"}}>
        <span>Partidos completados</span>
        <span style={{color:"#f0c040", fontWeight:"700"}}>{llenos}/{total}</span>
      </div>
      <div style={{height:"6px", background:"rgba(255,255,255,0.08)", borderRadius:"4px", overflow:"hidden"}}>
        <div style={{height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#f0c040,#d4a800)",
          borderRadius:"4px", transition:"width 0.4s ease"}} />
      </div>
    </div>
  );
}

// ── PÁGINA: REGISTRO ───────────────────────────────────────────────────────
function PaginaRegistro({ onRegistrado, onVerRanking }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sel1, setSel1] = useState("");
  const [sel2, setSel2] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState("registro");

  const inputStyle = {
    width:"100%", padding:"10px 12px", borderRadius:"10px", fontSize:"0.9rem",
    background:"rgba(255,255,255,0.07)", border:"1.5px solid rgba(255,255,255,0.15)",
    color:"#fff", marginBottom:"10px", boxSizing:"border-box", outline:"none",
  };

  async function registrar() {
  if (!nombre.trim() || !telefono || !sel1 || !sel2) {
    setMsg("⚠️ Llena todos los campos"); return;
  }

  if (sel1 === sel2) {
    setMsg("⚠️ Elige dos selecciones diferentes"); return;
  }

  setLoading(true);

  // 🔴 VALIDAR SI YA EXISTE
  const { data: existente } = await supabase
    .from('predicciones')
    .select('id')
    .eq('nombre', nombre.trim())
    .single();

  if (existente) {
    setLoading(false);
    setMsg("⚠️ Este nombre de usuario ya está registrado");
    return;
  }

  // INSERT
  const { error } = await supabase.from('predicciones').insert([{
    nombre: nombre.trim(),
    telefono,
    seleccion1: sel1,
    seleccion2: sel2,
    insignia: sel1,
    caballo: sel2,
  }]);

  setLoading(false);

  if (error) {
    setMsg("❌ Error: " + error.message);
  } else {
    onRegistrado({ nombre: nombre.trim(), telefono, sel1, sel2 });
  }
 }

async function iniciarSesion() {
  if (!nombre.trim()) { setMsg("⚠️ Ingresa tu nombre"); return; }
  setLoading(true);
  const { data, error } = await supabase
    .from('predicciones')
    .select('*')
    .eq('nombre', nombre.trim())
    .single();
  setLoading(false);
  if (error || !data) { setMsg("⚠️ Usuario no encontrado"); return; }

  // Si ya tiene scores guardados, va directo al ranking
  // Si no, va a completar marcadores
  const tieneScores = data.scores && Object.keys(data.scores).length > 0;
  onRegistrado(
    { nombre: data.nombre, telefono: data.telefono, sel1: data.seleccion1, sel2: data.seleccion2 },
    tieneScores  // true = va a ranking, false = va a marcadores
  );
}

  return (
    <div style={{padding:"16px", maxWidth:"500px", margin:"0 auto"}}>
      <h2 style={{color:"#f0c040", marginTop:0, fontSize:"1.1rem"}}>📝 Registrar participante</h2>

      <div style={{display:"flex", gap:"8px", marginBottom:"16px"}}>
        <button onClick={() => setModo("registro")} style={{
          flex:1, padding:"9px", borderRadius:"9px", border:"none",
          background: modo==="registro" ? "#f0c040" : "rgba(255,255,255,0.07)",
          color: modo==="registro" ? "#111" : "#aaa",
          fontWeight:"700", cursor:"pointer"
        }}>Registrarse</button>
        
        <button onClick={() => setModo("login")} style={{
          flex:1, padding:"9px", borderRadius:"9px", border:"none",
          background: modo==="login" ? "#f0c040" : "rgba(255,255,255,0.07)",
          color: modo==="login" ? "#111" : "#aaa",
          fontWeight:"700", cursor:"pointer"
        }}>Ya tengo usuario</button>
     </div>

      <label style={{fontSize:"0.78rem", color:"#aaa", marginBottom:"4px", display:"block"}}>Nombre</label>
      <input style={inputStyle} placeholder="Tu nombre…" value={nombre} onChange={e=>setNombre(e.target.value)} />
      

{modo === "registro" ? (
  <>
    <label style={{fontSize:"0.78rem", color:"#aaa", marginBottom:"4px", display:"block"}}>Teléfono</label>
    <input style={inputStyle} placeholder="Tu número…" value={telefono} onChange={e=>setTelefono(e.target.value)} />

    <label style={{fontSize:"0.78rem", color:"#aaa", marginBottom:"4px", display:"block"}}>Insignia (selección principal)</label>
    <FlagSelect value={sel1} onChange={setSel1} options={ALL_TEAMS} placeholder="Elige una selección…" />

    <label style={{fontSize:"0.78rem", color:"#aaa", marginBottom:"4px", display:"block"}}>Caballo (segunda selección)</label>
    <FlagSelect value={sel2} onChange={v => setSel2(v)} options={ALL_TEAMS.filter(t => t !== sel1)} placeholder="Elige otra selección…" disabled={!sel1} />

    {msg && (
      <div style={{
        padding:"10px", borderRadius:"8px", marginBottom:"10px", fontWeight:"600",
        background: msg.startsWith("✅") ? "rgba(80,200,120,0.15)" : "rgba(255,80,80,0.15)",
        color: msg.startsWith("✅") ? "#6fd99a" : "#ff8080",
      }}>{msg}</div>
    )}

    <button onClick={registrar} disabled={loading} style={{
      width:"100%", padding:"14px", borderRadius:"12px", border:"none",
      background: loading ? "#666" : "linear-gradient(90deg,#f0c040,#d4a800)",
      color:"#111", fontWeight:"900", fontSize:"1rem", cursor: loading ? "not-allowed" : "pointer",
      boxShadow:"0 4px 20px rgba(240,192,64,0.3)", marginBottom:"12px",
    }}>
      {loading ? "Guardando…" : "REGISTRAR ⚽"}
    </button>
  </>
) : (
  <>
    {msg && (
      <div style={{
        padding:"10px", borderRadius:"8px", marginBottom:"10px", fontWeight:"600",
        background: msg.startsWith("✅") ? "rgba(80,200,120,0.15)" : "rgba(255,80,80,0.15)",
        color: msg.startsWith("✅") ? "#6fd99a" : "#ff8080",
      }}>{msg}</div>
    )}

    <button onClick={iniciarSesion} disabled={loading} style={{
      width:"100%", padding:"14px", borderRadius:"12px", border:"none",
      background: loading ? "#666" : "linear-gradient(90deg,#f0c040,#d4a800)",
      color:"#111", fontWeight:"900", fontSize:"1rem", cursor: loading ? "not-allowed" : "pointer",
      boxShadow:"0 4px 20px rgba(240,192,64,0.3)", marginBottom:"12px",
    }}>
      {loading ? "Buscando…" : "ENTRAR ⚽"}
    </button>
  </>
)}

      
      <button
        onClick={onVerRanking}
        style={{
          width:"100%", padding:"11px", borderRadius:"12px",
          border:"1.5px solid rgba(240,192,64,0.35)",
          background:"rgba(240,192,64,0.07)", color:"#f0c040",
          fontWeight:"700", fontSize:"0.9rem", cursor:"pointer",
        }}
      >
        🏆 Ver ranking actual
      </button>
    </div>
  );
}

// ── PÁGINA: MARCADORES ─────────────────────────────────────────────────────
function PaginaMarcadores({ participante, scores, onScoreChange, onFinalizar }) {
  const [grupoActivo, setGrupoActivo] = useState("A");
  const [verTabla, setVerTabla] = useState(false);
  const listo = allScoresFilled(scores);

  return (
    <div style={{padding:"16px", maxWidth:"600px", margin:"0 auto"}}>
      {/* Bienvenida al participante */}
      <div style={{
        background:"rgba(240,192,64,0.1)", borderRadius:"12px",
        padding:"12px 16px", marginBottom:"16px",
        border:"1px solid rgba(240,192,64,0.25)",
      }}>
        <div style={{fontSize:"0.78rem", color:"#aaa"}}>Registrado como</div>
        <div style={{fontWeight:"800", fontSize:"1rem", color:"#fff"}}>{participante.nombre}</div>
        <div style={{fontSize:"0.8rem", color:"#aaa", marginTop:"2px"}}>
          🏅 {participante.sel1} &nbsp;·&nbsp; 🐴 {participante.sel2}
        </div>
      </div>

      <h2 style={{color:"#f0c040", marginTop:0, fontSize:"1.1rem"}}>⚽ Ingresar marcadores</h2>

      <ProgresoMarcadores scores={scores} />

      {/* Selector de grupo */}
      <div style={{display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"16px"}}>
        {Object.keys(GRUPOS).map(g => (
          <button key={g} onClick={() => setGrupoActivo(g)} style={{
            padding:"7px 14px", borderRadius:"8px", border:"2px solid",
            borderColor: grupoActivo===g ? "#f0c040" : "rgba(255,255,255,0.15)",
            background: grupoActivo===g ? "rgba(240,192,64,0.15)" : "rgba(255,255,255,0.05)",
            color: grupoActivo===g ? "#f0c040" : "#ccc",
            fontWeight:"700", cursor:"pointer", fontSize:"0.85rem",
          }}>Grupo {g}</button>
        ))}
      </div>

      {/* Partidos */}
      {[1,2,3].map(fecha => (
        <div key={fecha}>
          <div style={{fontSize:"0.75rem", color:"#888", marginBottom:"6px", marginTop:"12px",
            fontWeight:"700", textTransform:"uppercase", letterSpacing:"1px"}}>
            Fecha {fecha}
          </div>
          {GRUPOS[grupoActivo].partidos.filter(p => p.f===fecha).map(p => (
            <MatchCard key={p.id} partido={p} scores={scores} onChange={onScoreChange} />
          ))}
        </div>
      ))}

      {/* Toggle tabla */}
      <button onClick={() => setVerTabla(v => !v)} style={{
        width:"100%", marginTop:"16px", padding:"10px", borderRadius:"10px",
        border:"1.5px solid rgba(240,192,64,0.3)", background:"rgba(240,192,64,0.06)",
        color:"#f0c040", fontWeight:"700", cursor:"pointer", fontSize:"0.85rem",
      }}>{verTabla ? "▲ Ocultar tabla" : "▼ Ver tabla del grupo"}</button>

      {verTabla && <TablaGrupo grupo={GRUPOS[grupoActivo]} scores={scores} />}

      {/* Botón Finalizar */}
      <div style={{marginTop:"24px", paddingTop:"16px", borderTop:"1px solid rgba(255,255,255,0.08)"}}>
        {!listo && (
          <div style={{fontSize:"0.78rem", color:"#888", textAlign:"center", marginBottom:"8px"}}>
            Completa todos los marcadores para finalizar
          </div>
        )}
        <button
          onClick={listo ? onFinalizar : undefined}
          disabled={!listo}
          style={{
            width:"100%", padding:"15px", borderRadius:"12px", border:"none",
            background: listo
              ? "linear-gradient(90deg,#22c55e,#16a34a)"
              : "rgba(255,255,255,0.08)",
            color: listo ? "#fff" : "#555",
            fontWeight:"900", fontSize:"1rem",
            cursor: listo ? "pointer" : "not-allowed",
            boxShadow: listo ? "0 4px 20px rgba(34,197,94,0.35)" : "none",
            transition:"all 0.3s",
          }}
        >
          {listo ? "✅ FINALIZAR Y VER RANKING" : "🔒 FINALIZAR (faltan marcadores)"}
        </button>
      </div>
    </div>
  );
}

// ── PÁGINA: RANKING ────────────────────────────────────────────────────────
function PaginaRanking({ scores, nombreActual }) {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data, error } = await supabase.from('predicciones').select('*');
      if (!error && data) setParticipantes(data);
      setLoading(false);
    }
    cargar();
  }, []);

  const ranking = participantes
    .map(p => ({...p, total: calcPtsParticipante(p.seleccion1, p.seleccion2, scores, p.scores)}))
    .sort((a,b) => b.total - a.total);

  const medals = ["🥇","🥈","🥉"];

  return (
    <div style={{padding:"16px", maxWidth:"600px", margin:"0 auto"}}>
      <h2 style={{color:"#f0c040", marginTop:0, fontSize:"1.1rem"}}>🏆 Ranking de participantes</h2>

      {nombreActual && (
        <div style={{
          background:"rgba(34,197,94,0.12)", borderRadius:"10px",
          padding:"10px 14px", marginBottom:"16px",
          border:"1px solid rgba(34,197,94,0.3)",
          fontSize:"0.85rem", color:"#86efac",
          fontWeight:"600",
        }}>
          ✅ Registro completado para <strong>{nombreActual}</strong>
        </div>
      )}

      {loading && (
        <div style={{textAlign:"center", color:"#666", padding:"40px 0"}}>
          <div style={{fontSize:"2rem"}}>⏳</div>
          <div>Cargando ranking…</div>
        </div>
      )}

      {!loading && ranking.length === 0 && (
        <div style={{textAlign:"center", color:"#666", padding:"40px 0"}}>
          <div style={{fontSize:"3rem"}}>📭</div>
          <div>No hay participantes aún</div>
        </div>
      )}

      {ranking.map((p,i) => {
        const pts1 = calcPtsParticipante(p.seleccion1, null, scores, p.scores);
        const pts2 = calcPtsParticipante(null, p.seleccion2, scores, p.scores);
        const esTuyo = p.nombre === nombreActual;
        return (
          <div key={p.id || p.nombre} style={{
            background: esTuyo
              ? "linear-gradient(90deg,rgba(34,197,94,0.12),rgba(34,197,94,0.04))"
              : i===0
                ? "linear-gradient(90deg,rgba(240,192,64,0.15),rgba(240,192,64,0.05))"
                : "rgba(255,255,255,0.04)",
            borderRadius:"14px", padding:"14px", marginBottom:"10px",
            border: esTuyo
              ? "1px solid rgba(34,197,94,0.4)"
              : i===0
                ? "1px solid rgba(240,192,64,0.4)"
                : "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
              <span style={{fontSize:"1.6rem"}}>{medals[i] || `#${i+1}`}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:"800", fontSize:"1rem"}}>
                  {p.nombre} {esTuyo && <span style={{fontSize:"0.7rem", color:"#86efac"}}>(tú)</span>}
                </div>
                <div style={{fontSize:"0.72rem", color:"#888"}}>
                  🏅 {p.seleccion1} &nbsp;·&nbsp; 🐴 {p.seleccion2}
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:"1.6rem", fontWeight:"900", color:"#f0c040", lineHeight:1}}>{p.total}</div>
                <div style={{fontSize:"0.65rem", color:"#888"}}>puntos</div>
              </div>
            </div>
            <div style={{display:"flex", gap:"8px", marginTop:"10px"}}>
              {[{s:p.seleccion1, st:pts1},{s:p.seleccion2, st:pts2}].map(({s,st},j) => (
  <div key={j} style={{
    flex:1, background:"rgba(0,0,0,0.25)", borderRadius:"8px", padding:"8px",
  }}>
    <div style={{fontSize:"0.78rem", fontWeight:"700", marginBottom:"4px"}}>{s}</div>
    <div style={{fontSize:"0.7rem", color:"#f0c040", fontWeight:"700"}}>Pts {st}</div>
  </div>
))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── APP PRINCIPAL ──────────────────────────────────────────────────────────
export default function App() {
  // "registro" | "marcadores" | "ranking"
  const [pagina, setPagina] = useState("registro");
  const [participanteActual, setParticipanteActual] = useState(null);
  const [scoresReales, setScoresReales] = useState({});

useEffect(() => {
  async function cargarReales() {
    const { data } = await supabase.from('marcadores_reales').select('*');
    if (data) {
      const obj = {};
      data.forEach(row => { obj[row.id] = { g1: row.g1, g2: row.g2 }; });
      setScoresReales(obj);
    }
  }
  cargarReales();
}, []);
  const [scores, setScores] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY+".scores") || "null");
      return s || initScores();
    } catch { return initScores(); }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY+".scores", JSON.stringify(scores));
  }, [scores]);

  function updateScore(pid, campo, val) {
    setScores(prev => ({...prev, [pid]: {...prev[pid], [campo]: val}}));
  }

  function handleRegistrado(participante, esLogin) {
  setParticipanteActual(participante);
  setPagina(esLogin ? "ranking" : "marcadores");
}

  async function handleFinalizar() {
  if (!participanteActual) return;

  const { error } = await supabase
    .from('predicciones')
    .update({
      scores: scores
    })
    .eq('nombre', participanteActual.nombre);

  if (error) {
    alert("Error guardando marcadores" + error.message);
    return;
  }

  setPagina("ranking");
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#0a0f1e 0%,#0d1f3c 40%,#0a1628 100%)",
      color:"#eee", fontFamily:"'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji','Segoe UI',system-ui,sans-serif", overflowX:"hidden",
    }}>
      {/* HEADER */}
      <div style={{
        textAlign:"center", padding:"24px 16px 12px",
        background:"linear-gradient(180deg,rgba(240,192,64,0.08) 0%,transparent 100%)",
      }}>
        <div style={{fontSize:"2.4rem"}}>⚽🏆⚽</div>
        <h1 style={{margin:"4px 0 2px", fontSize:"1.5rem", fontWeight:"900",
          background:"linear-gradient(90deg,#f0c040,#fff,#f0c040)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
          MUNDIAL 2026
        </h1>
        <p style={{margin:0, color:"#aaa", fontSize:"0.8rem"}}>Pronósticos · Fase de Grupos</p>
      </div>

      {/* BREADCRUMB / indicador de página */}
      <div style={{
        display:"flex", justifyContent:"center", gap:"8px",
        padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,0.08)",
        fontSize:"0.78rem",
      }}>
        {[
          {key:"registro", label:"📝 Registro"},
          {key:"marcadores", label:"⚽ Marcadores"},
          {key:"ranking", label:"🏆 Ranking"},
        ].map(({key, label}, i) => (
          <div key={key} style={{display:"flex", alignItems:"center", gap:"8px"}}>
            {i > 0 && <span style={{color:"#444"}}>›</span>}
            <span style={{
              fontWeight:"700",
              color: pagina===key ? "#f0c040" : "#444",
              borderBottom: pagina===key ? "2px solid #f0c040" : "2px solid transparent",
              paddingBottom:"2px",
            }}>{label}</span>
          </div>
        ))}
      </div>

      {/* PÁGINAS */}
      {pagina === "registro" && (
        <PaginaRegistro
          onRegistrado={handleRegistrado}
          onVerRanking={() => setPagina("ranking")}
        />
      )}

      {pagina === "marcadores" && (
        <PaginaMarcadores
          participante={participanteActual}
          scores={scores}
          onScoreChange={updateScore}
          onFinalizar={handleFinalizar}
        />
      )}

      {pagina === "ranking" && (
        <PaginaRanking
          scores={scoresReales}
            nombreActual={participanteActual?.nombre}
        />
      )}

      <div style={{textAlign:"center", padding:"20px", color:"#444", fontSize:"0.7rem"}}>
        Mundial 2026 · 11 jun – 19 jul · 🇲🇽🇺🇸🇨🇦
      </div>
    </div>
  );
}
