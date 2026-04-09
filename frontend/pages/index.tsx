import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>SquadProject — Home</title>
        <meta name="description" content="SquadProject frontend (Next.js)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        <header className="header">
          <h1 className="title">Welcome to SquadProject</h1>
          <p className="subtitle">A simple Next.js landing page using a clean Figma-inspired layout.</p>
        </header>

        <section className="hero">
          <div className="hero-left">
            <h2>Build faster with our API</h2>
            <p>Start integrating your services and use our predefined endpoints for quick prototyping.</p>
            <div className="cta-row">
              <a className="btn primary" href="#">Get Started</a>
              <a className="btn" href="#">Docs</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="card">
              <h3>Example</h3>
              <p>Random number API, unit conversion utilities and more.</p>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <h4>API-first</h4>
            <p>Well-documented endpoints to power your apps.</p>
          </div>
          <div className="feature">
            <h4>Type-safe</h4>
            <p>TypeScript throughout the stack for reliable development.</p>
          </div>
          <div className="feature">
            <h4>Developer Friendly</h4>
            <p>Quick start templates and examples to get you running.</p>
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} SquadProject</footer>
      </main>
    </>
  );
}
