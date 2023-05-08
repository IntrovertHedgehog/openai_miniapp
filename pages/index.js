import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { FaHeartbeat } from "react-icons/fa"
import { IconContext } from "react-icons";
import Navigator from "../components/navigator";


export default function Home() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState();
  const [options, setOptions] = useState([]);

  async function getQns(event) {
    event.preventDefault();
    setResult('');
    try {
      const top3 = await fetch("/api/embbeding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: question }),
      })
      setOptions(await top3.json());
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Embbeding</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Navigator />
      <main className={styles.main}>
        <IconContext.Provider value={{ size: "5em" }}>
          <FaHeartbeat className={styles.icon} />
        </IconContext.Provider>
        <h3>Ask a Health Question</h3>
        <form onSubmit={getQns}>
          <input
            type="text"
            name="question"
            placeholder="Enter a Question"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              console.log(question);
            }}
          />
          <input type="submit" value="Submit" />
        </form>
        {options.map((option) =>
          <button onClick={() => setResult(option.answer)}>
            {option.question}
          </button >
        )}
        <div className={styles.result}>
          {result}
        </div>
      </main>
    </div>
  );
}
