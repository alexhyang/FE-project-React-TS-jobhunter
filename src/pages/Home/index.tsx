import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "env";

import ListingTable from "./ListingTable";
import { IPostingGet } from "interfaces";

const fields = [
  "jobTitle",
  "jobLevel",
  "company",
  "location",
  "applicationDueDate",
  "other"
];

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IPostingGet[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    axios
      .get(
        `${baseURL}/api/postings?limit=20&sort=-applicationDueDate&fields=${fields.toString()}`
      )
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
      <h1>Postings</h1>
      {loading && <p>Loading...</p>}
      {data && <ListingTable data={data} />}
      {error && <p>{error}</p>}
    </>
  );
}
