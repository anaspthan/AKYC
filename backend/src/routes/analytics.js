import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * GET /api/analytics/dashboard
 * Real-time stats for admin dashboard
 */
router.get('/dashboard', async (req, res) => {
  try {
    // Total verifications
    const totalResult = await pool.query(
      'SELECT COUNT(*) as total FROM kyc_verifications'
    );

    // Success rate
    const successResult = await pool.query(
      `SELECT 
        COUNT(*) FILTER (WHERE status = 'accepted') as accepted,
        COUNT(*) FILTER (WHERE status = 'declined') as declined,
        COUNT(*) FILTER (WHERE status = 'pending') as pending
       FROM kyc_verifications`
    );

    // By country (top 10)
    const countryResult = await pool.query(
      `SELECT country, COUNT(*) as count 
       FROM kyc_verifications 
       GROUP BY country 
       ORDER BY count DESC 
       LIMIT 10`
    );

    // By language
    const languageResult = await pool.query(
      `SELECT language, COUNT(*) as count 
       FROM kyc_verifications 
       GROUP BY language 
       ORDER BY count DESC`
    );

    // Recent verifications (last 24h)
    const recentResult = await pool.query(
      `SELECT COUNT(*) as recent 
       FROM kyc_verifications 
       WHERE created_at > NOW() - INTERVAL '24 hours'`
    );

    // Average completion time
    const avgTimeResult = await pool.query(
      `SELECT AVG(EXTRACT(EPOCH FROM (completed_at - created_at))) as avg_seconds
       FROM kyc_verifications 
       WHERE completed_at IS NOT NULL`
    );

    const stats = successResult.rows[0];
    const total = parseInt(totalResult.rows[0].total);
    const successRate = total > 0 
      ? ((parseInt(stats.accepted) / total) * 100).toFixed(1) 
      : 0;

    res.json({
      success: true,
      data: {
        total,
        accepted: parseInt(stats.accepted),
        declined: parseInt(stats.declined),
        pending: parseInt(stats.pending),
        successRate: parseFloat(successRate),
        last24h: parseInt(recentResult.rows[0].recent),
        avgCompletionTime: parseFloat(avgTimeResult.rows[0].avg_seconds || 0).toFixed(0),
        byCountry: countryResult.rows,
        byLanguage: languageResult.rows
      }
    });

  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

/**
 * GET /api/analytics/verifications
 * List recent verifications with pagination
 */
router.get('/verifications', async (req, res) => {
  const { page = 1, limit = 50, status } = req.query;
  const offset = (page - 1) * limit;

  try {
    let query = 'SELECT * FROM kyc_verifications';
    let params = [];

    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: result.rowCount
      }
    });

  } catch (error) {
    console.error('Verifications List Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch verifications'
    });
  }
});

export default router;
