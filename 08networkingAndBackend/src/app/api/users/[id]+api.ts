import { db } from "@/lib/db";

type Ctx = { id: string };

export async function GET(_req: Request, { id }: Ctx) {
    const userId = parseInt(id, 10);
    if (Number.isNaN(userId)) {
        return Response.json({
            error: "Invalid user ID",
            status: 400
        });
    }

    try {
        const fetchUser = await db.execute({
            sql: `SELECT * FROM users_data WHERE id = ?`,
            args: [userId],
        });

        const user = Array.isArray(fetchUser.rows) ? fetchUser.rows[0] : null;
        return Response.json(user);
    } catch (error) {
        console.log("Error : ", error);
        return Response.json({
            error: "Unable to fetch user",
            status: 400
        });
    }
}
