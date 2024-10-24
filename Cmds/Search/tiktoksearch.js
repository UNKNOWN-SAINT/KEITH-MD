module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        if (!text) {
            return m.reply('Provide TikTok username.');
        }

        const query = encodeURIComponent(text);
        const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${query}`);

        if (!response.ok) {
            return m.reply('Error fetching data from API.');
        }

        const results = await response.json();

        // Check if results contain the expected data structure
        if (!results || results.length < 1 || !results[0].nowm) {
            return m.reply('Invalid username or no results found.');
        }

        const item = results[0]; 
        const title = item.title || 'N/A';
        const info = item.url || 'N/A';
        const region = item.region || 'N/A';
        const creator = item.creator || 'N/A';
        const id = item.nowm; 
        const imageUrl = item.imageUrl || ''; 

        const message = `*KEITH-MD TIKTOK SEARCH*\n\nTitle: ${title}\n\nInfo: ${info}\n\nRegion: ${region}\n\nCreator: ${creator}\n\nId: ${id}`;

        if (imageUrl) {
            await client.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { quoted: m });
        } else {
            await client.sendMessage(m.chat, { text: message }, { quoted: m });
        }
    } catch (error) {
        console.log("Error occurred:", error);
        return m.reply('An error occurred while processing your request.' + error);
    }
};
