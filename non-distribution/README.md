# M0: Setup & Centralized Computing

> Add your contact information below and in `package.json`.

* name: `Isaac Calderon`

* email: `isaac_calderon@brown.edu`

* cslogin: `iacalder`


## Summary

> Summarize your implementation, including the most challenging aspects; remember to update the `report` section of the `package.json` file with the total number of hours it took you to complete M0 (`hours`), the total number of JavaScript lines you added, including tests (`jsloc`), the total number of shell lines you added, including for deployment and testing (`sloc`).


My implementation consists of 7 components addressing T1--8. The most challenging aspect was implementing the process.sh component since I had little experience writing code in a shell language and as a result had trouble figuring out certain bugs. Another challenging component was implementing the getText.js component and making sure that it was robust enough in order to make sure my pipeline would pass some of the more complex tests such as the sandbox test and end-to-end tests. I also wrote a test in student-end-to-end that produces the throughput for crawling and indexing web pages as part of the performance section.


## Correctness & Performance Characterization


> Describe how you characterized the correctness and performance of your implementation.


To characterize correctness, I developed 7 tests and several mock files to use as inputs and expected outputs to test the following cases: 

I created mock data similar to the ones provided in the /d folder for writing additional tests. I tested cases such as when stemmed words were very similar to one another and cases where there were several different types of html tags in order to test that my getText.js component would work for potentially more complex html documents than the one used for the simple tests. I tested with a variety of different urls each in different formats and with certain key elements missing in order to make sure that my getURLs.js component was robust enough. For process I made a more robust input file that tests including words very similar to the stopwords as well as other edge cases such as unusual spacing and alignment to ensure that it returned the correct format every time.


*Performance*: The throughput of various subsystems is described in the `"throughput"` portion of package.json. The characteristics of my development machines are summarized in the `"dev"` portion of package.json.


## Wild Guess

> How many lines of code do you think it will take to build the fully distributed, scalable version of your search engine? Add that number to the `"dloc"` portion of package.json, and justify your answer below.

I guess that it will take around 10,000 lines of code to build the full distributed scalable version of the search engine. I base my estimate on previous projects where I have used tools such as Spring Boot which took a few thousand lines of code.