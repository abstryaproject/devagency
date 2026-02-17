// ==============================
// DEVAGENCY FULL JS – COMPLETE UPDATED
// ==============================

// SERVICES & FEATURES DATA
const services = {
  landing: { name: "Landing Page Website", price: 7500, timeline:7 },
  business: { name: "Business / Company Website", price: 15000, timeline:14 },
  portfolio: { name: "Portfolio Website", price: 9000, timeline:10 },
  ecommerce: { name: "E-commerce Website", price: 30000, timeline:30 },
  blog: { name: "Blog / News Platform", price:12500, timeline:14 },
  elearning:{name:"E-Learning Platform",price:35000,timeline:30},
  booking:{name:"Booking / Reservation System",price:22500,timeline:21},
  directory:{name:"Directory Website",price:20000,timeline:20},
  custom:{name:"Custom Web App / SaaS",price:45000,timeline:45},
  gov:{name:"Government / Institutional Portal",price:60000,timeline:60},
  redesign:{name:"Website Redesign",price:10000,timeline:10},
  maintenance:{name:"Maintenance & Support",price:5000,timeline:7},
  hire:{name:"Hire a Developer",price:10000,timeline:1}
};

const features = {
  seo:{name:"SEO Optimization",price:5000},
  responsive:{name:"Responsive Design",price:3000},
  auth:{name:"User Authentication",price:8000},
  roles:{name:"User Roles & Permissions",price:7000},
  payment:{name:"Payment Integration",price:12000},
  subscription:{name:"Subscription System",price:15000},
  admin:{name:"Admin Dashboard",price:15000},
  analytics:{name:"Analytics & Tracking",price:4000},
  whatsapp:{name:"WhatsApp Integration",price:3000},
  email:{name:"Email Notifications",price:4000},
  cms:{name:"Content Management",price:12000},
  upload:{name:"File Upload System",price:6000},
  api:{name:"Third-Party API Integration",price:9000},
  security:{name:"Advanced Security",price:10000},
  speed:{name:"Performance Optimization",price:5000},
  multilingual:{name:"Multi-Language Support",price:8000},
  accessibility:{name:"Accessibility",price:6000}
};

const serviceFeaturesMap = {
  landing:["seo","responsive","whatsapp","analytics"],
  portfolio:["seo","responsive","cms"],
  business:["seo","responsive","admin","email","analytics"],
  blog:["seo","cms","auth","admin","email"],
  ecommerce:["seo","responsive","payment","subscription","auth","roles","admin","email","security"],
  elearning:["auth","roles","subscription","payment","cms","upload","admin","email","security"],
  booking:["auth","payment","admin","email","analytics"],
  directory:["auth","roles","cms","admin","payment"],
  custom:Object.keys(features),
  gov:["auth","roles","admin","security","multilingual","accessibility"],
  redesign:["seo","speed","responsive","security"],
  maintenance:["security","speed","analytics"],
  hire:[]
};

// DOM ELEMENTS
const serviceSelect = document.getElementById("serviceSelect");
const featuresContainer = document.getElementById("featuresContainer");
const priceDisplay = document.getElementById("priceDisplay");
const timelineBox = document.getElementById("timelineBox");
const modalOverlay = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const projectForm = document.getElementById("projectForm");
const hireForm = document.getElementById("hireForm");
const submitProjectBtn = document.getElementById("submitProjectBtn");
const submitHireBtn = document.getElementById("submitHireBtn");

const themeToggle = document.getElementById("themeToggle");
const mobileMenuBtn = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

const heroRequestBtn = document.getElementById("heroRequestBtn");
const requestProjectBtn = document.getElementById("requestProjectBtn");

const servicesGrid = document.getElementById("servicesGrid");

// ==============================
// POPULATE SERVICES DROPDOWN
for(let key in services){
  let opt = document.createElement("option");
  opt.value = key;
  opt.textContent = services[key].name;
  serviceSelect.appendChild(opt);
}

// DYNAMIC SERVICES GRID
for (let key in services) {
  if (key === "hire") continue;
  const card = document.createElement("div");
  card.className = "card reveal";
  card.innerHTML = `
    <h3>${services[key].name}</h3>
    <p>Starting from ₦${services[key].price.toLocaleString()}</p>
    <p>Timeline: ${services[key].timeline} days</p>
    <button class="btn btn-primary request-service-btn" data-service="${key}">Request This Service</button>
  `;
  servicesGrid.appendChild(card);
}

// RENDER FEATURES
function renderFeatures(service){
  featuresContainer.innerHTML = "";
  if(service==="hire") return;
  serviceFeaturesMap[service]?.forEach(f=>{
    let feature = features[f];
    let label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${f}"> <span>${feature.name} ⓘ (+₦${feature.price.toLocaleString()})</span>`;
    featuresContainer.appendChild(label);
  });
}

// CALCULATE TOTAL
function calculateTotal(){
  let base = services[serviceSelect.value]?.price || 0;
  let selected = [...featuresContainer.querySelectorAll("input:checked")].reduce((a,i)=>a+features[i.value].price,0);
  priceDisplay.textContent = "Estimated Cost: ₦"+(base+selected).toLocaleString();
}

// UPDATE TIMELINE
function updateTimeline(service){
  let days = services[service]?.timeline;
  timelineBox.textContent = days ? `Estimated Timeline: ${days} days` : "Estimated Timeline: Custom agreement";
}

