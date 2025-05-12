window.addEventListener("load", function() {

	// FUNCTION: CHANGING TEXT EFFECT
	const words = [
	  "UI/UX designer",
	  "graphic designer",
	  "creative coder",
	  // "an illustrator",
	  "motion designer", 
	  // "a printmaker",
	  "web designer",
  ];
  
  const colors = [
	 "#ff48b0", "#765ba7", "#3d5588", "#3255a4", "#62c2b1", "#67b346", "#009da5"];
    // '#218380',
  let index = 0;
  const changingWord = document.getElementById("changing-text");
  
  function changeWord() {
	  changingWord.classList.add("fade-out"); 
  
	  setTimeout(() => {
		  index = (index + 1) % words.length;
		  let newWord = words[index].split(''); 
		  let spanElements = changingWord.querySelectorAll(".effect--span");
  
		  let newColor = colors[index % colors.length];
		  changingWord.style.color = newColor;
  
		  spanElements.forEach((span, i) => {
			  if (newWord[i]) {
				  span.textContent = newWord[i]; 
			  } else {
				  span.textContent = '';
			  }
		  });
  
		  for (let i = spanElements.length; i < newWord.length; i++) {
			  let newSpan = document.createElement("span");
			  newSpan.className = "effect--span";
			  newSpan.textContent = newWord[i];
			  changingWord.appendChild(newSpan);
		  }
  
		  changingWord.classList.remove("fade-out"); 
	  }, 500); 
  }
  
  setInterval(changeWord, 1500); 
})