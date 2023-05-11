export default async function (req, res) {
  try {
    const index_res = await fetch("https://oyster-app-99rix.ondigitalocean.app/vector_store_index", {
    // const index_res = await fetch("http://127.0.0.1:5000/tree_index", {
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
