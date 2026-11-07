(function () {
  const CATALOG = window.CATALOG || [];
  const byId = Object.fromEntries(CATALOG.map((o) => [o.id, o]));

  const REGION_LABEL = {
    africa: "Africa",
    arabStates: "Arab States",
    asiaAndThePacific: "Asia & the Pacific",
    europeAndNorthAmerica: "Europe & North America",
    latinAmericaAndTheCaribbean: "Latin America & the Caribbean",
  };
  const REGION_ORDER = Object.keys(REGION_LABEL);
  const USE_LABEL = {
    admireIt: "Admire it",
    prayAndMeditate: "Pray and meditate",
    commemorate: "Commemorate",
    wearIt: "Wear it",
    useItEveryday: "Use it everyday",
    buryIt: "Bury it",
    studyExperimentObserve: "Study it",
    drawSketch: "Draw and sketch",
    exchangeIt: "Exchange it",
    combatAndDefend: "Combat and defend",
  };
  const COLOR_HEX = {
    gold: "#c6a15b", white: "#f4f1ea", beige: "#e4d3b4", black: "#2a2420",
    lightGrey: "#c8c2b8", brown: "#8a5a3a", darkGrey: "#5c564e", cadmiumRed: "#c6453a",
    silver: "#c5c7cc", ceruleanBlue: "#3d78b4", terraCotta: "#c46a45", darkBrown: "#5a3828",
    cornellRed: "#9e2b2b", darkGreen: "#2f5d45", lightGreen: "#8fb56a", wheat: "#e6d2a8",
    bronze: "#8c6a3d", cadmiumOrange: "#e0863a", babyPink: "#f0c2c8", darkYellow: "#c6a227",
    copperRose: "#c47a6a", babyBlue: "#b7c9dc", veryPaleBlue: "#d5e2ee", grayishGreen: "#8a9984",
    yellow: "#e6c84a", purple: "#7a4e86", turquoise: "#3aa8a0", byzantine: "#6b3f86",
  };
  const MATERIAL_LABEL = {
    pigments: "pigments", paper: "paper", ceramic: "ceramic", metal: "metal",
    stone: "stone", textile: "textile", wood: "wood", preciousMaterials: "precious materials",
    organicMaterials: "organic materials", mixedMedia: "mixed media", glass: "glass",
  };

  const $ = (id) => document.getElementById(id);
  const err = $("err");
  window.addEventListener("error", (e) => {
    err.hidden = false;
    err.textContent = e.message;
  });

  if (!window.THREE || !CATALOG.length) {
    err.hidden = false;
    err.textContent = "The gallery could not load its catalogue.";
    return;
  }

  const counts = Object.fromEntries(REGION_ORDER.map((r) => [r, 0]));
  const useCounts = {};
  const colorCounts = {};
  CATALOG.forEach((o) => {
    (o.regions || []).forEach((r) => { if (counts[r] != null) counts[r] += 1; });
    (o.uses || []).forEach((u) => { useCounts[u] = (useCounts[u] || 0) + 1; });
    (o.colors || []).forEach((c) => { colorCounts[c] = (colorCounts[c] || 0) + 1; });
  });
  const SHOWN_COUNTS = {
    africa: "52",
    arabStates: "37",
    asiaAndThePacific: "38",
    europeAndNorthAmerica: "96",
    latinAmericaAndTheCaribbean: "59",
  };
  document.querySelectorAll("#region-list button").forEach((btn) => {
    const sup = btn.querySelector("sup");
    if (sup) sup.textContent = SHOWN_COUNTS[btn.dataset.region] || counts[btn.dataset.region] || 0;
  });

  const GAP = 15;
  const REGION_STOP = {
    europeAndNorthAmerica: 0,
    arabStates: 1,
    asiaAndThePacific: 2,
    africa: 3,
    latinAmericaAndTheCaribbean: 4,
  };

  const STATIONS = [
    {
      primary: "VM-GR-25-012",
      furniture: [
        { type: "panel", w: 2.05, h: 3.15, color: "#e7d6bd", x: 0.12, y: 1.68, z: -0.48 },
        { type: "box", w: 0.58, h: 2.42, d: 0.54, color: "#6e3832", x: -0.92, z: 0.02 },
        { type: "box", w: 0.46, h: 1.52, d: 0.44, color: "#c4623e", x: -0.22, z: 0.46 },
        { type: "box", w: 0.4, h: 0.82, d: 0.4, color: "#d2c0a4", x: 0.36, z: 0.16 },
        { type: "cyl", r: 0.34, h: 1.72, color: "#cbb392", x: 0.98, z: 0.0 },
      ],
      objects: [
        { id: "VM-GR-25-012", kind: "askos", x: -0.92, y: 2.42, z: 0.02, s: 1.15 },
        { id: "VM-EC-24-006", kind: "stamps", x: 0.08, y: 2.22, z: -0.4 },
        { id: "VM-HN-25-009", kind: "ciborium", x: 0.98, y: 1.72, z: 0.0, s: 1.15 },
        { id: "VM-TR-24-017", kind: "coin", x: -0.22, y: 1.66, z: 0.46, s: 1.15 },
        { id: "VM-GR-25-011", kind: "skyphos", x: 0.36, y: 0.82, z: 0.16, s: 1.05 },
      ],
    },
    {
      primary: "VM-HN-25-008",
      furniture: [
        { type: "panel", w: 2.35, h: 3.05, color: "#e4d2b8", x: -0.28, y: 1.72, z: -0.5 },
        { type: "box", w: 0.56, h: 1.72, d: 0.5, color: "#c46a48", x: -0.48, z: 0.32 },
        { type: "box", w: 0.5, h: 1.38, d: 0.46, color: "#d07a55", x: 0.16, z: 0.55 },
        { type: "cyl", r: 0.36, h: 1.78, color: "#d9c7ae", x: 1.02, z: 0.02 },
        { type: "box", w: 0.42, h: 0.4, d: 0.36, color: "#3a2a28", x: 1.02, z: 0.02, base: 1.78 },
      ],
      objects: [
        { id: "VM-TN-24-006", kind: "manuscript", x: -0.02, y: 2.2, z: -0.42 },
        { id: "VM-GT-24-002", kind: "medallion", x: -0.55, y: 1.72, z: -0.4, s: 1.05 },
        { id: "VM-HN-25-008", kind: "crown", x: 0.02, y: 1.62, z: 0.28, s: 1.35 },
        { id: "VM-DZ-24-002", kind: "bust", x: 1.02, y: 2.18, z: 0.02, s: 1.05 },
        { id: "VM-GT-24-008", kind: "cross", x: 0.78, y: 2.22, z: 0.22, s: 1.1 },
      ],
    },
    {
      primary: "VM-CO-24-006",
      furniture: [
        { type: "panel", w: 2.2, h: 2.55, color: "#e6d3b4", x: 0.42, y: 1.5, z: -0.32 },
        { type: "box", w: 0.5, h: 1.18, d: 0.46, color: "#e7b5a8", x: -0.88, z: 0.12 },
      ],
      objects: [
        { id: "VM-PA-25-002", kind: "goldFigure", x: -0.88, y: 1.18, z: 0.12, s: 1.35 },
        { id: "VM-BR-25-003", kind: "diadem", x: -0.48, y: 0.02, z: 0.55, s: 1.15 },
        { id: "VM-CO-24-006", kind: "mineros", x: 0.38, y: 1.62, z: -0.2 },
        { id: "VM-SD-25-001", kind: "stoneBust", x: 0.95, y: 0.0, z: 0.38, s: 1.2 },
      ],
    },
    {
      primary: "VM-CU-25-001",
      furniture: [
        { type: "panel", w: 2.45, h: 2.85, color: "#6a3533", x: 0.12, y: 1.68, z: -0.42 },
        { type: "cyl", r: 0.4, h: 1.95, color: "#f0e6d4", x: -1.08, z: 0.02 },
        { type: "box", w: 0.52, h: 1.2, d: 0.48, color: "#e4d5bc", x: -0.18, z: 0.42 },
        { type: "box", w: 0.46, h: 1.48, d: 0.44, color: "#e7dcc8", x: 0.52, z: 0.48 },
        { type: "box", w: 0.42, h: 1.82, d: 0.4, color: "#a24b3a", x: 1.15, z: -0.02 },
      ],
      objects: [
        { id: "VM-CN-25-004", kind: "arhat", x: -1.08, y: 1.95, z: 0.02, s: 1.15 },
        { id: "VM-CU-25-001", kind: "crowd", x: 0.12, y: 1.95, z: -0.32 },
        { id: "VM-CY-24-008", kind: "capital", x: -0.18, y: 1.2, z: 0.42, s: 1.05 },
        { id: "VM-GR-25-010", kind: "smallFigure", x: 0.52, y: 1.48, z: 0.48, s: 1.25 },
        { id: "VM-ES-25-003", kind: "portrait", x: 1.15, y: 2.02, z: -0.02, s: 0.85 },
      ],
    },
    {
      primary: "VM-CO-24-009",
      furniture: [
        { type: "panel", w: 2.05, h: 2.9, color: "#e5d4b8", x: 0.32, y: 1.68, z: -0.38 },
        { type: "box", w: 0.44, h: 1.55, d: 0.4, color: "#4a342f", x: -0.9, z: -0.05 },
        { type: "box", w: 0.58, h: 1.22, d: 0.52, color: "#f0e2cc", x: -0.5, z: 0.46 },
        { type: "box", w: 0.36, h: 0.68, d: 0.36, color: "#c46a48", x: 0.28, z: 0.52 },
        { type: "cyl", r: 0.36, h: 1.32, color: "#5c3a38", x: 1.05, z: 0.12 },
      ],
      objects: [
        { id: "VM-NP-25-001", kind: "buddha", x: -0.9, y: 1.78, z: -0.05, s: 1.05 },
        { id: "VM-SD-25-005", kind: "queen", x: -0.5, y: 1.22, z: 0.46, s: 1.2 },
        { id: "VM-CO-24-009", kind: "dancers", x: 0.32, y: 1.82, z: -0.26 },
        { id: "VM-HN-25-002", kind: "disc", x: 0.28, y: 0.68, z: 0.52, s: 1.1 },
        { id: "VM-RO-25-003", kind: "bracelet", x: 1.05, y: 1.68, z: 0.12, s: 1.25 },
      ],
    },
  ];

  const filter = { region: null, use: null, color: null };
  const stationOf = {};
  const pickables = [];
  let targetP = 0;
  let p = 0;
  let traveled = false;
  let discoverStation = -1;
  let hovering = false;
  let currentItem = null;
  let aimX = 0;
  let aimY = 0;
  let lookX = 0;
  let lookY = 0;
  let moveAxis = 0;
  let stickX = 0;
  const look = new THREE.Vector3();
  const side = new THREE.Vector3();
  const keyOffset = new THREE.Vector3();

  const renderer = new THREE.WebGLRenderer({ canvas: $("view"), antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf3ecdf, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4eee4);
  scene.fog = new THREE.Fog(0xf3ecdf, 16, 42);
  const camera = new THREE.PerspectiveCamera(47, window.innerWidth / window.innerHeight, 0.1, 120);

  scene.add(new THREE.HemisphereLight(0xfff6ea, 0xc9b79a, 1.25));
  const key = new THREE.DirectionalLight(0xfff1d2, 1.7);
  scene.add(key);
  scene.add(key.target);
  const fill = new THREE.DirectionalLight(0xe7d7c4, 0.45);
  fill.position.set(4, 2, -3);
  scene.add(fill);

  const ringGeo = new THREE.TorusGeometry(18, 0.46, 10, 90);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xe3d5c2, roughness: 0.96 });
  for (let i = 0; i < 16; i++) {
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -7 + i * 2.2;
    scene.add(ring);
  }

  const debris = [];
  for (let i = 0; i < 80; i++) {
    const size = 0.035 + Math.random() * 0.09;
    const mesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(size, 0),
      mat(new THREE.Color().setHSL(0.08, 0.18, 0.55 + Math.random() * 0.22), { roughness: 1 })
    );
    const arm = Math.random() * Math.PI * 2;
    const rad = 6 + Math.random() * 10;
    mesh.position.set(Math.cos(arm) * rad, -10 + Math.random() * 32, Math.sin(arm) * rad);
    mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    mesh.userData.spin = 0.15 + Math.random() * 0.4;
    mesh.userData.base = mesh.position.y;
    scene.add(mesh);
    debris.push(mesh);
  }

  function mat(color, opts) {
    return new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.82, metalness: 0.04 }, opts));
  }

  function lathe(pts, color, opts) {
    const geo = new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), 28);
    const mesh = new THREE.Mesh(geo, mat(color, opts));
    return mesh;
  }

  function canvasTex(w, h, draw) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    draw(c.getContext("2d"), w, h);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }

  function framed(texture, w, h, frame) {
    const g = new THREE.Group();
    const art = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: texture }));
    art.position.z = 0.025;
    const fm = mat(frame, { roughness: 0.55 });
    const t = 0.055;
    const top = new THREE.Mesh(new THREE.BoxGeometry(w + t * 2, t, 0.06), fm);
    top.position.y = h / 2 + t / 2;
    const bot = top.clone();
    bot.position.y = -h / 2 - t / 2;
    const left = new THREE.Mesh(new THREE.BoxGeometry(t, h, 0.06), fm);
    left.position.x = -w / 2 - t / 2;
    const right = left.clone();
    right.position.x = w / 2 + t / 2;
    g.add(art, top, bot, left, right);
    return g;
  }

  function drawStamps(ctx, w, h) {
    ctx.fillStyle = "#f4efe4";
    ctx.fillRect(0, 0, w, h);
    const cols = 12;
    const rows = 7;
    const pad = 18;
    const gw = (w - pad * 2) / cols;
    const gh = (h - pad * 2) / rows;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillStyle = (x + y) % 5 === 0 ? "#2f6ea8" : "#3d78b4";
        ctx.fillRect(pad + x * gw + 3, pad + y * gh + 3, gw - 6, gh - 6);
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.strokeRect(pad + x * gw + 7, pad + y * gh + 7, gw - 14, gh - 14);
      }
    }
  }

  function drawManuscript(ctx, w, h) {
    ctx.fillStyle = "#f3e6c8";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#9e2b2b";
    ctx.lineWidth = 10;
    ctx.strokeRect(16, 16, w - 32, h - 32);
    ctx.strokeStyle = "#c6a15b";
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, w - 56, h - 56);
    ctx.fillStyle = "#8a5a32";
    for (let i = 0; i < 11; i++) {
      const y = 70 + i * 28;
      ctx.fillRect(56, y, w - 130, 6);
      ctx.fillStyle = i % 3 === 0 ? "#9e2b2b" : "#8a5a32";
    }
    ctx.fillStyle = "#c6a15b";
    ctx.beginPath();
    ctx.arc(w * 0.72, h * 0.42, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#9e2b2b";
    ctx.beginPath();
    ctx.arc(w * 0.72, h * 0.42, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawSketch(ctx, w, h, dense) {
    ctx.fillStyle = "#f6f3ee";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#1d1a17";
    ctx.fillStyle = "#1d1a17";
    ctx.lineWidth = 2;
    const n = dense ? 16 : 11;
    for (let i = 0; i < n; i++) {
      const x = 40 + (i * (w - 80)) / n + Math.sin(i * 2.1) * 8;
      const bh = dense ? 70 + (i % 4) * 28 : 80 + (i % 3) * 36;
      const y = h * 0.72 - bh;
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, y + 10);
      ctx.lineTo(x - 10, y + bh);
      ctx.moveTo(x, y + 18);
      ctx.lineTo(x + 16, y + bh * 0.55);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(30, h * 0.78);
    ctx.lineTo(w - 30, h * 0.74);
    ctx.stroke();
  }

  function drawDancers(ctx, w, h) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#e7d3bf");
    g.addColorStop(1, "#c9846a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    const dresses = ["#f7f4ef", "#d5e2ee", "#f3efe8"];
    for (let i = 0; i < 3; i++) {
      const x = w * (0.28 + i * 0.22);
      ctx.fillStyle = "#f1d2be";
      ctx.beginPath();
      ctx.arc(x, h * 0.32, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = dresses[i];
      ctx.beginPath();
      ctx.moveTo(x - 28, h * 0.4);
      ctx.lineTo(x + 30, h * 0.42);
      ctx.lineTo(x + 46, h * 0.86);
      ctx.lineTo(x - 42, h * 0.84);
      ctx.fill();
    }
  }

  function coinTexture() {
    return canvasTex(256, 256, (ctx, w, h) => {
      ctx.fillStyle = "#8d9298";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#5c6168";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(128, 128, 100, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#d9dde2";
      ctx.beginPath();
      ctx.arc(118, 118, 16, 0, Math.PI * 2);
      ctx.arc(148, 118, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(133, 132);
      ctx.lineTo(126, 158);
      ctx.lineTo(140, 158);
      ctx.fill();
    });
  }

  function medallionTexture() {
    return canvasTex(512, 512, (ctx) => {
      ctx.clearRect(0, 0, 512, 512);
      const g = ctx.createRadialGradient(240, 220, 20, 256, 256, 240);
      g.addColorStop(0, "#f7f7f8");
      g.addColorStop(1, "#b9bdc4");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(256, 256, 230, 250, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#8d7344";
      ctx.lineWidth = 14;
      ctx.stroke();
      ctx.strokeStyle = "#6e5530";
      ctx.lineWidth = 3;
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(256 + Math.cos(a) * 190, 256 + Math.sin(a) * 210, 8, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = "#4e5560";
      ctx.beginPath();
      ctx.ellipse(256, 250, 70, 90, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  const builders = {
    askos() {
      const g = new THREE.Group();
      g.add(lathe([
        [0.02, 0], [0.2, 0], [0.3, 0.08], [0.32, 0.24], [0.22, 0.4], [0.12, 0.48], [0.1, 0.58], [0.12, 0.66], [0.07, 0.74],
      ], "#b85c3e", { roughness: 0.78 }));
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.018, 8, 24), mat("#3a2a22", { roughness: 0.6 }));
      band.rotation.x = Math.PI / 2;
      band.position.y = 0.28;
      g.add(band);
      const spout = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), mat("#b85c3e", { roughness: 0.78 }));
      spout.scale.set(1.5, 0.75, 0.85);
      spout.position.set(0.2, 0.32, 0);
      g.add(spout);
      return g;
    },
    skyphos() {
      const g = new THREE.Group();
      g.add(lathe([
        [0.02, 0], [0.18, 0], [0.24, 0.06], [0.26, 0.18], [0.18, 0.32], [0.1, 0.38], [0.09, 0.44],
      ], "#3c3a38", { roughness: 0.55, metalness: 0.12 }));
      const stripe = mat("#2a1c18", { roughness: 0.5 });
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2 - i * 0.012, 0.012, 6, 28), stripe);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.12 + i * 0.08;
        g.add(ring);
      }
      const handle = new THREE.TorusGeometry(0.09, 0.018, 8, 18, Math.PI);
      const h1 = new THREE.Mesh(handle, mat("#6e3428", { roughness: 0.62 }));
      h1.position.set(0.26, 0.2, 0);
      h1.rotation.z = -Math.PI / 2;
      const h2 = h1.clone();
      h2.position.x = -0.26;
      h2.rotation.z = Math.PI / 2;
      g.add(h1, h2);
      return g;
    },
    ciborium() {
      const g = new THREE.Group();
      const gold = { metalness: 0.82, roughness: 0.22 };
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.045, 24), mat("#e6c56b", gold));
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.034, 0.18, 12), mat("#e6c56b", gold));
      stem.position.y = 0.12;
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.045, 14, 12), mat("#e6c56b", gold));
      node.position.y = 0.18;
      const cup = lathe([[0.02, 0], [0.09, 0], [0.12, 0.05], [0.16, 0.14], [0.13, 0.22]], "#e6c56b", gold);
      cup.position.y = 0.22;
      const lid = new THREE.Mesh(new THREE.SphereGeometry(0.13, 22, 14, 0, Math.PI * 2, 0, Math.PI / 2), mat("#e6c56b", gold));
      lid.position.y = 0.44;
      const finial = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), mat("#e6c56b", gold));
      finial.position.y = 0.58;
      const cross = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.08, 0.016), mat("#e6c56b", gold));
      cross.position.y = 0.66;
      g.add(foot, stem, node, cup, lid, finial, cross);
      return g;
    },
    coin() {
      const g = new THREE.Group();
      const face = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.035, 32),
        new THREE.MeshStandardMaterial({ map: coinTexture(), color: "#8e949b", metalness: 0.72, roughness: 0.32 })
      );
      g.add(face);
      g.rotation.x = -0.7;
      g.position.y = 0.08;
      return g;
    },
    stamps() {
      return framed(canvasTex(640, 420, drawStamps), 1.15, 0.78, "#efe6d6");
    },
    manuscript() {
      return framed(canvasTex(520, 680, drawManuscript), 0.72, 0.96, "#f4efe6");
    },
    medallion() {
      const g = new THREE.Group();
      const face = new THREE.Mesh(
        new THREE.CircleGeometry(0.34, 40),
        new THREE.MeshStandardMaterial({ map: medallionTexture(), metalness: 0.55, roughness: 0.4, color: "#e6e7ea" })
      );
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.04, 10, 40), mat("#f2f1ee", { metalness: 0.7, roughness: 0.28 }));
      g.add(face, ring);
      return g;
    },
    crown() {
      const g = new THREE.Group();
      const teal = mat("#1c7c84", { metalness: 0.62, roughness: 0.28 });
      const gold = mat("#e6c56a", { metalness: 0.8, roughness: 0.24 });
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.1, 28), teal);
      band.position.y = 0.05;
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.15, 22, 12, 0, Math.PI * 2, 0, Math.PI / 2), teal);
      dome.position.y = 0.1;
      g.add(band, dome);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.16, 8), gold);
        spike.position.set(Math.cos(a) * 0.15, 0.2, Math.sin(a) * 0.15);
        const gem = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), mat("#f2d56a", { metalness: 0.6, roughness: 0.25 }));
        gem.position.set(Math.cos(a) * 0.17, 0.1, Math.sin(a) * 0.17);
        g.add(spike, gem);
      }
      const cv = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.09, 0.02), gold);
      cv.position.y = 0.32;
      const ch = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.018, 0.018), gold);
      ch.position.y = 0.34;
      g.add(cv, ch);
      return g;
    },
    bust() {
      const g = new THREE.Group();
      const skin = mat("#f4f1ea", { roughness: 0.86 });
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 18), skin);
      head.scale.set(0.92, 1.08, 0.86);
      head.position.y = 0.24;
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.1, 16), skin);
      neck.position.y = 0.08;
      const chest = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), skin);
      const hat = mat("#1a1a1a", { roughness: 0.55 });
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.1, 20), hat);
      cap.position.y = 0.38;
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.025, 24), hat);
      brim.position.y = 0.33;
      g.add(head, neck, chest, cap, brim);
      return g;
    },
    cross() {
      const g = new THREE.Group();
      const metal = mat("#e4e6ea", { metalness: 0.85, roughness: 0.22 });
      const v = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.46, 0.04), metal);
      v.position.y = 0.23;
      const h = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.055, 0.04), metal);
      h.position.y = 0.32;
      g.add(v, h);
      return g;
    },
    goldCross() {
      const g = new THREE.Group();
      const metal = mat("#e2b34a", { metalness: 0.88, roughness: 0.24, emissive: "#6a4a12", emissiveIntensity: 0.25 });
      const v = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.72, 0.05), metal);
      const h = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.07, 0.05), metal);
      h.position.y = 0.1;
      [[0, 0.36], [0, -0.36], [-0.21, 0.1], [0.21, 0.1]].forEach(([x, y]) => {
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 10), metal);
        cap.position.set(x, y, 0);
        g.add(cap);
      });
      g.add(v, h);
      return g;
    },
    tusk() {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.55, -0.02, 0),
        new THREE.Vector3(-0.08, 0.2, 0.04),
        new THREE.Vector3(0.36, 0.14, 0),
        new THREE.Vector3(0.68, -0.12, 0),
      ]);
      return new THREE.Mesh(
        new THREE.TubeGeometry(curve, 24, 0.05, 8, false),
        mat("#e6d3a8", { roughness: 0.42 })
      );
    },
    goldDisc() {
      const tex = canvasTex(256, 256, (ctx, w, h) => {
        ctx.fillStyle = "#d4a84b";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w * 0.46, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#3a2610";
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(w / 2 + Math.cos(a) * w * 0.27, h / 2 + Math.sin(a) * h * 0.27, w * 0.038, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w * 0.07, 0, Math.PI * 2);
        ctx.fill();
      });
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(0.2, 40),
        new THREE.MeshStandardMaterial({ map: tex, metalness: 0.62, roughness: 0.32, side: THREE.DoubleSide })
      );
      return disc;
    },
    goldFigure() {
      const g = new THREE.Group();
      const gold = mat("#e0b44a", { metalness: 0.75, roughness: 0.28 });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.14, 14), gold);
      body.position.y = 0.1;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 12), gold);
      head.position.y = 0.21;
      g.add(body, head);
      return g;
    },
    diadem() {
      const g = new THREE.Group();
      const colors = ["#e6c84a", "#e0863a", "#c6453a", "#8a5a3a", "#e6d2a8", "#5a3828"];
      for (let i = 0; i < 11; i++) {
        const feather = new THREE.Mesh(
          new THREE.ConeGeometry(0.03, 0.18 + (i % 3) * 0.06, 6),
          mat(colors[i % colors.length], { roughness: 0.72 })
        );
        const a = (i - 5) * 0.16;
        feather.position.set(Math.sin(a) * 0.32, 0.14, Math.cos(a) * 0.05);
        feather.rotation.z = -a * 0.5;
        g.add(feather);
      }
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.022, 8, 20, Math.PI), mat("#5a3828", { roughness: 0.8 }));
      band.rotation.y = Math.PI / 2;
      band.rotation.z = Math.PI;
      band.position.y = 0.04;
      g.add(band);
      return g;
    },
    mineros() {
      return framed(canvasTex(700, 520, (ctx, w, h) => drawSketch(ctx, w, h, false)), 1.25, 0.92, "#f7f4ef");
    },
    stoneBust() {
      const g = new THREE.Group();
      const stone = mat("#a3a8ad", { roughness: 0.92 });
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 22, 16), stone);
      head.scale.set(0.9, 1.12, 0.86);
      head.position.y = 0.46;
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.12, 16), stone);
      neck.position.y = 0.28;
      const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.28, 18), stone);
      chest.position.y = 0.12;
      g.add(head, neck, chest);
      return g;
    },
    arhat() {
      const g = new THREE.Group();
      const bronze = mat("#7d8c48", { metalness: 0.48, roughness: 0.42 });
      const cloth = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.08, 16), mat("#3e7a46", { roughness: 0.8 }));
      cloth.position.y = 0.03;
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), bronze);
      body.scale.set(1.05, 0.72, 0.85);
      body.position.y = 0.16;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 18, 14), bronze);
      head.position.y = 0.36;
      const knot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), mat("#e0b44a", { metalness: 0.6, roughness: 0.3 }));
      knot.position.y = 0.47;
      g.add(cloth, body, head, knot);
      return g;
    },
    crowd() {
      return framed(canvasTex(700, 520, (ctx, w, h) => drawSketch(ctx, w, h, true)), 1.2, 0.9, "#f4f1ea");
    },
    capital() {
      const g = new THREE.Group();
      const stone = mat("#e7e1d6", { roughness: 0.95 });
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.16, 0.22, 22), stone);
      bowl.position.y = 0.11;
      const top = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.1, 0.28), stone);
      top.position.y = 0.26;
      g.add(bowl, top);
      for (let i = 0; i < 5; i++) {
        const bump = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), stone);
        bump.position.set(-0.24 + i * 0.12, 0.34, 0.12);
        g.add(bump);
      }
      return g;
    },
    smallFigure() {
      const g = new THREE.Group();
      const stone = mat("#b7b1a8", { roughness: 0.9 });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.22, 12), stone);
      body.position.y = 0.14;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.055, 14, 12), stone);
      head.position.y = 0.3;
      g.add(body, head);
      return g;
    },
    portrait() {
      const g = new THREE.Group();
      const face = new THREE.Mesh(
        new THREE.CircleGeometry(0.12, 28),
        new THREE.MeshStandardMaterial({ map: medallionTexture(), metalness: 0.45, roughness: 0.4 })
      );
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.018, 8, 28), mat("#c6a15b", { metalness: 0.7, roughness: 0.3 }));
      g.add(face, ring);
      return g;
    },
    buddha() {
      const g = new THREE.Group();
      const gold = mat("#e0b44a", { metalness: 0.7, roughness: 0.28 });
      const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 0.07, 24), mat("#f4f1ea", { roughness: 0.6 }));
      const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.06, 24), mat("#9a3a3a", { roughness: 0.55 }));
      t2.position.y = 0.07;
      const t3 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.05, 24), gold);
      t3.position.y = 0.12;
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.15, 22, 16), gold);
      body.scale.set(1.05, 0.78, 0.9);
      body.position.y = 0.26;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.085, 18, 14), gold);
      head.position.y = 0.42;
      const ush = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), gold);
      ush.position.y = 0.51;
      g.add(t1, t2, t3, body, head, ush);
      return g;
    },
    queen() {
      const g = new THREE.Group();
      const gold = mat("#c6a15b", { metalness: 0.62, roughness: 0.38 });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 0.28, 16), gold);
      body.position.y = 0.16;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 12), gold);
      head.position.y = 0.36;
      g.add(body, head);
      for (let i = 0; i < 7; i++) {
        const a = (i - 3) * 0.22;
        const spike = new THREE.Mesh(
          new THREE.ConeGeometry(0.022, 0.16, 6),
          mat(i % 2 ? "#c6453a" : "#e0b44a", { roughness: 0.45, metalness: 0.4 })
        );
        spike.position.set(Math.sin(a) * 0.08, 0.5, Math.cos(a) * 0.03);
        spike.rotation.z = -a;
        g.add(spike);
      }
      return g;
    },
    dancers() {
      return framed(canvasTex(640, 760, drawDancers), 1.05, 1.22, "#d9d4cc");
    },
    disc() {
      const g = new THREE.Group();
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.035, 28),
        mat("#6f8f78", { roughness: 0.45, metalness: 0.25 })
      );
      g.add(disc);
      g.rotation.x = -0.4;
      g.position.y = 0.06;
      return g;
    },
    bracelet() {
      const g = new THREE.Group();
      const gold = mat("#e2c16a", { metalness: 0.82, roughness: 0.22 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.028, 12, 40), gold);
      ring.rotation.x = Math.PI / 2.5;
      g.add(ring);
      for (let i = 0; i < 8; i++) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), gold);
        const a = (i / 8) * Math.PI * 2;
        s.position.set(Math.cos(a) * 0.22, Math.sin(a) * 0.05, Math.sin(a) * 0.16);
        g.add(s);
      }
      return g;
    },
  };

  function addShaft(parent) {
    const tex = canvasTex(128, 256, (ctx, w, h) => {
      const grd = ctx.createLinearGradient(0, 0, w, 0);
      grd.addColorStop(0, "rgba(255,244,220,0)");
      grd.addColorStop(0.42, "rgba(255,236,205,0.55)");
      grd.addColorStop(0.58, "rgba(255,236,205,0.55)");
      grd.addColorStop(1, "rgba(255,244,220,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    });
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 3.4),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide })
    );
    plane.position.set(-0.35, 1.7, 0.15);
    plane.rotation.y = 0.55;
    plane.rotation.z = -0.18;
    parent.add(plane);
  }

  const plasterCache = {};
  function plasterMap(hex) {
    if (plasterCache[hex]) return plasterCache[hex];
    const tex = canvasTex(256, 256, (ctx) => {
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, 256, 256);
      const img = ctx.getImageData(0, 0, 256, 256);
      for (let i = 0; i < img.data.length; i += 4) {
        const n = (Math.random() - 0.5) * 16;
        img.data[i] += n;
        img.data[i + 1] += n;
        img.data[i + 2] += n * 0.7;
      }
      ctx.putImageData(img, 0, 0);
      ctx.save();
      ctx.translate(128, 128);
      ctx.rotate(-0.62);
      ctx.fillStyle = "rgba(255,248,236,0.22)";
      for (let x = -300; x < 300; x += 26) ctx.fillRect(x, -300, 9, 600);
      ctx.restore();
    });
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    plasterCache[hex] = tex;
    return tex;
  }

  function addFurniture(parent, spec) {
    let mesh;
    const material = mat(spec.color, { roughness: spec.type === "panel" ? 0.94 : 0.88 });
    if (spec.type === "cyl") mesh = new THREE.Mesh(new THREE.CylinderGeometry(spec.r, spec.r * 0.98, spec.h, 28), material);
    else if (spec.type === "panel") mesh = new THREE.Mesh(new THREE.BoxGeometry(spec.w, spec.h, 0.08), material);
    else mesh = new THREE.Mesh(new THREE.BoxGeometry(spec.w, spec.h, spec.d), material);
    const h = spec.h;
    mesh.position.set(spec.x, (spec.y != null ? spec.y : h / 2 + (spec.base || 0)), spec.z);
    if (spec.base) mesh.position.y = spec.base + h / 2;
    parent.add(mesh);
    if (spec.type !== "panel") {
      const r = spec.r || Math.max(spec.w, spec.d) * 0.55;
      const shadow = new THREE.Mesh(
        new THREE.CircleGeometry(r * 1.15, 20),
        new THREE.MeshBasicMaterial({ color: 0x6a5344, transparent: true, opacity: 0.16, depthWrite: false })
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(spec.x, 0.012, spec.z);
      parent.add(shadow);
    }
  }

  function tag(group, item) {
    group.traverse((m) => {
      if (!m.isMesh) return;
      m.userData.item = item;
      m.userData.artifact = true;
      pickables.push(m);
    });
  }

  const pivots = [];
  STATIONS.forEach((station, index) => {
    const pivot = new THREE.Group();
    const group = new THREE.Group();
    group.position.y = -1.55;
    station.furniture.forEach((spec) => addFurniture(group, spec));
    addShaft(group);
    station.objects.forEach((spec) => {
      const item = byId[spec.id];
      if (!item || !builders[spec.kind]) return;
      stationOf[spec.id] = index;
      const object = builders[spec.kind]();
      object.position.set(spec.x, spec.y, spec.z);
      if (spec.s) object.scale.setScalar(spec.s);
      tag(object, item);
      group.add(object);
    });
    pivot.add(group);
    scene.add(pivot);
    pivots.push(pivot);
  });

  function matches(item) {
    if (!item) return true;
    if (filter.region && !(item.regions || []).includes(filter.region)) return false;
    if (filter.use && !(item.uses || []).includes(filter.use)) return false;
    if (filter.color && !(item.colors || []).includes(filter.color)) return false;
    return true;
  }

  function applyFilter() {
    pickables.forEach((mesh) => {
      const on = matches(mesh.userData.item);
      mesh.material.opacity = on ? 1 : 0.14;
      mesh.material.transparent = !on;
      mesh.material.needsUpdate = true;
    });
    $("uses-btn").classList.toggle("on", !!filter.use);
    $("colors-btn").classList.toggle("on", !!filter.color);
    $("regions-btn").classList.toggle("on", !!filter.region);
  }

  let fallV = 0;

  function updateCamera(t) {
    const n = STATIONS.length - 1;
    const x = Math.max(0, Math.min(n, t));
    pivots.forEach((pivot, index) => {
      const delta = index - x;
      const d = Math.max(-1.2, Math.min(1.2, delta));
      const ad = Math.min(Math.abs(d), 1);
      let flip;
      let rise;
      if (d >= 0) {
        flip = Math.pow(Math.min(d, 1), 0.7) * 1.75;
        rise = Math.pow(Math.min(d, 1), 1.8) * 7.2;
      } else {
        flip = -Math.pow(ad, 0.55) * 2.6;
        rise = Math.pow(ad, 0.45) * 8;
      }
      pivot.position.set(0, 1.55 + rise, -5.2);
      pivot.rotation.set(flip, 0, 0);
      pivot.visible = Math.abs(delta) < 1.15;
    });
    camera.up.set(0, 1, 0);
    camera.position.set(aimX * 0.12, 1.9 + aimY * 0.04, 2.15);
    look.set(aimX * 0.04, 1.55, -5.2);
    camera.lookAt(look);
    keyOffset.set(-2.2, 3.2, 1.6).applyQuaternion(camera.quaternion);
    key.position.copy(camera.position).add(keyOffset);
    key.target.position.copy(look);
  }

  function frame() {
    if (moveAxis) {
      targetP = clamp(targetP + moveAxis * 0.016, 0, STATIONS.length - 1);
      traveled = true;
    }
    aimX += (lookX + stickX * 0.9 - aimX) * 0.12;
    aimY += (lookY - aimY) * 0.12;
    if (drag) {
      fallV = 0;
      p += (targetP - p) * 0.45;
    } else {
      const diff = targetP - p;
      fallV = fallV * 0.92 + diff * 0.0032;
      p += fallV;
      if (Math.abs(diff) < 0.0015 && Math.abs(fallV) < 0.0015) {
        p = targetP;
        fallV = 0;
      }
    }
    updateCamera(p);
    const time = performance.now() * 0.001;
    debris.forEach((d) => {
      d.rotation.y += 0.002 * d.userData.spin;
      d.position.y = d.userData.base + Math.sin(time * d.userData.spin + d.userData.base) * 0.12;
    });
    const idx = Math.round(p);
    if (traveled && Math.abs(p - idx) < 0.045 && discoverStation !== idx && !hovering) {
      discoverStation = idx;
      setDiscover(byId[STATIONS[idx].primary]);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  updateCamera(0);
  requestAnimationFrame(frame);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function short(s, n) {
    const t = String(s || "").replace(/^['‘"]|['’”"]$/g, "");
    return t.length > n ? t.slice(0, n).trimEnd() + "…" : t;
  }
  function prettyColor(key) {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  }
  function regionNames(item) {
    return (item.regions || []).map((r) => REGION_LABEL[r] || r).join(", ");
  }

  const tip = $("tip");
  const discover = $("discover");
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let drag = null;
  let wheelTimer = 0;

  function setPointer(e) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  function hitAt(e) {
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    return hits.find((h) => matches(h.object.userData.item)) || null;
  }

  function setDiscover(item) {
    if (!item) return;
    currentItem = item;
    discover.hidden = false;
    discover.querySelector("strong").textContent = short(item.title, 28);
  }

  renderer.domElement.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, p: targetP, lx: lookX, moved: false };
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (Math.hypot(dx, dy) > 4) drag.moved = true;
    lookX = clamp(drag.lx - dx * 0.0028, -1.3, 1.3);
    targetP = clamp(drag.p - dy * 0.0065, 0, STATIONS.length - 1);
    if (drag.moved) traveled = true;
  });
  window.addEventListener("pointerup", () => {
    if (drag && drag.moved) targetP = clamp(Math.round(targetP), 0, STATIONS.length - 1);
    drag = null;
  });

  renderer.domElement.addEventListener("pointermove", (e) => {
    if (drag && drag.moved) {
      tip.hidden = true;
      hovering = false;
      return;
    }
    const hit = hitAt(e);
    if (!hit) {
      tip.hidden = true;
      hovering = false;
      renderer.domElement.style.cursor = "";
      return;
    }
    hovering = true;
    const item = hit.object.userData.item;
    tip.hidden = false;
    tip.textContent = short(item.title, 22);
    tip.style.left = e.clientX + 14 + "px";
    tip.style.top = e.clientY - 18 + "px";
    renderer.domElement.style.cursor = "pointer";
    setDiscover(item);
  });
  renderer.domElement.addEventListener("pointerleave", () => {
    tip.hidden = true;
    hovering = false;
  });
  renderer.domElement.addEventListener("click", (e) => {
    if (drag && drag.moved) return;
    const hit = hitAt(e);
    if (hit) openDetail(hit.object.userData.item);
  });

  window.addEventListener("wheel", (e) => {
    if (document.body.classList.contains("home")) return;
    if ($("regions").classList.contains("open") || !$("search").hidden || !$("detail").hidden) return;
    e.preventDefault();
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    targetP = clamp(targetP - delta * 0.0022, 0, STATIONS.length - 1);
    traveled = true;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      targetP = clamp(Math.round(targetP), 0, STATIONS.length - 1);
    }, 160);
  }, { passive: false });

  window.addEventListener("keydown", (e) => {
    if (e.target && e.target.matches && e.target.matches("input, textarea")) {
      if (e.key === "Escape") e.target.blur();
      return;
    }
    if (e.key === "Escape") { closeTop(); return; }
    if (["ArrowUp", "ArrowRight", "PageUp"].includes(e.key)) {
      targetP = Math.min(STATIONS.length - 1, Math.round(targetP) + 1);
      traveled = true;
    }
    if (["ArrowDown", "ArrowLeft", "PageDown"].includes(e.key)) {
      targetP = Math.max(0, Math.round(targetP) - 1);
      traveled = true;
    }
  });

  const joy = $("joy");
  const knob = joy.querySelector("i");
  joy.addEventListener("pointerdown", (e) => {
    joy.setPointerCapture(e.pointerId);
    joy.classList.add("drag");
    moveJoy(e);
  });
  joy.addEventListener("pointermove", (e) => { if (joy.classList.contains("drag")) moveJoy(e); });
  function endJoy() {
    joy.classList.remove("drag");
    knob.style.transform = "translate(-50%, -50%)";
    moveAxis = 0;
    stickX = 0;
    targetP = clamp(Math.round(targetP), 0, STATIONS.length - 1);
  }
  joy.addEventListener("pointerup", endJoy);
  joy.addEventListener("pointercancel", endJoy);
  function moveJoy(e) {
    const r = joy.getBoundingClientRect();
    let x = e.clientX - (r.left + r.width / 2);
    let y = e.clientY - (r.top + r.height / 2);
    const max = r.width * 0.28;
    const len = Math.hypot(x, y) || 1;
    const scale = Math.min(max, len) / len;
    x *= scale;
    y *= scale;
    knob.style.transform = "translate(calc(-50% + " + x + "px), calc(-50% + " + y + "px))";
    moveAxis = -y / max;
    stickX = x / max;
  }

  function syncOverlay() {
    const open = $("regions").classList.contains("open") || !$("search").hidden || !$("menu").hidden || !$("detail").hidden || !$("pop").hidden;
    document.body.classList.toggle("overlay-open", open);
    document.body.classList.toggle("sheet-open", $("regions").classList.contains("open"));
  }

  function closeTop() {
    if (!$("detail").hidden) { $("detail").hidden = true; syncOverlay(); return; }
    if (!$("pop").hidden) { $("pop").hidden = true; syncOverlay(); return; }
    if (!$("search").hidden) { $("search").hidden = true; syncOverlay(); return; }
    if ($("regions").classList.contains("open")) { $("regions").classList.remove("open"); syncOverlay(); return; }
    $("menu").hidden = true;
    syncOverlay();
  }

  $("menu-btn").addEventListener("click", () => {
    if (document.body.classList.contains("overlay-open")) closeTop();
    else { $("menu").hidden = false; syncOverlay(); }
  });

  $("menu").addEventListener("click", (e) => {
    const go = e.target.dataset && e.target.dataset.go;
    if (!go) return;
    $("menu").hidden = true;
    if (go === "gallery") { closeTop(); return; }
    if (go === "regions") openRegions();
    if (go === "search") openSearch();
    syncOverlay();
  });

  function openRegions() {
    $("search").hidden = true;
    $("pop").hidden = true;
    $("regions").classList.add("open");
    syncOverlay();
  }
  $("regions-btn").addEventListener("click", () => {
    if ($("regions").classList.contains("open")) $("regions").classList.remove("open");
    else openRegions();
    syncOverlay();
  });

  let lockedRegion = null;
  function paintRegion(id) {
    document.querySelectorAll("#map path").forEach((path) => {
      path.classList.toggle("on", !!id && path.dataset.region === id);
    });
    document.querySelectorAll("#region-list button").forEach((btn) => {
      btn.classList.toggle("on", btn.dataset.region === id);
    });
  }
  document.querySelectorAll("#region-list button").forEach((btn) => {
    btn.addEventListener("mouseenter", () => paintRegion(btn.dataset.region));
    btn.addEventListener("mouseleave", () => paintRegion(lockedRegion));
    btn.addEventListener("click", () => {
      const id = btn.dataset.region;
      lockedRegion = null;
      filter.region = null;
      paintRegion(null);
      applyFilter();
      if (REGION_STOP[id] != null) {
        targetP = REGION_STOP[id];
        traveled = true;
      }
      $("regions").classList.remove("open");
      syncOverlay();
    });
  });
  document.querySelectorAll("#map path").forEach((path) => {
    path.addEventListener("mouseenter", () => paintRegion(path.dataset.region));
    path.addEventListener("mouseleave", () => paintRegion(lockedRegion));
    path.addEventListener("click", () => {
      const id = path.dataset.region;
      lockedRegion = null;
      filter.region = null;
      paintRegion(null);
      applyFilter();
      if (REGION_STOP[id] != null) {
        targetP = REGION_STOP[id];
        traveled = true;
      }
      $("regions").classList.remove("open");
      syncOverlay();
    });
  });

  function openSearch() {
    $("regions").classList.remove("open");
    $("pop").hidden = true;
    $("search").hidden = false;
    renderResults();
    syncOverlay();
    setTimeout(() => $("q").focus(), 30);
  }
  $("search-btn").addEventListener("click", () => {
    if (!$("search").hidden) { $("search").hidden = true; syncOverlay(); }
    else openSearch();
  });
  $("q").addEventListener("input", renderResults);

  function renderResults() {
    const q = $("q").value.trim().toLowerCase();
    const list = CATALOG.filter((o) => {
      if (!matches(o)) return false;
      if (!q) return true;
      return (o.title + " " + o.country + " " + o.artist + " " + o.blurb + " " + o.id).toLowerCase().includes(q);
    });
    $("qcount").textContent = list.length + "";
    const box = $("results");
    box.innerHTML = "";
    list.slice(0, 80).forEach((o) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "result";
      b.innerHTML = "<b></b><em></em>";
      b.querySelector("b").textContent = o.title;
      b.querySelector("em").textContent = [o.country, o.date].filter(Boolean).join(" · ");
      b.addEventListener("click", () => {
        if (stationOf[o.id] != null) {
          targetP = stationOf[o.id];
          traveled = true;
        }
        openDetail(o);
      });
      box.appendChild(b);
    });
  }

  const pop = $("pop");
  function renderPop(mode) {
    pop.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = mode === "use" ? "Uses" : "Colours";
    pop.appendChild(title);
    const row = document.createElement("div");
    row.className = "row";
    const source = mode === "use"
      ? Object.keys(USE_LABEL)
      : Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]).slice(0, 16);
    source.forEach((key) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      const active = mode === "use" ? filter.use === key : filter.color === key;
      if (active) btn.classList.add("on");
      if (mode === "color") {
        const sw = document.createElement("i");
        sw.className = "swatch";
        sw.style.background = COLOR_HEX[key] || "#ccc";
        btn.appendChild(sw);
      }
      btn.appendChild(document.createTextNode(
        (mode === "use" ? USE_LABEL[key] : prettyColor(key)) + " " + (mode === "use" ? useCounts[key] || 0 : colorCounts[key] || 0)
      ));
      btn.addEventListener("click", () => {
        if (mode === "use") filter.use = filter.use === key ? null : key;
        else filter.color = filter.color === key ? null : key;
        applyFilter();
        renderPop(mode);
        if (!$("search").hidden) renderResults();
      });
      row.appendChild(btn);
    });
    pop.appendChild(row);
    if (filter.use || filter.color) {
      const clear = document.createElement("button");
      clear.type = "button";
      clear.className = "clear";
      clear.textContent = "Clear filter";
      clear.addEventListener("click", () => {
        filter.use = null;
        filter.color = null;
        applyFilter();
        renderPop(mode);
      });
      pop.appendChild(clear);
    }
  }
  function togglePop(mode) {
    if (!pop.hidden && pop.dataset.mode === mode) { pop.hidden = true; syncOverlay(); return; }
    $("search").hidden = true;
    pop.dataset.mode = mode;
    pop.hidden = false;
    renderPop(mode);
    syncOverlay();
  }
  $("uses-btn").addEventListener("click", () => togglePop("use"));
  $("colors-btn").addEventListener("click", () => togglePop("color"));

  function openDetail(item) {
    if (!item) return;
    currentItem = item;
    setDiscover(item);
    const root = $("detail");
    const colors = (item.colors || []).map((c) => '<i style="background:' + (COLOR_HEX[c] || "#ccc") + '"></i>').join("");
    const rows = [
      ["Region", regionNames(item)],
      ["Submitted by", item.country],
      ["Date", (item.date || "").trim()],
      ["Artist", item.artist],
      ["Materials", (item.materials || []).map((m) => MATERIAL_LABEL[m] || m).join(", ")],
      ["Dimensions", item.dims],
      ["Uses", (item.uses || []).map((u) => USE_LABEL[u] || u).join(", ")],
    ].filter((row) => row[1]);
    root.innerHTML =
      '<button class="x" type="button" aria-label="Close">×</button>' +
      '<div class="eyebrow"></div><h2></h2>' +
      (item.blurb ? '<p class="blurb"></p>' : "") +
      (colors ? '<div class="swatches">' + colors + "</div>" : "") +
      "<dl>" + rows.map(() => "<div><dt></dt><dd></dd></div>").join("") + "</dl>" +
      '<p class="note"></p><a class="official" target="_blank" rel="noreferrer">View the official museum</a>';
    root.querySelector(".eyebrow").textContent = item.id;
    root.querySelector("h2").textContent = item.title;
    if (item.blurb) root.querySelector(".blurb").textContent = item.blurb;
    rows.forEach((row, i) => {
      const node = root.querySelectorAll("dl div")[i];
      node.querySelector("dt").textContent = row[0];
      node.querySelector("dd").textContent = row[1];
    });
    const bits = [item.title + " is listed as stolen cultural property"];
    if (item.country) bits.push("submitted by " + item.country);
    if ((item.date || "").trim()) bits.push("dated " + item.date.trim());
    root.querySelector(".note").textContent = bits.join(", ") + ". The picture in the gallery is an original stand-in, not the object itself. Records follow the museum’s public catalogue.";
    root.querySelector(".official").href = "https://museum.unesco.org/stolen-objects/gallery";
    root.querySelector(".x").addEventListener("click", () => { root.hidden = true; syncOverlay(); });
    root.hidden = false;
    root.scrollTop = 0;
    syncOverlay();
  }

  discover.addEventListener("click", () => openDetail(currentItem));

  $("home-btn").addEventListener("click", () => {
    document.body.classList.add("home");
    closeTop();
  });
  $("visit").addEventListener("click", () => {
    document.body.classList.remove("home");
    targetP = 0;
    p = 0;
    traveled = false;
    discover.hidden = true;
    updateCamera(0);
  });
})();
