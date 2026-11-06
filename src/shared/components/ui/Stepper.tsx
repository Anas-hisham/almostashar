import { Fragment } from "react";
import Image from "next/image";

type StepperProps = {
  steps: string[];
  /** Index of the step the user is on. Earlier steps show as done. */
  current: number;
};

export default function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className="flex items-center justify-center gap-3 sm:gap-4">
      {steps.map((label, index) => {
        const isDone = index < current;
        const isCurrent = index === current;

        return (
          <Fragment key={label}>
            {index > 0 && (
              <li
                aria-hidden="true"
                className={`h-0.5 w-6 rounded-full sm:w-10 ${index <= current ? "bg-brand" : "bg-line/60"}`}
              />
            )}

            <li
              aria-current={isCurrent ? "step" : undefined}
              className="flex items-center gap-2"
            >
              {isDone ? (
                <Image src="/images/auth/step-done.svg" alt="" width={36} height={36} />
              ) : (
                <span
                  className={`flex size-9 items-center justify-center rounded-full text-base font-black ${
                    isCurrent ? "bg-[#D4AF37] text-black" : "bg-surface text-muted"
                  }`}
                >
                  {index + 1}
                </span>
              )}

              {/* On small screens only the current step keeps its visible label. */}
              <span
                className={`text-base font-semibold ${isDone ? "text-brand" : ""} ${isCurrent ? "text-black" : ""} ${
                  !isDone && !isCurrent ? "text-muted" : ""
                } ${!isCurrent ? "max-sm:sr-only" : ""}`}
              >
                {label}
              </span>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
