# 🔼 Aura

Aura is a decentralized chat app powered by [XMTP](https://xmtp.org). With its secure encrypted messaging, ENS and Lens profiles, and seamless interoperability, Aura offers a user-friendly experience while prioritizing privacy and data security.

---

## Features ✨

Aura offers a range of exciting features that enhance your communication experience:

1. **Seamless Ethereum Integration**: Built on the XMTP network, Aura allows you to communicate with any Ethereum wallet. Connect with friends, colleagues, and contacts effortlessly, regardless of their chosen wallet.
2. **Interoperable Inbox**: Each user is provided with an interoperable inbox, giving you access to all XMTP messages you've exchanged, regardless of the app used to create them. Stay organized and keep track of your conversations in one convenient location.
3. **ENS and Lens Integration**: Aura simplifies communication by enabling you to send messages to any ENS domain and Lens profiles. Say goodbye to the hassle of entering long addresses and effortlessly start conversations with ease.
4. **Remote Attachment Support**: With Aura, you can send remote attachments using thirdweb. Whether it's images, videos, files, or more, easily share and collaborate with others by securely sending attachments within the app.
5. **User-Friendly UI**: Aura boasts an intuitive and easy-to-use interface that works seamlessly on both mobile and desktop screens. Enjoy a consistent and visually appealing experience across devices, making communication effortless and enjoyable.

---

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://ipfs.io/ipfs/Qmdm1t4Jh89ZhvAxsXFECzVzrHgRYsRK4woj3KmugvdD43/conversation.png" alt="Conversation" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://ipfs.io/ipfs/Qmdm1t4Jh89ZhvAxsXFECzVzrHgRYsRK4woj3KmugvdD43/attachments.png" alt="Attachments" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <img src="https://ipfs.io/ipfs/Qmdm1t4Jh89ZhvAxsXFECzVzrHgRYsRK4woj3KmugvdD43/create-attachment.png" alt="Create Attachment" >
    </td>
    <td valign="top" width="50%">
      <img src="https://ipfs.io/ipfs/Qmdm1t4Jh89ZhvAxsXFECzVzrHgRYsRK4woj3KmugvdD43/start-conversation.png" alt="Start Conversation" >
    </td>
  </tr>
</table>

---

## Video Demo 🎥

https://youtu.be/fdXjAnUzCVk

https://github.com/Envoy-VC/aura/assets/65389981/6b402346-4906-4bd5-909d-abe20253297c


---

## Tech Stack 💻

- [XMTP](https://xmtp.org/)
- [thirdweb](https://thirdweb.com/)
- [antd](https://ant.design/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## Getting Started 🚀

To get started with Arkway, the first step is to clone the GitHub repository. You can do this by running the following command in your terminal:

```bash
git clone https://github.com/Envoy-VC/aura.git
```

Next, you'll need to install the project's dependencies. You can do this by running the following command in your terminal:

```bash
npm install
```

Before running the dev server, you'll need to set up some environment variables. These variables include:

1. `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - Obtain your Wallet Connect API key from https://cloud.walletconnect.com/app
2. `NEXT_PUBLIC_ALCHEMY_API_KEY` - This key enables Aura to fetch ENS Profiles. Get your Alchemy API key from https://dashboard.alchemy.com
3. `NEXT_PUBLIC_XMTP_ENVIRONMENT` - Set the XMTP environment variable to either '_production_,' '_dev_,' or '_local_.' By default, it is set to '_production_.'

Great! You're almost ready to start using Arkway. The last step is to start the development server.

```bash
npm run dev
```

Go to http://localhost:3000 to test Aura

---
