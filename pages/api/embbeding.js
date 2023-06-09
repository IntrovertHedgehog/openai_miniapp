import root from './root.js'
export default async function (req, res) {
  try {
    const top3 = await fetch(`${root}/embbeding`, {
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
