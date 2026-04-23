export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ ok: false, error: 'Invalid JSON body' }, 400);
    }

    const validation = validatePayload(payload);
    if (!validation.ok) {
      return json({ ok: false, error: validation.error }, 400);
    }

    const bookingId = `JKS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const lead = {
      booking_id: bookingId,
      created_at: new Date().toISOString(),
      ip: request.headers.get('CF-Connecting-IP') || '',
      user_agent: request.headers.get('User-Agent') || '',
      ...sanitizePayload(payload)
    };

    const tasks = [];

    if (env.RESEND_API_KEY && env.NOTIFY_EMAIL_TO && env.NOTIFY_EMAIL_FROM) {
      tasks.push(sendEmailByResend(env, lead));
    }

    if (env.SLACK_WEBHOOK_URL) {
      tasks.push(sendWebhook(env.SLACK_WEBHOOK_URL, {
        text: `📥 New lead ${bookingId}\nName: ${lead.name}\nContact: ${lead.contact}\nService: ${lead.service_type}\nTime: ${lead.preferred_datetime}`
      }));
    }

    if (env.LINE_WEBHOOK_URL) {
      tasks.push(sendWebhook(env.LINE_WEBHOOK_URL, {
        booking_id: bookingId,
        name: lead.name,
        contact: lead.contact,
        service_type: lead.service_type,
        preferred_datetime: lead.preferred_datetime,
        language: lead.language,
        message: lead.message
      }));
    }

    await Promise.allSettled(tasks);

    return json({ ok: true, booking_id: bookingId }, 200);
  }
};

function validatePayload(payload) {
  const required = ['name', 'contact', 'service_type', 'preferred_datetime', 'message', 'language', 'utm_source', 'utm_medium', 'utm_campaign'];
  for (const key of required) {
    if (!payload[key] || typeof payload[key] !== 'string') {
      return { ok: false, error: `Missing required field: ${key}` };
    }
  }

  if (payload.company_website) {
    return { ok: false, error: 'Spam rejected' };
  }

  const startedAt = Date.parse(payload.form_started_at || '');
  if (!startedAt || Date.now() - startedAt < 3000) {
    return { ok: false, error: 'Submitted too quickly' };
  }

  return { ok: true };
}

function sanitizePayload(payload) {
  const pick = ['name', 'contact', 'service_type', 'preferred_datetime', 'message', 'language', 'utm_source', 'utm_medium', 'utm_campaign'];
  return Object.fromEntries(pick.map((k) => [k, String(payload[k] || '').trim()]));
}

async function sendEmailByResend(env, lead) {
  const body = {
    from: env.NOTIFY_EMAIL_FROM,
    to: [env.NOTIFY_EMAIL_TO],
    subject: `New booking lead ${lead.booking_id}`,
    text: [
      `Booking ID: ${lead.booking_id}`,
      `Name: ${lead.name}`,
      `Contact: ${lead.contact}`,
      `Service: ${lead.service_type}`,
      `Preferred time: ${lead.preferred_datetime}`,
      `Language: ${lead.language}`,
      `Message: ${lead.message}`,
      `UTM: ${lead.utm_source}/${lead.utm_medium}/${lead.utm_campaign}`
    ].join('\n')
  };

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

async function sendWebhook(url, body) {
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(),
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
