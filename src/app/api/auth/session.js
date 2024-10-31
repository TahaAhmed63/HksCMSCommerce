import { getSession } from "next-auth/react"; // Make sure this matches your NextAuth version

export default  async function GET(req,res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
