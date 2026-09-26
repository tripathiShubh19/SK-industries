import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../models/db.js';
import { RfqStatus } from '../models/types.js';

const rfqSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid business email address'),
  phone: z.string().min(7, 'Please provide a valid contact number'),
  productCategory: z.string().min(2, 'Please select a product category'),
  requiredQty: z.string().min(3, 'Please describe your required quantity and technical specs'),
  deliveryLocation: z.string().optional(),
  notes: z.string().optional()
});

const statusUpdateSchema = z.object({
  status: z.enum(['received', 'engineering_review', 'quote_prepared', 'approved', 'rejected', 'dispatched']),
  engineerRemarks: z.string().optional(),
  quotedAmount: z.string().optional()
});

import { sendEmailAlert } from '../services/email.service.js';

export const submitRfq = async (req: Request, res: Response) => {
  const result = rfqSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: result.error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
    });
  }

  const createdRfq = db.addRfq(result.data);

  // Trigger Email Alert to Factory Sales Desk asynchronously (fire & forget)
  sendEmailAlert({
    subject: `🔔 [NEW B2B RFQ] ${createdRfq.id} - ${createdRfq.company} (${createdRfq.productCategory})`,
    replyTo: createdRfq.email,
    html: `
      <h2>New Technical Quotation Request</h2>
      <p>A new industrial quotation request was submitted on the website.</p>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif; font-size: 13px;">
        <tr><td style="background:#f1f5f9; font-weight:bold;">RFQ Reference ID</td><td><strong>${createdRfq.id}</strong></td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Company Name</td><td>${createdRfq.company}</td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Contact Person</td><td>${createdRfq.name}</td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Email Address</td><td><a href="mailto:${createdRfq.email}">${createdRfq.email}</a></td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Phone / WhatsApp</td><td><a href="tel:${createdRfq.phone}">${createdRfq.phone}</a></td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Product Category</td><td>${createdRfq.productCategory}</td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Required Specs & Qty</td><td>${createdRfq.requiredQty}</td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Delivery Destination</td><td>${createdRfq.deliveryLocation || 'Not specified'}</td></tr>
        <tr><td style="background:#f1f5f9; font-weight:bold;">Timestamp</td><td>${createdRfq.createdAt}</td></tr>
      </table>
      <p style="margin-top: 15px; color: #475569; font-size: 12px;">You can reply directly to this email to contact the client, or click their phone number to message on WhatsApp.</p>
    `
  }).catch(err => console.error('Failed to trigger RFQ alert email:', err));

  res.status(201).json({
    success: true,
    message: 'Your Request for Quotation (RFQ) has been registered successfully.',
    data: createdRfq
  });
};

export const getAllRfqs = (req: Request, res: Response) => {
  const { status, search } = req.query;
  let rfqs = db.getRfqs();

  if (status && typeof status === 'string') {
    rfqs = rfqs.filter(r => r.status === status);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    rfqs = rfqs.filter(r => 
      r.id.toLowerCase().includes(q) ||
      r.company.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.productCategory.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: rfqs.length,
    data: rfqs
  });
};

export const getRfqById = (req: Request, res: Response) => {
  const { id } = req.params;
  const rfq = db.getRfqById(id);

  if (!rfq) {
    return res.status(404).json({
      success: false,
      message: `Quotation tracking record '${id}' was not found. Please verify your RFQ reference ID.`
    });
  }

  res.json({
    success: true,
    data: rfq
  });
};

export const updateRfqStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const result = statusUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status update parameters',
      errors: result.error.errors
    });
  }

  const updated = db.updateRfqStatus(
    id,
    result.data.status as RfqStatus,
    result.data.engineerRemarks,
    result.data.quotedAmount
  );

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: `Quotation tracking record '${id}' not found`
    });
  }

  res.json({
    success: true,
    message: `RFQ ${id} status successfully updated to ${result.data.status}`,
    data: updated
  });
};
