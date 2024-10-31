import { getEnvVariable } from "./helpers"
import { SignJWT, jwtVerify } from "jose"

export const signJWT = async (payload, options) => {
  try {
    const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET_KEY"))
    const alg = "HS256"
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret)
  } catch (error) {
    throw error
  }
}



export async function verifyJWT(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // Encode the secret to Uint8Array
  
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }

  try {
    // Await the asynchronous jwtVerify call
    const { payload } = await jwtVerify(token, secret);
    console.log('Decoded Token Payload:', payload); // For debugging, outputs the token's payload
    return payload;
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return null;
  }
}