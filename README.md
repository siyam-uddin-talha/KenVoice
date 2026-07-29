# KenVoice - Invoice Generator

KenVoice is a modern, fast, and feature-rich invoice generator web application built with Next.js, React, and TypeScript. Create professional invoices, manage clients and saved items, generate PDFs on the fly, and send invoices directly to clients via email.

---

## ✨ Features

- **📄 Professional Invoice Creation**: Create, customize, and manage invoices with real-time preview, multiple currency support, tax/discount calculations, shipping fees, signatures, and custom notes.
- **✉️ Transactional Email Delivery**: Send invoices directly to clients as PDF attachments powered by **Brevo (Sendinblue)**. Supports `replyTo` configuration so client replies go straight to your email.
- **📥 PDF Export & Printing**: High-fidelity PDF generation matching the invoice preview, ready for instant download or printing.
- **👥 Client Management**: Store and reuse client details (name, email, address, tax ID) for faster invoicing.
- **🏷️ Product & Service Catalog**: Save frequently used items with preset rates and descriptions.
- **⚙️ Business Profile Settings**: Customize company details, logo, address, payment terms, and default sender preferences.
- **💾 Local-first Database**: Powered by **Dexie.js (IndexedDB)** for offline-first speed and privacy, with optional API integration.
- **📱 Responsive & Beautiful UI**: Built with Tailwind CSS, Lucide Icons, and smooth animations using Motion.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI & Styling**: React 19, Tailwind CSS v4, Motion
- **Database**: Dexie.js (IndexedDB)
- **Email Service**: Brevo (Sendinblue) API v3
- **Analytics**: Vercel Analytics

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- `pnpm` or `npm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd invoice-generator
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory:

   ```env
   # Gemini AI Key (Optional)
   GEMINI_API_KEY=your_gemini_api_key

   # Brevo Email Configuration (Required for sending emails in production)
   BREVO_API_KEY=your_brevo_api_key
   SENDER_EMAIL=noreply@yourdomain.com # Must be an authenticated domain/sender in Brevo
   SENDER_NAME=KenVoice
   ```

4. **Run the Development Server:**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📧 Email Sending Configuration (Brevo)

KenVoice sends invoice emails with PDF attachments via the Brevo API.

- **Sender Email (`SENDER_EMAIL`)**: Transactional email providers require the `FROM` address to belong to a domain authenticated in your Brevo dashboard (e.g. `noreply@yourdomain.com`).
- **Reply-To (`replyTo`)**: When sending an invoice, your business profile email (e.g. `user@gmail.com`) is set as the `replyTo` address. Client replies will automatically be routed directly to your personal email.

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the development server |
| `pnpm build` | Builds the application for production |
| `pnpm start` | Starts the production server |
| `pnpm lint` | Runs ESLint checks |

---

## 📄 License

MIT License.
