"use client";

import { Bell, CircleHelp, FileText, LogOut, ShieldCheck } from "lucide-react";

import { useMyLawyerProfile } from "@/features/lawyers/hooks/useMyLawyerProfile";
import { ProfileScreen } from "@/features/client/components/ProfileScreen";
import { ProfileHeaderCard } from "@/features/client/components/ProfileHeaderCard";
import { SettingsGroup, SettingsRow } from "@/features/client/components/SettingsList";
import { useLogout } from "@/shared/hooks/useLogout";
import { useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/constants";

export default function LawyerProfilePage() {
  const { profile } = useMyLawyerProfile();
  const email = useAppSelector((s) => s.auth.user?.email);
  const { logout, loggingOut } = useLogout();

  return (
    <ProfileScreen>
      <ProfileHeaderCard
        editHref={ROUTES.lawyerProfileEdit}
        data={
          profile && {
            name: profile.fullName,
            email,
            image: profile.profileImage,
            place: [profile.city, profile.governorate].filter(Boolean).join("، "),
          }
        }
      />

      {profile && (profile.bio || profile.about || profile.specializations?.length) && (
        <section className="flex flex-col gap-3 rounded-[1.25rem] bg-white p-5 sm:p-6">
          {profile.yearsOfExperience != null && (
            <p className="text-sm font-bold text-black/50">
              سنوات الخبرة: <span className="text-black">{profile.yearsOfExperience}</span>
            </p>
          )}
          {profile.bio && <p className="text-base font-semibold text-brand">{profile.bio}</p>}
          {profile.about && <p className="text-sm leading-7 text-black/70">{profile.about}</p>}
          {!!profile.specializations?.length && (
            <div className="flex flex-wrap gap-2">
              {profile.specializations.map((s) => (
                <span key={s.id} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
                  {s.arabicTitle}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      <SettingsGroup title="إعدادات الحساب">
        <SettingsRow icon={ShieldCheck} title="الأمان والخصوصية" description="تغيير كلمة المرور" href={ROUTES.forgotPassword} />
        <SettingsRow icon={Bell} title="الإشعارات" description="تحديد تفصيلات الإشعارات والتبيهات" href={ROUTES.notifications} />
      </SettingsGroup>

      <SettingsGroup title="المساعدة والمعلومات">
        <SettingsRow icon={CircleHelp} title="الأسئلة الشائعة" description="إرشادات عن استخدام المنصة" href={ROUTES.help} />
        <SettingsRow icon={FileText} title="الشروط وسياسة الخصوصية" description="الإطلاع علي شروط الاستخدام وسياسة الخصوصية" href={ROUTES.help} />
      </SettingsGroup>

      <SettingsGroup title="إجراءات الحساب">
        <SettingsRow danger icon={LogOut} title="تسجيل الخروج" description="تسجيل الخروج من حسابك" onClick={logout} disabled={loggingOut} />
      </SettingsGroup>
    </ProfileScreen>
  );
}
