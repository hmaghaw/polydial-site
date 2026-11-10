// Where "Login to Portal", "Get Started" and similar buttons send people.
// The portal itself is not part of this marketing site. Override at build time:
//   docker compose build --build-arg VITE_PORTAL_URL=https://staging.polydial.com
export const PORTAL_URL = (import.meta.env.VITE_PORTAL_URL || "https://polydial.com").replace(/\/$/, "");

export const portal = (path) => `${PORTAL_URL}${path}`;

export const CONTACT = {
  salesEmail: "sales@polydial.com",
  supportEmail: "support@polydial.com",
  privacyEmail: "privacy@polydial.com",
  phone: "+1 (647) 624-8506",
  phoneShort: "647-624-8506",
  hours: "Monday-Friday 9:00 AM - 6:00 PM EST, Saturday 10:00 AM - 4:00 PM EST",
};

export const VIDEOS = {
  appointmentsSetup: "/assets/polydial_final_step5_updated_compressed_1756768660710-BXRpackj.mp4",
  multilingual: "/assets/polydial_multilingual_updated_final_compressed_1756785691368-D18CM99i.mp4",
  cloverDemo: "/assets/polydial_clover_demo_FINAL_1759881363681-C59-HeMY.mp4",
  callForwarding: "/assets/polydial_call_forwarding_final_compressed_1759601643435-Dm5W1yot.mp4",
};
