import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body>
        <main style={{ padding: 32 }}>
          <h1>Page not found</h1>
          <p>Sorry, we couldn’t find that page.</p>
          <Link href="/">Go home</Link>
        </main>
      </body>
    </html>
  );
}
