class Example {
    // This is going to be your main JS class.
    // Everything you do stems from here.
    // What's here is only what you need to add to your class to get the JS Test Framework to run.

    testScriptsLoaded = 0;
    testScripts = ["testFramework/testFramework.js", "unitTesting.js"];

    constructor() {
        // This prevents the test framework from running on your production host server without
        // needing to change your code when you publish.
        if (["localhost", "127.0.0.1", ""].indexOf(location.hostname) !== -1) {
            this.SetupTesting();
        }
    }

    SetupTesting() {
        this.testScripts.forEach((item) => {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = item;
            script.onload = this.ScriptHelper.bind(this);

            document.head.appendChild(script);
        });
    }

    ScriptHelper() {
        this.testScriptsLoaded++;

        if (this.testScriptsLoaded === this.testScripts.length) {
            document.getElementById("warning").style.display = "none"; // Only necessary in this example.
            new UnitTesting(this);
        }
    }
}
