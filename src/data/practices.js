// Kitchen practices people report on and ask about. Labels name practices, never verdicts.
// `negative` is the label used when a reviewer saw the practice not happen.
// `why` says in one sentence how skipping the practice lets gluten in (shown on Meal detail).
export const PRACTICES = {
  prep: {
    label: 'Separate prep area',
    negative: 'Shared prep area',
    question: 'Do you prepare gluten-free orders in a separate area?',
    why: 'Crumbs and flour on a shared board or counter can end up in a gluten-free order.',
  },
  gloves: {
    label: 'Gloves changed',
    negative: 'Gloves not changed',
    question: 'Do cooks change gloves before making a gluten-free order?',
    why: 'Gloves that just handled a regular bun or breading carry gluten to the next thing they touch.',
  },
  fryer: {
    label: 'Dedicated fryer',
    negative: 'Shared fryer',
    question: 'Is the fryer used only for gluten-free food?',
    why: 'Breaded food leaves gluten in the oil, and it ends up on anything fried after it.',
  },
  utensils: {
    label: 'Clean utensils',
    negative: 'Utensils not changed',
    question: 'Do you use clean pans and utensils for gluten-free orders?',
    why: "Tongs, pans and spatulas used on regular orders carry gluten over unless they're swapped for clean ones.",
  },
  wok: {
    label: 'Separate wok',
    negative: 'Shared wok',
    question: 'Is a separate, cleaned wok used for gluten-free orders?',
    why: "Sauces and noodles from earlier orders stay in a wok unless it's a separate one or has been cleaned.",
  },
  sauce: {
    label: 'Tamari on request',
    negative: 'Regular soy sauce used',
    question: 'Can the dish be made with gluten-free tamari instead of soy sauce?',
    why: 'Regular soy sauce is made with wheat. Tamari is the version made without it.',
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
