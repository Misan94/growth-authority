import GoogleSheetsAPI from '../../lib/google-sheets-api';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.workEmail || !formData.firstName || !formData.lastName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: workEmail, firstName, and lastName are required' 
      });
    }

    console.log('Processing waitlist submission for:', formData.workEmail);

    // Initialize Google Sheets API
    const googleSheetsAPI = new GoogleSheetsAPI();

    // Send data to Google Sheets
    const sheetsResult = await googleSheetsAPI.sendToGoogleSheets(formData);

    // Return response based on Google Sheets result
    return res.status(200).json({
      success: true,
      message: sheetsResult.success 
        ? 'Thank you! Your application has been submitted successfully and you\'ve been added to our waitlist.' 
        : 'Thank you! Your application has been received and is being processed.',
      googleSheetsIntegration: {
        success: sheetsResult.success,
        details: sheetsResult.success ? 'Data successfully saved to Google Sheets' : sheetsResult.error
      }
    });

  } catch (error) {
    console.error('Waitlist submission error:', error);
    
    // Log the error but still return success to user
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your application has been submitted and is being reviewed.',
      googleSheetsIntegration: {
        success: false,
        error: 'Google Sheets integration temporarily unavailable',
        details: error.message
      }
    });
  }
}
