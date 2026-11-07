import * as THREE from "three";

const BASE = "https://museum.unesco.org/stolen-objects/";

const OBJECTS = [
  {
    id: "skyphos",
    title: "Painted spouted skyphos with two handles",
    region: "europe",
    regionName: "Europe & North America",
    country: "Greece",
    meta: "Ceramic · Geometric period",
    summary: "A tall two-handled cup with a painted spout. Dark bands and hatched panels run around the body, the kind of vessel that would have been set out for wine.",
    slug: "VM-GR-25-011_Painted_spouted_skyphos_with_two_handles",
    cluster: "opening",
  },
  {
    id: "askos",
    title: "Askos with painted decoration",
    region: "europe",
    regionName: "Europe & North America",
    country: "Greece",
    meta: "Ceramic · painted",
    summary: "A low askos, a vessel shaped for pouring. Ribbed shoulders and a dark painted band sit on a pale clay body.",
    slug: "VM-GR-25-012_Askos_with_painted_decoration",
    cluster: "opening",
  },
  {
    id: "stamps",
    title: "Sheet of 84 postal stamps",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Ecuador",
    meta: "Printed paper · postage",
    summary: "A full sheet of postage stamps, read from across the hall as a blue grid of repeated frames.",
    slug: "VM-EC-24-006_Sheet_of_84_postal_stamps",
    cluster: "opening",
  },
  {
    id: "ciborium",
    title: "Ciborium",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Honduras",
    meta: "Gilded metal · liturgical",
    summary: "A covered cup used to hold the consecrated host, with a knopped stem and a small cross rising from the lid.",
    slug: "VM-HN-25-009_Ciborium",
    cluster: "opening",
  },
  {
    id: "medallion",
    title: "Medallion",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Guatemala",
    meta: "Metal · ornament",
    summary: "A small dark medallion, dense enough to read as a single disc against the pale plaster.",
    slug: "VM-GT-24-002_Medallion",
    cluster: "opening",
  },
  {
    id: "crown",
    title: "Imperial Crown",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Honduras",
    meta: "Gold and turquoise · regalia",
    summary: "An open crown set with turquoise-coloured stones. The arches are thin, and the whole piece sits lightly on its pedestal.",
    slug: "VM-HN-25-008_Imperial_Crown",
    cluster: "crown",
  },
  {
    id: "missale",
    title: "Missale Strigoniense, or Perényi Missale",
    region: "europe",
    regionName: "Europe & North America",
    country: "Hungary",
    meta: "Illuminated manuscript",
    summary: "An open liturgical book. Red and blue initials break up two columns of small script on a warm parchment ground.",
    slug: "VM-HU-24-001_Missale_Strigoniense_or_Perenyi_Missale",
    cluster: "crown",
  },
  {
    id: "bust",
    title: "Bust of a man in military uniform",
    region: "arab",
    regionName: "Arab States",
    country: "Algeria",
    meta: "Stone · portrait",
    summary: "A hatted bust in uniform, cut off at the chest and set on a dark column so the profile reads against the rings.",
    slug: "VM-DZ-24-002_Bust_of_a_man_in_military_uniform",
    cluster: "crown",
  },
  {
    id: "cross",
    title: "Processional cross",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Guatemala",
    meta: "Gilded metal · processional",
    summary: "A gold processional cross with flared ends and a small figure at the crossing, meant to be carried ahead of a rite.",
    slug: "VM-GT-24-008_Processional_cross",
    cluster: "crown",
  },
  {
    id: "severus",
    title: "Head of Septimius Severus",
    region: "arab",
    regionName: "Arab States",
    country: "Algeria",
    meta: "Stone · Roman portrait",
    summary: "A grey stone head of the emperor, the beard and drilled eyes still readable after the body was lost.",
    slug: "VM-DZ-24-001_Head_of_Septimius_Severus",
    cluster: "arhat",
  },
  {
    id: "arhat",
    title: "Bronze Arhat with left knee raised",
    region: "asia",
    regionName: "Asia & the Pacific",
    country: "China",
    meta: "Gilded bronze · Buddhist figure",
    summary: "A seated arhat, one knee lifted, the robe falling in hard folds. The bronze reads as gold under the gallery light.",
    slug: "VM-CN-25-001_Bronze_Arhat_with_left_knee_raised",
    cluster: "arhat",
  },
  {
    id: "diadem",
    title: "Akangatar feathered diadem",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Brazil",
    meta: "Feathers · headdress",
    summary: "A feathered diadem opening into a coloured arc, each vane a short stroke of red, yellow, green or blue.",
    slug: "VM-BR-25-003_Akangatar_Feathered_diadem",
    cluster: "arhat",
  },
  {
    id: "tusk",
    title: "Sung so elephant tusk",
    region: "africa",
    regionName: "Africa",
    country: "Cameroon",
    meta: "Ivory · carved tusk",
    summary: "A single elephant tusk, curved and left largely bare, floating beside the darker panel.",
    slug: "VM-CM-25-002_Sung_so_elephant_tusk",
    cluster: "mineros",
  },
  {
    id: "byzantine",
    title: "Reliquary cross of the Holy Cross, known as the Byzantine Cross",
    region: "europe",
    regionName: "Europe & North America",
    country: "Belgium",
    meta: "Gilded metal · reliquary",
    summary: "An ornate cross with a braided stem and trefoil ends, made to hold a relic rather than to be worn.",
    slug: "VM-BE-25-001_Reliquary_cross_of_the_Holy_Cross_known_as_the_Byzantine_Cross",
    cluster: "mineros",
  },
  {
    id: "mineros",
    title: "'Mineros Orientados Al Nechi' painting",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Colombia",
    meta: "Painting · figural group",
    summary: "A black-and-white gathering: a row of standing figures pressed together above a darker foreground, set in a pale frame.",
    slug: "VM-CO-24-006_Mineros_Orientados_Al_Nechi_painting",
    cluster: "mineros",
  },
  {
    id: "aflema",
    title: "Aflema circular gold pendant",
    region: "africa",
    regionName: "Africa",
    country: "Côte d'Ivoire",
    meta: "Gold · pendant",
    summary: "A small circular gold pendant, the face punched with a ring of holes around a raised centre.",
    slug: "VM-CI-24-010_Aflema_Circular_gold_pendant",
    cluster: "mineros",
  },
  {
    id: "tagabi",
    title: "Taga Bi statuette",
    region: "africa",
    regionName: "Africa",
    country: "Burkina Faso",
    meta: "Wood or metal · standing figure",
    summary: "A small standing figure, compact and frontal, set apart from the painting on the right.",
    slug: "VM-BF-25-001_TagaBi_statuette",
    cluster: "mineros",
  },
  {
    id: "mercy",
    title: "Sculpture of Our Lady of Mercy",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Honduras",
    meta: "Polychrome sculpture",
    summary: "A devotional figure built up in stacked colour: a pale face, a robe, and a base that reads as part of the sculpture.",
    slug: "VM-HN-25-007_Sculpture_of_Our_Lady_of_Mercy",
    cluster: "mercy",
  },
  {
    id: "bailarinas",
    title: "Bailarinas painting",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Colombia",
    meta: "Painting · three dancers",
    summary: "Three women in long white dresses, standing close, the ground behind them a muted mauve.",
    slug: "VM-CO-24-009_Bailarinas_painting",
    cluster: "mercy",
  },
  {
    id: "bracelet",
    title: "Gold Dacian bracelet with scaled dragon",
    region: "europe",
    regionName: "Europe & North America",
    country: "Romania",
    meta: "Gold · bracelet",
    summary: "A heavy gold bracelet, the body coiled and the terminals worked into a scaled dragon head.",
    slug: "VM-RO-25-003_Gold_Dacian_bracelet_with_scaled_dragon",
    cluster: "mercy",
  },
  {
    id: "jadeite",
    title: "Jadeite pendant",
    region: "latam",
    regionName: "Latin America & the Caribbean",
    country: "Honduras",
    meta: "Jadeite · pendant",
    summary: "A small green pendant, only a few centimetres across, set on a short pink block so it is not lost in the hall.",
    slug: "VM-HN-25-002_Jadeite_pendant",
    cluster: "mercy",
  },
];

