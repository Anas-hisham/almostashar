"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { authApi } from "@/features/auth/authApi";
import {
  validateRegisterClient,
  validateRegisterLawyer,
  type FieldErrors,
} from "@/features/auth/authSchemas";
import {
  GOVERNORATES,
  SPECIALIZATIONS,
  SYNDICATES,
  getCities,
} from "@/features/auth/registerOptions";
import type { AccountType } from "@/features/auth/components/register/RegisterationTaps";
import { ClientDocuments, LawyerDocuments } from "@/features/auth/components/register/RegisterDocuments";
import SpecializationPicker from "@/features/auth/components/register/SpecializationPicker";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { ROUTES } from "@/constants";
import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormField from "@/shared/components/ui/form/FormField";
import Input from "@/shared/components/ui/form/Input";
import PasswordInput from "@/shared/components/ui/form/PasswordInput";
import Select from "@/shared/components/ui/form/Select";

type RegisterFormProps = {
  accountType: AccountType;
};

type RegisterValues = {
  // shared
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  governorateId: number | null;
  cityId: number | null;
  avatarPhoto: File | null;
  // client
  frontIdPhoto: File | null;
  backIdPhoto: File | null;
  // lawyer
  phoneNo: string;
  syndicateId: number | null;
  yearsOfExperience: string;
  specializationIds: number[];
  ssnPhoto: File | null;
  syndicateCardPhoto: File | null;
  practiceCertificatesPhoto: File | null;
};

const INITIAL_VALUES: RegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  governorateId: null,
  cityId: null,
  avatarPhoto: null,
  frontIdPhoto: null,
  backIdPhoto: null,
  phoneNo: "",
  syndicateId: null,
  yearsOfExperience: "",
  specializationIds: [],
  ssnPhoto: null,
  syndicateCardPhoto: null,
  practiceCertificatesPhoto: null,
};

const NETWORK_ERROR = "تعذر الاتصال بالخادم، حاول مرة أخري";
const GENERIC_ERROR = "حدث خطأ أثناء إنشاء الحساب، تأكد من البيانات المدخلة.";

