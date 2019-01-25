/*
    Function source: http://hayeren.am/convertor.js
*/

const armsciiLetters =
  "²´¶¸º¼¾ÀÂÄÆÈÊÌÎÐÒÔÖØÚÜÞàâäæèêìîðòôöøúü³µ·•¹»½¿ÁÃÅÇÉËÍÏÑÓÕ×ÙÛÝßáãåçéëíïñóõ÷ù¨ûý";
const unicodeLetters =
  "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖաբգգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքևօֆ";

module.exports.armsciiToUnicode = function(inString) {
  var inStringLength = inString.length;
  var outString = "";

  for (i = 0; i < inStringLength; i++) {
    var currentCharacter = inString.substr(i, 1);
    var pos = armsciiLetters.indexOf(currentCharacter);
    if (pos < 0) outString += currentCharacter;
    else outString += unicodeLetters.substr(pos, 1);
  }

  return outString;
};
