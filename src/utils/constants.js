export const BASE_URL = 'https://api.bevuxynadiploma.nomoredomains.sbs';

export const BASE_BEATFILMMOVIES_URL = 'https://api.nomoreparties.co';

export const DEVICE_WIDTH_1280 = 1280;
export const DEVICE_WIDTH_1100 = 1100;
export const DEVICE_WIDTH_768 = 768;
export const DEVICE_WIDTH_625 = 625;
export const DEVICE_WIDTH_480 = 480;
export const DEVICE_WIDTH_320 = 320;

export const MAX_CARDS = 120;

export function handleMovieDuration(duration, movie) {
    if (duration === 60) {
        return `1 ч`;
    }

    if (duration === 120) {
        return `2 ч`;
    }

    if (duration > 120) {
        return `2 ч ${movie.duration - 120} м`;
    }

    if (duration > 60 && duration < 120) {
        return `1 ч ${movie.duration - 60} м`;
    }

    if (duration < 60) {
        return `${movie.duration} м`;
    }
}