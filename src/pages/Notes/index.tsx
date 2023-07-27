import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "env";
import { IPostingGet } from "interfaces";

import NotesTable from "./NotesTable"

export default function Notes() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IPostingGet[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    axios
      .get(`${baseURL}/api/summaries/notes`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError("Error when fetching postings");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Notes</h1>
      {loading && <p>Loading...</p>}
      {data && <NotesTable data={data} />}
      {error && <p>{error}</p>}
    </>
  );
}
