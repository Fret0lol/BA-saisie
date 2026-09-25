/*
 * Remplissage de la fiche CSTB « Disconnecteur de type BA » (Modif 24).
 * Le PDF d'origine n'a pas de champs de formulaire : on écrit le texte et
 * les coches aux coordonnées relevées sur le document (points PDF, origine
 * en haut à gauche comme dans pdfplumber ; conversion vers pdf-lib ci-dessous).
 * Fonctionne dans le navigateur (window.fillBA) et sous Node (module.exports).
 */
(function (root) {
  const H = 841.92; // hauteur de page A4 en points

  // ---------- Champs texte ----------
  // [clé, page, x, ligne (top de la ligne pointillée), x de fin, options]
  // Options : base = position de la ligne de base (si pas de ligne), size, blank = masquer les points "……"
  const TEXT = [
    // §1
    ['adressePose', 1, 94, 113, 559],
    ['proprio', 1, 136, 124, 380], ['proprioTel', 1, 400, 124, 559],
    ['proprioAdresse', 1, 64, 135, 380], ['proprioMail', 1, 405, 135, 559],
    // §2
    ['verificateur', 1, 78, 147, 274], ['competences', 1, 387, 147, 559],
    ['certificat', 1, 78, 158, 380], ['certifExpiration', 1, 455, 158, 558, { date: 1 }],
    ['entreprise', 1, 72, 169, 380], ['entrepriseTel', 1, 400, 169, 559],
    ['entrepriseAdresse', 1, 64, 180, 380], ['entrepriseMail', 1, 405, 180, 559],
    // §3
    ['marque', 1, 211, 193, 344], ['typeDisc', 1, 370, 193, 496], ['logoNF', 1, 536, 193, 559],
    ['diametre', 1, 69, 204, 167], ['serie', 1, 252, 204, 380], ['norme', 1, 492, 204, 559],
    // §4
    ['reseauProtege', 1, 221, 227, 380], ['lieuPose', 1, 435, 227, 558],
    ['traitementLequel', 1, 419, 238, 559],
    ['hauteur', 1, 329, 249, 559],
    ['communication', 1, 427, 260, 559],
    // §5
    ['installateur', 1, 76, 298, 380], ['installateurTel', 1, 400, 298, 559],
    ['installateurAdresse', 1, 64, 310, 380], ['installateurMail', 1, 405, 310, 559],
    ['avisMotif', 1, 59, 342, 559],
    // §6
    ['localMotif', 1, 268, 389, 559],
    ['evacuation', 1, 385, 400, 559],
    // §7
    ['bipasseObs', 1, 110, null, 380, { base: 643, blank: 1 }],
    // §8
    ['risqueObs', 1, 83, 711, 558],
    // §9
    ['autresFuites', 1, 190, 769, 558],
    ['etatFiltre', 1, 231, 802, 489],

    // Page 2 : pressions relevées (colonne gauche) et après réparation (colonne droite)
    ['e1_M1', 2, 138, null, 162, { base: 73 }], ['e1_MD', 2, 138, null, 162, { base: 90 }], ['e1_M2', 2, 138, null, 162, { base: 107 }],
    ['r1_M1', 2, 414, null, 445, { base: 73 }], ['r1_MD', 2, 414, null, 445, { base: 90 }], ['r1_M2', 2, 414, null, 445, { base: 107 }],
    ['e3_M1', 2, 140, null, 162, { base: 191 }], ['r3_M1', 2, 416, null, 445, { base: 191 }],
    ['e4_M2', 2, 138, null, 162, { base: 223 }], ['r4_M2', 2, 414, null, 445, { base: 232 }],
    ['e5_MD', 2, 138, null, 162, { base: 264 }], ['e5_MDs', 2, 142, null, 162, { base: 290 }],
    ['r5_MD', 2, 414, null, 445, { base: 264 }], ['r5_MDs', 2, 419, null, 445, { base: 290 }],
    ['e7_M1a', 2, 136, null, 162, { base: 354 }], ['e7_M1b', 2, 136, null, 162, { base: 371 }],
    ['r7_M1a', 2, 412, null, 445, { base: 349 }], ['r7_M1b', 2, 412, null, 445, { base: 366 }],
    ['e8_M2', 2, 136, null, 162, { base: 391 }], ['e8_M2s', 2, 138, null, 162, { base: 408 }],
    ['r8_M2', 2, 412, null, 445, { base: 391 }], ['r8_M2s', 2, 414, null, 445, { base: 408 }],
    ['e9_M2', 2, 135, null, 162, { base: 429 }], ['e9_M2s', 2, 138, null, 162, { base: 446 }],
    ['r9_M2', 2, 411, null, 445, { base: 429 }], ['r9_M2s', 2, 414, null, 445, { base: 446 }],
    ['e10_MD', 2, 142, null, 162, { base: 478 }], ['r10_MD', 2, 418, null, 445, { base: 478 }],
    ['e11_MD', 2, 142, null, 162, { base: 519 }], ['r11_MD', 2, 418, null, 445, { base: 519 }],
    ['e12_MD', 2, 137, null, 162, { base: 559 }], ['r12_MD', 2, 413, null, 445, { base: 559 }],
    ['e13_M1', 2, 138, null, 162, { base: 627 }], ['e13_MD', 2, 138, null, 162, { base: 644 }], ['e13_M2', 2, 138, null, 162, { base: 661 }],
    ['r13_M1', 2, 414, null, 445, { base: 627 }], ['r13_MD', 2, 414, null, 445, { base: 644 }], ['r13_M2', 2, 414, null, 445, { base: 661 }],
    // Précisions de réparation (sur les pointillés)
    ['repV1', 2, 290, null, 341, { base: 111, blank: 1, size: 7 }],
    ['repV2', 2, 290, null, 341, { base: 126, blank: 1, size: 7 }],
    ['repC1', 2, 288, null, 339, { base: 291, blank: 1, size: 7 }],
    ['repMembrane', 2, 312, null, 341, { base: 302, blank: 1, size: 7 }],
    // Appareillage de contrôle
    ['appMarque', 2, 495, null, 551, { base: 242, blank: 1 }],
    ['appType', 2, 499, null, 551, { base: 261, blank: 1 }],
    ['appSerie', 2, 503, null, 553, { base: 280, blank: 1 }],
    ['appDate', 2, 504, null, 553, { base: 311, blank: 1, date: 1 }],
    // Signatures
    ['verifNom', 2, 464, 385, 567],
    ['verifDate', 2, 484, 403, 568, { date: 1 }],
    ['datePrecedente', 2, 464, null, 567, { base: 451, blank: 1, date: 1 }],
    ['respNom', 2, 464, 523, 567],
    ['respDate', 2, 483, 542, 568, { date: 1 }],
  ];

  // Tableau « pièces réparées ou remplacées » : 5 lignes, rendues à part (voir PIECES_COLS)
  // pour permettre aux observations de passer sur plusieurs lignes sans être rognées.
  const PIECES_COLS = { desc: [26, 192], num: [199, 277], obs: [284, 444] };
  const PIECES_BASE = 752, PIECES_LINE_H = 8, PIECES_ROW_GAP = 4, PIECES_SIZE = 7;

  // Motif de non-conformité de pose : zone multiligne (§7)
  const POSE_MOTIF_LINES = [[57, 455, 241], [30, 472, 240], [30, 488, 240], [30, 505, 240], [30, 521, 240],
    [30, 538, 240], [30, 554, 240], [30, 571, 240], [30, 587, 240]];

  // ---------- Coches ----------
  // c = cercle "⃝" (glyphe : x0, x1, top, bottom) ; s = case carrée ; d = cercle dessiné (x, top, diamètre)
  const c = (x0, x1, t, b) => ({ k: 'c', x: (x0 + x1) / 2, y: (t + b) / 2 });
  const s = (x0, x1, t, b) => ({ k: 's', x: (x0 + x1) / 2, y: (t + b) / 2, w: (x1 - x0) });
  const d = (x0, t) => ({ k: 'c', x: x0 + 4.9, y: t + 4.9, r: 3 });
  const o = (t) => ({ k: 'c', x: 464.9, y: t + 6.9, r: 2.4 }); // puces "o" Courier (mise en service)

  // [clé, page, { valeur: marque ou [marques] }] — pour les cases à cocher la valeur est true
  const MARKS = [
    ['typeFiche', 1, { mes: s(29.3, 38.2, 18.8, 28.8), maint: s(237.1, 245.9, 18.8, 28.8), dep: s(410.0, 418.9, 18.8, 28.8) }],
    ['carnet', 1, { oui: c(368.7, 377.7, 68.6, 77.6), non: c(411.8, 420.8, 68.6, 77.6) }],
    ['traitement', 1, { oui: c(207.7, 216.6, 230.6, 239.6), non: c(234.9, 243.8, 230.6, 239.6) }],
    ['traitementPos', 1, { amont: s(326.4, 334.4, 230.2, 239.2), aval: s(368.6, 376.6, 230.2, 239.2) }],
    ['installType', 1, { neuve: s(393.9, 404.6, 275.5, 287.5), renovation: s(511.6, 522.3, 275.5, 287.5) }],
    ['avis', 1, { adapte: c(284.6, 293.5, 322.2, 331.2), nonAdapte: c(394.9, 403.8, 322.2, 331.2), reserve: c(510.1, 519.1, 322.2, 331.2) }],
    ['infoResponsable', 1, { true: s(417.8, 428.5, 344.4, 356.4) }],
    ['localConforme', 1, { oui: c(169.0, 178.0, 381.7, 390.7), non: c(207.8, 216.7, 381.7, 390.7) }],
    ['immersion', 1, { oui: c(169.0, 178.0, 392.7, 401.7), non: c(207.8, 216.7, 392.7, 401.7) }],
    ['poseConforme', 1, { oui: c(169.0, 178.0, 434.9, 443.9), non: c(227.0, 235.9, 434.9, 443.9) }],
    ['bipasse', 1, { oui: c(219.4, 228.4, 624.1, 633.1), non: c(255.4, 264.4, 624.1, 633.1) }],
    ['risque', 1, { oui: c(166.9, 175.9, 665.8, 674.8), non: c(209.8, 218.8, 665.8, 674.8) }],
    ['origChoix', 1, { true: c(312.4, 321.4, 678.5, 687.5) }],
    ['origPose', 1, { true: c(408.9, 417.9, 678.5, 687.5) }],
    ['origFonct', 1, { true: c(556.8, 565.7, 678.5, 687.5) }],
    ['origLocal', 1, { true: c(148.8, 157.8, 691.1, 700.1) }],
    ['decharge', 1, { sans: c(243.0, 252.0, 750.3, 759.3), goutte: c(318.4, 327.4, 750.3, 759.3), legere: c(378.8, 387.7, 750.3, 759.3), importante: c(457.9, 466.8, 750.3, 759.3) }],
    ['v1Initial', 1, { ouverte: c(326.2, 335.2, 772.3, 781.3), fermee: c(375.2, 384.1, 772.3, 781.3) }],
    ['v2Initial', 1, { ouverte: c(446.5, 455.4, 772.3, 781.3), fermee: c(493.4, 502.4, 772.3, 781.3) }],
    ['fermerVannes', 1, { true: c(229.5, 238.4, 783.2, 792.2) }],
    ['filtreNettoye', 1, { true: c(145.1, 154.0, 794.2, 803.2) }],

    // Page 2 : résultats des essais
    ['e1', 2, { ok: d(353.6, 62.0), v1: d(353.6, 100.8), v2: d(353.7, 116.1), v1v2: [d(353.6, 100.8), d(353.7, 116.1)] }],
    ['e2', 2, { ok: d(353.8, 134.6), hs: d(353.8, 151.6) }],
    ['e3', 2, { ok: d(353.9, 167.8), hs: d(353.9, 182.2) }],
    ['e4', 2, { ok: d(353.6, 203.2), hs: d(353.6, 226.1) }],
    ['e5', 2, { ok: d(353.2, 248.3), c1: d(353.4, 277.4), membrane: d(353.4, 290.7), c1membrane: [d(353.4, 277.4), d(353.4, 290.7)] }],
    ['e6', 2, { ok: d(353.3, 307.7), hs: d(353.3, 326.8) }],
    ['e7', 2, { ok: d(353.7, 342.9), hs: d(353.3, 360.6) }],
    ['e8', 2, { ok: d(353.3, 381.2), hs: d(353.9, 400.5) }],
    ['e9', 2, { ok: d(353.3, 419.6), hs: d(353.4, 437.5) }],
    ['e10', 2, { ok: d(353.3, 456.2), ko: d(353.6, 478.0) }],
    ['e11', 2, { ok: d(353.3, 498.4), ko: d(353.3, 518.2) }],
    ['e12', 2, { ok: d(353.3, 540.3), ko: d(353.4, 559.6) }],
    ['e13', 2, { ok: d(351.6, 616.8), ko: d(351.9, 650.6) }],
    ['v1Final', 2, { ouverte: c(191.1, 198.0, 696.2, 703.1), fermee: c(229.2, 236.2, 696.2, 703.1) }],
    ['v2Final', 2, { ouverte: c(286.1, 293.1, 696.2, 703.1), fermee: c(322.7, 329.7, 696.2, 703.1) }],
    ['appLogoNF', 2, { oui: c(514.2, 522.2, 323.2, 331.2), non: c(550.2, 558.2, 323.2, 331.2) }],
    // Mise en service : anomalies et fonctionnement
    ['anoPression', 2, { true: o(626.1) }],
    ['anoFuiteExt', 2, { true: o(647.1) }],
    ['anoFuiteDecharge', 2, { true: o(668.2) }],
    ['anoDisconnexion', 2, { true: o(689.3) }],
    ['anoCirculation', 2, { true: o(700.6) }],
    ['anoRupture', 2, { true: o(721.6) }],
    ['anoFiltre', 2, { true: o(742.7) }],
    ['fonctionnement', 2, { correct: c(523.8, 533.7, 774.5, 784.5), incorrect: c(523.4, 533.3, 786.7, 796.6) }],
  ];

  // Zones de signature (page 2) : x, top, largeur, hauteur
  const SIGNATURES = { sigVerif: [500, 402, 72, 22], sigResp: [500, 545, 72, 24] };

  // Réglage fin des cercles-glyphes (le glyphe "⃝" est légèrement décalé par rapport à sa boîte)
  const GLYPH_DX = 0, GLYPH_DY = 0;

  const INK = [0.07, 0.2, 0.55]; // bleu « stylo »

  function formatDate(v) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    return m ? `${m[3]}/${m[2]}/${m[1]}` : v;
  }

  async function fillBA(PDFLib, templateBytes, data) {
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const pdf = await PDFDocument.load(templateBytes);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const pages = pdf.getPages();
    const ink = rgb(...INK);
    const supported = new Set(font.getCharacterSet());

    const clean = (str) => Array.from(String(str).replace(/[\r\n\t]+/g, ' ').replace(/[‘’]/g, "'").replace(/[“”«»]/g, '"'))
      .map((ch) => (supported.has(ch.codePointAt(0)) ? ch : '?')).join('').trim();

    function fit(str, maxW, size) {
      let sz = size;
      while (sz > 5.5 && font.widthOfTextAtSize(str, sz) > maxW) sz -= 0.25;
      if (font.widthOfTextAtSize(str, sz) <= maxW) return { str, sz };
      let t = str;
      while (t.length > 1 && font.widthOfTextAtSize(t + '…', sz) > maxW) t = t.slice(0, -1);
      return { str: t + '…', sz };
    }

    function write(page, x, baseTop, endX, raw, opts = {}) {
      const str = clean(raw);
      if (!str) return;
      const { str: s2, sz } = fit(str, endX - x, opts.size || (page === 1 ? 9 : 8));
      const p = pages[page - 1];
      const y = H - baseTop;
      if (opts.blank) {
        const w = font.widthOfTextAtSize(s2, sz);
        p.drawRectangle({ x: x - 1, y: y - 2, width: w + 2, height: sz + 1, color: rgb(1, 1, 1) });
      }
      p.drawText(s2, { x, y, size: sz, font, color: ink });
    }

    // Texte
    for (const [key, page, x, line, endX, opts = {}] of TEXT) {
      let v = data[key];
      if (v == null || v === '') continue;
      if (opts.date) v = formatDate(v);
      if (key === 'logoNF') v = v === 'oui' ? 'Oui' : v === 'non' ? 'Non' : v;
      const base = opts.base != null ? opts.base : line - 1.6;
      write(page, x, base, endX, v, opts);
    }

    // Motif pose : découpage en lignes
    if (data.poseMotif) {
      const words = clean(data.poseMotif).split(/\s+/);
      let li = 0, cur = '';
      const size = 9;
      const flush = () => { if (li < POSE_MOTIF_LINES.length && cur) { const [x, l, e] = POSE_MOTIF_LINES[li]; write(1, x, l - 1.6, e, cur, { size }); } li++; cur = ''; };
      for (const w of words) {
        if (li >= POSE_MOTIF_LINES.length) break;
        const [x, , e] = POSE_MOTIF_LINES[li];
        const test = cur ? cur + ' ' + w : w;
        if (font.widthOfTextAtSize(test, size) <= e - x || !cur) cur = test; else { flush(); cur = w; }
      }
      flush();
    }

    // Pièces réparées ou remplacées : texte réparti sur plusieurs lignes (jamais tronqué)
    function wrapWords(str, maxW, size) {
      const words = clean(str).split(/\s+/).filter(Boolean);
      const lines = [];
      let cur = '';
      for (const w of words) {
        const test = cur ? cur + ' ' + w : w;
        if (!cur || font.widthOfTextAtSize(test, size) <= maxW) cur = test;
        else { lines.push(cur); cur = w; }
      }
      if (cur) lines.push(cur);
      return lines;
    }
    {
      let base = PIECES_BASE;
      for (let i = 1; i <= 5; i++) {
        const desc = data[`piece${i}`], num = data[`piece${i}_n`], obs = data[`piece${i}_obs`];
        if (!desc && !num && !obs) continue;
        const [dx, dEnd] = PIECES_COLS.desc, [nx, nEnd] = PIECES_COLS.num, [ox, oEnd] = PIECES_COLS.obs;
        const descLines = desc ? wrapWords(desc, dEnd - dx, PIECES_SIZE) : [];
        const obsLines = obs ? wrapWords(obs, oEnd - ox, PIECES_SIZE) : [];
        const rows = Math.max(descLines.length, obsLines.length, 1);
        descLines.forEach((ln, j) => write(2, dx, base + j * PIECES_LINE_H, dEnd, ln, { size: PIECES_SIZE }));
        if (num) write(2, nx, base, nEnd, num, { size: PIECES_SIZE });
        obsLines.forEach((ln, j) => write(2, ox, base + j * PIECES_LINE_H, oEnd, ln, { size: PIECES_SIZE }));
        base += rows * PIECES_LINE_H + PIECES_ROW_GAP;
      }
    }

    // Coches
    const drawMark = (page, m) => {
      const p = pages[page - 1];
      if (m.k === 's') {
        const h = Math.min(m.w, 9) * 0.32, cx = m.x, cy = H - m.y;
        const opt = { thickness: 1.4, color: ink };
        p.drawLine({ start: { x: cx - h, y: cy - h }, end: { x: cx + h, y: cy + h }, ...opt });
        p.drawLine({ start: { x: cx - h, y: cy + h }, end: { x: cx + h, y: cy - h }, ...opt });
      } else {
        const glyph = m.r == null;
        p.drawCircle({ x: m.x + (glyph ? GLYPH_DX : 0), y: H - m.y - (glyph ? GLYPH_DY : 0), size: m.r || 2.6, color: ink });
      }
    };
    for (const [key, page, map] of MARKS) {
      const v = data[key];
      if (v == null || v === '' || v === false) continue;
      const m = map[String(v)];
      if (!m) continue;
      (Array.isArray(m) ? m : [m]).forEach((mm) => drawMark(page, mm));
    }

    // Signatures (images PNG en data URL)
    for (const [key, [x, top, w, h]] of Object.entries(SIGNATURES)) {
      const url = data[key];
      if (!url || !/^data:image\/png;base64,/.test(url)) continue;
      const img = await pdf.embedPng(url);
      const scale = Math.min(w / img.width, h / img.height);
      const iw = img.width * scale, ih = img.height * scale;
      pages[1].drawImage(img, { x: x + (w - iw) / 2, y: H - top - h + (h - ih) / 2, width: iw, height: ih });
    }

    pdf.setTitle('Disconnecteur BA – fiche remplie');
    pdf.setCreator('Fiche BA mobile');
    return pdf.save();
  }

  const api = { fillBA, TEXT, MARKS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BAFill = api;
})(typeof self !== 'undefined' ? self : this);
