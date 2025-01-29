import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  
  const {id} = await params;

  try {
    await connectToDB();


    const prompt = await Prompt.find({creator:id}).populate("creator").exec();


    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  

  } catch (error) {
    console.error("Fetch error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};