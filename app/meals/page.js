import Link from "next/link";
import classes from "./page.module.css";
import MealItem from "@/component/meals/meal-item";
import MealsGrid from "@/component/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";


async function Meals() {
	const meals = await getMeals();
	return <MealsGrid meals={meals} />;
}

export default function mealsPage() {
	return (
		<>
			<header className={classes.header}>
				<h1>
					Delicious meals, created{" "}
					<span className={classes.highlight}>by you</span>
				</h1>
				<p>
					Choose your favorite recipe and cook it yourself. It's easy
					and fun!
				</p>
				<p className={classes.cta}>
					<Link href={"/meals/share"}>
						Share your favourite recipe
					</Link>
				</p>
			</header>
			<main className={classes.main}>
				<Suspense fallback={<p className={classes.loading}>Loading meals...</p>}>
					<Meals/>
				</Suspense>
			</main>
		</>
	);
}