const byId = Object.fromEntries(OBJECTS.map((o) => [o.id, o]));

const STOPS = [
  { id: "opening", title: "Askos & Ciborium", z: 0, eye: [0.05, 1.15, 8.4] },
  { id: "crown", title: "Crown & manuscript", z: -16, eye: [0.05, 1.15, -7.6] },
  { id: "arhat", title: "Bronze Arhat", z: -32, eye: [0, 1.15, -23.6] },
  { id: "mineros", title: "Mineros constellation", z: -48, eye: [0.05, 1.1, -39.3] },
  { id: "mercy", title: "Our Lady of Mercy", z: -64, eye: [0, 1.15, -55.6] },
];

const REGION_STOP = {
  europe: "opening",
  latam: "mercy",
  asia: "arhat",
  africa: "mineros",
  arab: "crown",
};

const canvas = document.getElementById("view");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4eee4);
scene.fog = new THREE.Fog(0xf3ecdf, 7, 28);

const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.08, 80);
const home = { x: 0.05, y: 1.15, z: 8.4, yaw: 0, pitch: -0.12 };
const cam = { ...home };
let yaw = home.yaw;
let pitch = home.pitch;
applyCamera();

scene.add(new THREE.HemisphereLight(0xfff6ea, 0xc8b39a, 1.15));
const sun = new THREE.DirectionalLight(0xfff3e2, 1.35);
sun.position.set(6, 9, 8);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 40;
sun.shadow.camera.left = -12;
sun.shadow.camera.right = 12;
sun.shadow.camera.top = 12;
sun.shadow.camera.bottom = -12;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xf0d2b8, 0.35);
fill.position.set(-5, 2, -4);
scene.add(fill);

