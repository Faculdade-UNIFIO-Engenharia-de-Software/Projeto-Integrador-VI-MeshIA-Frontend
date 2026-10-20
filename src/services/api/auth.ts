type LoginResult = { ok: true; token: string; expiresIn: number } | { ok: false; message: string };

const USE_MOCK = process.env.USE_MOCK_API === "true";

export async function login(email: string, password: string): Promise<LoginResult> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, token: "mock-token", expiresIn: 60 * 60 * 8 };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
    if (res.status === 401) return { ok: false, message: "E-mail ou senha inválidos." };
    if (!res.ok) return { ok: false, message: "Não foi possível entrar agora. Tente novamente." };

    const data = await res.json(); // formato a combinar com o back: { token, expiresIn }
    return { ok: true, token: data.token, expiresIn: data.expiresIn ?? 60 * 60 * 8 };
  } catch {
    return { ok: false, message: "Servidor indisponível. Tente novamente." };
  }
}
