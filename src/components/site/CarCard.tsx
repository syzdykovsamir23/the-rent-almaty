"use client";

import Image from "next/image";
import { Calendar, CarFront, Luggage, Users } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { formatPrice } from "@/lib/format";
import { transformFor, type Car } from "@/lib/types";
import { DrivetrainIcon, TransmissionIcon } from "./icons";

export function CarCard({ car }: { car: Car }) {
  const dict = useDict();
  const photo = car.images?.[0];
  // Framing chosen by the owner in the admin panel.
  const frame = transformFor(car, photo);

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <h3 className="font-display text-[0.9rem] leading-tight font-bold tracking-wide text-slate-heading uppercase">
          {car.name}
        </h3>
        <span className="shrink-0 rounded-[3px] bg-gold-500 px-2 py-0.5 text-[0.62rem] font-bold tracking-wider text-ink-900 uppercase">
          {dict.carTypes[car.type]}
        </span>
      </div>

      <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden bg-cream-100">
        {photo ? (
          <div className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]">
            <Image
              src={photo}
              alt={car.name}
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 80vw"
              style={{
                objectPosition: `${frame.x}% ${frame.y}%`,
                transform: frame.zoom === 1 ? undefined : `scale(${frame.zoom})`,
              }}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <CarFront className="size-10 text-cream-200" strokeWidth={1.2} />
          </div>
        )}
      </div>

      {/* Five specs wrap onto two rows at card width; the last two are absent
          on cars added before those fields existed. */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 px-4 py-3 text-[0.7rem] text-slate-body">
        <Spec icon={<Calendar className="size-3.5" strokeWidth={1.6} />} label={String(car.year)} />
        <Spec icon={<TransmissionIcon className="size-3.5" />} label={car.transmission} />
        <Spec
          icon={<Users className="size-3.5" strokeWidth={1.6} />}
          label={`${car.seats} ${dict.card.seats}`}
        />
        {car.drivetrain ? (
          <Spec
            icon={<DrivetrainIcon className="size-3.5" />}
            label={dict.drivetrains[car.drivetrain]}
          />
        ) : null}
        {car.trunk_liters ? (
          <Spec
            icon={<Luggage className="size-3.5" strokeWidth={1.6} />}
            label={`${car.trunk_liters} ${dict.card.trunkUnit}`}
          />
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-cream-200 px-4 py-3">
        <p className="num text-[1.05rem] leading-none font-extrabold text-slate-heading">
          {formatPrice(car.price_per_day)}
          <span className="ms-1 text-[0.68rem] font-medium text-slate-body">
            {dict.card.perDay}
          </span>
        </p>
        <a href="#contact" className="btn btn-dark px-3.5 py-2 text-[0.62rem]">
          {dict.card.book}
        </a>
      </div>
    </article>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex min-w-0 shrink-0 items-center gap-1.5">
      <span className="text-slate-body/70">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
  );
}
