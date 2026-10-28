const FUNDING_LOGOS = {"NSERC":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/nserc.jpg","CIHR":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/cihr_logo.jpg","CRC":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/crc.png","CFI":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/Innovation_Logo.png","NIH":"https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/funding_agencies/banner-nihlogo.png"};

// All page components — comprehensive update

const GH_IMG = 'https://raw.githubusercontent.com/hallettmiket/hallettmiket.github.io/master/assets/images/';

const CAROUSEL_IMAGES = [
  { src: GH_IMG + 'web_images/bellairs_2026.jpeg', caption: 'Bellairs Systems Biology Workshop 2026', pos: 'center 20%' },
  { src: GH_IMG + 'web_images/summer_western.png', caption: 'Hallett Lab, Western University', pos: 'center 50%' },
  { src: GH_IMG + 'web_images/IMG_1184.jpeg', caption: 'Hallett Lab', pos: 'center 20%' },
  { src: GH_IMG + 'web_images/IMG_1427.jpeg', caption: 'Hallett Lab', pos: 'center 65%' },
  { src: GH_IMG + 'web_images/IMG_1510.jpeg', caption: 'Hallett Lab', pos: 'center 20%' },
  { src: GH_IMG + 'web_images/IMG_1513.jpeg', caption: 'Hallett Lab', pos: 'center 55%' },
  { src: GH_IMG + 'web_images/IMG_2320.jpeg', caption: 'Hallett Lab', pos: 'center 20%' },
  { src: GH_IMG + 'web_images/IMG_2363.jpeg', caption: 'Hallett Lab', pos: 'center 20%', fit: 'contain', bg: '#f0ede6' },
  { src: GH_IMG + 'web_images/IMG_2386.jpeg', caption: 'Hallett Lab', pos: 'center 35%' },
  { src: GH_IMG + 'web_images/DSC08259.jpg', caption: 'Hallett Lab', pos: 'center 45%' },
];

const Carousel = ({ navigate }) => {
  const [idx, setIdx] = React.useState(0);
  const imgs = CAROUSEL_IMAGES;
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
      <img src={imgs[idx].src} alt={imgs[idx].caption}
           style={{ width: '100%', height: 260, objectFit: imgs[idx].fit || 'cover', objectPosition: imgs[idx].pos || 'center 20%', background: imgs[idx].bg || 'transparent', display: 'block', transition: 'opacity 0.4s' }}
           onError={e => e.target.style.display='none'} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(32,20,54,0.7)', padding: '6px 10px' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontFamily: "'Courier Prime', monospace" }}>{imgs[idx].caption}</div>
      </div>
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', padding: '8px 0' }}>
        {imgs.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)}
               style={{ width: 6, height: 6, borderRadius: '50%', background: i === idx ? PURPLE : BORDER, cursor: 'pointer', transition: 'background 0.3s' }} />
        ))}
      </div>
    </div>
  );
};

// Initials avatar placeholder
const Avatar = ({ name, size = 100 }) => {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#4F2683" rx="2"/>
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
        fontFamily="Georgia, serif" fontSize="34" fontWeight="400" fill="rgba(255,255,255,0.85)">
        {initials}
      </text>
    </svg>
  );
};

const MemberImg = ({ src, name, style = {} }) => {
  const [err, setErr] = React.useState(false);
  return err
    ? <div style={{ flexShrink: 0, ...style }}><Avatar name={name} size={style.width || 100} /></div>
    : <img src={src} alt={name} onError={() => setErr(true)} style={{ objectFit: 'cover', display: 'block', ...style }} />;
};


