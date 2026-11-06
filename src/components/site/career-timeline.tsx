import Link from "next/link";
import { practiceAreas } from "@/content/areas";
import type { Curriculum, CurriculumEntry } from "@/content/team";
import { Eyebrow, Heading } from "@/components/ui/heading";

const marks: Record<string, string> = {
  "Direito Civil": "CIV",
  "Direito Criminal": "CRI",
  "Direito Empresarial": "EMP",
};

function entryKey(item: CurriculumEntry) {
  return `${item.period ?? ""}-${item.title}-${item.detail ?? ""}`;
}

function startYear(period: string) {
  const year = period.match(/\d{4}/);
  return year ? Number(year[0]) : 0;
}

function experienceInTime(items: readonly CurriculumEntry[]) {
  const dated = items.filter((item) => item.period);
  const current = items.filter((item) => !item.period);
  return [...dated].sort((a, b) => startYear(a.period ?? "") - startYear(b.period ?? "")).concat(current);
}

function Chapter({ title, items }: { title: string; items: readonly CurriculumEntry[] }) {
  return (
    <div>
      <h3 className="career-chapter">{title}</h3>
      <ol className="career-list">
        {items.map((item) => (
          <li key={entryKey(item)} className="career-step">
            <p className={`career-year${item.period && item.period.length > 4 ? " is-range" : ""}`}>{item.period ?? ""}</p>
            <span className="career-mark" aria-hidden="true" />
            <div className="career-copy">
              <p className="text-[17px] font-medium">{item.title}</p>
              {item.detail ? <p className="mt-1 text-[17px] leading-[1.6] text-ink-soft">{item.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CareerTimeline({ curriculum, slug }: { curriculum: Curriculum; slug: string }) {
  const chapters = [
    { title: "Formação", items: curriculum.education },
    ...(curriculum.complementary?.length
      ? [{ title: "Formação complementar", items: curriculum.complementary }]
      : []),
    { title: "Experiência", items: experienceInTime(curriculum.experience) },
  ];

  return (
    <section className="career-timeline" aria-labelledby={`${slug}-curriculo`}>
      <Eyebrow>Currículo</Eyebrow>
      <Heading level={2} id={`${slug}-curriculo`} className="mt-3">
        Formação e experiência
      </Heading>
      <div className="career-spine">
        <div className="career-rail" aria-hidden="true">
          <span className="career-rail-fill" />
        </div>
        {chapters.map((chapter) => (
          <Chapter key={chapter.title} title={chapter.title} items={chapter.items} />
        ))}
      </div>
      <div className="mt-16">
        <Heading level={3}>Atuação</Heading>
        <ul className="mt-6 flex flex-wrap gap-2">
          {curriculum.focus.map((name) => {
            const area = practiceAreas.find((item) => item.name === name);
            const code = marks[name] ?? name.replace(/^Direito (do |de |das |dos )?/i, "").slice(0, 3).toUpperCase();
            const body = (
              <>
                <span className="focus-flag-mark" aria-hidden="true">
                  {code}
                </span>
                {name}
              </>
            );
            return (
              <li key={name} className="focus-flag-item">
                {area ? (
                  <Link href={`/areas/${area.slug}`} className="focus-flag">
                    {body}
                  </Link>
                ) : (
                  <span className="focus-flag">{body}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
