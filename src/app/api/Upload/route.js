import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image'); // Ensure 'image' matches the form key

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      filePath: `/uploads/${file.name}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
