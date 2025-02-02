class TestFramework {
    constructor(
        buttonTarget = "emptyCell",
        testsType = "Unit",
        allScripts,
        availableTestMethods,
        finishSetup,
        striped = true,
        stripesColor = "rgb(210, 240, 255)"
    ) {
        this.buttonTarget = buttonTarget;
        this.testsType = testsType;
        this.allScripts = allScripts;
        this.availableTestMethods = availableTestMethods;
        this.FinishSetup = finishSetup;
        this.striped = striped;
        this.stripesColor = stripesColor;

        this.id = Math.random().toString(36).substring(2, 7);
    }

    PopulateTests(testList) {
        testList.forEach((element) => {
            this.GetAllMethods(element[0]).forEach((name) => {
                this.availableTestMethods.push({
                    classObject: element[1],
                    methodName: name,
                    className: element[1].constructor.name
                });
            });
        });

        this.ListTests();
    }

    ListTests() {
        var testList = document.getElementById(this.id + "testList");
        var centered = "width: 100%; text-align: center;";
        var col1 = "style='width: 101px;'";
        var col2 = "style='width: 144px;'";
        var col3 = "style='width: 159px;'";
        var col4 = "style='width: 171px;'";
        var col5 = "style='width: 226px;'";

        this.availableTestMethods.forEach((testMethod, i) => {
            var row = document.createElement("tr");
            row.innerHTML = `
                <td ${col1}><img id='${this.id}status${i}' style='${centered}' src='testFramework/images/led-grey-black.svg' height='20px'></td>
                <td ${col2}><input type="checkbox" id='${this.id}select${i}' value="${i}"></td>
                <td ${col3}><button type="button" id='${this.id}runTest_${i}'>Run Test</button></td>
                <td ${col4}>${testMethod.className}</td>
                <td ${col5}>${testMethod.methodName}</td>`;

            if (this.striped && i % 2 === 0) {
                row.style.backgroundColor = this.stripesColor;
            }

            testList.appendChild(row);
        });

        this.UpdateStatus();

        this.availableTestMethods.forEach((_, i) => {
            document.getElementById(`${this.id}runTest_${i}`).onclick =
                this.RunTest.bind(this);
        });
    }

    AddTestingScripts() {
        this.allScripts.forEach((item) => {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = item;
            script.onload = this.ScriptHelper.bind(this);

            document.head.appendChild(script);
        });
    }

    CreateUnitTestElements() {
        var unitTestButton = document.createElement("button");
        unitTestButton.type = "button";
        unitTestButton.innerHTML = this.testsType + " Tests";
        unitTestButton.onclick = this.ShowTestsModal.bind(this);

        document.getElementById(this.buttonTarget).appendChild(unitTestButton);

        var mask = document.createElement("div");
        mask.id = this.id + "Mask";
        mask.style = `
            display: none;
            background: rgba(170, 170, 170, 0.75);
            width: 100%;
            height: 100%;
            z-index: 12;
            position: fixed;
            left: 0px;
            top: 0px;`;

        mask.onclick = this.HideTestsModal.bind(this);

        document.activeElement.appendChild(mask);

        var blockStyle = "style='display: block;'";
        var tbodyStyle = `style='display: block;
            max-height: 475px;
            overflow-y: auto;
            overflow-x: hidden;'`;
        var col1 = "width: 101px;";
        var col2 = "width: 144px;";
        var col3 = "width: 159px;";
        var col4 = "width: 171px;";
        var col5 = "width: 226px;";
        var modal = document.createElement("div");
        modal.style = `
            display: none;
            width: 800px;
            height: 550px;
            background-color: white;
            position: fixed;
            left: 100px;
            top: 15px;
            white-space: wrap;
            font-family: Arial;
            font-size: 15pt;
            z-index: 7;
            overflow: hidden;
            border-style: solid;
            padding: 10px;
        `;
        modal.id = this.id + "Modal";
        modal.style.zIndex = 13;
        modal.innerHTML = `<label style='font-size: 15pt !important; font-family: Arial;'>Unit Tests:</label>
            <label for='${this.id}closeModalDuringTesting' style='font-size: 10pt !important; font-family: Arial;'>Close Modal During Testing</label><input type='checkbox' id='${this.id}closeModalDuringTesting' />
            <div style='position:absolute; top: 5px; right: 5px; border:1px solid black;font-size: 10pt !important; font-family: Arial;padding:3px;'>
                <div style="width:100px; display: inline-block;">
                    <label for='${this.id}totalTests'>Total: <span id='${this.id}totalTests'>0</span>
                </div>
                <div style="width:100px; display: inline-block;">
                    <label for='${this.id}passedTests'>Passed: <span id='${this.id}passedTests'>0</span>
                </div>
                <br/>
                <div style="width:100px; display: inline-block;">
                    <label for='${this.id}failedTests'>Failed: <span id='${this.id}failedTests'>0</span>
                </div>
                <div style="width:100px; display: inline-block;">
                    <label for='${this.id}notRunTests'>Not Run: <span id='${this.id}notRunTests'>0</span>
                </div>
            </div>
            <br/>
            <div style='width: 500px;'>
                <div style='${col1} display: inline-block;'><button type'button' id='${this.id}runAllButton'>Run All Tests</button></div>
                <div style='${col2} display: inline-block;'><button type'button' id='${this.id}runSelectedButton'>Run Selected Tests</button></div>
                <div style='${col3} display: inline-block;'><button type'button' id='${this.id}testCloseButton'>Close</button></div>
            </div>
            <table>
                <thead ${blockStyle}>
                    <tr ${blockStyle}>
                        <th style='${col1}'>Status</th>
                        <th style='${col2}'>Select Tests <input type="image" id='${this.id}selectAll' src='testFramework/images/check2-square.svg' /> <input type="image" id='${this.id}selectNone' src='testFramework/images/uncheck2-square.svg' /></th>
                        <th style='${col3}'>Run Individual Test</th>
                        <th style='${col4}'>Unit Test Class</th>
                        <th style='${col5}'>Unit Test Name</th>
                    </tr>
                </thead>
                <tbody id='${this.id}testList' ${tbodyStyle}></thead>
            </table>`;

        document.activeElement.appendChild(modal);

        document.getElementById(this.id + "testCloseButton").onclick =
            this.HideTestsModal.bind(this);
        document.getElementById(this.id + "runSelectedButton").onclick =
            this.RunSelectedTests.bind(this);
        document.getElementById(this.id + "runAllButton").onclick =
            this.RunAllTests.bind(this);
        document.getElementById(this.id + "selectAll").onclick =
            this.SelectAll.bind(this);
        document.getElementById(this.id + "selectNone").onclick =
            this.SelectNone.bind(this);
    }

    UpdateStatus() {
        var passed = 0;
        var failed = 0;
        var notrun = 0;

        this.availableTestMethods.forEach(async (_, i) => {
            var img = document.getElementById(`${this.id}status${i}`);
            switch (img.src.split("-")[1]) {
                case "red":
                    failed++;
                    break;
                case "grey":
                    notrun++;
                    break;
                case "green":
                    passed++;
                    break;
            }
        });

        document.getElementById(`${this.id}totalTests`).innerText =
            this.availableTestMethods.length;
        document.getElementById(`${this.id}passedTests`).innerText = passed;
        document.getElementById(`${this.id}failedTests`).innerText = failed;
        document.getElementById(`${this.id}notRunTests`).innerText = notrun;
    }

    ShowTestsModal() {
        document.getElementById(this.id + "Mask").style.display = "block";
        document.getElementById(this.id + "Modal").style.display = "block";
    }

    HideTestsModal() {
        document.getElementById(this.id + "Mask").style.display = "none";
        document.getElementById(this.id + "Modal").style.display = "none";
    }

    ScriptHelper() {
        if (this.scriptsLoaded == undefined) {
            this.scriptsLoaded = 0;
        }

        this.scriptsLoaded++;

        if (this.scriptsLoaded === this.allScripts.length) {
            this.FinishSetup();
        }
    }

    RunSelectedTests() {
        var closeModal = document.getElementById(
            `${this.id}closeModalDuringTesting`
        ).checked;

        if (closeModal) {
            this.HideTestsModal();
        }

        // Reset all the indicators on the selected tests so there's no confusion as to which tests have run.
        this.availableTestMethods.forEach(async (_, i) => {
            if (document.getElementById(`${this.id}select${i}`).checked) {
                var img = document.getElementById(`${this.id}status${i}`);
                img.src = "testFramework/images/led-grey-black.svg";
            }
        });

        this.availableTestMethods.forEach(async (_, i) => {
            if (document.getElementById(`${this.id}select${i}`).checked) {
                await this.DoTest(i);
            }
        });

        if (closeModal) {
            this.ShowTestsModal();
        }
    }

    RunAllTests() {
        var closeModal = document.getElementById(
            `${this.id}closeModalDuringTesting`
        ).checked;

        if (closeModal) {
            this.HideTestsModal();
        }

        // Reset all the indicators so there's no confusion as to which tests have run.
        this.availableTestMethods.forEach(async (_, i) => {
            var img = document.getElementById(`${this.id}status${i}`);
            img.src = "testFramework/images/led-grey-black.svg";
        });

        this.availableTestMethods.forEach(async (_, i) => {
            await this.DoTest(i);
        });

        if (closeModal) {
            this.ShowTestsModal();
        }
    }

    async RunTest(event) {
        var closeModal = document.getElementById(
            `${this.id}closeModalDuringTesting`
        ).checked;

        if (closeModal) {
            this.HideTestsModal();
        }

        var index = event.target.id.split("_")[1] * 1;
        await this.DoTest(index);

        if (closeModal) {
            this.ShowTestsModal();
        }
    }

    async DoTest(index) {
        var test = this.availableTestMethods[index];
        var img = document.getElementById(`${this.id}status${index}`);
        img.src = "testFramework/images/led-yellow-black.svg";

        var results = await test.classObject[test.methodName]();
        // console.log(results);

        if (results && results.length === 2) {
            img.src = results[0]
                ? "testFramework/images/led-green-black.svg"
                : "testFramework/images/led-red-black.svg";
            img.title = results[1];
        } else {
            img.src = "testFramework/images/led-red-black.svg";
            img.title =
                "Test results weren't in expected format. Please look at your browsers dev console for more information.";
            console.warn(`Test name: ${test.className}.${test.methodName}`);
            console.log("Your test results:", results);
            console.log("Expected test results format: [{boolean}, {string}]");
            console.log("");
        }

        this.UpdateStatus();
    }

    SelectAll() {
        this.availableTestMethods.forEach(
            (_, i) =>
                (document.getElementById(`${this.id}select${i}`).checked = true)
        );
    }

    SelectNone() {
        this.availableTestMethods.forEach(
            (_, i) =>
                (document.getElementById(
                    `${this.id}select${i}`
                ).checked = false)
        );
    }

    GetAllMethods(object) {
        return Object.getOwnPropertyNames(object.prototype).filter(
            (prop) => prop != "constructor"
        );
    }

    static ClickElement(id, times = 1) {
        for (var i = 0; i < times; i++) {
            document.getElementById(id).click();
        }
    }

    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// Written by Eric Ingamells
// For Eric's Gear
// EricsGear.com 2025
