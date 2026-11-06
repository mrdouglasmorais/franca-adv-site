import Image from "next/image";
import Link from "next/link";
import { initialsOf, team, type TeamMember } from "@/content/team";

function Portrait({ member, priority = false }: { member: TeamMember; priority?: boolean }) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 768px) 18rem, 100vw"
        className="object-cover object-top"
      />
    );
  }

  return (
    <div className="grid h-full place-items-center bg-ink text-gold-soft">
      <span className="font-display text-5xl font-medium tracking-tight" aria-hidden="true">
        {initialsOf(member.name)}
      </span>
    </div>
  );
}

function ProfileCue() {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium">
      Ver perfil
      <span className="team-card-arrow" aria-hidden="true">
        →
      </span>
    </span>
  );
}

function LawyerCard({ member }: { member: TeamMember }) {
  return (
    <li>
      <Link href={`/equipe/${member.slug}`} className="group block">
        <div className="image-frame relative aspect-[4/5] bg-mist">
          <Portrait member={member} />
        </div>
        <p className="mt-4 font-display text-2xl leading-tight font-medium tracking-tight">{member.name}</p>
        <p className="mt-1 text-sm text-ink-soft">
          {member.role}
          {member.oab ? ` · ${member.oab}` : ""}
        </p>
        <p className="mt-3">
          <ProfileCue />
        </p>
      </Link>
    </li>
  );
}

export function TeamGrid() {
  const [lead, ...rest] = team;
  const lawyers = rest.filter((member) => member.oab);
  const support = rest.filter((member) => !member.oab);

  return (
    <div>
      <Link href={`/equipe/${lead.slug}`} className="group grid items-end gap-6 md:grid-cols-[18rem_1fr] md:gap-10">
        <div className="image-frame relative aspect-[4/5] bg-ink">
          <Portrait member={lead} priority />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-seal uppercase">Quem conduz</p>
          <p className="mt-3 font-display text-[clamp(2rem,3vw,3rem)] leading-tight font-medium tracking-tight">
            {lead.name}
          </p>
          <p className="mt-2 text-sm tracking-[0.08em] text-ink-soft uppercase">
            {lead.role}
            {lead.oab ? ` · ${lead.oab}` : ""}
          </p>
          <p className="mt-4 max-w-[46ch] text-ink-soft">{lead.summary}</p>
          <p className="mt-6">
            <ProfileCue />
          </p>
        </div>
      </Link>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2">
        {lawyers.map((member) => (
          <LawyerCard key={member.slug} member={member} />
        ))}
      </ul>

      <div className="mt-12">
        <p className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">Também no escritório</p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {support.map((member) => (
            <li key={member.slug}>
              <Link
                href={`/equipe/${member.slug}`}
                className="group flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <span>
                  <span className="font-medium">{member.name}</span>
                  <span className="text-ink-soft"> — {member.role}</span>
                </span>
                <ProfileCue />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
