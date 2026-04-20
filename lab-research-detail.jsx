const FUNDING_LOGOS = {"NSERC":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/nserc.jpg","CIHR":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/cihr_logo.jpg","CRC":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/crc.png","CFI":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/Innovation_Logo.png","NIH":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/banner-nihlogo.png"};

// Research detail pages — Breast Cancer Informatics rewrite + other areas

// ── SHARED PAPER CARD ─────────────────────────────────────────────────────────

const PaperCard = ({ paper }) => (
  <div style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: `1px solid ${BORDER}` }}>
    <div style={{ width: 4, background: PURPLE, flexShrink: 0, borderRadius: 2 }} />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, lineHeight: 1.4, fontFamily: "'EB Garamond', Georgia, serif", marginBottom: 3 }}>{paper.title}</div>
      <div style={{ fontSize: 12, color: MUTED, marginBottom: 4, lineHeight: 1.5 }}>{paper.authors}</div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: MUTED, fontStyle: 'italic' }}>{paper.journal}{paper.year ? ` · ${paper.year}` : ''}</span>
        {paper.pmid && <a href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}`} target="_blank" style={{ fontSize: 11, color: PURPLE, fontWeight: 600 }}>PubMed →</a>}
        {paper.doi && paper.doi !== '#' && !paper.pmid && <a href={paper.doi} target="_blank" style={{ fontSize: 11, color: PURPLE, fontWeight: 600 }}>Link →</a>}
      </div>
    </div>
  </div>
);

// ── BREAST CANCER GRAPHICS ────────────────────────────────────────────────────

// Theme 1: Classification / subtype pyramid
const ClassificationGraphic = () => (
  <svg viewBox="0 0 620 200" style={{ width: '100%', height: 'auto', margin: '20px 0' }}>
    <text x="310" y="18" textAnchor="middle" fill={PURPLE} fontSize="12" fontFamily="monospace" fontWeight="700">AIMS / AIPS — ABSOLUTE SINGLE-SAMPLE INTRINSIC SUBTYPE ASSIGNMENT</text>
    {/* Central question */}
    <rect x="220" y="75" width="180" height="50" rx="6" fill={PURPLE} opacity="0.95"/>
    <text x="310" y="96" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Georgia,serif" fontWeight="600">What is the patient's</text>
    <text x="310" y="113" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Georgia,serif" fontWeight="600">intrinsic subtype?</text>
    {[
      {x:10, label:'Luminal A', fill:'#3B7DD8'},
      {x:125, label:'Luminal B', fill:'#5B9BD5'},
      {x:240, label:'HER2-enriched', fill:'#8F55E0'},
      {x:355, label:'Basal-like', fill:'#C04040'},
      {x:470, label:'Normal-like', fill:'#818284'},
    ].map((s,i) => (
      <g key={i}>
        <rect x={s.x} y={148} width={110} height={36} rx={4} fill={s.fill} opacity={0.88}/>
        <text x={s.x+55} y={171} textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Georgia,serif" fontWeight="600">{s.label}</text>
        <line x1={s.x+55} y1={148} x2={310} y2={125} stroke={s.fill} strokeWidth="1" opacity="0.4"/>
      </g>
    ))}
    <text x="310" y="192" textAnchor="middle" fill="#818284" fontSize="10" fontFamily="monospace">Intrinsic subtypes · single-sample · independent of cohort normalization · clinically actionable</text>
  </svg>
);

// Theme 1b: Stroma subtype diagram
const StromaGraphic = () => (
  <svg viewBox="0 0 620 180" style={{ width: '100%', height: 'auto', margin: '20px 0' }}>
    <text x="310" y="16" textAnchor="middle" fill={PURPLE} fontSize="12" fontFamily="monospace" fontWeight="700">STROMA4 — FOUR STROMAL SUBTYPES IN BREAST CANCER</text>
    {/* Four stromal quadrants */}
    {[
      {x:40, y:30, label:'T-cells', sub:'immune\ninfiltration', fill:PURPLE},
      {x:190, y:30, label:'B-cells', sub:'adaptive\nimmunity', fill:'#8F55E0'},
      {x:340, y:30, label:'Stromal\nEpithelial', sub:'epithelial\ninfiltration', fill:'#F0A757'},
      {x:490, y:30, label:'Desmoplasia', sub:'fibrotic\nstroma', fill:'#818284'},
    ].map((s,i) => (
      <g key={i}>
        <rect x={s.x} y={s.y} width={130} height={110} rx={6} fill={s.fill} opacity={0.85}/>
        <text x={s.x+65} y={s.y+40} textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Georgia,serif" fontWeight="600">{s.label.split('\n')[0]}</text>
        {s.label.includes('\n') && <text x={s.x+65} y={s.y+57} textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Georgia,serif" fontWeight="600">{s.label.split('\n')[1]}</text>}
        {s.sub.split('\n').map((line,li) => (
          <text key={li} x={s.x+65} y={s.y+80+li*15} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10" fontFamily="monospace">{line}</text>
        ))}
        <text x={s.x+65} y={s.y+125} textAnchor="middle" fill={s.fill} fontSize="11" fontFamily="monospace" fontWeight="700">{['D','A','B','C'][i]}</text>
      </g>
    ))}
    <text x="310" y="170" textAnchor="middle" fill="#818284" fontSize="10" fontFamily="monospace">Predicts clinical outcome in breast cancer independently of tumor subtype</text>
  </svg>
);

// Theme 2a: Inherent prognostic difficulty (Tofigh et al. concept)
// Meta-heatmap: use actual figure from Tofigh et al.
const PrognosticDifficultyGraphic = () => (
  <div style={{ margin: '20px 0' }}>
    <img
      src="https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/inherently_difficult.jpg"
      alt="Meta-heatmap of inherent prognostic difficulty (Tofigh et al.)"
      style={{ width: '50%', borderRadius: 2, border: `1px solid ${BORDER}`, display: 'block' }}
    />
    <div style={{ fontSize: 11, color: MUTED, fontFamily: "'Courier Prime', monospace", marginTop: 8, lineHeight: 1.6 }}>
      <strong style={{ color: TEXT }}>Meta-heatmap of prognostic prediction across signatures (Tofigh et al., Cell Reports 2014).</strong>{' '}
      Each row is a patient; each column is a different published prognostic signature. Cells are coloured by predicted outcome: patients in the top and bottom clusters are <em>consistently</em> assigned good or poor prognosis across all signatures — these are the "easy" patients. The middle cluster of patients receives <em>contradictory</em> predictions depending on which signature is used — these are the "inherently difficult" patients. This inconsistency cannot be explained by data quality alone: it reflects genuine biological heterogeneity in how the tumor interacts with its microenvironment and the host systemic response. For these patients, the tumor transcriptome alone is insufficient to determine outcome.
    </div>
  </div>
);

// MIxT bipartite network: tumor modules (left) ↔ blood modules (right), edges = significant associations
const MiXTGraphic = () => {
  const tumorNodes = [
    {y:50, label:'T-Immune', col:PURPLE},
    {y:90, label:'T-Prolif.', col:PURPLE},
    {y:130, label:'T-Stroma', col:'#8F55E0'},
    {y:170, label:'T-ER+', col:'#8F55E0'},
    {y:210, label:'T-Basal', col:'#C04040'},
  ];
  const bloodNodes = [
    {y:60, label:'B-Neutro.', col:'#F0A757'},
    {y:105, label:'B-T-cell', col:'#F0A757'},
    {y:150, label:'B-Monocyte', col:'#b8680a'},
    {y:195, label:'B-NK', col:'#b8680a'},
  ];
  const edges = [
    [0,0,0.9],[0,1,0.7],[1,0,0.6],[1,2,0.8],[2,1,0.5],[2,2,0.9],[3,3,0.7],[4,2,0.6],[4,3,0.8],[0,3,0.4]
  ];
  return (
    <svg viewBox="0 0 620 260" style={{ width: '100%', height: 'auto', margin: '20px 0' }}>
      <text x="310" y="16" textAnchor="middle" fill={PURPLE} fontSize="12" fontFamily="monospace" fontWeight="700">MIxT BIPARTITE NETWORK — TUMOR ↔ BLOOD CO-EXPRESSION MODULES</text>
      {/* Edge lines */}
      {edges.map(([ti, bi, w], i) => (
        <line key={i}
          x1={185} y1={tumorNodes[ti].y}
          x2={435} y2={bloodNodes[bi].y}
          stroke="#8F55E0" strokeWidth={w*2.5} opacity={0.3+w*0.4}
        />
      ))}
      {/* Tumor nodes */}
      {tumorNodes.map((n, i) => (
        <g key={i}>
          <rect x={80} y={n.y-16} width={110} height={30} rx={4} fill={n.col} opacity={0.88}/>
          <text x={135} y={n.y+5} textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace" fontWeight="600">{n.label}</text>
        </g>
      ))}
      {/* Blood nodes */}
      {bloodNodes.map((n, i) => (
        <g key={i}>
          <rect x={435} y={n.y-16} width={115} height={30} rx={4} fill={n.col} opacity={0.88}/>
          <text x={493} y={n.y+5} textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace" fontWeight="600">{n.label}</text>
        </g>
      ))}
      {/* Section labels */}
      <text x="135" y="32" textAnchor="middle" fill={PURPLE} fontSize="11" fontFamily="Georgia,serif" fontWeight="600">Tumor modules</text>
      <text x="493" y="32" textAnchor="middle" fill="#b8680a" fontSize="11" fontFamily="Georgia,serif" fontWeight="600">Blood modules</text>
      {/* Edge weight legend */}
      <line x1="80" y1="240" x2="120" y2="240" stroke="#8F55E0" strokeWidth="3" opacity="0.8"/>
      <text x="125" y="244" fill={MUTED} fontSize="9" fontFamily="monospace">strong association</text>
      <line x1="250" y1="240" x2="290" y2="240" stroke="#8F55E0" strokeWidth="1" opacity="0.5"/>
      <text x="295" y="244" fill={MUTED} fontSize="9" fontFamily="monospace">weak association</text>
      <text x="430" y="244" fill={MUTED} fontSize="9" fontFamily="monospace">edge width ∝ correlation strength</text>
    </svg>
  );
};

// Theme 2: Tumor-microenvironment-systemic axis
const MicroenvironmentGraphic = () => (
  <svg viewBox="0 0 620 210" style={{ width: '100%', height: 'auto', margin: '20px 0' }}>
    <text x="310" y="16" textAnchor="middle" fill={PURPLE} fontSize="12" fontFamily="monospace" fontWeight="700">BEYOND THE TUMOR — THREE-WAY AXIS OF BREAST CANCER OUTCOME</text>
    {/* Three circles */}
    <circle cx="140" cy="110" r="65" fill={PURPLE} opacity="0.85"/>
    <text x="140" y="98" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Georgia,serif" fontWeight="600">Tumor</text>
    <text x="140" y="116" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="monospace">gene expression</text>
    <text x="140" y="130" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="monospace">somatic mutations</text>

    <circle cx="310" cy="110" r="65" fill="#8F55E0" opacity="0.85"/>
    <text x="310" y="98" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Georgia,serif" fontWeight="600">Micro-</text>
    <text x="310" y="114" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Georgia,serif" fontWeight="600">environment</text>
    <text x="310" y="130" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="monospace">stroma · immune</text>

    <circle cx="480" cy="110" r="65" fill="#F0A757" opacity="0.85"/>
    <text x="480" y="98" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Georgia,serif" fontWeight="600">Systemic</text>
    <text x="480" y="114" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Georgia,serif" fontWeight="600">Response</text>
    <text x="480" y="130" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="monospace">blood transcriptomics</text>

    {/* Arrows between circles */}
    <line x1="208" y1="110" x2="242" y2="110" stroke="#4F2683" strokeWidth="2"/>
    <polygon points="242,104 255,110 242,116" fill="#4F2683"/>
    <line x1="378" y1="110" x2="412" y2="110" stroke="#4F2683" strokeWidth="2"/>
    <polygon points="412,104 425,110 412,116" fill="#4F2683"/>

    {/* Caption below on dark bg strip */}
    <rect x="0" y="185" width="620" height="24" fill="#F5F5F5"/>
    <text x="310" y="200" textAnchor="middle" fill={PURPLE} fontSize="10" fontFamily="monospace">
      Prognosis is shaped by interactions between all three compartments — not the tumor alone
    </text>
  </svg>
);

// Theme 3: DCIS progression
const DCISGraphic = () => (
  <svg viewBox="0 0 720 310" style={{ width: '100%', height: 'auto', margin: '20px 0' }}>
    <text x="360" y="16" textAnchor="middle" fill={PURPLE} fontSize="12" fontFamily="monospace" fontWeight="700">DCIS — THE INVASIVE SWITCH AND TREATMENT DECISIONS</text>

    {/* Normal ductal epithelium — top centre */}
    <rect x="255" y="28" width="170" height="46" rx="6" fill="#818284" opacity="0.9"/>
    <text x="340" y="48" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Georgia,serif" fontWeight="600">Normal Ductal</text>
    <text x="340" y="64" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Georgia,serif" fontWeight="600">Epithelium</text>

    {/* Fork: Normal → Indolent (left) and Aggressive (right) */}
    <line x1="340" y1="74" x2="340" y2="90" stroke="#818284" strokeWidth="2"/>
    <line x1="340" y1="90" x2="170" y2="90" stroke="#818284" strokeWidth="2"/>
    <line x1="340" y1="90" x2="510" y2="90" stroke="#818284" strokeWidth="2"/>
    <line x1="170" y1="90" x2="170" y2="102" stroke="#818284" strokeWidth="2"/>
    <line x1="510" y1="90" x2="510" y2="102" stroke="#818284" strokeWidth="2"/>
    <polygon points="164,102 170,114 176,102" fill="#8F55E0"/>
    <polygon points="504,102 510,114 516,102" fill="#C04040"/>

    {/* Indolent DCIS */}
    <rect x="85" y="114" width="170" height="46" rx="6" fill="#8F55E0" opacity="0.88"/>
    <text x="170" y="134" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Georgia,serif" fontWeight="600">Indolent DCIS</text>
    <text x="170" y="150" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="monospace">low-risk · slow-growing</text>

    {/* Aggressive DCIS */}
    <rect x="425" y="114" width="170" height="46" rx="6" fill="#C04040" opacity="0.88"/>
    <text x="510" y="134" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Georgia,serif" fontWeight="600">Aggressive DCIS</text>
    <text x="510" y="150" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="monospace">high-risk · progressive</text>

    {/* Treatment arrows down */}
    <line x1="170" y1="160" x2="170" y2="178" stroke="#8F55E0" strokeWidth="2"/>
    <polygon points="164,178 170,190 176,178" fill="#8F55E0"/>
    <line x1="510" y1="160" x2="510" y2="178" stroke="#C04040" strokeWidth="2"/>
    <polygon points="504,178 510,190 516,178" fill="#C04040"/>

    {/* Treatment boxes */}
    <rect x="85" y="190" width="170" height="34" rx="4" fill="#8F55E0" opacity="0.65"/>
    <text x="170" y="207" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace" fontWeight="700">BCS alone</text>
    <text x="170" y="220" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="monospace">(surveillance)</text>

    <rect x="390" y="190" width="240" height="34" rx="4" fill="#C04040" opacity="0.65"/>
    <text x="510" y="207" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace" fontWeight="700">BCS + RT ± systemic therapy</text>
    <text x="510" y="220" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="monospace">(adjuvant treatment)</text>

    {/* IDC — bottom centre, directly below Normal Ductal Epithelium */}
    <rect x="255" y="258" width="170" height="40" rx="6" fill="#901010" opacity="0.95"/>
    <text x="340" y="274" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Georgia,serif" fontWeight="600">Invasive Ductal</text>
    <text x="340" y="290" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Georgia,serif" fontWeight="600">Carcinoma (IDC)</text>

    {/* Arrow: BCS+RT → IDC (if treatment fails) */}
    <path d="M 510 224 Q 480 250 420 258" fill="none" stroke="#901010" strokeWidth="1.8" strokeDasharray="5,3"/>
    <polygon points="415,253 420,265 426,254" fill="#901010"/>
    <text x="532" y="240" fill="#901010" fontSize="9" fontFamily="monospace">if untreated /</text>
    <text x="532" y="251" fill="#901010" fontSize="9" fontFamily="monospace">treatment fails</text>

    {/* Arrow: BCS alone → IDC (rare progression) */}
    <path d="M 170 224 Q 200 250 258 262" fill="none" stroke="#8F55E0" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7"/>
    <polygon points="253,257 259,269 265,258" fill="#8F55E0" opacity="0.7"/>
    <text x="60" y="252" fill="#8F55E0" fontSize="9" fontFamily="monospace" opacity="0.9">rare</text>
    <text x="60" y="263" fill="#8F55E0" fontSize="9" fontFamily="monospace" opacity="0.9">progression</text>

    {/* Arrow: Normal ductal → IDC directly (vertical dashed) */}
    <line x1="340" y1="74" x2="340" y2="256" stroke="#818284" strokeWidth="1.2" strokeDasharray="4,4" opacity="0.45"/>
    <polygon points="334,254 340,266 346,254" fill="#818284" opacity="0.45"/>
    <text x="350" y="165" fill="#818284" fontSize="9" fontFamily="monospace" opacity="0.5">direct (rare)</text>

    {/* Key question */}
    <text x="280" y="308" textAnchor="middle" fill={PURPLE} fontSize="10" fontFamily="monospace" fontStyle="italic">
      Which DCIS are indolent? Which aggressive? To whom do you assign BCS alone vs. BCS + RT vs. systemic therapy?
    </text>
  </svg>
);


// ── DEEP LEARNING GRAPHIC ─────────────────────────────────────────────────────

const CoinSeqGraphic = () => (
  <div style={{ margin: '24px 0' }}>
    <img
      src="https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/coin%20seq%20schema.jpg"
      alt="COIN-seq experimental design"
      style={{ width: '100%', borderRadius: 2, border: `1px solid ${BORDER}`, display: 'block' }}
    />
  </div>
);

const CandidaGraphic = () => (
  <div style={{ margin: '24px 0' }}>
    <img
      src="https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/elife.jpg"
      alt="Candida albicans phenotypic heterogeneity"
      style={{ width: '100%', borderRadius: 2, border: `1px solid ${BORDER}`, display: 'block' }}
    />
  </div>
);

// ── BREAST CANCER DETAIL PAGE ─────────────────────────────────────────────────

const ResearchDetailBreast = ({ onBack }) => (
  <div style={{ maxWidth: 920, margin: '0 auto', padding: '40px 28px 80px' }}>
    <button onClick={onBack} style={{ background: 'none', border: 'none', color: PURPLE, cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 24, padding: 0 }}>← Research</button>
    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: MUTED, marginBottom: 6 }}>01</div>
    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 36, fontWeight: 400, color: TEXT, margin: '0 0 6px', letterSpacing: '-0.5px' }}>Breast Cancer Genomics &amp; Informatics</h1>
    <p style={{ fontSize: 14, color: MUTED, margin: '0 0 32px', fontStyle: 'italic' }}>Wet-lab profiling and computational informatics: two inseparable halves of our breast cancer program</p>
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 16px', textWrap: 'pretty' }}>
      The Hallett Lab has a long-standing program in breast cancer that spans both the <strong>genomics</strong> — the generation and processing of molecular data from clinical cohorts — and the <strong>informatics</strong> — the development of computational methods to extract insights from that data. These two activities are inseparable: the challenges of profiling real patient material directly motivate new analytic tools, and those tools open new biological questions requiring better profiling.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 40px', textWrap: 'pretty' }}>
      Our goals are both clinically actionable findings that guide treatment decisions <em>and</em> a fundamental understanding of breast cancer biology. This work is tightly integrated with the <a href="https://lab-dumeaux.science/" target="_blank" style={{ color: PURPLE }}>Dumeaux lab</a> and with clinical partners across Canada, Norway, Sweden and the United States.
    </p>

    {/* Subtheme 1 */}
    <div style={{ marginBottom: 52 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 4, height: 28, background: PURPLE, borderRadius: 2 }} />
        <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: TEXT, margin: 0 }}>Classification, prognosis and prediction: three inter-related end-points</h2>
      </div>
      <ClassificationGraphic />
      <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
        Breast cancer is not one disease. Intrinsic subtypes — Luminal A, Luminal B, HER2-enriched, Basal-like, and Normal-like — reflect distinct biological programs with markedly different clinical behaviours. Our <strong>AIMS</strong> and <strong>AIPS</strong> packages assign patients to these subtypes at the level of individual samples, without requiring cohort-level normalization.
      </p>
      <StromaGraphic />
      <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
        Subtype alone does not tell the full story. In collaboration with the Park lab at McGill, we showed that gene expression in the <strong>tumor stroma</strong> is strongly predictive of clinical outcome. Our <strong>STROMA4</strong> package identifies four distinct stromal subtypes — T-cell infiltration, B-cell infiltration, stromal epithelial infiltration, and desmoplasia — adding significant prognostic information beyond tumor subtype.
      </p>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, marginBottom: 4 }}>Key papers</div>
        {[
          { title: 'Absolute assignment of breast cancer intrinsic molecular subtype', authors: 'Paquet ER, Hallett MT', journal: 'J Natl Cancer Inst', year: 2015, pmid: '25479802' },
          { title: 'Stromal gene expression predicts clinical outcome in breast cancer', authors: 'Finak G, Bertos N, Pepin F, Sadekova S, Souleimanova S, Zhao H, Chen H, Omeroglu G, Meterissian S, Omeroglu A, Hallett MT, Park M', journal: 'Nature Medicine 14(5):518–27', year: 2008, pmid: '18438415' },
        ].map((p,i) => <PaperCard key={i} paper={p} />)}
      </div>
    </div>

    {/* Subtheme 2 */}
    <div style={{ marginBottom: 52, paddingTop: 36, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 4, height: 28, background: '#8F55E0', borderRadius: 2 }} />
        <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: TEXT, margin: 0 }}>From tumor to microenvironment to systemic response</h2>
      </div>
      <MicroenvironmentGraphic />
      <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
        A recurring insight is that the tumor alone is not sufficient to understand clinical outcome. We showed that patients stratify into groups where outcome is easy to predict from molecular features, and groups where it is inherently difficult — reflecting genuine biological complexity. This introduced the concept of <em>inherent prognostic difficulty</em> in breast cancer.
      </p>
      <PrognosticDifficultyGraphic />
      <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
        Going beyond the tumor, we showed that gene expression in <strong>peripheral blood</strong> carries independent and complementary prognostic information to the primary tumor. The <strong>MIxT</strong> framework — developed in collaboration with <a href="https://lab-dumeaux.science/" target="_blank" style={{ color: PURPLE }}>Vanessa Dumeaux</a> — enables principled comparison of transcriptional programs across matched tissues. Interactive explorations of these results are available here:
      </p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <a href="https://idc-blood.mixt.schulich.uwo.ca/" target="_blank" style={{ background: WARM_BG, border: `1px solid ${BORDER}`, padding: '10px 16px', color: PURPLE, fontWeight: 600, fontSize: 13, borderLeft: `3px solid ${PURPLE}` }}>MIxT: Tumor–Blood Interactions →</a>
        <a href="https://idc-stroma.mixt.schulich.uwo.ca/" target="_blank" style={{ background: WARM_BG, border: `1px solid ${BORDER}`, padding: '10px 16px', color: PURPLE, fontWeight: 600, fontSize: 13, borderLeft: `3px solid #8F55E0` }}>MIxT: Tumor–Stroma Interactions →</a>
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, marginBottom: 4 }}>Key papers</div>
        {[
          { title: 'The prognostic ease and difficulty of invasive breast carcinoma', authors: 'Tofigh A, Suderman M, Paquet E, Livingstone J, Bertos N, Saleh S, Zhao H, Souleimanova M, Cory S, Lesurf R, Shahalizadeh S, Garcia Lopez N, Riazalhosseini Y, Omeroglu A, Ursini-Siegel J, Park M, Dumeaux V, Hallett MT', journal: 'Cell Reports 9(1):129–142', year: 2014, pmid: '25263550' },
          { title: 'Interactions between the tumor and the blood systemic response of breast cancer patients', authors: 'Dumeaux V, Fjukstad B, Fjosne HE, Frantzen J-O, Holmen MM, Rodegerdts E, Schlichting E, Børresen-Dale A-L, Bongo LA, Lund E, Hallett M', journal: 'PLOS Computational Biology 13(9):e1005680', year: 2017, pmid: '28886008' },
        ].map((p,i) => <PaperCard key={i} paper={p} />)}
      </div>
    </div>

    {/* Subtheme 3 */}
    <div style={{ marginBottom: 52, paddingTop: 36, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 4, height: 28, background: '#F0A757', borderRadius: 2 }} />
        <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: TEXT, margin: 0 }}>The invasive switch: progression from DCIS to invasive ductal carcinoma</h2>
      </div>
      <DCISGraphic />
      <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
        Ductal carcinoma in situ (DCIS) is a non-obligate precursor to invasive breast cancer. We lack robust biomarkers to distinguish indolent from progressive DCIS at diagnosis. A powerful example of our wet-to-dry feedback is <strong>PREFFECT</strong>: experience profiling archival FFPE tissue revealed how severely formalin fixation degrades RNA, motivating us to build a deep generative model that imputes high-quality transcriptomic profiles from FFPE material.
      </p>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, marginBottom: 4 }}>Key papers</div>
        {[
          { title: 'Deep generative and iterative modelling for transcriptomics from formalin fixed paraffin embedded material', authors: 'Mucaki EJ, Saha A, Zhang WH, Trebinjac S, Nazlica SA, Nofech-Moses S, Dumeaux V*, Hallett MT*', journal: 'Submitted to PLoS Computational Biology', year: 2024 },
          { title: 'Molecular diversity in ductal carcinoma in situ (DCIS) and early invasive breast cancer', authors: 'Muggerud AA, Hallett MT, Johnsen H, Kleivi K, Zhou W, Tahmasebpoor S, Amini RM, Botling J, Børresen-Dale AL, Sørlie T, Wärnberg F', journal: 'Molecular Oncology 4(4):357–68', year: 2010, pmid: '20663721' },
          { title: 'Molecular features of subtype-specific progression from ductal carcinoma in situ to invasive breast cancer', authors: 'Lesurf R, Aure MR, Mørk HH, Vitelli V; OSBREAC, Lundgren S, Børresen-Dale AL, Kristensen V, Wärnberg F, Hallett MT, Sørlie T', journal: 'Cell Reports 16(4):1166–79', year: 2016, pmid: '27425607' },
          { title: 'The time-varying effect of radiotherapy after breast-conserving surgery for DCIS', authors: 'Rakovitch E, Sutradhar R, Hallett MT, Thompson AM, Gu S, Dumeaux V, Whelan TJ, Paszat L', journal: 'Breast Cancer Res. Treat.', year: 2019, pmid: '31020522' },
        ].map((p,i) => <PaperCard key={i} paper={p} />)}
      </div>
    </div>

    <div style={{ background: WARM_BG, border: `1px solid ${BORDER}`, padding: '16px 20px', borderLeft: `4px solid ${PURPLE}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: PURPLE, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' }}>Funding</div>
      <div style={{ fontSize: 13, color: TEXT }}>CIHR · Western University · Canada Research Chair · CFI</div>
    </div>
  </div>
);

// ── COIN-SEQ DETAIL PAGE ──────────────────────────────────────────────────────

const ResearchDetailCoinSeq = ({ onBack }) => (
  <div style={{ maxWidth: 920, margin: '0 auto', padding: '40px 28px 80px' }}>
    <button onClick={onBack} style={{ background: 'none', border: 'none', color: PURPLE, cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 24, padding: 0 }}>← Research</button>
    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: MUTED, marginBottom: 6 }}>02</div>
    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 36, fontWeight: 400, color: TEXT, margin: '0 0 6px', letterSpacing: '-0.5px' }}>Combinatorial Intervention Sequencing</h1>
    <p style={{ fontSize: 14, color: MUTED, margin: '0 0 24px', fontStyle: 'italic' }}>High-throughput CRISPR perturbation with single-cell readout to infer causal biological networks</p>
    <CoinSeqGraphic />
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 16px', textWrap: 'pretty' }}>
      Understanding the causal relationships between genes is one of the central problems in molecular biology. Our COIN-seq platform delivers combinations of CRISPR/Cas9-mediated perturbations via lentiviral vectors and reads out the consequences at single-cell resolution. Each cell receives a pseudorandom subset of the perturbation library, allowing probabilistic and deep learning models to infer the underlying gene regulatory network at scale.
    </p>
    <div style={{ background: WARM_BG, border: `1px solid ${BORDER}`, padding: '16px 20px', borderLeft: `4px solid ${PURPLE}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: PURPLE, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' }}>Funding</div>
      <div style={{ fontSize: 13, color: TEXT }}>NSERC · CIHR · CFI · Canada Research Chair · Western University</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>Two graduate-level positions (MSc, PhD) open for quantitative and bench scientists.</div>
    </div>
  </div>
);

// ── CANDIDA DETAIL PAGE ───────────────────────────────────────────────────────

const ResearchDetailCandida = ({ onBack }) => (
  <div style={{ maxWidth: 920, margin: '0 auto', padding: '40px 28px 80px' }}>
    <button onClick={onBack} style={{ background: 'none', border: 'none', color: PURPLE, cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 24, padding: 0 }}>← Research</button>
    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: MUTED, marginBottom: 6 }}>03</div>
    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 36, fontWeight: 400, color: TEXT, margin: '0 0 6px', letterSpacing: '-0.5px' }}>Morphology, Colony Formation and Phenotypic Heterogeneity in <em>Candida albicans</em></h1>
    <p style={{ fontSize: 14, color: MUTED, margin: '0 0 24px', fontStyle: 'italic' }}>Single-cell profiling and deep-learning morphology analysis for a human fungal pathogen</p>
    <CandidaGraphic />
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 16px', textWrap: 'pretty' }}>
      <em>Candida albicans</em> is the most common human fungal pathogen. Our research spans two interconnected directions: deep learning tools to quantify fungal morphology (Candescence), and single-cell profiling to understand phenotypic heterogeneity in drug-treated populations.
    </p>

    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 12px' }}>
      <div style={{ width: 4, height: 24, background: PURPLE, borderRadius: 2 }} />
      <img src="https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/candescence-logo.png" alt="Candescence" style={{ height: 32, objectFit: 'contain' }} />
      <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: TEXT, margin: 0 }}>Candescence: convolutional networks for fungal morphology</h2>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
      Candescence is built on a multi-task convolutional neural network (CNN) that jointly performs instance segmentation and morphological classification of <em>C. albicans</em> cells. Trained on annotated yeast, pseudohyphal, and hyphal forms, it uses focal loss, data augmentation, and a two-stage detect-then-classify pipeline to handle the extreme class imbalance and morphological continuum of fungal populations.
    </p>
    <div style={{ marginBottom: 28 }}>
      {[
        { title: 'A deep learning approach to capture the essence of Candida albicans morphologies', authors: 'Bettauer V, Costa ACBP, Omran RP, Massahi S, Kirbizakis E, Simpson S, Dumeaux V, Law C, Whiteway M, Hallett MT', journal: 'Microbiology Spectrum 10(5):e0147222', year: 2022, doi: 'https://doi.org/10.1128/spectrum.01472-22' },
        { title: 'Respiration supports intraphagosomal filamentation and escape of Candida albicans from macrophages', authors: 'Case NT*, Westman J*, Hallett MT, Plumb J, Farheen A, MacAlpine J, Liston SD, Liu Z, Hube B, Robbins N, Whitesell L, Grinstein S, Cowen LE', journal: 'mBio', year: 2023, doi: 'https://doi.org/10.1128/mbio.02745-23' },
      ].map((p,i) => <PaperCard key={i} paper={p} />)}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 12px' }}>
      <div style={{ width: 4, height: 24, background: '#8F55E0', borderRadius: 2 }} />
      <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: TEXT, margin: 0 }}>Phenotypic heterogeneity and drug tolerance</h2>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
      We adapted DROP-seq for <em>C. albicans</em> to profile transcriptional heterogeneity at single-cell resolution. In a large collaborative study in <em>eLife</em>, we identified distinct subpopulations with heterogeneous and adaptive cytoprotective responses to antifungal compounds — including stress response programs, efflux pumps, and metabolic reprogramming — providing a high-resolution map of drug tolerance diversity.
    </p>
    <div style={{ marginBottom: 28 }}>
      {[
        { title: 'Candida albicans exhibits heterogeneous and adaptive cytoprotective responses to anti-fungal compounds', authors: 'Dumeaux V, Massahi S, Bettauer V, Mottola A, Dukovny A, Khurdia S, Costa ACBP, Omran RP, Simpson S, Xie JL, Whiteway M, Berman J, Hallett MT', journal: 'eLife', year: 2023, doi: 'https://doi.org/10.7554/eLife.81406' },
      ].map((p,i) => <PaperCard key={i} paper={p} />)}
    </div>

    <div style={{ background: WARM_BG, border: `1px solid ${BORDER}`, padding: '16px 20px', borderLeft: `4px solid ${PURPLE}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: PURPLE, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' }}>Collaborators &amp; Funding</div>
      <div style={{ fontSize: 13, color: TEXT, marginBottom: 4 }}>
        <a href="https://www.jbermanlab.com/" target="_blank" style={{ color: PURPLE }}>Judy Berman (Tel Aviv)</a> ·{' '}
        <a href="https://sites.google.com/site/whitewaylab/home" target="_blank" style={{ color: PURPLE }}>Malcolm Whiteway (Concordia)</a> ·{' '}
        <a href="https://lab-dumeaux.science/" target="_blank" style={{ color: PURPLE }}>Vanessa Dumeaux (Western)</a> ·{' '}
        <a href="http://individual.utoronto.ca/cowen/index.html" target="_blank" style={{ color: PURPLE }}>Leah Cowen (U Toronto)</a>
      </div>
      <div style={{ fontSize: 13, color: TEXT }}>NSERC · CIHR · Canada Research Chair</div>
    </div>
  </div>
);

// ── DEEP LEARNING DETAIL PAGE ─────────────────────────────────────────────────

const ResearchDetailDeepLearning = ({ onBack }) => (
  <div style={{ maxWidth: 920, margin: '0 auto', padding: '40px 28px 80px' }}>
    <button onClick={onBack} style={{ background: 'none', border: 'none', color: PURPLE, cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 24, padding: 0 }}>← Research</button>
    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: MUTED, marginBottom: 6 }}>04</div>
    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 36, fontWeight: 400, color: TEXT, margin: '0 0 6px', letterSpacing: '-0.5px' }}>Deep Learning in the Life Sciences</h1>
    <p style={{ fontSize: 14, color: MUTED, margin: '0 0 24px', fontStyle: 'italic' }}>Generative models, neural architectures, and probabilistic methods applied across our research programs</p>
    <DeepLearningGraphic />
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 16px', textWrap: 'pretty' }}>
      Deep learning and generative modelling are not peripheral to our work — they are central to how we analyze molecular data across all four of our research programs. Probabilistic modelling, Bayesian inference, generative modelling and neural network theory are core to our research goals.
    </p>

    {/* Candescence */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 12px' }}>
      <div style={{ width: 4, height: 24, background: PURPLE, borderRadius: 2 }} />
      <img src="https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/candescence-logo.png" alt="Candescence" style={{ height: 32, objectFit: 'contain' }} />
      <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: TEXT, margin: 0 }}>Candescence: convolutional networks for fungal morphology</h2>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
      Candescence is built on a multi-task convolutional neural network (CNN) architecture that jointly performs instance segmentation and morphological classification of <em>Candida albicans</em> cells from microscopy images. The model is trained on a curated dataset of annotated yeast, pseudohyphal, and hyphal forms using a combination of pixel-wise segmentation loss and multi-class classification objectives. A key methodological challenge was handling the extreme class imbalance and morphological continuum in fungal populations — addressed through data augmentation, focal loss, and a two-stage detect-then-classify pipeline. The model produces per-cell morphological scores, organelle segmentation masks, and population-level summary statistics that enable rigorous statistical comparison across experimental conditions.
    </p>
    <div style={{ marginBottom: 28 }}>
      {[
        { title: 'A deep learning approach to capture the essence of Candida albicans morphologies', authors: 'Bettauer V, Costa ACBP, Omran RP, Massahi S, Kirbizakis E, Simpson S, Dumeaux V, Law C, Whiteway M, Hallett MT', journal: 'Microbiology Spectrum 10(5):e0147222', year: 2022, doi: 'https://doi.org/10.1128/spectrum.01472-22' },
        { title: 'Respiration supports intraphagosomal filamentation and escape of Candida albicans from macrophages', authors: 'Case NT*, Westman J*, Hallett MT, Plumb J, Farheen A, MacAlpine J, Liston SD, Liu Z, Hube B, Robbins N, Whitesell L, Grinstein S, Cowen LE', journal: 'mBio', year: 2023, doi: 'https://doi.org/10.1128/mbio.02745-23' },
      ].map((p,i) => <PaperCard key={i} paper={p} />)}
    </div>

    {/* PREFFECT */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 12px' }}>
      <div style={{ width: 4, height: 24, background: '#8F55E0', borderRadius: 2 }} />
      <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: TEXT, margin: 0 }}>PREFFECT: variational autoencoders for FFPE transcriptomics</h2>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
      PREFFECT (Probabilistic Reconstruction of Expression From FFPE using Encoder-decoder Convolutional Transformers) frames FFPE transcriptomics correction as a conditional generative modelling problem. The core architecture is a variational autoencoder (VAE) in which the encoder maps degraded FFPE expression profiles into a structured latent space, and the decoder reconstructs a clean, fresh-frozen-equivalent profile. Crucially, PREFFECT incorporates an iterative refinement loop: the decoded output is re-encoded and refined over multiple passes, progressively removing FFPE-specific artifacts while preserving biologically meaningful variation. The model is trained with a combination of reconstruction loss, KL divergence regularization, and a contrastive loss that encourages matched FFPE/fresh-frozen pairs from the same tumor to cluster in latent space. This allows the model to disentangle technical degradation from true biological signal.
    </p>
    <div style={{ marginBottom: 28 }}>
      {[
        { title: 'Deep generative and iterative modelling for transcriptomics from formalin fixed paraffin embedded material', authors: 'Mucaki EJ, Saha A, Zhang WH, Trebinjac S, Nazlica SA, Nofech-Moses S, Dumeaux V*, Hallett MT*', journal: 'Submitted to PLoS Computational Biology · * equal contributions', year: 2024 },
      ].map((p,i) => <PaperCard key={i} paper={p} />)}
    </div>

    {/* COIN-seq */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 12px' }}>
      <div style={{ width: 4, height: 24, background: '#F0A757', borderRadius: 2 }} />
      <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: TEXT, margin: 0 }}>Deep learning for COIN-seq network inference</h2>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
      Deep learning is central to the analysis of COIN-seq data. After single-cell sequencing of combinatorially perturbed cells, we must infer which perturbations caused which transcriptional changes — and ultimately reconstruct the causal gene regulatory network. This requires models that can handle high-dimensional, sparse, and combinatorially structured data. We use graph neural networks and probabilistic deep learning to learn transcriptional signatures of individual perturbations, predict the effects of unseen combinations, and infer network structure from the ensemble of observed responses.
    </p>
    <div style={{ marginBottom: 28 }}>
      {[
        { title: 'Detecting molecular synergy with combinatorial genetic interaction assays', authors: 'Gupta V, Qu T, Mucaki EJ, Tran B, Kirbizakis E, Wong M, Trim M, Zhang C, Mader M, Dumeaux V, Hallett MT', journal: 'In preparation', year: 2024 },
      ].map((p,i) => <PaperCard key={i} paper={p} />)}
    </div>

    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>
      Beyond these specific applications, the lab maintains a broad interest in probabilistic modelling, Bayesian inference, generative modelling, and neural network theory — including variational autoencoders, normalizing flows, and generative models for single-cell data. We also maintain an active interest in agentic AI systems for accelerating scientific workflows. Our <a href="https://github.com/hallettmiket/generic_cc" target="_blank" style={{ color: PURPLE }}>generic_cc</a> infrastructure is a shared Claude Code environment designed for the lab's day-to-day use.
    </p>
    <div style={{ background: WARM_BG, border: `1px solid ${BORDER}`, padding: '16px 20px', borderLeft: `4px solid ${PURPLE}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: PURPLE, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' }}>Funding</div>
      <div style={{ fontSize: 13, color: TEXT }}>NSERC · CFI · Canada Research Chair · Western University</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>MSc and PhD positions for individuals with strong quantitative backgrounds.</div>
    </div>
  </div>
);

const AREA_PAPERS = {};

Object.assign(window, {
  ResearchDetailBreast, ResearchDetailCoinSeq, ResearchDetailCandida, ResearchDetailDeepLearning,
  CoinSeqGraphic, CandidaGraphic, DeepLearningGraphic, BreastCancerGraphic: ClassificationGraphic,
  AREA_PAPERS, PaperCard,
});
