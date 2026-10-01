function containsDuplicate(numbers){
const seen = new Set();
for (const number of numbers){
if (seen.has(number)){
return true;
}
seen.add(number);
}
return false;
}
