import express from 'express';
import { body, validationResult } from 'express-validator';
import { initiateKYC, checkKYCStatus } from '../services/shuftiService.js';
import pool from '../config/database.js';

const router = express.Router();

/**
 * POST /api/kyc/initiate
 * Start new KYC verification
 */
router.post('/initiate',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('country').isLength({ min: 2, max: 2 }).withMessage('Valid country code required'),
    body('language').optional().isIn(['en', 'ar', 'es', 'hi', 'tl', 'fr', 'sw', 'pt', 'zh']),
    body('verificationType').optional().isIn(['crypto', 'remittance', 'basic'])
  ],
  async (req, res) => {
    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userData = req.body;
      
      // Initiate KYC with Shufti Pro
      const result = await initiateKYC(userData);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error
        });
      }

      // Store in database
      await pool.query(
        `INSERT INTO kyc_verifications 
        (reference, email, country, language, verification_type, status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
        [
          result.reference,
          userData.email,
          userData.country,
          userData.language || 'en',
          userData.verificationType || 'basic',
          'initiated'
        ]
      );

      res.json({
        success: true,
        reference: result.reference,
        verificationUrl: result.verificationUrl
      });

    } catch (error) {
      console.error('KYC Initiation Error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to initiate KYC'
      });
    }
  }
);

/**
 * GET /api/kyc/status/:reference
 * Check verification status
 */
router.get('/status/:reference', async (req, res) => {
  const { reference } = req.params;

  try {
    // Check database first
    const dbResult = await pool.query(
      'SELECT * FROM kyc_verifications WHERE reference = $1',
      [reference]
    );

    if (dbResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Verification not found'
      });
    }

    const verification = dbResult.rows[0];

    // If already completed, return from DB
    if (['accepted', 'declined'].includes(verification.status)) {
      return res.json({
        success: true,
        status: verification.status,
        data: verification
      });
    }

    // Otherwise check Shufti API
    const result = await checkKYCStatus(reference);

    if (result.success) {
      // Update database
      await pool.query(
        'UPDATE kyc_verifications SET status = $1, updated_at = NOW() WHERE reference = $2',
        [result.status, reference]
      );
    }

    res.json(result);

  } catch (error) {
    console.error('Status Check Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check status'
    });
  }
});

export default router;
