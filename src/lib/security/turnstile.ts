/**
 * Verify Cloudflare Turnstile token on the server side
 */
export async function verifyTurnstileToken({
  token,
  remoteIp,
}: {
  token: string;
  remoteIp?: string;
}): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If running in development without a key, allow mock pass for testing
  if (!secretKey || secretKey === "your-turnstile-secret-key") {
    if (process.env.NODE_ENV === "development") {
      return { success: true };
    }
    return { success: false, error: "Turnstile secret key not configured" };
  }

  if (!token) {
    return { success: false, error: "Turnstile token is missing" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const data = await res.json();
    return { success: Boolean(data.success), error: data["error-codes"]?.join(", ") };
  } catch (err) {
    return { success: false, error: `Turnstile verification failed: ${(err as Error).message}` };
  }
}
