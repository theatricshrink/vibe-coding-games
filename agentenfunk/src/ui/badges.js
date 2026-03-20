var Badges = (function() {
  function render(def, unlocked, dateTs) {
    var lockedOverlay = !unlocked ? [
      '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;',
      'background:rgba(0,0,0,0.7);border-radius:4px;">',
      '<span style="color:#ff2222;font-family:Oswald,sans-serif;font-size:0.6rem;letter-spacing:2px;',
      'border:1px solid #ff2222;padding:2px 6px;transform:rotate(-15deg);display:block;">',
      t('commendLocked') + '</span></div>'
    ].join('') : '';

    var dateStr = (unlocked && dateTs) ?
      '<div style="color:var(--dim);font-size:0.6rem;margin-top:2px;">' +
      new Intl.DateTimeFormat(LANG, {day:'2-digit',month:'2-digit',year:'2-digit'}).format(new Date(dateTs)) +
      '</div>' : '';

    return [
      '<div style="position:relative;display:flex;flex-direction:column;align-items:center;',
      'padding:10px 6px;border:1px solid ' + (unlocked ? 'var(--border)' : '#1a2a1a') + ';',
      'border-radius:6px;background:var(--panel-bg);cursor:' + (unlocked ? 'pointer' : 'default') + ';',
      'opacity:' + (unlocked ? '1' : '0.5') + ';"',
      unlocked ? ' title="' + def.citation[LANG].replace(/"/g, '&quot;') + '"' : '',
      '>',
      '<div style="' + (unlocked ? '' : 'filter:grayscale(1) opacity(0.4);') + '">' + def.badge + '</div>',
      '<div style="font-size:0.65rem;text-align:center;margin-top:6px;color:' + (unlocked ? 'var(--green)' : '#334433') + ';',
      'font-family:Oswald,sans-serif;letter-spacing:1px;">' + def.name[LANG] + '</div>',
      dateStr,
      lockedOverlay,
      '</div>'
    ].join('');
  }

  return { render: render };
})();
