export const searchCharities = async (query: string, cause: string) => {
    const response = await fetch(
        `https://partners.every.org/v0.2/search?query=${query}&causes=${cause}&apiKey=${process.env.REACT_APP_EVERY_API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    return data.nonprofits.map((nonprofit: any) => ({
        id: nonprofit.id,
        name: nonprofit.name,
        description: nonprofit.description,
        address: nonprofit.address || 'Address not provided', // Fallback for missing address
    }));
};
