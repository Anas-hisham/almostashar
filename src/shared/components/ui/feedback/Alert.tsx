import { AlertCircleIcon, LockIcon } from "@/shared/components/ui/icons";

type AlertVariant = "error" | "warning";

type AlertProps = {
  variant?: AlertVariant;
  title: string;
  description?: string;
};

const styles: Record<AlertVariant, string> = {
  error: "border-danger-border bg-danger-bg text-danger",
  warning: "border-warning-border bg-warning-bg text-warning",
};

export default function Alert({ variant = "error", title, description }: AlertProps) {
  const Icon = variant === "error" ? AlertCircleIcon : LockIcon;

  return (
    <div
      role="alert"
      className={`flex flex-col gap-1 rounded-xl border-2 px-3 py-3 ${styles[variant]}`}
    >
      <p className="flex items-center gap-2 text-sm font-bold">
        <Icon className="size-4 shrink-0" />
        {title}
      </p>
      {description && <p className="text-xs font-medium">{description}</p>}
    </div>
  );
}