export default function RegisterForm({ accountType }: RegisterFormProps) {
  const router = useRouter();

  const registerClientAction = useAsyncAction(authApi.registerClient);
  const registerLawyerAction = useAsyncAction(authApi.registerLawyer);
  const loading = registerClientAction.loading || registerLawyerAction.loading;

  const [values, setValues] = useState<RegisterValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");

  const isLawyer = accountType === "lawyer";
  const cities = getCities(values.governorateId);

  /** Updates one field and clears its error (and the server error) while the user fixes it. */
  function setField<K extends keyof RegisterValues>(field: K, value: RegisterValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _removed, ...rest } = prev;
      return rest;
    });
    setSubmitError("");
  }

  function changeGovernorate(id: number) {
    setField("governorateId", id);
    setField("cityId", null); // cities belong to one governorate
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    try {
      if (isLawyer) {
        const { data, errors } = validateRegisterLawyer(values);
        if (!data) return setErrors(errors);

        await registerLawyerAction.run({
          FirstName: data.firstName,
          LastName: data.lastName,
          Email: data.email,
          Password: data.password,
          PhoneNo: data.phoneNo,
          GovernorateId: data.governorateId,
          CityId: data.cityId,
          SyndicateId: data.syndicateId,
          YearsOfExperience: Number(data.yearsOfExperience),
          SpecializationIds: data.specializationIds,
          SSNPhoto: data.ssnPhoto,
          SyndicateCardPhoto: data.syndicateCardPhoto,
          PracticeCertificatesPhoto: data.practiceCertificatesPhoto,
          AvatarPhoto: data.avatarPhoto ?? undefined,
        });
      } else {
        const { data, errors } = validateRegisterClient(values);
        if (!data) return setErrors(errors);

        await registerClientAction.run({
          FirstName: data.firstName,
          LastName: data.lastName,
          Email: data.email,
          Password: data.password,
          GovernorateId: data.governorateId,
          CityId: data.cityId,
          AvatarPhoto: data.avatarPhoto ?? undefined,
          FrontIdPhoto: data.frontIdPhoto,
          BackIdPhoto: data.backIdPhoto,
        });
      }

      setErrors({});
      // router.push(ROUTES.verifyEmail);
    } catch (error) {
  if (isAxiosError(error)) {
    console.error("Status:", error.response?.status);
    console.error("Response data:", error.response?.data);
  } else {
    console.error("Registration failed:", error);
  }
}
  }

  // Same select, used in both account types (the order of fields follows the Figma design).
  const governorateField = (
    <FormField label="المحافظة" htmlFor="governorate" error={errors.governorateId}>
      <Select
        id="governorate"
        options={GOVERNORATES}
        value={values.governorateId}
        onValueChange={changeGovernorate}
        invalid={!!errors.governorateId}
        placeholder="اختر المحافظة"
      />
    </FormField>
  );

  const cityField = (
    <FormField label="المدينة" htmlFor="city" error={errors.cityId}>
      <Select
        id="city"
        options={cities}
        value={values.cityId}
        onValueChange={(id) => setField("cityId", id)}
        invalid={!!errors.cityId}
        disabled={!values.governorateId}
        placeholder={values.governorateId ? "اختر المدينة" : "اختر المحافظة أولا"}
      />
    </FormField>
  );

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      {submitError && <Alert title={submitError} />}

      <div className="grid grid-cols-2 gap-x-3 gap-y-5 max-[420px]:grid-cols-1">
        <FormField label="الاسم الأول" htmlFor="firstName" error={errors.firstName}>
          <Input
            id="firstName"
            autoComplete="given-name"
            placeholder="مثال: أحمد"
            value={values.firstName}
            invalid={!!errors.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
          />
        </FormField>

        <FormField label="اسم العائلة" htmlFor="lastName" error={errors.lastName}>
          <Input
            id="lastName"
            autoComplete="family-name"
            placeholder="مثال: محمد"
            value={values.lastName}
            invalid={!!errors.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
          />
        </FormField>

        <FormField label="البريد الالكتروني" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="example@email.com"
            value={values.email}
            invalid={!!errors.email}
            onChange={(e) => setField("email", e.target.value)}
          />
        </FormField>

        <FormField
          label="كلمة المرور"
          hint="(8 أحرف علي الأقل مع أرقام)"
          htmlFor="password"
          error={errors.password}
        >
          <PasswordInput
            id="password"
            dir="ltr"
            autoComplete="new-password"
            placeholder="اكتب كلمة مرور قوية"
            value={values.password}
            invalid={!!errors.password}
            onChange={(e) => setField("password", e.target.value)}
          />
        </FormField>

        {isLawyer ? (
          <>
            <FormField label="رقم الجوال" htmlFor="phoneNo" error={errors.phoneNo}>
              <Input
                id="phoneNo"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="مثال: 01012345678"
                value={values.phoneNo}
                invalid={!!errors.phoneNo}
                onChange={(e) => setField("phoneNo", e.target.value)}
              />
            </FormField>
            {governorateField}

            {cityField}
            <FormField label="النقابة" htmlFor="syndicate" error={errors.syndicateId}>
              <Select
                id="syndicate"
                options={SYNDICATES}
                value={values.syndicateId}
                onValueChange={(id) => setField("syndicateId", id)}
                invalid={!!errors.syndicateId}
                placeholder="اختر النقابة"
              />
            </FormField>

            <FormField label="سنوات الخبرة" htmlFor="yearsOfExperience" error={errors.yearsOfExperience}>
              <Input
                id="yearsOfExperience"
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="مثال: 5"
                value={values.yearsOfExperience}
                invalid={!!errors.yearsOfExperience}
                onChange={(e) => setField("yearsOfExperience", e.target.value)}
              />
            </FormField>
          </>
        ) : (
          <>
            {cityField}
            {governorateField}
          </>
        )}
      </div>

      {isLawyer && (
        <SpecializationPicker
          options={SPECIALIZATIONS}
          value={values.specializationIds}
          error={errors.specializationIds}
          onChange={(ids) => setField("specializationIds", ids)}
        />
      )}

      {isLawyer ? (
        <LawyerDocuments values={values} errors={errors} onChange={setField} />
      ) : (
        <ClientDocuments values={values} errors={errors} onChange={setField} />
      )}

      <Button type="submit" loading={loading}>
        {loading ? "جاري إنشاء الحساب..." : "انشاء الحساب"}
      </Button>
    </form>
  );
}
