export function Error({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-sm my-2 text-red-500 mt-1">{msg}</p>;
}
