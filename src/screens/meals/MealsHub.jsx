import { ListRow, MealCard, ScreenHeader } from '../../components'
import { meals } from '../../data/sample.js'

// Tab root: pick a meal to see its evidence. Finding new meals is Discover's job.
export default function MealsHub() {
  return (
    <>
      <ScreenHeader title="Meals" back={false} />

      <div className="section stack-2">
        <h2 className="t-section-header">How was it checked?</h2>
        <p className="t-body ink-secondary">
          Pick a meal to see what the kitchen does, who saw it, and when it was last verified.
        </p>
      </div>

      <div className="band" />

      <div className="section">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} to={`/meals/${meal.id}`} />
        ))}
        <ListRow
          to="/discover"
          icon="search"
          title="Find more meals"
          detail="Search and filter in Discover"
        />
      </div>
    </>
  )
}
