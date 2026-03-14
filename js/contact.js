emailjs.init("i87sIi-jgt7TZj4xF"); // ✅ Your public key      
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
