/* ==========================================================================
   CHALLENGER 1: TEXT INTEGRITY & DOM ARCHITECTURE EMPIRICAL STRESS HARNESS
   Milestone 3 Independent Verification:
   1. Character-for-character verbatim preservation of Post 1 student essays (5 topics)
   2. Character-for-character verbatim preservation of Post 2 Candidate 05 (3 stages)
   3. Complete fidelity of all 6 candidate rows in Candidate Investigation Ledger (CAND 01 - 06)
   4. External Gemini ROM link verification (URL, target="_blank", rel="noopener noreferrer")
   5. Elimination of uniform card grids in favor of asymmetric Art Deco dossier layout
   6. DOM architecture validation for Post 1 & Post 2 components and styling rules
   ========================================================================== */

import fs from 'fs';
import path from 'path';

export function runEmpiricalVerification(rootDir = process.cwd()) {
  const results = {
    totalAssertions: 0,
    passedAssertions: 0,
    failures: [],
    details: {}
  };

  function assert(condition, message, details = {}) {
    results.totalAssertions++;
    if (!condition) {
      results.failures.push({ message, details });
      console.error(`[FAIL] ${message}`, details);
    } else {
      results.passedAssertions++;
      console.log(`[PASS] ${message}`);
    }
  }

  // 1. FILE EXISTENCE & READING
  const indexHtmlPath = path.join(rootDir, 'index.html');
  const viewsCssPath = path.join(rootDir, 'css', 'views.css');
  const tokensCssPath = path.join(rootDir, 'css', 'tokens.css');
  const decoCssPath = path.join(rootDir, 'css', 'deco-ornament.css');

  assert(fs.existsSync(indexHtmlPath), 'index.html must exist');
  assert(fs.existsSync(viewsCssPath), 'css/views.css must exist');
  assert(fs.existsSync(tokensCssPath), 'css/tokens.css must exist');
  assert(fs.existsSync(decoCssPath), 'css/deco-ornament.css must exist');

  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const viewsCss = fs.readFileSync(viewsCssPath, 'utf-8');

  // Normalize whitespace for text comparison (collapse sequences of spaces/newlines to single space)
  function normalizeText(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  // Helper to extract section content
  function getSection(html, id) {
    const regex = new RegExp(`<section[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/section>`, 'i');
    const match = html.match(regex);
    return match ? match[1] : '';
  }

  const post1Html = getSection(indexHtml, 'view-post1');
  const post2Html = getSection(indexHtml, 'view-post2');

  assert(post1Html.length > 0, '#view-post1 section must exist in index.html');
  assert(post2Html.length > 0, '#view-post2 section must exist in index.html');

  // ==========================================================================
  // SUITE 1: POST 1 VERBATIM PROSE (CHARACTER-FOR-CHARACTER)
  // ==========================================================================
  console.log('\n--- SUITE 1: Post 1 Character-for-Character Prose Verification ---');

  const expectedPost1Prose = {
    computers: normalizeText(`Programming and software is probably one of my oldest hobbies. I was introduced to it by my father who works in IT and the interest has stayed with me ever since. The ability to create and customize without the higher entry barrier of more physical fields really appeals to me. I've done tons of things over the years but recently I wanted to stop my router from bottlenecking my internet connection but the only ones which had the features I needed cost hundreds of dollars, so I bought an old computer off Facebook marketplace and I turned it into my own router for a fraction of the cost using free opensource tools. I'm also using the extra capacity on the computer to host my own vpn and media server all for free as well. To me software represents infinite possibilities accessible to anyone who puts in the time.`),
    electronics: normalizeText(`Electronics have always been a pretty significant part of my life. As such I've always been interested in how they work and what I can do to make them better. I really enjoy deepdiving into a niche to find that one product which is just right for me and if it doesn't exist I try to build it. I built my keyboard, computer, and 3d printer, and I've spent hours researching other peripherals and electronics. There's something really special about putting together something yourself and watching it turn electricity into something real and complex. It gives me a sense of accomplishment when I finish building a project that I can physically see and touch that software just can't match.`),
    music: normalizeText(`Within the past 1-2 years I've gotten a lot more into music. I've been able to find a whole bunch of smaller artists and songs I probably wouldn't have come across otherwise. I've also gotten into the hardware side of things; it's pretty interesting learning about different frequency response patterns, digital audio converters, and all the different specs there are. I've got a pretty pricey pair of openback headphones for my setup at home and a solid pair of IEMs for daily use. There's truly a world of difference between regular bluetooth earbuds and a nice pair of wired earbuds/headphones with a good DAC. I feel like being able to really experience music like this has added a lot more colour to daily life.`),
    videogames: normalizeText(`I've played videogames for as long as I can remember. I like videogames more for the people and community rather than the game itself. Since I don't play many story games the part that draws me in is the skill expression which means nothing if there's no one to share it with. Playing with and against other people while being a part of a larger community is what makes videogames worthwhile for me.`),
    history: normalizeText(`I like learning about history and politics because it's often more exiting and fantastical than fiction. Different times and places feel like completely different worlds compared to the one I live in, yet they still shape the place I go and the people I meet. The part I find cool is that all kinds of radically different events and ideas collapse into each other creating something new and unexpected which totally makes sense. Even if I mostly consume surface level knowledge Im still a little less confused about the world and I can understand others a little more which makes being here right now lot more exciting and interesting.`)
  };

  const normalizedPost1 = normalizeText(post1Html);

  assert(
    normalizedPost1.includes(expectedPost1Prose.computers),
    'Post 1 Computers/Software essay matches original prose character-for-character'
  );
  assert(
    normalizedPost1.includes(expectedPost1Prose.electronics),
    'Post 1 Electronics essay matches original prose character-for-character'
  );
  assert(
    normalizedPost1.includes(expectedPost1Prose.music),
    'Post 1 Music essay matches original prose character-for-character'
  );
  assert(
    normalizedPost1.includes(expectedPost1Prose.videogames),
    'Post 1 Video Games essay matches original prose character-for-character'
  );
  assert(
    normalizedPost1.includes(expectedPost1Prose.history),
    'Post 1 History and Politics essay matches original prose character-for-character'
  );

  // ==========================================================================
  // SUITE 2: POST 2 HYPOTHESIS CONDUIT & CANDIDATE INVESTIGATION LEDGER
  // ==========================================================================
  console.log('\n--- SUITE 2: Post 2 Hypothesis Conduit & Candidate Ledger ---');

  const normalizedPost2 = normalizeText(post2Html);

  // 2.1 Candidate 05 (Gyroscopic Precession) 3-stage refinement
  const stage01 = normalizeText(`"How does varying the mass distribution of a spinning rotor affect its gyroscopic precession"`);
  const stage02 = normalizeText(`The experimental physics is solid and directly measurable; it only required simpler, more concrete language describing the physical alteration to the rotor.`);
  const stage03 = normalizeText(`"How does shifting a spinning wheel's mass toward its outer rim change how fast it precesses?"`);

  assert(normalizedPost2.includes(stage01), 'Post 2 Stage 01 raw question matches verbatim');
  assert(normalizedPost2.includes(stage02), 'Post 2 Stage 02 AI critique summary matches verbatim');
  assert(normalizedPost2.includes(stage03), 'Post 2 Stage 03 refined locked question matches verbatim');

  // 2.2 Conduit DOM structure
  assert(post2Html.includes('hypothesis-conduit-stepped') || post2Html.includes('hypothesis-stages'), 'Hypothesis conduit stepped layout exists');
  assert(post2Html.includes('stage-chamber-01'), 'Conduit Chamber 01 exists');
  assert(post2Html.includes('stage-chamber-02'), 'Conduit Chamber 02 exists');
  assert(post2Html.includes('stage-chamber-03'), 'Conduit Chamber 03 exists');
  assert(post2Html.includes('conduit-transfer-bus'), 'Directional inter-stage transfer buses exist');

  // 2.3 Candidate 01 to 06 Ledger Rows
  const candidateExpectations = [
    {
      id: 'CAND 01',
      topic: 'Stepper Motor Dynamics',
      original: '"How does rotational velocity govern the magnitude of back-EMF and regenerative braking deceleration in stepper motors."',
      critique: 'Conflates two distinct physical phenomena (back-EMF vs. deceleration under load). Internal detent cogging also introduces confounding friction that obscures pure electromagnetic braking.',
      refined: '"How does the electrical resistance connected across a spinning motor affect how quickly it comes to a stop?"'
    },
    {
      id: 'CAND 02',
      topic: 'Optical Lens Distortion',
      original: '"How do computer vision algorithms mathematically correct for radial optical distortion caused lens curvature and focal length."',
      critique: 'Frames the investigation as a software/computational review rather than a hands-on physics experiment measuring physical light paths and lens curvature directly.',
      refined: '"How does the curvature of a lens change the amount of radial distortion seen in a projected grid?"'
    },
    {
      id: 'CAND 03',
      topic: 'Eddy Current Proximity Sensors',
      original: '"How does material and distance affect an eddy current proximity sensors readings"',
      critique: 'Tests two independent variables at once without a clean control group. "Readings" is ambiguous, driving the inquiry toward catalog lookup rather than hypothesis testing.',
      refined: '"How does a metal\'s electrical conductivity affect the output voltage of an eddy current sensor at a fixed distance?"'
    },
    {
      id: 'CAND 04',
      topic: 'Acoustic Resonance',
      original: '"How does constructive and destructive interference among harmonic frequencies create synthesized voices"',
      critique: 'Physically inaccurate premise; vocal timbre and vowel formation stem from acoustic cavity filtering and resonance (the source-filter model), not spatial wave interference.',
      refined: '"How does changing the shape and volume of an acoustic cavity filter a buzzing sound into distinct vowel sounds?"'
    },
    {
      id: 'CAND 05',
      topic: 'Gyroscopic Precession',
      original: '"How does varying the mass distribution of a spinning rotor affect its gyroscopic precession"',
      critique: 'The experimental physics is solid and directly measurable; it only required simpler, more concrete language describing the physical alteration to the rotor.',
      refined: '"How does shifting a spinning wheel\'s mass toward its outer rim change how fast it precesses?"'
    },
    {
      id: 'CAND 06',
      topic: 'The Kapitza Pendulum',
      original: '"How does The Kapitza Pendulum work"',
      critique: 'Too broad and expository. It lacks concrete independent and dependent variables to experimentally probe the stability boundaries of dynamic inverted balance.',
      refined: '"What minimum combination of vibration speed and stroke length is needed to keep an upside-down pendulum stable?"'
    }
  ];

  for (const cand of candidateExpectations) {
    assert(normalizedPost2.includes(cand.id), `Candidate ID ${cand.id} is present in Post 2 ledger`);
    assert(normalizedPost2.includes(cand.topic), `Candidate topic ${cand.topic} is present in Post 2 ledger`);
    assert(normalizedPost2.includes(normalizeText(cand.original)), `${cand.id} original question matches verbatim`);
    assert(normalizedPost2.includes(normalizeText(cand.critique)), `${cand.id} AI critique matches verbatim`);
    assert(normalizedPost2.includes(normalizeText(cand.refined)), `${cand.id} refined question matches verbatim`);
  }

  // 2.4 External Gemini ROM Link
  const geminiLinkRegex = /<a[^>]*href=["']https:\/\/share\.gemini\.google\/1Isc2ZbPU9xN["'][^>]*target=["']_blank["'][^>]*>/i;
  assert(geminiLinkRegex.test(post2Html), 'Gemini transcript ROM link has exact URL and target="_blank"');
  assert(post2Html.includes('rel="noopener noreferrer"'), 'Gemini transcript link includes rel="noopener noreferrer"');
  assert(post2Html.includes('ext-rom-link'), 'Gemini link is styled with .ext-rom-link class');

  // ==========================================================================
  // SUITE 3: DOM ARCHITECTURE & ASYMMETRIC DOSSIER LAYOUT (NO SAAS CARD GRID)
  // ==========================================================================
  console.log('\n--- SUITE 3: DOM Architecture & Asymmetric Dossier Layout ---');

  // 3.1 Post 1 Asymmetric 12-Column Grid
  assert(post1Html.includes('passions-dossier-grid'), 'Post 1 uses .passions-dossier-grid');
  assert(post1Html.includes('bay-computers'), 'Post 1 contains .bay-computers (Span 7)');
  assert(post1Html.includes('bay-electronics'), 'Post 1 contains .bay-electronics (Span 5)');
  assert(post1Html.includes('bay-music'), 'Post 1 contains .bay-music (Span 4)');
  assert(post1Html.includes('bay-games'), 'Post 1 contains .bay-games (Span 4)');
  assert(post1Html.includes('bay-history'), 'Post 1 contains .bay-history (Span 4)');

  // 3.2 Bay 01 Horizontal Split & Technical Plate
  assert(post1Html.includes('dossier-inner-split'), 'Bay 01 has internal horizontal split');
  assert(post1Html.includes('dossier-plate-flank'), 'Bay 01 has schematic plate flank');
  assert(post1Html.includes('dossier-prose-flank'), 'Bay 01 has author prose flank');
  assert(post1Html.includes('vfd-technical-plate'), 'Bay 01 includes recessed VFD technical schematic plate');
  assert(post1Html.includes('CUSTOM_RTR'), 'Bay 01 schematic features custom router diagram');

  // 3.3 CSS Grid Definitions in views.css
  assert(viewsCss.includes('repeat(12, 1fr)'), 'CSS defines 12-column dossier grid');
  assert(viewsCss.includes('.bay-computers') && viewsCss.includes('grid-column: span 7'), 'CSS defines span 7 for bay-computers');
  assert(viewsCss.includes('.bay-electronics') && viewsCss.includes('grid-column: span 5'), 'CSS defines span 5 for bay-electronics');
  assert(viewsCss.includes('.bay-music') && viewsCss.includes('grid-column: span 4'), 'CSS defines span 4 for bay-music');

  // 3.4 Art Deco Ornamentation
  assert(post1Html.includes('zig-bracket'), 'Post 1 features stepped Art Deco ziggurat brackets');
  assert(post1Html.includes('speed-lines-horizontal'), 'Post 1 features Streamline Moderne triple speed-lines');
  assert(post1Html.includes('rule-double-brass'), 'Post 1 features double-line brass divider rules');
  assert(post1Html.includes('engraved-serial-plate'), 'Post 1 features engraved serial nameplates');

  // 3.5 Absence of Generic Card-Grid Conventions
  const genericCardPatterns = [
    /class=["'][^"']*card-grid[^"']*["']/i,
    /class=["'][^"']*saas-card[^"']*["']/i,
    /class=["'][^"']*pill-badge[^"']*["']/i
  ];
  for (const pattern of genericCardPatterns) {
    assert(!pattern.test(post1Html), `Post 1 contains zero generic SaaS classes matching ${pattern}`);
  }

  // ==========================================================================
  // SUITE 4: TIER 1 EXISTING TEST ASSERTION REPRODUCIBILITY
  // ==========================================================================
  console.log('\n--- SUITE 4: Existing Tier 1 Test Suite Validation ---');

  // Assertions from tests/tier1_features/test_post1_dossier_and_prose.js
  assert(indexHtml.includes('id="view-post1"'), 'Feature 25: id="view-post1" present');
  const samplePhrases = ['Computers', 'Electronics', 'Music', 'Video Games', 'History'];
  for (const phrase of samplePhrases) {
    assert(indexHtml.includes(phrase), `Post 1 preserves phrase "${phrase}"`);
  }

  // Assertions from tests/tier1_features/test_post2_hypothesis_conduit.js
  assert(indexHtml.includes('id="view-post2"'), 'Feature 27: id="view-post2" present');
  assert(indexHtml.includes("How does shifting a spinning wheel's mass toward its outer rim change how fast it precesses?"), 'Feature 27: Locked question string present');
  const candidateTags = ['CAND 01', 'CAND 02', 'CAND 03', 'CAND 04', 'CAND 05', 'CAND 06'];
  for (const tag of candidateTags) {
    assert(indexHtml.includes(tag), `Feature 28: ${tag} present`);
  }
  assert(indexHtml.includes('https://share.gemini.google/1Isc2ZbPU9xN'), 'Feature 29: Gemini URL present');

  console.log(`\n==========================================================================`);
  console.log(`TOTAL ASSERTIONS : ${results.totalAssertions}`);
  console.log(`PASSED           : ${results.passedAssertions}`);
  console.log(`FAILED           : ${results.failures.length}`);
  console.log(`VERDICT          : ${results.failures.length === 0 ? 'APPROVE' : 'REJECT'}`);
  console.log(`==========================================================================\n`);

  return results;
}
