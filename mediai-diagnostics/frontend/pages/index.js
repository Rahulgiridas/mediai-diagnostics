import { useRouter } from "next/router";
import Particles from "react-tsparticles";

export default function Home() {
  const router = useRouter();

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">

      {/* 🔥 PARTICLE BACKGROUND */}
      <Particles
        className="particles"
        options={{
          background: { color: "#0b1c2c" },
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            links: {
              enable: true,
              color: "#00c6ff",
              distance: 150
            }
          }
        }}
      />

      {/* NAVBAR */}
      <nav className="navbar">
        <h2>MediAI</h2>

        <div className="nav-links">
          <a onClick={() => scrollTo("home")}>Home</a>
          <a onClick={() => scrollTo("how")}>How it works</a>
          <a onClick={() => scrollTo("dashboard")}>Dashboard</a>
          <a onClick={() => scrollTo("about")}>About</a>
        </div>

        <button
          className="primary"
          onClick={() => router.push("/upload")}
        >
          Try Now
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero glass">
        <div className="left">
          <h1>AI Health Diagnostics</h1>
          <p>
            Upload your medical reports (PDF, CSV, Image) and get instant
            AI-powered health insights.
          </p>

          <button
            className="primary big"
            onClick={() => router.push("/upload")}
          >
            Upload Report
          </button>

          <div className="tags">
            <span>⚡ Fast</span>
            <span>🔒 Secure</span>
            <span>🧠 AI Powered</span>
          </div>
        </div>

        <div className="right">
          <img src="/bg.jpg" alt="AI" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how glass">
        <h2>How It Works</h2>

        <div className="grid">
          <div className="card">
            <h3>📄 Upload</h3>
            <p>Upload PDF, CSV, Excel or Image reports.</p>
          </div>

          <div className="card">
            <h3>🤖 AI Analysis</h3>
            <p>Multi-model AI extracts and analyzes data.</p>
          </div>

          <div className="card">
            <h3>📊 Results</h3>
            <p>Get risk detection and health insights.</p>
          </div>

          <div className="card">
            <h3>✅ Recommendations</h3>
            <p>Personalized health suggestions.</p>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="dashboard glass">
        <h2>Dashboard</h2>

        <div className="stats">
          <div><h3>AI</h3><p>Analysis Engine</p></div>
          <div><h3>PDF</h3><p>Reports</p></div>
          <div><h3>CSV</h3><p>Datasets</p></div>
          <div><h3>IMG</h3><p>Scans</p></div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="features glass">
        <h2>Smart Healthcare System</h2>

        <div className="grid">
          <div className="card">
            <h3>🔐 Privacy</h3>
            <p>Secure data processing</p>
          </div>

          <div className="card">
            <h3>⚡ Fast</h3>
            <p>Instant analysis</p>
          </div>

          <div className="card">
            <h3>📊 AI Insights</h3>
            <p>Advanced diagnostics</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        MediAI Diagnostics © 2026
      </footer>

      {/* 🎨 STYLES */}
      <style jsx>{`
        .container {
          color: white;
          font-family: Arial;
          position: relative;
          overflow: hidden;
        }

        .particles {
          position: fixed;
          z-index: -1;
          width: 100%;
          height: 100%;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-links a {
          margin: 0 10px;
          cursor: pointer;
        }

        .hero {
          display: flex;
          padding: 80px;
          align-items: center;
          gap: 40px;
        }

        .hero img {
          width: 400px;
          border-radius: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          padding: 40px;
        }

        .card {
          padding: 20px;
          border-radius: 15px;
          background: rgba(255,255,255,0.05);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px rgba(0,198,255,0.5);
        }

        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          margin: 40px;
          border-radius: 20px;
        }

        .primary {
          background: #00c6ff;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
        }

        footer {
          text-align: center;
          padding: 20px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
