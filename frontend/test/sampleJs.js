// 1. console.log
console.log("Hello from Vanilla JS!");

// 2. if, else if, else
let num = 15;

if (num < 10) {
  console.log("Number is less than 10");
} else if (num === 15) {
  console.log("Number is exactly 15");
} else {
  console.log("Number is something else");
}

// 3. switch case
let color = "blue";

switch (color) {
  case "red":
    console.log("Color is red");
    break;
  case "blue":
    console.log("Color is blue");
    break;
  default:
    console.log("Unknown color");
}

// 4. for loop
for (let i = 1; i <= 3; i++) {
  console.log("For loop iteration:", i);
}

// 5. while loop
let count = 0;

while (count < 3) {
  console.log("While loop count:", count);
  count++;
}

// 6. function
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Thabendra"));

// 7. try-catch-finally
try {
  let result = 10 / 0; // No error, but not useful
  console.log("Result:", result);

  // Let's force an error
  throw new Error("Something went wrong!");

} catch (error) {
  console.log("Caught error:", error.message);

} finally {
  console.log("This runs no matter what (finally block)");
}
