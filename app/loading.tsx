
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full py-10">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="text-2xl text-primary">Loading</span>
    </div>
  );
}
