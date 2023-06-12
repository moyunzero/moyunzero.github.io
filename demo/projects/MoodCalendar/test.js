function confirmEnding(str, target) {
  let a = str.length ;
  let b = target.length;   
  console.log(str[a]);
  while( b >= 0){    
    if(str[a] != str[b] ){
     return false;
    }
     a--;
    b--;
}
  return true;
}

confirmEnding("Bastian", "n");