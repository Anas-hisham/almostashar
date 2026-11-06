"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cairo } from "next/font/google";
import {
  Home,
  UserRound,
  Bot,
  FileText,
  Search,
  CalendarCheck,
  Menu,
  X,
  LogIn,
  LogOut,
  LifeBuoy,
  LayoutDashboard,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authApi } from "@/features/auth/authApi";
import { setUnauthenticated } from "@/features/auth/authSlice";
import { getHomeRoute } from "@/features/auth/authRedirect";
import { tokenStorage } from "@/lib/tokenStorage";
import { ROUTES } from "@/constants";
import UserAvatar from "@/shared/components/ui/UserAvatar";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
});

const LOGO_SRC = "/images/logo.webp";

const NAV_LINKS = [
  { label: "الرئيسية", href: "/", icon: Home },
  { label: "دليل المحامين", href: "/lawyers", icon: UserRound },
  { label: "المساعد الذكي", href: "/assistant", icon: Bot },
  { label: "تحليل العقود", href: "/contracts", icon: FileText },
  { label: "البحث القانوني", href: "/legal-search", icon: Search },
];

const menuItemClass =
  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-start text-base font-semibold text-[#1A201C] transition-colors hover:bg-[#F5E6C8]/60 focus-visible:bg-[#F5E6C8]/60 focus-visible:outline-none disabled:opacity-60";

function AccountMenu() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, status } = useAppSelector((s) => s.auth);

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const isChecking = status === "checking";
  const isLoggedIn = status === "authenticated";
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "";

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await authApi.logout(); // needs the access token, so call it before clearing
    } catch {
      // even if the server call fails, the user must be logged out locally
    } finally {
      tokenStorage.clear();
      dispatch(setUnauthenticated());
      setLoggingOut(false);
      setOpen(false);
      router.replace(ROUTES.home);
      router.refresh();
    }
  }

  return (
    <div ref={rootRef} className="relative flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isChecking}
        aria-label={isLoggedIn ? "قائمة الحساب" : "تسجيل الدخول أو حساب جديد"}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`h-11 w-11 overflow-hidden rounded-xl bg-[#EFEBE0] ring-[#C5A059] transition hover:ring-2 focus-visible:outline-none focus-visible:ring-2 ${
          isChecking ? "animate-pulse" : ""
        }`}
      >
        {/* logged in → profile image (falls back to default avatar); otherwise default avatar */}
        <UserAvatar
          src={isLoggedIn ? user?.profileImage : null}
          alt={fullName}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-72 rounded-3xl border border-[#E2E8E4] bg-white p-3 shadow-xl"
        >
          <p className="px-3 pb-2 pt-1 text-base text-[#5F6B64]">
            أنت:{" "}
            <span className="font-bold text-[#1B3B2B]">
              {isLoggedIn ? fullName || "مستخدم" : "زائر"}
            </span>
          </p>

          {isLoggedIn ? (
            <>
              {user?.role && (
                <Link
                  role="menuitem"
                  href={getHomeRoute(user.role)}
                  onClick={() => setOpen(false)}
                  className={menuItemClass}
                >
                  <LayoutDashboard
                    size={22}
                    className="text-[#C5A059]"
                    aria-hidden="true"
                  />
                  <span>لوحة التحكم</span>
                </Link>
              )}

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                disabled={loggingOut}
                className={menuItemClass}
              >
                <LogOut
                  size={22}
                  className="text-[#C5A059]"
                  aria-hidden="true"
                />
                <span>
                  {loggingOut ? "جاري تسجيل الخروج..." : "تسجيل خروج"}
                </span>
              </button>
            </>
          ) : (
            <Link
              role="menuitem"
              href={ROUTES.login}
              onClick={() => setOpen(false)}
              className={menuItemClass}
            >
              <LogIn size={22} className="text-[#C5A059]" aria-hidden="true" />
              <span>تسجيل الدخول / حساب جديد</span>
            </Link>
          )}

          <Link
            role="menuitem"
            href="/help"
            onClick={() => setOpen(false)}
            className={menuItemClass}
          >
            <LifeBuoy size={22} className="text-[#C5A059]" aria-hidden="true" />
            <span>المساعدة والدعم</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // close the mobile menu on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      dir="rtl"
      className={`${cairo.className} relative z-40 w-full border-b border-[#E2E8E4] bg-[#FAF9F5]/95 backdrop-blur-md`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={LOGO_SRC}
            alt="مينيكاتو"
            width={48}
            height={48}
            priority
            className="h-12 w-12 rounded-full border object-cover"
          />

          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-2xl font-black text-[#1B3B2B]">
                مينيكاتو
              </span>

              <span className="whitespace-nowrap rounded-full border border-[#C5A059]/50 bg-[#C5A059]/10 px-2 py-0.5 text-[10px] font-semibold text-[#1B3B2B]">
                Minicato AI
              </span>
            </div>

            <span className="hidden whitespace-nowrap text-[11px] text-[#5F6B64] sm:block">
              ذكاء اصطناعي ونخبة المحامين المعتمدين
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-[#1A201C] transition-colors duration-200 hover:bg-[#F5E6C8] hover:text-[#1B3B2B]"
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className="text-[#C5A059]"
                aria-hidden="true"
              />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Actions: avatar menu is visible on every screen size */}
        <div className="flex shrink-0 items-center gap-2 justify-center">
          <AccountMenu />
          <Link
            href="/booking"
            className="hidden items-center gap-2 whitespace-nowrap rounded-lg bg-[#1B3B2B] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#14301F] xl:flex"
          >
            <CalendarCheck
              size={18}
              className="text-[#C5A059]"
              aria-hidden="true"
            />
            احجز محامي الآن
          </Link>

          {/* Mobile menu toggle (hidden on desktop) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-[#1B3B2B] transition-colors hover:bg-gray-200 xl:hidden"
          >
            {menuOpen ? (
              <X size={28} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Menu size={28} strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-[#E2E8E4] bg-white shadow-xl xl:hidden"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={menuItemClass}
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="text-[#C5A059]"
                  aria-hidden="true"
                />
                <span>{label}</span>
              </Link>
            ))}

            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#1B3B2B] px-4 py-3 text-base font-bold text-white transition-colors hover:bg-[#14301F]"
            >
              <CalendarCheck
                size={20}
                className="text-[#C5A059]"
                aria-hidden="true"
              />
              احجز محامي الآن
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
