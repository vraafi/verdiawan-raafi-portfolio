export async function onRequest(context) {
  const { request } = context;
  const method = request.method;

  // Jika metode adalah GET, berikan respon status sederhana untuk verifikasi
  if (method === "GET") {
    return new Response(JSON.stringify({
      success: true,
      message: "Dodo Payments Webhook endpoint is active. Please use POST for actual data."
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  // Hanya proses metode POST untuk data webhook
  if (method === "POST") {
    try {
      const payload = await request.json();
      console.log("Dodo Payments Webhook received:", JSON.stringify(payload, null, 2));

      return new Response(JSON.stringify({
        success: true,
        message: "Webhook received successfully"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: "Error processing webhook",
        error: error.message
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  }

  // Jika metode lain (PUT, DELETE, dll)
  return new Response(JSON.stringify({
    success: false,
    message: `Method ${method} not allowed`
  }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      "Allow": "GET, POST"
    }
  });
}
