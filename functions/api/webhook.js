export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Membaca body request sebagai JSON
    const payload = await request.json();

    // Log data yang diterima (hanya untuk debugging di dashboard Cloudflare)
    console.log("Dodo Payments Webhook received:", JSON.stringify(payload, null, 2));

    // Di sini Anda bisa menambahkan logika untuk memproses data,
    // misalnya menyimpan ke database, mengirim email, atau update status user.
    // Contoh: const eventType = payload.event;

    // Mengembalikan respon sukses ke Dodo Payments
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
    console.error("Error processing webhook:", error);

    // Mengembalikan respon error jika terjadi kegagalan parsing JSON atau lainnya
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
