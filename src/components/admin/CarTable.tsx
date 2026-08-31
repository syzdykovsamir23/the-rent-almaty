import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Car } from "@/lib/types";
import { DeleteCarButton } from "./DeleteCarButton";

export function CarTable({ cars, searching }: { cars: Car[]; searching: boolean }) {
  if (cars.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#D5D9DF] bg-white px-6 py-14 text-center">
        <p className="text-sm font-semibold">
          {searching ? "No cars match that search" : "No cars yet"}
        </p>
        <p className="mt-1.5 text-sm text-[#6B7684]">
          {searching
            ? "Try a different name."
            : "Add the first car — it appears on the public site right away."}
        </p>
        {!searching ? (
          <Link
            href="/admin/cars/new"
            className="mt-5 inline-block rounded-md bg-[#1F2933] px-4 py-2 text-sm font-semibold text-white"
          >
            Add car
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#E1E4E8] bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-[#E1E4E8] bg-[#FAFBFC] text-left text-xs text-[#6B7684]">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Car</th>
            <th className="px-4 py-2.5 font-semibold">Type</th>
            <th className="px-4 py-2.5 font-semibold">Year</th>
            <th className="px-4 py-2.5 font-semibold">Specs</th>
            <th className="px-4 py-2.5 font-semibold">Price / day</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5" />
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEF0F2]">
          {cars.map((car) => (
            <tr key={car.id} className="align-middle">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-11 shrink-0 overflow-hidden rounded bg-[#F4F5F7]">
                    {car.images?.[0] ? (
                      <Image src={car.images[0]} alt="" fill sizes="44px" className="object-cover" />
                    ) : null}
                  </div>
                  <span className="font-medium">{car.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[#6B7684]">{car.type}</td>
              <td className="px-4 py-3 tabular-nums text-[#6B7684]">{car.year}</td>
              <td className="px-4 py-3 text-[#6B7684]">
                {car.transmission} · {car.seats} seats
              </td>
              <td className="px-4 py-3 font-medium tabular-nums">{formatPrice(car.price_per_day)}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    car.available ? "bg-[#E3F6EC] text-[#1B7F4B]" : "bg-[#F0F1F3] text-[#6B7684]"
                  }`}
                >
                  {car.available ? "Available" : "Hidden"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-4">
                  <Link
                    href={`/admin/cars/${car.id}`}
                    className="text-xs font-medium text-[#1F2933] underline-offset-2 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteCarButton id={car.id} name={car.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
