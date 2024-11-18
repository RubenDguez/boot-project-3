export const searchCharities = async (queury: string) => {
    return fetch(`https://partners.every.org/v0.2/nonprofit/maps?apiKey=${process.env.REACT_APP_EVERY_API_KEY}&query=${queury}`)
        .then((res) => res.json())
        .then((data) => data);
}