const texCache = new Map();
function plaster(hex) {
  if (texCache.has(hex)) return texCache.get(hex);
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = hex;
  g.fillRect(0, 0, 256, 256);
  const img = g.getImageData(0, 0, 256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 18;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n * 0.7;
  }
  g.putImageData(img, 0, 0);
  g.save();
  g.translate(128, 128);
  g.rotate(-0.62);
  g.fillStyle = "rgba(255,248,236,0.16)";
  for (let x = -280; x < 280; x += 28) {
    g.fillRect(x, -280, 11, 560);
  }
  g.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  texCache.set(hex, t);
  return t;
}

function paint(draw, w = 512, h = 512) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const gold = new THREE.MeshStandardMaterial({
  color: 0xd4a84b,
  metalness: 0.92,
  roughness: 0.28,
});
const goldDark = gold.clone();
goldDark.color = new THREE.Color(0xb8883a);
const clay = (color, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.02, ...extra });
const stoneMat = new THREE.MeshStandardMaterial({ color: 0xb7b1a8, roughness: 0.86 });
const darkStone = new THREE.MeshStandardMaterial({ color: 0x6d675f, roughness: 0.8 });

function plinth(kind, color, w, h, d) {
  const mat = new THREE.MeshStandardMaterial({ map: plaster(color), roughness: 0.96 });
  let mesh;
  if (kind === "cyl") mesh = new THREE.Mesh(new THREE.CylinderGeometry(w, w * 0.98, h, 28), mat);
  else mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d || w), mat);
  mesh.position.y = h / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function tag(mesh, id) {
  mesh.traverse((n) => {
    if (n.isMesh && n.userData.pick !== false) n.userData.id = id;
  });
}

function lathe(points, mat) {
  const m = new THREE.Mesh(new THREE.LatheGeometry(points, 28), mat);
  m.castShadow = true;
  return m;
}

function frame(texture, w, h) {
  const g = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.14, h + 0.14, 0.05),
    new THREE.MeshStandardMaterial({ color: 0xe8e2d8, roughness: 0.55 })
  );
  board.userData.pick = false;
  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 })
  );
  art.position.z = 0.03;
  g.add(board, art);
  return g;
}

