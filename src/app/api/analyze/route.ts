import Anthropic from "@anthropic-ai/sdk";
import { ANALYSIS_SYSTEM_PROMPT, ANALYSIS_USER_PROMPT } from "@/lib/prompts";

const client = new Anthropic();

const MODEL = "claude-sonnet-4-20250514";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString("base64");
    const mediaType = image.type as
      | "image/jpeg"
      | "image/png"
      | "image/webp"
      | "image/gif";

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: ANALYSIS_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: "text",
              text: ANALYSIS_USER_PROMPT,
            },
          ],
        },
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        stream.on("text", (text) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
          );
        });

        stream.on("message", (message) => {
          // Send token usage info at the end
          const usage = {
            inputTokens: message.usage?.input_tokens ?? 0,
            outputTokens: message.usage?.output_tokens ?? 0,
            model: MODEL,
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ usage })}\n\n`)
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        });

        stream.on("error", (error) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: error.message })}\n\n`
            )
          );
          controller.close();
        });
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
