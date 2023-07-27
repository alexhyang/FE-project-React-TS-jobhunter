import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../env";

import ListingTable from "./ListingTable";
import { IPostingGet } from "interfaces";

const fields = [
  "jobTitle",
  "jobLevel",
  "company",
  "location",
  "applicationDueDate",
  "other"
]

export default function Home() {
  const [data, setData] = useState<IPostingGet[]>();
  useEffect(() => {
    axios
      .get(`${baseURL}/api/postings?limit=20&sort=-applicationDueDate&fields=${fields.toString()}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!data || data.length == 0) return <h1>No Posting found</h1>;
  return (
    <>
      <h1>{`Posting List (${data.length} in total)`}</h1>
      <ListingTable data={data} />
    </>
  );
}