function makeObject(id) {
  const g = new THREE.Group();
  if (id === "skyphos") {
    const body = lathe(
      [new THREE.Vector2(0.18, 0), new THREE.Vector2(0.32, 0.08), new THREE.Vector2(0.34, 0.42), new THREE.Vector2(0.22, 0.62), new THREE.Vector2(0.26, 0.7)],
      clay(0x6e3428)
    );
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.025, 8, 24), clay(0x2a1c18));
    band.rotation.x = Math.PI / 2;
    band.position.y = 0.36;
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 8, 16, Math.PI), clay(0x5c2c24));
    handle.position.set(0.32, 0.4, 0);
    const handle2 = handle.clone();
    handle2.position.x = -0.32;
    handle2.rotation.y = Math.PI;
    g.add(body, band, handle, handle2);
  } else if (id === "askos") {
    const body = lathe(
      [new THREE.Vector2(0.08, 0), new THREE.Vector2(0.28, 0.05), new THREE.Vector2(0.3, 0.22), new THREE.Vector2(0.12, 0.32), new THREE.Vector2(0.05, 0.42)],
      clay(0xd8c4a4)
    );
    const rib = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.018, 6, 20), clay(0x3a2a22));
    rib.rotation.x = Math.PI / 2;
    rib.position.y = 0.2;
    g.add(body, rib);
  } else if (id === "stamps") {
    const tex = paint((ctx, w, h) => {
      ctx.fillStyle = "#d7e4ea";
      ctx.fillRect(0, 0, w, h);
      for (let y = 16; y < h - 8; y += 42) {
        for (let x = 16; x < w - 8; x += 36) {
          ctx.fillStyle = "#1f4f86";
          ctx.fillRect(x, y, 30, 34);
          ctx.strokeStyle = "#f4f7f8";
          ctx.strokeRect(x + 2, y + 2, 26, 30);
          ctx.fillStyle = "#e7eef3";
          ctx.fillRect(x + 8, y + 10, 14, 10);
        }
      }
    }, 420, 560);
    g.add(frame(tex, 1.15, 1.55));
  } else if (id === "ciborium") {
    const cup = lathe(
      [new THREE.Vector2(0.16, 0), new THREE.Vector2(0.18, 0.16), new THREE.Vector2(0.05, 0.34), new THREE.Vector2(0.07, 0.48), new THREE.Vector2(0.2, 0.62), new THREE.Vector2(0.16, 0.78)],
      gold
    );
    const lid = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), gold);
    lid.position.y = 0.78;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.08), gold);
    fin.position.y = 0.98;
    g.add(cup, lid, fin);
  } else if (id === "medallion") {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 24), darkStone);
    disc.rotation.x = Math.PI / 2;
    g.add(disc);
  } else if (id === "crown") {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 10, 28), gold);
    band.rotation.x = Math.PI / 2;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const gem = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), clay(0x2f8f8a, { metalness: 0.2, roughness: 0.35 }));
      gem.position.set(Math.cos(a) * 0.28, 0.08, Math.sin(a) * 0.28);
      g.add(gem);
    }
    const arch = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.02, 8, 20, Math.PI), gold);
    arch.rotation.y = Math.PI / 2;
    arch.position.y = 0.02;
    g.add(band, arch);
  } else if (id === "missale") {
    const tex = paint((ctx, w, h) => {
      ctx.fillStyle = "#efe2c4";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#6d4a32";
      for (let col = 0; col < 2; col++) {
        const x = 40 + col * (w / 2);
        for (let y = 36; y < h - 24; y += 11) {
          ctx.fillRect(x, y, w / 2 - 70, 3);
        }
      }
      ctx.fillStyle = "#8d2d2d";
      ctx.fillRect(48, 36, 18, 22);
      ctx.fillStyle = "#234e78";
      ctx.fillRect(w / 2 + 48, 36, 18, 22);
    }, 640, 460);
    g.add(frame(tex, 1.35, 0.98));
  } else if (id === "bust") {
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 16), darkStone);
    head.scale.set(0.9, 1.15, 0.85);
    head.position.y = 0.34;
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.08, 16), darkStone);
    hat.position.y = 0.5;
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.02, 20), darkStone);
    brim.position.y = 0.46;
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.28, 16), darkStone);
    chest.position.y = 0.12;
    g.add(head, hat, brim, chest);
  } else if (id === "cross" || id === "byzantine") {
    const bright = gold.clone();
    bright.emissive = new THREE.Color(0x6a4a12);
    bright.emissiveIntensity = 0.35;
    const vert = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.78, 0.05), bright);
    const horiz = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.07, 0.05), bright);
    horiz.position.y = 0.1;
    [[0, 0.39], [0, -0.39], [-0.23, 0.1], [0.23, 0.1]].forEach(([x, y]) => {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), bright);
      cap.position.set(x, y, 0);
      g.add(cap);
    });
    g.add(vert, horiz);
  } else if (id === "severus") {
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 22, 16), stoneMat);
    head.scale.set(0.86, 1.12, 0.9);
    const beard = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), stoneMat);
    beard.position.set(0, -0.08, 0.08);
    g.add(head, beard);
  } else if (id === "arhat") {
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 16), gold);
    body.scale.set(1, 0.72, 0.85);
    const torso = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), gold);
    torso.position.y = 0.28;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), gold);
    head.position.y = 0.5;
    const knee = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), gold);
    knee.position.set(0.16, 0.16, 0.12);
    g.add(body, torso, head, knee);
  } else if (id === "diadem") {
    for (let i = 0; i < 18; i++) {
      const a = -0.9 + (i / 17) * 1.8;
      const feather = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.42, 0.01), clay([0xc4483a, 0xe2b23a, 0x3d8f62, 0x3a6ea5][i % 4]));
      feather.position.set(Math.sin(a) * 0.55, Math.cos(a) * 0.15 + 0.15, 0);
      feather.rotation.z = -a;
      g.add(feather);
    }
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 8, 20), gold);
    band.rotation.x = Math.PI / 2;
    g.add(band);
  } else if (id === "tusk") {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.55, -0.02, 0),
      new THREE.Vector3(-0.1, 0.22, 0.04),
      new THREE.Vector3(0.38, 0.16, 0),
      new THREE.Vector3(0.7, -0.12, 0),
    ]);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.055, 8, false), clay(0xe7d7ae, { roughness: 0.42 }));
    g.add(mesh);
  } else if (id === "mineros") {
    const tex = paint((ctx, w, h) => {
      ctx.fillStyle = "#eceae4";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#161513";
      for (let i = 0; i < 11; i++) {
        const x = 48 + i * 42;
        ctx.fillRect(x, 150, 18, 150);
        ctx.beginPath();
        ctx.arc(x + 9, 132, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillRect(36, h - 70, w - 72, 36);
    }, 560, 400);
    g.add(frame(tex, 1.35, 0.96));
  } else if (id === "aflema") {
    const tex = paint((ctx, w, h) => {
      ctx.fillStyle = "#c8922e";
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w * 0.46, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3a2610";
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(w / 2 + Math.cos(a) * w * 0.28, h / 2 + Math.sin(a) * h * 0.28, w * 0.04, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w * 0.08, 0, Math.PI * 2);
      ctx.fill();
    });
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(0.2, 40),
      new THREE.MeshStandardMaterial({ map: tex, metalness: 0.65, roughness: 0.35, side: THREE.DoubleSide })
    );
    g.add(disc);
  } else if (id === "tagabi") {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.42, 12), darkStone);
    body.position.y = 0.22;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 12), darkStone);
    head.position.y = 0.5;
    g.add(body, head);
  } else if (id === "mercy") {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.16, 16), clay(0x8d3d32));
    const robe = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.46, 16), clay(0xf2efe6));
    robe.position.y = 0.36;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 12), clay(0xe6c2a2));
    head.position.y = 0.66;
    const mantle = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.22, 12), clay(0x2f4c6e));
    mantle.position.y = 0.5;
    g.add(base, robe, mantle, head);
  } else if (id === "bailarinas") {
    const tex = paint((ctx, w, h) => {
      ctx.fillStyle = "#c9a3b0";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#f7f4ef";
      [0.22, 0.48, 0.74].forEach((p, i) => {
        const x = w * p;
        ctx.beginPath();
        ctx.moveTo(x, h * 0.28);
        ctx.lineTo(x - 28 - i * 4, h * 0.86);
        ctx.lineTo(x + 28 + i * 4, h * 0.86);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, h * 0.24, 12, 0, Math.PI * 2);
        ctx.fill();
      });
    }, 520, 400);
    g.add(frame(tex, 1.25, 0.96));
  } else if (id === "bracelet") {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.045, 12, 28), gold);
    ring.rotation.x = Math.PI / 2.4;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), goldDark);
    head.position.set(0.16, 0.05, 0);
    g.add(ring, head);
  } else if (id === "jadeite") {
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), clay(0x3e8f6a, { metalness: 0.15, roughness: 0.35 }));
    g.add(gem);
  }
  tag(g, id);
  return g;
}

