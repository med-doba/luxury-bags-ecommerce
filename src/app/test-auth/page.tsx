import { cookies } from "next/headers";

export default async function TestAuth() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin-session");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      <div className="space-y-2">
        <p>
          <strong>Admin Session Cookie:</strong>{" "}
          {adminSession?.value || "Not found"}
        </p>
        <p>
          <strong>Cookie Name:</strong> {adminSession?.name || "N/A"}
        </p>
        <p>
          <strong>All Cookies:</strong>
        </p>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(cookieStore.getAll(), null, 2)}
        </pre>
      </div>
    </div>
  );
}
