import _ from "lodash";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    height: "100%"
  },
  platformWrap: {
    display: "flex",
    alignItems: "center"
  },
  platformImg: {
    width: "40px",
    height: "auto",
    marginRight: "0.5rem"
  },
  platformImgPC: {
    width: "25px"
  },
  control: {
    padding: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

const buildPlatformClasses = (normClass, pcClass, slug) => {
  let classList = normClass;

  if (slug === "pc") classList = `${normClass} ${pcClass}`;

  return classList;
};

const checkPlatform = (platform, slug, { platformImg, platformImgPC }) => {
  if (
    platform.slug === "playstation4" ||
    platform.slug === "nintendo-switch" ||
    platform.slug === "xbox-one" ||
    platform.slug === "pc"
  ) {
    return (
      <div>
        <img
          className={buildPlatformClasses(
            platformImg,
            platformImgPC,
            platform.slug
          )}
          key={`${slug}-${platform.slug}`}
          src={`/platforms/${platform.slug}.png`}
          alt={platform.slug}
        />
      </div>
    );
  }

  return "";
};

const renderPlatforms = ({ slug, platforms }, classes) => {
  return _.map(platforms, item => {
    return checkPlatform(item.platform, slug, classes);
  });
};

const GameCollection = ({ games }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      {_.map(games, game => (
        <Grid key={game.id} item xs={12} md={4}>
          <Card className={classes.card}>
            <Link href="/games/[slug]" as={`/games/${game.slug}`}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={game.short_screenshots[0].image}
                  title={game.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {game.name}
                  </Typography>
                  <div className={classes.platformWrap}>
                    {renderPlatforms(game, classes)}
                  </div>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GameCollection;
