
// ==============================
// ADVANCED PARTICLES CONFIGURATION
// ==============================

// Neon color sets for dark/light mode
const particleColors = {
  dark: ["#0ff", "#ff00ff", "#00f"],
  light: ["#0ff77", "#ff77ff", "#77f"]
};

// Get current color set based on theme
function getCurrentColors() {
  return document.body.classList.contains("dark") ? particleColors.dark : particleColors.light;
}

// Initialize particles
let particlesInstance = tsParticles.load("particles-js", {
  fpsLimit: 60,
  background: { color: "transparent" },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 120, duration: 0.5 },
      push: { quantity: 4 }
    }
  },
  particles: {
    number: { value: 80, density: { enable: true, area: 800 } },
    color: { value: getCurrentColors() },
    shape: { type: "circle" },
    opacity: { value: 0.3, random: true },
    size: { value: 2.5, random: { enable: true, minimumValue: 1 } },
    links: {
      enable: true,
      distance: 130,
      color: "#0ff",
      opacity: 0.25,
      width: 1
    },
    move: {
      enable: true,
      speed: { min: 0.5, max: 1.5 }, // different speeds for depth effect
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" }
    }
  },
  detectRetina: true
});

// ==============================
// DARK/LIGHT MODE COLOR SYNC
// ==============================
const themeToggleBtn = document.getElementById("themeToggle");

themeToggleBtn.addEventListener("click", () => {
  const newColors = getCurrentColors();
  particlesInstance.then(p => {
    // Update particle colors
    p.options.particles.color.value = newColors;
    // Update link color to match first color in set
    p.options.particles.links.color = newColors[0];
    p.refresh();
  });
});