function place(parent, id, x, y, z, rotY = 0) {
  const obj = makeObject(id);
  obj.position.set(x, y, z);
  obj.rotation.y = rotY;
  parent.add(obj);
  return obj;
}

function cluster(z, build) {
  const group = new THREE.Group();
  group.position.z = z;
  build(group);
  scene.add(group);
  return group;
}

function addPlinth(group, kind, color, w, h, d, x, z) {
  const p = plinth(kind, color, w, h, d);
  p.position.x = x;
  p.position.z = z;
  p.userData.pick = false;
  p.traverse((n) => {
    n.userData.pick = false;
  });
  group.add(p);
  return h;
}

cluster(0, (g) => {
  const h1 = addPlinth(g, "box", "#6b3030", 0.62, 1.7, 0.62, -1.25, 0.1);
  place(g, "skyphos", -1.25, h1, 0.1);
  addPlinth(g, "panel", "#e4d3bc", 1.35, 2.15, 0.14, 0.15, -0.55);
  place(g, "stamps", 0.15, 1.15, -0.42);
  const h2 = addPlinth(g, "box", "#c46a48", 0.42, 0.72, 0.42, -0.15, 0.55);
  place(g, "medallion", -0.15, h2 + 0.16, 0.55);
  const h3 = addPlinth(g, "box", "#e7d7c2", 0.5, 0.78, 0.5, 0.7, 0.45);
  place(g, "askos", 0.7, h3, 0.45);
  const h4 = addPlinth(g, "cyl", "#e8d7c0", 0.36, 1.25, 0.36, 1.45, -0.05);
  place(g, "ciborium", 1.45, h4, -0.05);
});

cluster(-16, (g) => {
  addPlinth(g, "panel", "#eadcc8", 1.5, 1.7, 0.12, -1.15, -0.3);
  place(g, "missale", -1.15, 0.95, -0.18);
  const h = addPlinth(g, "box", "#c46a48", 0.7, 0.85, 0.7, 0.15, 0.25);
  place(g, "crown", 0.15, h + 0.08, 0.25);
  const hc = addPlinth(g, "cyl", "#3a2a24", 0.22, 1.35, 0.22, 1.15, -0.15);
  place(g, "bust", 1.15, hc, -0.15);
  place(g, "cross", 0.85, 1.15, 0.55, 0.4);
});

cluster(-32, (g) => {
  const h = addPlinth(g, "box", "#e7a090", 0.85, 0.7, 0.7, -0.85, 0.15);
  place(g, "arhat", -0.85, h, 0.15);
  place(g, "diadem", 0.35, 1.15, -0.15);
  const hs = addPlinth(g, "cyl", "#d9d3c8", 0.22, 1.05, 0.22, 1.25, 0.2);
  place(g, "severus", 1.25, hs + 0.2, 0.2);
});

