import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SHUFTI_API_URL = process.env.SHUFTI_API_URL || 'https://api.shuftipro.com';
const CLIENT_ID = process.env.SHUFTI_CLIENT_ID;
const SECRET_KEY = process.env.SHUFTI_SECRET_KEY;

/**
 * Initialize KYC verification with Shufti Pro
 * Optimized for low-bandwidth + crypto use case
 */
export async function initiateKYC(userData) {
  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    language = 'en',
    verificationType = 'crypto' // crypto, remittance, basic
  } = userData;

  // Build verification config based on type
  const verificationConfig = getVerificationConfig(verificationType);

  const payload = {
    reference: `KYC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    country,
    language,
    email,
    callback_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/webhook/shufti`,
    redirect_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/result`,
    
    // Low-bandwidth optimization
    verification_mode: 'image_only', // Faster than video for 2G networks
    show_privacy_policy: true,
    show_results: true,
    show_consent: true,
    
    // Services requested
    ...verificationConfig,
    
    // User data
    face: {},
    document: {
      supported_types: ['passport', 'id_card', 'driving_license', 'credit_or_debit_card'],
      name: {
        first_name: firstName,
        last_name: lastName
      }
    }
  };

  try {
    const response = await axios.post(SHUFTI_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString('base64')}`
      },
      timeout: 10000
    });

    return {
      success: true,
      reference: payload.reference,
      verificationUrl: response.data.verification_url,
      data: response.data
    };

  } catch (error) {
    console.error('Shufti API Error:', error.response?.data || error.message);
    
    return {
      success: false,
      error: error.response?.data?.message || 'KYC initiation failed',
      details: error.response?.data
    };
  }
}

/**
 * Get verification configuration based on use case
 */
function getVerificationConfig(type) {
  const configs = {
    crypto: {
      // Crypto exchanges need: ID + liveness + proof of address
      face: { proof: true }, // Liveness detection
      document: { proof: true, additional_proof: false },
      address: { 
        proof: true,
        supported_types: ['utility_bill', 'bank_statement', 'rent_agreement']
      }
    },
    remittance: {
      // Remittance only needs ID verification
      face: { proof: false },
      document: { proof: true }
    },
    basic: {
      // Minimal verification
      face: { proof: false },
      document: { proof: true }
    }
  };

  return configs[type] || configs.basic;
}

/**
 * Check KYC status
 */
export async function checkKYCStatus(reference) {
  try {
    const response = await axios.get(`${SHUFTI_API_URL}/status`, {
      params: { reference },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString('base64')}`
      }
    });

    return {
      success: true,
      status: response.data.event,
      data: response.data
    };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Status check failed'
    };
  }
}

export default {
  initiateKYC,
  checkKYCStatus
};
