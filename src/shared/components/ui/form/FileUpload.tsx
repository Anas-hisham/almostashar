"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshIcon, TrashIcon, UploadCloudIcon } from "@/shared/components/ui/icons";

type FileUploadProps = {
  id: string;
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  optional?: boolean;
  error?: string;
};

const BOX = "h-32 w-full rounded-xl border-2";

/** Image picker: empty drop box first, then a preview with delete / change buttons. */
export default function FileUpload({
  id,
  label,
  file,
  onChange,
  required,
  optional,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) onChange(selected);
    e.target.value = ""; // lets the user pick the same file again after deleting it
  }

  const borderColor = error ? "border-danger-border" : "border-line";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-black">
        {label}
        {optional && <span className="text-xs text-black/60"> (اختياري)</span>}
        {required && <span className="text-danger"> *</span>}
      </label>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/png, image/jpeg"
        className="sr-only"
        onChange={handleSelect}
      />

      {previewUrl ? (
        <div className={`relative overflow-hidden ${BOX} ${borderColor}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt={label} className="size-full object-cover" />

          <div className="absolute bottom-3 left-3 flex gap-2">
            <button
              type="button"
              onClick={() => onChange(null)}
              className="flex h-8 items-center gap-1.5 rounded-lg bg-danger px-3 text-xs font-medium text-white"
            >
              <TrashIcon className="size-4" />
              حذف
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex h-8 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-medium text-brand"
            >
              <RefreshIcon className="size-4" />
              تغيير
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 bg-surface text-center text-upload-text ${BOX} ${borderColor}`}
        >
          <UploadCloudIcon className="size-7 text-gold" />
          <span className="text-sm font-semibold">اضغط لاختيار صورة من جهازك</span>
          <span className="flex gap-2 text-xs font-medium">
            <span>حتي 5 ميجا</span>
            <span dir="ltr">PNG / JPG</span>
          </span>
        </label>
      )}

      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </div>
  );
}
