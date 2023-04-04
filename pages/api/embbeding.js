export default async function (req, res) {
  try {
    const top3 = await fetch("https://oyster-app-99rix.ondigitalocean.app/embbeding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: req.body.input }),
    });
    
    res.status(200).json(await top3.json());
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
