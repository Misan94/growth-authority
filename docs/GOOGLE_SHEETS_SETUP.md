# Google Sheets Integration Setup Guide

This guide will walk you through setting up Google Sheets integration for your Growth Authority waitlist form using the Google Sheets API.

## Overview

When users submit the waitlist form, their information will be automatically sent to a Google Sheet using service account authentication for reliable, secure access.

## Step-by-Step Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Rename it to "Growth Authority Waitlist" (or any name you prefer)
4. **Copy the Sheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - The SHEET_ID is the long string between `/d/` and `/edit`
   - Save this ID - you'll need it later

### Step 2: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. **Enable the Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### Step 3: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in the details:
   - **Name**: `growth-authority-sheets`
   - **Description**: `Service account for Growth Authority waitlist Google Sheets integration`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### Step 4: Generate Service Account Key

1. In the "Credentials" page, find your service account
2. Click on the service account name
3. Go to the "Keys" tab
4. Click "Add Key" → "Create New Key"
5. Choose "JSON" format and click "Create"
6. **Save the downloaded JSON file securely** - you'll need the email and private key

### Step 5: Share Google Sheet with Service Account

1. Open your Google Sheet from Step 1
2. Click the "Share" button
3. Add the service account email (from the JSON file) as an editor:
   - Email format: `something@project-name.iam.gserviceaccount.com`
4. Make sure permission is set to "Editor"
5. Click "Send"

### Step 6: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Google Sheets API Configuration (Direct API)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-name.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC...
...
-----END PRIVATE KEY-----"
GOOGLE_SPREADSHEET_ID=your_sheet_id_from_step_1
GOOGLE_SHEET_NAME=Waitlist Submissions
```

**Important**: 
- Replace the service account email with your actual service account email
- Replace the private key with your actual private key from the JSON file
- Use proper line breaks in the private key (not `\n` characters)
- Replace the spreadsheet ID with your actual sheet ID

### Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to your website: `http://localhost:3000`
3. Fill out and submit the waitlist form
4. Check your Google Sheet - you should see the new submission with headers automatically created!

**For production deployment (Vercel, Netlify, etc.):**
- Add the same environment variables in your hosting platform's settings
- The integration will work automatically once deployed

## Google Sheet Structure

Your sheet will automatically have these columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| First Name | User's first name |
| Last Name | User's last name |
| Work Email | User's work email |
| Phone Number | User's phone number (optional) |
| LinkedIn Profile | User's LinkedIn URL (optional) |
| Source | Always "Growth Authority Waitlist" |
| Status | Always "New Submission" |

## Troubleshooting

### Common Issues

**1. "Missing required Google Sheets API credentials" error**
- Make sure all environment variables are set in your `.env.local` file
- Restart your development server after adding environment variables

**2. "Request is missing required authentication credential" error**
- Verify your service account email and private key are correct
- Check that the Google Sheets API is enabled in your Google Cloud project
- Ensure the private key format has proper line breaks

**3. "The caller does not have permission" error**
- Make sure you've shared the Google Sheet with your service account email
- Verify the service account has "Editor" permissions on the sheet

**4. "Spreadsheet not found" error**
- Double-check your `GOOGLE_SPREADSHEET_ID` matches your actual sheet ID
- Ensure the service account has been given access to the sheet

**5. Data not appearing in sheet**
- Check your server logs for Google Sheets integration status
- Look for success messages: "✅ Google Sheets API initialized successfully"
- Verify the form submission completed without errors

### Testing the Integration

The integration includes automatic testing when you submit forms. Look for these log messages:

- ✅ `Google Sheets API initialized successfully`
- ✅ `Successfully sent data to Google Sheets`

You can also test by submitting the waitlist form with test data:
   ```json
   {
     "firstName": "Test",
     "lastName": "User", 
     "workEmail": "test@example.com",
     "phoneNumber": "",
     "linkedinProfile": ""
   }
   ```

## Security Notes

- Service account authentication is secure and doesn't require user login
- Private keys should be kept secure and never committed to version control
- The integration only has access to the specific sheets you share with the service account
- All communication uses HTTPS and Google's secure API endpoints
- No sensitive data beyond form submissions is stored or transmitted

## Data Management

### Viewing Submissions
- Go to your Google Sheet to see all submissions in real-time
- Data is automatically formatted with timestamps
- Headers are created automatically on first submission
- You can sort, filter, and analyze the data using Google Sheets features

### Exporting Data
- Use Google Sheets' built-in export features (File → Download)
- Available formats: Excel, CSV, PDF, etc.

### Data Backup
- Google Sheets automatically saves and backs up your data
- Consider making periodic copies of the sheet for additional backup
- Service account access can be revoked at any time if needed

## Advanced Configuration

### Customizing Sheet Structure

To modify what data gets saved, update the `sendToGoogleSheets()` method in `lib/google-sheets-api.js`:

```javascript
const rowData = [
  timestamp.toISOString(),
  formData.firstName || '',
  formData.lastName || '',
  // Add more fields here
];
```

### Multiple Sheets

To send data to multiple sheets, you can modify the integration to use different spreadsheet IDs for different purposes.

## Need Help?

If you encounter issues:
1. Check the server logs when submitting forms
2. Look for Google Sheets API success/error messages
3. Verify all credentials and IDs are correct
4. Test by submitting the waitlist form and checking the sheet

Your Growth Authority waitlist now automatically saves all submissions to Google Sheets using the reliable Google Sheets API! 🎉