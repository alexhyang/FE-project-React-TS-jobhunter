import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../../env";

import PostingCard from "./PostingCard";
import { IPostingGet } from "interfaces";

export default function Posting() {
  const { id } = useParams<string>();
  const [data, setData] = useState<IPostingGet>();
  useEffect(() => {
    axios
      .get(`${baseURL}/api/postings/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!data) return <h1>{"Error occurs when fetching posting"}</h1>;
  return <PostingCard data={data} />;
}
