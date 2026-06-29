const BASE_URL = "https://examify.runasp.net";

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken: string;
  name: string;
  role: string;
  email: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
}