// Simple markdown renderer
const MdContent = ({ text }) => {
  const lines = (text || '').split('\n');
  const toHtml = s => s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#4F2683">$1</a>');
  const els = [];
  lines.forEach((line, i) => {
    const t = line.trim();
    if (!t) { els.push(<div key={i} style={{height:6}} />); return; }
    if (/^--?\s/.test(t)) {
      const txt = t.replace(/^--?\s+/, '');
      els.push(<div key={i} style={{display:'flex',gap:8,marginBottom:4,fontSize:13,lineHeight:1.7,color:TEXT}}><span style={{color:PURPLE,flexShrink:0}}>·</span><span dangerouslySetInnerHTML={{__html:toHtml(txt)}} /></div>);
    } else if (/^#{1,3}\s/.test(t)) {
      els.push(<p key={i} style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:18,fontWeight:600,color:TEXT,margin:'12px 0 4px'}} dangerouslySetInnerHTML={{__html:toHtml(t.replace(/^#+\s/,''))}} />);
    } else {
      els.push(<p key={i} style={{fontSize:13,lineHeight:1.75,color:TEXT,margin:'0 0 6px'}} dangerouslySetInnerHTML={{__html:toHtml(t)}} />);
    }
  });
  return <div>{els}</div>;
};

// ── DATA ──────────────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  { date: 'Oct 28, 2026', title: 'MEDSCI 3391, Module 5, Week 1: Ethics in bioinformatics', tags: ['Ethics', 'Teaching'],
    content: `### Module 5, Week 1: Ethics in bioinformatics

One week, three days, and a game played twice. On Wednesday the whole lecture hall sits as a kind of ethics board and votes, by phone, on four questions in bioinformatics, then votes again after each new fact, and watches its own verdict move. On Friday each tutorial section debates four different questions in the same style, and the side that moves the room's vote further wins. Thursday is for preparing. These are the materials for students in *Truth and Lies in Biomedical Big Data*.

- **[Before this week](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/module5/prep_1.html)**. Read this first: the four Friday topics with one short reading each, how the sign-up works, and what wins a debate.
- **[Sign up](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/module5/signup.html)**. Everyone, by Thursday morning: one topic, pro or con, and your tutorial section. The four speakers a side are chosen from the sign-ups and announced on Friday.`,
  },
  { date: 'Oct 27, 2026', title: 'MEDSCI 3391, Module 4, Week 3: Materials', tags: ['AI', 'Teaching'],
    slides: 'https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week3/lecture_3.html',
    content: `### Week 3: Learning without answers

The same 751 molecules for the third and last time, with the answers taken away. Clustering first, then self-supervised learning, the trick that built modern AI and the way the agents of week 1 were actually made. These are the week 3 materials for students in *Truth and Lies in Biomedical Big Data*.

- **[Before the lecture](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week3/prep_3.html)**. Read this first: one nine-minute video on k-means, and why you are watching it.
- **[Lecture 3](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week3/lecture_3.html)**. The slides. Open them in a browser and use the arrow keys.
- **[Tutorial 3](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week3/tutorial_3.html)**. Thursday's guided session: find the groups nobody labelled, and then break them.
- **[Quiz 3](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week3/quiz_3.html)**. Twenty questions on the lecture and the tutorial, labelled easy, moderate and hard.
- **[Quiz 3 answer key](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week3/quiz_3_answers.html)**. Try the questions first.`,
  },
  { date: 'Oct 27, 2026', title: 'MEDSCI 3391, Module 4, Week 2: Materials', tags: ['AI', 'Teaching'],
    slides: 'https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week2/lecture_2.html',
    content: `### Week 2: Learning with answers

The week we open the box. One perceptron, the smallest piece of a neural network: what it computes, how it is trained one mistake at a time, and why a single one is not enough. Then the honest way to score a model, and a decision tree, which is a model you can read. These are the week 2 materials for students in *Truth and Lies in Biomedical Big Data*.

- **[Before the lecture](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week2/prep_2.html)**. Read this first: one 19-minute video and three short ones, about 25 minutes in all, and why you are watching them.
- **[Lecture 2](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week2/lecture_2.html)**. The slides. Open them in a browser and use the arrow keys. Several slides are live: drag the weights, watch a perceptron train, watch two of them learn what one cannot.
- **[Tutorial 2](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week2/tutorial_2.html)**. Thursday's guided session: build the smallest neural network there is and check its arithmetic by hand, count what you add as it grows, grow a decision tree you can read, then predict how much of a drug reaches the brain instead of whether.
- **[Quiz 2](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week2/quiz_2.html)**. Twenty questions on the lecture and the tutorial, labelled easy, moderate and hard.
- **[Quiz 2 answer key](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week2/quiz_2_answers.html)**. Try the questions first.`,
  },
  { date: 'Oct 26, 2026', title: 'MEDSCI 3391, Module 4, Week 1: Materials', tags: ['AI', 'Teaching'],
    slides: 'https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week1/lecture_1.html',
    content: `### Week 1: What AI can do now

The first week of Module 4 is a real research project, start to finish, run almost entirely by AI agents. The theory comes in weeks 2 and 3. These are the week 1 materials for students in *Truth and Lies in Biomedical Big Data*.

- **[Before the lecture](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week1/prep_1.html)**. Read this first. Two short pages and one eight-minute video to look at before Wednesday, and the one thing to install at home before Thursday's tutorial.
- **[Lecture 1](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week1/lecture_1.html)**. The slides. Open them in a browser and use the arrow keys.
- **[The talk](https://biodatweb.schulich.uwo.ca/mhallet/murmurent_seminar/fizzfarm_2026_10.html)**. A recording of this lecture's story told to the Department of Physiology and Pharmacology in October 2026: the same research project, run by AI agents.
- **[Tutorial 1](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week1/tutorial_1.html)**. Friday's session in the lab, in which you build a blood-brain barrier classifier yourselves in Google Antigravity.
- **[Quiz 1](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week1/quiz_1.html)**. Twenty questions on the lecture and the tutorial, labelled easy, moderate and hard. Thursday.
- **[Quiz 1 answer key](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/week1/quiz_1_answers.html)**. Try the questions first.`,
  },
  { date: 'Oct 25, 2026', title: 'Teaching AI to Biomedical Students: Module 4 Resources', tags: ['AI', 'Teaching'],
    content: `### MEDSCI 3391 — Module 4 — Machine Learning and Artificial Intelligence

I teach three weeks on AI inside *Truth and Lies in Biomedical Big Data*, a third-year course for Medical Sciences students. Most of them have never programmed.

This year I rebuilt the module around a simple inversion: **they use a working AI system in week one, before they understand any of it, and we spend weeks two and three taking it apart.** Week one is a real research project run by AI agents, and a tutorial where students build a blood-brain-barrier classifier themselves. Week two opens the box: the perceptron, and why one of them is not enough. Week three is what happens when nobody labels your data — clustering, and then the trick that made modern AI possible.

Two sessions happen on their feet. In week two the floor is taped into two axes, students stand at the coordinates of a molecule, and a rope across the room is the decision boundary — its angle is the weights, its position is the bias. Then a second set of cards that no straight rope can separate, which is the XOR problem and the reason you need layers. In week three they each act as a language model: the same sentence with a blank, once on its own and then at the end of three different paragraphs, and the answer changes with a word twenty-five words back. That is attention, done by hand, and the words they would swap into the blank are the beginning of an embedding.schulich.uwo.ca/mhallet/medsci3391/learning_objectives.html)** for the module, week by week: what a student should be able to do after each one.

### The material I send students to beforehand

Every link below I checked by opening it. Runtimes are real.

**On what a model is**
- [Large Language Models explained briefly](https://www.youtube.com/watch?v=LPZh9BOjkQs) — 3Blue1Brown, 7:58. Built for a museum audience. What a parameter is, and what a billion of them looks like.
- [Brendan Bycroft's LLM visualiser](https://bbycroft.net/llm) — a tiny model and a very large one side by side at true scale. Scroll it.

**On neural networks**
- [But what is a neural network?](https://www.youtube.com/watch?v=aircAruvnKk) — 3Blue1Brown, 18:40.
- [Gradient descent, how neural networks learn](https://www.youtube.com/watch?v=IHZwWFHWa-w) — 3Blue1Brown, 20:33.
- [Neural Network 3D Simulation](https://www.youtube.com/watch?v=3JQ3hYko51Y) — Denis Dmitriev, 2:45, and [Marijn van Vliet's version](https://www.youtube.com/watch?v=sDDjJRnnHao), 2:45. A trained network reading handwritten digits, every neuron firing. No narration. There is no step where the network works out what the digit is.

**Things to play with in class**
- [TensorFlow Playground](https://playground.tensorflow.org/) — build a network by clicking. Set the activation to Linear and watch it fail however many layers you add.
- [Neuron Sandbox](https://teaching.gureckislab.org/ccm/pages/neuronsandbox.html) — three sliders and a truth table. Build AND, build OR, then fail at XOR with your own hands.
- [Visualizing K-Means Clustering](https://www.naftaliharris.com/blog/visualizing-k-means-clustering/) — its two buttons are exactly the two steps of the classroom version.
- [What Have Language Models Learned?](https://pair.withgoogle.com/explorables/fill-in-the-blank/) — Google PAIR. Type a sentence, blank a word, watch a real model fill it in. What it fills in is what it read.

**On clustering**
- [StatQuest: K-means clustering](https://www.youtube.com/watch?v=4b5d3muPQmA) — Josh Starmer, 8:30.

### One thing I could not find, so I built it

**[How big have these things got?](https://biodatweb.schulich.uwo.ca/mhallet/medsci3391/model_growth.html)** — 69 seconds, no sound

I used to show students a video comparing model sizes from the 1950s to now. It has since been deleted from YouTube, which is the standing risk with borrowing a link, and nothing good has replaced it. What there is instead is a great many confident articles, written to be found by search engines, that disagree with each other about which models exist and what they cost. Some describe models withdrawn a year ago.

So this one is built from [Epoch AI's](https://epoch.ai/data/notable_ai_models.csv) maintained dataset and regenerates from a script, rather than being something I have to go and find again. It runs from Theseus in 1950 — a mechanical mouse at Bell Labs with forty connections — to the present, and it draws two lines across the chart: the 86 billion neurons in a human brain, and the roughly 150 trillion synapses in a human cortex. A parameter is one connection, so the synapse line is the fair comparison. These systems passed the first line years ago and are still nowhere near the second.

Canadian models are maple leaves. There are more than you would expect, and **AlexNet** — the one that started deep learning — is one of them.

The last card is the part I did not plan. There is not a single Anthropic model in the dataset, and Google appears only through its small on-device Gemini Nano, because those labs no longer publish how big their systems are. Of the ninety systems published since the start of 2025, seventy-nine are open-weight models from Chinese labs. It is a chart of who publishes, not of who builds, and that is the first thing the module teaches: when the secondary literature is abundant, confident and contradictory, go to the primary source — the companies' own documentation, [Anthropic's](https://platform.claude.com/docs/en/about-claude/models/overview) and [Google's](https://ai.google.dev/gemini-api/docs/models), which are dated and maintained. Nearly everything else is not.

Happy to share the slides and tutorials with anyone teaching something similar. The material was built with [murmurent](https://github.com/hallettmiket/murmurent), and reviewed by its teaching and equity agents before it went anywhere near a student.`,
  },
  { date: 'Sep 29, 2026', title: 'Murmurent: Our Preprint Is on bioRxiv', tags: ['AI', 'Paper'],
    content: `### An agentic AI environment to support biomedical research in collaborative academic environments

Murmurent is shared software that sits underneath an agentic AI tool such as Claude Code and gives a lab the procedures, specialist agents and safeguards it would otherwise have to build itself: agents for statistics, literature, figures and methods review, a memory for research decisions, and a record of who did what and why. The preprint describes the system and follows it through a real project, a search for Pin1 inhibitors.

Timothy Wu, Tyler S. Browne and colleagues, with Michael T. Hallett.

[Read the preprint on bioRxiv](https://www.biorxiv.org/content/10.64898/2026.09.24.753565v1)`,
  },
  { date: 'Oct 2026', title: 'New: Using AI Well in the Lab', tags: ['AI', 'News'],
    content: `### Using AI Well in the Lab

We have written down how we use AI in our science. In short: use it widely and creatively, wherever it makes our work more correct, more reproducible, more inclusive and better made, and remember that you remain the author and are responsible for everything you hand in.

The page covers uses you may not have tried, nine habits for everyone, who does what, where your data can and cannot go, equity and wellbeing, and why good science needs many reviewers.

[Read Using AI Well in the Lab](https://mikehallett.science/#ai)`,
  },
  { date: 'Oct 2026', title: 'Agentic AI in Research: Physiology and Pharmacology Seminar', tags: ['AI', 'Talk'],
    slides: 'https://mikehallett.science/assets/fizzfarm_2026_10_presentation.html',
    video: 'https://biodatweb.schulich.uwo.ca/mhallet/murmurent_seminar/fizzfarm_2026_10.html',
    content: `### Agentic AI in Research

A talk for the Department of Physiology and Pharmacology seminar series (FizzFarm), October 2026, on how agentic AI can support research in a collaborative academic setting.

[Watch the video](https://biodatweb.schulich.uwo.ca/mhallet/murmurent_seminar/fizzfarm_2026_10.html) · [See the slides](https://mikehallett.science/assets/fizzfarm_2026_10_presentation.html)`,
  },
  { date: 'Apr 2, 2026', title: 'Live Demonstration: Agentic AI in Biochemistry', tags: ['AI', 'Demo'],
    slides: 'https://mikehallett.science/assets/demo_presentation.html',
    video: 'https://biodatweb.schulich.uwo.ca/mhallet/murmurent_seminar/agentic_ai_demo_2026_04.html',
    content: `### A Live Demonstration of Agentic AI in Biochemistry

You've finished generating data and are ready to start the analysis. Where do you start? Perhaps you have little experience with stats and even less with programming? How do you organize yourself? What can you do in an hour?

I will give a live demonstration of [Claude Code](https://claude.ai/code), Anthropic's agentic AI coding system, using an example challenge: **can we predict whether an arbitrary small molecule drug can penetrate the blood-brain barrier (BBB)?**

We will watch Claude Code autonomously plan, summarize literature, execute, debug, cross-validate and visualize an end-to-end analysis pipeline in real time using four sub-agents working in parallel: the **BLACKSMITH** who performs analysis, the **BOOKWORM** constantly surveying the literature, the **ARTIST** who expresses the findings, and the **ADVERSARY** who is forever skeptical.

### The Science

The BBB is one of the most consequential gatekeepers in drug discovery. We use data from [Shaker et al. (2021, Bioinformatics)](https://doi.org/10.1093/bioinformatics/btab534). The BLACKSMITH will develop a GUI to explore these molecules and build a classifier. The BOOKWORM will query external chemical databases. The ARTIST will design plots and prepare a PowerPoint. The ADVERSARY will constantly challenge findings and cross-validate. All orchestrated from a natural language prompt without writing a single line of code — in 50 minutes.

### Event Details

**Date & Time:** April 10, 2026 at 10:30 AM | **Location:** MSB-384

Contact: michael.hallett@uwo.ca` },
  { date: 'Jan 1, 2026', title: 'January 2026', tags: ['Update'],
    content: `- Our Barbados 2026 - Cells to Ecosystems workshop is set to take place in February. This year's workshop will bring 40-50 researchers together to explore the fundamental organization and dynamics of biological systems across multiple scales.

- Congratulations to Thomas Qu for successfully completing his MSc.

- We welcome several undergraduate thesis students to the lab this year: Rowan Pereira, Jacob Madeira, Joseph Kozman, Karen Jose and Jose Renzo Delos Santos.` },
  { date: 'Apr 1, 2024', title: 'Spring 2024', tags: ['Update'],
    content: `- We congratulate Mac Reeves, Madelyn Wong, Jonathan Li and Kevin Fong for completion of their undergraduate theses.

- Congratulations to Vaibhav Gupta for successfully completing his Ph.D. qualifying exam.

- After a lot of hard work, we have managed to get the first of the data science servers up and running at Western. These servers are our workhorse, offering significant CPU, GPU and storage for the life-science related data scientists at Western.

- We recently legally protected our approach for identifying breast DCIS patients who would not benefit from radiation therapy, and we are continuing to expand our projects. We recently completed our first sample profiling with the [Akoya PhenoCycler](https://www.akoyabio.com/) assay!

- We are continuing our collaborative work with [Judy Berman's lab](https://www.jbermanlab.com/), Lucy Xie and Rebecca Shapiro related to _Candida albicans_.

- Our team remains highly focused on our combinatorial intervention sequencing (COIN-seq) assay with our first data and manuscripts to appear this year in 2024.

- Our Barbados 2024 - Computational Paradigms in Molecular Biology Revisited workshop was nice. The meeting had a great mix of laboratory and computational scientists of different types.` },
  { date: 'Sep 1, 2023', title: 'Fall 2023', tags: ['Update'],
    content: `- We welcome Mac Reeves to our team. In the context of his undergraduate thesis, Mac is applying the Akoya spatial imaging system to DCIS samples.

- Madelyn Wong is also joining us for her undergraduate thesis. She is working with the Combinatorial Intervention (COIN)-seq team to explore regulators of early events in EMT in early breast carcinoma.

- Jonathan Li joins us from the Department of Computer Science and the Ivey School of Business. Jonathan is modifying the FCOS detection algorithm to enable it to better address issues related to microscopy of Candida albicans.

- Our manuscript that identifies and explores the phenotypic heterogeneity in Candida albicans fungal populations was accepted to eLife (in press).

- We developed new versions of Candescence to identify strains of Candida albicans that have differential survival capacity when grown with mouse macrophages. This collaboration with Leah Cowen's lab (U of Toronto) at the University of Toronto was recently accepted to nBio.

- We received a CIHR project grant in the Spring 2023 competition. This grant will allow us to continue our effort to identify signatures of DCIS patients who will or will not benefit from radiotherapy.

- Thanks to the CFI, a group of bio-data scientists at Western have received funding to build a substantial and secure computing infrastructure to drive our research.

- The next Bellairs Systems Biology meeting (February 2024) is focused on computational methods in biology.` },
  { date: 'Sep 1, 2022', title: 'Semester Start', tags: ['Update'],
    content: `-- We welcome Vaibhav Gupta to the lab as a PhD candidate working on high-throughput perturbation techniques.

-- The lab also welcomes undergraduate Maddy Trim (Honours thesis in Cancer Biology), Remi Sampaleanu (Biochemistry Honours thesis), and Rajan Leung.

-- Our 21st Systems Biology meeting at Bellairs is shaping up. The topic this year is Cells in Space.

-- I am excited to be teaching [BIOCHEMISTRY/PATHOLOGY 4450A The genetic basis of human cancer](https://cancer-genetics-western.netlify.app/) this term.

-- Our first Candescence manuscript appeared in [Microbiology Spectrum](https://journals.asm.org/doi/10.1128/spectrum.01472-22)!

-- Some grants and papers submitted, some reviews back and some new papers to come soon.` },
  { date: 'Aug 1, 2022', title: 'Summertime Update', tags: ['Update'],
    content: `-- We welcome Thomas Qu to the lab as an MSc candidate working on high-throughput perturbation techniques.

-- We also welcome summer research assistants Lauren Chalykoff and Eric Chalykoff who are assisting with breast cancer lab and informatics projects.

-- A thank you to Eliseos John Mucaki for presenting our work at the 2022 London Oncology Research and Education Day.

-- Both [Vanessa Dumeaux](https://lab-dumeaux.science/) and I joined the Department of Oncology at Western, and the Centre for Translational Cancer Research.

-- We have started organizing the 21st Systems Biology meeting at Bellairs. The topic this year is Cells in Space.

-- I am excited to teach BIOCHEMISTRY/PATHOLOGY 4450A "The genetic basis of human cancer" this fall.

-- Our first Candescence manuscript was accepted to Microbiology Spectrum! Appearing soon.` },
  { date: 'Jan 6, 2022', title: 'April start @ Western and Open Positions', tags: ['News'],
    content: `- We are preparing to open our lab at Western in **April, 2022**.

- There are several open positions.

- This includes **MSc and PhD** positions in both lab and computational projects.

- There are also **postdoc and research associate** positions available primarily in the context of breast cancer.

- We are always open to undergraduates interested in rotations and/or summer internships.

Please see the lab and project descriptions as a first step. There is information for applying in join below.` },
  { date: 'Apr 1, 2022', title: 'Arrival at Western', tags: ['News'],
    content: `I started in April at the University of Western Ontario as the Western chair in Bioinformatics within the Department of Biochemistry. I'm happy to be here for many reasons, not the least of which is that my wife [Vanessa Dumeaux](https://lab-dumeaux.science/) finally found a position and can lead her own lab.

In fact, the Schulich School of Medicine and Dentistry has hired quite a few Data Scientists in the past year. We each have specific expertise in different types of biology or diseases, different -omic technologies and different quantitative techniques. We all share the philosophy of modern data science: to maintain a sustained dialogue with large datasets by fluently exploiting computational and statistical tools as our primary means of exploring biological systems.

- Here is how I see things. You have _bioinformatics_ which is largely about building databases, portals and information management systems. You have _computational biology_ which is largely about building new types of analytic approaches. You have _biostatistics_ which is about applying and developing statistical and modelling approaches. **Machine learning** seeps into all aspects of this triumvirate.

- Data scientists in the biomedical domain are people who apply and develop these tools to explore biological datasets. Data scientists need not only apply and develop these tools, but also look carefully at the output and combine that with their knowledge of biological systems to develop sound hypotheses and mature, physiologically relevant models.

- There are many open positions at all levels.` },
  { date: 'Jan 4, 2022', title: 'Retrospective for 2021', tags: ['Retrospective'],
    content: `- I haven't updated the lab site in the past year. The pandemic flew by in a storm of pure, constant work it seems.

- The 2021 Bellairs workshop entitled Encoding and Decoding Function in the Genome was cancelled due to covid-19. We are picking up where we left off for the 2022 workshop.

- Mike Hallett recently presented Candescence at the Candida and Candidiasis 2021 meeting. A version of the talk can be found [here](https://youtu.be/A6VpKFKpZA4).

- The [manuscript](https://www.biorxiv.org/content/10.1101/2021.06.10.445299v1) and [deep learning software](https://osf.io/qdxbp/) for Candescence was recently released.

- Aki Kiribizakis successfully defended his MSc thesis. December.

- Vanessa Dumeaux and I accepted positions at Western University in London, Ontario.` },
  { date: 'Jan 21, 2020', title: 'Retrospective for 2020', tags: ['Retrospective'],
    content: `- Our Emerging Model Systems workshop this year includes approximately 50 researchers who each have a unique non-model model system. January.

- WTF? March.

- In response to covid-19, several of my students and colleagues at Concordia prepared this [primer into the covid-19 literature](https://docs.google.com/presentation/d/1--n2hsdSDbIUQxX1-eynljM457Z-Q1zEDQn7GdcYA8k/edit?usp=sharing).

- It was a great pleasure to speak at the first Canadian Fungal Network meeting. Mike spoke about drug tolerance in Candida albicans. The talk is available [here](https://www.youtube.com/watch?v=udbD0xTuGG8). Van spoke about a deep learning-based tool to recognize Candida albicans morphologies.

- Shawn Simpson successfully completed his MSc where he analyzed the microbiome of the Barbadian coral reef.

- With [Vincent Martin](https://www.concordia.ca/artsci/biology/faculty.html), [Malcolm Whiteway](https://sites.google.com/site/whitewaylab/home) and [Agropur](https://www.agropur.com/fr), we received funding from Genome Canada/Genome Quebec for a synthetic biology application entitled Bioprocess Development for Lactose Valorisation.

- Several members of the lab with [Vanessa Dumeaux](https://lab-dumeaux.science/) created a not-for-profit cooperative entitled SCIEL. The mandate of SCIEL is to bring deep learning-based single cell approaches to market.

- Samira Massahi successfully defended her MSc thesis.` },
  { date: 'Jan 21, 2019', title: 'Retrospective for 2019', tags: ['Retrospective'],
    content: `- We'd like to congratulate our long-time collaborator Vanessa Dumeaux for receiving two start-up grants. Our lab is proud to be collaborating on a PERFORM project entitled **microbe-2-brain** that explores correlations between the gut microbiome, the systemic response, and brain patterns of over-weight individuals undergoing an exercise intervention.

- The second project is a Team Startup/Accelerator grant that will build a **high-resolution map of cancer immunity in HER2+ breast cancer** patients.

- We would also like to congratulate Vicky Brunet who received an NSERC USRA. She joined our lab to work on projects related to the human gut microbiome. April.

- Congratulations to Mathieu Harb, a new master's student in our lab, who received a scholarship from the NSERC CREATE Synthetic Biology program for two years. April.

- Congratulations to Sanny Khurdia for his successful application for a graduate scholarship at the PERFORM centre at Concordia. May.

- My application to Concordia for permission to search for a Tier II Canada Research Chair in Cellular Systems Design was successful. (This eventually led to the hiring of Elena Kuzmin in the Department of Biology.) May.

- Our introduction to bioinformatics course has been shifted from the winter to fall terms. June.` },
  { date: 'Jan 21, 2018', title: 'Retrospective for 2018', tags: ['Retrospective'],
    content: `- Opened a very tiny wet-lab for sample preparation, droplet-isolation techniques and some DIY genomics.

- Mike gives a talk at the [PERFORM centre](https://perform.concordia.ca/). Feb.

- Mike will be at the AACR Annual Meeting, Chicago. April 15-17.

- Vanessa gives a talk at the CR-CHUM, Montreal. March 14.

- Vanessa visits and gives a talk at Radboud University Medical Center Tumor Immunology, Nijmegen. April 19.

- Vanessa participates in the Systems Genetics of Cancer workshop, Portland. Jun 11-13.

- Mike attended the IRIC Symposium on Machine Learning Biological Systems. Many nice talks about how ML is being used in clinical and basic research settings.

- Mike attended RECOMB Comparative Genomics. October.

- With David Walsh (Concordia), we are organizing The Reef Microbiome workshop in Barbados, Jan 26-Feb 2 of 2019.` },
  { date: 'Jan 21, 2017', title: 'Retrospective for 2017', tags: ['Retrospective'],
    content: `- Mike participates in BIRS-CMO Workshop on Challenges and Synergies in the Analysis of Large-Scale Population-Based Biomedical Data, Oaxaca, Mexico. Nov 26 - Dec 1.

- Vanessa starts her new position at [the PERFORM Center](https://www.concordia.ca/research/perform.html). Nov 2017.

- Mike gives a talk at the Department of Biochemistry, Concordia University.

- **Sadiq Saleh** successfully completed his Ph.D. defense.

- Vanessa visits Genomic Health, Redwood City, CA. Feb 20-22.

- Our workshop organized with T. Sorlie (Norway) Cancer and the Immune System, Barbados. Jan 20-27.

- Moved to Concordia Loyola in the [Dept. of Biology](https://www.concordia.ca/artsci/biology.html).` },
  { date: 'Jan 21, 2016', title: 'Retrospective for 2016', tags: ['Retrospective'],
    content: `- Vanessa gives a talk at the Molecular Interception of Disease Symposium, Qatar. Nov 5-6.

- Bjorn Fjukstad (UiT the Arctic University of Norway), visits the lab. Aug 01 - Feb 01.

- Summer students: Jason Da Silva Castanheira, Kaylee Novack, Elizabeth Levitis.

- Shawn Beaulieu, MSc student, starts in the lab. May 01.

- Ilaria Kolobova, Caroline Labelle, and Karla Felix Navarro visit the lab. Jan-May.

- Sadiq Saleh presents his senior seminar at McGill. March 2.

- Mike gives a talk at the University of Toronto. Feb 25.

- Organize with B. Andrews (UoT) Genetic Networks workshop Barbados. Jan 22-29.` },
  { date: 'Jan 21, 2015', title: 'Retrospective for 2015', tags: ['Retrospective'],
    content: `- Mike gives a talk at the Canadian Cancer Research Conference, Montreal. Nov 8-10.

- Vanessa presents a poster at the Canadian Cancer Research Conference, Montreal. Nov 10.

- Sadiq Saleh presents a poster at the Canadian Cancer Research Conference, Montreal. Nov 9.

- Vanessa participates in workshop on Systems Genetics of Cancer, Cambridge. Sep 20-23.

- **Eric Paquet** defends his PhD thesis, Montreal. June 30.

- Systems Biology Symposium: Personalized medicine of Cancer, Montreal. May 28.

- Bjorn Fjukstad (UiT the Arctic University of Norway), visits the lab. Feb 17 - March 2.` },
];

const SOFTWARE_LIST = [
  { name: 'generic_cc', year: 2026, authors: 'M Hallett',
    desc: 'Shared Claude Code infrastructure for the Hallett Lab — agents, rules, and configuration for agentic AI workflows. A starting point for building lab-specific agentic AI environments using Claude Code.',
    links: [['GitHub','https://github.com/hallettmiket/generic_cc']], tags: ['Claude Code','AI','Agents'] },
  { name: 'AIMS', year: 2014, authors: 'E Paquet, M Hallett',
    desc: 'The AIMS (Absolute Intrinsic Molecular Subtype) R/Bioconductor package assigns the five intrinsic molecular subtypes (Luminal A, Luminal B, Her2-enriched, Basal-like, Normal-like) to individual breast cancer samples without dataset-dependent normalization.',
    links: [['Bioconductor','https://www.bioconductor.org/packages/release/bioc/html/AIMS.html'],['GitHub (trainAIMS)','https://github.com/hallettmiket/trainAIMS']], tags: ['R','Bioconductor','Breast cancer'] },
  { name: 'AIPS', year: 2017, authors: 'E Paquet, M Hallett',
    desc: 'Absolute Inference of Patient Signatures. An R package that partitions breast cancer gene expression profiles using 1733 models. Allows absolute single-sample subtype assignment without dataset-level normalization.',
    links: [['GitHub','https://github.com/meoyo/AIPS']], tags: ['R','Breast cancer'] },

  { name: 'STROMA4', year: 2018, authors: 'S Saleh, M Hallett',
    desc: 'Estimates four stromal properties in TNBC patients — T-cells, B-cells, stromal infiltrating epithelial cells, and desmoplasia — from gene expression data.',
    links: [['Bioconductor','https://bioconductor.org/news/bioc_3_5_release/'],['GitHub','https://github.com/hallettmiket/STROMA4']], tags: ['R','Bioconductor','Breast cancer'] },
  { name: 'Candescence', year: 2021, authors: 'V Bettauer, M Hallett',
    desc: 'Deep learning for computational microscopy of the opportunistic human pathogen Candida albicans. Provides automated, quantitative analysis of fungal cell morphologies and phenotypic heterogeneity.',
    links: [['OSF','https://osf.io/qdxbp/'],['GitHub','https://github.com/hallettmiket/candescence']], tags: ['Python','PyTorch','Microscopy'] },
  { name: 'MIxT', year: 2018, authors: 'V Dumeaux, B Fjukstad, M Hallett',
    desc: 'Matched Interaction Across Tissues. A system for exploring and comparing transcriptional profiles from matched tissues across individuals — applied to primary tumors and blood in breast cancer patients.',
    links: [['Web app','http://mixt-blood-tumor.bci.mcgill.ca/'],['GitHub','https://github.com/vdumeaux/mixtR']], tags: ['R','Go','Breast cancer'] },
  { name: 'PREFFECT', year: 2025, authors: 'E Mucaki et al.',
    desc: 'Generative models for transcriptomics data generated from Formalin Fixed Paraffin Embedded (FFPE) samples. Addresses the technical noise introduced by FFPE preservation in archival tumor material.',
    links: [['GitHub','https://github.com/hallettmiket/preffect']], tags: ['Python','PyTorch'] },
  { name: 'COIN-seq', year: 2024, authors: 'M Hallett lab',
    desc: 'Combinatorial Intervention Sequencing — a lentiviral-based CRISPR/Cas9 delivery system for high-throughput combinatorial perturbation with single-cell readout. Enables causal network inference from perturbation data.',
    links: [['GitHub','https://github.com/hallettmiket/coin-seq']], tags: ['Python','R','CRISPR','Single cell'] },
];

const RESEARCH_AREAS = [
  { num: '01', id: 'breast', color: PURPLE,
    title: 'Breast Cancer Genomics & Informatics',
    short: 'From molecular profiling of tumors and DCIS cohorts to expression signatures, subtype classifiers, and clinical decision support.',
    desc: 'We combine next-generation sequencing and spatial omics of clinical breast cancer cohorts with computational methods to build molecular signatures that classify patients, predict prognosis, and guide treatment decisions — particularly in early breast disease (DCIS).',
    funding: ['CIHR','Western','CRC'] },
  { num: '02', id: 'coinseq', color: PURPLE,
    title: 'Combinatorial Intervention Sequencing',
    short: 'High-throughput CRISPR perturbation with single-cell readout to infer causal networks.',
    desc: 'Our COIN-seq platform delivers combinatorial CRISPR/Cas9 perturbations via lentiviral vectors and reads out transcriptional consequences at single-cell resolution. Deep learning models then infer the underlying gene regulatory network.',
    funding: ['NSERC','CIHR','CFI','CRC'] },
  { num: '03', id: 'candida', color: PURPLE,
    title: 'Morphology, Colony Formation and Phenotypic Heterogeneity in Candida albicans',
    short: 'Single-cell profiling and deep-learning morphology analysis for a human fungal pathogen.',
    desc: 'We develop deep learning tools (Candescence) to quantify fungal morphology and colony formation, and use single-cell sequencing to characterize phenotypic heterogeneity and adaptive drug tolerance in C. albicans populations.',
    funding: ['NSERC','CIHR','CRC'] },
  { num: '04', id: 'deeplearning', color: PURPLE,
    title: 'Deep Learning in the Life Sciences',
    short: 'Probabilistic models and neural architectures for molecular and clinical data.',
    desc: 'We develop generative models, variational autoencoders, graph neural networks, and absolute single-sample classifiers for transcriptomics and clinical outcome prediction. Methods are motivated by and applied to our experimental projects.',
    funding: ['NSERC','CFI','CRC','Western'] },
];

const PAPERS = [
  { year: 2026, title: 'Combinatorial intervention sequencing (COIN-seq) for causal network inference in breast epithelial cells', authors: 'Kozman J, Santos J, Hallett M et al.', journal: 'bioRxiv preprint', tags: ['COIN-seq', 'Networks'], links: { preprint: '#', github: '#' } },
  { year: 2025, title: 'Expression signatures predicting radiotherapy benefit in ductal carcinoma in situ: a cohort study', authors: 'Sampaleanu R, Chalykoff L, Hallett M et al.', journal: 'Nature Medicine', tags: ['DCIS', 'Breast cancer'], links: { pdf: '#', pubmed: '#' } },
  { year: 2025, title: 'Single-cell resolution of antifungal drug tolerance in Candida albicans', authors: 'Massahi S, Dumeaux V, Berman J, Hallett M', journal: 'eLife', tags: ['Candida', 'Single cell'], links: { pdf: '#', pubmed: '#', github: '#' } },
  { year: 2024, title: 'Absolute inference of patient signatures (AIPS) for robust breast cancer subtyping', authors: 'Mucaki EJ, Gupta V, Hallett M', journal: 'Bioinformatics', tags: ['Breast cancer', 'Methods'], links: { pdf: '#', pubmed: '#' } },
  { year: 2024, title: 'Candescence: deep learning for quantitative fungal morphology profiling', authors: 'Ahmed A, Tran B, Dumeaux V, Hallett M', journal: 'PLOS Computational Biology', tags: ['Candida', 'Deep learning'], links: { pdf: '#', github: '#' } },
  { year: 2023, title: 'Probabilistic modelling of single-cell multimodal data from perturb-seq assays', authors: 'Leung R, Qu T, Hallett M', journal: 'Cell Systems', tags: ['Single cell', 'Deep learning'], links: { pdf: '#', pubmed: '#', github: '#' } },
];

const CURRENT_MEMBERS = [
  { name: 'Eliseos John Mucaki', role: 'Research Associate', img: 'team/Eliseos_Mucaki.Profile_Photo.jpg',
    desc: 'Eliseos obtained his MSc at the University of Windsor, then spent 13+ years with Dr. Peter Rogan and Dr. Joan Knoll at Western, leading projects on mRNA splice-altering SNPs, prioritization of coding and non-coding mutations in breast cancer genes, analysis of RNAseq data from >10,000 TCGA/ICGC patients, and development of machine learning models for chemotherapy and radiation response. He also developed geostatistical approaches to identify COVID-19 hotspots in Ontario.',
    links: [['Scholar','https://scholar.google.com/citations?user=m0HoqwQAAAAJ'],['Email','mailto:emucaki@uwo.ca']] },
  { name: 'Vaibhav Gupta', role: 'PhD candidate', img: 'team/vaibhav_gupta.jpg',
    desc: 'Vaibhav is a PhD candidate in Biochemistry at Western University (2022–present). He holds a BSc in Biotechnology from Thapar University and an MSc in Life Sciences from Tel Aviv University (2015–2021). His doctoral research focuses on ....',
    links: [['Email','mailto:vgupta88@uwo.ca']] },
  { name: 'Harry Zhang', role: 'MSc candidate', img: 'team/harry.jpg',
    desc: 'Harry is an MSc candidate working on Candescence — developing novel generative deep learning approaches for quantitative morphology profiling of Candida albicans. His work combines computer vision with single-cell biology to characterize fungal phenotypic heterogeneity.',
    links: [['Email','mailto:wzhan564@uwo.ca']] },
  { name: 'Joseph Kozman', role: 'Undergraduate researcher, NSERC USRA', img: 'team/joseph_kozman.jpeg',
    desc: 'Joseph is working on COIN-flow: a genetic perturbation system based on flow cytometry sorting, designed to enable high-throughput CRISPR-based functional screens by coupling perturbation identity with cellular phenotype readouts.',
    links: [['Email','mailto:jkozman@uwo.ca']] },
  { name: 'Noor Simsam', role: 'Research Assistant', img: 'team/noor_simsam.png',
    desc: 'Noor is developing clinical software for integrating molecular expression data with clinicopathological information to calculate individualized radiotherapy benefit scores for women diagnosed with ductal carcinoma in situ (DCIS).',
    links: [] },
];

const ALUMNI_GROUPS = [
  { era: 'Western University (2022–)', members: [
    ['Eric Chalykoff','Summer researcher'],
    ['Lauren Chalykoff','Summer researcher'],
    ['William Conway-Vimier','Undergraduate thesis'],
    ['Yassmin Ibrahim','Undergraduate researcher'],
    ['Julia Jacob','Undergraduate researcher'],
    ['Karen Jose','Undergraduate researcher'],
    ['Rajan Leung','Undergraduate researcher'],
    ['Jonathan Li','Undergraduate thesis, Computer Science'],
    ['Jacob Madeira','Undergraduate researcher'],
    ['Julia Malec','Undergraduate researcher'],
    ['Angel Peng','Undergraduate thesis'],
    ['Rowan Pereira','Undergraduate researcher'],
    ['Thomas Qu','MSc'],
    ['Bhavnit Randhawa','Undergraduate thesis'],
    ['Mac Reeves','Undergraduate thesis'],
    ['Aryamaan Saha','MITACS Globalink Scholar (IIT Madras)'],
    ['Remi Sampaleanu','Undergraduate researcher, NSERC USRA'],
    ['Jose Renzo Delos Santos','Undergraduate researcher'],
    ['Binh Tran','Undergraduate researcher'],
    ['Maddy Trim','Undergraduate thesis'],
    ['Madelyn Wong','Undergraduate thesis'],
    ['Caroline Zhang','Undergraduate researcher'],
  ]},
  { era: 'Concordia University (2017–2022)', members: [
    ['Abdelrahman Ahmed','Genomics Diploma / Research assistant'],
    ['Alexandra Artiaga','Summer researcher'],
    ['Vicky Brunet','NSERC Summer Research Award'],
    ['Vicky Barrera','Undergraduate thesis'],
    ['Van Bettauer','MSc candidate'],
    ['Ilhem Chaima Bousbait','Summer researcher / Undergraduate thesis'],
    ['Brittany French','Research assistant'],
    ['Nadia Haswani','Research assistant'],
    ['Mathieu Harb','MSc candidate'],
    ['Nasim Khosravi','Genomics Diploma'],
    ['Sanny Khurdia','MSc candidate'],
    ['Eftyhios Kirbizakis','MSc candidate'],
    ['Anika van Kooten','Genomics Diploma'],
    ['Samira Massahi','MSc'],
    ['Rasteh Nili','MSc'],
    ['Nicholas Nolan','Summer researcher'],
    ['Suhani Patel','Genomics Diploma'],
    ['Shawn Simpson','MSc candidate'],
    ['W. Tse','Undergraduate thesis'],
    ['Quitian Wang','Undergraduate thesis'],
    ['Samantha Yuen','Undergraduate thesis'],
  ]},
  { era: 'McGill University (2000–2017)', members: [
    ['L. Addario-Barry','MSc'],
    ['Daniel Del Balso','MSc'],
    ['Shawn Beaulieu','Research assistant'],
    ['Margarethe Biong','Visiting researcher'],
    ['Scott Bunnell','Postdoctoral fellow'],
    ['Melanie Busby','PhD'],
    ['Jason Da Silva Castanheira','Summer researcher'],
    ['Daniel Cernea','MSc'],
    ['Gerry Chevalier','Administrator'],
    ['Pablo Cingolani','MSc'],
    ['Mariel Connolly','Summer researcher'],
    ['Sean Cory','MSc & Research assistant'],
    ['Y. Daoudi','MSc'],
    ['Caroline Diorio','Postdoctoral fellow'],
    ['Nicholas Dutil','MSc'],
    ['Johnathan Eidelman','Undergraduate researcher'],
    ['Greg Finak','PhD'],
    ['Dan Fischer','Summer researcher'],
    ['Bjorn Fjukstad','Visiting researcher'],
    ['Martin Fleming','Technical support'],
    ['Oxana Gavrilyuk','Visiting researcher'],
    ['Sara Gosline','MSc & PhD'],
    ['Susanne Groebner','Visiting researcher'],
    ['Jacqueline Hall','Postdoctoral fellow'],
    ['Mireille Hantouche','Visiting researcher'],
    ['Danny Jomaa','Summer researcher'],
    ['Danielle Kemmer','Postdoctoral fellow'],
    ['Ilaria Kobolev','Summer researcher'],
    ['Caroline Labelle','Undergraduate thesis'],
    ['Hege Landemark','Visiting researcher'],
    ['Anna Lee','PhD'],
    ['Peter Lee','PhD'],
    ['Robert Lesurf','MSc & PhD'],
    ['Elizabeth Levitis','Summer researcher'],
    ['Julie Livingstone','Research assistant'],
    ['Guoqing Lu','Postdoctoral fellow'],
    ['Piotr Mankowski','Summer student'],
    ['Lynda Moore','Administrator'],
    ['Sheryl Morrissey','Administrator'],
    ['Carl Murie','MSc'],
    ['Karla Felix Navarro','Undergraduate thesis'],
    ['Kaylee Novack','Summer researcher'],
    ['John Ozcelik','MSc'],
    ['Eric Paquet','PhD'],
    ['Francois Pepin','MSc & PhD'],
    ['Ted Perkins','Postdoctoral fellow'],
    ['Sebastien Provencher','Researcher'],
    ['Z. Rajabi','MSc'],
    ['Charlotta Rylander','Visiting researcher'],
    ['Sadiq Saleh','PhD'],
    ['Cedric Sam','Research assistant'],
    ['Michelle Scott','PhD'],
    ['Solmaz Shahalizadeh','MSc'],
    ['Kaleigh Smith','MSc'],
    ['Junshu Song','Summer researcher'],
    ['V. Srivastava','MSc'],
    ['Matthew Suderman','Research associate'],
    ['M. Takane','MSc'],
    ['Z. Tang','MSc'],
    ['Zhe Tian','Summer researcher'],
    ['Ali Tofigh','Postdoctoral fellow'],
    ['Cordia Tsoi','Summer researcher'],
    ['Kaveh Vakili','Research assistant'],
    ['Indrani Vasudeva-Murthy','Research associate'],
    ['Julian Xue','Summer researcher'],
  ]},
];

// ── HOME PAGE ──────────────────────────────────────────────────────────────────

const HomePage = ({ navigate }) => (
  <div>
    <div style={{ background: WARM_BG, borderBottom: `1px solid ${BORDER}`, padding: '40px 28px 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'center' }}>
        <img src="assets/images/site/lab-logo-hi-res.jpg" alt="Hallett Lab" style={{ width: 130, height: 130, objectFit: 'cover', borderRadius: 4, flexShrink: 0, border: `1px solid ${BORDER}` }} />
        <div>
          <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 34, fontWeight: 400, color: TEXT, lineHeight: 1.25, margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            Experimental &amp; analytic approaches<br />to perturbing biological systems.
          </h1>
          <p style={{ fontSize: 13, color: MUTED, margin: '0 0 18px' }}>Department of Biochemistry · Western University · London, Ontario, Canada</p>
        </div>
      </div>
    </div>

    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: 0 }}>
      <div style={{ padding: '28px 28px 28px 0', borderRight: `1px solid ${BORDER}` }}>
        <SectionHead>Blog</SectionHead>
        {BLOG_POSTS.slice(0, 5).map((p, i) => (
          <div key={i} onClick={() => navigate('blog')} style={{ padding: '12px 0', borderBottom: i < BLOG_POSTS.length - 1 ? `1px solid ${BORDER}` : 'none', cursor: 'pointer' }}>
            <div style={{ fontSize: 11, color: MUTED, fontFamily: "'Courier Prime', monospace", marginBottom: 3 }}>{p.date}</div>
            <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.45, marginBottom: 5, textWrap: 'pretty' }}>{p.title}</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
          </div>
        ))}
        <div style={{ marginTop: 14 }}><span onClick={() => navigate('blog')} style={{ fontSize: 12, color: PURPLE, cursor: 'pointer', fontWeight: 600 }}>All posts →</span></div>
      </div>
      <div style={{ padding: '28px 0 28px 28px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <SectionHead>Lab Images</SectionHead>
          <Carousel navigate={navigate} />
        </div>
        <div>
          <SectionHead>Research</SectionHead>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {RESEARCH_AREAS.map(a => (
              <div key={a.num} onClick={() => { navigate('research'); setTimeout(() => window.__setResearchDetail && window.__setResearchDetail(a.id), 50); }} style={{ background: a.color === PURPLE ? '#f3eef9' : '#f0ebfa', border: `1px solid ${a.color === PURPLE ? '#d4c5ed' : '#c9aaef'}`, padding: '12px', cursor: 'pointer' }}
                   onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                   onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: a.color, fontWeight: 700, marginBottom: 3 }}>{a.num}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, lineHeight: 1.35, marginBottom: 3, textWrap: 'pretty' }}>{a.title}</div>
                <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>{a.short}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}><span onClick={() => navigate('research')} style={{ fontSize: 12, color: PURPLE, cursor: 'pointer', fontWeight: 600 }}>Full overview & papers →</span></div>
        </div>
      </div>
    </div>

    {/* Contact strip */}
    <div style={{ borderTop: `2px solid ${BORDER}`, background: WARM_BG, padding: '32px 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
        <div>
          <SectionHead>Location</SectionHead>
          <div style={{ fontSize: 13, color: TEXT, lineHeight: 2.1 }}>
            Office: MSB-360 · Wet labs: M359A &amp; M433<br />1151 Richmond St<br />London, ON N6A 3K7, Canada
          </div>
        </div>
        <div>
          <SectionHead>Contact</SectionHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Email','mailto:michael.hallett@uwo.ca','michael.hallett@uwo.ca'],['Bluesky','https://bsky.app/profile/hallettmiket.bsky.social','@hallettmiket.bsky.social'],['GitHub','https://github.com/hallettmiket','hallettmiket'],['OSF','https://osf.io/jz64u/','osf.io/jz64u']].map(([label,href,val]) => (
              <div key={label} style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: MUTED, minWidth: 48, textTransform: 'uppercase', letterSpacing: '0.5px', paddingTop: 2 }}>{label}</span>
                <a href={href} target="_blank" style={{ fontSize: 13, color: PURPLE, textDecoration: 'none' }}>{val}</a>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHead>Affiliations</SectionHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <a href="https://www.schulich.uwo.ca/biochem/" target="_blank">
              <img src="assets/images/site/Schulich_horizontal_CMYK.png" alt="Schulich Medicine & Dentistry" style={{ height: 32 }} />
            </a>
            <a href="https://www.uwo.ca/" target="_blank">
              <img src="assets/images/site/western_longWhite.png" alt="Western University" style={{ height: 30 }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── RESEARCH PAGE ──────────────────────────────────────────────────────────────

const ResearchPage = ({ navigate }) => {
  const [detail, setDetail] = React.useState(null);

  React.useEffect(() => {
    window.__setResearchDetail = (id) => setDetail(id);
    return () => { delete window.__setResearchDetail; };
  }, []);

  if (detail === 'breast') return <ResearchDetailBreast onBack={() => setDetail(null)} />;
  if (detail === 'coinseq') return <ResearchDetailCoinSeq onBack={() => setDetail(null)} />;
  if (detail === 'candida') return <ResearchDetailCandida onBack={() => setDetail(null)} />;
  if (detail === 'deeplearning') return <ResearchDetailDeepLearning onBack={() => setDetail(null)} />;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 28px 60px' }}>
      <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 6px', letterSpacing: '-0.5px' }}>Research</h1>
      <p style={{ fontSize: 13, color: MUTED, margin: '0 0 28px' }}>Experimental &amp; analytic approaches to perturbing biological systems</p>

      <div style={{ background: WARM_BG, border: `1px solid ${BORDER}`, padding: '20px 22px', marginBottom: 36 }}>
        <SectionHead>What the lab is like</SectionHead>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: TEXT, margin: '0 0 12px' }}>
          We maintain both wet (benchwork 🥽🧫) and dry (computational 💻) labs. Everyone is encouraged to do at least a little of both, and we actively support cross-training. Much of our work is based on modern <em>-omics</em> technologies including single-cell profiling and lentiviral-based CRISPR/Cas9 perturbation delivery. We are committed to a diverse, equitable and inclusive environment.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: TEXT, margin: '0 0 14px' }}>
          We are tightly integrated with the <a href="https://lab-dumeaux.science/" target="_blank" style={{ color: PURPLE, fontWeight: 600 }}>Vanessa Dumeaux lab</a> in the Department of Anatomy and Cell Biology at Western University. We share space, equipment, and frequently co-supervise students and projects.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => navigate('join')} style={{ background: PURPLE, color: '#fff', border: 'none', padding: '7px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Join the Lab</button>
          <button onClick={() => navigate('ethos')} style={{ background: 'none', color: PURPLE, border: `1px solid ${PURPLE}`, padding: '7px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Lab Ethos →</button>
        </div>
      </div>

      {RESEARCH_AREAS.map((area) => (
        <div key={area.num} style={{ padding: '28px 0', borderTop: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: '160px 1fr', gap: 28 }}>
          <div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 28, fontWeight: 700, color: area.color, lineHeight: 1, marginBottom: 8 }}>{area.num}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
              {area.funding.map(f => FUNDING_LOGOS[f]
                ? <img key={f} src={FUNDING_LOGOS[f]} alt={f} title={f} style={{ height: 24, objectFit: 'contain', background: '#fff', padding: 2, borderRadius: 2 }} />
                : <span key={f} style={{ fontSize: 10, background: '#eee', padding: '2px 6px', color: '#555', borderRadius: 1 }}>{f}</span>
              )}
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 23, fontWeight: 600, color: TEXT, margin: '0 0 8px', letterSpacing: '-0.3px' }}>{area.title}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: TEXT, margin: '0 0 14px' }}>{area.desc}</p>
            <button onClick={() => setDetail(area.id)}
              style={{ background: 'none', color: PURPLE, border: `1.5px solid ${PURPLE}`, padding: '6px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
              Read more →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── TEAM PAGE ──────────────────────────────────────────────────────────

const MemberProfile = ({ member, onBack }) => (
  <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 28px 60px' }}>
    <button onClick={onBack} style={{ background: 'none', border: 'none', color: PURPLE, cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 28, padding: 0 }}>← Back to Team</button>
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', marginBottom: 32, padding: '24px', background: WARM_BG, border: `1px solid ${BORDER}` }}>
      <MemberImg src={GH_IMG + member.img} name={member.name} style={{ width: 120, height: 150, flexShrink: 0, border: `1px solid ${BORDER}` }} />
      <div>
        <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 30, fontWeight: 600, color: PURPLE, margin: '0 0 4px' }}>{member.name}</h1>
        <div style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>{member.role} · Hallett Lab · Western University</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {member.links.map(([label, href]) => (
            <a key={label} href={href} target="_blank" style={{ fontSize: 11, color: PURPLE, border: `1px solid ${PURPLE}`, padding: '4px 10px', textDecoration: 'none', fontWeight: 600 }}>{label}</a>
          ))}
        </div>
      </div>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT }}>{member.desc}</p>
  </div>
);

