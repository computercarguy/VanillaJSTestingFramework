class UnitTests {
    // Make helper methods static so they don't show up in the UI list of tests

    static message = "Helper method message";

    Testing() {
        return [true, "Testing method"];
    }

    async Testing2() {
        // Tests can be awaited and even programatically delayed
        await TestFramework.sleep(2000);

        return [false, "Testing method2"];
    }

    TestUsingHelperMethod() {
        return [true, this.constructor.HelperMethod()];
    }

    static HelperMethod() {
        return this.message;
    }
}