cluster(-48, (g) => {
  addPlinth(g, "panel", "#5c2a32", 1.4, 2.55, 0.16, -1.05, -0.25);
  addPlinth(g, "panel", "#c46a48", 1.7, 2.7, 0.16, 0.65, -0.05);
  place(g, "mineros", 0.65, 1.7, 0.08);
  addPlinth(g, "box", "#e7dcc8", 0.5, 1.15, 0.5, -1.7, 0.55);
  addPlinth(g, "box", "#c46a48", 0.52, 1.95, 0.52, -0.4, 0.35);
  const hm = addPlinth(g, "box", "#c46a48", 0.46, 1.15, 0.46, 0.4, 0.95);
  place(g, "aflema", 0.4, hm + 0.22, 0.95);
  addPlinth(g, "cyl", "#e6dccb", 0.4, 1.75, 0.4, 1.85, 0.2);
  place(g, "tusk", -1.65, 1.9, 0.2);
  place(g, "byzantine", -1.0, 1.55, 0.2);
  place(g, "tagabi", 1.45, 1.55, 0.5);
});

cluster(-64, (g) => {
  const h = addPlinth(g, "cyl", "#3a2420", 0.28, 0.85, 0.28, -1.2, 0.1);
  place(g, "mercy", -1.2, h, 0.1);
  addPlinth(g, "panel", "#e6d5c2", 1.4, 1.9, 0.12, 0.15, -0.4);
  place(g, "bailarinas", 0.15, 1.05, -0.28);
  const hb = addPlinth(g, "cyl", "#2c241e", 0.22, 1.15, 0.22, 1.35, 0.15);
  place(g, "bracelet", 1.35, hb + 0.16, 0.15);
  const hj = addPlinth(g, "box", "#e7b0b0", 0.32, 0.48, 0.32, 0.85, 0.65);
  place(g, "jadeite", 0.85, hj + 0.1, 0.65);
});

const debris = [];
for (let i = 0; i < 26; i++) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(0.18 + Math.random() * 0.35, 0.04, 0.12 + Math.random() * 0.2),
    clay(Math.random() > 0.5 ? 0xd8c3a4 : 0xc47a58)
  );
  m.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 3.2, -Math.random() * 72);
  m.rotation.set(Math.random(), Math.random(), Math.random());
  m.userData.pick = false;
  scene.add(m);
  debris.push(m);
}

const ringGeoA = new THREE.TorusGeometry(8.4, 0.16, 8, 96);
const ringGeoB = new THREE.TorusGeometry(8.9, 0.11, 8, 96);
const ringMatA = new THREE.MeshStandardMaterial({ color: 0xf7f2e8, roughness: 0.9 });
const ringMatB = new THREE.MeshStandardMaterial({ color: 0xd8cfc0, roughness: 0.94 });
for (let i = 0; i < 56; i++) {
  const ring = new THREE.Mesh(i % 2 ? ringGeoB : ringGeoA, i % 2 ? ringMatB : ringMatA);
  ring.position.z = 8 - i * 1.45;
  ring.rotation.z = i * 0.04;
  scene.add(ring);
}

const pickables = [];
scene.traverse((n) => {
  if (n.isMesh && n.userData.id) pickables.push(n);
});

const keys = new Set();
const stick = { x: 0, y: 0 };
const ray = new THREE.Raycaster();
const pointer = new THREE.Vector2(2, 2);
let hovered = null;
let fly = null;
let dragging = false;
let moved = false;
let sx = 0;
let sy = 0;

function applyCamera() {
  camera.position.set(cam.x, cam.y, cam.z);
  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
}

function clampHall() {
  cam.x = Math.max(-6.2, Math.min(6.2, cam.x));
  cam.y = Math.max(-1.3, Math.min(2.2, cam.y));
  cam.z = Math.max(-70, Math.min(8, cam.z));
}

function flyTo(x, y, z, tyaw = 0, tpitch = -0.06) {
  fly = { x, y, z, yaw: tyaw, pitch: tpitch };
}

function focusObject(id) {
  const mesh = pickables.find((m) => m.userData.id === id);
  if (!mesh) return;
  const p = new THREE.Vector3();
  mesh.getWorldPosition(p);
  flyTo(p.x * 0.2, 1.05, p.z + 5.4, Math.atan2(-p.x * 0.2, 5.4), -0.1);
  openDetail(id);
}

addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase());
  if (e.key === "Escape") closeSheets();
});
addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));

