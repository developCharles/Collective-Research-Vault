import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { glass, ROUTES } from '../../components/dashboard/constants'
import { ChevronDownIcon } from '../../components/dashboard/icons'
import Field, { inputCls } from '../../components/upload/Field'
import FileDropzone, { validateFile } from '../../components/upload/FileDropzone'
import { PROGRAMS } from '../../components/upload/programs'
import { getMyGroups, uploadPaper } from '../../services/uploadService'

const YEAR_PATTERN = /^\d{4}$/

export default function UploadForm() {
  const navigate = useNavigate()
  const [groups, setGroups] = useState([])
  const [groupsState, setGroupsState] = useState('loading')
  const [groupId, setGroupId] = useState('')
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [program, setProgram] = useState('')
  const [year, setYear] = useState('')
  const [file, setFile] = useState(null)
  const [showErrors, setShowErrors] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    let cancelled = false
    getMyGroups()
      .then((rows) => {
        if (cancelled) return
        setGroups(rows)
        setGroupId(rows.length === 1 ? String(rows[0].group_id) : '')
        setGroupsState('ready')
      })
      .catch(() => {
        if (!cancelled) setGroupsState('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const programOptions = useMemo(() => {
    const extra = groups.map((g) => g.program).filter((p) => p && !PROGRAMS.includes(p))
    return [...PROGRAMS, ...new Set(extra)]
  }, [groups])

  const yearNumber = Number(year)
  const errors = {
    title: title.trim() ? '' : 'Research title is required.',
    authors: authors.trim() ? '' : 'List at least one author.',
    program: program ? '' : 'Select an academic program.',
    year: YEAR_PATTERN.test(year) && yearNumber >= 2000 && yearNumber <= 2100 ? '' : 'Enter a valid year, e.g. 2024.',
    group: groupId ? '' : 'Select your research group.',
    file: validateFile(file),
  }
  const hasErrors = Object.values(errors).some(Boolean)
  const show = (key) => (showErrors ? errors[key] : '')
  const blocked = groupsState !== 'ready' || groups.length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (hasErrors) {
      setShowErrors(true)
      return
    }
    setSubmitting(true)
    try {
      await uploadPaper({
        title: title.trim(),
        authors: authors.trim(),
        program,
        year,
        groupId,
        file,
      })
      navigate(ROUTES.home)
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Could not submit your draft. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="font-display">
      <h1 className="text-3xl font-bold">Start New Draft</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className={`${glass} mt-6 p-5 sm:p-8 lg:p-12`}
      >
        {groupsState === 'error' && (
          <p role="alert" className="mb-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger-ink">
            Could not load your research groups. Refresh the page to try again.
          </p>
        )}
        {groupsState === 'ready' && groups.length === 0 && (
          <p className="mb-6 rounded-xl border border-warn/40 bg-warn/10 p-4 text-sm text-warn-ink">
            You are not part of a research group yet. Ask your coordinator to add you before submitting a draft.
          </p>
        )}

        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
          <Field label="Research Title" error={show('title')}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={300}
              placeholder="e.g. Impact of AI on Education"
              className={`${inputCls} ${show('title') ? 'border-danger' : 'border-white/15'}`}
            />
          </Field>

          <Field label="Author(s)" error={show('authors')}>
            <input
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              maxLength={300}
              placeholder="John Doe, Tim Allen, Juan Cruz"
              className={`${inputCls} ${show('authors') ? 'border-danger' : 'border-white/15'}`}
            />
          </Field>

          <Field label="Academic Program" error={show('program')}>
            <span className="relative block">
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className={`${inputCls} appearance-none bg-navy-900/60 pr-11 ${program ? 'text-white' : 'text-white/90'} ${show('program') ? 'border-danger' : 'border-white/15'}`}
              >
                <option value="" className="bg-navy-900">
                  Select Program
                </option>
                {programOptions.map((p) => (
                  <option key={p} value={p} className="bg-navy-900">
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/70" />
            </span>
          </Field>

          <Field label="Year" error={show('year')}>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              inputMode="numeric"
              placeholder={String(new Date().getFullYear())}
              className={`${inputCls} ${show('year') ? 'border-danger' : 'border-white/15'}`}
            />
          </Field>

          {groups.length > 1 && (
            <div className="sm:col-span-2">
              <Field label="Research Group" error={show('group')}>
                <span className="relative block">
                  <select
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    className={`${inputCls} appearance-none bg-navy-900/60 pr-11 ${show('group') ? 'border-danger' : 'border-white/15'}`}
                  >
                    <option value="" className="bg-navy-900">
                      Select Group
                    </option>
                    {groups.map((g) => (
                      <option key={g.group_id} value={g.group_id} className="bg-navy-900">
                        {g.group_name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/70" />
                </span>
              </Field>
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-wide text-gold">
            Research File (PDF Preferred)
          </p>
          <div className="mt-4">
            <FileDropzone file={file} error={show('file')} onChange={setFile} />
          </div>
        </div>

        {submitError && (
          <p role="alert" className="mt-6 text-sm text-danger-ink">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || blocked}
          className="mt-10 h-12 w-full rounded-xl bg-linear-to-br/srgb from-gold to-gold-soft text-base font-medium text-ink transition enabled:hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Submit Draft'}
        </button>
      </form>
    </div>
  )
}