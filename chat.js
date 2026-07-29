import { Client, Account, Functions } 
from "https://cdn.jsdelivr.net/npm/appwrite@17.0.0/+esm";

const client = new Client();

client
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("6a65dc6f001ec46f8d10");

const functions = new Functions(client);

const chatBtn = document.getElementById("chatbot-btn");
const chatWindow = document.getElementById("chat-window");
const closeBtn = document.getElementById("close-chat");
const sendbtn = document.getElementById("send-btn");

sendbtn.onclick = async () => {
    const input = document.getElementById("user-input");
    const chatBody = document.getElementById("chat-body");

    if (input.value.trim() === "") return;

    // User message
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = input.value;
    chatBody.appendChild(userMessage);

    const question = input.value;
    input.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const result = await functions.createExecution(
            "6a65dda500331424ba00",
            question
        );

        // Bot message
        const botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.textContent = result.responseBody;

        chatBody.appendChild(botMessage);

        chatBody.scrollTop = chatBody.scrollHeight;

    } catch (error) {
        console.error(error);
        const botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.textContent = "Sorry, something went wrong. Please try again later.";

        chatBody.appendChild(botMessage);

        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

chatBtn.onclick = () => {
    chatWindow.style.display = "flex";
};

closeBtn.onclick = () => {
    chatWindow.style.display = "none";
};

