import { Navigate, useParams } from 'react-router-dom'
import { ListRow, ScreenHeader } from '../../components'
import { findTopic } from './helpTopics.jsx'

export default function HelpTopic() {
  const { topicId } = useParams()
  const topic = findTopic(topicId)
  if (!topic) return <Navigate to="/account/help" replace />
  const related = topic.related.map(findTopic).filter(Boolean)

  return (
    <>
      <ScreenHeader title="Help" backTo="/account/help" />
      <div className="section stack-3">
        <h2 className="t-section-header">{topic.title}</h2>
        <div className="t-body stack-3">{topic.body}</div>
      </div>
      {related.length > 0 && (
        <>
          <div className="band" />
          <div className="section">
            <h2 className="t-card-header">Related</h2>
            {related.map((t) => (
              <ListRow key={t.id} to={`/account/help/${t.id}`} title={t.title} detail={t.summary} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
