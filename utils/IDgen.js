// A simple function to quickly generate a unique UID
function generateUniqueProdId() {
  return `pid-${Date.now()}-${process.hrtime()[1]}`;
}

module.exports = generateUniqueProdId;
