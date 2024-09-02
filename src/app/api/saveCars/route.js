import { query } from "../../../utils/dbConnect";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(req) {
  const { brand, model, year, km, used, images } = await req.json();

  try {
    // Create the uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    await query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cars') THEN
          CREATE TABLE cars (
            id SERIAL PRIMARY KEY,
            brand VARCHAR(255),
            model VARCHAR(255),
            year INT,
            km INT,
            used BOOLEAN,
            images TEXT[]
         );
        ELSE
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'images') THEN
            ALTER TABLE cars ADD COLUMN images TEXT[];
         END IF;
       END IF;
      END
      $$;
    `);

    const imagePaths = [];

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const base64Data = images[i].replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const imageName = `${Date.now()}-${i}.png`;
        const imagePath = join(uploadsDir, imageName);

        await writeFile(imagePath, buffer);
        imagePaths.push(`/uploads/${imageName}`);
      }
    }

    const result = await query(
      `INSERT INTO cars (brand, model, year, km, used, images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [brand, model, year, km, used, imagePaths]
    );

    return new Response(
      JSON.stringify({
        message: "Car added successfully",
        data: result.rows[0],
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving car data:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to save car data",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
