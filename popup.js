function getVoices() {
  let voiceArray = speechSynthesis.getVoices();
  if(!voiceArray.length){
    let utterance = new SpeechSynthesisUtterance("");
    speechSynthesis.speak(utterance);
    voiceArray = speechSynthesis.getVoices();
  }
  return voiceArray;
}
  
  
function speak(text, voice, rate, pitch, volume) {
  let speakData = new SpeechSynthesisUtterance();
  speakData.volume = volume; 
  speakData.rate = rate; 
  speakData.pitch = pitch;
  speakData.text = text;
  speakData.lang = 'en';
  speakData.voice = voice;
  speechSynthesis.speak(speakData);
}


document.getElementById("button").onclick = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
  try {
    
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => getSelection().toString(),
    });

  } catch (e) {
    return; 
  }

  if ('speechSynthesis' in window) {

    let voices = getVoices();
    let rate = 1, pitch = 1, volume = 1;
    let text = result;
  
    speak(text, voices[0], rate, pitch, volume);
    
  } else {
    console.log('Speech Synthesis Not Supported in this browser.'); 
  }
};


