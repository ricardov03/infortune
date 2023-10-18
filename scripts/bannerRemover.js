(() => {
  console.log('Banner Remover starting...');

  setTimeout(() => {
    const paywall = document.querySelector('.paywall-selector');
    const blur = document.querySelector('.paywallActive');
    
    if (paywall){
      paywall.remove();
      blur.classList.remove('paywallActive');

      console.log('Banners Removed!');

      return true;
    }
    
    console.log('There\s not Banners on this page...');
    return false;
  }, 3000);
})();