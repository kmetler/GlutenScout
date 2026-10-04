// Kitchen practices people report on and ask about. Labels name practices, never verdicts.
// `negative` is the label used when a reviewer saw the practice not happen.
export const PRACTICES = {
  prep: {
    label: 'Separate prep area',
    negative: 'Shared prep area',
    question: 'Do you prepare gluten-free orders in a separate area?',
  },
  gloves: {
    label: 'Gloves changed',
    negative: 'Gloves not changed',
    question: 'Do cooks change gloves before making a gluten-free order?',
  },
  fryer: {
    label: 'Dedicated fryer',
    negative: 'Shared fryer',
    question: 'Is the fryer used only for gluten-free food?',
  },
  utensils: {
    label: 'Clean utensils',
    negative: 'Utensils not changed',
    question: 'Do you use clean pans and utensils for gluten-free orders?',
  },
  wok: {
    label: 'Separate wok',
    negative: 'Shared wok',
    question: 'Is a separate, cleaned wok used for gluten-free orders?',
  },
  sauce: {
    label: 'Tamari on request',
    negative: 'Regular soy sauce used',
    question: 'Can the dish be made with gluten-free tamari instead of soy sauce?',
  },
}

// Asked about on every report and every call, plus any practice specific to the meal.
export const CORE_PRACTICES = ['prep', 'gloves', 'fryer', 'utensils']

export function practicesForMeal(meal) {
  const extra = meal.precautions.map((p) => p.key).filter((key) => !CORE_PRACTICES.includes(key))
  return [...CORE_PRACTICES, ...extra]
}

// Answers on a visit report.
export const SEEN_ANSWERS = [
  { value: 'saw', label: 'I saw it' },
  { value: 'told', label: 'Staff told me' },
  { value: 'no', label: "Didn't happen" },
  { value: 'unsure', label: 'Not sure' },
]

// Answers on a call-ahead question.
export const CALL_ANSWERS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Not sure' },
]

export const REVIEWER_TYPES = ['Celiac', 'Strict GF', 'Gluten-sensitive']

// Turns answers into the claim badges shown on a report.
// Visit: saw → confirmed · staff told me → unverified · didn't happen → warning · not sure → left out.
// Phone call: the restaurant's word alone is unverified until diners confirm it.
export function claimsFromAnswers(answers, source = 'visit') {
  const claims = []
  for (const [key, answer] of Object.entries(answers)) {
    const practice = PRACTICES[key]
    if (!practice) continue
    if (source === 'visit') {
      if (answer === 'saw') claims.push({ label: practice.label, state: 'confirmed' })
      if (answer === 'told') claims.push({ label: `${practice.label} (staff said)`, state: 'unverified' })
      if (answer === 'no') claims.push({ label: practice.negative, state: 'conflict' })
    } else {
      if (answer === 'yes') claims.push({ label: `${practice.label} (restaurant said)`, state: 'unverified' })
      if (answer === 'no') claims.push({ label: practice.negative, state: 'conflict' })
    }
  }
  return claims
}

export function answerLabel(answers, value) {
  return answers.find((a) => a.value === value)?.label ?? 'Not answered'
}
