export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Tangani endpoint webhook
    if (url.pathname === "/api/webhook") {
      if (request.method === "GET") {
        return new Response(JSON.stringify({
          success: true,
          message: "Dodo Payments Webhook via _worker.js is active!"
        }), {
          headers: { "Content-Type": "application/json" }
        });
      }

      if (request.method === "POST") {
        try {
          const payload = await request.json();
          console.log("Webhook payload:", payload);
          return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }

    // Tangani endpoint hello untuk tes
    if (url.pathname === "/hello") {
      return new Response("Hello from Cloudflare _worker.js!");
    }

    // Jika bukan API, biarkan Cloudflare melayani file statis (frontend React)
    return env.ASSETS.fetch(request);
  }
};
