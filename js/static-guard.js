/* =========================================================
   ULTIMATE STATIC SECURITY GUARD
   Level: MAXIMUM (Client-Side Only)
   Built for: Hardened Static Platforms
   Author: DevAgency
========================================================= */

(function () {
  "use strict";

  /* =================== CONFIG =================== */
  const CFG = {
    alertMessage: "⚠️ This content is protected.",
    sessionTTL: 10 * 60 * 1000, // 10 minutes
    devToolsThreshold: 160,
    domMutationDelay: 50
  };

  /* =================== HARD KILL CONDITIONS =================== */

  // 1) Block offline usage
  if (!navigator.onLine) {
    document.documentElement.innerHTML =
      "<h1 style='text-align:center;margin-top:20%'>⚠️ Live connection required</h1>";
    return;
  }

  // 2) Block file:// saved copies
  if (location.protocol === "file:") {
    document.documentElement.innerHTML =
      "<h1 style='text-align:center;margin-top:20%'>⚠️ Unauthorized offline data</h1>";
    return;
  }

  // 3) Block headless browsers / automation
  if (navigator.webdriver) {
    document.documentElement.innerHTML =
      "<h1 style='text-align:center;margin-top:20%'>Access denied</h1>";
    return;
  }

  // 4) Block known mirroring user agents
  const badAgents = ["httrack", "wget", "curl", "python", "java", "libwww"];
  if (badAgents.some(a => navigator.userAgent.toLowerCase().includes(a))) {
    document.documentElement.innerHTML =
      "<h1 style='text-align:center;margin-top:20%'>Blocked</h1>";
    return;
  }

  /* =================== SESSION TIME LOCK =================== */

  const now = Date.now();
  const issued = sessionStorage.getItem("__guard_issued");

  if (!issued) {
    sessionStorage.setItem("__guard_issued", now);
  } else if (now - issued > CFG.sessionTTL) {
    document.documentElement.innerHTML =
      "<h1 style='text-align:center;margin-top:20%'>⚠️ Session expired</h1>";
    return;
  }

  /* =================== UI BLOCKING =================== */

  // Disable right click
  document.addEventListener("contextmenu", e => {
    e.preventDefault();
    alert(CFG.alertMessage);
  });

  // Disable selection
  document.addEventListener("selectstart", e => e.preventDefault());

  // Disable copy / cut
  ["copy", "cut"].forEach(evt => {
    document.addEventListener(evt, e => {
      e.preventDefault();
      alert(CFG.alertMessage);
    });
  });

  // Disable keyboard shortcuts
  document.addEventListener("keydown", e => {
    const k = e.key.toLowerCase();
    if (
      (e.ctrlKey && ["c", "u", "s", "p"].includes(k)) ||
      (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(k)) ||
      k === "f12"
    ) {
      e.preventDefault();
      alert(CFG.alertMessage);
    }
  });

  /* =================== IMAGE PROTECTION =================== */

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img").forEach(img => {
      img.setAttribute("draggable", "false");
      img.style.pointerEvents = "none";
    });
  });

  /* =================== DEVTOOLS DETECTION =================== */

  setInterval(() => {
    const opened =
      window.outerWidth - window.innerWidth > CFG.devToolsThreshold ||
      window.outerHeight - window.innerHeight > CFG.devToolsThreshold;

    if (opened) {
      document.body.style.filter = "blur(6px)";
      console.warn("Developer tools detected");
    }
  }, 1200);

  /* =================== DOM MUTATION (ANTI-SAVE) =================== */

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-protected]").forEach(el => {
      const real = el.innerHTML;
      el.innerHTML = "████████████████████";
      setTimeout(() => {
        el.innerHTML = real;
      }, CFG.domMutationDelay);
    });
  });

  /* =================== DOM SCRAMBLING (SESSION UNIQUE) =================== */

  document.addEventListener("DOMContentLoaded", () => {
    const seed = Math.random().toString(36).slice(2);
    document.querySelectorAll("[data-protected]").forEach(el => {
      el.setAttribute(
        "data-session-key",
        btoa(seed + el.innerText).slice(0, 16)
      );
    });
  });

  /* =================== CACHE POISONING =================== */

  try {
    Object.defineProperty(window, "caches", {
      get() {
        throw new Error("Cache access denied");
      }
    });
  } catch (e) {}

  /* =================== FINAL WARNING =================== */

  console.log(
    "%c⚠️ SECURITY ACTIVE\nAutomated copying, saving, mirroring, or reverse engineering is prohibited.",
    "color:red;font-size:14px;font-weight:bold;"
  );

})();

/* ============== 4. DISABLE IMAGE DRAG ============== */
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img").forEach(img => {
      img.setAttribute("draggable", "false");
    });
  });

  /* ============== 5. DYNAMIC CSS LOAD ============== */
  fetch("/css/style.css")
    .then(r => r.text())
    .then(css => {
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    })
    .catch(() => {});

  /* ============== 6. FRAGMENTED CORE JS LOADER ============== */
  const CORE_PARTS = ["app.js", "player.js", "anti-copy.js"]; // /js/core/

  (function loadPart(i = 0) {
    if (i >= CORE_PARTS.length) return;
    const s = document.createElement("script");
    s.src = `/js/${CORE_PARTS[i]}?t=${Date.now()}`;
    s.onload = () => loadPart(i + 1);
    document.body.appendChild(s);
  })();