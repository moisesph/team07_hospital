import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>The requested page is not available yet.</p>
      <Link href="/">Return to home</Link>
    </main>
  );
}