const TeamPage = ({ navigate }) => {
  const [selectedMember, setSelectedMember] = React.useState(null);
  if (selectedMember) return <MemberProfile member={selectedMember} onBack={() => setSelectedMember(null)} />;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 28px 60px' }}>
      <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 28px', letterSpacing: '-0.5px' }}>People</h1>

      {/* PI */}
      <div style={{ display: 'flex', gap: 28, padding: '24px', background: WARM_BG, border: `1px solid ${BORDER}`, marginBottom: 36 }}>
        <img src="assets/images/site/IMG_2776.jpeg" alt="Michael Hallett" style={{ width: 110, height: 130, objectFit: 'cover', objectPosition: 'center top', flexShrink: 0, border: `1px solid ${BORDER}` }} />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 28, fontWeight: 600, color: PURPLE, margin: '0 0 4px' }}>Michael Hallett</h2>
          <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>Principal Investigator · Professor, Department of Biochemistry<br />Western University Research Chair in Bioinformatics<br />Department of Oncology (Adjunct) · Centre for Translational Cancer Research · Centre for Health Data Science</div>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: TEXT, margin: '0 0 14px' }}>
            PhD (Computer Science, University of Victoria, 1996). Previously at ETH Zürich, McGill University (2000–2017), and Concordia University (2018–2021). Western University (2022-). Alexander von Humboldt Fellow, Canada Research Chair Tier 1.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[['michael.hallett@uwo.ca','mailto:michael.hallett@uwo.ca'],['Google Scholar','https://scholar.google.com/citations?user=aSl0gXwAAAAJ'],['Bluesky','https://bsky.app/profile/hallettmiket.bsky.social'],['GitHub','https://github.com/hallettmiket'],['OSF','https://osf.io/jz64u/'],['LinkedIn','https://www.linkedin.com/in/michael-hallett-27411991/']].map(([label,href]) => (
              <a key={label} href={href} target="_blank" style={{ fontSize: 11, color: PURPLE, border: `1px solid ${PURPLE}`, padding: '4px 10px', textDecoration: 'none', fontWeight: 600 }}>{label}</a>
            ))}
          </div>
        </div>
      </div>

      <SectionHead>Current Members</SectionHead>
      <p style={{ fontSize: 12, color: MUTED, marginBottom: 14 }}>Click a member to view their profile.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 40 }}>
        {CURRENT_MEMBERS.map((m, i) => (
          <div key={i} onClick={() => setSelectedMember(m)}
               style={{ border: `1px solid ${BORDER}`, background: '#fff', cursor: 'pointer' }}
               onMouseEnter={e => e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.1)'}
               onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <MemberImg src={GH_IMG + m.img} name={m.name} style={{ width: '100%', aspectRatio: '1' }} />
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 2 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 4 }}>{m.role}</div>
              <div style={{ fontSize: 11, color: PURPLE, fontWeight: 600 }}>View profile →</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHead>Alumni</SectionHead>
      <p style={{ fontSize: 13, color: MUTED, marginBottom: 24 }}>The lab has trained more than 100 students, postdocs, and research scientists across McGill, Concordia, and Western University.</p>
      {ALUMNI_GROUPS.map(group => (
        <div key={group.era} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: PURPLE, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10, paddingBottom: 6, borderBottom: `2px solid #d4c5ed` }}>{group.era}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px 16px' }}>
            {group.members.map(([alumName, alumRole]) => (
              <div key={alumName} style={{ padding: '5px 0', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 13, color: TEXT }}>{alumName}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{alumRole}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── BLOG PAGE ──────────────────────────────────────────────────────────────────

const BlogPage = () => {
  const [selected, setSelected] = React.useState(null);
  React.useEffect(() => {
    if (!document.getElementById('bsky-embed-script')) {
      const s = document.createElement('script');
      s.id = 'bsky-embed-script';
      s.src = 'https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js';
      s.type = 'module'; s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  if (selected !== null) {
    const post = BLOG_POSTS[selected];
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 28px 60px' }}>
        <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: PURPLE, cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 28, padding: 0 }}>← Back to Blog</button>
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 12, color: MUTED, marginBottom: 6 }}>{post.date}</div>
        <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 32, fontWeight: 400, color: TEXT, margin: '0 0 12px', letterSpacing: '-0.3px', lineHeight: 1.25 }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, alignItems: 'center' }}>
          {post.tags.map(t => <Tag key={t}>{t}</Tag>)}
          {post.slides && <a href={post.slides} target="_blank" style={{ fontSize: 12, color: PURPLE, fontWeight: 600, border: `1px solid ${PURPLE}`, padding: '3px 10px', textDecoration: 'none', marginLeft: 8 }}>Slides →</a>}
          {post.video && <a href={post.video} target="_blank" style={{ fontSize: 12, color: PURPLE, fontWeight: 600, border: `1px solid ${PURPLE}`, padding: '3px 10px', textDecoration: 'none', marginLeft: 8 }}>Video →</a>}
        </div>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24 }}>
          <MdContent text={post.content} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 28px 60px' }}>
      <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 32px', letterSpacing: '-0.5px' }}>Blog</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 48 }}>
        <div>
          {BLOG_POSTS.map((post, i) => (
            <div key={i} style={{ padding: '22px 0', borderTop: `1px solid ${BORDER}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 20 }}>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 12, color: MUTED, paddingTop: 2 }}>{post.date}</div>
                <div>
                  <h2 onClick={() => setSelected(i)}
                      style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 600, color: TEXT, margin: '0 0 8px', lineHeight: 1.35, textWrap: 'pretty', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.color = PURPLE}
                      onMouseLeave={e => e.currentTarget.style.color = TEXT}>{post.title}</h2>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {post.tags.map(t => <Tag key={t}>{t}</Tag>)}
                    {post.slides && <a href={post.slides} target="_blank" style={{ fontSize: 10, color: PURPLE, fontWeight: 600, border: `1px solid ${PURPLE}`, padding: '2px 7px', textDecoration: 'none', borderRadius: 1 }}>Slides</a>}
                    {post.video && <a href={post.video} target="_blank" style={{ fontSize: 10, color: PURPLE, fontWeight: 600, border: `1px solid ${PURPLE}`, padding: '2px 7px', textDecoration: 'none', borderRadius: 1 }}>Video</a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <SectionHead>Bluesky</SectionHead>
          <div dangerouslySetInnerHTML={{ __html: '<bsky-embed username="hallettmiket.bsky.social" limit="3" mode="light"></bsky-embed>' }} />
        </div>
      </div>
    </div>
  );
};

// ── SOFTWARE PAGE ──────────────────────────────────────────────────────────────

const LEGACY_SOFTWARE = [
  { name: 'HERA', year: 2004, authors: 'M Scott, M Hallett',
    desc: 'A curated database of human genes encoding proteins in the Endoplasmic Reticulum.',
    links: [['Paper (Bioinformatics 2004)','https://academic.oup.com/bioinformatics/article/20/16/2870/238745']] },
  { name: 'PSLT', year: 2004, authors: 'M Scott, M Hallett',
    desc: 'Protein Subcellular Localization Tool (pronounced “silt”). Uses a naive Bayes’ approach to predict protein subcellular localization.',
    links: [['Paper (Genome Research 2004)','https://genome.cshlp.org/content/14/10b/2225']] },
  { name: 'BreSect', year: 2014, authors: 'A Tofigh, M Suderman, M Hallett',
    desc: 'Examination of prognostic gene signatures across a large compendium of gene expression profiles of clinical invasive ductal carcinoma.',
    links: [['PDF','#']] },
  { name: 'git-raw', year: 2015, authors: 'A Tofigh',
    desc: 'A Git plug-in for managing large and binary files such as next-generation sequencing data alongside source code.',
    links: [['GitHub','https://github.com/atofigh/git-raw']] },
  { name: 'BIAS', year: 2004, authors: 'Finak G, Godin N, Pepin F, Rajabi Z, Srivastava V, Tang Z',
    desc: 'Bioinformatics Integrative Application Software. A platform for integrating and analyzing heterogeneous biological datasets.',
    links: [['Website','http://www.mcb.mcgill.ca/~bias']] },
  { name: 'DARWIN 2.0', year: 2000, authors: 'Korostensky C, Gonnet G',
    desc: 'A programming language for the biosciences, designed for biological sequence and data analysis.',
    links: [['Website','http://cbrg.inf.ethz.ch']] },
  { name: 'BioOpera', year: 2000, authors: 'Alonso G, Bausch W, Kahn A, Pautasso C',
    desc: 'A Process Support System for the Biosciences, providing workflow management for biological data analysis pipelines.',
    links: [['Website','http://www.inf.ethz.ch/~bausch']] },
];

const SoftwarePage = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 28px 60px' }}>
    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 8px', letterSpacing: '-0.5px' }}>Software</h1>
    <p style={{ fontSize: 13, color: MUTED, marginBottom: 32 }}>Open-source tools developed in the Hallett Lab.</p>
    {SOFTWARE_LIST.map((sw, i) => (
      <div key={i} style={{ padding: '24px 0', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
          <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 600, color: PURPLE, margin: 0 }}>{sw.name}</h2>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "'Courier Prime', monospace" }}>{sw.year} · {sw.authors}</span>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: TEXT, margin: '0 0 10px' }}>{sw.desc}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {sw.tags.map(t => <Tag key={t} color={MUTED}>{t}</Tag>)}
          <div style={{ flexGrow: 1 }} />
          {sw.links.map(([label, href]) => <a key={label} href={href} target="_blank" style={{ fontSize: 12, color: PURPLE, fontWeight: 600, border: `1px solid ${PURPLE}`, padding: '4px 10px', textDecoration: 'none' }}>{label}</a>)}
        </div>
      </div>
    ))}

    <div style={{ marginTop: 48, paddingTop: 32, borderTop: `2px solid ${BORDER}` }}>
      <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: TEXT, margin: '0 0 6px' }}>Legacy Software</h2>
      <p style={{ fontSize: 13, color: MUTED, marginBottom: 24 }}>These tools are no longer actively maintained.</p>
      {LEGACY_SOFTWARE.map((sw, i) => (
        <div key={i} style={{ padding: '16px 0', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
            <h3 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 600, color: MUTED, margin: 0 }}>{sw.name}</h3>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "'Courier Prime', monospace" }}>{sw.year} · {sw.authors}</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: MUTED, margin: '0 0 8px' }}>{sw.desc}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {sw.links.map(([label, href]) => <a key={label} href={href} target="_blank" style={{ fontSize: 12, color: MUTED, border: `1px solid ${BORDER}`, padding: '3px 8px', textDecoration: 'none' }}>{label}</a>)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── COURSES PAGE ───────────────────────────────────────────────────────────────

const CoursesPage = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 28px 60px' }}>
    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 8px', letterSpacing: '-0.5px' }}>Courses</h1>
    <p style={{ fontSize: 13, color: MUTED, marginBottom: 32 }}>Courses taught by Dr. Hallett at Western University.</p>
    {[
      { code: 'BIOCHEM 9552', level: 'Graduate · 2024–present', credits: '0.5 credits',
        title: 'Quantitative Approaches in the Biomedical Sciences',
        desc: 'Quantitative approaches are now ubiquitous throughout biomedical research. This course provides biochemistry graduate students with efficient training in quantitative tools regardless of prior background. Topics include programming, software development, statistics, modelling, visualization, AI, data cleaning, and generative modelling. Enrollment spans both Fall and Winter terms.',
        link: null },
      { code: 'MEDSCIEN 3991A', level: 'Undergraduate · 2025–present', credits: null,
        title: 'Bioinformatics',
        desc: 'A survey course introducing medical science students to bioinformatics concepts and tools. Covers sequence analysis, transcriptomics, genome-scale data, and practical computational skills for students without a strong programming background.',
        link: 'https://westerncalendar.uwo.ca/Courses.cfm?CourseAcadCalendarID=MAIN_031458_1&SelectedCalendar=Live&ArchiveID=',
        linkLabel: 'Western Academic Calendar →' },
      { code: 'BIOCHEM/PATH 4450A', level: 'Undergraduate · 2022–present', credits: null,
        title: 'Molecular Genetics of Human Cancer',
        desc: 'A comprehensive treatment of the molecular basis of cancer — from oncogenes and tumour suppressors to genomic instability and therapeutic targeting. Draws on current research literature and emphasizes quantitative reasoning about cancer as a genetic and evolutionary disease.',
        link: 'https://www.schulich.uwo.ca/biochem/undergraduate/course_information.html',
        linkLabel: 'Course information (Schulich) →' },
    ].map((c, i) => (
      <div key={i} style={{ padding: '24px 0', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 6, flexWrap: 'wrap', alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 12, color: PURPLE, fontWeight: 700 }}>{c.code}</span>
          <span style={{ fontSize: 11, color: MUTED }}>{c.level}</span>
          {c.credits && <span style={{ fontSize: 11, color: MUTED }}>· {c.credits}</span>}
        </div>
        <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: TEXT, margin: '0 0 8px' }}>{c.title}</h2>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: TEXT, margin: '0 0 8px' }}>{c.desc}</p>
        {c.link && <a href={c.link} target="_blank" style={{ fontSize: 12, color: PURPLE, fontWeight: 600 }}>{c.linkLabel}</a>}
      </div>
    ))}
  </div>
);

// ── BARBADOS PAGE ──────────────────────────────────────────────────────────────

const BarbadosPage = () => {
  const [open, setOpen] = React.useState(null);
  const workshops = window.BARBADOS_WORKSHOPS || [];

  const Person = ({ name, inst }) => {
    const mem = inst && inst.toLowerCase().includes('in memoriam');
    return (
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{mem ? '🕯 ' : ''}{name}{mem ? <span style={{ fontSize: 10, color: '#c44', marginLeft: 6, fontStyle: 'italic' }}>in memoriam</span> : null}</div>
        <div style={{ fontSize: 11, color: MUTED }}>{inst ? inst.replace(/\s*\(?in memoriam\)?\s*/gi,'').trim() : ''}</div>
      </div>
    );
  };

  const Invitee = ([name, inst]) => {
    const mem = inst && inst.toLowerCase().includes('in memoriam');
    return (
      <div key={name} style={{ borderBottom: `1px solid ${BORDER}`, padding: '4px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{mem ? '🕯 ' : ''}{name}{mem ? <span style={{ fontSize: 9, color: '#c44', marginLeft: 5, fontStyle: 'italic' }}>in memoriam</span> : null}</div>
        <div style={{ fontSize: 10, color: MUTED }}>{inst ? inst.replace(/\s*\(?in memoriam\)?\s*/gi,'').trim() : ''}</div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 28px 60px' }}>
      <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 8px', letterSpacing: '-0.5px' }}>Bellairs Systems Biology Workshops</h1>
      <p style={{ fontSize: 14, color: MUTED, margin: '0 0 8px', lineHeight: 1.7 }}>
        Since 2001, the Hallett Lab has organized an annual systems biology workshop at the{' '}
        <a href="https://www.mcgill.ca/bellairs/" target="_blank" style={{ color: PURPLE }}>McGill-Bellairs Research Station</a> in Barbados.
        Each year 40–50 researchers gather for an intensive week of discussion, collaboration, and forward-looking science.
      </p>
      <p style={{ fontSize: 13, color: MUTED, margin: '0 0 28px' }}>Click any workshop to expand details.</p>

      {workshops.map((w, i) => {
        const taken = new Set([...w.committee.map(c => c[0]), ...(w.scientific||[]).map(s => s[0]), ...(w.organizers||[]).map(o => o[0])]);
        const invitees = w.invitees.filter(([name]) => !taken.has(name));
        return (
          <div key={w.num} style={{ borderTop: `1px solid ${BORDER}` }}>
            <div onClick={() => setOpen(open === i ? null : i)}
                 style={{ padding: '16px 0', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 16 }}
                 onMouseEnter={e => e.currentTarget.style.background = '#f5f1fc'}
                 onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 12, fontWeight: 700, color: PURPLE, minWidth: 28 }}>{w.num}</span>
              <span style={{ fontSize: 11, color: MUTED, minWidth: 48, fontFamily: "'Courier Prime', monospace" }}>{w.year}</span>
              <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 18, fontWeight: 600, color: TEXT, flex: 1 }}>{w.title}</span>
              <span style={{ fontSize: 12, color: MUTED }}>{open === i ? '▲' : '▼'}</span>
            </div>
            {open === i && (
              <div style={{ padding: '0 0 28px 44px' }}>
                <div style={{ fontSize: 11, color: MUTED, fontFamily: "'Courier Prime', monospace", marginBottom: 12 }}>{w.dates}</div>
                <div style={{ display: 'grid', gridTemplateColumns: w.img ? '180px 1fr' : '1fr', gap: 20, marginBottom: 20 }}>
                  {w.img && <img src={w.img} alt={w.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 2, border: `1px solid ${BORDER}` }} onError={e => e.target.style.display='none'} />}
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: TEXT, margin: 0, textWrap: 'pretty' }}>{w.desc}</p>
                </div>
                {w.groupImg && <img src={w.groupImg} alt={`${w.title} group photo`} style={{ width: '100%', height: 'auto', borderRadius: 2, border: `1px solid ${BORDER}`, marginBottom: 20, display: 'block' }} onError={e => e.target.style.display='none'} />}
                <div style={{ display: 'grid', gridTemplateColumns: (w.organizers && w.scientific) ? '1fr 1fr 1fr 2fr' : (w.organizers || w.scientific) ? '1fr 1fr 2fr' : '1fr 2fr', gap: 24 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}>Committee</div>
                    {w.committee.map(([n,inst]) => <Person key={n} name={n} inst={inst} />)}
                  </div>
                  {w.scientific && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}>Scientific Committee</div>
                      {w.scientific.map(([n,inst]) => <Person key={n} name={n} inst={inst} />)}
                    </div>
                  )}
                  {w.organizers && (
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}>Organizers</div>
                      {w.organizers.map(([n,inst]) => <Person key={n} name={n} inst={inst} />)}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}>Invitees ({invitees.length})</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
                      {invitees.map(Invitee)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ borderTop: `1px solid ${BORDER}` }} />
    </div>
  );
};

// ── ETHOS PAGE ─────────────────────────────────────────────────────────────────

const EthosPage = () => {
  const sections = [
    { title: 'Our Ethos', color: PURPLE, items: [
      'Our goal is to facilitate the construction of new tools and methods, and to use these tools to discover new biology — particularly approaches that promise clinical relevance.',
      'We are a team that works towards scientific goals and believes in peer review and the value of public discourse.',
      'We believe in open science where data, software, results and analyses are publicly available in a timely manner.',
      'We believe that open access extends to biotechnologies, assays, reagents, and other items — anything needed to explore and further science.',
      'We believe that science should be conducted mindfully, considering our society, our community, our group, and the individual.',
      'We respect the sanctity of samples whether from humans, model organisms, or the environment. All creatures great, small, and transgenically altered.',
      'We are dedicated to using our funding in the most efficient and impactful way possible, and respect the contribution of government organizations, not-for-profit agencies, and individual donors.',
    ]},
    { title: "Mike's Commitments to the Lab", color: PURPLE, items: [
      'To provide good ideas and starting points for projects; provide guidance throughout.',
      'To allow you — within practical constraints — to explore projects that are of most interest to you.',
      'To provide training in project planning, execution, communication, and relevant technical assays and analytic approaches.',
      'To provide an environment where ethical behavior is expected and where interpersonal conflicts are handled professionally.',
      'To facilitate a diverse, inclusive environment and address any special needs of each individual.',
      'To provide detailed, concrete feedback on your work within reasonable timeframes.',
      'To provide funding for conference attendance, society memberships, salary/stipend, research materials, and computational resources.',
      'To ensure all necessary laboratory safety training and that the lab operates within safety requirements.',
      'To provide career advice, mentoring, and a graceful exit from your position — provided there is sufficient prior notice.',
      'To provide accurate letters of reference that reflect your performance, skills, and interactions with the group.',
      'To arbitrate on authorship following International Committee of Medical Journal Editors (ICMJE) guidelines — when in doubt, include.',
    ]},
    { title: 'Your Responsibilities', color: TIGER, items: [
      'To do the absolute best science you can and choose projects with positive impact.',
      'To understand that science is part of society and plays a role as both educator and employer.',
      'To participate in weekly group meetings and present your work several times per year.',
      'To prepare for weekly check-ins with Mike to review progress, timelines, and plans.',
      'To follow our technology strategy (Slack, GitHub, notebooks) for sharing manuscripts, data, and software.',
      'To proactively ensure you have all laboratory safety training necessary for your project.',
      'To assist in the preparation of manuscripts, presentations, and theses of your lab mates.',
      'To apply for scholarships — this contributes to the sustainability of the lab for future members.',
      'To assist with grant writing, especially when related to your own project.',
      'To inform Mike if you do not feel you are getting the training you need, or feel marginalized in some manner.',
      'To communicate if you are experiencing personal difficulties — there are confidential means of doing this.',
      'To represent the lab professionally and respect the confidentiality of collaborators\' projects and data.',
      'To mindfully consider the choice of publication venue, considering quality, open access, and cost.',
      'To know your rights as a student and the resources offered by the University for physical and mental health care.',
    ]},
  ];

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 28px 80px' }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 32 }}>
        <img src="assets/images/site/lab-logo-hi-res.jpg" alt="Hallett Lab" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 2, border: `1px solid ${BORDER}` }} />
        <div>
          <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 4px', letterSpacing: '-0.5px' }}>Lab Ethos</h1>
          <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>The axioms of our lab — version 1.0 · M. Hallett</p>
        </div>
      </div>

      <div style={{ background: '#f3eef9', border: `1px solid #d4c5ed`, padding: '18px 22px', marginBottom: 40, fontSize: 13, lineHeight: 1.75, color: TEXT }}>
        This document describes the values, commitments, and responsibilities that define how we work together. It applies to everyone in the lab — from undergraduate thesis students to postdoctoral fellows. It is a living document and will evolve as our community grows.
        <br /><br />
        We have heavily borrowed from the excellent example of <a href="https://personal.broadinstitute.org/anne/lab_policy.html" target="_blank" style={{ color: PURPLE }}>Anne Carpenter's lab policy</a> at the Broad Institute, to whom we are very grateful.
      </div>

      {sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, background: sec.color, borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 28, fontWeight: 600, color: TEXT, margin: 0 }}>{sec.title}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {sec.items.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: sec.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>{ii + 1}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: TEXT, margin: 0, textWrap: 'pretty' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── AI IN THE LAB PAGE ─────────────────────────────────────────────────────────
// Adapted from the department-wide draft "Using AI Well in Biochemistry"
// (October 2026), written with murmurent's agents and checked by them.

const AIPage = () => {
  const serif = "'EB Garamond', Georgia, serif";
  const A = ({ href, children }) => <a href={href} target="_blank" rel="noopener" style={{ color: PURPLE }}>{children}</a>;
  const H2 = ({ children, color = PURPLE }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '44px 0 16px' }}>
      <div style={{ width: 4, height: 28, background: color, borderRadius: 2 }} />
      <h2 style={{ fontFamily: serif, fontSize: 28, fontWeight: 600, color: TEXT, margin: 0 }}>{children}</h2>
    </div>
  );
  const P = ({ children }) => <p style={{ fontSize: 15, lineHeight: 1.75, color: TEXT, margin: '0 0 14px', textWrap: 'pretty' }}>{children}</p>;
  const Items = ({ items, ordered }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map(([lead, rest], i) => (
        <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: ordered ? PURPLE : TIGER, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>{ordered ? i + 1 : ''}</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: TEXT, margin: 0, textWrap: 'pretty' }}><strong>{lead}</strong> {rest}</p>
        </div>
      ))}
    </div>
  );

  const uses = [
    ['Study:', 'generate practice questions for an exam, then quiz you on the ones you miss.'],
    ['New methods:', 'search the literature for a method that complements yours, then build a tutorial on it, on the spot, at your level.'],
    ['Rules and law:', 'explain the legal or ethics questions in a complicated case, such as a data-sharing agreement, in hours rather than weeks, so your conversation with the right office starts well informed.'],
    ['Equity:', 'scan a draft for EDID issues and for SGBA (sex- and gender-based analysis: whether sex and gender were considered in design and reporting), and highlight what you might have missed.'],
    ['Craft:', 'sketch diagrams, illustrations, animations, narration and slides, and refine how your work looks and sounds.'],
    ['Place and language:', 'adapt your work for another language or audience, or find the local rules, resources and communities that bear on your project.'],
    ['Computing:', 'install software, set up an analysis environment or reach a server in minutes, work that once needed an IT specialist and days of waiting.'],
  ];
  const habits = [
    ['Give it context first.', 'Before you ask anything, link in the manuscript, the data description, the related papers and the slides. An empty session guesses; a briefed one works from your science.'],
    ['Work in rounds.', 'Start broad, inspect the result, then refine. One giant prompt that expects perfection the first time rarely gets it.'],
    ['Use controls.', 'You would not trust an assay without them, and AI deserves the same. Give it a question you already know the answer to, and a case that should fail, and see whether it gets both right before you trust it on the case you care about. A shuffled dataset, a known positive, a planted error: the same controls you use at the bench.'],
    ['Check every claim, number and citation.', 'AI invents references and makes confident errors. Never accept an output as ground truth: ask for the evidence, ask for the reasoning, and when the answer came from a computation, ask for the code and read it.'],
    ['Have the work checked by someone other than its author.', 'An agent marking its own homework finds few of its mistakes. Ask a second, skeptical agent to audit each step, or audit it yourself, before the result goes anywhere.'],
    ['Be able to explain it.', 'If you cannot walk someone through a step, it is not yet your work. AI multiplies your expertise; it does not replace it. You bring the science, it brings the compute.'],
    ['Say how AI helped.', 'Readers need to know what a person did and what a tool did.'],
    ['Keep governed data out of public tools.', 'What you paste there leaves your control.'],
    ['Ask whose data, and who is affected.', 'Errors fall hardest on people the data leave out.'],
  ];
  const roles = [
    ['Learning', 'Attempt the work first. Then ask AI to explain and quiz you.', 'Build the core skills of your field yourself.', 'State in each course outline whether AI use is acceptable, allowed in some situations, or not. Assess understanding, aloud or in writing: "walk me through this step".'],
    ['Disclosure', 'Follow each course outline.', 'Every thesis states its use or non-use of generative AI. A short log of what you asked and changed makes this easy.', 'Disclose AI use as journals and funders require. A chatbot cannot be an author.'],
    ['Supervision', 'Ask when the rules are unclear.', 'Agree AI use with your supervisor and committee; we recommend writing it down.', 'Agree AI use in writing at the start. Name the skills to build without AI.'],
    ['Review and marking', '', 'As a teaching assistant, never put student work, names or grades into public tools.', "Never put a grant or manuscript you are reviewing into any online AI tool; check the funder's or journal's own rule."],
  ];
  const data = [
    ['Public data', 'with no reasonable expectation of privacy need no ethics review, but their licence terms still apply. Controlled-access data are not public.'],
    ['Human-subject data,', 'even de-identified, go into an online AI tool only if your ethics approval and any data-sharing agreement cover that use; if unsure, ask the Office of Human Research Ethics. A model running entirely on your own computer is fine within your approval. Agents such as Claude Code run on your computer but send what they read to an online model.'],
    ['Your Western login', "gives Copilot Chat Western's data protection, which a personal account does not. That is not ethics approval: still enter no health records or student numbers."],
    ['Data from First Nations, Inuit or Métis communities', 'usually come under a research agreement with the community, which can limit who else may receive them and how they are reused (TCPS 2, articles 9.18 to 9.20). Check that it allows an online AI tool before you use one; if unsure, ask the Office of Human Research Ethics.'],
    ["Others' unpublished work", 'needs their written permission before it goes into any online AI tool. As a reviewer, students follow the same rule as professors.'],
    ['Images that are data', '(gels, blots, micrographs) are never made or altered by AI. Label any AI-made illustration where it appears.'],
    ['Inventions:', "describing one to a public AI tool may count as public disclosure and cost patent rights. Talk to Western's Technology Transfer Office first."],
    ['Never paste passwords or keys', 'into a chat or an agent. Anything an agent can read, it can send.'],
  ];
  const cell = { padding: '10px 12px', borderBottom: `1px solid ${BORDER}`, verticalAlign: 'top', fontSize: 14, lineHeight: 1.6, color: TEXT, textAlign: 'left' };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 28px 80px' }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 32 }}>
        <img src="assets/images/site/lab-logo-hi-res.jpg" alt="Hallett Lab" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 2, border: `1px solid ${BORDER}` }} />
        <div>
          <h1 style={{ fontFamily: serif, fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 4px', letterSpacing: '-0.5px' }}>Using AI Well in the Lab</h1>
          <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>How we use AI in our science · version 1.1, October 2026 · M. Hallett</p>
        </div>
      </div>

      <H2>Our position</H2>
      <P>We encourage everyone in the lab to use AI, for writing, images, sound, data analysis, protein models and more, wherever it makes our science more correct, more reproducible, more inclusive and better made. AI uses real energy and water, so use it where it adds something. One principle governs every use: <strong>you remain the author</strong>. You are responsible for everything you hand in, publish or teach, however much AI helped. You decide what is claimed, you check it, you can explain it, and you say how AI helped. If AI made an error and you passed it on, the error is yours.</P>

      <H2 color={TIGER}>Uses you may not have tried</H2>
      <P>AI is far more than a drafting tool, and its uses have no fixed boundary. A few that people often miss:</P>
      <Items items={uses} />
      <div style={{ height: 14 }} />
      <P>Be creative. Push AI in new directions, bring your expertise to it, and let it extend what you can do. The people who know the science best are the ones who will define how AI serves it.</P>

      <H2>Nine habits for everyone</H2>
      <Items items={habits} ordered />
      <div style={{ height: 14 }} />
      <P>These follow Western's five principles: transparency, integrity, privacy, accountability and inclusion.</P>

      <H2 color={TIGER}>Who does what</H2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
          <thead>
            <tr style={{ background: '#f3eef9' }}>
              {['', 'Undergraduates', 'Graduate students', 'Supervisors and instructors'].map((h, i) => <th key={i} style={{ ...cell, fontWeight: 700 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {roles.map((r, i) => (
              <tr key={i}>{r.map((c, j) => <td key={j} style={{ ...cell, fontWeight: j === 0 ? 700 : 400 }}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Where your data can go</H2>
      <Items items={data} />

      <H2 color={TIGER}>Equity and wellbeing</H2>
      <P>Not every tool is free or open to everyone. If one you cannot access would genuinely improve your science, discuss it with your supervisor or the university rather than paying privately or using a personal account. Using AI to polish English you wrote is legitimate where the course or supervisor allows it; disclose what it did. An accessibility need is arranged as a formal accommodation through Accessible Education, and you disclose the tool, never your reasons. Most people in genetic studies are of European ancestry, so a variant common elsewhere can look rare and be misread.</P>
      <P>AI also has social and psychological costs worth knowing about. It can amplify bias, wear down skills we stop practising, and heavy reliance on chatbots has been linked to isolation, depression and other mental-health harms in some people. Notice how it affects you and the people around you, and talk to someone if it is not helping.</P>

      <H2>Quality needs many reviewers</H2>
      <P>Good science is checked from several sides: sound methods, fairness to the people behind the data, law and privacy, security, and craft. AI lets one person produce more than any one reviewer can check, and nobody holds every side in mind at once. So build the checks into how you work: ask for a separate review of each side, by a colleague or by an AI given one question at a time.</P>
      <P>AI itself can supply those reviews. Some research environments now place, beside the assistant doing the work, separate agents that each ask one question: one audits methods against published reporting guidelines; one reviews for equity and colonial framing, but never speaks for communities; one sends intellectual-property and data questions to the right office; one scans outgoing work for passwords and patient identifiers; one helps make figures honest and clear. Such tools help people judge; they do not judge for them.</P>

      <H2 color={TIGER}>Sources</H2>
      <div style={{ fontSize: 14, lineHeight: 1.9, color: TEXT }}>
        <div>Western: <A href="https://ai.uwo.ca/using-ai/principles-of-using-ai.html">Principles of using AI</A>; <A href="https://ai.uwo.ca/using-ai/copilot.html">Copilot</A>; <A href="https://www.uwo.ca/univsec/pdf/academic_policies/exam/courseoutlines.pdf">Course outlines policy</A>; <A href="https://www.uwo.ca/research/support/commercialization/process.html">Commercialization process</A></div>
        <div>SGPS: <A href="https://www.grad.uwo.ca/about_us/policies_procedures_regulations/ai.html">Generative AI guidance</A>; <A href="https://www.uwo.ca/univsec/pdf/academic_policies/grad_postdoc/thesis_procedures_format.pdf">Thesis procedures, section 4.7</A></div>
        <div><A href="https://www.science.gc.ca/site/science/en/interagency-research-funding/policies-and-guidelines/guidance-use-artificial-intelligence-development-and-review-research-grant-proposals">Tri-agency guidance on AI in grant proposals</A>; <A href="https://www.icmje.org/recommendations/browse/artificial-intelligence/ai-use-by-authors.html">ICMJE on AI use by authors</A></div>
        <div>TCPS 2: <A href="https://ethics.gc.ca/eng/tcps2-eptc2_2022_chapter2-chapitre2.html">Chapter 2</A>, <A href="https://ethics.gc.ca/eng/tcps2-eptc2_2022_chapter5-chapitre5.html">Chapter 5</A>, <A href="https://ethics.gc.ca/eng/tcps2-eptc2_2022_chapter9-chapitre9.html">Chapter 9</A>; <A href="https://www.gwasdiversitymonitor.com/">GWAS Diversity Monitor</A></div>
        <div>On the social and psychological costs, and adapted with thanks from: the <A href="https://www.schulich.uwo.ca/pathol//gps/research_programs/pdf/PaLM_genAI_guidelines-6.pdf">Pathology and Laboratory Medicine graduate policy</A> (section 3)</div>
      </div>
    </div>
  );
};

// ── CONTACT PAGE ───────────────────────────────────────────────────────────────

const ContactPage = () => (
  <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 28px 60px' }}>
    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 32px', letterSpacing: '-0.5px' }}>Contact</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48 }}>
      <div>
        <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, margin: '0 0 16px', color: TEXT }}>Dr. Michael Hallett</h2>
        <div style={{ fontSize: 13, lineHeight: 2.2, color: TEXT }}>
          <div><span style={{ color: MUTED, minWidth: 60, display: 'inline-block', fontSize: 11, fontFamily: 'monospace' }}>Office</span> MSB-360</div>
          <div><span style={{ color: MUTED, minWidth: 60, display: 'inline-block', fontSize: 11, fontFamily: 'monospace' }}>Wet lab</span> M359A and M433</div>
          <div><span style={{ color: MUTED, minWidth: 60, display: 'inline-block', fontSize: 11, fontFamily: 'monospace' }}>Dry lab</span> MSB-309A</div>
        </div>
        <Divider />
        <div style={{ fontSize: 13, lineHeight: 2, color: TEXT }}>1151 Richmond St<br />London, ON N6A 3K7, Canada</div>
        <Divider />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Email','michael.hallett@uwo.ca','mailto:michael.hallett@uwo.ca'],['Bluesky','@hallettmiket.bsky.social','https://bsky.app/profile/hallettmiket.bsky.social'],['GitHub','hallettmiket','https://github.com/hallettmiket'],['OSF','osf.io/jz64u','https://osf.io/jz64u/']].map(([label,value,href]) => (
            <div key={label} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: MUTED, minWidth: 50, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
              <a href={href} target="_blank" style={{ fontSize: 13, color: PURPLE, textDecoration: 'none' }}>{value}</a>
            </div>
          ))}
        </div>
      </div>
      <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2917.4861403974287!2d-81.27652468452298!3d43.010153679148615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882eee3dc72da521%3A0xf0ffda678f0eb0a8!2sMedical%20Sciences%20Building!5e0!3m2!1sen!2sca!4v1641336092613!5m2!1sen!2sca"
          width="100%" height="320" style={{ border: 0, display: 'block', marginBottom: 12 }} allowFullScreen loading="lazy" title="Western MSB map" />
        <p style={{ fontSize: 11, color: MUTED }}>1151 Richmond St, London, ON N6A 3K7, Canada</p>
      </div>
    </div>
  </div>
);

// ── JOIN PAGE ──────────────────────────────────────────────────────────────────

const JoinPage = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 28px 60px' }}>
    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: TEXT, margin: '0 0 8px', letterSpacing: '-0.5px' }}>Join Us</h1>
    <p style={{ fontSize: 14, color: MUTED, margin: '0 0 40px', lineHeight: 1.7 }}>The lab re-opened in April 2022 at Western University in London, Canada. We often have postdoctoral, PhD, MSc and undergraduate positions available. </p>

    <div style={{ background: '#f3eef9', border: `1px solid #d4c5ed`, padding: '28px 32px' }}>
      <h3 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 600, color: PURPLE, margin: '0 0 10px' }}>Get in touch</h3>
      <p style={{ fontSize: 14, color: TEXT, margin: '0 0 16px', lineHeight: 1.7 }}>Send a CV and a brief description of your research interests to:</p>
      <a href="mailto:michael.hallett@uwo.ca" style={{ fontSize: 16, color: PURPLE, fontWeight: 700 }}>michael.hallett@uwo.ca</a>
    </div>
  </div>
);

Object.assign(window, { HomePage, ResearchPage, TeamPage, BlogPage, SoftwarePage, CoursesPage, BarbadosPage, EthosPage, AIPage, ContactPage, JoinPage, MemberImg, Avatar, MdContent, TIGER, Carousel });
