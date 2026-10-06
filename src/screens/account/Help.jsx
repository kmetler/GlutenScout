import { useState } from 'react'
import { ListRow, ScreenHeader, TextField } from '../../components'
import { HELP_TOPICS } from './helpTopics.jsx'

export default function Help() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const shown = HELP_TOPICS.filter((t) =>
    `${t.title} ${t.summary} ${t.keywords}`.toLowerCase().includes(q),
  )

  return (
    <>
      <ScreenHeader title="Help and FAQ" backTo="/account" />
      <div className="section stack-3">
        <TextField
          label="Search help"
          type="search"
          placeholder="Try “fryer”, “verifier” or “pending”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <nav aria-label="Help topics">
          {shown.map((t) => (
            <ListRow key={t.id} to={`/account/help/${t.id}`} title={t.title} detail={t.summary} />
          ))}
        </nav>
        {!shown.length && (
          <div className="stack-2">
            <p className="t-body">No topics match “{query.trim()}”.</p>
            <p className="t-body ink-secondary">
              Try a word like “fryer”, “verifier” or “pending”.
            </p>
            <button type="button" className="text-btn" onClick={() => setQuery('')}>
              Show all topics
            </button>
          </div>
        )}
      </div>
    </>
  )
}