canvas.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return;
  dragging = true;
  moved = false;
  sx = e.clientX;
  sy = e.clientY;
  canvas.classList.add("grabbing");
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener("pointermove", (e) => {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  if (!dragging) return;
  const dx = e.clientX - sx;
  const dy = e.clientY - sy;
  if (Math.hypot(dx, dy) > 3) moved = true;
  if (moved) {
    yaw -= dx * 0.0042;
    pitch -= dy * 0.0032;
    pitch = Math.max(-0.85, Math.min(0.7, pitch));
    fly = null;
  }
  sx = e.clientX;
  sy = e.clientY;
});
canvas.addEventListener("pointerup", (e) => {
  dragging = false;
  canvas.classList.remove("grabbing");
  if (!moved) {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / innerHeight) * 2 + 1;
    const hit = cast();
    if (hit) focusObject(hit);
  }
});
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  step(0, Math.sign(e.deltaY) * 0.55);
  fly = null;
}, { passive: false });

const stickEl = document.getElementById("stick");
const knob = document.getElementById("knob");
function setStick(cx, cy, px, py) {
  const r = stickEl.getBoundingClientRect();
  let x = (px - (r.left + r.width / 2)) / (r.width / 2);
  let y = (py - (r.top + r.height / 2)) / (r.height / 2);
  const len = Math.hypot(x, y) || 1;
  if (len > 1) {
    x /= len;
    y /= len;
  }
  stick.x = x;
  stick.y = y;
  knob.style.transform = `translate(${x * 16}px, ${y * 16}px)`;
}
stickEl.addEventListener("pointerdown", (e) => {
  stickEl.setPointerCapture(e.pointerId);
  setStick(0, 0, e.clientX, e.clientY);
  fly = null;
});
stickEl.addEventListener("pointermove", (e) => {
  if (!stickEl.hasPointerCapture(e.pointerId)) return;
  setStick(0, 0, e.clientX, e.clientY);
});
function releaseStick() {
  stick.x = 0;
  stick.y = 0;
  knob.style.transform = "";
}
stickEl.addEventListener("pointerup", releaseStick);
stickEl.addEventListener("pointercancel", releaseStick);

function step(strafe, forward) {
  const sin = Math.sin(yaw);
  const cos = Math.cos(yaw);
  cam.x += (-sin * forward + cos * strafe);
  cam.z += (-cos * forward - sin * strafe);
  clampHall();
}

function cast() {
  ray.setFromCamera(pointer, camera);
  const hits = ray.intersectObjects(pickables, false);
  return hits.length ? hits[0].object.userData.id : null;
}

const hoverLabel = document.getElementById("hover-label");
const hoverTitle = document.getElementById("hover-title");
let toastTimer = 0;
function toast(text) {
  const el = document.getElementById("toast");
  el.textContent = text;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 1600);
}

const detail = document.getElementById("detail");
function openDetail(id) {
  const o = byId[id];
  if (!o) return;
  document.getElementById("d-kicker").textContent = `${o.regionName} · ${o.country}`;
  document.getElementById("d-title").textContent = o.title;
  document.getElementById("d-meta").textContent = o.meta;
  document.getElementById("d-body").textContent = o.summary;
  const link = document.getElementById("d-link");
  link.href = BASE + o.slug;
  detail.hidden = false;
  hoverLabel.hidden = true;
  closeOnlySheets();
}

function closeOnlySheets() {
  document.getElementById("regions").hidden = true;
  document.getElementById("search").hidden = true;
  document.getElementById("menu").hidden = true;
  syncChrome();
}
function closeSheets() {
  detail.hidden = true;
  closeOnlySheets();
}
function syncChrome() {
  const open = !document.getElementById("regions").hidden || !document.getElementById("search").hidden;
  document.getElementById("close-sheet").hidden = !open;
  document.getElementById("menu-btn").hidden = open;
  document.getElementById("dock").style.visibility = open ? "hidden" : "visible";
}

document.getElementById("home").onclick = () => {
  closeSheets();
  flyTo(home.x, home.y, home.z, home.yaw, home.pitch);
};
document.getElementById("detail-x").onclick = () => {
  detail.hidden = true;
};
document.getElementById("close-sheet").onclick = closeSheets;
document.getElementById("menu-btn").onclick = () => {
  const menu = document.getElementById("menu");
  menu.hidden = !menu.hidden;
};
document.getElementById("regions-btn").onclick = () => {
  const el = document.getElementById("regions");
  const open = el.hidden;
  closeSheets();
  el.hidden = !open;
  syncChrome();
};
document.getElementById("search-btn").onclick = () => {
  const el = document.getElementById("search");
  const open = el.hidden;
  closeSheets();
  el.hidden = !open;
  syncChrome();
  if (open) document.getElementById("q").focus();
};
document.getElementById("share-btn").onclick = async () => {
  const url = location.href.split("#")[0];
  try {
    await navigator.clipboard.writeText(url);
    toast("Link copied");
  } catch {
    toast(url);
  }
};
document.getElementById("focus-btn").onclick = () => {
  const id = nearestId();
  if (id) focusObject(id);
};
document.getElementById("discover").onclick = () => {
  const id = nearestId();
  if (id) focusObject(id);
};

