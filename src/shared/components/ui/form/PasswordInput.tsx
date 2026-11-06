"use client";

import { useState, type ComponentProps } from "react";
import Input from "@/shared/components/ui/form/Input";
import { EyeIcon, EyeOffIcon } from "@/shared/components/ui/icons";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type" | "endAdornment">;

export default function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOffIcon : EyeIcon;

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          className="rounded p-1 text-black"
        >
          <Icon className="size-6" />
        </button>
      }
    />
  );
}
