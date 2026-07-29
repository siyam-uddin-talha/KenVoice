import { NextResponse } from "next/server";
import { generateInvoicePdfBase64 } from "@/lib/pdfGenerator";
import { getCurrencySymbol } from "@/lib/currency";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      invoice,
      clientName,
      clientEmail,
      profile,
      pdfBase64: clientPdfBase64,
    } = body;

    if (!clientEmail) {
      return NextResponse.json(
        { error: "Client email is required to send invoice." },
        { status: 400 },
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    // For Brevo/transactional email providers, the sender email MUST be a domain authenticated in Brevo.
    // If SENDER_EMAIL is set (e.g. noreply@yourdomain.com), use it as sender and set replyTo to user's profile email.
    const senderEmail = process.env.SENDER_EMAIL || profile?.email || "noreply@sutio.com";
    const senderName = profile?.name || process.env.SENDER_NAME || "KenVoice";
    const replyToEmail = profile?.email;

    const subtotal = (invoice.lineItems || []).reduce(
      (acc: number, item: any) =>
        acc + (item.quantity || 0) * (item.unitPrice || 0),
      0,
    );
    const tax = subtotal * ((invoice.taxRate || 0) / 100);
    const total = Math.max(
      0,
      subtotal + tax - (invoice.discount || 0) + (invoice.shipping || 0),
    );
    const currency = invoice.currency || "USD";
    const currencySymbol = getCurrencySymbol(currency);

    // Use client-rendered DOM PDF (exact match of print/preview) or fallback to server generator
    const pdfBase64 =
      clientPdfBase64 ||
      generateInvoicePdfBase64(invoice, clientName, clientEmail, profile);
    const pdfFileName = `Invoice-${invoice.id}.pdf`;

    // HTML Email Template
    const itemsHtml = (invoice.lineItems || [])
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${item.description}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right;">${currencySymbol}${item.unitPrice.toFixed(2)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right;">${currencySymbol}${(item.quantity * item.unitPrice).toFixed(2)}</td>
        </tr>
      `,
      )
      .join("");

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f6; color: #161917; border-radius: 12px; border: 1px solid #c4cbc5;">
        <div style="margin-bottom: 20px; border-bottom: 2px solid #2b4c33; padding-bottom: 15px;">
          <h2 style="color: #2b4c33; margin: 0; font-size: 24px;">INVOICE ${invoice.id}</h2>
          <p style="color: #626a64; margin: 5px 0 0 0; font-size: 14px;">From: <strong>${senderName}</strong></p>
        </div>

        <p style="font-size: 15px; color: #161917;">Dear <strong>${clientName || "Valued Client"}</strong>,</p>
        <p style="font-size: 14px; color: #626a64; line-height: 1.5;">Please find your invoice <strong>#${invoice.id}</strong> attached as a PDF document (${pdfFileName}).</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #ffffff; border-radius: 8px; overflow: hidden; font-size: 13px;">
          <thead>
            <tr style="background-color: #2b4c33; color: #ffffff;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
              <th style="padding: 10px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="text-align: right; font-size: 14px; margin-top: 15px;">
          <p style="margin: 4px 0; color: #626a64;">Subtotal: <strong>${currencySymbol}${subtotal.toFixed(2)}</strong></p>
          <p style="margin: 4px 0; color: #2b4c33; font-size: 18px; font-weight: bold;">Total Due: ${currencySymbol}${total.toFixed(2)}</p>
        </div>

        ${invoice.notes ? `<div style="margin-top: 25px; padding: 12px; background: #ededdf; border-radius: 6px; font-size: 13px; color: #626a64;"><strong>Notes:</strong> ${invoice.notes}</div>` : ""}

        <div style="margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 15px; text-align: center; font-size: 12px; color: #888888;">
          <p>This email contains your invoice as an attached PDF document.</p>
        </div>
      </div>
    `;

    if (apiKey && apiKey !== "xkeysib-your_brevo_api_key_here") {
      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          ...(replyToEmail ? { replyTo: { name: senderName, email: replyToEmail } } : {}),
          to: [{ email: clientEmail, name: clientName || "Client" }],
          subject: `Invoice #${invoice.id} from ${senderName}`,
          htmlContent,
          attachment: [
            {
              name: pdfFileName,
              content: pdfBase64,
            },
          ],
        }),
      });

      if (!brevoRes.ok) {
        const errorData = await brevoRes.json();
        console.error("Email API Error:", errorData);
        return NextResponse.json(
          { error: errorData.message || "Failed to send email." },
          { status: brevoRes.status },
        );
      }

      const brevoData = await brevoRes.json();
      return NextResponse.json({
        success: true,
        messageId: brevoData.messageId,
      });
    } else {
      console.log(
        `[Outbound Email Simulated] Email to ${clientEmail} for Invoice ${invoice.id} (Attachment: ${pdfFileName})`,
      );
      return NextResponse.json({
        success: true,
        simulated: true,
        message: `Email service placeholder detected. Email with PDF attachment (${pdfFileName}) simulated successfully.`,
      });
    }
  } catch (err: any) {
    console.error("Send invoice route error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error sending email." },
      { status: 500 },
    );
  }
}
