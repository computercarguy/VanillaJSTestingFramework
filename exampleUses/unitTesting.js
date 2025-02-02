class UnitTesting {
    scope = null;

    availableTestMethods = [];
    allScripts = ["unitTests/UnitTests.js"];

    testFramework = new TestFramework(
        "emptyCell",
        "Unit",
        this.allScripts,
        this.availableTestMethods,
        this.PopulateClasses.bind(this)
    );

    constructor(scope) {
        this.scope = scope;

        this.testFramework.AddTestingScripts();
        this.testFramework.CreateUnitTestElements();
    }

    PopulateClasses() {
        var testList = [];

        testList.push([UnitTests, new UnitTests(this.scope)]);

        this.testFramework.PopulateTests(testList);
    }
}
