import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { FaHeartbeat } from "react-icons/fa"
import { IconContext } from "react-icons";
import Navigator from "../components/navigator";
import ClipLoader from "react-spinners/ClipLoader";

export default function TreeIndex() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(' ');

  async function getQns(event) {
    event.preventDefault();
    setResult('');
    try {
      const res = await fetch("/api/tree_index", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: question }),
      })
      const jsonRes = await res.json();
      setResult(jsonRes.response);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <Navigator />
        <title>Llama Tree Index</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <IconContext.Provider value={{ size: "5em" }}>
          <FaHeartbeat className={styles.icon} />
        </IconContext.Provider>
        <h3>Ask a Health Question</h3>
        <form onSubmit={getQns} style={{marginBottom: "40px"}}>
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
        <ClipLoader loading={result == ''} size={50} />
        <div className={styles.result}>
          {result}
        </div>
      </main>
    </div>
  );
}
