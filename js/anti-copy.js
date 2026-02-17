/* ======================================
   Anti-Copy Protection Script
   Author: DevAgency
   Usage: <script src="anti-copy.js"></script>
====================================== */

(function () {
  "use strict";

  /* ====== CONFIG ====== */
  const config = {
    disableRightClick: true,
    disableSelection: true,
    disableCopy: true,
    disableShortcuts: true,
    disableImageDrag: true,
    devToolsDetection: true, // set true if you want
    alertMessage: "⚠️ Content protection enabled. Copying is disabled."
  };

  /* ====== RIGHT CLICK ====== */
  if (config.disableRightClick) {
    document.addEventListener("contextmenu", e => {
      e.preventDefault();
      alert(config.alertMessage);
    });
  }

  /* ====== TEXT SELECTION ====== */
  if (config.disableSelection) {
    document.addEventListener("selectstart", e => {
      e.preventDefault();
    });
  }

  /* ====== COPY / CUT ====== */
  if (config.disableCopy) {
    ["copy", "cut"].forEach(evt => {
      document.addEventListener(evt, e => {
        e.preventDefault();
        alert(config.alertMessage);
      });
    });
  }

  /* ====== KEYBOARD SHORTCUTS ====== */
  if (config.disableShortcuts) {
    document.addEventListener("keydown", e => {
      const key = e.key.toLowerCase();

      if (
        (e.ctrlKey && ["c", "u", "s", "p"].includes(key)) ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        key === "f12"
      ) {
        e.preventDefault();
        alert(config.alertMessage);
      }
    });
  }

  /* ====== DISABLE IMAGE DRAG ====== */
  if (config.disableImageDrag) {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("img").forEach(img => {
        img.setAttribute("draggable", "false");
      });
    });
  }

  /* ====== DEVTOOLS DETECTION (OPTIONAL) ====== */
  if (config.devToolsDetection) {
    setInterval(() => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.style.filter = "blur(6px)";
        alert("⚠️ Developer tools detected.");
      }
    }, 1500);
  }

})();



/* ======================================
   Anti-Copy Protection Script
   Author: DevAgency
   Usage: <script src="anti-copy.js"></script>
====================================== */

(function () {
  "use strict";

  /* ====== CONFIG ====== */
  const config = {
    disableRightClick: true,
    disableSelection: true,
    disableCopy: true,
    disableShortcuts: true,
    disableImageDrag: true,
    devToolsDetection: true, // set true if you want
    alertMessage: "⚠️ Content protection enabled. Copying is disabled."
  };

  /* ====== RIGHT CLICK ====== */
  if (config.disableRightClick) {
    document.addEventListener("contextmenu", e => {
      e.preventDefault();
      alert(config.alertMessage);
    });
  }

  /* ====== TEXT SELECTION ====== */
  if (config.disableSelection) {
    document.addEventListener("selectstart", e => {
      e.preventDefault();
    });
  }

  /* ====== COPY / CUT ====== */
  if (config.disableCopy) {
    ["copy", "cut"].forEach(evt => {
      document.addEventListener(evt, e => {
        e.preventDefault();
        alert(config.alertMessage);
      });
    });
  }

  /* ====== KEYBOARD SHORTCUTS ====== */
  if (config.disableShortcuts) {
    document.addEventListener("keydown", e => {
      const key = e.key.toLowerCase();

      if (
        (e.ctrlKey && ["c", "u", "s", "p"].includes(key)) ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        key === "f12"
      ) {
        e.preventDefault();
        alert(config.alertMessage);
      }
    });
  }

  /* ====== DISABLE IMAGE DRAG ====== */
  if (config.disableImageDrag) {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("img").forEach(img => {
        img.setAttribute("draggable", "false");
      });
    });
  }

  /* ====== DEVTOOLS DETECTION (OPTIONAL) ====== */
  if (config.devToolsDetection) {
    setInterval(() => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.style.filter = "blur(6px)";
        alert("⚠️ Developer tools detected.");
      }
    }, 1500);
  }

})();



