# EmailJS Setup Guide

## Overview
The contact form on this website uses EmailJS to send emails. This guide will help you set up EmailJS properly.

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your Public Key
1. Log into your EmailJS dashboard: [https://dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
2. Go to "Account" → "API Keys"
3. Copy your "Public Key"

## Step 3: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note your "Service ID" (you'll need this later)

## Step 4: Create Email Template
1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with these variables:
   - `{{to_email}}` - Recipient email
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{phone}}` - Sender's phone
   - `{{subject}}` - Subject line
   - `{{message}}` - Message content
   - `{{preferredContact}}` - Preferred contact method
   - `{{bestTime}}` - Best time to contact
   - `{{referral}}` - How they heard about you
   - `{{referralName}}` - Referral name (if applicable)
   - `{{time}}` - Submission timestamp
4. Save the template and note your "Template ID"

## Step 5: Configure Environment Variables
1. Create a `.env` file in the root directory of your project
2. Add your EmailJS public key:
   ```
   REACT_APP_EMAILJS_PUBLIC_KEY=1qn99Xqes0n2pMqC0
   ```
   
**✅ COMPLETED**: Your public key is already configured in the contact form code.

## Step 6: Update Contact Form Configuration
1. Open `app/routes/contact.tsx`
2. Find these lines (around line 50-52):
   ```typescript
   const response = await emailjs.send(
     "service_nxmoxvo",  // Your EmailJS Service ID
     "template_hdu8n2e", // Your EmailJS Template ID
   ```
3. Replace the values with your actual IDs:
   - Replace `"service_nxmoxvo"` with your Service ID
   - Replace `"template_hdu8n2e"` with your Template ID

**⚠️ TODO**: You still need to update the Service ID and Template ID with your actual EmailJS service and template IDs.

## Step 7: Test the Contact Form
1. Run your development server: `npm run dev`
2. Go to the contact page
3. Fill out and submit the form
4. Check your email to confirm it was sent

## Troubleshooting

### Error: "EmailJS is not properly configured"
- Make sure you've created the `.env` file
- Verify your public key is correct
- Restart your development server after adding the `.env` file

### Error: "Cannot read properties of undefined (reading 'send')"
- This error should now be fixed with the updated code
- Make sure you've installed the EmailJS package: `npm install @emailjs/browser`

### Emails not being sent
- Check your EmailJS dashboard for any error messages
- Verify your email service is properly connected
- Check your email template variables match the code

## Security Notes
- The public key is safe to expose in client-side code
- Never share your private keys
- EmailJS has rate limiting on free accounts

## Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://community.emailjs.com/](https://community.emailjs.com/)
