import root from "./root.js";
export default async function (req, res) {
  try {
    const start_time = Date.now();
    let duration;
    const index_res = await fetch(`${root}/vector_store_index_002`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: req.body.input }),
    }).then((res) => {
      const end_time = Date.now();
      duration = end_time - start_time;
      return res;
    });
    let body = await index_res.json();
    body.duration = duration;
    res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
