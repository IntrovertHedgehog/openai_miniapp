import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { FaHeartbeat } from "react-icons/fa"
import { IconContext } from "react-icons";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: question }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setQuestion("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <IconContext.Provider value={{ size: "5em" }}>
          <FaHeartbeat className={styles.icon} />
        </IconContext.Provider>
        <h3>Ask a Health Question</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter a Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input type="submit" value="Send" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
