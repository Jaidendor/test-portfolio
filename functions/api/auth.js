export async function onRequestGet(context) {
    const { env } = context;
    const clientId = env.GITHUB_CLIENT_ID;

    const state = crypto.randomUUID();

    const params = new URLSearchParams({
        client_id: clientId,
        scope: "repo,user",
        state,
    });

    const redirectUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

    return new Response(null, {
        status: 302,
        headers: {
            Location: redirectUrl,
            "Set-Cookie": `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
        },
    });
}