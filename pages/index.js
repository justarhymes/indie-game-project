import _ from "lodash";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchGameCollection } from "../actions/gameActions";

import GameCollection from "../components/games/GameCollection";

const Home = () => {
  const dispatch = useDispatch();
  const { collection, loadedOnce } = useSelector(state => state.game);

  useEffect(() => {
    dispatch(fetchGameCollection(1));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          {_.size(collection) && loadedOnce ? (
            <GameCollection games={collection} />
          ) : (
            ""
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
