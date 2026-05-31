/**
 * SectionLabel — one deliberate, named section-marker system.
 *
 * Replaces the generic tiny-uppercase-tracked eyebrow that was repeated above
 * every section. A short terracotta rule + a normal-case label reads as an
 * intentional index, not AI scaffolding.
 */
export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-terra" aria-hidden="true" />
      <span className="text-sm font-semibold text-terra">{children}</span>
    </div>
  )
}
