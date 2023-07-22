import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../env";
import { Skill } from "./interfaces";

import WordCloud from "./WordCloud";
import "./skills.css";

export default function Skills() {
  const [data, setData] = useState<Skill[]>();
  useEffect(() => {
    axios
      .get(`${baseURL}/api/skills`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Skills</h1>
      {data ? <WordCloud data={data} /> : <p>Loading...</p>}
    </>
  );
}
