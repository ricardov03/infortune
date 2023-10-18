chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF"
  })
});

console.log('Done!') 

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith('https://fortune.com')) {
    const prevState = await chrome.action.setBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    })

    if (nextState === "ON") {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          console.log(document)
          const paywall = document.querySelector('.paywall-selector');
          const blur = document.querySelector('.paywall');
          
          paywall.remove();
          blur.classList.remove('paywallActive');
        },
        callback: () => { console.log('Done!') }
      })

      console.log('Executed?')
    } else if (nextState === "OFF") {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.location.reload(),
        callback: () => console.log('Done!')
      });
    }
  }
});