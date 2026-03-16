import api from "@/lib/api";

export const verifyHealthStatus = async (): Promise<boolean> => {
  try {
    await api.get("/health");
    return true;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};
