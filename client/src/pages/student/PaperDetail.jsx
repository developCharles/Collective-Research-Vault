import { Link, useParams } from 'react-router-dom'
import { usePaperDetail } from '../../hooks/usePaperDetail'
import { forumPlaceholderPosts } from '../../services/forumPlaceholder'
import { ROUTES } from '../../components/dashboard/constants'
import { DocIcon } from '../../components/dashboard/icons'
import PaperSummaryCard from '../../components/paper/PaperSummaryCard'
import FeedbackNotes from '../../components/paper/FeedbackNotes'
import ForumSection from '../../components/paper/ForumSection'
import AuthorsCard from '../../components/paper/AuthorsCard'
import VersionHistory from '../../components/paper/VersionHistory'
import SectionHeading from '../../components/paper/SectionHeading'

function PaperDetailContent({ paperId }) {
  const { paper, notes, loading, error, dismissNote, toggleResolved } = usePaperDetail(paperId)

  if (loading) {
    return (
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)] xl:gap-8">
        <div className="space-y-6">
          <div className="h-44 animate-pulse rounded-2xl bg-white/[0.07]" />
          <div className="h-40 animate-pulse rounded-2xl bg-white/[0.07]" />
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-white/[0.07]" />
      </div>
    )
  }

  if (error || !paper) {
    return (
      <div role="alert" className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6">
        <p className="text-sm text-rose-200">{error || 'Paper not found.'}</p>
        <Link
          to={ROUTES.home}
          className="mt-4 inline-block rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-ink hover:bg-gold-light"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)]">
      <div className="min-w-0 space-y-8">
        <section aria-labelledby="research-heading">
          <div id="research-heading">
            <SectionHeading icon={DocIcon} title="My Research" />
          </div>
          <PaperSummaryCard paper={paper} />
        </section>

        <FeedbackNotes notes={notes} onDismiss={dismissNote} onResolve={toggleResolved} />

        <ForumSection posts={forumPlaceholderPosts} />
      </div>

      <aside className="min-w-0 space-y-8">
        <AuthorsCard authors={paper.authors} />
        <VersionHistory versions={paper.versions} currentStatus={paper.status} />
      </aside>
    </div>
  )
}

export default function PaperDetail() {
  const { paperId } = useParams()
  return <PaperDetailContent key={paperId} paperId={paperId} />
}