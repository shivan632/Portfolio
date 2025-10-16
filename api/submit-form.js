export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { full_name, email, subject, message } = req.body;

  const accessKey = process.env.key;

  if (!accessKey) {
    console.error("❌ WEB3FORM_KEY is not defined!");
    return res.status(500).json({ message: "Missing access key" });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: full_name, // Now using full_name
      full_name,
      email,
      subject,
      message
    })
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}