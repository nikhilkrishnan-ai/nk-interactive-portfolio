import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ——— Portfolio content ———
const PORTFOLIO = {
  name: "Nikhil Krishnan",
  handle: "NK",
  location: "Chengannur, Kerala, India",
  tagline: "AI Content & Evaluation Specialist · Data Analyst",
  email: "nikhilkr51@gmail.com",
  phone: "+91-9048871505",
  github: "https://github.com/nikhilkrishnan-ai",
  geosenseRepo: "https://github.com/nikhilkrishnan-ai/nikhilkrishnan-aiREADME.md",
  portfolio3d: "https://nikhilkrishnan-ai.github.io/nk-interactive-portfolio/",
  gdev: "https://g.dev/nikhilkrishnanAI",
};

const NODES = [
  {
    id: "about",
    title: "Nikhil Krishnan",
    tag: "OPERATOR PROFILE",
    color: 0x00f5ff,
    position: [0, 1.2, -8],
    body: `<p><strong>${PORTFOLIO.tagline}</strong></p>
      <p>${PORTFOLIO.location} · Remote ready</p>
      <p>Highly analytical AI Content &amp; Evaluation Specialist with a <strong>100% English Proficiency</strong> score and verified expertise in LLM training. Certified by <strong>Google Cloud (Vertex AI)</strong> and <strong>DeepLearning.AI</strong> in advanced Prompt Engineering.</p>
      <p>Combines technical data analysis with a <strong>Diploma in Warehouse Management</strong> for high-accuracy auditing of logistical and operational AI models.</p>
      <p><strong>Languages:</strong> English (Expert / 100% verified) · Malayalam (Native)</p>`,
    links: [
      { label: "GOOGLE DEVELOPER", href: PORTFOLIO.gdev },
      { label: "3D GEOsense LAB", href: PORTFOLIO.portfolio3d },
    ],
  },
  {
    id: "certs",
    title: "Certifications",
    tag: "VERIFIED BADGES",
    color: 0x8866ff,
    position: [-7, 1.2, 0],
    body: `<ul>
        <li><strong>Prompt Design in Vertex AI</strong> (Skill Badge) — Google Cloud, April 2026</li>
        <li><strong>Gemini Enterprise Agent Ready</strong> — Google Cloud, April 2026</li>
        <li><strong>ChatGPT Prompt Engineering for Developers</strong> — DeepLearning.AI (Andrew Ng), 2026</li>
        <li><strong>Diploma in Warehouse Management</strong> — Alison, 2026 (Distinction)</li>
        <li><strong>Google Cloud Innovator &amp; Developer Program</strong> — Verified 2026</li>
      </ul>`,
    links: [{ label: "G.DEV PROFILE", href: PORTFOLIO.gdev }],
  },
  {
    id: "skills",
    title: "Core Competencies",
    tag: "SKILL MATRIX",
    color: 0xb8ff3c,
    position: [7, 1.2, 0],
    body: `<p><strong>AI Training &amp; Evaluation</strong></p>
      <ul>
        <li>RLHF, Fact-Checking, Hallucination Detection, Model Alignment</li>
      </ul>
      <p><strong>Advanced Prompting</strong></p>
      <ul>
        <li>Zero-shot / Few-shot, Chain-of-Thought (CoT), Prompt Injection Testing</li>
      </ul>
      <p><strong>Technical Tools</strong></p>
      <ul>
        <li>Google Cloud Console, Vertex AI Studio, SQL Server, Python for Data Analysis</li>
      </ul>
      <p><strong>Creative &amp; Ops</strong></p>
      <ul>
        <li>Canva Pro, Inventory Control Systems, Logistics Data Auditing</li>
      </ul>`,
    links: [],
  },
  {
    id: "experience",
    title: "Experience Log",
    tag: "MISSION HISTORY",
    color: 0xffaa00,
    position: [-6, 1.2, 7],
    body: `<p><strong>AI Content &amp; Evaluation Specialist</strong> · Freelance · April 2026 – Present</p>
      <ul>
        <li>Vertex AI Studio — deploy &amp; test generative models (insurance risk ID, summarization)</li>
        <li>DeepLearning.AI principles (Inferring, Transforming, Expanding) for logical consistency</li>
        <li>Rigorous fact-checking &amp; linguistic auditing — 100% English accuracy standard</li>
      </ul>
      <p><strong>Data Analyst &amp; Logistics Coordinator</strong> · Project-based</p>
      <ul>
        <li>SQL Server &amp; WMS data entry, inventory logic</li>
        <li>Supply chain dataset audits — stock discrepancy detection</li>
        <li>Canva reporting templates for internal communication</li>
      </ul>
      <p><strong>Education:</strong> Diploma in Warehouse Management (Alison, Distinction)</p>`,
    links: [],
  },
  {
    id: "geosense",
    title: "GeoSense Lab",
    tag: "FLAGSHIP PROJECT",
    color: 0xff2d95,
    position: [0, 1.2, 8],
    body: `<p><strong>Geospatial Forensic Intelligence</strong> — GPS spoofing detection using velocity constraints (V = d/t).</p>
      <ul>
        <li>Haversine jump detection on Google Timeline forensic data</li>
        <li>Apache Beam / Google Cloud Dataflow anomaly pipelines</li>
        <li>Cloud Run HTTP API for real-time telemetry checks</li>
        <li>Power BI dashboards &amp; JSONL forensic reports</li>
      </ul>
      <p>Explore the full interactive 3D forensic simulator at the live lab link below.</p>`,
    links: [
      { label: "GITHUB README", href: PORTFOLIO.geosenseRepo },
      { label: "3D FORENSIC LAB", href: PORTFOLIO.portfolio3d },
    ],
  },
  {
    id: "contact",
    title: "Contact Uplink",
    tag: "COMMS CHANNEL",
    color: 0x00ff88,
    position: [6, 1.2, 7],
    body: `<p>Open to AI evaluation roles, prompt-engineering contracts, and data/logistics auditing projects.</p>
      <p><strong>Email:</strong> ${PORTFOLIO.email}<br>
      <strong>Phone:</strong> ${PORTFOLIO.phone}<br>
      <strong>Location:</strong> ${PORTFOLIO.location}</p>`,
    links: [
      { label: "EMAIL", href: `mailto:${PORTFOLIO.email}` },
      { label: "GITHUB", href: PORTFOLIO.github },
      { label: "G.DEV", href: PORTFOLIO.gdev },
      { label: "GEOSENSE REPO", href: PORTFOLIO.geosenseRepo },
    ],
  },
];

