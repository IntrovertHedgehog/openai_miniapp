import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { FaHeartbeat } from "react-icons/fa"
import { IconContext } from "react-icons";


export default function Home() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState();
  const [options, setOptions] = useState([]);


  // async function onSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("/api/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ question: question }),
  //     });

  //     const data = await response.json();
  //     if (response.status !== 200) {
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }

  //     setResult(data.result);
  //     setQuestion("");
  //   } catch (error) {
  //     // Consider implementing your own error handling logic here
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

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
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
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
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
