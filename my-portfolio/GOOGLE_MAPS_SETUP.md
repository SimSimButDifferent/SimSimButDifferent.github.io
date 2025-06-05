# Google Maps Setup Guide

## Getting Your API Key

1. Visit the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API (optional, for address conversion)
   - Places API (optional, for enhanced features)
4. Go to Credentials and create an API key
5. Restrict the API key to your domains for security

## Setting Up the Environment Variable

Create a `.env.local` file in the root of your project (next to package.json):

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Important Notes:**

- The variable name must start with `NEXT_PUBLIC_` to be accessible in the browser
- Keep your API key secure and never commit it to version control
- Add `.env.local` to your `.gitignore` file
- For production, set this environment variable in your hosting platform

## Troubleshooting

### Map not loading:

1. Check browser console for errors
2. Verify API key is correct
3. Ensure APIs are enabled in Google Cloud Console
4. Check billing is set up (Google requires billing even for free tier)

### "For development purposes only" watermark:

- This appears when API restrictions are not properly configured
- Set up proper domain restrictions in Google Cloud Console

### Map appears gray or blank:

- Usually indicates API key issues or billing problems
- Check the browser console for specific error messages
