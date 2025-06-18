export async function refreshAccessToken(refresh_token) {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;

  const params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("refresh_token", refresh_token);
  params.append("grant_type", "refresh_token");

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await res.json(); // always parse the response

    if (!res.ok) {
      console.error("Google token refresh failed:", data);
      throw new Error("Failed to refresh access token");
    }

    return data.access_token;
  } catch (error) {
    console.error("Error refreshing Google token:", error.message);
    return null;
  }
}