// ——— Scene setup ———
const canvas = document.getElementById("game");
const loaderEl = document.getElementById("loader");
const startScreen = document.getElementById("start-screen");
const crosshair = document.getElementById("crosshair");
const promptEl = document.getElementById("prompt");
const promptLabel = document.getElementById("prompt-label");
const modal = document.getElementById("modal");
const xpFill = document.getElementById("xp-fill");
const xpText = document.getElementById("xp-text");
const questText = document.getElementById("quest-text");
const playerNameEl = document.getElementById("player-name");

playerNameEl.textContent = PORTFOLIO.handle;

const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
let touchMode = false;
let unlocked = new Set();
const TOTAL_NODES = NODES.length;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050508);
scene.fog = new THREE.FogExp2(0x050508, 0.035);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 120);
camera.position.set(0, 1.7, 10);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// Lights
scene.add(new THREE.AmbientLight(0x334466, 0.6));
const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
keyLight.position.set(10, 20, 8);
keyLight.castShadow = true;
scene.add(keyLight);
const rim = new THREE.PointLight(0xff2d95, 2, 40);
rim.position.set(-8, 6, 0);
scene.add(rim);
const rim2 = new THREE.PointLight(0x00f5ff, 2, 40);
rim2.position.set(8, 6, -6);
scene.add(rim2);

