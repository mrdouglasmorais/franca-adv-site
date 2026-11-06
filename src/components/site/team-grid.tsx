import Link from "next/link";
import { initialsOf, team, type TeamMember } from "@/content/team";
import { PortraitSlides } from "@/components/site/portrait-slides";

function Portrait({ member, sizes }: { member: TeamMember; sizes: string }) {
  if (member.photos?.length) {
    return (
      <PortraitSlides
        photos={member.photos}
        name={member.name}
        labelled={false}
        sizes={sizes}
      />
    );
  }

  return (
    <div className="grid h-full place-items-center bg-ink text-gold-soft">
      <span className="team-portrait font-display text-5xl font-medium tracking-tight" aria-hidden="true">
        {initialsOf(member.name)}
      </span>
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <li className="team-card h-full">
      <Link href={`/equipe/${member.slug}`} className="group flex h-full flex-col">
        <div className="team-frame image-frame relative aspect-[4/5] bg-ink">
          <Portrait member={member} sizes="(min-width: 1024px) 33vw, 50vw" />
        </div>
        <p className="team-name mt-4 font-display text-xl leading-tight font-medium tracking-tight">{member.name}</p>
        <p className="mt-1 text-sm text-ink-soft">{member.role}</p>
        {member.curriculum?.focus.length ? (
          <p className="mt-3 text-sm leading-5">{member.curriculum.focus.join(" · ")}</p>
        ) : null}
        <p
          className="mt-1 min-h-4 text-xs tracking-[0.08em] text-ink-soft uppercase"
          aria-hidden={member.oab ? undefined : true}
        >
          {member.oab ?? "\u00a0"}
        </p>
        <p className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium">
          Ver perfil
          <span className="team-card-arrow" aria-hidden="true">
            →
          </span>
        </p>
      </Link>
    </li>
  );
}

export function TeamGrid() {
  const [lead, ...rest] = team;

  return (
    <div className="space-y-12">
      {lead ? (
        <Link
          href={`/equipe/${lead.slug}`}
          className="team-lead group grid items-end gap-6 md:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] md:gap-10"
        >
          <div className="team-frame image-frame relative aspect-[4/5] bg-ink">
            <Portrait member={lead} sizes="(min-width: 768px) 22rem, 100vw" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-seal uppercase">{lead.role}</p>
            <p className="team-name mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.03em]">
              {lead.name}
            </p>
            {lead.oab ? (
              <p className="mt-3 text-xs tracking-[0.08em] text-ink-soft uppercase">{lead.oab}</p>
            ) : null}
            <p className="mt-4 max-w-[42ch] text-ink-soft">{lead.summary}</p>
            {lead.curriculum?.focus.length ? (
              <p className="mt-4 text-sm">{lead.curriculum.focus.join(" · ")}</p>
            ) : null}
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              Ver perfil
              <span className="team-card-arrow" aria-hidden="true">
                →
              </span>
            </p>
          </div>
        </Link>
      ) : null}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 lg:gap-x-6">
        {rest.map((member) => (
          <MemberCard key={member.slug} member={member} />
        ))}
      </ul>
    </div>
  );
}
