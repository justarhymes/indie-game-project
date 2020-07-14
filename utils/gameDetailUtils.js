export const filterTags = tags => {
  return tags.filter(tag => tag.language === "eng");
};

export const filterGenres = genres => {
  return genres.filter(genre => genre !== "indie");
};
