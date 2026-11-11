import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import { useStudentDashboard } from '../../hooks/useStudentDashboard';

import DashboardHeader from '../../components/dashboard/DashboardHeader';
import PaperCard from '../../components/dashboard/PaperCard';
import StartDraftCard from '../../components/dashboard/StartDraftCard';
import NotificationsPanel from '../../components/dashboard/NotificationsPanel';
import { DocIcon } from '../../components/dashboard/icons';
import { ROUTES } from '../../components/dashboard/constants';

// Rendered inside <StudentLayout /> (which supplies the sidebar + background).
export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { papers, notifications, loading, error } = useStudentDashboard();
  const [query, setQuery] = useState('');

  const firstName = (user?.name ?? user?.full_name ?? 'Student').split(' ')[0];

  const visiblePapers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? papers.filter((p) => p.title.toLowerCase().includes(q)) : papers;
  }, [papers, query]);

  const goUpload = () => navigate(ROUTES.upload);

  return (
    <div className="space-y-8">
      <DashboardHeader
        firstName={firstName}
        query={query}
        onQueryChange={setQuery}
        onUpload={goUpload}
      />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section aria-labelledby="research-heading">
          <h2 id="research-heading" className="mb-4 flex items-center gap-2 text-sm font-medium text-white/70">
            <DocIcon className="h-4 w-4" /> My Research
          </h2>

          {error && (
            <p role="alert" className="mb-4 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          )}

          {loading ? (
            <div className="grid gap-5 md:grid-cols-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/[0.07]" />
              ))}
            </div>
          ) : (
            <div className="grid items-start gap-5 md:grid-cols-2">
              {visiblePapers.map((paper) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  onOpen={(p) => navigate(ROUTES.paper(p.id))}
                />
              ))}
              {!query && <StartDraftCard onClick={goUpload} />}
              {query && visiblePapers.length === 0 && (
                <p className="col-span-full text-sm text-white/50">No papers match “{query}”.</p>
              )}
            </div>
          )}
        </section>

        <NotificationsPanel
          notifications={notifications}
          onViewAll={() => navigate(ROUTES.history)}
        />
      </div>
    </div>
  );
}
