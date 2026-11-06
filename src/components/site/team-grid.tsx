import Image from "next/image";
import Link from "next/link";
import { initialsOf, team, type TeamMember } from "@/content/team";

function Portrait({ member }: { member: TeamMember }) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="team-portrait object-cover object-top"
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

export function TeamGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {team.map((member) => (
        <li key={member.slug} className="team-card h-full">
          <Link href={`/equipe/${member.slug}`} className="group flex h-full flex-col">
            <div className="team-frame image-frame relative aspect-[4/5] bg-ink">
              <Portrait member={member} />
            </div>
            <p className="team-name mt-4 font-display text-xl leading-tight font-medium tracking-tight">{member.name}</p>
            <p className="mt-1 text-sm text-ink-soft">{member.role}</p>
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
      ))}
    </ul>
  );
}
