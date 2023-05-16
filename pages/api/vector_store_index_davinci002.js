import root from './root.js'
export default async function (req, res) {
  try {
    const index_res = await fetch(`${root}/vector_store_index_002`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: req.body.input }),
    });
    
    res.status(200).json(await index_res.json());
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
