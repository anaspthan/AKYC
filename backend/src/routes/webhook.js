import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * POST /api/webhook/shufti
 * Receive verification results from Shufti Pro
 */
router.post('/shufti', async (req, res) => {
  try {
    const payload = req.body;
    
    console.log('📥 Webhook received:', JSON.stringify(payload, null, 2));

    const {
      reference,
      event, // verification.accepted, verification.declined, etc.
      verification_data,
      declined_reason
    } = payload;

    if (!reference) {
      return res.status(400).json({ error: 'Missing reference' });
    }

    // Map Shufti event to our status
    let status = 'pending';
    if (event === 'verification.accepted') status = 'accepted';
    if (event === 'verification.declined') status = 'declined';

    // Update database
    await pool.query(
      `UPDATE kyc_verifications 
       SET status = $1, 
           result_data = $2, 
           declined_reason = $3,
           completed_at = NOW(),
           updated_at = NOW()
       WHERE reference = $4`,
      [
        status,
        JSON.stringify(verification_data || {}),
        declined_reason || null,
        reference
      ]
    );

    // TODO: Send notification to customer (email/webhook)
    // TODO: Trigger any post-verification workflows

    res.json({ success: true, received: true });

  } catch (error) {
    console.error('❌ Webhook Error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
