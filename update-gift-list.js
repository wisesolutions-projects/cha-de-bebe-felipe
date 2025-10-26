const fs = require('fs');

// Read the file with the new list
const newListContent = fs.readFileSync('guest-list-complete.txt', 'utf8');

// Read the current page.tsx
const pageContent = fs.readFileSync('app/page.tsx', 'utf8');

// Find where giftList starts and ends
const startMarker = 'const giftList: GiftItem[] = [';
const endMarker = ']';

const startIndex = pageContent.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Could not find giftList start marker');
  process.exit(1);
}

// Find the closing bracket for giftList array
// We need to find the ] that closes the array, followed by a newline and const sendWebhook
let endIndex = pageContent.indexOf('\n\n  const sendWebhook', startIndex);
if (endIndex === -1) {
  console.error('Could not find end of giftList');
  process.exit(1);
}

// Extract the new list content (remove the "const giftList..." line and the final "]")
const listLines = newListContent.trim().split('\n');
const newArrayContent = listLines.slice(1, -1).join('\n');  // Skip first line and last line

// Build the new content
const beforeList = pageContent.substring(0, startIndex);
const afterList = pageContent.substring(endIndex);

const newPageContent = beforeList + startMarker + '\n' + newArrayContent + '\n  ' + endMarker + '\n' + afterList;

// Write the updated file
fs.writeFileSync('app/page.tsx', newPageContent, 'utf8');

console.log('✅ Successfully updated giftList with phone numbers!');
