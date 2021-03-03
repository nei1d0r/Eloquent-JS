// REGEXP GOLF ------------------------------------------------------- (I'm sure these could be shorter...)

verify(/ca(t|r)/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/\b\w+(ious)\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s[\.,;:]/,
       ["bad punctuation ."],
       ["escape the period"]);

verify(/\w{6,}/,
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

verify(/\b[^\seE]+\b/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}

// QUOTING STYLE -------------------------------------------------------------

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
const regex = /(^)'|(\W)'|'(\W)|'($)/g
console.log(text.replace(regex, "$1$2\"$3"));
// → "I'm the cook," he said, "it's my job."

// NUMBERS AGAIN ------------------------------------------------------------ It works, but it's verbose AF!!!

// Fill in this regular expression.
let number = /^(-|\+)?([0-9]+)?(\.\w|\w\.)?(e|E-|e\+)?([0-9]+)?$/ 

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
