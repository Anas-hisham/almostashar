/** "300 ريال": number in Inter, currency in grey Cairo (Figma). Size comes from the parent. */
export default function Price({ amount }: { amount: number }) {
  return (
    <span className="whitespace-nowrap font-semibold">
      <span className="font-inter text-black">{amount}</span> <span className="text-black/60">ريال</span>
    </span>
  );
}
