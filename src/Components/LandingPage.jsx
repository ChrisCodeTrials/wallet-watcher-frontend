import { Link } from "react-router-dom";
import Crypto from "./Crypto";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Welcome To HODL Tracker</h1>
      <Link to="/dashboard">Dashboard</Link>
      <section>
          <Crypto/>
      </section>
    </div>
  );
}

export default LandingPage;