function nearestId() {
  let best = null;
  let bestD = Infinity;
  const origin = new THREE.Vector3(cam.x, cam.y, cam.z);
  for (const id of Object.keys(byId)) {
    const mesh = pickables.find((m) => m.userData.id === id);
    if (!mesh) continue;
    const p = new THREE.Vector3();
    mesh.getWorldPosition(p);
    const d = p.distanceTo(origin);
    if (d < bestD) {
      bestD = d;
      best = id;
    }
  }
  return best;
}

const stopList = document.getElementById("stop-list");
STOPS.forEach((s) => {
  const li = document.createElement("li");
  li.innerHTML = `${s.title}<small>Inside the hall</small>`;
  li.onclick = () => {
    document.getElementById("menu").hidden = true;
    flyTo(s.eye[0], s.eye[1], s.eye[2], 0, -0.12);
  };
  stopList.appendChild(li);
});

const regionList = document.getElementById("region-list");
const mapGroups = [...document.querySelectorAll("[data-map]")];
function highlight(region) {
  regionList.querySelectorAll("li").forEach((li) => li.classList.toggle("active", li.dataset.region === region));
  mapGroups.forEach((g) => g.classList.toggle("hot", g.dataset.map === region));
}
regionList.addEventListener("pointerover", (e) => {
  const li = e.target.closest("li");
  if (li) highlight(li.dataset.region);
});
regionList.addEventListener("pointerleave", () => highlight(null));
mapGroups.forEach((g) => {
  g.addEventListener("pointerenter", () => highlight(g.dataset.map));
});
document.getElementById("map").addEventListener("pointerleave", () => highlight(null));
function goRegion(region) {
  const stop = STOPS.find((s) => s.id === REGION_STOP[region]);
  if (!stop) return;
  closeSheets();
  flyTo(stop.eye[0], stop.eye[1], stop.eye[2], 0, -0.12);
}
regionList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (li) goRegion(li.dataset.region);
});
mapGroups.forEach((g) => g.addEventListener("click", () => goRegion(g.dataset.map)));

const results = document.getElementById("results");
const q = document.getElementById("q");
function renderResults() {
  const term = q.value.trim().toLowerCase();
  const list = OBJECTS.filter((o) =>
    !term || `${o.title} ${o.country} ${o.regionName} ${o.meta}`.toLowerCase().includes(term)
  );
  results.innerHTML = "";
  list.forEach((o) => {
    const li = document.createElement("li");
    li.innerHTML = `${o.title}<small>${o.country} · ${o.regionName}</small>`;
    li.onclick = () => focusObject(o.id);
    results.appendChild(li);
  });
}
q.addEventListener("input", renderResults);
renderResults();

setTimeout(() => {
  document.getElementById("discover").hidden = false;
}, 1200);
document.getElementById("discover").hidden = true;

let last = performance.now();
function tick(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  let strafe = 0;
  let forward = 0;
  if (keys.has("w") || keys.has("arrowup")) forward += 1;
  if (keys.has("s") || keys.has("arrowdown")) forward -= 1;
  if (keys.has("a") || keys.has("arrowleft")) strafe -= 1;
  if (keys.has("d") || keys.has("arrowright")) strafe += 1;
  if (keys.has("q")) cam.y -= dt * 1.4;
  if (keys.has("e")) cam.y += dt * 1.4;
  forward += -stick.y;
  strafe += stick.x;
  if (forward || strafe) {
    fly = null;
    const len = Math.hypot(forward, strafe) || 1;
    step((strafe / len) * dt * 3.4, (forward / len) * dt * 3.4);
  }
  if (fly) {
    cam.x += (fly.x - cam.x) * Math.min(1, dt * 2.4);
    cam.y += (fly.y - cam.y) * Math.min(1, dt * 2.4);
    cam.z += (fly.z - cam.z) * Math.min(1, dt * 2.4);
    yaw += (fly.yaw - yaw) * Math.min(1, dt * 2.4);
    pitch += (fly.pitch - pitch) * Math.min(1, dt * 2.4);
    if (Math.abs(fly.z - cam.z) < 0.05) fly = null;
  }
  clampHall();
  applyCamera();
  debris.forEach((m, i) => {
    m.rotation.y += dt * 0.15;
    m.position.y += Math.sin(now * 0.001 + i) * 0.0015;
  });
  const id = cast();
  if (id !== hovered) {
    hovered = id;
    if (id && byId[id] && detail.hidden) {
      hoverTitle.textContent = byId[id].title;
      hoverLabel.hidden = false;
      canvas.style.cursor = "pointer";
    } else {
      hoverLabel.hidden = true;
      canvas.style.cursor = dragging ? "grabbing" : "grab";
    }
  }
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
