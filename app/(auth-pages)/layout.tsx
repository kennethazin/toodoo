export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-8xl flex flex-col gap-12 items-start mb-96 ">{children}</div>
  );
}
