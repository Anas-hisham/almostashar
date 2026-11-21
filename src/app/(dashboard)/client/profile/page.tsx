"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CircleHelp, FileText, LogOut, ShieldCheck } from "lucide-react";

import { authApi } from "@/features/auth/authApi";
import { setUnauthenticated } from "@/features/auth/authSlice";
import { useClientProfile } from "@/features/client/hooks/useClientProfile";
import { ProfileScreen } from "@/features/client/components/ProfileScreen";
import { ProfileHeaderCard } from "@/features/client/components/ProfileHeaderCard";
import { SettingsGroup, SettingsRow } from "@/features/client/components/SettingsList";
import { tokenStorage } from "@/lib/tokenStorage";
import { ROUTES } from "@/constants";
import { useAppDispatch } from "@/store/hooks";

export default function ClientProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile } = useClientProfile();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await authApi.logout(); // needs the access token, so call it before clearing
    } catch {
      // even if the server call fails, the user must be logged out locally
    } finally {
      tokenStorage.clear();
      dispatch(setUnauthenticated());
      router.replace(ROUTES.home);
      router.refresh();
    }
  }

  return (
    <ProfileScreen>
      <ProfileHeaderCard
        editHref={ROUTES.clientProfileEdit}
        data={
          profile && {
            name: `${profile.firstName} ${profile.lastName}`.trim(),
            email: profile.email,
            image: profile.profileImage,
            place: [profile.city, profile.governorate].filter(Boolean).join("، "),
          }
        }
      />

      <SettingsGroup title="إعدادات الحساب">
        <SettingsRow icon={ShieldCheck} title="الأمان والخصوصية" description="تغيير كلمة المرور" href={ROUTES.clientSecurity} />
        <SettingsRow icon={Bell} title="الإشعارات" description="تحديد تفصيلات الإشعارات والتبيهات" href={ROUTES.notifications} />
      </SettingsGroup>

      <SettingsGroup title="المساعدة والمعلومات">
        <SettingsRow icon={CircleHelp} title="الأسئلة الشائعة" description="إرشادات عن استخدام المنصة" href={ROUTES.help} />
        <SettingsRow icon={FileText} title="الشروط وسياسة الخصوصية" description="الإطلاع علي شروط الاستخدام وسياسة الخصوصية" href={ROUTES.help} />
      </SettingsGroup>

      <SettingsGroup title="إجراءات الحساب">
        <SettingsRow danger icon={LogOut} title="تسجيل الخروج" description="تسجيل الخروج من حسابك" onClick={handleLogout} disabled={loggingOut} />
      </SettingsGroup>
    </ProfileScreen>
  );
}
