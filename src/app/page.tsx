import "./home.scss";

export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <h1>
          Translate Anything <br />
          <span>Instantly & Smartly</span>
        </h1>

        <p>
          MultiMian TranslateX lets you translate text, voice, and files using
          modern AI — fast, accurate, and beautiful.
        </p>

        <div className="actions">
          <a href="/translate" className="primary">
            Start Translating
          </a>
          <a href="/voice" className="secondary">
            Try Voice
          </a>
        </div>
      </section>
    </main>
  );
}