// Floor grid
const floorGeo = new THREE.PlaneGeometry(48, 48, 48, 48);
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x0a1020,
  emissive: 0x001822,
  metalness: 0.9,
  roughness: 0.35,
  wireframe: false,
});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const grid = new THREE.GridHelper(48, 48, 0x00f5ff, 0x112233);
grid.position.y = 0.02;
grid.material.opacity = 0.35;
grid.material.transparent = true;
scene.add(grid);

// Arena walls (low boxes)
const wallMat = new THREE.MeshStandardMaterial({
  color: 0x0d1528,
  emissive: 0x001530,
  metalness: 0.8,
  roughness: 0.4,
});
function addWall(x, z, w, d) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, 4, d), wallMat);
  m.position.set(x, 2, z);
  m.castShadow = true;
  m.receiveShadow = true;
  scene.add(m);
}
addWall(0, -24, 48, 1);
addWall(0, 24, 48, 1);
addWall(-24, 0, 1, 48);
addWall(24, 0, 1, 48);

// Particles
const particleCount = 400;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 40;
  positions[i * 3 + 1] = Math.random() * 12 + 2;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
}
const particles = new THREE.Points(
  new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(positions, 3)),
  new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.06, transparent: true, opacity: 0.6 })
);
scene.add(particles);

// Data nodes
const nodeMeshes = [];
const nodeGroup = new THREE.Group();
scene.add(nodeGroup);

NODES.forEach((node) => {
  const geo = new THREE.OctahedronGeometry(0.9, 0);
  const mat = new THREE.MeshStandardMaterial({
    color: node.color,
    emissive: node.color,
    emissiveIntensity: 0.55,
    metalness: 0.6,
    roughness: 0.25,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(...node.position);
  mesh.castShadow = true;
  mesh.userData = node;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.3, 0.04, 8, 32),
    new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.7 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.copy(mesh.position);
  ring.position.y = 0.05;

  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, node.position[1], 8),
    new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.35 })
  );
  pillar.position.set(node.position[0], node.position[1] / 2, node.position[2]);

  nodeGroup.add(pillar, ring, mesh);
  nodeMeshes.push({ mesh, ring, node });
});

// Center monument
const monolith = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 3, 1.2),
  new THREE.MeshStandardMaterial({
    color: 0x111828,
    emissive: 0x00f5ff,
    emissiveIntensity: 0.2,
    metalness: 0.95,
    roughness: 0.2,
  })
);
monolith.position.set(0, 1.5, 0);
scene.add(monolith);

// Controls
let pointerControls = null;
let orbitControls = null;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let prevTime = performance.now();
const PLAYER_HEIGHT = 1.7;
const MOVE_SPEED = 28;
const INTERACT_DIST = 3.2;

if (!isMobile) {
  pointerControls = new PointerLockControls(camera, document.body);
} else {
  document.getElementById("controls-desktop").classList.add("hidden");
  document.getElementById("controls-mobile").classList.remove("hidden");
  document.getElementById("btn-mobile").classList.remove("hidden");
}

function setupOrbit() {
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.target.set(0, 1.5, 0);
  orbitControls.maxPolarAngle = Math.PI / 2.1;
  orbitControls.minDistance = 6;
  orbitControls.maxDistance = 22;
}

const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === "KeyE" && nearestNode && modal.classList.contains("hidden")) {
    openNode(nearestNode);
  }
});
document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

if (pointerControls) {
  document.addEventListener("keydown", (e) => {
    if (!pointerControls.isLocked) return;
    switch (e.code) {
      case "KeyW": moveForward = true; break;
      case "KeyS": moveBackward = true; break;
      case "KeyA": moveLeft = true; break;
      case "KeyD": moveRight = true; break;
      default: break;
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyW": moveForward = false; break;
      case "KeyS": moveBackward = false; break;
      case "KeyA": moveLeft = false; break;
      case "KeyD": moveRight = false; break;
      default: break;
    }
  });
  pointerControls.addEventListener("lock", () => {
    crosshair.classList.add("active");
  });
  pointerControls.addEventListener("unlock", () => {
    crosshair.classList.remove("active");
    moveForward = moveBackward = moveLeft = moveRight = false;
  });
}

