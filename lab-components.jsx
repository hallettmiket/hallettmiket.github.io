// Shared components: Nav, Footer, Tag, SectionHead

const PURPLE = '#4F2683';
const ORCHID = '#8F55E0';
const TIGER  = '#F0A757';
const DEEP   = '#201436';
const GREY   = '#818284';
const GOLD   = TIGER;   // legacy alias
const WARM_BG = '#F5F5F5';
const BORDER  = '#E0E0E2';
const TEXT    = '#1a1a1a';
const MUTED   = GREY;

const GH_TEAM = 'https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/team/';

const navC = {
  nav: { background: PURPLE, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, borderBottom: `3px solid ${GOLD}` },
  inner: { maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: 52 },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto', cursor: 'pointer', textDecoration: 'none' },
  logoImg: { height: 36, width: 36, objectFit: 'cover', background: '#fff', borderRadius: 3, padding: 2, flexShrink: 0 },
  logoText: { fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', letterSpacing: '-0.3px' },
  links: { display: 'flex', alignItems: 'center', gap: 0 },
  link: { fontSize: 12, color: 'rgba(255,255,255,0.75)', padding: '0 11px', height: 52, display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none', borderBottom: '2px solid transparent', transition: 'all 0.15s', whiteSpace: 'nowrap' },
  linkActive: { color: '#fff', borderBottom: `2px solid ${GOLD}` },
  cta: { fontSize: 12, fontWeight: 700, background: TIGER, color: DEEP, padding: '6px 14px', marginLeft: 10, cursor: 'pointer', textDecoration: 'none', borderRadius: 1, whiteSpace: 'nowrap' },
};

const Nav = ({ currentPage, navigate }) => {
  const links = [
    { label: 'Blog', page: 'blog' },
    { label: 'Research', page: 'research' },
    { label: 'Team', page: 'team' },
    { label: 'Software', page: 'software' },
    { label: 'Courses', page: 'courses' },
    { label: 'Barbados', page: 'barbados' },
    { label: 'Ethos', page: 'ethos' },
  ];
  return (
    <nav style={navC.nav}>
      <div style={navC.inner}>
        <div onClick={() => navigate('home')} style={navC.logoWrap}>
          <img src="assets/images/site/lab-logo-hi-res.jpg" alt="Hallett Lab" style={navC.logoImg} />
          <span style={navC.logoText}>Hallett Lab</span>
        </div>
        <div style={navC.links}>
          {links.map(({ label, page }) => (
            <a key={page} onClick={() => navigate(page)}
               style={{ ...navC.link, ...(currentPage === page ? navC.linkActive : {}) }}>
              {label}
            </a>
          ))}
          <a onClick={() => navigate('join')} style={navC.cta}>Join Us</a>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ navigate }) => (
  <footer style={{ background: DEEP, padding: '20px 28px', marginTop: 0 }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <span onClick={() => navigate('home')} style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 18, color: TIGER, cursor: 'pointer', whiteSpace: 'nowrap' }}>Hallett Lab</span>
      <a href="https://www.schulich.uwo.ca/biochem/" target="_blank">
        <img src="assets/images/site/Schulich_horizontal_CMYK.png" alt="Schulich Medicine & Dentistry" style={{ height: 26, filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
      </a>
      <a href="https://www.uwo.ca/" target="_blank" style={{ background: '#fff', padding: '3px 8px', borderRadius: 2, display: 'inline-flex', alignItems: 'center' }}>
        <img src="assets/images/site/western_longWhite.png" alt="Western University" style={{ height: 20 }} />
      </a>
      <span style={{ fontSize: 11, color: '#555', flexGrow: 1 }}>Department of Biochemistry · London, ON, Canada</span>
      <div style={{ display: 'flex', gap: 18 }}>
        {[['Contact', 'contact'], ['Join Us', 'join']].map(([label, page]) => (
          <a key={page} onClick={() => navigate(page)} style={{ fontSize: 11, color: '#777', cursor: 'pointer' }}>{label}</a>
        ))}
      </div>
    </div>
  </footer>
);

const Tag = ({ children, color = PURPLE }) => (
  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color, border: `1px solid ${color}`, padding: '2px 6px', borderRadius: 1, whiteSpace: 'nowrap' }}>
    {children}
  </span>
);

const SectionHead = ({ children, style = {} }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: MUTED, borderBottom: `1px solid ${BORDER}`, paddingBottom: 8, marginBottom: 16, ...style }}>
    {children}
  </div>
);

const Divider = () => <hr style={{ border: 'none', borderTop: `1px solid ${BORDER}`, margin: '24px 0' }} />;

Object.assign(window, { Nav, Footer, Tag, SectionHead, Divider, PURPLE, GOLD, ORCHID, TIGER, DEEP, GREY, WARM_BG, BORDER, TEXT, MUTED, GH_TEAM });
