export async function POST(req) {

  try {

    const body =
      await req.json();

    await fetch(

      "https://script.google.com/macros/s/AKfycbxevuGBvYtUWpYI7e1eX7UMoWRRhwS0cHAA8fULZ35vEHZ1uwky7RUwHWSVqWCn3x6u/exec",

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(body),
      }
    );

    return Response.json({
      success: true,
    });

  } catch (error) {

    return Response.json({
      success: false,
      error,
    });
  }
}