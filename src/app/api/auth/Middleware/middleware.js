// utils/authMiddleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

// Define the structure of your token payload using Zod
const TokenSchema = z.object({
  userId: z.string().uuid(),
  // Add other fields your token should have
  role: z.string(),
  exp: z.number(), // for expiry if needed
});

export const authMiddleware = async (request) => {
  const authorizationHeader = request.headers.get('authorization');
  const token = authorizationHeader?.split(' ')[1]; // Assuming "Bearer <payload>"

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    // Parse the token payload with Zod (assuming the token is JSON encoded)
    const decodedPayload = JSON.parse(atob(token.split('.')[1])); // Replace this with actual token decoding logic if necessary
    TokenSchema.parse(decodedPayload); // Zod will throw if validation fails
    
    return { decoded: decodedPayload, error: null };
  } catch (error) {
    // Catch Zod validation errors or other parsing issues
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
};
