export async function onRequest(context) {
  return new Response("tiktok-developers-site-verification=4jJjPpDaJOXgkMaopBvnqojeKTCmtiqR", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
