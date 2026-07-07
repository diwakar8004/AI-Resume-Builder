# Authentication Debugging & Verification Guide

## Overview
The authentication system has been enhanced with comprehensive error handling, loading states, and session verification. This guide explains the authentication flow and how to debug issues.

## Features Implemented

### 1. Login Page (`app/(auth)/login/page.tsx`)
- ✅ Loading state with spinner during sign-in
- ✅ Detailed error messages for all OAuth error types
- ✅ Toast notifications for errors via Sonner
- ✅ Disabled button state while signing in
- ✅ Visual error box with styled messaging

### 2. Register Page (`app/(auth)/register/page.tsx`)
- ✅ Same loading and error handling as login
- ✅ "Creating account..." text during signup
- ✅ Comprehensive error mapping for all scenarios

### 3. Auth Configuration (`lib/auth.ts`)
- ✅ Enhanced logging for sign-in events
- ✅ Session creation logging with user details
- ✅ JWT token logging for debugging
- ✅ `allowDangerousEmailAccountLinking: true` to handle account linking
- ✅ Better error handling in callbacks

### 4. Session Debug Endpoint (`app/api/auth/session/route.ts`)
- ✅ GET endpoint to verify current session
- ✅ Returns authenticated user details
- ✅ Error handling with detailed messages
- ✅ Useful for debugging token/session issues

## Error Handling Map

The following NextAuth error codes are mapped to user-friendly messages:

| Error Code | Message |
|-----------|---------|
| `OAuthSignin` | Failed to sign in. Please try again. |
| `OAuthCallback` | Invalid callback. Please try again. |
| `OAuthCreateAccount` | Could not create account. Please try again. |
| `OAuthAccountNotLinked` | Email already exists with a different provider. |
| `Callback` | Authentication callback failed. |
| `CredentialsSignin` | Invalid credentials. |
| `AccessDenied` | Access denied. |
| `Verification` | Verification failed. |

## How to Test & Debug

### 1. Test Successful Login
```bash
# Start the dev server
npm run dev

# Navigate to http://localhost:3000/login
# Click "Continue with Google"
# Sign in with a test Google account
# You should be redirected to /dashboard
# Console should show:
# [SignIn Callback] User attempting sign in: { email: '...', provider: 'google' }
# [JWT Callback] User signed in: { id: '...', email: '...' }
# [Session Callback] Session created: { userId: '...', email: '...' }
```

### 2. Test Session Verification
```bash
# After logging in, check current session
curl http://localhost:3000/api/auth/session

# Response (authenticated):
{
  "authenticated": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "image": "avatar_url"
  },
  "expiresAt": "2026-07-21T..."
}

# Response (not authenticated):
{
  "authenticated": false,
  "message": "No active session"
}
```

### 3. Simulate OAuth Errors
Use the following URL patterns to simulate different errors:

```
http://localhost:3000/login?error=OAuthSignin
http://localhost:3000/login?error=OAuthCallback
http://localhost:3000/login?error=OAuthCreateAccount
http://localhost:3000/login?error=OAuthAccountNotLinked
```

### 4. Check Browser Console
- All sign-in events are logged
- Toast messages show at top-right for errors
- Loading spinners appear during authentication

### 5. Check Server Console
- `[env check]` - Environment variable warnings
- `[SignIn Callback]` - User sign-in attempts
- `[JWT Callback]` - Token generation
- `[Session Callback]` - Session creation

## Environment Variables Required

Ensure these are set in `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Production Considerations

1. **Debug Mode**: Disabled in production (`debug: process.env.NODE_ENV !== 'production'`)
2. **Session Strategy**: Using JWT for scalability
3. **Error Redirects**: Errors redirect to `/login` page
4. **Callback URLs**: Must match Google OAuth settings exactly
5. **Secret**: Use a strong, random `NEXTAUTH_SECRET`

## Common Issues & Solutions

### Issue: "Email already exists with a different provider"
- **Cause**: User signed up with Google but tried to use different OAuth provider
- **Solution**: Use the same provider or account linking features
- **Fix Applied**: `allowDangerousEmailAccountLinking: true` in auth config

### Issue: Stuck on login page after clicking sign-in
- **Cause**: Could be network error or missing env variables
- **Debug**: Check browser console for errors, verify env vars are set
- **Check**: Visit `/api/auth/session` to verify session status

### Issue: Session not persisting
- **Cause**: JWT strategy may have expired or missing session callback
- **Debug**: Check server logs for session creation messages
- **Fix**: Verify `NEXTAUTH_SECRET` is consistent across deployments

### Issue: Toast notifications not showing
- **Cause**: Sonner provider might not be set up in app layout
- **Check**: Verify `app/layout.tsx` includes `<Toaster />`
- **Fix**: Already configured in the auth provider setup

## Testing Checklist

- [ ] Test successful Google login (redirects to `/dashboard`)
- [ ] Test successful Google signup (creates account + redirects)
- [ ] Test manual error URL (`?error=OAuthSignin`)
- [ ] Test session endpoint (`/api/auth/session`)
- [ ] Test logout and re-login flow
- [ ] Verify console logs appear during sign-in
- [ ] Verify toast messages for errors
- [ ] Check loading spinner appears during sign-in
- [ ] Test on mobile/tablet responsiveness
- [ ] Test in production environment

## Next Steps

1. **Deploy to Vercel/Production**: Verify env variables are set correctly
2. **Monitor Authentication**: Check logs for authentication failures
3. **Add Success Toasts**: Optional - add success message on dashboard redirect
4. **Implement Rate Limiting**: Prevent brute force attempts
5. **Add Social Account Linking**: Allow users to link multiple providers

## Files Modified

- `app/(auth)/login/page.tsx` - Enhanced with error handling & loading states
- `app/(auth)/register/page.tsx` - Enhanced with error handling & loading states
- `lib/auth.ts` - Added logging callbacks and email account linking
- `app/api/auth/session/route.ts` - New debug endpoint

## Architecture Flow

```
User clicks "Continue with Google"
    ↓
handleGoogleSignIn() sets isLoading=true
    ↓
signIn('google') triggers OAuth redirect
    ↓
Google OAuth authorization
    ↓
Callback to /api/auth/callback/google
    ↓
NextAuth processes callback
    ↓
[SignIn Callback] logs event
    ↓
[JWT Callback] creates token with user data
    ↓
[Session Callback] creates session
    ↓
Redirect to /dashboard (on success) or /login?error=X (on failure)
    ↓
If error parameter, display user-friendly error message + toast
```

## References

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Google OAuth Setup](https://next-auth.js.org/providers/google)
- [Error Handling in NextAuth](https://next-auth.js.org/errors)
- [Sonner Toast Library](https://sonner.emilkowal.ski)
