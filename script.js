// ---------- Data ----------
const testimonials = [
  {
    quote: "The online store now loads fast and customers can order sneakers without missing out. Thoughtful, Clock-It.",
    name: "Amina Wanjiru",
    role: "Customer, Satisfied",
    initials: "AW"
  },
  {
    quote: "Delivered a perfect product with size and colour just  as ordered, promised and adhered to detail.",
    name: "Brian Otieno",
    role: "Client, Certified",
    initials: "BO"
  },
  {
    quote: " My all time plug. keep up the good work. Love you for deep understanding of customer needs.",
    name: "Sylvia Chemutai",
    role: "Customer, Day1",
    initials: "SC"
  },
  {
    quote: "Orders now arrive neatly organised on WhatsApp and email. It saved our team hours every week.",
    name: "Peter Kimani",
    role: "Founder, Urban Soles",
    initials: "PK"
  },
  {
    quote: "Our mobile shoppers finally have a smooth checkout. Sales from phones have clearly improved.",
    name: "Lucy Achieng",
    role: "Marketing Lead, Leather & Lace",
    initials: "LA"
  }
];

const projects = [
  {
    title: "Shoe Boutique Storefront",
    featured: true,
    description: "A fast online storefront for browsing shoes by size, colour and category, with a cart and secure checkout that supports M-Pesa payments.",
    tech: ["HTML", "CSS", "JavaScript", "REST API"],
    stats: [["1,240", "Pairs listed"], ["320", "Customers"], ["95%", "Checkout success"]],
    emoji: "👟",
    link: "#"
  },
  {
    title: "Inventory Management System",
    featured: false,
    description: "A web-based tool that tracks stock by shoe model, size and colour, flags low stock, and records sales and deliveries.",
    tech: ["HTML", "CSS", "JavaScript"],
    emoji: "📦",
    link: "#"
  },
  {
    title: "Online Ordering System",
    featured: false,
    description: "A responsive ordering page where customers pick a pair, choose their size, place an order and follow its status.",
    tech: ["HTML", "CSS", "JavaScript"],
    emoji: "🛍️",
    link: "#"
  }
];

// ---------- Testimonials (carousel rendered with a loop) ----------
const testimonialList = document.getElementById("testimonialList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let start = 0;

function perPage() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 960) return 2;
  return 3;
}

function renderTestimonials() {
  const count = perPage();
  testimonialList.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const t = testimonials[(start + i) % testimonials.length];
    const card = document.createElement("article");
    card.className = "card testimonial";
    card.innerHTML = `
      <span class="quote-mark" aria-hidden="true">&ldquo;</span>
      <p class="testimonial__text">&ldquo;${t.quote}&rdquo;</p>
      <div class="person">
        <span class="avatar">${t.initials}</span>
        <div><strong>${t.name}</strong><small>${t.role}</small></div>
      </div>`;
    testimonialList.appendChild(card);
  }
}

prevBtn.addEventListener("click", () => {
  start = (start - 1 + testimonials.length) % testimonials.length;
  renderTestimonials();
});
nextBtn.addEventListener("click", () => {
  start = (start + 1) % testimonials.length;
  renderTestimonials();
});
window.addEventListener("resize", renderTestimonials);

// ---------- Projects (rendered with a loop) ----------
const featuredProject = document.getElementById("featuredProject");
const projectList = document.getElementById("projectList");

function techTags(tech) {
  let html = "";
  for (const item of tech) html += `<li>${item}</li>`;
  return html;
}

for (const p of projects) {
  if (p.featured) {
    let stats = "";
    for (const [value, label] of p.stats) {
      stats += `<div class="stat"><strong>${value}</strong><small>${label}</small></div>`;
    }
    featuredProject.innerHTML = `
      <article class="featured">
        <div class="featured__text">
          <span class="badge">Featured project</span>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <ul class="tags">${techTags(p.tech)}</ul>
          <a href="${p.link}" class="btn btn--primary">View Project &rarr;</a>
        </div>
        <div class="featured__visual" aria-hidden="true">
          <span class="featured__emoji">${p.emoji}</span>
          <div class="stats">${stats}</div>
        </div>
      </article>`;
  } else {
    const card = document.createElement("article");
    card.className = "project";
    card.innerHTML = `
      <div class="project__visual" aria-hidden="true">${p.emoji}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <ul class="tags">${techTags(p.tech)}</ul>
      <a href="${p.link}" class="btn btn--primary">View Project &rarr;</a>`;
    projectList.appendChild(card);
  }
}

// ---------- Mobile nav ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

renderTestimonials();