// UI
let nearestNode = null;

function updateXP() {
  const n = unlocked.size;
  xpFill.style.width = `${(n / TOTAL_NODES) * 100}%`;
  xpText.textContent = `${n} / ${TOTAL_NODES}`;
  if (n === TOTAL_NODES) {
    questText.textContent = "Arena complete! All nodes unlocked.";
  } else {
    questText.textContent = `Find ${TOTAL_NODES - n} more data node${TOTAL_NODES - n === 1 ? "" : "s"}.`;
  }
}

function openNode(node) {
  if (!node) return;
  unlocked.add(node.id);
  updateXP();

  document.getElementById("modal-tag").textContent = node.tag;
  document.getElementById("modal-title").textContent = node.title;
  document.getElementById("modal-body").innerHTML = node.body;

  const linksEl = document.getElementById("modal-links");
  linksEl.innerHTML = "";
  node.links.forEach((l) => {
    const a = document.createElement("a");
    a.href = l.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = l.label;
    linksEl.appendChild(a);
  });

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  if (pointerControls?.isLocked) pointerControls.unlock();
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-backdrop").addEventListener("click", closeModal);

document.getElementById("btn-start").addEventListener("click", () => {
  startScreen.classList.add("gone");
  if (isMobile) {
    touchMode = true;
    setupOrbit();
  } else {
    touchMode = false;
    pointerControls.lock();
  }
});

document.getElementById("btn-mobile").addEventListener("click", () => {
  startScreen.classList.add("gone");
  touchMode = true;
  setupOrbit();
});

// Raycast for mobile tap
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.domElement.addEventListener("click", (e) => {
  if (!touchMode && !pointerControls?.isLocked) return;
  if (touchMode || (pointerControls && !pointerControls.isLocked)) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
    if (hits.length) openNode(hits[0].object.userData);
    return;
  }
  if (nearestNode && pointerControls?.isLocked) openNode(nearestNode);
});

function findNearestNode() {
  let best = null;
  let bestD = INTERACT_DIST;
  const p = camera.position;
  for (const { mesh, node } of nodeMeshes) {
    const d = p.distanceTo(mesh.position);
    if (d < bestD) {
      bestD = d;
      best = node;
    }
  }
  return best;
}

// Animate nodes
function animateNodes(time) {
  nodeMeshes.forEach(({ mesh, ring }, i) => {
    mesh.rotation.y = time * 0.001 + i;
    mesh.position.y = mesh.userData.position[1] + Math.sin(time * 0.002 + i) * 0.15;
    ring.rotation.z = time * 0.0015;
  });
  particles.rotation.y = time * 0.00008;
}

function updateMovement(delta) {
  if (!pointerControls?.isLocked) return;

  velocity.x -= velocity.x * 8 * delta;
  velocity.z -= velocity.z * 8 * delta;

  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize();

  if (moveForward || moveBackward) velocity.z -= direction.z * MOVE_SPEED * delta;
  if (moveLeft || moveRight) velocity.x -= direction.x * MOVE_SPEED * delta;

  pointerControls.moveRight(-velocity.x * delta);
  pointerControls.moveForward(-velocity.z * delta);

  camera.position.y = PLAYER_HEIGHT;

  // Arena bounds
  camera.position.x = THREE.MathUtils.clamp(camera.position.x, -22, 22);
  camera.position.z = THREE.MathUtils.clamp(camera.position.z, -22, 22);
}

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now();
  const delta = Math.min((time - prevTime) / 1000, 0.05);
  prevTime = time;

  updateMovement(delta);
  animateNodes(time);

  if (orbitControls) orbitControls.update();

  nearestNode = findNearestNode();
  if (nearestNode && (pointerControls?.isLocked || touchMode)) {
    promptEl.classList.remove("hidden");
    promptLabel.textContent = touchMode ? `Tap: ${nearestNode.title}` : nearestNode.title;
  } else {
    promptEl.classList.add("hidden");
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Boot
setTimeout(() => loaderEl.classList.add("done"), 800);
animate();
