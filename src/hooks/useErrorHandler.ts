const TELEGRAM_BOT_TOKEN = "6563107658:AAH330VwjVV9vEJ1WbSZ3X37z9K_qMv0IL4"; 
const TELEGRAM_CHAT_ID = "713817126"; 

const headerOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};


const useErrorHandler = () => {

    const sendToTelegramBot = async (error: any) => {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            let errorMessage = "Unknown error occurred";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === "object" && error !== null) {
                errorMessage = JSON.stringify(error);
            } else {
                errorMessage = String(error);
            }

            const reponse = await fetch(url, {
                method: 'POST',
                headers: headerOptions,
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: errorMessage })
            })

            return await reponse.json();
        } catch (error) { }

        return null;
    }

    return { sendToTelegramBot }
}

export default useErrorHandler