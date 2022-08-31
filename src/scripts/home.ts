import { os } from "./requiredLib";

const Greeting = (msg: string) => {
	document.querySelector(".content-home").textContent = msg;
};
Greeting(`Welcome back , ${os.userInfo().username}`);

