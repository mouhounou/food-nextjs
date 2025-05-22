import fs from "node:fs"

import sql from "better-sqlite3";
import slugify from "slugify"
import xss from 'xss'

const db = sql("meals.db");

export async function getMeals() {
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const meals = db.prepare("SELECT * FROM meals").all();
		return meals;
	} catch (error) {
		throw new Error("Failed to fetch meals");
	}
}
export  function getMeal(slug) {
   // await new Promise((resolve) => setTimeout(resolve, 5000))
   return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
	try {
		// Validation
		if (!meal || !meal.title || !meal.image) {
			throw new Error("Invalid meal data");
		}

		// Traitement des données
		meal.slug = slugify(meal.title, { lower: true });
		meal.instructions = xss(meal.instructions);

		// Gestion de l'image
		const extension = meal.image.name.split(".").pop();
		const fileName = `${meal.slug}.${extension}`;
		const filePath = `public/images/${fileName}`;

		// Création du dossier si nécessaire
		await fs.promises.mkdir("public/images", { recursive: true });

		// Conversion et sauvegarde de l'image
		const bufferedImage = await meal.image.arrayBuffer();
		await fs.promises.writeFile(filePath, Buffer.from(bufferedImage));

		// Mise à jour du chemin de l'image
		meal.image = `/images/${fileName}`;

		// Insertion en base de données
		db.prepare(
         `
         INSERT INTO meals 
         (title, summary, instr uctions, image, creator, creator_email, slug)
         VALUES (
            @title,
            @summary,
            @instructions,
            @image,
            @creator,
            @creator_email,
            @slug
         )
      `
		).run(meal);
	} catch (error) {
		console.error("Save meal error:", error);
		throw new Error("Failed to save meal. Please try again.");
	}
}