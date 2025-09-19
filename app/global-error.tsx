'use client';
import Link from 'next/link';

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <main style={{ padding: 32 }}>
          <h1>Something went wrong</h1>
          <pre>{error.message}</pre>
          <Link href="/">Go home</Link>
        </main>
      </body>
    </html>
  );
}
