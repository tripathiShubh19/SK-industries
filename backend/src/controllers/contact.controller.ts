import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../models/db.js';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Phone number is required'),
  subject: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters')
});

import { sendEmailAlert } from '../services/email.service.js';

export const submitContact = async (req: Request, res: Response) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: result.error.errors
    });
  }

  const newContact = db.addContact(result.data);

  // Trigger Email Alert
  sendEmailAlert({
    subject: `💬 [NEW FACTORY INQUIRY] from ${newContact.name} - ${newContact.company}`,
    replyTo: newContact.email,
    html: `
      <h2>New Factory Inquiry / Contact Message</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif; font-size: 13px;">
        <tr><td style="background:#f1f5f9; font-weight:bold;">Contact Person</td><td>${newContact.name}</td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Company</td><td>${newContact.company}</td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Email</td><td><a href="mailto:${newContact.email}">${newContact.email}</a></td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Phone</td><td><a href="tel:${newContact.phone}">${newContact.phone}</a></td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Subject</td><td>${newContact.subject || 'General Inquiry'}</td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Message</td><td>${newContact.message}</td></tr>
      </table>
    `
  }).catch(err => console.error('Failed to trigger contact alert email:', err));

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out to SK Polychem Industries. Our engineering desk has received your message.',
    data: newContact
  });
};

export const getContacts = (req: Request, res: Response) => {
  const messages = db.getContacts();
  res.json({
    success: true,
    count: messages.length,
    data: messages
  });
};
