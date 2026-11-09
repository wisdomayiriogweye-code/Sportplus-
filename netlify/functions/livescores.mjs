export default async () => {
  const token = process.env.SPORTMONKS_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({ error: "API token not configured" }),
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://api.sportmonks.com/v3/football/livescores/inplay?include=participants;scores;events;state;league;periods",
      {
        headers: {
          Authorization: token
        }
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to fetch live scores" }),
      { status: 500 }
    );
  }
};

export const config = {
  path: "/.netlify/functions/livescores"
};
