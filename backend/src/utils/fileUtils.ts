import fs from 'fs';
import path from 'path';

export const ensureUploadsDirectory = () => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

export const cleanupFile = (filename: string) => {
  const filePath = path.join(process.cwd(), 'uploads', filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}; 