var MenuScreen = (function() {
  function render() {
    var el = document.getElementById('screen-menu');
    var campaignDone = Progression.isCampaignDone();
    var campaignIdx  = Progression.getCampaignIdx();
    var campaignLabel = t('menuCampaign') +
      (campaignDone
        ? ' \u2713'
        : ' (' + t('campaignProgress').replace('{n}', campaignIdx + 1) + ')');

    el.innerHTML = [
      '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;padding:24px 16px;">',
      '<h1 style="font-family:Oswald,sans-serif;font-size:2rem;text-align:center;margin-bottom:4px;">' + t('menuTitle') + '</h1>',
      '<p style="color:var(--dim);letter-spacing:3px;font-size:0.7rem;margin-bottom:24px;">' + t('menuSubtitle') + '</p>',
      '<button class="btn" onclick="MissionScreen.startCampaign()">' + campaignLabel + '</button>',
      '<button class="btn" onclick="Router.go(\'mission\')">' + t('menuFreePlay') + '</button>',
      '<button class="btn" onclick="Router.go(\'commend\')">' + t('menuCommendations') + '</button>',
      '<button class="btn" onclick="Router.go(\'settings\')">' + t('menuSettings') + '</button>',
      '<button class="btn" onclick="MorseReference.show()">' + t('menuReference') + '</button>',
      '</div>'
    ].join('');
  }
  return { render: render };
})();
