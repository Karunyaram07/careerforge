
export default function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-50 overflow-hidden bg-black">
        {/* Grid */}
        <div
          className="
          absolute inset-0
          bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]
          bg-[size:60px_60px]
          opacity-20
        "
        />

        {/* Aurora Blob 1 */}
        <div
          className="
          absolute left-[-10%] top-[-10%]
          h-[500px] w-[500px]
          rounded-full
          bg-purple-500/20
          blur-3xl
          animate-pulse
        "
        />

        {/* Aurora Blob 2 */}
        <div
          className="
          absolute right-[-10%] top-[20%]
          h-[450px] w-[450px]
          rounded-full
          bg-cyan-500/20
          blur-3xl
          animate-pulse
        "
        />

        {/* Aurora Blob 3 */}
        <div
          className="
          absolute bottom-[-10%] left-[30%]
          h-[500px] w-[500px]
          rounded-full
          bg-violet-500/20
          blur-3xl
          animate-pulse
        "
        />

        {/* Center Glow */}
        <div
          className="
          absolute left-1/2 top-1/2
          h-[600px] w-[600px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-white/5
          blur-3xl
        "
        />
      </div>
    </>
  );
}