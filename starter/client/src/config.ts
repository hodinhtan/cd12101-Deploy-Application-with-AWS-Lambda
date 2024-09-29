const apiId = '0o74vr0513'  // API Gateway ID from AWS
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-v5e1mp3nvosp140c.us.auth0.com',    // Domain from Auth0
  clientId: 'cds48drFqmAWYWSCGLHEPeN6PGp7vfqi',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}