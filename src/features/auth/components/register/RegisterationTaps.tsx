"use client";

import { ScaleIcon, UserIcon } from "@/shared/components/ui/icons";

export type AccountType = "client" | "lawyer";

type RegisterationTapsProps = {
  active: AccountType;
  onChange: (type: AccountType) => void;
};

const tabs = [
  { key: "client", label: "عميل", Icon: UserIcon },
  { key: "lawyer", label: "محامي", Icon: ScaleIcon },
] as const;

export default function RegisterationTaps({ active, onChange }: RegisterationTapsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {tabs.map(({ key, label, Icon }) => {
        const isActive = active === key;

        return (
          <button
            key={key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(key)}
            className={`flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-line text-base font-semibold transition-colors ${
              isActive ? "bg-brand text-white" : "bg-white text-black"
            }`}
          >
            <Icon className="size-5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
