import Head from "next/head";
import { useQuery } from "@apollo/client";

import QUERY_CHARACTERS from "./queryCharacters.graphql";
import { Wrapper, WrapperCountries } from "../styles/styles";
import { Col } from "react-bootstrap";

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_CHARACTERS);

  if (error) {
    return <p>:( an error happened</p>;
  }

  console.log(data);
  return (
    <Col>
      <Head>
        <title>Países</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Rick and Morty</h1>

      {loading && <p>Carregando...</p>}

      <WrapperCountries>
        {data?.characters.results.map((character) => (
          <Wrapper>
            <div>Nome:{character.name}</div>
            <div>
              <span lang="pt-br">{character.status}</span>
            </div>
            <div>
              <img src={character.image}></img>
            </div>
          </Wrapper>
        ))}
      </WrapperCountries>
    </Col>
  );
}
