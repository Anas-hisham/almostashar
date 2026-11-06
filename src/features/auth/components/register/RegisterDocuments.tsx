import type { ReactNode } from "react";
import type { FieldErrors } from "@/features/auth/authSchemas";
import FileUpload from "@/shared/components/ui/form/FileUpload";
import { FolderIcon } from "@/shared/components/ui/icons";

type DocumentsSectionProps = {
  description: string;
  children: ReactNode;
};

/** "المستندات والصور" heading + note + grid of upload boxes. */
export function DocumentsSection({ description, children }: DocumentsSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h2 className="flex items-center gap-2 text-base font-semibold text-black">
          <FolderIcon className="size-6 text-gold" />
          المستندات والصور
        </h2>
        <p className="text-xs font-medium text-black/60">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-5 max-[420px]:grid-cols-1">{children}</div>
    </section>
  );
}

type FilesProps<T> = {
  values: T;
  errors: FieldErrors;
  onChange: (field: keyof T & string, file: File | null) => void;
};

type ClientFiles = {
  avatarPhoto: File | null;
  frontIdPhoto: File | null;
  backIdPhoto: File | null;
};

export function ClientDocuments({ values, errors, onChange }: FilesProps<ClientFiles>) {
  return (
    <DocumentsSection description="تحتاج صورة البطاقة لتأكيد هويتك.">
      <FileUpload
        id="avatarPhoto"
        label="الصورة الشخصية"
        optional
        file={values.avatarPhoto}
        error={errors.avatarPhoto}
        onChange={(file) => onChange("avatarPhoto", file)}
      />
      <FileUpload
        id="frontIdPhoto"
        label="صورة البطاقة - الوجه الأمامي"
        required
        file={values.frontIdPhoto}
        error={errors.frontIdPhoto}
        onChange={(file) => onChange("frontIdPhoto", file)}
      />
      <FileUpload
        id="backIdPhoto"
        label="صورة البطاقة - الوجه الخلفي"
        required
        file={values.backIdPhoto}
        error={errors.backIdPhoto}
        onChange={(file) => onChange("backIdPhoto", file)}
      />
    </DocumentsSection>
  );
}

type LawyerFiles = {
  ssnPhoto: File | null;
  syndicateCardPhoto: File | null;
  practiceCertificatesPhoto: File | null;
  avatarPhoto: File | null;
};

export function LawyerDocuments({ values, errors, onChange }: FilesProps<LawyerFiles>) {
  return (
    <DocumentsSection description="سوف يتم مراجعة مستنداتك من فريق المنصة قبل توثيق حسابك.">
      <FileUpload
        id="ssnPhoto"
        label="صورة الرقم القومي / الهوية"
        required
        file={values.ssnPhoto}
        error={errors.ssnPhoto}
        onChange={(file) => onChange("ssnPhoto", file)}
      />
      <FileUpload
        id="syndicateCardPhoto"
        label="صورة كارنية النقابة"
        required
        file={values.syndicateCardPhoto}
        error={errors.syndicateCardPhoto}
        onChange={(file) => onChange("syndicateCardPhoto", file)}
      />
      <FileUpload
        id="practiceCertificatesPhoto"
        label="شهادات مزاولة المهنة"
        required
        file={values.practiceCertificatesPhoto}
        error={errors.practiceCertificatesPhoto}
        onChange={(file) => onChange("practiceCertificatesPhoto", file)}
      />
      <FileUpload
        id="avatarPhoto"
        label="الصورة الشخصية"
        optional
        file={values.avatarPhoto}
        error={errors.avatarPhoto}
        onChange={(file) => onChange("avatarPhoto", file)}
      />
    </DocumentsSection>
  );
}
