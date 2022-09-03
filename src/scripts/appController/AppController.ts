export default class AppController {
	private config = {
		version: "1.0.1",
	};
	private Scripts: Array<Function> = [];

	public pushScript(script: Function) {
		this.Scripts.push(script);
	}
	public pushArrayOfScripts(scripts: Array<Function>) {
		this.Scripts = [...this.Scripts, ...scripts];
	}
	public startApp() {
		console.log(this.Scripts);
		this.Scripts.forEach((script) => {
			script();
		});
	}
    public get getVersion(){
        return this.config.version
    }
}
