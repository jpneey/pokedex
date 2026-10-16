export const getLocalImage = (id) =>
    import.meta.env.BASE_URL + "images/" + String(id).padStart(3, '0') + ".png";

export const getImage = (id) =>
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + id + ".svg";

// @error handler: swaps to the local sprite once if the dream world image fails.
export const onImageError = (e, id) => {
    const img = e.target;
    if (img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.src = getLocalImage(id);
};
