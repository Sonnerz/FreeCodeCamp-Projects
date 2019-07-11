function titleCase(str) {
    //str = str.split(' ');
    //const finalStr = str.map((word) => word.toLowerCase().replace(word[0], word[0].toUpperCase())).join(' ');

    str1 = str.toLowerCase().split(' ');
    const finalStr = str1.map((word) => word.replace(word[0], word[0].toUpperCase())).join(' ');

    return finalStr
}

titleCase("I'm a little tea pot") // a string.
titleCase("I'm a little tea pot") // I'm A Little Tea Pot.
titleCase("sHoRt AnD sToUt") // Short And Stout.
titleCase("loWercaSe AnD UpperCase") // Lowercase and uppercase.
titleCase("HERE IS MY HANDLE HERE IS MY SPOUT") // Here Is My Handle Here Is My Spout.