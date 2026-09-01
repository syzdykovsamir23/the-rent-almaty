"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createCar, updateCar, type ActionState } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import { CAR_TYPES, TRANSMISSIONS } from "@/lib/site";
import type { Car, ImageTransform } from "@/lib/types";
import { PhotoFramer } from "./PhotoFramer";

const BUCKET = "car-photos";

/** Raster formats only: an uploaded SVG is an active document, not a picture. */
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_BYTES = 8 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export function CarForm({ car }: { car?: Car }) {
  const action = car ? updateCar : createCar;
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});

  const [images, setImages] = useState<string[]>(car?.images ?? []);
  const [imageSettings, setImageSettings] = useState<Record<string, ImageTransform>>(
    car?.image_settings ?? {},
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const supabase = createClient();
    if (!supabase) {
      setUploadError("Supabase is not configured.");
      return;
    }

    setUploading(true);
    setUploadError(null);

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError(`${file.name}: only JPEG, PNG, WebP and AVIF images are accepted.`);
        break;
      }
      if (file.size > MAX_BYTES) {
        setUploadError(`${file.name}: larger than 8 MB.`);
        break;
      }

      // The extension comes from the sniffed type, never from the file name.
      const path = `${crypto.randomUUID()}.${EXT_BY_TYPE[file.type]}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "31536000",
        contentType: file.type,
        upsert: false,
      });
      if (error) {
        setUploadError(error.message);
        break;
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setImages((prev) => [...prev, data.publicUrl]);
    }

    setUploading(false);
  }

  return (
    <form action={formAction} className="max-w-3xl">
      {car ? <input type="hidden" name="id" value={car.id} /> : null}

      <div className="rounded-lg border border-[#E1E4E8] bg-white p-6">
        <Field label="Name">
          <input
            name="name"
            required
            defaultValue={car?.name}
            placeholder="Toyota Camry"
            className={inputCls}
          />
        </Field>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Body type">
            <select name="type" defaultValue={car?.type ?? "Sedan"} className={inputCls}>
              {CAR_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Transmission">
            <select
              name="transmission"
              defaultValue={car?.transmission ?? "Automatic"}
              className={inputCls}
            >
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Year">
            <input
              name="year"
              type="number"
              required
              min={1990}
              max={2100}
              defaultValue={car?.year ?? new Date().getFullYear()}
              className={inputCls}
            />
          </Field>
          <Field label="Seats">
            <input
              name="seats"
              type="number"
              required
              min={1}
              max={20}
              defaultValue={car?.seats ?? 5}
              className={inputCls}
            />
          </Field>
          <Field label="Price per day, ₸">
            <input
              name="price_per_day"
              type="number"
              required
              min={0}
              step={500}
              defaultValue={car?.price_per_day ?? 20000}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Short description" className="mt-4">
          <textarea
            name="description"
            rows={3}
            defaultValue={car?.description ?? ""}
            placeholder="One or two sentences shown on the car page."
            className={`${inputCls} resize-y`}
          />
        </Field>

        <div className="mt-6 border-t border-[#EEF0F2] pt-5">
          <PhotoFramer
            images={images}
            settings={imageSettings}
            onChangeImages={setImages}
            onChangeSettings={setImageSettings}
          />

          <div className="mt-4 flex items-center gap-3">
            <label className="cursor-pointer rounded-md border border-dashed border-[#C9CED6] px-4 py-2 text-xs font-medium text-[#6B7684] transition-colors hover:border-[#1F2933] hover:text-[#1F2933]">
              {uploading ? "Uploading…" : "+ Add photos"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                onChange={onFiles}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {uploadError ? (
              <p className="text-xs text-[#B4232C]">{uploadError}</p>
            ) : (
              <p className="text-xs text-[#6B7684]">JPEG, PNG, WebP or AVIF, up to 8 MB each.</p>
            )}
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            name="available"
            defaultChecked={car?.available ?? true}
            className="size-4 cursor-pointer accent-[#1F2933]"
          />
          Available — show this car on the public site
        </label>

        {state.error ? (
          <p className="mt-5 rounded-md bg-[#FDECEC] px-3 py-2 text-xs text-[#B4232C]">
            {state.error}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending || uploading}
          className="cursor-pointer rounded-md bg-[#1F2933] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#323F4B] disabled:opacity-60"
        >
          {pending ? "Saving…" : car ? "Save changes" : "Add car"}
        </button>
        <Link
          href="/admin"
          className="rounded-md border border-[#E1E4E8] bg-white px-4 py-2.5 text-sm font-medium text-[#6B7684] transition-colors hover:text-[#1F2933]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

const inputCls =
  "mt-1.5 w-full rounded-md border border-[#E1E4E8] px-3 py-2 text-sm text-[#1F2933] outline-none focus:border-[#1F2933]";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block text-xs font-semibold text-[#6B7684] ${className}`}>
      {label}
      {children}
    </label>
  );
}
