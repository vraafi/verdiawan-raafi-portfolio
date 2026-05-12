export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method === "GET") {
    return new Response(JSON.stringify({
      success: true,
      message: "Webhook endpoint is active via Functions folder!",
      path: url.pathname
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (request.method === "POST") {
    try {
      const payload = await request.json();
      return new Response(JSON.stringify({ success: true, received: true }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  return new Response("Method not allowed", { status: 405 });
}
