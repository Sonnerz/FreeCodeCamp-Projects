function convertHTML(str) {
  let obj = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  }
  let regexNonChars = /[^a-z|\s]/i;
  let array = str.split("");

  for (let i=0; i<=array.length; i++) {   
    if (regexNonChars.test(array[i])) {
      str = str.replace(array[i], obj[array[i]]);
    }     
  }  
  return str;
}


================================

function convertHTML(str) {
  let obj = {
    "&": "&​amp;",
    "<": "&​lt;",
    ">": "&​gt;",
    '"': "&​quot;",
    "'": "&​apos;"
  }
  let regexNonChars = /[^a-zA-Z\s]/i;

  if (regexNonChars.test(str)) {
    str = str.split('');
    for (let i=0; i<str.length; i++) {   
      if (regexNonChars.test(str[i])) {
        str[i]=obj[str[i]];
      }
    } 
  } else {
    return str;
  }

  return str.join('');
}

convertHTML("Dolce & Gabbana") // Dolce &​amp; Gabbana.
//convertHTML("Hamburgers < Pizza < Tacos") // Hamburgers &​lt; Pizza &​lt; Tacos.
//convertHTML("Sixty > twelve") // Sixty &​gt; twelve.
//convertHTML('Stuff in "quotation marks"') // Stuff in &​quot;quotation marks&​quot;.
//convertHTML("Schindler's List") // Schindler&​apos;s List.
//convertHTML("<>") // &​lt;&​gt;.
//convertHTML("abc") // abc.
