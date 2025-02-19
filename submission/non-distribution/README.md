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


# M1: Serialization / Deserialization


## Summary

My implementation comprises two major software components which include the serialization and deserialization compoentns  totaling around 160 lines of code. Key challenges included serializing and deserializing circular objects specifically dealing with the references to themselves as well as dealing with circular arrays and functions.


## Correctness & Performance Characterization


> Describe how you characterized the correctness and performance of your implementation


*Correctness*: I wrote 5 tests and they test the following cases 
1. sample test
2. tests an empty object structure is maintained after serializing and deserializing it
3. tests an object with nested structure is correctly returned after being serialized and deserialized
4. tests that an object with different data types is correctly serialized and deserialized
5. tests that an object with functions has its structure maintained after being serialized and deserialized



related to serialization and deserialization
I also tested the performance of my program by including within my testing file the peformance library. I placed a timer for all serialization and deserialization operations that checks the amount of time for each operation and then computes the average at the end and logs it using console.log. In this way I have statistics for the average serialization time across all tests, the average deserialization time across all tests, and the serialization and deserialization times for each indivudal test as well as the averages for the combined for all tests and for each individual test. I ran this in my local development environment through the terminal as well as the EC2 AWS node to check performance across different environments.



*Performance*: The latency of various subsystems is described in the `"latency"` portion of package.json. The characteristics of my development machines are summarized in the `"dev"` portion of package.json.


# M2: Actors and Remote Procedure Calls (RPC)


## Summary

> Summarize your implementation, including key challenges you encountered. Remember to update the `report` section of the `package.json` file with the total number of hours it took you to complete each task of M2 (`hours`) and the lines of code per task.


My implementation comprises 4 software components, totaling 370 lines of code. Key challenges included `<1, 2, 3 + how you solved them>`.


## Correctness & Performance Characterization

> Describe how you characterized the correctness and performance of your implementation


*Correctness*: I wrote 5 tests that validate the correctness of the routing (`routes`), communication (`comm`), and status retrieval (`status`). These tests ensure that:
- Correct statuses are returned for each node.
- Remote function calls return expected values.
- Invalid requests return appropriate errors..


*Performance*: I characterized the performance of comm and RPC by sending 1000 service requests in a tight loop. Average throughput and latency is recorded in `package.json`.


## Key Feature

> How would you explain the implementation of `createRPC` to someone who has no background in computer science — i.e., with the minimum jargon possible?

Imagine you and a friend are in different rooms, and you want to ask them to do something for you. Normally, you'd shout through a door or send a message. `createRPC` works the same way but for computers: it lets one computer ask another computer to run a function** as if it were local.

For example, if a computer A has a function called `addOne`, another computer B can call it remotely using `createRPC`. The system automatically routes the request to the right place, ensures it gets processed, and sends back the result. It’s like sending a letter and getting an instant reply!

This functionality is built on the routes, status, and comm modules, ensuring that services are correctly registered, requested, and executed. The implementation is tested with multiple unit and integration tests to verify accuracy and performance.


