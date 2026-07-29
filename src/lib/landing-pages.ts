import { SITE, absoluteUrl } from "./seo";

export interface LandingPageConfig {
  slug: string;
  title: string;
  description: string;
  h1Title: string;
  heroDescription: string;
  keywords: string[];
}

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  // ── Core product name variants ──
  "invoice-generator": {
    slug: "invoice-generator",
    title: `Free Invoice Generator — Create & Send Professional Invoices | ${SITE.name}`,
    description:
      "Generate professional invoices instantly for free. Add line items, taxes, discounts, your logo and signature — download as PDF or send by email. No sign-up required.",
    h1Title: "Free Invoice Generator",
    heroDescription:
      "Create beautiful, professional invoices in seconds. Add your brand, line items, taxes and signature — then download as PDF or email directly to your client.",
    keywords: [
      "invoice generator",
      "free invoice generator",
      "online invoice generator",
      "invoice maker",
      "professional invoice creator",
    ],
  },
  "free-invoice-generator": {
    slug: "free-invoice-generator",
    title: `Free Invoice Generator — No Sign-Up, No Cost | ${SITE.name}`,
    description:
      "Create unlimited invoices for free. No account, no subscription, no ads. Your data stays private in your browser.",
    h1Title: "Free Invoice Generator — No Account Needed",
    heroDescription:
      "Completely free invoice creator with no hidden costs. Works offline in your browser — your invoices never leave your device.",
    keywords: [
      "free invoice generator",
      "free invoice maker",
      "invoice maker free",
      "no cost invoice",
      "free billing tool",
    ],
  },
  "invoice-maker": {
    slug: "invoice-maker",
    title: `Invoice Maker — Professional Invoices in Seconds | ${SITE.name}`,
    description:
      "Make professional invoices fast. Fill in client details, add products or services, set tax rates and download your invoice PDF instantly.",
    h1Title: "Invoice Maker",
    heroDescription:
      "Build and send stunning invoices with zero learning curve. Start billing clients professionally in minutes.",
    keywords: [
      "invoice maker",
      "make an invoice",
      "invoice builder",
      "create invoice",
      "invoice creator online",
    ],
  },
  "invoice-creator": {
    slug: "invoice-creator",
    title: `Invoice Creator — Design & Download Invoices | ${SITE.name}`,
    description:
      "Simple invoice creator for freelancers and small businesses. Add logo, payment terms, line items and download a polished PDF invoice.",
    h1Title: "Invoice Creator",
    heroDescription:
      "Design clean, client-ready invoices with your logo and brand. Download PDF or send by email directly from your browser.",
    keywords: [
      "invoice creator",
      "create invoice online",
      "invoice design tool",
      "invoice pdf creator",
    ],
  },
  "invoice-builder": {
    slug: "invoice-builder",
    title: `Invoice Builder — Build Custom Invoices Online | ${SITE.name}`,
    description:
      "Drag-and-drop invoice builder. Customize every field — line items, payment terms, taxes, discounts, notes and signature.",
    h1Title: "Custom Invoice Builder",
    heroDescription:
      "Build invoices tailored to your business. Full control over layout, content, tax rates, discounts and client details.",
    keywords: [
      "invoice builder",
      "build invoice online",
      "custom invoice maker",
      "invoice form builder",
    ],
  },

  // ── No login / no sign-up variants ──
  "no-login": {
    slug: "no-login",
    title: `Invoice Generator — No Login, No Sign-Up Required | ${SITE.name}`,
    description:
      "Create and send invoices without creating an account. No email required, no login — just open the app and start invoicing.",
    h1Title: "Invoice Generator — No Login Required",
    heroDescription:
      "Skip the sign-up. Open KenVoice and start creating professional invoices immediately — completely private in your browser.",
    keywords: [
      "invoice no login",
      "invoice no sign up",
      "no account invoice maker",
      "invoice without registration",
      "anonymous invoice generator",
    ],
  },
  "no-signup": {
    slug: "no-signup",
    title: `Free Invoice Generator — No Sign-Up Needed | ${SITE.name}`,
    description:
      "Invoice maker that requires no account or sign-up. Open your browser, create invoices, send to clients and get paid.",
    h1Title: "Invoice Generator With No Sign-Up",
    heroDescription:
      "No registration, no email verification, no subscriptions. Pure invoicing right in your browser.",
    keywords: [
      "invoice no signup",
      "invoice without account",
      "no registration invoice",
      "instant invoice tool",
    ],
  },
  "no-account": {
    slug: "no-account",
    title: `Create Invoices — No Account Needed | ${SITE.name}`,
    description:
      "The fastest way to create invoices without an account. Browser-based, private, and completely free.",
    h1Title: "Invoice Tool — No Account Required",
    heroDescription:
      "No cloud storage, no account creation. Your invoice data lives locally on your device.",
    keywords: [
      "invoice no account",
      "invoice without account",
      "no sign in invoice",
      "offline invoice maker",
    ],
  },

  // ── Free variants ──
  "free-invoice": {
    slug: "free-invoice",
    title: `Free Invoice — Create & Send Free Invoices Online | ${SITE.name}`,
    description:
      "Generate free invoices online. No watermarks, no paywalls, no limits. Send directly to clients or download as PDF.",
    h1Title: "Free Invoice Generator",
    heroDescription:
      "Create unlimited professional invoices for free. No watermarks, no premium plan needed.",
    keywords: [
      "free invoice",
      "free invoice online",
      "free invoice pdf",
      "free billing invoice",
      "create free invoice",
    ],
  },
  "free-invoicing": {
    slug: "free-invoicing",
    title: `Free Invoicing Software — Browser-Based & Private | ${SITE.name}`,
    description:
      "Free invoicing tool with PDF generation, email sending, client management and signature support. No cloud subscription required.",
    h1Title: "Free Invoicing Software",
    heroDescription:
      "Full-featured invoicing without the monthly fee. Manage clients, create invoices and send by email — all for free.",
    keywords: [
      "free invoicing",
      "free invoicing software",
      "free invoicing tool",
      "free billing software",
    ],
  },

  // ── PDF invoice variants ──
  "invoice-pdf": {
    slug: "invoice-pdf",
    title: `Invoice PDF Generator — Download Professional PDF Invoices | ${SITE.name}`,
    description:
      "Generate invoice PDFs instantly. High-quality, print-ready PDF invoices with your logo, signature and line items.",
    h1Title: "Invoice PDF Generator",
    heroDescription:
      "Create pixel-perfect PDF invoices ready for print or email attachment. Download instantly with one click.",
    keywords: [
      "invoice pdf",
      "invoice pdf generator",
      "pdf invoice maker",
      "create invoice pdf",
      "download invoice pdf",
    ],
  },
  "pdf-invoice-generator": {
    slug: "pdf-invoice-generator",
    title: `PDF Invoice Generator — Free & Instant | ${SITE.name}`,
    description:
      "Generate professional PDF invoices for free. Customise with logo, tax, discounts and signature then download or email.",
    h1Title: "PDF Invoice Generator",
    heroDescription:
      "Turn your billing details into a sharp PDF invoice in seconds. No design skills needed.",
    keywords: [
      "pdf invoice generator",
      "invoice pdf creator",
      "make pdf invoice",
      "generate pdf invoice online",
    ],
  },

  // ── Freelancer / small business ──
  "freelance-invoice": {
    slug: "freelance-invoice",
    title: `Freelance Invoice Generator — Get Paid Faster | ${SITE.name}`,
    description:
      "Invoice template built for freelancers. Add hourly rates, project milestones, and send professional invoices to clients in minutes.",
    h1Title: "Freelance Invoice Generator",
    heroDescription:
      "Perfect for freelancers. Create branded invoices with hourly or fixed rates, notes and payment terms — then email to your client.",
    keywords: [
      "freelance invoice",
      "freelance invoice generator",
      "invoice for freelancers",
      "freelancer billing tool",
      "self employed invoice",
    ],
  },
  "small-business-invoice": {
    slug: "small-business-invoice",
    title: `Small Business Invoice Generator — Professional & Free | ${SITE.name}`,
    description:
      "Invoice solution for small businesses. Manage clients, create recurring invoices, apply taxes and send by email.",
    h1Title: "Small Business Invoice Generator",
    heroDescription:
      "Built for small business owners who want to invoice professionally without expensive software.",
    keywords: [
      "small business invoice",
      "business invoice generator",
      "invoice for small business",
      "small business billing",
    ],
  },

  // ── Send invoice email ──
  "send-invoice-email": {
    slug: "send-invoice-email",
    title: `Send Invoice by Email — Attach PDF & Notify Clients | ${SITE.name}`,
    description:
      "Send professional invoices directly to clients by email with a PDF attachment. Powered by your own email API key.",
    h1Title: "Send Invoice by Email",
    heroDescription:
      "Send invoices directly from KenVoice with a professional email and attached PDF — delivered straight to your client.",
    keywords: [
      "send invoice email",
      "email invoice to client",
      "invoice with pdf attachment",
      "send invoice online",
      "email billing",
    ],
  },

  // ── Online invoice ──
  "online-invoice": {
    slug: "online-invoice",
    title: `Online Invoice Generator — Fast, Free & Private | ${SITE.name}`,
    description:
      "Create invoices entirely online, directly in your browser. No software installation, no account needed.",
    h1Title: "Online Invoice Generator",
    heroDescription:
      "Browser-powered invoicing. Create, download and send professional invoices entirely online — no installs required.",
    keywords: [
      "online invoice",
      "online invoice generator",
      "invoice online free",
      "browser invoice tool",
      "web invoice maker",
    ],
  },
  "invoice-online": {
    slug: "invoice-online",
    title: `Invoice Online — Create & Send Invoices in Your Browser | ${SITE.name}`,
    description:
      "Invoice clients online without any downloads. Open KenVoice in your browser and start generating professional invoices immediately.",
    h1Title: "Create Invoices Online",
    heroDescription:
      "The fastest way to invoice online. No downloads, no installs — just open and invoice.",
    keywords: [
      "invoice online",
      "create invoice online",
      "invoice clients online",
      "invoicing online",
    ],
  },

  // ── Template variants ──
  "invoice-template": {
    slug: "invoice-template",
    title: `Free Invoice Template — Download or Fill Online | ${SITE.name}`,
    description:
      "Professional invoice templates you can fill online and download as PDF. Customise with your logo, details and payment terms.",
    h1Title: "Free Invoice Template",
    heroDescription:
      "Start from a clean, professional invoice template. Fill in your details and download as a polished PDF.",
    keywords: [
      "invoice template",
      "invoice template free",
      "free invoice template",
      "invoice format",
      "invoice sample",
    ],
  },

  // ── Industry-specific ──
  "contractor-invoice": {
    slug: "contractor-invoice",
    title: `Contractor Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your contractor business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Contractor Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for contractors. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "contractor invoice",
      "invoice for contractors",
      "contractor invoice generator",
      "contractor invoice template",
      "contractor billing software",
    ],
  },

  "consultant-invoice": {
    slug: "consultant-invoice",
    title: `Consultant Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your consultant business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Consultant Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for consultants. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "consultant invoice",
      "invoice for consultants",
      "consultant invoice generator",
      "consultant invoice template",
      "consultant billing software",
    ],
  },

  "photographer-invoice": {
    slug: "photographer-invoice",
    title: `Photographer Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your photographer business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Photographer Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for photographers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "photographer invoice",
      "invoice for photographers",
      "photographer invoice generator",
      "photographer invoice template",
      "photographer billing software",
    ],
  },

  "plumber-invoice": {
    slug: "plumber-invoice",
    title: `Plumber Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your plumber business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Plumber Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for plumbers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "plumber invoice",
      "invoice for plumbers",
      "plumber invoice generator",
      "plumber invoice template",
      "plumber billing software",
    ],
  },

  "electrician-invoice": {
    slug: "electrician-invoice",
    title: `Electrician Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your electrician business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Electrician Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for electricians. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "electrician invoice",
      "invoice for electricians",
      "electrician invoice generator",
      "electrician invoice template",
      "electrician billing software",
    ],
  },

  "graphic-designer-invoice": {
    slug: "graphic-designer-invoice",
    title: `Graphic Designer Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your graphic designer business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Graphic Designer Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for graphic designers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "graphic designer invoice",
      "invoice for graphic designers",
      "graphic designer invoice generator",
      "graphic designer invoice template",
      "graphic designer billing software",
    ],
  },

  "web-designer-invoice": {
    slug: "web-designer-invoice",
    title: `Web Designer Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your web designer business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Web Designer Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for web designers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "web designer invoice",
      "invoice for web designers",
      "web designer invoice generator",
      "web designer invoice template",
      "web designer billing software",
    ],
  },

  "lawn-care-invoice": {
    slug: "lawn-care-invoice",
    title: `Lawn Care Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your lawn care business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Lawn Care Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for lawn care businesses. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "lawn care invoice",
      "invoice for lawn care businesses",
      "lawn care invoice generator",
      "lawn care invoice template",
      "lawn care billing software",
    ],
  },

  "cleaning-service-invoice": {
    slug: "cleaning-service-invoice",
    title: `Cleaning Service Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your cleaning service business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Cleaning Service Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for cleaning services. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "cleaning service invoice",
      "invoice for cleaning services",
      "cleaning service invoice generator",
      "cleaning service invoice template",
      "cleaning service billing software",
    ],
  },

  "handyman-invoice": {
    slug: "handyman-invoice",
    title: `Handyman Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your handyman business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Handyman Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for handymen. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "handyman invoice",
      "invoice for handymen",
      "handyman invoice generator",
      "handyman invoice template",
      "handyman billing software",
    ],
  },

  "tutor-invoice": {
    slug: "tutor-invoice",
    title: `Tutor Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your tutor business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Tutor Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for tutors. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "tutor invoice",
      "invoice for tutors",
      "tutor invoice generator",
      "tutor invoice template",
      "tutor billing software",
    ],
  },

  "personal-trainer-invoice": {
    slug: "personal-trainer-invoice",
    title: `Personal Trainer Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your personal trainer business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Personal Trainer Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for personal trainers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "personal trainer invoice",
      "invoice for personal trainers",
      "personal trainer invoice generator",
      "personal trainer invoice template",
      "personal trainer billing software",
    ],
  },

  "hair-salon-invoice": {
    slug: "hair-salon-invoice",
    title: `Hair Salon Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your hair salon business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Hair Salon Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for hair salons. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "hair salon invoice",
      "invoice for hair salons",
      "hair salon invoice generator",
      "hair salon invoice template",
      "hair salon billing software",
    ],
  },

  "makeup-artist-invoice": {
    slug: "makeup-artist-invoice",
    title: `Makeup Artist Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your makeup artist business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Makeup Artist Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for makeup artists. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "makeup artist invoice",
      "invoice for makeup artists",
      "makeup artist invoice generator",
      "makeup artist invoice template",
      "makeup artist billing software",
    ],
  },

  "videographer-invoice": {
    slug: "videographer-invoice",
    title: `Videographer Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your videographer business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Videographer Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for videographers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "videographer invoice",
      "invoice for videographers",
      "videographer invoice generator",
      "videographer invoice template",
      "videographer billing software",
    ],
  },

  "catering-invoice": {
    slug: "catering-invoice",
    title: `Catering Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your catering business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Catering Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for caterers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "catering invoice",
      "invoice for caterers",
      "catering invoice generator",
      "catering invoice template",
      "catering billing software",
    ],
  },

  "event-planner-invoice": {
    slug: "event-planner-invoice",
    title: `Event Planner Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your event planner business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Event Planner Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for event planners. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "event planner invoice",
      "invoice for event planners",
      "event planner invoice generator",
      "event planner invoice template",
      "event planner billing software",
    ],
  },

  "landscaping-invoice": {
    slug: "landscaping-invoice",
    title: `Landscaping Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your landscaping business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Landscaping Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for landscapers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "landscaping invoice",
      "invoice for landscapers",
      "landscaping invoice generator",
      "landscaping invoice template",
      "landscaping billing software",
    ],
  },

  "auto-repair-invoice": {
    slug: "auto-repair-invoice",
    title: `Auto Repair Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your auto repair business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Auto Repair Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for auto repair shops. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "auto repair invoice",
      "invoice for auto repair shops",
      "auto repair invoice generator",
      "auto repair invoice template",
      "auto repair billing software",
    ],
  },

  "roofing-invoice": {
    slug: "roofing-invoice",
    title: `Roofing Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your roofing business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Roofing Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for roofing contractors. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "roofing invoice",
      "invoice for roofing contractors",
      "roofing invoice generator",
      "roofing invoice template",
      "roofing billing software",
    ],
  },

  "moving-company-invoice": {
    slug: "moving-company-invoice",
    title: `Moving Company Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your moving company business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Moving Company Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for moving companies. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "moving company invoice",
      "invoice for moving companies",
      "moving company invoice generator",
      "moving company invoice template",
      "moving company billing software",
    ],
  },

  "pet-grooming-invoice": {
    slug: "pet-grooming-invoice",
    title: `Pet Grooming Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your pet grooming business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Pet Grooming Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for pet groomers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "pet grooming invoice",
      "invoice for pet groomers",
      "pet grooming invoice generator",
      "pet grooming invoice template",
      "pet grooming billing software",
    ],
  },

  "real-estate-agent-invoice": {
    slug: "real-estate-agent-invoice",
    title: `Real Estate Agent Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your real estate agent business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Real Estate Agent Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for real estate agents. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "real estate agent invoice",
      "invoice for real estate agents",
      "real estate agent invoice generator",
      "real estate agent invoice template",
      "real estate agent billing software",
    ],
  },

  "interior-designer-invoice": {
    slug: "interior-designer-invoice",
    title: `Interior Designer Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your interior designer business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Interior Designer Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for interior designers. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "interior designer invoice",
      "invoice for interior designers",
      "interior designer invoice generator",
      "interior designer invoice template",
      "interior designer billing software",
    ],
  },

  "accountant-invoice": {
    slug: "accountant-invoice",
    title: `Accountant Invoice Generator - Bill Clients Professionally | ${SITE.name}`,
    description:
      "Create professional invoices for your accountant business. Add services, rates and taxes, your logo and signature, then download as PDF or send by email.",
    h1Title: "Accountant Invoice Generator",
    heroDescription:
      "Purpose-built invoicing for accountants. Add your services, set your rates and send polished, client-ready invoices in minutes.",
    keywords: [
      "accountant invoice",
      "invoice for accountants",
      "accountant invoice generator",
      "accountant invoice template",
      "accountant billing software",
    ],
  },

  "invoice-format": {
    slug: "invoice-format",
    title: `Standard Invoice Format - Fill Online or Download | ${SITE.name}`,
    description:
      "See and use a standard, professional invoice format. Fill it in online and download as PDF, no design work required.",
    h1Title: "Standard Invoice Format",
    heroDescription:
      "Follow a clean, professional invoice format that clients recognize and trust. Fill it in and export instantly.",
    keywords: [
      "invoice format",
      "standard invoice format",
      "invoice layout",
      "professional invoice format",
      "invoice format online",
    ],
  },

  "invoice-word": {
    slug: "invoice-word",
    title: `Invoice Template for Word - Fill Online, Export Anywhere | ${SITE.name}`,
    description:
      "Skip fiddling with Word invoice templates. Fill in your invoice online and export a polished PDF instead of formatting margins.",
    h1Title: "Invoice Template for Word Users",
    heroDescription:
      "A faster alternative to editing Word invoice templates. Fill in your details online and download a clean PDF invoice.",
    keywords: [
      "invoice template word",
      "word invoice template",
      "ms word invoice",
      "editable invoice word",
      "invoice doc",
    ],
  },

  "invoice-excel": {
    slug: "invoice-excel",
    title: `Invoice Template for Excel Users - No Spreadsheet Needed | ${SITE.name}`,
    description:
      "Tired of maintaining an Excel invoice template? Create the same professional invoice online, with automatic totals and tax calculations.",
    h1Title: "Invoice Template for Excel Users",
    heroDescription:
      "Get everything your Excel invoice template does, with automatic calculations and no broken formulas.",
    keywords: [
      "invoice template excel",
      "excel invoice template",
      "invoice spreadsheet",
      "invoice xls",
      "billing spreadsheet",
    ],
  },

  "invoice-google-docs": {
    slug: "invoice-google-docs",
    title: `Invoice Template for Google Docs Users - Faster Alternative | ${SITE.name}`,
    description:
      "Instead of copying a Google Docs invoice template, generate one online with automatic totals, taxes and a downloadable PDF.",
    h1Title: "Invoice Alternative to Google Docs Templates",
    heroDescription:
      "A quicker way to invoice than duplicating a Google Docs template. Fill in your details and download the PDF directly.",
    keywords: [
      "invoice template google docs",
      "google docs invoice",
      "google doc invoice template",
      "invoice google docs free",
    ],
  },

  "invoice-google-sheets": {
    slug: "invoice-google-sheets",
    title: `Invoice Template for Google Sheets Users - Simpler Alternative | ${SITE.name}`,
    description:
      "Replace your Google Sheets invoice template with an online generator that handles totals, taxes and PDF export automatically.",
    h1Title: "Invoice Alternative to Google Sheets Templates",
    heroDescription:
      "No more formulas to maintain. Fill in your invoice details online and get a polished PDF in seconds.",
    keywords: [
      "invoice template google sheets",
      "google sheets invoice",
      "invoice spreadsheet google",
      "billing sheet template",
    ],
  },

  "invoice-app": {
    slug: "invoice-app",
    title: `Invoice App - Create Invoices From Any Device | ${SITE.name}`,
    description:
      "A browser-based invoice app that works on desktop, tablet and mobile. Create and download invoices without installing anything.",
    h1Title: "Invoice App",
    heroDescription:
      "Use KenVoice as your invoicing app, right in the browser. No install, no account, works on any device.",
    keywords: [
      "invoice app",
      "invoicing app",
      "invoice app online",
      "invoice app no download",
      "mobile invoice app",
    ],
  },

  "invoice-software": {
    slug: "invoice-software",
    title: `Invoice Software - Free, Browser-Based Billing | ${SITE.name}`,
    description:
      "Full invoicing software without the install or monthly fee. Create, customize and download invoices directly in your browser.",
    h1Title: "Invoice Software",
    heroDescription:
      "Lightweight invoicing software that runs entirely in your browser. No installation, no subscription required.",
    keywords: [
      "invoice software",
      "invoicing software free",
      "billing software online",
      "invoice software no install",
    ],
  },

  "invoice-tool": {
    slug: "invoice-tool",
    title: `Free Invoice Tool - Create Invoices in Seconds | ${SITE.name}`,
    description:
      "A simple, free invoice tool for creating professional invoices. Add line items, taxes and your branding, then download as PDF.",
    h1Title: "Free Invoice Tool",
    heroDescription:
      "A no-nonsense tool for creating invoices fast. Fill in the details and download a client-ready PDF.",
    keywords: [
      "invoice tool",
      "free invoice tool",
      "online invoicing tool",
      "simple invoice tool",
    ],
  },

  "invoice-form": {
    slug: "invoice-form",
    title: `Fillable Invoice Form - Create & Download Instantly | ${SITE.name}`,
    description:
      "Fill out a simple invoice form and get a professional, downloadable PDF invoice in return, no software needed.",
    h1Title: "Fillable Invoice Form",
    heroDescription:
      "A straightforward fillable invoice form. Enter your details once and download a polished invoice PDF.",
    keywords: [
      "invoice form",
      "fillable invoice form",
      "invoice form online",
      "invoice form pdf",
    ],
  },

  "invoice-example": {
    slug: "invoice-example",
    title: `Invoice Example - See a Sample & Create Your Own | ${SITE.name}`,
    description:
      "See a professional invoice example, then create your own in the same format. Add your logo, line items and payment terms.",
    h1Title: "Invoice Example & Generator",
    heroDescription:
      "Start from a real invoice example and turn it into your own in minutes, with your branding and line items.",
    keywords: [
      "invoice example",
      "sample invoice",
      "invoice sample pdf",
      "example invoice format",
    ],
  },

  "gst-invoice": {
    slug: "gst-invoice",
    title: `GST Invoice Generator - Create GST-Compliant Invoices | ${SITE.name}`,
    description:
      "Generate invoices with GST breakdown for your business. Add GSTIN, tax rates and HSN codes, then download as PDF.",
    h1Title: "GST Invoice Generator",
    heroDescription:
      "Create GST invoices with automatic tax calculation, GSTIN field and clean line-item breakdowns.",
    keywords: [
      "gst invoice",
      "gst invoice generator",
      "gst bill format",
      "gst invoice format",
      "gst invoice online",
    ],
  },

  "vat-invoice": {
    slug: "vat-invoice",
    title: `VAT Invoice Generator - Create VAT-Compliant Invoices | ${SITE.name}`,
    description:
      "Generate invoices with VAT breakdown for your business. Add VAT numbers, rates and totals, then download as PDF.",
    h1Title: "VAT Invoice Generator",
    heroDescription:
      "Create VAT invoices with automatic tax calculation and a clean, compliant layout.",
    keywords: [
      "vat invoice",
      "vat invoice generator",
      "vat invoice template",
      "vat invoice format",
    ],
  },

  "tax-invoice": {
    slug: "tax-invoice",
    title: `Tax Invoice Generator - Create Tax-Compliant Invoices | ${SITE.name}`,
    description:
      "Generate tax invoices with itemized tax rates, totals and business details. Download as PDF or send by email.",
    h1Title: "Tax Invoice Generator",
    heroDescription:
      "Create tax invoices with clear tax breakdowns for every line item.",
    keywords: [
      "tax invoice",
      "tax invoice generator",
      "tax invoice template",
      "tax invoice format",
    ],
  },

  "uk-invoice-generator": {
    slug: "uk-invoice-generator",
    title: `UK Invoice Generator - Create Invoices for UK Businesses | ${SITE.name}`,
    description:
      "Create invoices formatted for UK businesses, with VAT, GBP currency and standard UK invoice fields.",
    h1Title: "Invoice Generator for UK Businesses",
    heroDescription:
      "Built for UK freelancers and businesses. Add VAT, use GBP and follow standard UK invoice conventions.",
    keywords: [
      "uk invoice generator",
      "invoice generator uk",
      "uk invoice template",
      "invoice uk business",
    ],
  },

  "us-invoice-generator": {
    slug: "us-invoice-generator",
    title: `US Invoice Generator - Create Invoices for US Businesses | ${SITE.name}`,
    description:
      "Create invoices formatted for US businesses, with sales tax fields, USD currency and standard US invoice layout.",
    h1Title: "Invoice Generator for US Businesses",
    heroDescription:
      "Built for US freelancers and businesses. Add sales tax, use USD and follow standard US invoice conventions.",
    keywords: [
      "us invoice generator",
      "invoice generator usa",
      "us invoice template",
      "invoice for us business",
    ],
  },

  "canada-invoice-generator": {
    slug: "canada-invoice-generator",
    title: `Canada Invoice Generator - Create GST/HST Invoices | ${SITE.name}`,
    description:
      "Create invoices formatted for Canadian businesses, with GST/HST fields and CAD currency.",
    h1Title: "Invoice Generator for Canadian Businesses",
    heroDescription:
      "Built for Canadian freelancers and businesses, with GST/HST support and CAD currency.",
    keywords: [
      "canada invoice generator",
      "invoice generator canada",
      "hst invoice",
      "canadian invoice template",
    ],
  },

  "australia-invoice-generator": {
    slug: "australia-invoice-generator",
    title: `Australia Invoice Generator - Create GST Invoices | ${SITE.name}`,
    description:
      "Create invoices formatted for Australian businesses, with GST fields, ABN and AUD currency.",
    h1Title: "Invoice Generator for Australian Businesses",
    heroDescription:
      "Built for Australian freelancers and businesses, with GST, ABN field and AUD currency.",
    keywords: [
      "australia invoice generator",
      "invoice generator australia",
      "abn invoice",
      "australian invoice template",
    ],
  },

  "india-invoice-generator": {
    slug: "india-invoice-generator",
    title: `India Invoice Generator - Create GST Invoices | ${SITE.name}`,
    description:
      "Create invoices formatted for Indian businesses, with GST breakdown, GSTIN and INR currency.",
    h1Title: "Invoice Generator for Indian Businesses",
    heroDescription:
      "Built for Indian freelancers and businesses, with GST, GSTIN field and INR currency.",
    keywords: [
      "india invoice generator",
      "invoice generator india",
      "gst invoice india",
      "indian invoice format",
    ],
  },

  "eu-invoice-generator": {
    slug: "eu-invoice-generator",
    title: `EU Invoice Generator - Create VAT-Compliant Invoices | ${SITE.name}`,
    description:
      "Create invoices formatted for businesses in the EU, with VAT numbers, intra-EU fields and EUR currency.",
    h1Title: "Invoice Generator for EU Businesses",
    heroDescription:
      "Built for freelancers and businesses across the EU, with VAT number fields and EUR currency.",
    keywords: [
      "eu invoice generator",
      "invoice generator europe",
      "vat invoice eu",
      "european invoice template",
    ],
  },

  "invoice-with-tax": {
    slug: "invoice-with-tax",
    title: `Invoice Generator With Tax Calculation - Auto Totals | ${SITE.name}`,
    description:
      "Create invoices with automatic tax calculation. Set tax rates per item and get accurate totals every time.",
    h1Title: "Invoice Generator With Tax Calculation",
    heroDescription:
      "Add tax rates once and let the totals calculate automatically, no manual math required.",
    keywords: [
      "invoice with tax",
      "invoice tax calculator",
      "invoice generator with tax",
      "auto tax invoice",
    ],
  },

  "recurring-invoice": {
    slug: "recurring-invoice",
    title: `Recurring Invoice Generator - Bill Clients on a Schedule | ${SITE.name}`,
    description:
      "Set up invoices for repeat clients and recurring work. Reuse client and line-item details instead of starting from scratch.",
    h1Title: "Recurring Invoice Generator",
    heroDescription:
      "Built for retainer and subscription billing. Save your details once and generate the next invoice in seconds.",
    keywords: [
      "recurring invoice",
      "recurring invoice generator",
      "repeat invoice",
      "subscription invoice",
    ],
  },

  "invoice-with-logo": {
    slug: "invoice-with-logo",
    title: `Invoice Generator With Logo Upload - Brand Your Invoices | ${SITE.name}`,
    description:
      "Add your business logo to every invoice. Upload once and keep your branding consistent across every client.",
    h1Title: "Invoice Generator With Your Logo",
    heroDescription:
      "Upload your logo and it appears on every invoice you create, keeping your billing on-brand.",
    keywords: [
      "invoice with logo",
      "invoice logo upload",
      "branded invoice generator",
      "custom logo invoice",
    ],
  },

  "invoice-with-signature": {
    slug: "invoice-with-signature",
    title: `Invoice Generator With Signature - Add a Personal Touch | ${SITE.name}`,
    description:
      "Add a digital or drawn signature to your invoices for a personal, professional finish.",
    h1Title: "Invoice Generator With Signature",
    heroDescription:
      "Draw or upload a signature and place it directly on your invoice before you send it.",
    keywords: [
      "invoice with signature",
      "signed invoice generator",
      "invoice signature field",
      "add signature to invoice",
    ],
  },

  "invoice-discount": {
    slug: "invoice-discount",
    title: `Invoice Generator With Discounts - Percentage or Flat Rate | ${SITE.name}`,
    description:
      "Apply percentage or flat-rate discounts to any invoice, with totals that update automatically.",
    h1Title: "Invoice Generator With Discounts",
    heroDescription:
      "Add a discount line to any invoice and watch totals adjust automatically, no manual recalculating.",
    keywords: [
      "invoice with discount",
      "invoice discount calculator",
      "discounted invoice generator",
    ],
  },

  "invoice-late-fee": {
    slug: "invoice-late-fee",
    title: `Invoice Generator With Late Fees - Add Payment Penalties | ${SITE.name}`,
    description:
      "Add a late payment fee or interest charge directly on your invoice to encourage on-time payment.",
    h1Title: "Invoice Generator With Late Fees",
    heroDescription:
      "Set a late fee or interest rate so clients see the cost of paying late right on the invoice.",
    keywords: [
      "invoice late fee",
      "late payment invoice",
      "invoice interest charge",
    ],
  },

  "invoice-due-date": {
    slug: "invoice-due-date",
    title: `Invoice Generator With Due Dates - Set Clear Payment Terms | ${SITE.name}`,
    description:
      "Set a clear due date on every invoice so clients know exactly when payment is expected.",
    h1Title: "Invoice Generator With Due Dates",
    heroDescription:
      "Add a due date to every invoice, with common terms like Net 15, Net 30 or a custom date.",
    keywords: [
      "invoice due date",
      "invoice payment due",
      "net 30 invoice",
      "invoice terms generator",
    ],
  },

  "invoice-payment-terms": {
    slug: "invoice-payment-terms",
    title: `Invoice Generator With Payment Terms - Net 15, 30, 60 | ${SITE.name}`,
    description:
      "Add standard payment terms like Net 15, Net 30 or Net 60 to your invoices, or write your own custom terms.",
    h1Title: "Invoice Generator With Payment Terms",
    heroDescription:
      "Choose from common payment terms or set your own, so clients always know when to pay.",
    keywords: [
      "invoice payment terms",
      "net 30 invoice terms",
      "invoice terms and conditions",
    ],
  },

  "multi-currency-invoice": {
    slug: "multi-currency-invoice",
    title: `Multi-Currency Invoice Generator - Bill in Any Currency | ${SITE.name}`,
    description:
      "Create invoices in USD, EUR, GBP or any currency your international clients use.",
    h1Title: "Multi-Currency Invoice Generator",
    heroDescription:
      "Choose the currency that matches your client and generate an invoice in their local format.",
    keywords: [
      "multi currency invoice",
      "invoice in different currency",
      "international invoice generator",
    ],
  },

  "invoice-number-generator": {
    slug: "invoice-number-generator",
    title: `Invoice Number Generator - Automatic Sequential Numbering | ${SITE.name}`,
    description:
      "Automatically generate sequential, professional invoice numbers so you never duplicate or lose track.",
    h1Title: "Invoice Number Generator",
    heroDescription:
      "Get a clean, sequential invoice number on every invoice automatically, no manual tracking needed.",
    keywords: [
      "invoice number generator",
      "invoice numbering system",
      "auto invoice number",
    ],
  },

  "invoice-tracking": {
    slug: "invoice-tracking",
    title: `Invoice Tracker - Keep Track of Sent and Paid Invoices | ${SITE.name}`,
    description:
      "Keep a simple record of invoices you have sent, and mark them as paid, pending or overdue.",
    h1Title: "Invoice Tracker",
    heroDescription:
      "A lightweight way to track which invoices are sent, paid or overdue, without a full accounting system.",
    keywords: [
      "invoice tracker",
      "invoice tracking tool",
      "track invoices paid",
    ],
  },

  "invoice-reminder": {
    slug: "invoice-reminder",
    title: `Invoice Reminder Generator - Follow Up on Unpaid Invoices | ${SITE.name}`,
    description:
      "Create polite, professional payment reminders for overdue invoices in seconds.",
    h1Title: "Invoice Reminder Generator",
    heroDescription:
      "Generate a friendly but firm reminder for clients who have not yet paid.",
    keywords: [
      "invoice reminder",
      "payment reminder generator",
      "overdue invoice reminder",
    ],
  },

  "itemized-invoice": {
    slug: "itemized-invoice",
    title: `Itemized Invoice Generator - Break Down Every Line Item | ${SITE.name}`,
    description:
      "Create detailed, itemized invoices that break down every product, service, quantity and rate.",
    h1Title: "Itemized Invoice Generator",
    heroDescription:
      "Give clients full transparency with a clearly itemized breakdown of every charge.",
    keywords: [
      "itemized invoice",
      "itemized invoice generator",
      "detailed invoice template",
    ],
  },

  "invoice-with-notes": {
    slug: "invoice-with-notes",
    title: `Invoice Generator With Notes Section - Add Extra Details | ${SITE.name}`,
    description:
      "Add a notes or terms section to your invoice for extra instructions, thank-you messages or policies.",
    h1Title: "Invoice Generator With Notes",
    heroDescription:
      "Add a free-text notes section so you can include payment instructions or a thank-you note.",
    keywords: [
      "invoice with notes",
      "invoice notes section",
      "invoice terms notes",
    ],
  },

  "custom-invoice-fields": {
    slug: "custom-invoice-fields",
    title: `Custom Invoice Fields - Add the Details Your Business Needs | ${SITE.name}`,
    description:
      "Add custom fields to your invoice for purchase order numbers, project codes or anything your business tracks.",
    h1Title: "Custom Invoice Fields Generator",
    heroDescription:
      "Add extra fields like PO numbers or project codes so your invoices match your workflow.",
    keywords: [
      "custom invoice fields",
      "invoice with po number",
      "customizable invoice generator",
    ],
  },

  "invoice-status-tracker": {
    slug: "invoice-status-tracker",
    title: `Invoice Status Tracker - Paid, Pending or Overdue | ${SITE.name}`,
    description:
      "Mark each invoice as paid, pending or overdue and keep a clear view of your outstanding payments.",
    h1Title: "Invoice Status Tracker",
    heroDescription:
      "See at a glance which invoices are paid, pending or overdue.",
    keywords: [
      "invoice status tracker",
      "invoice paid pending overdue",
      "track unpaid invoices",
    ],
  },

  "quote-generator": {
    slug: "quote-generator",
    title: `Free Quote Generator - Create Client Quotes Instantly | ${SITE.name}`,
    description:
      "Create professional price quotes for clients before starting a project. Convert to an invoice once approved.",
    h1Title: "Free Quote Generator",
    heroDescription:
      "Send a clean, professional quote before you start work, then turn it into an invoice once it's approved.",
    keywords: [
      "quote generator",
      "price quote generator",
      "free quote maker",
      "client quote template",
    ],
  },

  "estimate-generator": {
    slug: "estimate-generator",
    title: `Free Estimate Generator - Create Project Estimates | ${SITE.name}`,
    description:
      "Create professional project estimates for clients, with line items, rates and totals.",
    h1Title: "Free Estimate Generator",
    heroDescription:
      "Give clients a clear, itemized estimate before work begins, no guesswork on either side.",
    keywords: [
      "estimate generator",
      "project estimate template",
      "free estimate maker",
      "job estimate generator",
    ],
  },

  "receipt-generator": {
    slug: "receipt-generator",
    title: `Free Receipt Generator - Create Payment Receipts | ${SITE.name}`,
    description:
      "Create professional payment receipts for clients after they pay. Download as PDF or email directly.",
    h1Title: "Free Receipt Generator",
    heroDescription:
      "Confirm payment with a clean, professional receipt in seconds.",
    keywords: [
      "receipt generator",
      "payment receipt generator",
      "free receipt maker",
      "receipt template online",
    ],
  },

  "proforma-invoice": {
    slug: "proforma-invoice",
    title: `Proforma Invoice Generator - Create Preliminary Bills | ${SITE.name}`,
    description:
      "Create proforma invoices to give clients a preliminary bill before the final invoice is issued.",
    h1Title: "Proforma Invoice Generator",
    heroDescription:
      "Send a preliminary bill so clients know exactly what to expect before the final invoice.",
    keywords: [
      "proforma invoice",
      "proforma invoice generator",
      "proforma invoice template",
    ],
  },

  "credit-note-generator": {
    slug: "credit-note-generator",
    title: `Credit Note Generator - Issue Refunds and Corrections | ${SITE.name}`,
    description:
      "Create credit notes to issue refunds, corrections or adjustments against a previous invoice.",
    h1Title: "Credit Note Generator",
    heroDescription:
      "Issue a clean credit note when you need to refund or correct a past invoice.",
    keywords: [
      "credit note generator",
      "credit note template",
      "invoice credit note",
    ],
  },

  "purchase-order-generator": {
    slug: "purchase-order-generator",
    title: `Purchase Order Generator - Create POs Instantly | ${SITE.name}`,
    description:
      "Create professional purchase orders for suppliers, with line items, quantities and terms.",
    h1Title: "Purchase Order Generator",
    heroDescription:
      "Send a clear purchase order to suppliers with all the details they need to fulfill it.",
    keywords: [
      "purchase order generator",
      "po generator",
      "purchase order template",
    ],
  },

  "billing-statement": {
    slug: "billing-statement",
    title: `Billing Statement Generator - Summarize Client Charges | ${SITE.name}`,
    description:
      "Create a billing statement summarizing multiple invoices or charges for a client over a period.",
    h1Title: "Billing Statement Generator",
    heroDescription:
      "Give clients a single summary of all charges and payments over a billing period.",
    keywords: [
      "billing statement generator",
      "billing statement template",
      "account statement generator",
    ],
  },

  "delivery-note-generator": {
    slug: "delivery-note-generator",
    title: `Delivery Note Generator - Confirm Goods Delivered | ${SITE.name}`,
    description:
      "Create delivery notes confirming what was shipped or delivered, separate from your invoice.",
    h1Title: "Delivery Note Generator",
    heroDescription:
      "Document exactly what was delivered, separate from billing, for clean recordkeeping.",
    keywords: [
      "delivery note generator",
      "delivery note template",
      "goods delivered note",
    ],
  },

  "packing-slip-generator": {
    slug: "packing-slip-generator",
    title: `Packing Slip Generator - List Items Shipped | ${SITE.name}`,
    description:
      "Create packing slips listing the items included in a shipment, for orders and fulfillment.",
    h1Title: "Packing Slip Generator",
    heroDescription:
      "Generate a clear packing slip so recipients can check contents against their order.",
    keywords: [
      "packing slip generator",
      "packing slip template",
      "shipment packing list",
    ],
  },

  "sales-receipt-generator": {
    slug: "sales-receipt-generator",
    title: `Sales Receipt Generator - Confirm Point-of-Sale Purchases | ${SITE.name}`,
    description:
      "Create sales receipts for in-person or point-of-sale purchases, with itemized totals.",
    h1Title: "Sales Receipt Generator",
    heroDescription:
      "Generate a quick, itemized receipt for any sale, in person or online.",
    keywords: [
      "sales receipt generator",
      "sales receipt template",
      "pos receipt maker",
    ],
  },

  "invoice-generator-alternative": {
    slug: "invoice-generator-alternative",
    title: `Best Invoice Generator Alternative - Free & Private | ${SITE.name}`,
    description:
      "Looking for an invoice generator alternative without monthly fees or accounts? Create unlimited invoices free, with your data staying private.",
    h1Title: "An Invoice Generator Alternative Worth Trying",
    heroDescription:
      "No subscription, no account, no data sent to a server. A refreshingly simple alternative to bloated invoicing platforms.",
    keywords: [
      "invoice generator alternative",
      "free invoicing alternative",
      "simple invoice alternative",
    ],
  },

  "quickbooks-invoice-alternative": {
    slug: "quickbooks-invoice-alternative",
    title: `QuickBooks Invoice Alternative - Free, No Subscription | ${SITE.name}`,
    description:
      "Need invoicing without the QuickBooks subscription? Create professional invoices free, with no account required.",
    h1Title: "A Lighter Alternative to QuickBooks Invoicing",
    heroDescription:
      "Skip the monthly QuickBooks fee if all you need is clean, professional invoicing.",
    keywords: [
      "quickbooks invoice alternative",
      "quickbooks alternative free",
      "invoice without quickbooks",
    ],
  },

  "wave-invoice-alternative": {
    slug: "wave-invoice-alternative",
    title: `Wave Invoicing Alternative - Simpler & Faster | ${SITE.name}`,
    description:
      "Want Wave-style free invoicing without creating an account? Generate invoices instantly, no sign-up required.",
    h1Title: "A Faster Alternative to Wave Invoicing",
    heroDescription:
      "Get free invoicing without the account setup that comes with Wave.",
    keywords: [
      "wave invoice alternative",
      "wave invoicing alternative",
      "free invoicing like wave",
    ],
  },

  "zoho-invoice-alternative": {
    slug: "zoho-invoice-alternative",
    title: `Zoho Invoice Alternative - No Account Needed | ${SITE.name}`,
    description:
      "Prefer not to set up a Zoho account just to send an invoice? Create one instantly in your browser instead.",
    h1Title: "A No-Account Alternative to Zoho Invoice",
    heroDescription: "Skip the Zoho sign-up flow for simple, one-off invoices.",
    keywords: ["zoho invoice alternative", "zoho invoice free alternative"],
  },

  "invoicely-alternative": {
    slug: "invoicely-alternative",
    title: `Invoicely Alternative - Free and Instant | ${SITE.name}`,
    description:
      "Looking for an Invoicely alternative with no account or upgrade prompts? Create and download invoices free.",
    h1Title: "An Invoicely Alternative Without the Limits",
    heroDescription:
      "Create invoices without hitting a free-plan cap or upgrade prompt.",
    keywords: ["invoicely alternative", "free invoicely alternative"],
  },

  "invoice-ninja-alternative": {
    slug: "invoice-ninja-alternative",
    title: `Invoice Ninja Alternative - Simpler, No Setup | ${SITE.name}`,
    description:
      "Need something simpler than Invoice Ninja for occasional invoices? Skip the setup and create one in your browser.",
    h1Title: "A Simpler Alternative to Invoice Ninja",
    heroDescription:
      "For occasional invoicing, skip the setup that a full platform like Invoice Ninja requires.",
    keywords: ["invoice ninja alternative", "simple invoice ninja alternative"],
  },

  "freshbooks-invoice-alternative": {
    slug: "freshbooks-invoice-alternative",
    title: `FreshBooks Invoice Alternative - Free, No Trial | ${SITE.name}`,
    description:
      "Want FreshBooks-style invoicing without starting a trial? Generate a professional invoice free, right now.",
    h1Title: "A Free Alternative to FreshBooks Invoicing",
    heroDescription:
      "No trial period, no card required. Just a clean invoice generator.",
    keywords: ["freshbooks invoice alternative", "freshbooks free alternative"],
  },

  "canva-invoice-alternative": {
    slug: "canva-invoice-alternative",
    title: `Canva Invoice Alternative - Faster Than Design Tools | ${SITE.name}`,
    description:
      "Skip designing an invoice in Canva. Fill in a form and get a polished, professional invoice PDF instantly.",
    h1Title: "A Faster Alternative to Designing Invoices in Canva",
    heroDescription:
      "No dragging and dropping design elements, just fill in your details and download.",
    keywords: ["canva invoice alternative", "invoice without canva"],
  },

  "bonsai-invoice-alternative": {
    slug: "bonsai-invoice-alternative",
    title: `Bonsai Invoice Alternative - No Subscription Needed | ${SITE.name}`,
    description:
      "Prefer not to pay a Bonsai subscription just to invoice clients? Create invoices free, with no account.",
    h1Title: "A Free Alternative to Bonsai Invoicing",
    heroDescription: "Skip the subscription if invoicing is all you need.",
    keywords: ["bonsai invoice alternative", "bonsai free alternative"],
  },

  "square-invoice-alternative": {
    slug: "square-invoice-alternative",
    title: `Square Invoice Alternative - No Account, No Fees | ${SITE.name}`,
    description:
      "Want to invoice without setting up a Square account or paying processing fees just to send a bill? Try this instead.",
    h1Title: "An Account-Free Alternative to Square Invoices",
    heroDescription:
      "Generate and send an invoice without creating a Square account.",
    keywords: ["square invoice alternative", "square invoicing alternative"],
  },

  "invoice-for-freelancers": {
    slug: "invoice-for-freelancers",
    title: `Invoice Generator for Freelancers - Get Paid Faster | ${SITE.name}`,
    description:
      "Built for freelancers who need to invoice clients quickly, with hourly or project rates and clean branding.",
    h1Title: "Invoice Generator for Freelancers",
    heroDescription:
      "Everything a freelancer needs to bill clients professionally, without the overhead of full accounting software.",
    keywords: [
      "invoice for freelancers",
      "freelancer invoice generator",
      "invoice generator freelance",
    ],
  },

  "invoice-for-contractors": {
    slug: "invoice-for-contractors",
    title: `Invoice Generator for Contractors - Bill by Job or Hour | ${SITE.name}`,
    description:
      "Built for contractors billing by the job, the hour or the material. Add line items and totals in seconds.",
    h1Title: "Invoice Generator for Contractors",
    heroDescription:
      "Bill for labor and materials clearly, whether you charge by the job or by the hour.",
    keywords: ["invoice for contractors", "contractor invoice generator"],
  },

  "invoice-for-startups": {
    slug: "invoice-for-startups",
    title: `Invoice Generator for Startups - Simple, No Setup | ${SITE.name}`,
    description:
      "Built for early-stage startups that need to invoice customers without setting up full billing infrastructure.",
    h1Title: "Invoice Generator for Startups",
    heroDescription:
      "Start invoicing customers from day one, without integrating a full billing system.",
    keywords: ["invoice for startups", "startup invoice generator"],
  },

  "invoice-for-agencies": {
    slug: "invoice-for-agencies",
    title: `Invoice Generator for Agencies - Bill Multiple Clients | ${SITE.name}`,
    description:
      "Built for agencies managing multiple clients and retainers, with clean, branded invoices for each.",
    h1Title: "Invoice Generator for Agencies",
    heroDescription:
      "Keep every client's invoices consistent and on-brand, even when you're billing several at once.",
    keywords: ["invoice for agencies", "agency invoice generator"],
  },

  "invoice-for-ecommerce": {
    slug: "invoice-for-ecommerce",
    title: `Invoice Generator for Ecommerce - Order-Based Invoicing | ${SITE.name}`,
    description:
      "Create invoices for ecommerce orders, with itemized products, quantities, shipping and tax.",
    h1Title: "Invoice Generator for Ecommerce",
    heroDescription:
      "Turn any order into a clean, itemized invoice with shipping and tax included.",
    keywords: [
      "invoice for ecommerce",
      "ecommerce invoice generator",
      "online store invoice",
    ],
  },

  "invoice-for-consultants": {
    slug: "invoice-for-consultants",
    title: `Invoice Generator for Consultants - Bill by Retainer or Hour | ${SITE.name}`,
    description:
      "Built for consultants billing by retainer, project or hourly rate, with clear, professional formatting.",
    h1Title: "Invoice Generator for Consultants",
    heroDescription:
      "Bill retainers, projects or hours clearly, with a format clients trust.",
    keywords: ["invoice for consultants", "consultant invoice generator"],
  },

  "invoice-for-photographers": {
    slug: "invoice-for-photographers",
    title: `Invoice Generator for Photographers - Sessions & Packages | ${SITE.name}`,
    description:
      "Built for photographers billing for sessions, packages, prints and licensing.",
    h1Title: "Invoice Generator for Photographers",
    heroDescription:
      "Bill for sessions, packages or prints with a clean, client-ready invoice.",
    keywords: ["invoice for photographers", "photography invoice generator"],
  },

  "invoice-for-developers": {
    slug: "invoice-for-developers",
    title: `Invoice Generator for Developers - Bill by Sprint or Hour | ${SITE.name}`,
    description:
      "Built for software developers billing by the hour, sprint or fixed project scope.",
    h1Title: "Invoice Generator for Developers",
    heroDescription:
      "Bill clients for development work clearly, whether it's hourly, sprint-based or fixed-scope.",
    keywords: [
      "invoice for developers",
      "developer invoice generator",
      "software developer invoice",
    ],
  },

  "invoice-for-designers": {
    slug: "invoice-for-designers",
    title: `Invoice Generator for Designers - Bill by Project | ${SITE.name}`,
    description:
      "Built for designers billing for projects, revisions and licensing, with a polished, on-brand invoice.",
    h1Title: "Invoice Generator for Designers",
    heroDescription:
      "Bill for design work with a layout that looks as good as your portfolio.",
    keywords: ["invoice for designers", "designer invoice generator"],
  },

  "invoice-for-nonprofits": {
    slug: "invoice-for-nonprofits",
    title: `Invoice Generator for Nonprofits - Donations & Services | ${SITE.name}`,
    description:
      "Create invoices and donation receipts for nonprofit organizations, with clear, professional formatting.",
    h1Title: "Invoice Generator for Nonprofits",
    heroDescription:
      "Document donations or billed services clearly, with a professional, trustworthy layout.",
    keywords: [
      "invoice for nonprofits",
      "nonprofit invoice generator",
      "donation receipt generator",
    ],
  },

  "invoice-for-rental-property": {
    slug: "invoice-for-rental-property",
    title: `Invoice Generator for Rental Property - Rent Receipts | ${SITE.name}`,
    description:
      "Create rent invoices and receipts for landlords and property managers, with tenant and unit details.",
    h1Title: "Invoice Generator for Rental Property",
    heroDescription:
      "Bill tenants clearly with a rent invoice that includes unit, period and amount due.",
    keywords: [
      "invoice for rental property",
      "rent invoice generator",
      "rent receipt generator",
    ],
  },

  "invoice-for-subscription-business": {
    slug: "invoice-for-subscription-business",
    title: `Invoice Generator for Subscription Businesses - Recurring Bills | ${SITE.name}`,
    description:
      "Create recurring invoices for subscription-based businesses, reusing customer and plan details each cycle.",
    h1Title: "Invoice Generator for Subscription Businesses",
    heroDescription:
      "Bill subscribers on a schedule without rebuilding the invoice from scratch every cycle.",
    keywords: [
      "invoice for subscription business",
      "subscription billing invoice",
    ],
  },

  "invoice-for-retail": {
    slug: "invoice-for-retail",
    title: `Invoice Generator for Retail - Itemized Sales Invoices | ${SITE.name}`,
    description:
      "Create itemized sales invoices for retail businesses, with product names, quantities and totals.",
    h1Title: "Invoice Generator for Retail",
    heroDescription:
      "Bill customers with a clear, itemized breakdown of every product sold.",
    keywords: [
      "invoice for retail",
      "retail invoice generator",
      "retail sales invoice",
    ],
  },

  "invoice-for-wholesale": {
    slug: "invoice-for-wholesale",
    title: `Invoice Generator for Wholesale - Bulk Order Invoicing | ${SITE.name}`,
    description:
      "Create invoices for wholesale and bulk orders, with per-unit pricing and quantity discounts.",
    h1Title: "Invoice Generator for Wholesale",
    heroDescription:
      "Bill bulk orders clearly, with per-unit pricing and quantity-based discounts.",
    keywords: [
      "invoice for wholesale",
      "wholesale invoice generator",
      "bulk order invoice",
    ],
  },

  "invoice-for-side-hustle": {
    slug: "invoice-for-side-hustle",
    title: `Invoice Generator for Side Hustles - Simple & Free | ${SITE.name}`,
    description:
      "Built for people running a side hustle who need a professional invoice without setting up a business account.",
    h1Title: "Invoice Generator for Side Hustles",
    heroDescription:
      "Look professional to your first clients, no business account or paperwork required.",
    keywords: ["invoice for side hustle", "side hustle invoice generator"],
  },

  "how-to-make-an-invoice": {
    slug: "how-to-make-an-invoice",
    title: `How to Make an Invoice - Free Step-by-Step Generator | ${SITE.name}`,
    description:
      "Learn how to make an invoice and create one at the same time. Fill in your details and download a professional PDF.",
    h1Title: "How to Make an Invoice",
    heroDescription:
      "Skip the tutorial and just make one. Fill in your details and download a professional invoice PDF right away.",
    keywords: [
      "how to make an invoice",
      "how to create an invoice",
      "make invoice online",
    ],
  },

  "best-invoice-generator": {
    slug: "best-invoice-generator",
    title: `Best Free Invoice Generator - No Sign-Up Required | ${SITE.name}`,
    description:
      "Looking for the best free invoice generator? Create unlimited, professional invoices with no account and no cost.",
    h1Title: "The Best Free Invoice Generator",
    heroDescription:
      "No account, no cost, no limits. Just a clean, professional invoice in seconds.",
    keywords: [
      "best invoice generator",
      "best free invoice generator",
      "best invoice generator online",
    ],
  },

  "simple-invoice-generator": {
    slug: "simple-invoice-generator",
    title: `Simple Invoice Generator - No Learning Curve | ${SITE.name}`,
    description:
      "A simple invoice generator with no clutter. Fill in your details and download a clean PDF invoice in seconds.",
    h1Title: "Simple Invoice Generator",
    heroDescription:
      "Nothing to learn, nothing to configure. Fill in the form and download your invoice.",
    keywords: [
      "simple invoice generator",
      "simple invoice maker",
      "easy invoice tool",
    ],
  },

  "professional-invoice-generator": {
    slug: "professional-invoice-generator",
    title: `Professional Invoice Generator - Client-Ready in Seconds | ${SITE.name}`,
    description:
      "Create a professional invoice with your logo, line items, taxes and signature, ready to send to any client.",
    h1Title: "Professional Invoice Generator",
    heroDescription:
      "Look polished and professional with every invoice, no design work required.",
    keywords: [
      "professional invoice generator",
      "professional invoice template",
      "professional invoice maker",
    ],
  },

  "invoice-generator-no-watermark": {
    slug: "invoice-generator-no-watermark",
    title: `Invoice Generator With No Watermark - Free & Clean | ${SITE.name}`,
    description:
      "Create invoices with no watermark, no branding from us and no upgrade prompts, completely free.",
    h1Title: "Invoice Generator With No Watermark",
    heroDescription:
      "Your invoice, your branding. No watermark, no upsell, no catch.",
    keywords: [
      "invoice generator no watermark",
      "invoice no watermark free",
      "watermark free invoice",
    ],
  },
};

export function getLandingPageConfig(slug: string): LandingPageConfig | null {
  return LANDING_PAGES[slug] || null;
}
