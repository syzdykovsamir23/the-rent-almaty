"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { DEFAULT_TRANSFORM, type ImageTransform } from "@/lib/types";

type Props = {
  images: string[];
  settings: Record<string, ImageTransform>;
  onChangeImages: (next: string[]) => void;
  onChangeSettings: (next: Record<string, ImageTransform>) => void;
};

/**
 * Framing editor. The preview box is the exact aspect ratio and CSS the public
 * card uses, so what the owner drags into place is what visitors see — no
 * separate "crop" concept to reconcile.
 */
export function PhotoFramer({ images, settings, onChangeImages, onChangeSettings }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const current = active && images.includes(active) ? active : (images[0] ?? null);
  const frame = current ? (settings[current] ?? DEFAULT_TRANSFORM) : DEFAULT_TRANSFORM;

  const boxRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);

  const setFrame = useCallback(
    (patch: Partial<ImageTransform>) => {
      if (!current) return;
      const next = { ...frame, ...patch };
      onChangeSettings({ ...settings, [current]: next });
    },
    [current, frame, settings, onChangeSettings],
  );

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, startX: frame.x, startY: frame.y };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const box = boxRef.current;
    if (!d || !box) return;
    const rect = box.getBoundingClientRect();
    // Dragging right reveals more of the left side, so x decreases.
    const x = clamp(d.startX - ((e.clientX - d.x) / rect.width) * 100);
    const y = clamp(d.startY - ((e.clientY - d.y) / rect.height) * 100);
    setFrame({ x: Math.round(x), y: Math.round(y) });
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  function removeImage(url: string) {
    onChangeImages(images.filter((u) => u !== url));
    const next = { ...settings };
    delete next[url];
    onChangeSettings(next);
    if (active === url) setActive(null);
  }

  function makeMain(url: string) {
    onChangeImages([url, ...images.filter((u) => u !== url)]);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,300px)_1fr]">
      {/* Live preview — identical framing to the public card */}
      <div>
        <p className="text-xs font-semibold text-[#6B7684]">Card preview</p>

        <div
          ref={boxRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`relative mt-2 aspect-[16/10] w-full touch-none overflow-hidden rounded border border-[#E1E4E8] bg-[#F4F5F7] ${
            current ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          {current ? (
            <Image
              src={current}
              alt=""
              fill
              sizes="300px"
              draggable={false}
              style={{
                objectPosition: `${frame.x}% ${frame.y}%`,
                transform: frame.zoom === 1 ? undefined : `scale(${frame.zoom})`,
              }}
              className="object-cover select-none"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-[#6B7684]">
              Add a photo to frame it
            </div>
          )}
        </div>

        {current ? (
          <>
            <p className="mt-2 text-xs text-[#6B7684]">Drag the image to reposition it.</p>

            <label className="mt-3 block text-xs font-semibold text-[#6B7684]">
              Zoom
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={frame.zoom}
                onChange={(e) => setFrame({ zoom: Number(e.target.value) })}
                className="mt-1.5 w-full accent-[#1F2933]"
              />
            </label>

            <div className="mt-1 flex items-center justify-between text-xs text-[#6B7684]">
              <span className="tabular-nums">
                x {frame.x}% · y {frame.y}% · {frame.zoom.toFixed(2)}×
              </span>
              <button
                type="button"
                onClick={() => setFrame(DEFAULT_TRANSFORM)}
                className="cursor-pointer font-medium text-[#1F2933] underline-offset-2 hover:underline"
              >
                Reset
              </button>
            </div>
          </>
        ) : null}
      </div>

      {/* Thumbnails */}
      <div>
        <p className="text-xs font-semibold text-[#6B7684]">
          Photos <span className="font-normal">— the first one is used on the card</span>
        </p>

        <div className="mt-2 flex flex-wrap gap-3">
          {images.map((url, i) => {
            const t = settings[url] ?? DEFAULT_TRANSFORM;
            const selected = url === current;
            return (
              <div key={url} className="w-28">
                <button
                  type="button"
                  onClick={() => setActive(url)}
                  className={`relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded border-2 transition-colors ${
                    selected ? "border-[#1F2933]" : "border-transparent hover:border-[#C9CED6]"
                  }`}
                >
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="112px"
                    style={{
                      objectPosition: `${t.x}% ${t.y}%`,
                      transform: t.zoom === 1 ? undefined : `scale(${t.zoom})`,
                    }}
                    className="object-cover"
                  />
                  {i === 0 ? (
                    <span className="absolute start-1 top-1 rounded bg-[#1F2933]/85 px-1.5 py-0.5 text-[0.6rem] font-semibold text-white">
                      Card
                    </span>
                  ) : null}
                </button>

                <div className="mt-1 flex justify-between text-[0.65rem]">
                  {i === 0 ? (
                    <span className="text-[#9AA3AE]">main</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => makeMain(url)}
                      className="cursor-pointer font-medium text-[#1F2933] hover:underline"
                    >
                      make main
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="cursor-pointer font-medium text-[#B4232C] hover:underline"
                  >
                    remove
                  </button>
                </div>

                <input type="hidden" name="images" value={url} />
              </div>
            );
          })}
        </div>

        <input type="hidden" name="image_settings" value={JSON.stringify(settings)} />
      </div>
    </div>
  );
}

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value));
}
