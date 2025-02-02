# VanillaJSTestingFramework
This is a unit and integration framework for vanilla JavaScript.

This is a work in progress. And it's an early version, too.

There's a lot of functionality to make this look and work like a standard unit and/or integration testing framework as you'd see in Visual Studio, VSCode, or other IDE, but this works in the browser and essentially inserts itself into your web page/site.

Look at the example to see how to use it. It's pretty simple to set up, if I do say so myself. ;-)

I'd advise against publishing this framework with your website, even though I've added logic in the example code to prevent it from running on anything other than a local machine.

BTW, you don't even have to publish this on a local hosting service, like IIS or Apache. You can drag your HTML file to a browser window to run your page or website, and it won't affect the functionality of this framework. In fact, the project I was working on while building this framework was run directly in the browser without IIS or Apache running.

At the moment, I haven't created any integration testing for my own project, so I don't have any example integration tests, but there is a *ClickElement* method to make clicking on buttons easier. There's also a *sleep* method so you can slow your integration tests down a bit. This should be a non-blocking delay, so you can time clicks, validation, and other checks you may need to do that are supposed to be done asynchronously. However, awaiting the method will make it a blocking call.

The idea behind this project was to make vanilla JavaScript testing simple, by not having to update the test framework every time you added another method, just like a testing framework in an IDE automatically recognizes new tests. The difference is that you still have to reload your site before it'll recognize the new tests, but if you use an auto-reloading feature in something like VSCode, then it should reload the test files, too.

People like to say that you can't do unit or integration testing on vanilla JavaScript. Well, I think those people are lazy and don't understand that's basically what all JavaScript testing suites do, they just hide it in a spiffy wrapper. And this project proves the nay-sayers wrong, because now you can easily do it. And I'm sure I'm not the only person who's written this kind of framework before.