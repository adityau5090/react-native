import { db } from "@/lib/db";

export async function GET() {
    try {
        
    } catch (error) {
        
    }
}

export async function POST(request:Request) {
    const { name,email } = await request.json();
        
        if(!name || !email){
            return Response.json({
                error: "Name and Email is required",
                status: 400,
            })
        }
    try {
        const result = await db.execute({
            sql: 'INSERT INTO users_data  (name, email) VALUES (?, ?)',
            args: [name, email]
        });

        return Response.json(
            { id: result.lastInsertRowid, name, email},
            { status: 201 }
        )
    } catch (error) {
        console.log("Error : ", error)
        return Response.json({
            error: "Failde to create user",
            status: 400
        })
    }
}