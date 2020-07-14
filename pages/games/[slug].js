import _ from "lodash";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchSingleGame, clearSingleGame } from "../../actions/gameActions";

import GameDetail from "../../components/games/GameDetail";

const Game = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const { currentGame, loadedOnce } = useSelector(state => state.game);

  useEffect(() => {
    if (slug) dispatch(fetchSingleGame(slug));
    return () => {
      dispatch(clearSingleGame());
    };
  }, [dispatch, slug]);

  return (
    <>
      <Head>
        <title>Create Next App Game</title>
      </Head>

      <main>
        {_.size(currentGame) && loadedOnce ? (
          <GameDetail game={currentGame} />
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Game;
