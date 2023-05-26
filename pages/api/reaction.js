import root from "./root.js";
export default async function (req, res) {
  const id = req.body.id;
  const reaction = req.body.reaction;
  try {
    let data = await fetch(`${root}/react_vector_store_index_002/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reaction: reaction }),
    });
    res.status(200).json(data.json());
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