// OPEN MODAL
function openModal(type, serviceKey=""){
  modalOverlay.style.display = "flex";
  if(type==="project"){
    projectForm.style.display = "block";
    hireForm.style.display = "none";
    serviceSelect.value = serviceKey || "";
    renderFeatures(serviceKey || "");
    calculateTotal();
    updateTimeline(serviceKey || "");
  } else {
    hireForm.style.display = "block";
    projectForm.style.display = "none";
  }
}

// CLOSE MODAL
modalCloseBtn.addEventListener("click", ()=>{ modalOverlay.style.display = "none"; });

// SERVICE SELECT CHANGE
serviceSelect.addEventListener("change", ()=>{
  renderFeatures(serviceSelect.value);
  calculateTotal();
  updateTimeline(serviceSelect.value);
});

// FEATURE CHANGE
featuresContainer.addEventListener("change", calculateTotal);

// EMAILJS INIT
emailjs.init("B0TUfCsEZ03eoI5wF");

// SAFE EMAIL SEND
function sendEmailSafe(templateParams, templateId, successMsg="Request sent successfully!"){
  const honeypot = document.getElementById("website")?.value;
  if(honeypot){ console.warn("Spam blocked by honeypot"); return; }
  console.log(`Sending EmailJS (${templateId}) with params:`, templateParams);
  return emailjs.send("service_q4vtlp9", templateId, templateParams)
    .then(res => { console.log("EmailJS Success:", res); alert(successMsg); })
    .catch(err => { console.error("EmailJS Error:", err); alert("Failed to send request. Try again!"); });
}

// ==============================
// PROJECT FORM SUBMISSION
submitProjectBtn.addEventListener("click", () => {
  const name = document.getElementById("clientName").value.trim();
  const email = document.getElementById("clientEmail").value.trim();
  const serviceName = services[serviceSelect.value]?.name || "";
  const selectedFeatures = [...featuresContainer.querySelectorAll("input:checked")]
                             .map(f => features[f.value].name)
                             .join(", ");
  const desc = document.getElementById("description").value.trim();

  if(!name || !email || !serviceSelect.value){
    alert("Please fill all required fields!");
    return;
  }

  submitProjectBtn.disabled = true;
  submitProjectBtn.textContent = "Sending...";

  const contactParams = {
    to_email: "abdullahiibrahima5126@gmail.com",
    client_name: name,
    client_email: email,
    service_name: serviceName,
    features: selectedFeatures || "None",
    description: desc || "No description provided"
  };

  const autoReplyParams = { to_email: email, client_name: name };

  sendEmailSafe(contactParams, "template_0jr4v0w", "Project request sent successfully!")
    .finally(()=>{
      submitProjectBtn.disabled = false;
      submitProjectBtn.textContent = "Submit Request";
      projectForm.reset();
      modalOverlay.style.display = "none";
    });

  sendEmailSafe(autoReplyParams, "template_r1bofla", "Auto-reply sent to your email successfully.");
});

// ==============================
// HIRE FORM SUBMISSION
submitHireBtn.addEventListener("click", () => {
  const hireType = document.getElementById("hireType").value;
  const skills = document.getElementById("skills").value.trim();
  const desc = document.getElementById("hireDescription").value.trim();
  const duration = document.getElementById("duration").value;
  const budget = document.getElementById("budget").value.trim();

  if(!skills || !desc || !budget){
    alert("Please fill all required fields!");
    return;
  }

  submitHireBtn.disabled = true;
  submitHireBtn.textContent = "Sending...";

  const hireParams = {
    to_email: "abdullahiibrahima5126@gmail.com",
    client_name: "Hire Request",
    client_email: "N/A",
    service_name: hireType,
    features: skills,
    description: `Duration: ${duration}\nBudget: ₦${budget}\n\n${desc}`
  };

  sendEmailSafe(hireParams, "template_0jr4v0w", "Hire request sent successfully!")
    .finally(()=>{
      submitHireBtn.disabled = false;
      submitHireBtn.textContent = "Submit Request";
      hireForm.reset();
      modalOverlay.style.display = "none";
    });
});
// HERO & SERVICE BUTTONS
heroRequestBtn.addEventListener("click", ()=>openModal("project"));
requestProjectBtn.addEventListener("click", ()=>openModal("project"));

document.querySelectorAll(".request-service-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>openModal("project", btn.dataset.service));
});

// THEME TOGGLE
themeToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// MOBILE MENU
mobileMenuBtn.addEventListener("click", ()=>{ navMenu.classList.toggle("active"); });

// SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");
function revealOnScroll() {
  for (let el of revealElements){
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if(top < windowHeight - 100) el.classList.add("show");
  }
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// CONTACT FORM SUBMISSION
const contactForm = document.getElementById("contact-form");
const contactBtn = document.getElementById("contact-btn");

contactForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if(!name || !email || !phone || !message){
    alert("Please fill all fields!");
    return;
  }

  contactBtn.disabled = true;
  contactBtn.textContent = "Sending...";

  const contactParams = {
    to_email: "abdullahiibrahima5126@gmail.com",
    client_name: name,
    client_email: email,
    client_phone: phone,
    description: message
  };

  sendEmailSafe(contactParams, "template_0jr4v0w", "Message sent successfully!")
    .finally(()=>{
      contactBtn.disabled = false;
      contactBtn.textContent = "Send Message";
      contactForm.reset();
    });
});