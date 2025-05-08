import classes from './page.module.css'

function MealDetails({params}) {
   return (
      <main>
         <h1>{ params.slug}</h1>
      </main>
   )
}

export default MealDetails;