# Google Maps Setup Guide - AdvancedMarker Migration ✅

**Updated for 2024:** This project now uses the modern `@vis.gl/react-google-maps` library with AdvancedMarkerElement to eliminate deprecation warnings.

## 🔄 Migration Complete

✅ **Fixed deprecation warning:** "google.maps.Marker is deprecated"  
✅ **Updated to:** `@vis.gl/react-google-maps` with AdvancedMarkerElement  
✅ **Future-proof:** Using Google's recommended approach

## Getting Your API Key

1. Visit the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API** (required)
   - Geocoding API (optional, for address conversion)
   - Places API (optional, for enhanced features)
4. Go to Credentials and create an API key
5. Restrict the API key to your domains for security

### Important for AdvancedMarkers:

AdvancedMarkerElement requires a **Map ID**. For development, the code uses a default `DEMO_MAP_ID`. For production:

1. Go to **Map Management** in Google Cloud Console
2. Create a new Map ID
3. Update the `mapId` in your Map component

## Setting Up the Environment Variable

### For Local Development

Create a `.env.local` file in the root of your project (next to package.json):

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### For Production Deployment

#### Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` with your API key value
4. Set it for Production, Preview, and Development environments

#### Netlify:

1. Go to Site Settings → Environment Variables
2. Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` with your API key value

#### Other Platforms:

Set the environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in your hosting platform's environment configuration.

**Important Notes:**

- The variable name must start with `NEXT_PUBLIC_` to be accessible in the browser
- Keep your API key secure and never commit it to version control
- Add `.env.local` to your `.gitignore` file (already done)
- For production, set this environment variable in your hosting platform

## API Key Security

For production deployments, consider these security measures:

1. **Domain Restrictions**: Restrict your API key to specific domains in Google Cloud Console
2. **API Restrictions**: Limit the key to only the APIs you need (Maps JavaScript API, etc.)
3. **Usage Monitoring**: Set up usage alerts in Google Cloud Console
4. **Separate Keys**: Use different API keys for development and production

## Technical Details

### What Changed:

- **Old:** `@react-google-maps/api` with deprecated `Marker`
- **New:** `@vis.gl/react-google-maps` with `AdvancedMarker` + `Pin`

### Benefits:

- ✅ No deprecation warnings
- ✅ Better performance and rendering
- ✅ Enhanced customization options
- ✅ Google's official recommendation
- ✅ Future-proof implementation

### Dependencies:

```json
{
  "@vis.gl/react-google-maps": "^1.5.3"
}
```

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

### AdvancedMarker not showing:

- Ensure you have a valid Map ID (or use DEMO_MAP_ID for testing)
- Check that the position coordinates are valid
- Verify the map is properly loaded before adding markers

### In Production:

- Verify environment variables are set correctly in your hosting platform
- Check that the domain is added to your API key restrictions
- Ensure billing is active for your Google Cloud project
- Create a production Map ID instead of using DEMO_MAP_ID
