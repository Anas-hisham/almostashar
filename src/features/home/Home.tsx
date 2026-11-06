
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
});

const LOGO_SRC = "/images/logo.webp"; 

 
import { Bot, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {

  return (
    <main dir="rtl" className={`${cairo.className} flex-1`}>
      <section className="bg-[#FAF9F5] px-6 pb-20 pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* RIGHT: TEXT */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8E4] bg-white px-4 py-2 text-sm font-semibold text-[#1B3B2B]">
              <span className="h-3 w-3 rounded-full bg-[#C5A059]/60" />
              جسرك الذكي الموثوق للتواصل مع نخبة المحامين المعتمدين
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#1B3B2B] md:text-6xl">
              رفيقك القانوني الذكي وصلتك المباشرة{" "}
              <span className="bg-[linear-gradient(to_left,#1B3B2B,#C5A059)] bg-clip-text text-transparent">
                بـ المحامين
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5A655E]">
              نبسط لك عالم القانون! استشر الذكاء الاصطناعي لفهم قضيتك مجاناً، أو
              احصل على توثيق واستشارة فورية مع محامين معتمدين متخصصين في كافة
              المجالات القضائية.
            </p>
  <div className="mt-2.5 flex items-center gap-3">
    <h2 className="text-2xl leading-8 text-[#5A655E]">
      انضم إلينا
    </h2>

    <Link
      href="/register"
      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#1B3B2B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#14301f] sm:flex-none"
    >
      إنشاء حساب
    </Link>
  </div>
           
            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#E2E8E4] bg-white p-3 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="اكتب مشكلتك أو ابحث عن محام..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-[#1A201C] outline-none placeholder:text-[#5A655E]/60"
              />

              <div className="flex gap-2">
                <Link
                  href="/"
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#1B3B2B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#14301f] sm:flex-none"
                >
                  <Bot  className="text-[#C5A059]" />
                  استشر الذكاء
                </Link>

                <Link
                  href="/"
                  className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#C5A059] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B08C46] sm:flex-none"
                >
                 <UserRound />
                  ابحث عن محام
                </Link>
              </div>
            </div>

      
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#5A655E]">
              <span className="font-bold text-[#1A201C]">تخصصات سريعة:</span>
              <Link href="/" className="underline hover:text-[#C5A059]">
                قضايا عمل
              </Link>
              <span>•</span>
              <Link href="/" className="underline hover:text-[#C5A059]">
                تأسيس شركات
              </Link>
              <span>•</span>
              <Link href="/" className="underline hover:text-[#C5A059]">
                منازعات عقارية
              </Link>
            </div>
          </div>

        
          <div className="mx-auto w-full max-w-md -rotate-2 rounded-3xl border border-[#C5A059]/30 bg-white p-6 shadow-xl">
         
            <div className="flex justify-center">
              <Image
                src={LOGO_SRC}
                alt="منيكاتو"
                width={220}
                height={220}
                priority
                className="h-52 w-52 object-contain"
              />
            </div>

            
            <div className="mt-4 rounded-2xl border border-[#E2E8E4] bg-[#FAF9F5] p-4 text-center">
              <p className="text-xs font-bold text-[#C5A059]">
                المستشار الذكي ومطابق المحامين
              </p>
              <h3 className="mt-1 text-xl font-black text-[#1B3B2B]">
                أهلاً بك! أنا منيكاتو 🥑
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#5A655E]">
                 أقوم بتحليل مشكلتك بلمسة ذكية، وأوصلك بأفضل المحامين المعتمدين
                والمناسبين لقضيتك مباشر
              </p>
            </div>

        
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800">
                محامين معتمدين
              </span>
              <span className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                حجز استشارة فورية
              </span>
              <span className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-800">
                سرية تامة
              </span>
            </div>
          </div>
        </div>
       
      </section>
    </main>

  )
}

export default Home
