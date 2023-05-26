import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { FaHeartbeat } from "react-icons/fa";
import { IconContext } from "react-icons";
import Navigator from "../components/navigator";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown, faCircleUp } from "@fortawesome/free-regular-svg-icons";

export default function TreeIndex() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState();
  const [duration, setDuration] = useState("");
  const [id, setId] = useState();
  const [reaction, setReaction] = useState();
  const [isUnanswered, setIsUnanswered] = useState(false);

  async function getQns(event) {
    event.preventDefault();
    setResult("");
    setDuration("");
    try {
      const res = await fetch("/api/vector_store_index_davinci002", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: question }),
      });
      const jsonRes = await res.json();
      setResult(jsonRes.response || "Sorry. This question is unanswerable.");
      setDuration(`${jsonRes.duration / 1000}s`);
      setId(jsonRes.id);
      setReaction();
      setIsUnanswered(jsonRes.response == null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function sendReact(reaction) {
    fetch("/api/reaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, reaction: reaction }),
    });
    setReaction(reaction);
  }

  return (
    <div>
      <Head>
        <title>Llama Vector Store Index</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Navigator />
      <main className={styles.main}>
        <IconContext.Provider value={{ size: "5em" }}>
          <FaHeartbeat className={styles.icon} />
        </IconContext.Provider>
        <h3>Ask a Health Question</h3>
        <form onSubmit={getQns} style={{ marginBottom: "40px" }}>
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
        <ClipLoader loading={result == ""} size={50} />
        {result && (
          <>
            <div
              className={styles.result}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div>{result}</div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <FontAwesomeIcon
                  icon={faCircleUp}
                  style={{
                    height: "20px",
                    cursor: "pointer",
                    color: reaction == "UP" ? "#fc4903" : "#353740",
                  }}
                  onClick={() => sendReact("UP")}
                />
                <FontAwesomeIcon
                  icon={faCircleDown}
                  style={{
                    height: "20px",
                    cursor: "pointer",
                    color: reaction == "DOWN" ? "#022aad" : "#353740",
                  }}
                  onClick={() => sendReact("DOWN")}
                />
              </div>
            </div>
            <div>{duration}</div>
            <a className={styles.button}>Send to Human Responder</a>
          </>
        )}
      </main>
    </div>
  );
}
