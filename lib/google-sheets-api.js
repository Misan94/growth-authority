/**
 * Google Sheets API Integration - Direct API Access
 * Handles sending waitlist form data directly to Google Sheets using service account authentication
 */

import { google } from 'googleapis';

class GoogleSheetsAPI {
  constructor() {
    // Service account configuration from environment variables
    this.serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    this.privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    this.spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    this.sheetName = process.env.GOOGLE_SHEET_NAME || 'Waitlist Submissions';
    
    // Initialize the Google Sheets API client
    this.auth = null;
    this.sheets = null;
  }

  /**
   * Initialize Google Sheets API authentication
   */
  async initializeAuth() {
    try {
      if (!this.serviceAccountEmail || !this.privateKey || !this.spreadsheetId) {
        throw new Error('Missing required Google Sheets API credentials. Please check your environment variables.');
      }

      // Handle private key format
      let privateKey = this.privateKey;
      if (privateKey) {
        // Remove quotes if present
        privateKey = privateKey.replace(/^"|"$/g, '');
        // Replace escaped newlines with actual newlines
        privateKey = privateKey.replace(/\\n/g, '\n');
      }

      // Create JWT auth client using object parameters (working approach)
      this.auth = new google.auth.JWT({
        email: this.serviceAccountEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      // Initialize Sheets API
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      
      console.log('✅ Google Sheets API initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Google Sheets API:', error.message);
      throw error;
    }
  }

  /**
   * Ensure headers exist in the sheet
   */
  async ensureHeaders() {
    try {
      const headers = [
        'Timestamp',
        'First Name',
        'Last Name', 
        'Work Email',
        'Phone Number',
        'LinkedIn Profile',
        'Source',
        'Status'
      ];

      // Check if headers already exist
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A1:H1`,
      });

      // If no data or headers missing, add headers
      if (!response.data.values || response.data.values.length === 0) {
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `${this.sheetName}!A1:H1`,
          valueInputOption: 'RAW',
          resource: {
            values: [headers]
          }
        });

        // Format headers
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          resource: {
            requests: [{
              repeatCell: {
                range: {
                  sheetId: 0, // Assuming first sheet
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: headers.length
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.26, green: 0.52, blue: 0.96 },
                    textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }
                  }
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)'
              }
            }]
          }
        });

        console.log('✅ Headers added to Google Sheet');
      }
    } catch (error) {
      console.error('❌ Error ensuring headers:', error.message);
      // Continue anyway - headers might already exist
    }
  }

  /**
   * Send form data to Google Sheets
   * @param {Object} formData - The form data from the waitlist
   * @returns {Object} - Result of the operation
   */
  async sendToGoogleSheets(formData) {
    try {
      // Initialize authentication if not already done
      if (!this.auth || !this.sheets) {
        await this.initializeAuth();
      }

      // Ensure headers exist
      await this.ensureHeaders();

      // Prepare the data row
      const timestamp = new Date();
      const rowData = [
        timestamp.toISOString(),
        formData.firstName || '',
        formData.lastName || '',
        formData.workEmail || '',
        formData.phoneNumber || '',
        formData.linkedinProfile || '',
        'Growth Authority Waitlist',
        'New Submission'
      ];

      console.log('Sending data to Google Sheets:', formData.workEmail);

      // Append data to sheet
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A:H`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [rowData]
        }
      });

      if (response.status === 200) {
        console.log('✅ Successfully sent data to Google Sheets');
        return {
          success: true,
          message: 'Data successfully added to Google Sheets',
          sheetData: {
            timestamp: timestamp.toISOString(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            workEmail: formData.workEmail,
            phoneNumber: formData.phoneNumber,
            linkedinProfile: formData.linkedinProfile
          },
          range: response.data.updates.updatedRange
        };
      } else {
        throw new Error(`Google Sheets API returned status: ${response.status}`);
      }

    } catch (error) {
      console.error('❌ Google Sheets API Error:', error.message);
      return {
        success: false,
        error: `Failed to send data to Google Sheets: ${error.message}`
      };
    }
  }

  /**
   * Test the Google Sheets connection
   * @returns {Object} - Connection test result
   */
  async testConnection() {
    try {
      // Initialize authentication
      await this.initializeAuth();

      // Try to read sheet info
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });

      return {
        success: true,
        message: 'Connection successful',
        details: {
          sheetTitle: response.data.properties.title,
          sheetId: this.spreadsheetId,
          serviceAccount: this.serviceAccountEmail
        }
      };

    } catch (error) {
      return {
        success: false,
        error: `Connection failed: ${error.message}`,
        details: {
          spreadsheetId: this.spreadsheetId,
          serviceAccount: this.serviceAccountEmail
        }
      };
    }
  }
}

export default GoogleSheetsAPI;