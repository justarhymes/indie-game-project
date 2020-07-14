import _ from "lodash";
import Link from "next/link";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import { filterGenres, filterTags } from "../../utils/gameDetailUtils";

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.15)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  headerLink: {
    display: "inline-block",
    marginBottom: "1rem",
    color: theme.palette.secondary.main
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

const renderGameGenres = genres => {
  const cats = filterGenres(genres);
  return _.map(cats, cat => (
    <Chip color="primary" key={cat.slug} label={cat.name} />
  ));
};

const renderGameTags = tags => {
  const cats = filterTags(tags);
  return _.map(cats, tag => (
    <Chip
      variant="outlined"
      color="secondary"
      key={tag.slug}
      label={tag.name}
    />
  ));
};

const GameDetail = ({ game }) => {
  const classes = useStyles();

  return (
    <>
      <Paper
        square
        className={classes.mainFeaturedPost}
        style={{ backgroundImage: `url(${game.background_image})` }}
      >
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {game.name}
              </Typography>
              {game.website ? (
                <div>
                  <a
                    className={classes.headerLink}
                    href={game.website}
                    target="_blank"
                  >
                    {game.website}
                  </a>
                </div>
              ) : (
                ""
              )}
              <div className={classes.chips}>
                {renderGameGenres(game.genres)}
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Container>
        <div>
          <div dangerouslySetInnerHTML={{ __html: game.description }} />
          <div className={classes.chips}>{renderGameTags(game.tags)}</div>
          <Link href="/" as="/">
            Back to games
          </Link>
        </div>
      </Container>
    </>
  );
};

export default GameDetail;
