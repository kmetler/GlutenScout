import { MealCard, Notice, ScreenHeader } from '../../components'
import { meals } from '../../data/sample.js'

// Entry to the call-ahead script from the Contribute hub: the script is always about one meal.
export default function CallPick() {
  return (
    <>
      <ScreenHeader title="Call ahead" backTo="/contribute" />
      <div className="section stack-4">
        <h2 className="t-section-header">Which meal are you calling about?</h2>
        <Notice icon="phone">
          We'll build a short script of questions, starting with whatever reports disagree on or
          nobody has confirmed yet.
        </Notice>
        <div>
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} to={`/contribute/call/${meal.id}`} />
          ))}
        </div>
      </div>
    </>
  )
}
