
// ==============================      
// DEVAGENCY CONTACT FORM JS      
// ==============================      
      
emailjs.init("i87sIi-jgt7TZj4xF"); // ✅ Your public key      
      
const contactForm = document.getElementById("contact-form");      
const contactBtn = document.getElementById("contact-btn");      
      
// Honeypot field ID (must exist in HTML)      
const HONEYPOT_ID = "honeypot";      
      
// Timestamp for bot timing check      
const formLoadedAt = Date.now();      
      
// ==============================      
// LIVE VALIDATION      
// ==============================      
function validateContactForm() {      
  const name = document.getElementById("contact-name").value.trim();      
  const email = document.getElementById("contact-email").value.trim();      
  const phone = document.getElementById("contact-phone").value.trim();      
  const message = document.getElementById("contact-message").value.trim();      
      
  contactBtn.disabled = !(name && email && phone && message);      
}      
      
// Attach listeners      
["contact-name","contact-email","contact-phone","contact-message"]      
  .forEach(id => document.getElementById(id).addEventListener("input", validateContactForm));      
      
// Disable initially      
contactBtn.disabled = true;      
      
// ==============================      
// SEND EMAIL (SAFE)      
// ==============================      
function sendEmail(templateId, params, onSuccess) {      
  emailjs.send("service_22jk5a7", templateId, params)      
    .then(() => {      
      alert("✅ Message sent successfully!");      
      if (typeof onSuccess === "function") onSuccess();      
    })      
    .catch(err => {      
      console.error("EmailJS Error:", err);      
      alert("❌ Failed to send message. Please try again.");      
      contactBtn.disabled = false;      
      contactBtn.textContent = "Send Message";      
    });      
}      
      
// ==============================      
// FORM SUBMIT      
// ==============================      
contactForm.addEventListener("submit", function(e) {      
  e.preventDefault();      
      
  // Honeypot check      
  const honeypot = document.getElementById(HONEYPOT_ID)?.value;      
  if (honeypot) return; // silently block bots      
      
  // Time-based spam check (min 5s)      
  if ((Date.now() - formLoadedAt) < 5000) {      
    console.warn("Bot blocked (too fast)");      
    return;      
  }      
      
  const name = document.getElementById("contact-name").value.trim();      
  const email = document.getElementById("contact-email").value.trim();      
  const phone = document.getElementById("contact-phone").value.trim();      
  const message = document.getElementById("contact-message").value.trim();      
      
  if (!name || !email || !phone || !message) {      
    alert("⚠️ Please fill all required fields.");      
    return;      
  }      
      
  // UI state      
  contactBtn.disabled = true;      
  contactBtn.textContent = "Sending...";      
      
  // ==============================      
  // ADMIN EMAIL      
  // ==============================      
  const adminParams = {      
    client_name: name,      
    client_email: email,      
    client_phone: phone,      
    client_message: message      
  };      
      
  sendEmail("template_17uznij", adminParams, () => {      
    // ==============================      
    // AUTO-REPLY      
    // ==============================      
    const autoReplyParams = {      
      client_name: name,      
      client_email: email      
    };      
      
    emailjs.send("service_22jk5a7", "template_vs8zr8y", autoReplyParams);      
      
    // Reset form      
    contactForm.reset();      
    contactBtn.textContent = "Send Message";      
    contactBtn.disabled = true;      
  });      
});